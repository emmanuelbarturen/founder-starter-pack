---
name: construir-formatos
description: >
  Define los formatos de publicación de un emprendedor que publica él mismo en redes sociales: por cada canal (LinkedIn, Instagram, Facebook, blog propio u otro), qué tipos de publicación usa (texto solo, texto + imagen, texto + video, carrusel, infográfico, artículo) y una ficha por tipo que dice qué es, cuándo conviene, qué entrega el borrador, sus reglas y qué arma la persona a mano. También define, por canal, qué otra publicación sale de cada pieza y cómo se publica. Deja formatos.md en el proyecto; con él, la parrilla ofrece sus tipos en «Canal + tipo» y cada borrador sale con la forma de su tipo (un carrusel, con su guion lámina por lámina). Actívala cuando el usuario diga "define mis formatos", "construye mis formatos", "qué tipos de publicación uso", "agrega un canal", "agrega un formato", "agrega el carrusel", "cambia la ficha del carrusel" o "qué entrega un infográfico".
---

# Construir formatos

## Para quién es esta skill

Para un emprendedor que es la cara de su negocio y publica él mismo. Usa estos rasgos para interpretar sus respuestas; no los recites.

- **Tiene poco tiempo por publicación.** Los formatos existen para que cada borrador llegue con la forma lista y no haya que pensarla cada semana.
- **La pieza visual la arma él.** No tiene diseñador ni editor de video. La ficha le dice qué recibe del borrador y qué le toca hacer a mano.
- **Publica con lo que tiene.** Sus reglas (cuántas láminas, cuánto dura un video, con qué herramienta lo arma) salen de su práctica, no de una receta.
- **Él decide, la skill propone.** Ningún formato queda escrito sin su ok.

## Qué construye

```
formatos.md      por cada canal, los tipos de publicación que usa la persona
                 y una ficha por tipo
```

Un **canal** es dónde publica (LinkedIn, su blog). Un **tipo** es la forma de la publicación en ese canal (carrusel, texto solo). La **ficha** de un tipo dice qué es, cuándo conviene, qué entrega el borrador, las reglas de la persona y qué arma ella a mano. La **regla de texto** de un canal dice cuánto mide como máximo el texto que se publica ahí y cuántos hashtags lleva.

**Esta skill define; no construye.** La regla de texto y las reglas de cada tipo se definen aquí y solo aquí. Las demás skills las usan: no las vuelven a preguntar ni guardan una copia.

Dos líneas opcionales de un canal completan lo anterior: **`Lleva:`** dice qué otra publicación sale de cada pieza de ese canal y cuándo, y **`Publicar:`** dice cómo se publica ahí.

`formatos.md` lo leen otras skills del plugin. `construir-parrilla` toma de ahí las opciones del campo `Canal + tipo`. Las skills `post-*` leen la regla de texto, la forma de cada borrador y las líneas `Lleva:` y `Publicar:`, y `post-disenar` lee la `Herramienta:` de cada ficha. Por eso **la estructura del archivo es fija** y los nombres de sus campos se copian exactos.

## Entorno

- **Recaba toda la información que puedas con `AskUserQuestion`.** Todo dato con respuestas previsibles se pregunta con opciones: los canales, los tipos, el tipo por defecto, las reglas, qué cambiar y la confirmación final. El chat queda solo para lo que no cabe en opciones (el nombre de un canal o de un tipo propio y su descripción) y para cuando la herramienta no está disponible: en ese caso, haz las mismas preguntas en el chat.
- Respeta los límites de `AskUserQuestion`: máximo 4 preguntas por llamada y de 2 a 4 opciones por pregunta. La persona siempre puede escribir otra respuesta: tómala como válida. Reutiliza lo que el usuario ya haya dicho.
- Trabaja en el proyecto que eligió el usuario. Instalar la skill nunca crea nada.
- Esta skill solo escribe `formatos.md`. No toca la parrilla, los redactores ni ningún borrador.
- Definir un formato no autoriza a publicar ni a producir la pieza visual.

## CRÍTICO: arranque automático al cargar

Cuando el usuario pida este flujo, haz el Paso 0 en silencio y sigue:

- **No existe `formatos.md`:** tu siguiente mensaje es la primera pregunta que falte (los canales, o los tipos si los canales ya se saben). Nada más.
- **Existe:** léelo. Si el pedido ya dice qué cambiar («agrega el carrusel de Instagram», «cambia la ficha del video», «mi blog lleva un post en LinkedIn»), ve directo a eso. Si no, haz una sola pregunta con `AskUserQuestion`, con estas cuatro opciones: **sumar un canal o un tipo**, **cambiar una ficha**, **cambiar qué sale de cada pieza o cómo se publica** (las líneas `Lleva:` y `Publicar:`) o **rehacer** todo. Al actualizar, edita el archivo en su sitio y conserva lo que la persona haya escrito a mano.

No resumas esta skill, no expliques cómo funciona y no preguntes si el usuario quiere correrla.

## Paso 0. Reconoce el terreno

Mira, sin comentar, qué hay en el proyecto. Lo que ya está escrito no se vuelve a preguntar:

- `formatos.md`: lo ya definido. Una línea `Lleva:` o `Publicar:` que ya esté escrita, a mano o por esta skill, se conserva y no se vuelve a preguntar, salvo que la persona pida cambiarla.
- `sobre-mi.md` y `.claude/agents/redactor-*.md`: la sección «Redes, formato y ritmo» de cada redactor dice en qué redes publica y con qué forma. Esas redes son sus canales, y esas formas se proponen ya marcadas.
- `parrilla.md`: su «Canal por defecto» es un canal y un tipo que la persona ya usa. Si trae una línea «Texto», es una regla de texto escrita antes de que existiera `formatos.md`: se ofrece como primera opción de la pregunta («La que ya tienes»), no se copia sin preguntar.
- `voz.md` y los redactores: si dicen cuánto mide un texto o si lleva hashtags («nunca hashtags»), **manda la voz**. Eso se escribe en la regla de texto diciendo de dónde salió, y no se pregunta.

**Lleva cada forma escrita antes a su tipo del catálogo.** Los redactores y una parrilla anterior usan otros nombres: «texto corto» o `texto` es **texto solo** · «foto» es **texto + imagen** (en Instagram, **imagen**) · «video», «video con guion» o «Reel» es **texto + video** (en Instagram, **video**). Solo una forma que no tiene equivalente (por ejemplo «hilo») se propone como tipo propio.

## Paso 1. Canales y tipos

**La entrevista es corta y va con `AskUserQuestion`: con uno o dos canales, seis tandas de preguntas o menos** (canales, tipos, por defecto y reglas, regla de texto, qué sale de cada pieza y cómo se publica, confirmación). Con más canales hacen falta más tandas: junta en cada llamada todas las preguntas que quepan y no hagas ninguna que el Paso 0 ya respondió.

### Canales

Si el Paso 0 no dio ningún canal, pregunta:

```json
[
  {
    "question": "¿En qué canales publicas?",
    "header": "Canales",
    "multiSelect": true,
    "options": [
      {"label": "LinkedIn", "description": "Texto solo, texto + imagen, texto + video, carrusel o infográfico"},
      {"label": "Instagram", "description": "Carrusel, imagen o video"},
      {"label": "Facebook", "description": "Texto solo, texto + imagen o texto + video"},
      {"label": "Blog propio", "description": "Artículo largo o artículo corto"}
    ]
  }
]
```

**Si los canales ya salieron del Paso 0, no los vuelvas a preguntar, pero pregunta si hay alguno más.** Va en la misma tanda que los tipos, con los canales del catálogo que faltan como opciones y una última opción para no sumar ninguno:

```json
[
  {
    "question": "Ya sé que publicas en LinkedIn e Instagram. ¿Publicas en algún otro canal?",
    "header": "Otro canal",
    "multiSelect": true,
    "options": [
      {"label": "Facebook", "description": "Texto solo, texto + imagen o texto + video"},
      {"label": "Blog propio", "description": "Artículo largo o artículo corto"},
      {"label": "No, solo esos", "description": "Sigo con LinkedIn e Instagram"}
    ]
  }
]
```

Si suma un canal, pregunta sus tipos en la tanda siguiente. Si la persona nombra un canal que no está en la lista, es un **canal propio**: ve a «Canal o tipo propio».

### Tipos de cada canal

Una pregunta por canal, con varias respuestas posibles y los tipos de «Tipos por canal» como opciones. Si un canal tiene más de 4 tipos, pártelo en dos preguntas. LinkedIn, que tiene cinco, se pregunta así:

```json
[
  {
    "question": "En LinkedIn, ¿qué publicaciones de texto haces?",
    "header": "LinkedIn",
    "multiSelect": true,
    "options": [
      {"label": "Texto solo", "description": "El post es el texto, sin nada más"},
      {"label": "Texto + imagen", "description": "El texto lleva el contenido y una imagen lo acompaña"},
      {"label": "Texto + video", "description": "Un video, con un texto que lo presenta"}
    ]
  },
  {
    "question": "En LinkedIn, ¿qué piezas visuales haces?",
    "header": "LinkedIn",
    "multiSelect": true,
    "options": [
      {"label": "Carrusel", "description": "Varias láminas que se pasan, con un texto que las presenta"},
      {"label": "Infográfico", "description": "Una sola imagen que lleva el contenido: datos, pasos o una comparación"},
      {"label": "Ninguna por ahora", "description": "Solo publico texto, con o sin imagen o video"}
    ]
  }
]
```

Los demás canales siguen la misma forma, con sus tipos. Marca como sugeridos los tipos que ya aparecen en sus redactores o en `parrilla.md`. Si la persona nombra un tipo que no está en el catálogo, es un **tipo propio**.

## Paso 2. El tipo por defecto y sus reglas

Con `AskUserQuestion`, solo sobre los tipos que eligió. Las preguntas de abajo son la referencia: usa las que apliquen y arma sus opciones con lo que la persona ya respondió.

```json
[
  {
    "question": "En LinkedIn, ¿qué formato usas más seguido?",
    "header": "Más usado",
    "multiSelect": false,
    "options": [
      {"label": "Texto solo", "description": "Es lo que más publico. Tus temas saldrán así, salvo los que necesiten otro formato"},
      {"label": "Texto + imagen", "description": "Es lo que más publico. Tus temas saldrán así, salvo los que necesiten otro formato"},
      {"label": "Carrusel", "description": "Es lo que más publico. Tus temas saldrán así, salvo los que necesiten otro formato"}
    ]
  },
  {
    "question": "¿Cuántas láminas lleva tu carrusel?",
    "header": "Láminas",
    "multiSelect": false,
    "options": [
      {"label": "Hasta 5", "description": "Corto: una idea con pocos pasos"},
      {"label": "De 6 a 8", "description": "Medio: un proceso o una lista"},
      {"label": "De 9 a 12", "description": "Largo: una guía completa"},
      {"label": "Lo decido después", "description": "Queda pendiente en la ficha"}
    ]
  },
  {
    "question": "¿Cuánto dura tu video?",
    "header": "Video",
    "multiSelect": false,
    "options": [
      {"label": "Menos de 1 minuto", "description": "Una sola idea, dicha rápido"},
      {"label": "De 1 a 3 minutos", "description": "Una explicación o una demostración corta"},
      {"label": "Más de 3 minutos", "description": "Un tema desarrollado"},
      {"label": "Lo decido después", "description": "Queda pendiente en la ficha"}
    ]
  },
  {
    "question": "¿Con qué armas tus piezas visuales?",
    "header": "Herramienta",
    "multiSelect": false,
    "options": [
      {"label": "Claude Code", "description": "Se la pido a Claude aquí mismo: /contenido:post-disenar la arma con mi estilo y la exporta a PDF e imagen"},
      {"label": "Canva", "description": "/contenido:post-disenar crea el diseño en mi cuenta de Canva y yo lo ajusto ahí"},
      {"label": "Figma", "description": "Diseño propio, lámina por lámina. La armo yo con el guion del borrador"},
      {"label": "Lo decido después", "description": "Queda pendiente en la ficha"}
    ]
  }
]
```

- **El tipo por defecto** se pregunta una vez por canal, con los tipos que eligió como opciones. Pregunta en palabras de todos los días («¿qué formato usas más seguido?»): no uses «por defecto» ni «formato de todos los días» en la pregunta. La explicación de para qué sirve va en la descripción de cada opción. Si en un canal eligió un solo tipo, ese es el tipo por defecto y no se pregunta. Si eligió más de 4, ofrece los cuatro más probables: puede escribir otro.
- **Las reglas** se preguntan solo para los tipos elegidos que las piden: las láminas, si eligió carrusel; la duración, si eligió un tipo con video; la herramienta, si eligió carrusel, infográfico o un tipo con imagen. Para otra regla previsible, arma la pregunta igual: rangos como opciones y «Lo decido después».
- **La herramienta se escribe en «Lo haces tú», no en «Tus reglas».** «Tus reglas» lleva solo lo que el borrador debe cumplir (láminas, duración, extensión). Va al final del campo, con la etiqueta `Herramienta:` y el nombre tal cual: `Herramienta: Claude Code`, `Herramienta: Canva`, `Herramienta: Figma` u otra que la persona escriba. «Lo decido después» se escribe `Herramienta: pendiente`. Solo la llevan los tipos con pieza visual: carrusel, infográfico y los que llevan imagen.
- **Un tipo que está en más de un canal se pregunta una sola vez.** Su regla vale para todos sus canales, y la pregunta lo dice («¿Cuántas láminas lleva tu carrusel? Vale para LinkedIn e Instagram»). Si la persona quiere una regla distinta por canal, la escribe en la respuesta libre.
- Los rangos de las opciones son puntos de partida para que la persona elija **su** regla, no límites de ninguna plataforma. Si escribe otro número, ese manda.
- «Lo decido después» o una pregunta sin responder queda como «pendiente» en la ficha. **No inventes una regla** ni pongas un número que la persona no dijo.
- Los límites de cada plataforma (medidas, duración, cantidad de caracteres) cambian y esta skill no los afirma. Si la persona los pregunta, dile que los mire en la plataforma y que anote aquí su propia regla.

### La regla de texto de cada canal

Cuánto mide como máximo el texto que se publica en ese canal y cuántos hashtags lleva. Se define aquí, una vez por canal, y vale para el bloque `## Para publicar` de todos sus tipos.

```json
[
  {
    "question": "En LinkedIn, ¿cuánto mide tu texto como máximo?",
    "header": "Texto",
    "multiSelect": false,
    "options": [
      {"label": "Hasta 100 palabras", "description": "Corto: una idea y nada más"},
      {"label": "Hasta 200 palabras", "description": "Medio: una historia con su cierre"},
      {"label": "Hasta 300 palabras", "description": "Largo: un caso con su contexto"},
      {"label": "Lo decido después", "description": "Queda pendiente"}
    ]
  },
  {
    "question": "¿Cuántos hashtags llevan tus publicaciones?",
    "header": "Hashtags",
    "multiSelect": false,
    "options": [
      {"label": "Ninguno", "description": "Mis textos van sin hashtags"},
      {"label": "De 1 a 3", "description": "Pocos, al final del texto"},
      {"label": "De 4 a 6", "description": "Varios, al final del texto"},
      {"label": "Lo decido después", "description": "Queda pendiente"}
    ]
  }
]
```

- **La extensión** se pregunta una vez por canal. Si `parrilla.md` ya traía una regla de texto, va como primera opción: «La que ya tienes: [la regla]».
- **Los hashtags** se preguntan una sola vez y valen para todos los canales.
- Lo que ya dicen `voz.md` o los redactores no se pregunta: se escribe con su origen («sin hashtags, lo dice `voz.md`»).
- En un blog la extensión depende del artículo: va en «Tus reglas» del artículo largo y del corto, y la regla de texto del canal dice «según el tipo», seguida de la regla de hashtags si la persona los usa en su blog.
- Como en las demás reglas: los rangos son puntos de partida para que la persona elija la suya, no límites de ninguna plataforma.

### Qué sale de cada pieza y cómo se publica

Dos líneas opcionales de cada canal. Van en la misma tanda que la regla de texto si caben; si no, en la siguiente.

**`Lleva:`** dice que cada pieza de un canal lleva otra publicación en otro canal: cada artículo del blog, su post en LinkedIn. Se pregunta **solo si la persona tiene dos canales o más**.

```json
[
  {
    "question": "¿Alguna de tus publicaciones lleva otra en otro canal?",
    "header": "Lleva",
    "multiSelect": false,
    "options": [
      {"label": "Cada artículo del blog, un post en LinkedIn", "description": "El post presenta el artículo y lleva su link"},
      {"label": "Cada post de LinkedIn, uno en Instagram", "description": "El mismo tema, con la forma del otro canal"},
      {"label": "No, cada tema sale en un solo canal", "description": "Una publicación por tema"}
    ]
  },
  {
    "question": "Si lleva otra, ¿cuándo sale?",
    "header": "Cuándo",
    "multiSelect": false,
    "options": [
      {"label": "El mismo día", "description": "Sale junto con la primera"},
      {"label": "Al día hábil siguiente", "description": "Un día después, sin contar sábado ni domingo"},
      {"label": "Dos días después", "description": "O escribe cuántos días"}
    ]
  }
]
```

- Las opciones de la primera pregunta se arman con **sus** canales: un par por opción, y siempre la opción de que no lleva ninguna. Si responde que no, la segunda pregunta no cuenta y no se escribe la línea.
- La línea va debajo del canal **de la pieza de la que sale la otra**: `Lleva: <opción en la parrilla>, <cuándo>`. La opción se copia de la ficha del tipo que sale, sin comillas invertidas. `<cuándo>` es exactamente `el mismo día`, `al día hábil siguiente` o `N días después`.
- El tipo de la publicación que sale es el de la línea `Por defecto:` de su canal, salvo que la persona nombre otro.
- **Una sola línea `Lleva:` por canal, con una sola publicación.** Si la persona pide dos, escribe la primera y dile que por ahora cada canal lleva una sola.

**`Publicar:`** dice cómo se publica en un canal. Se pregunta **solo para un blog y para un canal propio**. En una red social no se pregunta ni se escribe: sin la línea, publica la persona a mano.

```json
[
  {
    "question": "¿Cómo publicas en tu blog?",
    "header": "Publicar",
    "multiSelect": false,
    "options": [
      {"label": "A mano", "description": "Copio el texto y lo subo yo al gestor de mi blog"},
      {"label": "Con una herramienta", "description": "Un conector o un comando de esta sesión que publica por mí. Escribe cuál"},
      {"label": "Lo decido después", "description": "Mientras tanto, publicas a mano"}
    ]
  }
]
```

- «A mano» se escribe `Publicar: a mano`. Con una herramienta, `Publicar:` y su nombre tal como lo dijo la persona. «Lo decido después» no escribe la línea.
- Esta skill no comprueba que la herramienta exista ni la configura. Eso lo comprueba la skill que publica, antes de usarla y con el ok de la persona.

### Canal o tipo propio

Un canal o un tipo que no está en el catálogo llega escrito por la persona en la respuesta libre de una pregunta. Primero mira si una ficha de referencia le sirve (un video en otro canal usa la ficha de video): si sirve, úsala y cambia solo la opción, sin preguntar más. Si no sirve, pregunta con `AskUserQuestion` lo que tenga respuestas previsibles (qué bloque quiere en el borrador: solo texto, texto y guion, texto y láminas, texto e indicación de imagen) y pide en un solo mensaje en el chat lo que no cabe en opciones: qué es y cuándo lo usa.

## Paso 3. Confirma y escribe formatos.md

Antes de escribir, muestra el resumen en una tabla, con la regla de texto de cada canal en una línea debajo y, si las hay, sus líneas `Lleva:` y `Publicar:`, y pide el ok con `AskUserQuestion`:

| Canal | Tipo | Por defecto | Tus reglas |
|---|---|---|---|

```json
[
  {
    "question": "¿Escribo tus formatos así?",
    "header": "Confirmar",
    "multiSelect": false,
    "options": [
      {"label": "Sí, escríbelo", "description": "Queda formatos.md con los canales y los tipos de la tabla"},
      {"label": "Cambiar algo", "description": "Dime qué canal, qué tipo o qué regla cambia"}
    ]
  }
]
```

Con el ok, escribe `formatos.md` en la raíz del proyecto. **La estructura es fija:** un `## <Canal>` por canal, debajo sus líneas `Por defecto:` y `Texto:` (y `Lleva:` y `Publicar:`, si aplican), y un `### <tipo>` por tipo con los seis campos, siempre con estos nombres y en este orden:

```
# Formatos

Actualizado: AAAA-MM-DD

## LinkedIn

Por defecto: texto solo
Texto: [extensión máxima y hashtags, con su origen si salió de `voz.md`; o «pendiente»]

### texto solo
- **Opción en la parrilla:** `linkedin - texto`
- **Qué es:** [de la ficha de referencia]
- **Cuándo conviene:** [de la ficha de referencia, ajustado a lo que dijo la persona]
- **El borrador entrega:** [de la ficha de referencia]
- **Tus reglas:** [lo que dijo la persona · «la regla de texto del canal» si el tipo no tiene otra · «pendiente» si la dejó para después]
- **Lo haces tú:** [de la ficha de referencia]

### carrusel
- **Opción en la parrilla:** `linkedin - carrusel`
[...]
- **Lo haces tú:** [de la ficha de referencia]. Herramienta: [la que nombró la persona · `pendiente`]

## Blog propio

Por defecto: artículo corto
Texto: según el tipo
Lleva: linkedin - carrusel, al día hábil siguiente
Publicar: a mano
[...]
```

- Las líneas `Lleva:` y `Publicar:` van solo en el canal donde la persona las definió, después de `Texto:` y en ese orden. Un canal sin ellas no las lleva.

- Solo se escriben los canales y los tipos que la persona eligió.
- **`Por defecto:` es la copia exacta de un `### <tipo>` de ese canal,** en minúsculas (`Por defecto: texto solo`, con un `### texto solo` debajo). No lleva la opción ni una abreviatura.
- **«Opción en la parrilla» se copia exacta** de «Tipos por canal»: `<canal> - <tipo>`, en minúsculas y sin tilde, entre comillas invertidas. No se repite entre fichas. Las del catálogo son las únicas abreviadas (`linkedin - texto`, `blog - largo`). Para un canal o un tipo propio, la opción es el nombre del canal y el del tipo tal como quedan en sus encabezados, en minúsculas, sin tildes y sin paréntesis (`x - hilo`).
- «Qué es», «Cuándo conviene» y «El borrador entrega» salen de la ficha de referencia. Cámbialos solo con lo que la persona dijo.

## Paso 4. Entrega

Di, con sus datos reales:

> Tus formatos quedaron en formatos.md. Puedes abrirlo y corregirlo a mano: lo que escribas ahí manda.

Si llegaste aquí desde la configuración de la parrilla, no des acción siguiente: vuelve a ese paso. Si no, agrega **una sola** acción siguiente, la primera que aplique:

1. Si existe `parrilla.md`: «Para que tu tablero tenga estas opciones en `Canal + tipo`, escribe `/contenido:construir-parrilla`».
2. Si no existe: «Para que estos formatos lleguen a tu calendario, di "construye mi parrilla"».

Si alguna regla quedó pendiente, dilo en una línea: qué ficha y qué falta.

## El catálogo

### Tipos por canal

| Canal | Tipo | Opción en la parrilla |
|---|---|---|
| LinkedIn | texto solo | `linkedin - texto` |
| LinkedIn | texto + imagen | `linkedin - texto + imagen` |
| LinkedIn | texto + video | `linkedin - texto + video` |
| LinkedIn | carrusel | `linkedin - carrusel` |
| LinkedIn | infográfico | `linkedin - infografico` |
| Instagram | carrusel | `instagram - carrusel` |
| Instagram | imagen | `instagram - imagen` |
| Instagram | video | `instagram - video` |
| Facebook | texto solo | `facebook - texto` |
| Facebook | texto + imagen | `facebook - texto + imagen` |
| Facebook | texto + video | `facebook - texto + video` |
| Blog propio | artículo largo | `blog - largo` |
| Blog propio | artículo corto | `blog - corto` |

### Fichas de referencia

Una por tipo. Valen para cualquier canal que tenga ese tipo. **Todo borrador trae el bloque `## Para publicar`**, con el texto tal como se publica; lo que cambia entre tipos es el bloque que lo acompaña.

**texto solo**
- Qué es: una publicación donde el texto es todo.
- Cuándo conviene: una historia, una decisión o un aprendizaje que se cuenta de corrido. Es el formato de todos los días.
- El borrador entrega: `## Para publicar` con el texto completo. Nada más.
- Lo haces tú: copiar y publicar.

**texto + imagen**
- Qué es: una publicación donde el texto lleva el contenido y una imagen lo acompaña. Si se quita la imagen, el post se sigue entendiendo.
- Cuándo conviene: hay una foto, una captura o un gráfico propio que prueba o ilustra lo que cuenta el texto.
- El borrador entrega: `## Para publicar` con el texto completo, y la línea `**Imagen:**` con qué muestra la imagen, de dónde sale (foto propia, captura, gráfico) y el texto que lleva encima, si lleva.
- Lo haces tú: conseguir o tomar la imagen.

**texto + video**
- Qué es: un video, con un texto que lo presenta.
- Cuándo conviene: algo que se entiende mejor viéndolo o escuchándolo: una demostración, un antes y después, una explicación dicha a cámara.
- El borrador entrega: `## Para publicar` con el texto que presenta el video, y `## Guion de video` con tres partes: `Gancho` (lo primero que se dice o se ve), `Desarrollo` (las ideas en orden, una por línea) y `Cierre` (con qué se queda quien lo ve o qué se le pide). Si lleva textos en pantalla, una línea `En pantalla:` por cada uno.
- Lo haces tú: grabar y editar el video con el guion.

**carrusel**
- Qué es: varias láminas que se pasan, con un texto que las presenta.
- Cuándo conviene: un proceso con pasos, una comparación o una lista que no cabe en un párrafo.
- El borrador entrega: `## Para publicar` con el texto que presenta el carrusel y da una razón para pasarlo, y `## Láminas` con una viñeta por lámina: `Lámina 1 (portada):` el titular · `Lámina 2` en adelante: una idea por lámina, con su título en negrita y una o dos frases · `Última lámina:` el cierre. Si una lámina necesita una imagen o un gráfico, se anota junto a ella. El tope de láminas de «Tus reglas» cuenta la portada y la última.
- Lo haces tú: armar las láminas con el guion, en tu herramienta de diseño.

**infográfico**
- Qué es: una sola imagen que lleva el contenido, con un texto corto que la presenta. Si se quita la imagen, el post no se entiende.
- Cuándo conviene: un dato con su contexto, un resumen de pasos o una comparación que se lee de un vistazo.
- El borrador entrega: `## Para publicar` con el texto que presenta la imagen, y `## Infográfico` con `Título:`, los bloques en orden de lectura (un dato o un paso por bloque, cada dato con su fuente) y `Pie:` con la fuente y la firma.
- Lo haces tú: diseñar la imagen con esa estructura.

**imagen**
- Qué es: una imagen que es la publicación, con un pie que la acompaña.
- Cuándo conviene: una foto o una pieza propia que se sostiene sola.
- El borrador entrega: `## Para publicar` con el pie, y la línea `**Imagen:**` con qué muestra y de dónde sale.
- Lo haces tú: conseguir o tomar la imagen.

**video**
- Qué es: un video que es la publicación, con un pie que lo acompaña.
- Cuándo conviene: lo mismo que texto + video, en un canal donde el video va primero.
- El borrador entrega: `## Para publicar` con el pie, y `## Guion de video` con `Gancho`, `Desarrollo` y `Cierre`.
- Lo haces tú: grabar y editar el video con el guion.

**artículo largo**
- Qué es: un artículo con varias secciones, cada una con su subtítulo.
- Cuándo conviene: un tema que necesita desarrollo: un caso completo, una guía, una decisión con sus razones.
- El borrador entrega: `## Para publicar` con el título, la entrada y las secciones. Los subtítulos van con `###`, para que todo el artículo quede dentro del bloque.
- Lo haces tú: subirlo a tu blog.

**artículo corto**
- Qué es: un artículo de una sola idea, sin secciones.
- Cuándo conviene: una nota, una respuesta a una pregunta frecuente o una novedad.
- El borrador entrega: `## Para publicar` con el título y el texto.
- Lo haces tú: subirlo a tu blog.

**Infográfico y texto + imagen no son lo mismo.** En el infográfico el contenido va en la imagen y el texto solo la presenta. En texto + imagen el contenido va en el texto y la imagen acompaña. Si la persona duda, pregunta: «si alguien ve solo la imagen, ¿entiende el post?».

## Reglas

- Cuando esta skill se active, ve directo al trabajo. Sin resumen, sin explicación, sin preámbulo.
- **La skill propone; la persona decide.** `formatos.md` se escribe solo después de su ok sobre el resumen.
- **Toda la información que se pueda se recaba con `AskUserQuestion`.** Lo que tiene respuestas previsibles se pregunta con opciones, nunca en el chat. El chat queda para lo que no cabe en opciones y para cuando la herramienta no está disponible.
- **La entrevista es corta:** con uno o dos canales, seis tandas de preguntas o menos. Las fichas se llenan con el catálogo; a la persona solo se le pregunta qué usa, cuál va por defecto, sus reglas, qué sale de cada pieza y cómo publica.
- **`Lleva:` se pregunta solo con dos canales o más; `Publicar:`, solo para un blog o un canal propio.** Una línea `Lleva:` por canal, con una sola publicación. Lo que la persona no definió no se escribe.
- **La herramienta de una pieza visual va con la etiqueta `Herramienta:`** al final de «Lo haces tú». La lee la skill que arma la pieza.
- **Esta skill define; no construye.** La regla de texto de cada canal y las reglas de cada tipo se definen aquí. Las demás skills las usan tal cual: no las vuelven a preguntar ni guardan una copia. La pieza visual la arma la persona o la skill que la construya.
- **La voz manda sobre la regla de texto:** lo que `voz.md` o un redactor digan sobre extensión o hashtags se escribe con su origen y no se pregunta. Si dos reglas chocan, el orden es: `voz.md` y el redactor, después «Tus reglas» del tipo, después `Texto:` del canal. La voz también manda sobre «El borrador entrega»: lo que la voz prohíbe no se escribe aunque la ficha lo pida.
- **Canales ya conocidos no se vuelven a preguntar,** pero siempre se pregunta si hay alguno más.
- **Un tipo que está en varios canales se pregunta una sola vez,** y la pregunta dice para qué canales vale.
- **La estructura de `formatos.md` es fija:** `## <Canal>`, `Por defecto:`, `Texto:`, las líneas opcionales `Lleva:` y `Publicar:`, `### <tipo>` y los seis campos con su nombre exacto. Otras skills lo leen.
- **«Opción en la parrilla» se copia exacta:** `<canal> - <tipo>`, en minúsculas, sin tilde y sin repetirse.
- **Ningún número de plataforma.** Esta skill no afirma medidas, duraciones ni límites de ninguna red. Los números de una ficha son reglas de la persona, o quedan «pendiente».
- **El formato da la estructura; las palabras las pone el redactor.** No se crea un redactor por formato: un carrusel y un texto del mismo tema los escribe el mismo redactor.
- **`Palabras` cuenta solo el bloque `## Para publicar`.** Las láminas, el guion y el infográfico no se cuentan.
- **Toda cifra necesita fuente,** esté en el texto, en una lámina, en un infográfico o en un guion.
- La skill nunca publica y nunca produce la pieza visual: deja dicho qué recibe la persona y qué arma ella.
- Lo que ya dicen `sobre-mi.md`, los redactores o `parrilla.md` no se vuelve a preguntar.
- Describe a la persona por sus rasgos. No la etiquetes por su país ni por su región.
- Solo se escriben los canales y los tipos que la persona eligió. No rellenes el archivo con el catálogo completo.
