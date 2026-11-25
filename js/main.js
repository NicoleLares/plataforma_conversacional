
/**
 * Control principal de la aplicación
 * Practica 3.4 - Web App para Automatizacion IA
 */

import { validarFormulario } from "./validacion.js";
import { consultarIA } from "./api.js";

import {
    mostrarCarga,
    mostrarError,
    limpiarError,
    limpiarErroresCampos,
    mostrarErroresCampos,
    mostrarRespuesta,
    limpiarResultado
} from "./ui.js";

// Obtener el formulario
const formulario = document.getElementById("formConsulta");

// Evitar solicitudes duplicadas
let solicitudEnProceso = false;

// Evento principal del formulario
formulario.addEventListener("submit", async (evento) => {

    // Evitar recarga y envio tradicional GET
    evento.preventDefault();

    if (solicitudEnProceso) return;

    // Limpiar resultados anteriores
    limpiarError();
    limpiarErroresCampos();
    limpiarResultado();

    // Validar datos del formulario
    const { valido, datos, errores } =
        validarFormulario(formulario);

    if (!valido) {
        mostrarErroresCampos(errores);
        mostrarError(
            "Revisa los campos del formulario antes de continuar."
        );
        return;
    }

    // Iniciar solicitud
    solicitudEnProceso = true;
    mostrarCarga(true);

    try {

        // Consultar el Webhook real de n8n
        const resultado = await consultarIA(datos);

        // Mostrar la respuesta de OpenAI
        mostrarRespuesta(resultado);

    } catch (error) {

        // Informar del error sin borrar la pregunta
        mostrarError(
            error.message ||
            "Ocurrió un problema al realizar la consulta."
        );

    } finally {

        // Restaurar el formulario
        solicitudEnProceso = false;
        mostrarCarga(false);

    }

});

// Limpiar el formulario y los resultados
formulario.addEventListener("reset", () => {
    limpiarError();
    limpiarErroresCampos();
    limpiarResultado();
});

// Quitar mensajes de campo al modificar su valor
formulario.addEventListener("input", (evento) => {
    const campo = evento.target;

    if (campo.classList.contains("is-invalid")) {
        campo.classList.remove("is-invalid");
        campo.removeAttribute("aria-invalid");
    }
});

formulario.addEventListener("change", (evento) => {
    const campo = evento.target;

    if (campo.classList.contains("is-invalid")) {
        campo.classList.remove("is-invalid");
        campo.removeAttribute("aria-invalid");
    }
});

console.log("Web App para Automatizacion IA inicializada");
