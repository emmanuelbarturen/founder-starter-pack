---
name: init
description: Crea desde cero la estructura base de un repo de empresa — Proyectos/ con Tareas/ y Proyectos-Regulares/ (cada una con su Archivados/) y Decisiones/, con _context.md, _rules.md y _enlaces.md en cada carpeta — y sigue con /proyectos:setup. Para una carpeta vacía; no pisa archivos que ya existan
argument-hint: (sin argumentos)
disable-model-invocation: true
---

Dejas lista la **estructura base** de un repo de empresa en una carpeta que todavía no la tiene, y sin detenerte
sigues con `setup`. **No preguntas nada:** los datos de la empresa los pide `setup`. El usuario puede estar en la app
de escritorio sin terminal: todo lo que haya que ejecutar lo ejecutas tú.

## Entorno

- **La carpeta del plugin es `${CLAUDE_PLUGIN_ROOT}`.** El molde de la estructura está en
  `${CLAUDE_PLUGIN_ROOT}/templates/base/` y la skill de setup en `${CLAUDE_PLUGIN_ROOT}/skills/setup/SKILL.md`.
- **La raíz del repo de la empresa** es la carpeta donde se abrió la sesión. Guarda su ruta absoluta: la necesitas
  en el paso 3.

## 0. Reconocer el terreno

Mira si existe `_context.md` en la raíz.

- **No existe** → sigue al paso 1.
- **Existe y su `Id` es `pendiente`** → `init` ya corrió aquí. Sigue al paso 1 para completar lo que falte.
- **Existe con cualquier otro `Id`** → el repo ya tiene estructura. **No toques nada.** Dilo en una línea, indica que
  lo que sigue es `/proyectos:setup` (si el `Id` es `ejemplo`) o `/proyectos:validar` (si ya está en uso), y termina.

## 1. Crear la estructura

Copia el árbol `${CLAUDE_PLUGIN_ROOT}/templates/base/` a la raíz, con las mismas rutas. Son 7 carpetas y cada una
lleva sus tres descriptores (21 archivos):

```
_context.md · _rules.md · _enlaces.md                 la raíz
Decisiones/                                           la bitácora, por quarter
Proyectos/                                            todo trabajo
Proyectos/Tareas/                                     tareas: <slug>.md
Proyectos/Tareas/Archivados/                          tareas cerradas
Proyectos/Proyectos-Regulares/                        proyectos: <slug>/ con sus cuatro documentos
Proyectos/Proyectos-Regulares/Archivados/             proyectos cerrados
```

Reglas:

- **Nunca sobrescribas.** Un archivo que ya existe se queda como está; anótalo para el resumen. Con terminal,
  `cp -Rn` sobre el contenido del molde hace justo eso; sin terminal, lee cada archivo del molde y escríbelo solo si
  su destino no existe.
- **Los nombres van exactos**, con mayúsculas y guion: `Proyectos-Regulares`, `Archivados`, `Decisiones`.
- En cada archivo que creaste, cambia **solo la primera línea** (la cabecera): las dos `AAAA-MM-DD` por la fecha de
  hoy y `<nombre>` por `por definir`. El resto del archivo queda igual; `setup` pone el creador real.
- No crees nada más: ni áreas, ni el archivo del quarter, ni `_Referencias/`. Eso es de `setup` o llega después.

## 2. Comprobar

Lista las 21 rutas y confirma que existen. Si hay `bun` (`which bun`), corre
`bun "${CLAUDE_PLUGIN_ROOT}/scripts/validar.ts" --raiz <raíz del repo>`: debe dar **0 errores** y un solo aviso, el
del `Id` en `pendiente`. Si sale un error, corrígelo antes de seguir. Sin `bun`, sigue: `setup` valida al final.

## 3. Pasar a setup

Di en una o dos líneas qué quedó creado (y qué ya existía y no tocaste). Luego, **sin esperar respuesta**, lee
completo `${CLAUDE_PLUGIN_ROOT}/skills/setup/SKILL.md` con la herramienta de lectura y síguelo desde su paso 0, como
si la persona hubiera escrito `/proyectos:setup`. Sus preguntas y sus reglas valen enteras.

Ese archivo llega con su texto sin resolver. Donde diga la variable de la carpeta del plugin, vale la ruta de
«Entorno»; donde diga `${CLAUDE_PROJECT_DIR}`, vale la raíz del repo de la empresa.

Idioma: español siempre. Directo, breve, cero relleno.
