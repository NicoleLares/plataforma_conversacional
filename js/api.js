
/**
 * ============================================
 * CLIENTE HTTP - N8N CLOUD
 * Practica 3.4 - Web App Automatizacion IA
 * ============================================
 *
 * Funcionalidades:
 * - Fetch API y Async/Await
 * - Solicitudes POST a n8n Cloud
 * - Envio mediante URLSearchParams
 * - Compatible con OpenAI Nativo y HTTP Request
 * - Respuestas JSON
 * - Normalizacion de datos
 * - Manejo de errores HTTP y CORS
 * - Timeout de 90 segundos
 * - Sin credenciales privadas
 */

import { WEBHOOK_URL, TIMEOUT_MS } from "./config.js";

/**
 * Obtener mensajes claros de errores HTTP.
 */
function obtenerMensajeHTTP(estado) {

    switch (estado) {

        case 400:
            return "Los datos enviados no son válidos.";

        case 401:
            return "La solicitud no está autorizada.";

        case 403:
            return "No tienes permisos para realizar esta consulta.";

        case 404:
            return "No se encontró el Webhook de n8n.";

        case 408:
            return "La solicitud tardó demasiado en procesarse.";

        case 429:
            return "Se alcanzó el límite de solicitudes. Intenta más tarde.";

        case 500:
            return "Ocurrió un error interno en el servidor.";

        case 502:
        case 503:
        case 504:
            return "El servicio no está disponible temporalmente.";

        default:

            if (estado >= 500) {
                return "Ocurrió un problema en el servidor.";
            }

            return "No se pudo completar la solicitud.";
    }
}

/**
 * Limpiar espacios y saltos de línea.
 */
function limpiarTexto(valor) {

    if (typeof valor !== "string") {
        return "";
    }

    return valor.trim().replace(/\s+/g, " ");
}

/**
 * Normalizar y validar la respuesta de n8n.
 */
function normalizarRespuesta(resultado) {

    if (
        typeof resultado !== "object" ||
        resultado === null ||
        Array.isArray(resultado)
    ) {
        throw new Error(
            "El servidor devolvió un formato JSON inesperado."
        );
    }

    // Verificar estado de la respuesta
    if (resultado.ok !== true) {
        throw new Error(
            typeof resultado.error === "string"
                ? resultado.error
                : "La consulta no pudo procesarse."
        );
    }

    // Verificar la respuesta de OpenAI
    if (
        typeof resultado.respuesta !== "string" ||
        !resultado.respuesta.trim()
    ) {
        throw new Error(
            "El asistente devolvió una respuesta vacía."
        );
    }

    // Verificar los campos recibidos
    if (
        typeof resultado.tema !== "string" ||
        typeof resultado.nivel !== "string" ||
        typeof resultado.integracion !== "string"
    ) {
        throw new Error(
            "La respuesta del servidor tiene un formato inesperado."
        );
    }

    // Normalizar los valores
    const tema = limpiarTexto(resultado.tema);

    const nivel = limpiarTexto(resultado.nivel);

    const integracion = limpiarTexto(
        resultado.integracion
    ).toLowerCase();

    // Validar los valores normalizados
    if (!tema || !nivel) {
        throw new Error(
            "La respuesta del servidor contiene campos vacíos."
        );
    }

    if (!["nativo", "http"].includes(integracion)) {
        throw new Error(
            "La integración recibida no es válida."
        );
    }

    // Devolver JSON limpio
    return {
        ok: true,
        respuesta: resultado.respuesta.trim(),
        tema,
        nivel,
        integracion
    };
}

/**
 * ============================================
 * CONSULTAR INTELIGENCIA ARTIFICIAL
 * ============================================
 *
 * Enviar los datos del formulario al Webhook
 * de produccion de n8n Cloud.
 *
 * @param {Object} datos
 * @returns {Promise<Object>}
 */

export async function consultarIA(datos) {

    // Crear controlador para el timeout
    const controlador = new AbortController();

    const temporizador = setTimeout(() => {
        controlador.abort();
    }, TIMEOUT_MS);

    try {

        /**
         * 1. PREPARAR DATOS
         *
         * URLSearchParams permite enviar datos
         * como application/x-www-form-urlencoded.
         */

        const parametros = new URLSearchParams({
            tema: datos.tema,
            nivel: datos.nivel,
            pregunta: datos.pregunta,
            integracion: datos.integracion
        });

        /**
         * 2. ENVIAR SOLICITUD POST
         */

        const respuestaHTTP = await fetch(WEBHOOK_URL, {

            method: "POST",

            headers: {
                "Accept": "application/json"
            },

            body: parametros,

            signal: controlador.signal

        });

        /**
         * 3. RECIBIR RESPUESTA JSON
         */

        let resultado;

        try {

            resultado = await respuestaHTTP.json();

        } catch {

            throw new Error(
                respuestaHTTP.ok
                    ? "El servidor no devolvió un JSON válido."
                    : obtenerMensajeHTTP(respuestaHTTP.status)
            );

        }

        /**
         * 4. COMPROBAR ESTADO HTTP
         */

        if (!respuestaHTTP.ok) {

            if (
                respuestaHTTP.status === 400 &&
                typeof resultado?.error === "string"
            ) {

                throw new Error(resultado.error);

            }

            throw new Error(
                obtenerMensajeHTTP(respuestaHTTP.status)
            );
        }

        /**
         * 5. NORMALIZAR RESPUESTA
         *
         * Elimina espacios y saltos de línea
         * innecesarios de los campos recibidos.
         */

        const respuestaNormalizada =
            normalizarRespuesta(resultado);

        /**
         * 6. DEVOLVER RESULTADO
         *
         * Este objeto sera utilizado por ui.js
         * para mostrar los resultados.
         */

        return respuestaNormalizada;

    } catch (error) {

        /**
         * 7. MANEJAR ERRORES
         */

        // Tiempo de espera agotado
        if (controlador.signal.aborted) {

            throw new Error(
                "La solicitud tardó demasiado. Intenta nuevamente."
            );

        }

        // Problemas de conexión o CORS
        if (error instanceof TypeError) {

            throw new Error(
                "No se pudo conectar con n8n. Revisa tu conexión o la configuración CORS del Webhook."
            );

        }

        // Otros errores controlados
        throw error;

    } finally {

        /**
         * 8. LIBERAR TEMPORIZADOR
         */

        clearTimeout(temporizador);

    }
}
