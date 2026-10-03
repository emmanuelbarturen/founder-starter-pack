---
name: setup
description: Primera sesión en el repo — nombra tu empresa, declara sus áreas y temas, crea los descriptores y deja el repo versionado. Se corre una sola vez, después de /proyectos:init
argument-hint: (sin argumentos)
disable-model-invocation: true
---

Pones el repo a punto para la empresa del usuario, **una sola vez**. Al terminar, la raíz describe su empresa real,
cada área tiene sus tres descriptores y sus temas, y el repo tiene su primer commit. El usuario puede estar en la app
de escritorio sin terminal: todo lo que haya que ejecutar lo ejecutas tú, pidiendo permiso cuando la herramienta lo
pida.

## 0. Reconocer el terreno

Lee `_context.md` de la raíz y mira el campo `Id` de la ficha.

- **No hay `_context.md`** → la carpeta todavía no tiene estructura. Dile que escriba `/proyectos:init`, que la crea
  y vuelve aquí solo, y termina.
- **`Id` = `pendiente`** → estructura recién creada por `/proyectos:init`. Sigue al paso 1.
- **Cualquier otro valor** → el repo ya está en uso. Dilo y pregunta con `AskUserQuestion` (header "Repo en uso"):
  **Solo agregar áreas** / **Solo revisar la estructura** (corre el paso 5 y termina) / **Cancelar**. **Nunca
  reconfigures un repo en uso sin que lo confirme.**

Comprueba también si hay `bun`: `which bun`. Guarda el resultado para el paso 5.

## 1. La empresa

Pregunta en una sola tanda (una línea por dato, acepta la respuesta completa): nombre, qué hace y para quién,
etapa (idea / validación / operando / escalando), modelo de negocio, cuántas personas, moneda de reporte, y **qué
nombre va como creador** en las cabeceras cuando escribas tú. Confírmale la ficha antes de escribir nada.

## 2. Las áreas — se declaran aquí, nunca por tu cuenta

Presenta el catálogo sugerido de `${CLAUDE_PLUGIN_ROOT}/templates/_context-raiz.md` con `AskUserQuestion` (`multiSelect: true`, header
"Áreas"). La opción de texto libre sirve para áreas que no estén en el catálogo. Reglas:

- **No agregues ni una sola área que no haya marcado**, ni para que la estructura se vea completa. Una empresa con
  una sola área es válida.
- Nombres de carpeta **sin tildes, sin espacios, en singular o plural como el usuario lo diga**: la carpeta es el
  identificador y no se renombra. El nombre bonito va en el `_context.md` del área.
- Por cada área, pregunta en una línea **sus temas iniciales** (una o dos subcarpetas bastan; un área con un solo
  tema es válida). Los temas también son carpetas sin tildes.

## 3. Crear la estructura

1. Raíz: `_context.md` desde `${CLAUDE_PLUGIN_ROOT}/templates/_context-raiz.md` con la ficha del paso 1 (`Id` = un slug en kebab-case
   del nombre), la tabla de áreas **recortada a lo declarado** y «Trabajos activos» vacío; `_rules.md` desde
   `${CLAUDE_PLUGIN_ROOT}/templates/base/_rules.md`; `_enlaces.md` desde `${CLAUDE_PLUGIN_ROOT}/templates/base/_enlaces.md`.
   Los tres ya existen como provisionales desde `init`: reescríbelos conservando su fecha `Creado:`.
2. Por cada área: la carpeta, sus tres descriptores desde `${CLAUDE_PLUGIN_ROOT}/templates/area/` con la responsabilidad **redactada**
   (no en blanco) y la tabla de temas con lo declarado, y una carpeta por tema.
3. `Decisiones/Q<N>-<AAAA>.md` del quarter actual desde `${CLAUDE_PLUGIN_ROOT}/templates/decisiones-quarter.md`, con la primera línea:
   `AAAA-MM-DD · [hito] Estructura inicial de la empresa: <n> áreas declaradas (<lista>)`.
4. Fecha de hoy y el creador del paso 1 en todas las cabeceras, también en los descriptores de `Decisiones/`,
   `Proyectos/`, `Proyectos/Tareas/`, `Proyectos/Proyectos-Regulares/` y sus dos `Archivados/`: cambia su
   `Creador: por definir` por el creador real. Ninguna cabecera debe quedar con `por definir`.
5. Si falta alguna carpeta de servicio o alguno de sus descriptores, créalo desde
   `${CLAUDE_PLUGIN_ROOT}/templates/base/Proyectos/` y `${CLAUDE_PLUGIN_ROOT}/templates/base/Decisiones/`, sin pisar
   lo que exista.

## 4. Confidencialidad

Pregunta con `AskUserQuestion` (header "Datos"): *¿Este repo debe quedar libre de datos personales de clientes
finales (solo cómo opera la empresa: cifras agregadas, decisiones, procesos)?* **Sí, regla no-pii** (recomendado) /
**No hace falta**. Escribe la respuesta en la sección Confidencialidad de `_rules.md` de la raíz.

## 5. Validar y versionar

1. **Si hay `bun`:** corre `bun "${CLAUDE_PLUGIN_ROOT}/scripts/validar.ts" --raiz "${CLAUDE_PROJECT_DIR}"` y corrige lo que salga hasta que dé 0 errores. **Si no hay `bun`:**
   ofrece con `AskUserQuestion` (header "Validador"): **Instalarlo ahora** (corre el instalador oficial de
   `bun.sh` y vuelve a intentar) / **Sin instalar** (corre `/proyectos:validar`, que hace los mismos chequeos a mano).
2. Si el repo no tiene `.git`, corre `git init` y haz el primer commit: `Estructura inicial — <empresa>`.
3. Pregunta si quiere un remoto. Si sí, pídele la URL del repo **privado** que haya creado en su proveedor (eso lo
   hace él desde la web) y corre `git remote add origin <url>`. No hagas push sin que lo pida.

## 6. Confirmar

Devuelve en pocas líneas: la empresa, sus áreas con sus temas, el resultado del validador, el commit, y el siguiente
paso: **`/proyectos:explorar`** para arrancar el primer trabajo.

Idioma: español siempre. Directo, breve, cero relleno.
