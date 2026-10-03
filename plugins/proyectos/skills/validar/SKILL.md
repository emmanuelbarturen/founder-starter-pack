---
name: validar
description: Revisa la estructura del repo de la empresa con el validador del plugin, o a mano si no hay bun (descriptores, tablas contra carpetas, cabeceras, tope de líneas, índice de referencias, trabajos con Estado, bitácora) y, si se pide, la higiene previa a publicar
argument-hint: [--publicar]
---

Validas la estructura del repo de la empresa. **Primero** comprueba `which bun`. Si devuelve una ruta, corre desde
la raíz del repo `bun "${CLAUDE_PLUGIN_ROOT}/scripts/validar.ts" --raiz "${CLAUDE_PROJECT_DIR}"` con los argumentos
recibidos, muestra su salida y termina. **Solo si no hay `bun`** (o el usuario prefiere no instalarlo) haces los mismos
chequeos a mano, con Read, Glob y Grep: mismo contrato, misma severidad, mismo reporte.

Argumentos: $ARGUMENTS (`--publicar` activa el chequeo V10).

## Nombres reservados

Raíz (no son áreas): `Proyectos`, `Decisiones`, `_Referencias`, `Plans`, `.claude`, `.ccos`, `.git`.
Dentro de `Proyectos/` (no son trabajos): `Tareas`, `Proyectos-Regulares`, `adjuntos`. Dentro de `Tareas/` y de
`Proyectos-Regulares/`: `Archivados`.

Carpetas de servicio: `Proyectos`, `Proyectos/Tareas`, `Proyectos/Tareas/Archivados`, `Proyectos/Proyectos-Regulares`,
`Proyectos/Proyectos-Regulares/Archivados` y `Decisiones`. En ellas los tres descriptores (`_context.md`, `_rules.md`,
`_enlaces.md`) nunca cuentan como tarea, proyecto ni archivo de bitácora.

## Chequeos (E = error · A = aviso)

1. **V1 Descriptores.** `_context.md` en la raíz y en `Proyectos/` (E); `_rules.md` y `_enlaces.md` en la raíz (A).
   En cada área (carpeta de la raíz no reservada): `_context.md`, `_rules.md` y `_enlaces.md` (E cada uno). En cada
   carpeta de servicio que exista, cada descriptor que falte (A), salvo `Proyectos/_context.md`, que ya es E.
2. **V2 Áreas.** Las filas de la tabla «Áreas» de `_context.md` raíz (columna Carpeta, entre acentos graves) contra
   las carpetas reales de la raíz menos las reservadas, en ambos sentidos: declarada sin carpeta (E), carpeta sin
   fila (E).
3. **V3 Temas.** Por área: las filas de la tabla «Temas» de su `_context.md` contra sus subcarpetas, en ambos
   sentidos (E). Un `.md` suelto en el área que no sea uno de los tres descriptores (E).
4. **V4 Cabecera.** Primera línea de todo `.md` = `<!-- Creado: AAAA-MM-DD · Actualizado: AAAA-MM-DD · Creador: … -->`
   con fechas reales (E). Fuera de alcance: `.claude/`,
   `_Referencias/**` salvo `_index.md`, `Plans/`.
5. **V5 Tope de 120 líneas** contando fuera de bloques de código y sin filas de tabla (E). Exentos: `Decisiones/`,
   `_Referencias/_index.md`, `.claude/`.
6. **V6 Slug de plan-mode** fuera de `Plans/`: `.md` con nombre kebab de tres o más palabras, sin cabecera, fuera de
   `Proyectos/`, `_Referencias/` y `.claude/` (A).
7. **V7 Referencias.** `_Referencias/` con un solo nivel de subcarpetas (E); cada archivo listado en `_index.md` por
   su ruta relativa y sin filas que apunten a archivos inexistentes (E).
8. **V8 Trabajos.** Cada `Proyectos/Proyectos-Regulares/<slug>/propuesta.md` y `Proyectos/Tareas/<slug>.md` (y los
   de `Proyectos-Regulares/Archivados/<slug>/` y `Tareas/Archivados/<slug>.md`) con `## Estado`, `Fase:` en
   `explorar | proponer | aplicar | pausado | archivado`, y `Área:` que exista en la tabla de áreas (E). Un trabajo
   en `Archivados/` sin `Resultado:` (A; `ninguno — …` cuenta como presente). **Fuera de su hogar (E):** una carpeta
   no reservada directamente en `Proyectos/` (los proyectos viven en `Proyectos-Regulares/`); `Proyectos/Archivados/`
   (lo archivado vive dentro de `Tareas/` y de `Proyectos-Regulares/`); una carpeta dentro de `Tareas/` que no sea
   `Archivados`, o cualquiera dentro de `Tareas/Archivados/` (una tarea es un solo archivo); un `.md` que no sea
   descriptor en `Proyectos/`, `Proyectos-Regulares/` o `Proyectos-Regulares/Archivados/`. `Id` de la ficha raíz en
   `pendiente` (A): falta correr `/proyectos:setup`.
9. **V9 Bitácora.** En `Decisiones/`, solo archivos `Q[1-4]-AAAA.md` además de los tres descriptores (E). Desde la primera línea que empieza con
   fecha en adelante, toda línea no vacía empieza con `AAAA-MM-DD ·` (E).
10. **V10 Higiene** (solo con `--publicar`). Cada patrón de `.ccos/higiene.txt` y de `.ccos/higiene.local.txt` (si
    existe) buscado con Grep en todo el árbol menos `.git`, `Plans/`, `.ccos/` y `LICENSE`. Cada
    coincidencia es E, con archivo y línea. Además, si el repo tiene git, `git ls-files .ccos/higiene.local.txt` debe
    devolver vacío: ese archivo versionado es E (publica justo lo que debía proteger).

Detalles de V8 que también aplican a mano: los slugs (carpetas de trabajo, archivos de tarea, `Id` raíz) van en
kebab-case; un proyecto en fase `aplicar` o `archivado` tiene los cuatro documentos; `Fase: archivado` fuera de
su `Archivados/` (la de proyectos o la de tareas) es E, y un trabajo dentro de `Archivados/` con otra fase también; las rutas de `Resultado:` son relativas a la raíz, sin `..`, y deben existir. Las fechas de
cabeceras y bitácora deben existir en el calendario.

## Reporte

Agrupa por chequeo, una línea por hallazgo: `✗ [V3] Ventas/resumen.md — .md suelto fuera de un tema`. Cierra con
`N errores · M avisos` y el veredicto: **limpio** (0 errores), **estructura** (hay errores de V1-V9), **higiene**
(solo V10 falló). No corrijas nada sin que el usuario lo pida: este comando informa.

Idioma: español siempre. Directo, breve, cero relleno.
