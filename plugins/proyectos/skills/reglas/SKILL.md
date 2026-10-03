---
name: reglas
description: Reglas de trabajo de un repo de empresa en Markdown (Company Cycle OS) — clasificar antes de ejecutar, descriptores _context/_rules/_enlaces, áreas y temas, un solo hogar por archivo, tarea vs proyecto, bloque Estado, convenciones y validación. Cárgalas al inicio de cada sesión en un repo con _context.md en la raíz y Proyectos/, y antes de crear, mover o archivar cualquier archivo ahí
argument-hint: (sin argumentos)
---

Estas son las reglas del repo de la empresa. Aplícalas durante toda la sesión. El repo es la única fuente de verdad,
todo en español, y **el producto son los `.md`**. La empresa está en `_context.md` de la raíz: léelo primero.

## Regla #1 — clasifica antes de ejecutar

En la **primera respuesta de cada sesión**, antes de hacer nada, pregunta con `AskUserQuestion` si lo que viene es
**(a) un trabajo nuevo**, que arranca con `/proyectos:explorar`, o **(b) una pregunta suelta**. Nada se ejecuta hasta
que responda. Se salta solo si el primer mensaje ya lo dice: invoca un comando `/proyectos:*`, retoma un trabajo por su
nombre, o pide leer un archivo concreto. En la duda, pregunta.

## Los descriptores mandan en su carpeta

| Archivo | Dónde | Qué dice |
|---|---|---|
| `_context.md` | raíz, cada área, carpetas de servicio | qué vive aquí; en la raíz la **tabla de áreas**, en cada área la **tabla de temas** |
| `_rules.md` | raíz, cada área, carpetas de servicio | cómo se documenta aquí y cómo se crea un proyecto de esta área |
| `_enlaces.md` | raíz, cada área, carpetas de servicio | enlaces externos: documentos, tableros, carpetas compartidas |

Carpetas de servicio: `Decisiones/`, `Proyectos/`, `Proyectos/Tareas/`, `Proyectos/Proyectos-Regulares/` y la
`Archivados/` de cada una de estas dos.

Léelos antes de crear, mover o editar nada en su carpeta. Las áreas se declaran en la tabla de `_context.md` raíz y
los temas en la tabla de cada área; el ruteo se hace contra esas tablas. **Ninguna sesión crea un área ni un tema sin
preguntar**: si nada encaja, ofrece los existentes más «crear uno nuevo». Si aceptan, crea la carpeta **y** su fila
(en un área, sus tres descriptores desde `${CLAUDE_PLUGIN_ROOT}/templates/area/`). Carpeta sin descriptor: pregunta
qué es antes de escribirle uno. La carpeta es el identificador: no se renombran áreas ni temas.

## Gestor de proyectos — todo archivo tiene un solo hogar

**Antes de escribir un archivo que sea resultado de un trabajo, nombra su destino** `<Área>/<tema>/<archivo>.md` y
confírmalo si hay duda. Dentro de un área, todo va en la subcarpeta de su tema; sueltos solo los tres descriptores. La
carpeta de un proyecto guarda el plan, no los entregables: nada queda ahí «por ahora».

## Estructura

```
_context.md · _rules.md · _enlaces.md      la empresa: ficha, tabla de áreas, reglas, enlaces
<Área>/<tema>/*.md                         documentos, siempre dentro de un tema
Proyectos/Proyectos-Regulares/<slug>/      proyecto: propuesta.md · exploracion.md · solucion.md · tareas.md · adjuntos/
Proyectos/Proyectos-Regulares/Archivados/  proyectos cerrados, con `Resultado:` en su Estado
Proyectos/Tareas/<slug>.md                 tarea (mini-proyecto): un solo archivo
Proyectos/Tareas/Archivados/               tareas cerradas, con `Resultado:` en su Estado
_Referencias/_index.md                     archivos de afuera que se consultan; un nivel de subcarpetas
Decisiones/Q<N>-<AAAA>.md                  bitácora de la empresa, una línea por evento
.ccos/                                     patrones de higiene y manifiesto del ejemplo
```

Nombres reservados: en la raíz `Proyectos`, `Decisiones`, `_Referencias`, `Plans`, `.claude`, `.ccos`; dentro de
`Proyectos/`, `Tareas`, `Proyectos-Regulares` y `adjuntos`; dentro de `Tareas/` y de `Proyectos-Regulares/`,
`Archivados`. En `Proyectos/` no vive nada suelto: solo sus descriptores y esas dos carpetas.

## El ciclo

| Situación | Comando |
|---|---|
| Carpeta vacía: crear la estructura base (y seguir con setup) | `/proyectos:init` |
| Primera vez: nombrar la empresa, declarar áreas y temas, borrar el ejemplo si lo hay | `/proyectos:setup` |
| Pensar una idea sin compromiso, antes de crear nada | `/proyectos:explorar` |
| Crear o modificar un trabajo hasta tener su plan de tareas | `/proyectos:proponer` |
| Ejecutar el plan y dejar cada resultado en su área y tema | `/proyectos:aplicar` |
| Cerrar: guardar el resultado, archivar, registrar en la bitácora | `/proyectos:archivar` |
| Revisar la estructura | `/proyectos:validar` |

- **Tarea**: cabe en una página, un actor, sin solución técnica propia, hasta ~5 pasos. **Proyecto**: necesita
  requerimientos, decisiones propias o más de ~5 tareas. Si una tarea crece, se gradúa: `Proyectos/Tareas/<slug>.md`
  pasa a ser `Proyectos/Proyectos-Regulares/<slug>/propuesta.md`.
- `<slug>` en kebab-case, sin fechas. Un proyecto vive con `propuesta.md` y `exploracion.md` en `explorar` o
  `proponer`; **desde `aplicar` los cuatro documentos son obligatorios**.
- **Bloque `## Estado`** en `propuesta.md` o en la tarea, una viñeta literal por campo `- **Campo:** valor`: `Fase:`
  (`explorar | proponer | aplicar | pausado | archivado`), `Área:` (una fila de la tabla de áreas), `Resultado
  esperado:` (archivo(s) y `<Área>/<tema>/`, o «ninguno — motivo»), última actualización y próximo paso.
- Durante `aplicar`, cada resultado nace ya en `<Área>/<tema>/`. **Al archivar se pregunta siempre** dónde queda cada
  resultado; el Estado conserva `- **Resultado:** <rutas>` o `ninguno — <motivo>`. `Fase: pausado` no se archiva.

## Convenciones

- **Cabecera** en la primera línea de todo `.md`: `<!-- Creado: AAAA-MM-DD · Actualizado: AAAA-MM-DD · Creador:
  <nombre> -->`. Al editar, actualiza la fecha. Excepción: archivos ajenos en `_Referencias/`.
- **Tope de 120 líneas** sin contar tablas ni bloques de código. Exentos: `Decisiones/`, `_Referencias/_index.md`.
- **Bitácora:** solo lo que cambia el rumbo, como `AAAA-MM-DD · [tipo] texto`. Q1 ene-mar · Q2 abr-jun · Q3 jul-sep ·
  Q4 oct-dic.
- **`_Referencias/`** es un estante, no una bandeja: lo concluido va a su área y cita la fuente.
- **`Plans/`** es scratch de sesión y no se versiona. **Confidencialidad:** respeta `_rules.md` de la raíz.
- Corre `/proyectos:validar` después de `setup`, al cerrar un trabajo y antes de compartir el repo.
