---
name: setup
description: >
  Guía de principio a fin del plugin contenido: lleva a la persona, etapa por etapa, desde un proyecto vacío hasta su primera publicación cerrada con su link. Corre en orden las skills que ya existen (redactores, formatos, estilo, tablero, tema, texto, pieza visual y publicación), muestra el avance en cada vuelta y se puede cortar y retomar escribiendo otra vez /contenido:setup. No define nada ni pregunta lo que pregunta otra skill. Se usa escribiendo /contenido:setup al empezar un proyecto de contenido.
argument-hint: (sin argumentos)
disable-model-invocation: true
---

# Setup: de cero a tu primera publicación

Llevas a la persona desde un proyecto vacío hasta su primera publicación, usando las skills del plugin en su orden. **Tú no configuras nada: cada etapa la hace su skill.** Tu trabajo es saber en qué etapa está, correr la skill que toca, mostrar el avance y seguir.

## Para quién es esta skill

Para un emprendedor que es la cara de su negocio y publica él mismo. Usa estos rasgos; no los recites.

- **Lo que se le traba es empezar.** Necesita saber siempre qué sigue y cuánto falta, sin leer un manual.
- **Tiene poco tiempo seguido.** Va a cortar a la mitad. Tiene que poder volver y encontrar todo donde lo dejó.
- **Él decide, la skill propone.** Ninguna etapa se salta una aprobación.

## Las etapas

| # | Etapa | Skill | Hecha cuando | Aplica |
|---|---|---|---|---|
| 1 | Redactores | `construir-redactores` | Existen `sobre-mi.md`, `voz.md` y al menos un `.claude/agents/redactor-*.md` | Siempre |
| 2 | Formatos | `construir-formatos` | Existe `formatos.md` con al menos una ficha | Siempre |
| 3 | Estilo | `construir-estilo` | Existe `estilo.md` con sus ocho campos | Si alguna ficha de `formatos.md` dice `Herramienta: Claude Code` o `Herramienta: Canva` |
| 4 | Tablero | `construir-parrilla` | Existe `parrilla.md` | Siempre |
| 5 | Tema | `post-proponer` | La fila principal del tema está en `Tema Aprobado ✔` o en un estado posterior | Siempre |
| 6 | Texto | `post-redactar` | La fila principal del tema está en `Listo a Publicar 👍` o en un estado posterior | Siempre |
| 7 | Pieza visual | `post-disenar` | Cada borrador del tema que lleva pieza tiene la línea `**Pieza:**`, con la versión aprobada o con `a mano`. También si la fila ya está en `Programado 🕦` o `Publicado ✅` | Si algún borrador del tema lleva `## Láminas`, `## Infográfico` o `**Imagen:**`, y la `Herramienta:` de su ficha es `Claude Code` o `Canva` |
| 8 | Publicación | `post-publicar` | La fila principal del tema está en `Publicado ✅` | Siempre |

- **Los estados van en este orden:** `Tema Propuesto ✍️`, `Tema Aprobado ✔`, `Borrador Listo 👀`, `Listo a Publicar 👍`, `Programado 🕦`, `Publicado ✅`. `Descartado 🗑️` no cuenta para ninguna etapa.
- **El tema del setup** es una fila principal real, con su derivada si la tiene. La derivada es la fila cuyas `Notas` empiezan con `Sale de [ID].`: nunca es el tema por sí sola, y sus borradores cuentan para la etapa 7.
- **Una fila real** es una pieza de la persona. Lo que empieza con `[PRUEBA]` o `[EJEMPLO]` no cuenta.
- **Si hay más de una fila principal real,** el tema es la más avanzada. Si hay empate, pregunta cuál con su `ID`: no elijas tú.
- **La versión aprobada** de un borrador es la de su línea `**Aprobado para publicar:** … (vN)`. Una `**Pieza:**` con otra versión no cierra la etapa 7.

## Entorno

- **La carpeta del plugin es `${CLAUDE_PLUGIN_ROOT}`.** Cada skill está en `${CLAUDE_PLUGIN_ROOT}/skills/<nombre>/SKILL.md`. Una skill leída así llega con su texto sin resolver: donde traiga la variable de la carpeta del plugin, vale esta ruta; y una ruta relativa suya (`references/…`) se busca en la carpeta de esa skill, no en el proyecto.
- **Las skills de las etapas se leen por su ruta, con la herramienta de lectura.** No las cargues de otra forma: así el orden y el avance los llevas tú.
- **El tablero manda sobre lo que recuerdes.** Antes de cada etapa de la 5 a la 8, relee las filas del tema.
- **Sin acceso al tablero no se deducen las etapas 5 a 8.** Dile a la persona que escriba `/mcp`, elija el conector del destino que dice `parrilla.md` y lo autorice. Si el conector no aparece en la sesión, sigue el paso «Consigue el acceso» de `construir-parrilla`. Detente hasta que una lectura real del tablero funcione.
- **Calcula las fechas con una herramienta,** nunca de memoria.

## CRÍTICO: arranque automático al cargar

1. **Mira en silencio qué etapas están hechas,** con la columna «Hecha cuando». Las etapas 1 a 4 se miran en los archivos del proyecto. Las etapas 5 a 8 se miran en el tablero, y solo si existe `parrilla.md`.
2. **Muestra el avance** (el bloque de abajo) y, en el mismo mensaje, empieza la primera etapa que aplica y no está hecha.
3. **Si todas las que aplican están hechas,** ve a «Cierre».

No resumas esta skill, no expliques cómo funciona y no preguntes si el usuario quiere correrla.

**El avance,** siempre con esta forma y nada más:

```
Tu avance: etapa 3 de 8

✅ 1 Redactores
✅ 2 Formatos
▶ 3 Estilo
⬜ 4 Tablero
⬜ 5 Tema
⬜ 6 Texto
⬜ 7 Pieza visual (si tu primera pieza la lleva)
⬜ 8 Publicación
```

Una etapa que no aplica se muestra como `➖`, con el motivo en pocas palabras (`➖ 3 Estilo (tus piezas no se arman aquí)`), y cuenta como hecha. La etapa 7 lleva su paréntesis hasta que el tema tenga texto aprobado.

## Cómo se corre una etapa

1. **Lee completo el `SKILL.md` de la skill de la etapa** y síguelo al pie de la letra, como si la persona hubiera escrito su comando. Sus preguntas, sus aprobaciones y sus reglas valen enteras.
2. **El avance va primero.** Las reglas de arranque de esa skill («tu siguiente mensaje es…», «sin texto antes», «nada más») valen para lo que viene después del bloque de avance, en el mismo mensaje.
3. **Ten su texto delante mientras dure la etapa.** Si la conversación es larga y ya no ves ese `SKILL.md` completo, vuelve a leerlo antes de seguir. Nunca escribas un archivo ni un campo del tablero de memoria: los nombres exactos están en la skill.
4. **No digas sus frases de cierre.** Donde esa skill da una «acción siguiente» o le pide a la persona que escriba un comando o una frase para seguir, no lo digas: lo que sigue lo dices tú.
5. **Si esa skill manda a otra** («Primero va tu estilo», «Escribe `/contenido:post-redactar [ID]`», «…`/contenido:post-disenar [ID]` para armarla de nuevo»), no te detengas ni le pases el comando a la persona: vuelve a la etapa de esa otra skill y córrela.
6. **Una etapa termina cuando su skill llegó a su último paso,** incluida su última pregunta, y su resultado existe. Con la respuesta de la persona, comprueba la etapa con «Hecha cuando», muestra el avance y empieza la etapa siguiente en ese mismo mensaje. Nunca juntes la última pregunta de una etapa con la primera de la siguiente.
7. **Al retomar en otra conversación,** una etapa cuyo resultado existe cuenta como hecha, aunque su skill no haya llegado a su última pregunta.
8. **Si una skill llega a su final sin su resultado** (el único tema se descartó, la fila volvió a revisión), la etapa sigue abierta: córrela otra vez. **Si la misma etapa termina igual dos veces seguidas, detente:** di en una línea qué la traba y qué puede hacer la persona, y que después vuelva a escribir `/contenido:setup`.
9. **Si la skill se detiene por otra razón** (falta un acceso, hay que reiniciar la sesión, la persona corta), detente tú también, con una sola línea: «Cuando vuelvas, escribe `/contenido:setup` y seguimos en la etapa [N]».

Lo propio de cada etapa:

- **1 · Redactores.** Un redactor que quedó «provisional» cuenta como hecho: dilo en una línea y sigue. Si la entrevista quedó a medias (existe `sobre-mi.md` pero falta `voz.md` o no hay ningún redactor), no ofrezcas rehacer: di que quedó a medias y sigue esa skill desde el paso que falta, con lo ya escrito.
- **2 · Formatos y 3 · Estilo.** Si el archivo existe pero le falta lo que su skill escribe al final (un `formatos.md` sin ninguna ficha, un `estilo.md` sin sus ocho campos), dilo en una línea y retoma la etapa sin borrar nada.
- **4 · Tablero.** Corre el flujo Configurar de `construir-parrilla`. Su pregunta sobre borrar los ejemplos se hace.
- **5 · Tema.** Corre `post-proponer` con este periodo: **solo la primera fecha libre**. Un tema, no cuatro. Si ya hay una fila real en `Tema Propuesto ✍️`, esa es la propuesta: no pidas otra, muéstrala y pide la decisión. Se cierra cuando el tema queda en `Tema Aprobado ✔`.
- **6 · Texto.** Corre `post-redactar` con el `ID` del tema. Se cierra con el ok de la persona.
- **7 · Pieza visual.** Corre `post-disenar` con el `ID` del tema: arma la pieza de cada fila que la lleve, también la de la derivada. Si no puede armarla (no hay acceso a Canva, el texto no cabe), sigue la salida que esa skill ofrezca: armarla aquí, que la arme ella (`**Pieza:** a mano`) o corregir el texto. Si el borrador lleva pieza pero la `Herramienta:` de su ficha es otra o está `pendiente`, la etapa no aplica: di en una línea «La pieza de este post la armas tú con el guion del borrador» y sigue.
- **8 · Publicación.** Antes de correrla, pregunta una sola vez: «Tu pieza está programada para el [día] [fecha]. ¿La publicas hoy o ese día?».
  - **Hoy:** corre `post-publicar` con el `ID` de la fila principal.
  - **Ese día:** detente con: «El [día] [fecha], escribe `/contenido:setup` y te entrego todo para publicar».
  - Si al volver la fila está en `Programado 🕦`, pide el link de lo publicado y cierra con `post-publicar`.

**Las etapas no se saltan desde aquí.** Si la persona no quiere hacer una, dile en una línea que puede correr cada skill por su cuenta, con su comando, y detente.

## Cierre

Cuando la fila principal del tema está en `Publicado ✅`, di, con sus datos reales:

1. El avance, con todo en ✅ o ➖.
2. El link de lo publicado. Si el tema tiene una derivada, en qué estado quedó y qué falta.
3. **Su rutina desde ahora,** en una tabla:

   | Cuándo | Comando | Para qué |
   |---|---|---|
   | Cada dos o cuatro semanas | `/contenido:post-proponer` | Decidir los temas de las próximas fechas |
   | Cuando tengas un tema aprobado | `/contenido:post-redactar` | Tener el texto escrito y aprobarlo |
   | Si el post lleva pieza visual | `/contenido:post-disenar` | Tener el carrusel, el infográfico o la tarjeta armados |
   | El día de la pieza | `/contenido:post-publicar` | Publicar y cerrar con el link |

4. Una sola acción siguiente: «Para dejar listo el resto del mes, escribe `/contenido:post-proponer`».

Si la persona vuelve a escribir `/contenido:setup` con todo hecho, dilo en dos líneas y muestra solo la tabla de la rutina.

## Reglas

- Cuando esta skill se active, ve directo al trabajo. Sin resumen, sin explicación, sin preámbulo.
- **Esta skill no define nada.** No pregunta lo que pregunta otra skill, no escribe sus archivos y no guarda una copia de lo que definen.
- **Cada etapa la hace su skill, entera.** No resumas ni acortes sus preguntas, y no te saltes ninguna aprobación para llegar antes.
- **El avance se muestra al arrancar y al terminar cada etapa,** siempre con la misma forma.
- **Una etapa está hecha cuando existe su resultado,** no cuando la skill dijo que terminó. Compruébalo con «Hecha cuando».
- **Siempre se puede cortar.** Toda parada termina con la misma instrucción: volver a escribir `/contenido:setup`.
- **Nada se publica ni se marca publicado desde aquí.** Publicar y cerrar siguen las reglas de `post-publicar`: el ok de la persona y su link.
- **Primera pieza, un solo tema.** El resto del calendario se arma después, con `/contenido:post-proponer`.
- Los nombres de los estados se copian exactos, con su emoji.
- Describe a la persona por sus rasgos. No la etiquetes por su país ni por su región.
