
# 🤖 NEO AI | Web App para Automatización IA

### Práctica 3.4 — Inteligencia Artificial Aplicada a las TICS

Aplicación web académica responsiva que integra inteligencia artificial mediante **OpenAI, n8n Cloud y GitHub Pages**, permitiendo realizar consultas con diferentes niveles de profundidad y seleccionar entre dos mecanismos de integración.

---

## 👩‍💻 Información académica

| Dato | Información |
|---|---|
| Desarrolladora | Nicole Dayana Esparza Lares |
| Institución | Tecnológico de Pachuca |
| Carrera | Ingeniería en Tecnologías de la Información y Comunicaciones |
| Materia | Inteligencia Artificial Aplicada a las TICS |
| Práctica | 3.4 Web App para Automatización IA |
| Año | 2026 |

---

## 📌 1. Descripción del proyecto

**Neo AI** es una aplicación web que permite consultar un asistente académico especializado en Tecnologías de la Información y Comunicaciones.

La aplicación utiliza una interfaz desarrollada con HTML5, CSS3, Bootstrap 5 y JavaScript modular.

Las solicitudes se envían mediante Fetch API a un Webhook de n8n Cloud, que valida los datos, selecciona la integración correspondiente y consulta OpenAI para generar una respuesta.

Los resultados se muestran dinámicamente en la aplicación, sin necesidad de recargar la página.

El proyecto implementa dos mecanismos de integración:

- **OpenAI Nativo:** mediante el nodo OpenAI de n8n.
- **HTTP Request:** mediante la API REST de OpenAI y Responses API.

Ambos mecanismos utilizan el modelo GPT-4o-mini.

---

## 🎯 2. Objetivo

Desarrollar y publicar una aplicación web responsiva en GitHub Pages que permita capturar información académica, enviar solicitudes HTTP POST a un Webhook de n8n Cloud y presentar respuestas generadas por OpenAI.

La aplicación incorpora:

- Validación de datos.
- Dos mecanismos de integración con OpenAI.
- Respuestas adaptadas al nivel académico.
- Comunicación HTTP asíncrona.
- Manejo de errores.
- Protección de credenciales.
- Diseño responsivo y accesible.

---

## ✨ 3. Características principales

### Consultas académicas

Permite realizar preguntas sobre cinco áreas:

1. Inteligencia artificial.
2. Redes.
3. Programación.
4. Bases de datos.
5. Internet de las cosas (IoT).

### Niveles de profundidad

Las respuestas se adaptan a tres niveles:

- **Básico:** conceptos sencillos y ejemplos cotidianos.
- **Intermedio:** explicaciones técnicas y ejemplos prácticos.
- **Avanzado:** información detallada y aplicaciones profesionales.

### Integraciones disponibles

**Nodo OpenAI (nativo)**

Utiliza las credenciales de OpenAI almacenadas en n8n Cloud y genera respuestas mediante el nodo oficial de integración.

**HTTP Request (Responses API)**

Realiza una solicitud HTTP POST desde n8n al endpoint:

https://api.openai.com/v1/responses

### Experiencia de usuario

La aplicación incluye:

- Formulario con validación.
- Indicador de carga.
- Prevención de solicitudes duplicadas.
- Manejo de errores de conexión.
- Tiempo de espera máximo de 90 segundos.
- Respuestas sin recargar la página.
- Presentación de Markdown básico.
- Visualización de títulos, listas y código.
- Botón para limpiar el formulario.
- Compatibilidad con dispositivos móviles.

---

## 🎨 4. Diseño Neo AI

La aplicación utiliza una identidad visual denominada **Neo AI — Futurista Oscuro**.

El diseño está inspirado en interfaces modernas de inteligencia artificial.

### Paleta de colores

| Elemento | Color |
|---|---|
| Fondo principal | `#0B1020` |
| Fondo de tarjetas | `#151E36` |
| Violeta principal | `#8B5CF6` |
| Cian tecnológico | `#22D3EE` |
| Texto principal | `#F1F5FF` |
| Texto secundario | `#B5C4DA` |

### Características visuales

- Modo oscuro.
- Encabezado con degradados.
- Tarjetas con efecto de profundidad.
- Bordes y detalles luminosos.
- Botones con efectos de interacción.
- Animaciones suaves.
- Formulario responsivo.
- Respuestas de IA con formato.
- Adaptación a dispositivos móviles.
- Compatibilidad con preferencias de movimiento reducido.

Los estilos están centralizados en:

`css/style.css`

---

## 🛠️ 5. Tecnologías utilizadas

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript ES Modules
- Fetch API
- Async/Await
- DOM API

### Automatización

- n8n Cloud
- Webhook
- Code (JavaScript)
- IF
- Edit Fields
- Switch
- Respond to Webhook

### Inteligencia artificial

- OpenAI API
- GPT-4o-mini
- Nodo OpenAI
- HTTP Request
- Responses API

### Desarrollo y despliegue

- Visual Studio Code
- Live Server
- Git
- GitHub
- GitHub Pages
- PowerShell

---

## 🏗️ 6. Arquitectura del sistema

La aplicación utiliza una arquitectura basada en un frontend estático y un servicio de automatización externo.

```text
             USUARIO
                |
                v
      +-------------------+
      |   NEO AI WEB APP  |
      | HTML / CSS / JS   |
      +-------------------+
                |
                | HTTP POST
                v
      +-------------------+
      |   WEBHOOK N8N     |
      +-------------------+
                |
                v
      +-------------------+
      | VALIDAR ENTRADA   |
      +-------------------+
                |
                v
      +-------------------+
      |        IF         |
      +-------------------+
          |           |
        TRUE        FALSE
          |           |
          v           v
    EDIT FIELDS   ERROR 400
          |
          v
      +-------------------+
      |      SWITCH       |
      +-------------------+
          |           |
          v           v
     OPENAI        HTTP REQUEST
     NATIVO        RESPONSES API
          |           |
          v           v
    FORMATEAR     FORMATEAR
    RESPUESTA     RESPUESTA
          |           |
          v           v
     RESPONDER     RESPONDER
     EXITO 200     EXITO 200
          |           |
          +-----+-----+
                |
                v
          RESPUESTA JSON
                |
                v
           NEO AI WEB APP
```

El frontend nunca realiza solicitudes directas a OpenAI.

Todas las consultas se procesan mediante n8n Cloud, que administra las credenciales y la comunicación con la API.

---

## 📂 7. Estructura del proyecto

```text
webapp-automatizacion-ia/
|
|-- index.html
|
|-- css/
|   |-- style.css
|
|-- js/
|   |-- config.js
|   |-- api.js
|   |-- validacion.js
|   |-- ui.js
|   |-- main.js
|
|-- assets/
|   |-- favicon.svg
|
|-- README.md
|-- .gitignore
```

### Descripción de archivos

| Archivo | Función |
|---|---|
| `index.html` | Estructura semántica de la interfaz |
| `css/style.css` | Diseño Neo AI y estilos responsivos |
| `js/config.js` | Configuración pública del Webhook |
| `js/api.js` | Comunicación HTTP mediante Fetch |
| `js/validacion.js` | Validación de los campos |
| `js/ui.js` | Estados visuales y presentación de respuestas |
| `js/main.js` | Lógica principal de la aplicación |
| `assets/favicon.svg` | Icono personalizado |
| `README.md` | Documentación del proyecto |
| `.gitignore` | Exclusión de archivos innecesarios o privados |

---

## 📝 8. Funcionamiento del formulario

El formulario contiene cuatro campos obligatorios.

### Tema

El usuario selecciona el área académica que desea consultar.

### Nivel

Permite establecer la profundidad de la respuesta generada.

### Pregunta

Campo de texto multilínea con una longitud permitida de 5 a 500 caracteres.

### Integración

Permite seleccionar:

- `nativo`: nodo OpenAI de n8n.
- `http`: HTTP Request con Responses API.

Después de validar los campos, la aplicación envía la solicitud al Webhook.

---

## 🔗 9. Configuración del Webhook

La aplicación utiliza el Webhook de producción:

```text
https://nicolelares.app.n8n.cloud/webhook/webapp-automatizacion-ia
```

La configuración se encuentra en:

`js/config.js`

```javascript
export const WEBHOOK_URL =
    "https://nicolelares.app.n8n.cloud/webhook/webapp-automatizacion-ia";

export const TIMEOUT_MS = 90000;
```

La URL es pública y no contiene credenciales privadas.

La autenticación con OpenAI se administra exclusivamente mediante las credenciales de n8n Cloud.

### Consideraciones de CORS

Durante el desarrollo local se utiliza un origen como:

```text
http://127.0.0.1:5500
```

Para GitHub Pages, el origen permitido debe corresponder al dominio de publicación:

```text
https://nicolelares.github.io
```

Los cambios en la configuración del workflow deben publicarse antes de probarlos.

CORS no constituye un mecanismo de autenticación ni impide solicitudes realizadas fuera del navegador.

---

## 📡 10. Comunicación HTTP

La aplicación utiliza Fetch API y Async/Await.

El método utilizado es:

`POST`

El cuerpo de la petición se codifica mediante:

`application/x-www-form-urlencoded`

Se utiliza `URLSearchParams` para transmitir los cuatro campos requeridos.

Este formato permite evitar normalmente la prevalidación OPTIONS asociada a solicitudes JSON.

### Ejemplo de datos enviados

```json
{
  "tema": "Inteligencia artificial",
  "nivel": "Básico",
  "pregunta": "¿Qué es el aprendizaje automático?",
  "integracion": "nativo"
}
```

Este ejemplo representa los datos lógicos enviados; el cuerpo HTTP real se codifica como formulario URL-encoded.

### Respuesta JSON exitosa

```json
{
  "ok": true,
  "respuesta": "El aprendizaje automático es...",
  "tema": "Inteligencia artificial",
  "nivel": "Básico",
  "integracion": "nativo"
}
```

### Respuesta de error

```json
{
  "ok": false,
  "error": "Todos los campos son obligatorios."
}
```

Las respuestas exitosas utilizan HTTP 200 y las entradas inválidas utilizan HTTP 400.

---

## 🧠 11. Procesamiento de inteligencia artificial

El asistente se comporta como un especialista académico en Tecnologías de la Información y Comunicaciones.

Las instrucciones solicitan respuestas en español de México y adaptadas al nivel seleccionado.

La estructura general de las respuestas incluye:

1. Concepto.
2. Funcionamiento.
3. Ejemplo práctico.
4. Recomendación técnica.

Las preguntas se reciben dinámicamente desde el formulario.

No se utilizan preguntas fijas para generar las respuestas definitivas.

---

## 🚀 12. Ejecución local

### Requisitos

- Visual Studio Code.
- Navegador actualizado.
- Extensión Live Server.
- Conexión a Internet.
- Webhook de n8n publicado.

### Procedimiento

1. Descargar o clonar el repositorio.
2. Abrir la carpeta en Visual Studio Code.
3. Verificar los archivos del proyecto.
4. Ejecutar `index.html` con Live Server.
5. Abrir la dirección local en el navegador.
6. Seleccionar Tema y Nivel.
7. Escribir una Pregunta.
8. Seleccionar la Integración.
9. Presionar **Consultar IA**.
10. Revisar la respuesta generada.

No se requiere instalar Node.js ni ejecutar un servidor backend propio.

---

## 🧪 13. Pruebas de funcionamiento

Durante el desarrollo se realizaron pruebas de conexión, validación y generación de respuestas.

### Pruebas comprobadas

| Prueba | Resultado |
|---|---|
| Webhook de prueba | Correcto |
| OpenAI Nativo desde PowerShell | Correcto |
| HTTP Request desde PowerShell | Correcto |
| Respuesta JSON de ambas rutas | Correcto |
| Validación de pregunta vacía | HTTP 400 correcto |
| Webhook de producción | HTTP 200 correcto |
| Integración nativa desde navegador | Correcto |
| Integración HTTP desde navegador | Correcto |
| Presentación de respuestas Markdown | Correcto |

### Pruebas de aceptación adicionales

Antes de la entrega se deben comprobar:

- Nivel Básico, Intermedio y Avanzado.
- Cambio de Tema.
- Campos vacíos.
- Cambio de Integración.
- Error de conexión.
- Navegación mediante teclado.
- Adaptación a teléfonos móviles.
- Funcionamiento desde GitHub Pages.
- Comunicación CORS desde el dominio publicado.

### Herramientas utilizadas

- Consola de desarrollador de Chrome.
- Pestaña Network.
- PowerShell.
- Historial de ejecuciones de n8n.

---

## 🔐 14. Seguridad y manejo de errores

El proyecto incorpora las siguientes medidas:

- Validación en frontend y n8n.
- Límite de longitud para preguntas.
- Protección de credenciales de OpenAI.
- Ausencia de API Keys en JavaScript.
- Control de tiempo de espera.
- Prevención de envíos duplicados.
- Manejo de errores HTTP.
- Presentación segura del texto generado.
- Renderizado de Markdown básico sin ejecutar HTML arbitrario.
- Configuración de orígenes permitidos mediante CORS.

### Recomendaciones adicionales

El Webhook de producción es público.

Se recomienda supervisar las ejecuciones de n8n y el consumo de la API de OpenAI durante las pruebas.

También es recomendable implementar controles de frecuencia y manejo de fallas del proveedor cuando el entorno lo permita.

Al finalizar la evaluación, el workflow puede despublicarse para evitar consumo innecesario.

---

## 🌐 15. Publicación en GitHub Pages

La aplicación está preparada para publicarse mediante GitHub Pages.

### Procedimiento

1. Crear un repositorio público en GitHub.
2. Subir los archivos del proyecto.
3. Acceder a **Settings**.
4. Seleccionar **Pages**.
5. Elegir **Deploy from a branch**.
6. Seleccionar la rama `main`.
7. Seleccionar la carpeta `/(root)`.
8. Guardar la configuración.
9. Abrir la dirección HTTPS generada.
10. Verificar el funcionamiento de ambas integraciones.

Antes de probar desde GitHub Pages, se debe configurar el origen correspondiente en el Webhook de n8n y publicar los cambios.

---

## 🔗 16. Enlaces del proyecto

### Repositorio GitHub

Pendiente de publicación.

### Aplicación GitHub Pages

Pendiente de publicación.

### Webhook de producción

https://nicolelares.app.n8n.cloud/webhook/webapp-automatizacion-ia

Los enlaces de GitHub y GitHub Pages se agregarán después del despliegue.

---

## 📚 17. Aprendizajes obtenidos

Durante el desarrollo de esta práctica se aplicaron conocimientos relacionados con:

- Desarrollo frontend.
- Diseño responsivo.
- JavaScript modular.
- Comunicación asíncrona.
- API REST.
- Solicitudes HTTP POST.
- Webhooks.
- Automatización de procesos.
- Integración de OpenAI.
- Responses API.
- Validación de datos.
- Manejo de errores.
- Seguridad de credenciales.
- CORS.
- Publicación de aplicaciones web.

---

## ✅ 18. Conclusión

El desarrollo de Neo AI permitió integrar conocimientos de programación web, automatización e inteligencia artificial en una aplicación académica funcional.

Se implementó una interfaz responsiva mediante HTML5, CSS3, Bootstrap 5 y JavaScript modular, capaz de enviar consultas a un Webhook de n8n Cloud y presentar dinámicamente las respuestas generadas por OpenAI.

Se configuraron y comprobaron dos mecanismos de integración: el nodo nativo de OpenAI y HTTP Request mediante Responses API.

Durante las pruebas se identificaron y corrigieron dificultades relacionadas con CORS, el formato de envío HTTP y la normalización de las respuestas JSON.

Asimismo, se aplicaron medidas para proteger las credenciales y validar los datos antes de procesar las solicitudes.

La práctica permitió comprender cómo conectar una aplicación web estática con servicios externos de automatización e inteligencia artificial, manteniendo una arquitectura modular y preparada para su publicación en GitHub Pages.

---

**Desarrollado por Nicole Dayana Esparza Lares**

**Inteligencia Artificial Aplicada a las TICS**

**Tecnológico de Pachuca | 2026**
