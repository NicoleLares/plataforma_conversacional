
/**
 * Validación del formulario
 * Práctica 3.4
 */

const TEMAS_VALIDOS = [
    "Inteligencia artificial",
    "Redes",
    "Programación",
    "Bases de datos",
    "Internet de las cosas (IoT)"
];

const NIVELES_VALIDOS = [
    "Básico",
    "Intermedio",
    "Avanzado"
];

const INTEGRACIONES_VALIDAS = [
    "nativo",
    "http"
];

// Eliminar espacios innecesarios
function limpiarTexto(valor) {
    return String(valor ?? "")
        .trim()
        .replace(/\s+/g, " ");
}

// Validar todos los campos
export function validarFormulario(formulario) {

    const datosFormulario = new FormData(formulario);

    const datos = {
        tema: limpiarTexto(datosFormulario.get("tema")),
        nivel: limpiarTexto(datosFormulario.get("nivel")),
        pregunta: limpiarTexto(datosFormulario.get("pregunta")),
        integracion: limpiarTexto(
            datosFormulario.get("integracion")
        )
    };

    const errores = {};

    // Validar tema
    if (!TEMAS_VALIDOS.includes(datos.tema)) {
        errores.tema = "Selecciona un tema válido.";
    }

    // Validar nivel
    if (!NIVELES_VALIDOS.includes(datos.nivel)) {
        errores.nivel = "Selecciona un nivel académico.";
    }

    // Validar pregunta
    if (
        datos.pregunta.length < 5 ||
        datos.pregunta.length > 500
    ) {
        errores.pregunta =
            "La pregunta debe contener entre 5 y 500 caracteres.";
    }

    // Validar integración
    if (!INTEGRACIONES_VALIDAS.includes(datos.integracion)) {
        errores.integracion =
            "Selecciona una integración válida.";
    }

    return {
        valido: Object.keys(errores).length === 0,
        datos,
        errores
    };
}
