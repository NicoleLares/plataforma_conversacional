
/**
 * ============================================
 * INTERFAZ DE USUARIO - WEB APP IA
 * Practica 3.4 - Automatizacion IA
 * ============================================
 *
 * Funcionalidades:
 * - Estados de carga
 * - Manejo de errores
 * - Validaciones visuales
 * - Visualizacion de respuestas OpenAI
 * - Formato Markdown basico y seguro
 * - Compatible con ambas integraciones
 * - Limpieza de resultados
 */

// ============================================
// 1. ELEMENTOS DEL DOM
// ============================================

const formulario = document.getElementById("formConsulta");

const btnConsultar = document.getElementById("btnConsultar");
const btnLimpiar = document.getElementById("btnLimpiar");

const estadoSolicitud = document.getElementById("estadoSolicitud");
const mensajeError = document.getElementById("mensajeError");
const panelRespuesta = document.getElementById("panelRespuesta");

const resultadoTema = document.getElementById("resultadoTema");
const resultadoNivel = document.getElementById("resultadoNivel");
const resultadoIntegracion = document.getElementById("resultadoIntegracion");

const textoRespuesta = document.getElementById("textoRespuesta");

// ============================================
// 2. MOSTRAR ESTADO DE CARGA
// ============================================

export function mostrarCarga(activo) {

    estadoSolicitud.classList.toggle("d-none", !activo);

    btnConsultar.disabled = activo;
    btnLimpiar.disabled = activo;

    btnConsultar.textContent = activo
        ? "Consultando..."
        : "Consultar IA";

    formulario.setAttribute(
        "aria-busy",
        String(activo)
    );

}

// ============================================
// 3. MOSTRAR MENSAJES DE ERROR
// ============================================

export function mostrarError(mensaje) {

    mensajeError.textContent = mensaje;

    mensajeError.classList.remove("d-none");

}

// ============================================
// 4. LIMPIAR MENSAJES DE ERROR
// ============================================

export function limpiarError() {

    mensajeError.textContent = "";

    mensajeError.classList.add("d-none");

}

// ============================================
// 5. LIMPIAR ERRORES DE LOS CAMPOS
// ============================================

export function limpiarErroresCampos() {

    formulario.querySelectorAll(".is-invalid").forEach(campo => {

        campo.classList.remove("is-invalid");

        campo.removeAttribute("aria-invalid");

    });

}

// ============================================
// 6. MOSTRAR ERRORES DE VALIDACION
// ============================================

export function mostrarErroresCampos(errores) {

    limpiarErroresCampos();

    let primerCampo = null;

    Object.entries(errores).forEach(([nombre, mensaje]) => {

        const campo = formulario.elements.namedItem(nombre);

        if (!campo) return;

        campo.classList.add("is-invalid");

        campo.setAttribute("aria-invalid", "true");

        const contenedor = campo.closest(".mb-3, .mb-4");

        const feedback = contenedor?.querySelector(
            ".invalid-feedback"
        );

        if (feedback) {
            feedback.textContent = mensaje;
        }

        if (!primerCampo) {
            primerCampo = campo;
        }

    });

    primerCampo?.focus();

}

// ============================================
// 7. FORMATO SEGURO DE TEXTO MARKDOWN
// ============================================

/**
 * Convierte fragmentos de Markdown basico
 * en elementos HTML seguros.
 *
 * Formatos admitidos:
 * - **Negritas**
 * - `Codigo en linea`
 *
 * No utiliza innerHTML.
 */

function agregarTextoSeguro(elemento, contenido) {

    const partes = contenido.split(
        /(\*\*[^*]+\*\*|`[^`]+`)/g
    );

    partes.forEach(parte => {

        if (!parte) return;

        // Texto en negritas
        if (
            parte.startsWith("**") &&
            parte.endsWith("**")
        ) {

            const negrita = document.createElement("strong");

            negrita.textContent = parte.slice(2, -2);

            elemento.appendChild(negrita);

        }

        // Codigo en linea
        else if (
            parte.startsWith("`") &&
            parte.endsWith("`")
        ) {

            const codigo = document.createElement("code");

            codigo.textContent = parte.slice(1, -1);

            elemento.appendChild(codigo);

        }

        // Texto normal
        else {

            elemento.appendChild(
                document.createTextNode(parte)
            );

        }

    });

}

// ============================================
// 8. RENDERIZAR RESPUESTA DE OPENAI
// ============================================

/**
 * Transforma Markdown en contenido visual.
 *
 * Permite:
 * - Encabezados
 * - Parrafos
 * - Negritas
 * - Listas con vinetas
 * - Listas numeradas
 * - Bloques de codigo
 *
 * Todo el contenido se inserta de forma segura.
 */

function renderizarRespuesta(texto) {

    textoRespuesta.replaceChildren();

    const lineas = texto
        .replace(/\r\n?/g, "\n")
        .split("\n");

    let listaActual = null;
    let tipoLista = null;
    let parrafoActual = null;

    let bloqueCodigo = false;
    let elementoCodigo = null;

    for (const lineaOriginal of lineas) {

        const linea = lineaOriginal.trim();

        // ------------------------------------
        // BLOQUES DE CODIGO
        // ------------------------------------

        if (linea.startsWith("```")) {

            listaActual = null;
            tipoLista = null;
            parrafoActual = null;

            if (!bloqueCodigo) {

                const pre = document.createElement("pre");

                pre.className = "respuesta-codigo";

                elementoCodigo = document.createElement("code");

                pre.appendChild(elementoCodigo);

                textoRespuesta.appendChild(pre);

                bloqueCodigo = true;

            } else {

                bloqueCodigo = false;
                elementoCodigo = null;

            }

            continue;

        }

        if (bloqueCodigo) {

            elementoCodigo.textContent += lineaOriginal + "\n";

            continue;

        }

        // ------------------------------------
        // LINEAS VACIAS
        // ------------------------------------

        if (!linea) {

            listaActual = null;
            tipoLista = null;
            parrafoActual = null;

            continue;

        }

        // ------------------------------------
        // ENCABEZADOS MARKDOWN
        // ------------------------------------

        const encabezado = linea.match(
            /^(#{1,4})\s+(.+)$/
        );

        if (encabezado) {

            listaActual = null;
            tipoLista = null;
            parrafoActual = null;

            const nivel = Math.min(
                encabezado[1].length + 2,
                6
            );

            const titulo = document.createElement(
                `h${nivel}`
            );

            titulo.className = "respuesta-titulo";

            agregarTextoSeguro(
                titulo,
                encabezado[2]
            );

            textoRespuesta.appendChild(titulo);

            continue;

        }

        // ------------------------------------
        // LISTAS CON VINETAS
        // ------------------------------------

        const vineta = linea.match(
            /^[-*]\s+(.+)$/
        );

        // ------------------------------------
        // LISTAS NUMERADAS
        // ------------------------------------

        const numerada = linea.match(
            /^\d+[.)]\s+(.+)$/
        );

        if (vineta || numerada) {

            parrafoActual = null;

            const tipo = vineta ? "ul" : "ol";

            if (
                !listaActual ||
                tipoLista !== tipo
            ) {

                listaActual = document.createElement(tipo);

                listaActual.className = "respuesta-lista";

                tipoLista = tipo;

                textoRespuesta.appendChild(listaActual);

            }

            const elemento = document.createElement("li");

            agregarTextoSeguro(
                elemento,
                vineta ? vineta[1] : numerada[1]
            );

            listaActual.appendChild(elemento);

            continue;

        }

        // ------------------------------------
        // PARRAFOS NORMALES
        // ------------------------------------

        listaActual = null;
        tipoLista = null;

        if (!parrafoActual) {

            parrafoActual = document.createElement("p");

            parrafoActual.className = "respuesta-parrafo";

            textoRespuesta.appendChild(parrafoActual);

        } else {

            parrafoActual.appendChild(
                document.createTextNode(" ")
            );

        }

        agregarTextoSeguro(parrafoActual, linea);

    }

}

// ============================================
// 9. MOSTRAR RESPUESTA DE OPENAI
// ============================================

export function mostrarRespuesta(datos) {

    // Mostrar tema
    resultadoTema.textContent = datos.tema;

    // Mostrar nivel
    resultadoNivel.textContent = datos.nivel;

    // Mostrar integracion utilizada
    resultadoIntegracion.textContent =
        datos.integracion === "nativo"
            ? "Nodo OpenAI (nativo)"
            : "HTTP Request (Responses API)";

    // Renderizar Markdown de forma segura
    renderizarRespuesta(datos.respuesta);

    // Mostrar panel de resultados
    panelRespuesta.classList.remove("d-none");

    // Desplazamiento suave hacia la respuesta
    panelRespuesta.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// ============================================
// 10. LIMPIAR RESULTADOS
// ============================================

export function limpiarResultado() {

    resultadoTema.textContent = "";

    resultadoNivel.textContent = "";

    resultadoIntegracion.textContent = "";

    textoRespuesta.replaceChildren();

    panelRespuesta.classList.add("d-none");

}
