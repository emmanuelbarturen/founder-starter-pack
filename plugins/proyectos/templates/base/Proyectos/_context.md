<!-- Creado: AAAA-MM-DD · Actualizado: AAAA-MM-DD · Creador: <nombre> -->
# Proyectos

Todo trabajo de la empresa vive aquí, como **tarea** o como **proyecto**. Los resultados no: cada resultado nace en
su `<Área>/<tema>/`. Aquí queda el plan.

## Carpetas

| Carpeta | Qué vive aquí |
|---|---|
| `Tareas/` | una tarea por archivo: `<slug>.md`. Las cerradas, en `Tareas/Archivados/` |
| `Proyectos-Regulares/` | un proyecto por carpeta: `<slug>/` con sus cuatro documentos. Los cerrados, en `Proyectos-Regulares/Archivados/` |

## Tarea o proyecto

- **Tarea:** cabe en una página, un actor, sin solución técnica propia, hasta ~5 pasos.
- **Proyecto:** necesita requerimientos, decisiones propias o más de ~5 tareas.
- Si una tarea crece, se gradúa: `Tareas/<slug>.md` pasa a ser `Proyectos-Regulares/<slug>/propuesta.md`.

## Bloque Estado

Toda tarea y todo `propuesta.md` lleva `## Estado`, con una viñeta literal por campo `- **Campo:** valor`:

- **Fase:** `explorar` | `proponer` | `aplicar` | `pausado` | `archivado`
- **Área:** una fila de la tabla de áreas de la raíz
- **Resultado esperado:** archivo(s) y su `<Área>/<tema>/`, o «ninguno — motivo»
- **Última actualización** y **Próximo paso al retomar**

Al archivar se agrega `- **Resultado:** <rutas>` o `ninguno — <motivo>`.
