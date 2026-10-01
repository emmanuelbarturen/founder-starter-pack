# proyectos

El ciclo de trabajo de una empresa que vive en Markdown. Funciona sobre un repo con la forma de Company Cycle OS:
`_context.md` en la raíz con la tabla de áreas, un `_context.md` por área con su tabla de temas, y `Proyectos/`.

| Comando | Qué hace |
|---|---|
| `/proyectos:setup` | Primera vez: nombra la empresa, declara áreas y temas, borra la empresa de ejemplo, primer commit |
| `/proyectos:explorar` | Pensar una idea sin compromiso |
| `/proyectos:proponer` | Entrevista → propuesta, solución y plan de tareas, con área y resultado esperado |
| `/proyectos:aplicar` | Ejecuta el plan; cada resultado nace en `<Área>/<tema>/` |
| `/proyectos:archivar` | Pregunta dónde queda el resultado, archiva y registra el hito |
| `/proyectos:validar` | Revisa la estructura con `scripts/validar.ts` (o a mano si no hay `bun`) |
| `/proyectos:reglas` | Las reglas del repo; Claude las carga al inicio de cada sesión |

`setup`, `proponer`, `aplicar` y `archivar` solo corren cuando tú los invocas. `explorar`, `validar` y `reglas` también
puede cargarlos Claude cuando el contexto lo pide.

Si usas la plantilla de empresa Company Cycle OS, no hace falta instalarlo: su `.claude/settings.json` ya declara el
marketplace y el plugin, y la app los ofrece al aceptar la confianza de la carpeta.

## Qué trae

- `skills/`: los siete comandos.
- `templates/`: los moldes de descriptores, proyecto, tarea y bitácora.
- `scripts/validar.ts`: el validador. Un archivo, sin dependencias, necesita `bun`. Exit 0 limpio, 1 estructura,
  2 solo higiene (`--publicar`), 3 uso.
- `tests/`: los casos del validador sobre una empresa de fixture.

Historial en [VERSIONS.md](VERSIONS.md).
