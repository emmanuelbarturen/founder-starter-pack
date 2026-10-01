---
name: post-proponer
description: >
  Paso 1 de 3 del proceso de contenido: propone los temas de las próximas fechas como filas en el tablero de la parrilla y los itera con la persona hasta que cada tema queda aprobado o descartado. No define nada: lee dónde está el tablero en parrilla.md, qué publicaciones salen de cada tema en formatos.md y qué temas cubre cada redactor. No redacta ningún post. Se usa escribiendo /contenido:post-proponer cuando toca decidir qué se publica las próximas semanas. El paso siguiente es /contenido:post-redactar. Actívala cuando el usuario diga "propón temas", "propón los temas del mes", "arma el calendario de publicaciones" o "qué temas siguen".
argument-hint: "[periodo; por defecto, las próximas 4 fechas]"
---

# Proponer temas

## Para quién es esta skill

Para un emprendedor que es la cara de su negocio y publica él mismo. Usa estos rasgos para interpretar sus respuestas; no los recites.

- **Lo que se le traba es publicar, no las ideas.** Este paso existe para que el calendario quede decidido de una vez.
- **Su audiencia desconfía de las promesas grandes.** Cada cifra de un tema tiene que poder rastrearse a algo que de verdad pasó.
- **Él decide, la skill propone.** Ningún tema avanza sin su ok explícito.

## Dónde está en el proceso

| Paso | Skill | Deja las filas en |
|---|---|---|
| **1 · Proponer temas** | `/contenido:post-proponer` | `Tema Aprobado ✔` o `Descartado 🗑️` |
| 2 · Redactar | `/contenido:post-redactar` | `Listo a Publicar 👍` |
| 3 · Publicar y cerrar | `/contenido:post-publicar` | `Programado 🕦` y `Publicado ✅` |

**Resultado de este paso:** cada tema del periodo queda en `Tema Aprobado ✔` o en `Descartado 🗑️`, con fecha. Aquí no se redacta ni una línea de ningún post.

## Qué lee

Esta skill no define nada y no pregunta lo que ya está escrito. Todo lo toma de lo que dejaron las skills `construir-*`:

| De dónde | Qué toma |
|---|---|
| `parrilla.md` | Dónde está el tablero y cómo se llega, el día fijo, el canal por defecto, las reglas propias, los bancos de temas, `Fuentes` y `Temas propios` |
| `formatos.md` | Los canales, la línea `Por defecto:` de cada uno, los tipos y su ficha («Cuándo conviene»), y la línea `Lleva:` de cada canal |
| `.claude/agents/redactor-*.md` | Qué temas cubre cada redactor, a quién le escribe y de dónde sale su «Insumo propio» |
| `sobre-mi.md` | Los límites: qué nunca se publica y cómo se nombra a terceros |

**El tablero** es la parrilla que creó `/contenido:construir-parrilla`, esté en Notion, en Airtable o en ClickUp. Los nombres de sus campos van sin tilde y se copian exactos; los estados, con su emoji.

**La línea `Lleva:`** va debajo de un canal en `formatos.md` y dice qué otra publicación sale de cada pieza de ese canal y cuándo:

```
## Blog propio

Por defecto: artículo corto
Texto: según el tipo
Lleva: linkedin - carrusel, al día hábil siguiente
```

- Lo que va antes de la coma es la «Opción en la parrilla» de la publicación que sale. Lo que va después es cuándo: `el mismo día`, `al día hábil siguiente` o `N días después`.
- **Una sola línea `Lleva:` por canal, con una sola publicación.** Si un canal trae más de una, usa la primera y dilo.
- **Sin esa línea, cada tema da una sola publicación.** No la supongas ni la preguntes: si la persona quiere que un canal lleve otro, se define con `/contenido:construir-formatos`.
- La publicación que sale de otra se llama aquí **derivada**, y la otra, **principal**.

## Entorno

- **Se opera con el acceso real que tenga la sesión al tablero.** Sin acceso, no sigas: dile a la persona que escriba `/mcp`, elija el conector del destino que dice `parrilla.md` y lo autorice. Si el conector no aparece en la sesión, lo agrega `/contenido:construir-parrilla`. Nunca afirmes que creaste o actualizaste una fila sin haberla releído.
- Los ejemplos de `AskUserQuestion` describen las preguntas: si la herramienta está disponible respeta sus límites (máximo 4 preguntas por llamada, de 2 a 4 opciones); si no, haz las mismas preguntas en el chat.
- **Calcula las fechas y los días de la semana con una herramienta** (por ejemplo el comando `date`), nunca de memoria. «Hoy» es hoy en la hora local de la persona.
- Proponer y guardar no autoriza a redactar, a publicar ni a enviar mensajes.

## CRÍTICO: arranque automático al cargar

Mira en silencio si existe `parrilla.md` y sigue:

- **No existe:** el tablero todavía no está configurado. Di una sola línea: «Primero va el tablero: escribe `/contenido:construir-parrilla`». Detente ahí.
- **Existe:** léelo, lee `formatos.md` y los redactores si existen, y ve directo al paso 1.

No resumas esta skill, no expliques cómo funciona y no preguntes si el usuario quiere correrla.

**Periodo por defecto:** las próximas 4 fechas del día fijo de `parrilla.md` que no tengan una pieza principal asignada. Una fecha que solo tiene una derivada sigue libre. Si `parrilla.md` nombra más de un día fijo, cuentan todos. La persona puede pedir otro rango.

## El tema

Todo tema cumple tres condiciones:

- **Le pasó a la persona.** Algo que hizo, resolvió, decidió o midió. No un consejo genérico. Un tema que sale de una fuente lleva su punto de vista: qué piensa, qué hizo con eso o qué cambia para su lector. La noticia sola no es un tema.
- **Se puede sostener.** Si el tema trae una cifra, se anota en `Notas` con su fuente. Una fuente es una de tres cosas: un archivo, una medición, o el relato de la persona dicho en la conversación, que se anota «relato de [persona], AAAA-MM-DD». Va ❓ solo cuando la cifra del relato contradice a un archivo o cuando la persona misma duda. Nunca se infla. Un tema sin cifra también vale.
- **No cruza las reglas propias.** Los terceros (clientes, amigos, colegas) se nombran como digan las reglas propias de `parrilla.md`. Si no dicen nada, por su rol y no por su nombre.

## 1. Junta temas, los baratos primero

**Antes de proponer nada nuevo, mira lo que quedó sin decidir.** Las filas en `Tema Propuesto ✍️` con fecha de hoy en adelante son propuestas que la persona todavía no aprobó ni descartó. No crees otra para ese tema ni para esa fecha: su fecha cuenta como ocupada. Vuelve a mostrarlas en la tabla del paso 3 y pide la decisión. Si con ellas el periodo ya está cubierto, no propongas nada más.

1. **El tablero:** filas en `Tema Propuesto ✍️`, `Tema Aprobado ✔` o `Borrador Listo 👀` sin `Fecha programada` o con la fecha vencida. Ya están pensadas; van primero. **No se crean de nuevo ni cambian de estado:** solo se les propone una fecha nueva, y la persona la aprueba con las demás.
2. **`Temas propios`:** los temas de «Por usar». Son de la persona y van antes que cualquier otro. Al proponer uno, márcalo con ✅, agrégale `usado en [ID]` y muévelo al final de «Usados», sin cambiar lo que ella escribió.
3. **`Fuentes`:** si tienes una herramienta para leer la web, abre las fuentes con link, empezando por las que llevan más tiempo sin revisar, busca novedades que den un tema y anota la fecha de hoy en `Ultima revision`. Las fuentes sin link se le preguntan a la persona. Sin herramienta para leer la web, dilo en una línea y sigue.
4. **Los bancos de temas** de `parrilla.md`, saltando los ya usados y lo ya publicado.
5. **El trabajo reciente real** que haya en el proyecto y el «Insumo propio» de cada redactor.
6. **Si no alcanza, pregunta:** «Cuéntame, en una línea cada una, cosas que hiciste, resolviste o mediste en las últimas semanas: tantas como fechas falten por llenar».

Lo que empieza con `[PRUEBA]` o `[EJEMPLO]` no es una pieza, una fuente ni un tema: no lo uses ni le reserves fecha.

## 2. Reparte por fecha y entre redactores

- **Una pieza principal por fecha del día fijo.** Una fila descartada no ocupa su fecha.
- **El redactor de cada tema lo dicen los redactores:** un tema va al redactor cuyo archivo lo nombra en «Temas». La mezcla de temas del periodo sale de ahí, no de una regla de esta skill. Si un tema no es de ningún redactor, va con `Otro` y lo dices.
- **No dos temas seguidos del mismo redactor,** mientras haya temas de otro. Si 3 de las últimas 4 piezas del tablero (sin contar las descartadas) son del mismo redactor, el tema siguiente viene de otro, si lo hay. Si todos los temas disponibles son del mismo, dilo en una línea y sigue.
- **El canal de la pieza principal** es el canal por defecto de `parrilla.md`, salvo que la persona pida otro para ese tema.
- **El tipo:** dentro de ese canal, el tipo cuya ficha describe el tema en «Cuándo conviene»; si ninguna encaja, o si encajan dos, el de la línea `Por defecto:` de ese canal (su `### <tipo>` da la opción de `Canal + tipo`). Sin `formatos.md`, la opción que diga `parrilla.md`.
- **Las derivadas:** si el canal de la pieza principal trae `Lleva:`, ese tema da dos publicaciones. La derivada no ocupa día fijo: su fecha sale de lo que diga la línea, y esa fecha sigue libre para una principal.
- Lleva en `Notas` la marca ⚠️ **tema sensible** el tema que cuenta un error propio, deja reconocer a un tercero o revela cifras internas del negocio. En esos, la persona aprueba el tema, no solo la redacción.

## 3. Propón en el tablero

Crea **una fila por publicación**, todas en `Tema Propuesto ✍️`.

**La fila principal:** `Tema`, `Descripcion` (el ángulo en una línea, 20 palabras como máximo, sin repetir el título), `Fecha programada`, `Canal + tipo`, `Redactor`, y en `Notas` de dónde salió el tema, su cifra con la fuente si la trae y las dudas con ❓. `Palabras` queda vacío.

**La fila derivada,** si el canal trae `Lleva:`, se crea en el mismo turno:

| Campo | Valor |
|---|---|
| `Tema` | El mismo tema, con el titular que le sirve a su canal |
| `Descripcion` | Lo que sostiene esta publicación, en una línea. No repite la de la principal |
| `Canal + tipo` | La opción que dice `Lleva:` |
| `Fecha programada` | La que resulta de `Lleva:`, contada desde la fecha de la principal |
| `Redactor` | El mismo de la principal |
| `Notas` | Empieza con `Sale de [ID de la principal].`, con su punto: `Sale de AB-7.` Lo demás va después |

La marca va donde vivan las `Notas` de la fila: en ClickUp, si `Notas` no existe como campo, en la línea `Notas:` de la descripción de la tarea.

Si la opción de `Lleva:` no existe en `Canal + tipo` del tablero, no la inventes ni la crees aquí: di que el tablero se pone al día con `/contenido:construir-parrilla` y sigue solo con la principal.

Luego, **un solo mensaje**: una tabla `ID · Tema · Fecha · Redactor · Descripcion · Derivada`, con una fila por tema (en «Derivada» van el `ID`, el canal y la fecha de la derivada, o un guion), el link al tablero y una única pregunta: «¿aprobado, corregir o descartar, tema por tema?».

## 4. Aprobación

- **Aprobado** → `Tema Aprobado ✔`.
- **Corregir** → se queda en `Tema Propuesto ✍️`, el pedido va a `Notas`, se ajusta y se vuelve a mostrar **solo lo que cambió**.
- **Descartar** → `Descartado 🗑️` con el motivo en `Notas`. Si salió de un banco de temas, se marca ahí también. La fecha queda libre: en la misma vuelta propone un reemplazo. Si no hay otro tema, dilo y la fecha queda sin pieza.

**La decisión sobre un tema vale para sus dos filas:** aprobar o descartar la principal aprueba o descarta su derivada. La persona puede descartar solo la derivada; en ese caso la principal sigue sola.

## 5. Cierra

**Listo cuando** no queda ninguna fila del periodo en `Tema Propuesto ✍️`. Cierra con el calendario final en una tabla, marcando las fechas que quedaron sin pieza, y una sola acción siguiente: «Para escribir el primero, escribe `/contenido:post-redactar`».

## Reglas

- Cuando esta skill se active, ve directo al trabajo. Sin resumen, sin explicación, sin preámbulo.
- **Esta skill lee, no define.** El tablero, los formatos, las publicaciones que salen de cada tema y los temas de cada redactor ya están escritos. No los preguntes, no los cambies y no guardes una copia.
- **La skill propone; la persona decide.** Ninguna fila pasa a `Tema Aprobado ✔` sin su ok explícito en la conversación.
- **Aquí no se redacta.** Ni un borrador, ni un párrafo de muestra.
- **Una fila por publicación.** La derivada lleva `Sale de [ID].` al inicio de sus `Notas`, con el punto, y sigue la decisión de su principal.
- Lo que se agregue a `Notas` de una derivada va después de la marca `Sale de [ID].`
- **Un solo mensaje por vuelta,** nunca uno por tema.
- Los nombres de los campos y los valores de `Estado` se copian exactos.
- Cada cambio se escribe en el tablero en el mismo turno en que ocurre, y se verifica releyendo.
- Las reglas propias de `parrilla.md` y los límites de `sobre-mi.md` mandan sobre cualquier tema.
- Toda cifra de un tema lleva su fuente en `Notas`, o se marca ❓.
- Describe a la persona por sus rasgos. No la etiquetes por su país ni por su región.
- Sin `parrilla.md` no corre: primero va `/contenido:construir-parrilla`.
