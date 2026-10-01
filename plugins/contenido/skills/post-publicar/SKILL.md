---
name: post-publicar
description: >
  Paso 3 de 3 del proceso de contenido: el día de la pieza, publica la publicación principal como diga su canal en formatos.md (o la entrega lista para que la persona la publique a mano), cierra su fila del tablero en Publicado con su link y su fecha real, y ese mismo día entrega la publicación que sale de ella, ya con el link puesto, para dejarla programada. No define nada: lee parrilla.md y formatos.md. Se usa escribiendo /contenido:post-publicar, con el ID de la pieza o con el link de lo que la persona ya publicó, después de /contenido:post-redactar. Actívala cuando el usuario diga "ya publiqué", "aquí está el link del post", "lo dejé programado", "qué publico hoy" o "publica el post de hoy".
argument-hint: "[ID de la pieza o link de lo publicado; por defecto, lo que toca hoy]"
---

# Publicar y cerrar

## Para quién es esta skill

Para un emprendedor que es la cara de su negocio y publica él mismo. Usa estos rasgos para interpretar sus respuestas; no los recites.

- **Lo que se le traba es publicar.** Este paso existe para que el día de la pieza tenga todo a mano, en un solo mensaje, y no tenga que buscar nada.
- **Publica en su cuenta, con su nombre.** Nada sale sin que él lo sepa y lo haya aprobado.
- **Él decide, la skill propone.** Ninguna pieza se publica ni se cierra sin su palabra.

## Dónde está en el proceso

| Paso | Skill | Deja las filas en |
|---|---|---|
| 1 · Proponer temas | `/contenido:post-proponer` | `Tema Aprobado ✔` o `Descartado 🗑️` |
| 2 · Redactar | `/contenido:post-redactar` | `Listo a Publicar 👍` |
| **3 · Publicar y cerrar** | `/contenido:post-publicar` | `Programado 🕦` y `Publicado ✅` |

**Resultado de este paso:** cada publicación del tema en `Publicado ✅`, con su `URL publicada` y su `Fecha de publicacion` real.

## Qué lee

Esta skill no define nada y no pregunta lo que ya está escrito:

| De dónde | Qué toma |
|---|---|
| `parrilla.md` | Dónde está el tablero y cómo se llega, y la carpeta de borradores |
| `formatos.md` | De cada canal, la línea `Publicar:` (cómo se publica ahí) y la línea `Lleva:` (cuándo sale la derivada) |
| `posts/` | El borrador aprobado de cada fila: su texto, su versión, su fecha de aprobación y la línea `**Pieza:**`, si `/contenido:post-disenar` armó su pieza visual |

**Un tema puede tener dos filas.** La **principal** y su **derivada**, que es la publicación que sale de ella en otro canal y lleva `Sale de [ID].` al inicio de sus `Notas`, con su punto.

- **El `ID` se compara completo:** `Sale de AB-1.` no es `Sale de AB-12.`
- La marca se busca donde vivan las `Notas` de la fila: en ClickUp, si `Notas` no existe como campo, en la línea `Notas:` de la descripción.
- Si ninguna fila nombra a la principal, el tema tiene una sola publicación y el paso 5 no aplica.

**La línea `Publicar:`** va debajo de un canal en `formatos.md` y dice cómo se publica ahí:

```
## Blog propio

Por defecto: artículo corto
Texto: según el tipo
Lleva: linkedin - carrusel, al día hábil siguiente
Publicar: a mano
```

- `a mano`: la publica la persona. La skill le entrega todo listo para copiar.
- Cualquier otra cosa nombra con qué se publica (por ejemplo, el gestor de su blog). Solo vale si la sesión tiene esa herramienta.
- **Sin esa línea, es `a mano`.** No la supongas ni la preguntes: si la persona quiere otra forma de publicar, se define con `/contenido:construir-formatos`.
- No es la línea `**Publicar:**` de la cabecera de un borrador, que guarda la fecha de la pieza.

## Entorno

- **Se opera con el acceso real que tenga la sesión al tablero.** Sin acceso, no sigas: dile a la persona que escriba `/mcp`, elija el conector del destino que dice `parrilla.md` y lo autorice. Si el conector no aparece en la sesión, lo agrega `/contenido:construir-parrilla`. Nunca afirmes que creaste o actualizaste una fila sin haberla releído.
- **Publicar es un acto hacia afuera y no se deshace.** Usar una herramienta para publicar exige el ok explícito de la persona para esa pieza, dicho en esta conversación. La aprobación del texto en el paso 2 del proceso no cuenta como ok para publicar.
- **Calcula las fechas con una herramienta,** nunca de memoria. «Hoy» es hoy en la hora local de la persona.
- Nunca declares publicado lo que no comprobaste. «La herramienta no dio error» no es una comprobación.

## CRÍTICO: arranque automático al cargar

Mira en silencio si existe `parrilla.md` y sigue:

- **No existe:** di una sola línea: «Primero va el tablero: escribe `/contenido:construir-parrilla`». Detente ahí.
- **Existe:** léelo, lee `formatos.md` si existe y empieza por donde diga esta tabla:

| Lo que llega | Por dónde empiezas |
|---|---|
| Un `ID`, o nada | Paso 1 |
| Un link de algo ya publicado («ya publiqué») | Paso 4, con la fila de ese link. Si es una principal y su derivada sigue en `Listo a Publicar 👍`, **sigue al paso 5 en el mismo turno** |
| «Lo dejé programado» | La fila pasa a `Programado 🕦`. Se cierra cuando pase el link |

No resumas esta skill, no expliques cómo funciona y no preguntes si el usuario quiere correrla.

## 1. Toma la pieza

**Con `ID`:** esa fila, tenga la fecha que tenga, **si está en `Listo a Publicar 👍`**. En otro estado no se publica: di en cuál está y qué la mueve (`/contenido:post-redactar [ID]` si le falta el ok; el link de lo publicado, si ya está en `Programado 🕦`). Si es una derivada y su principal todavía no está en `Publicado ✅`, no se entrega sola: toma la principal y sigue con ella.

**Sin `ID`,** solo lo que toca hoy:

1. Las filas principales en `Listo a Publicar 👍` con `Fecha programada` de hoy → paso 2.
2. Las derivadas en `Listo a Publicar 👍` cuya principal ya está en `Publicado ✅`: quedaron sin entregar → paso 5.

Si hay más de una, muéstralas en una tabla (`ID · Tema · Canal + tipo · Fecha`) y pregunta por cuál empiezas. Si no hay ninguna, dilo en una línea y pide el `ID` de la pieza. No listes piezas de otras fechas.

Lo que empieza con `[PRUEBA]` o `[EJEMPLO]` no es una pieza: no lo listes ni lo publiques.

## 2. Comprueba que lo aprobado sigue igual

Abre el borrador de cada fila del tema y haz tres comprobaciones:

1. **La versión.** La de `**Aprobado para publicar:** AAAA-MM-DD (vN)` tiene que ser la misma de la cabecera `Actualizado: AAAA-MM-DD (vN)`. Si no coinciden, o si la aprobación dice «pendiente», el texto cambió después del ok o nunca se aprobó.
2. **Las palabras.** Cuenta con una herramienta (por ejemplo `wc -w`) el texto de `## Para publicar`, sin las líneas `**Imagen:**` y `**Primer comentario:**` y sin el bloque del tipo, y compáralo con `Palabras` de la fila. Si no coincide, no decidas tú: pregunta «El texto tiene N palabras y la fila dice M. ¿Lo cambiaste después de aprobarlo?». Si dice que no, corrige `Palabras` y sigue.
3. **La pieza visual.** Si el borrador trae `**Pieza:** … (vN)`, esa versión tiene que ser la aprobada. Si es anterior, la pieza se armó con otro texto y no se entrega: di «Escribe `/contenido:post-disenar [ID]` para armarla de nuevo» y no publiques esa fila.

**Una pieza que cambió después del ok no se publica.** Vuelve a `Borrador Listo 👀`, lo dices en una línea y das la acción: «Escribe `/contenido:post-redactar [ID]` para revisarla y aprobarla».

- Si cambió la principal, vuelve también su derivada y no se publica nada del tema.
- Si cambió solo la derivada, la principal sigue su curso; la derivada se entrega cuando vuelva a `Listo a Publicar 👍`.

## 3. Publica la principal

Según la línea `Publicar:` del canal de la pieza:

**`a mano`, o sin línea.** Entrega, en **un solo mensaje**, todo lo que la persona necesita para publicar sin buscar nada:

1. El texto de `## Para publicar`, completo, dentro de un bloque de código para copiar.
2. La pieza visual, si la pieza la lleva: lo que diga la línea `**Pieza:**` del borrador (la ruta del archivo o el link del diseño). Si no hay línea, o dice `a mano`, el guion con el que la arma (`## Láminas`, `## Infográfico`, `## Guion de video`) o la indicación de `**Imagen:**`.
3. El primer comentario, si lo lleva.
4. El link de la fila en el tablero.

Y una línea con lo que tiene que hacer: «Publícala y pégame el link aquí».

**Con una herramienta.** Si la sesión la tiene, pide el ok para esa pieza con una sola pregunta: «¿Publico "[titular]" en [canal] ahora?». Con el ok, publica el texto aprobado, sin cambiarle nada, y lee de vuelta lo publicado. Si la sesión no tiene la herramienta, dilo en una línea y entrégala como `a mano`.

Si la persona dice que la dejó programada en su canal, la fila pasa a `Programado 🕦` y se cierra cuando pase el link.

## 4. Comprueba y cierra

Vale para cualquier fila, principal o derivada. Empieza cuando la persona pasa el link de lo publicado, o cuando la skill publicó con una herramienta.

1. **Encuentra la fila:** la que se acaba de entregar o, si el link llegó solo, la que está en `Listo a Publicar 👍` o `Programado 🕦` y coincide con el canal del link. Si puede ser más de una, pregunta cuál.
2. **Comprueba en línea.** Si tienes una herramienta de navegador, abre el link y mira que es la pieza aprobada. Si no se puede comprobar, dilo: no afirmes que está bien.
3. **Cierra la fila:** `Estado` `Publicado ✅`, `URL publicada` y `Fecha de publicacion` (la **real**, no la programada). Si el texto publicado difiere del borrador, corrige `Palabras`.
4. **En el borrador:** completa `**Link:**`.
5. Relee la fila.

**Nunca se marca `Publicado ✅` sin el link,** aunque el post se vea en vivo. Una pieza a mano se cierra con el link que pasa la persona; una publicada con herramienta, con el link que devolvió la herramienta y que la skill abrió.

**Si la fila que cerraste es una principal con derivada, sigue al paso 5 en el mismo turno.**

## 5. Entrega la derivada, ya con el link

**El mismo día en que se cierra la principal,** apenas tiene su `URL publicada`. No se espera a la fecha de la derivada. Si la principal todavía no tiene link (quedó programada), la derivada espera: dilo en una línea.

0. **Solo se entrega una derivada que está en `Listo a Publicar 👍`.** Si volvió a `Borrador Listo 👀`, o su aprobación dice «pendiente», no se entrega: di que espera su ok y da el comando `/contenido:post-redactar [ID]`.
1. **Pon el link.** Reemplaza `[link de la principal]` por la `URL publicada` de la principal en el archivo de la derivada y en su página, si la tiene. Eso no cambia la versión ni la aprobación: completar el link no es un cambio de texto. Si el marcador estaba dentro del texto de `## Para publicar`, pon al día `Palabras`.
2. **Calcula su fecha** desde la `Fecha de publicacion` real de la principal, con lo que diga `Lleva:` de su canal (`el mismo día`, `al día hábil siguiente`, `N días después`). Sin línea `Lleva:`, vale la `Fecha programada` de la fila; si ya pasó, pregunta la fecha. Si la fecha que resulta no es la de la fila, actualiza `Fecha programada` y la línea `**Publicar:**` del borrador, y dilo.
3. **Entrega la derivada** igual que en el paso 3: texto completo para copiar, la pieza visual o su guion, el primer comentario y el link de la fila.
4. Dile qué hacer: «Déjala programada en [canal] para el [día] [fecha]».
5. Cuando diga que la dejó programada, la fila pasa a `Programado 🕦`.

La derivada se cierra con el paso 4 cuando sale: la persona vuelve con el link.

## Cierre del turno

Muestra el estado del tema en una tabla (`ID · Canal + tipo · Estado · Link`) y, si queda algo abierto, una sola acción siguiente: «Cuando salga el post del [día], escribe `/contenido:post-publicar` y pega el link».

## Reglas

- Cuando esta skill se active, ve directo al trabajo. Sin resumen, sin explicación, sin preámbulo.
- **Esta skill lee, no define.** Cómo se publica en cada canal y cuándo sale la derivada están en `formatos.md`. No lo preguntes, no lo cambies y no guardes una copia.
- **Solo se publica lo aprobado, sin cambios posteriores.** Si la versión no coincide con la aprobada, o la persona confirma que tocó el texto, la pieza vuelve a `Borrador Listo 👀`.
- **Esta skill no escribe ni corrige textos.** Lo único que cambia en un texto es el marcador `[link de la principal]`.
- **Publicar con una herramienta exige el ok explícito de la persona para esa pieza,** en esta conversación.
- **Ninguna fila llega a `Publicado ✅` sin `URL publicada` y `Fecha de publicacion`.**
- **La derivada se entrega el día en que se cierra la principal,** con el link puesto y su fecha recalculada, para dejarla programada. Nunca se entrega con el marcador sin reemplazar.
- **Un solo mensaje por entrega,** con todo lo necesario para publicar. Si falta una parte, no se entrega: se dice qué falta.
- **Sin `ID`, solo lo de hoy.** Esta skill no lista ni persigue piezas de otras fechas.
- Lo que se agregue a `Notas` de una derivada va después de la marca `Sale de [ID].`
- Los nombres de los campos y los valores de `Estado` se copian exactos.
- Cada cambio se escribe en el tablero en el mismo turno en que ocurre, y se verifica releyendo.
- Describe a la persona por sus rasgos. No la etiquetes por su país ni por su región.
- Sin `parrilla.md` no corre: primero va `/contenido:construir-parrilla`.
