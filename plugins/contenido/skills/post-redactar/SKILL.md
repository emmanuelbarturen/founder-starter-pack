---
name: post-redactar
description: >
  Paso 2 de 3 del proceso de contenido: toma un tema aprobado del tablero de la parrilla y deja escritas todas sus publicaciones, la principal y la que sale de ella en otro canal, con la fuente de cada dato y la forma que pide la ficha de su formato. El texto lo escribe el redactor de la fila, y la persona aprueba todo el tema con un solo ok. No define nada: lee parrilla.md, formatos.md, voz.md y los redactores. Se usa escribiendo /contenido:post-redactar, con el ID de la pieza o sin él, después de /contenido:post-proponer. El paso siguiente es /contenido:post-publicar. Actívala cuando el usuario diga "redacta el post", "escribe el post de la semana", "escribe el tema aprobado" o "muéstrame el borrador".
argument-hint: "[ID de la pieza; por defecto, la aprobada con la fecha más cercana]"
---

# Redactar

## Para quién es esta skill

Para un emprendedor que es la cara de su negocio y publica él mismo. Usa estos rasgos para interpretar sus respuestas; no los recites.

- **Tiene poco tiempo por publicación.** Este paso existe para que solo le quede leer un borrador y decir que sí.
- **Su audiencia desconfía de las promesas grandes.** Cada cifra y cada hecho tiene que poder rastrearse a algo que de verdad pasó.
- **Él decide, la skill propone.** Ningún texto avanza sin su ok explícito.
- **La pieza visual va después.** El borrador le entrega el guion o la indicación, no la imagen: la pieza la arma `/contenido:post-disenar`, o él, según diga su formato.

## Dónde está en el proceso

| Paso | Skill | Deja las filas en |
|---|---|---|
| 1 · Proponer temas | `/contenido:post-proponer` | `Tema Aprobado ✔` o `Descartado 🗑️` |
| **2 · Redactar** | `/contenido:post-redactar` | `Listo a Publicar 👍` |
| 3 · Publicar y cerrar | `/contenido:post-publicar` | `Programado 🕦` y `Publicado ✅` |

**Resultado de este paso:** todas las publicaciones del tema en `Borrador Listo 👀`, cada una con su archivo en `posts/`, y en `Listo a Publicar 👍` cuando la persona las aprueba.

## Qué lee

Esta skill no define nada y no pregunta lo que ya está escrito:

| De dónde | Qué toma |
|---|---|
| `parrilla.md` | Dónde está el tablero y cómo se llega, las reglas propias y la carpeta de borradores (`posts/`) |
| `formatos.md` | La regla de texto del canal (`Texto:`) y **la ficha completa del tipo** de cada pieza: «El borrador entrega» y «Tus reglas» |
| `.claude/agents/redactor-*.md` | El redactor que escribe: su lector, su propósito y su voz |
| `sobre-mi.md`, `voz.md`, `aprendizaje/` | La base de la voz, los límites y lo que cada redactor aprendió |

**Un tema puede tener dos filas.** La **principal** y su **derivada**, que es la publicación que sale de ella en otro canal y lleva `Sale de [ID].` al inicio de sus `Notas`, con su punto. Las dos se escriben y se aprueban juntas.

- **El `ID` se compara completo:** `Sale de AB-1.` no es `Sale de AB-12.`
- La marca se busca donde vivan las `Notas` de la fila: en ClickUp, si `Notas` no existe como campo, en la línea `Notas:` de la descripción.
- Si ninguna fila nombra a la principal, el tema tiene una sola publicación. Si una derivada nombra un `ID` que no existe o que está descartado, trátala como pieza suelta y dilo en una línea.

**Si chocan dos reglas,** el orden es: `voz.md` y el redactor, después «Tus reglas» de la ficha, después `Texto:` del canal.

## Entorno

- **Se opera con el acceso real que tenga la sesión al tablero.** Sin acceso, no sigas: dile a la persona que escriba `/mcp`, elija el conector del destino que dice `parrilla.md` y lo autorice. Si el conector no aparece en la sesión, lo agrega `/contenido:construir-parrilla`. Nunca afirmes que creaste o actualizaste una fila sin haberla releído.
- Los ejemplos de `AskUserQuestion` describen las preguntas: si la herramienta está disponible respeta sus límites; si no, haz las mismas preguntas en el chat.
- **Calcula las fechas con una herramienta,** nunca de memoria.
- Redactar y guardar no autoriza a publicar, programar posts ni enviar mensajes.

## CRÍTICO: arranque automático al cargar

Mira en silencio si existe `parrilla.md` y sigue:

- **No existe:** di una sola línea: «Primero va el tablero: escribe `/contenido:construir-parrilla`». Detente ahí.
- **Existe:** léelo, lee `formatos.md` si existe y ve directo al paso 1.

No resumas esta skill, no expliques cómo funciona y no preguntes si el usuario quiere correrla.

## 1. Toma el tema

**Qué tema:** el de la fila cuyo `ID` pasó la persona, sea principal o derivada. Sin `ID`, en este orden:

1. Un tema con alguna fila en `Borrador Listo 👀`: ya está escrito y espera el ok.
2. Si no hay, un tema con alguna fila en `Tema Aprobado ✔`.

Entre varios, el de `Fecha programada` más próxima de hoy en adelante; si todas ya pasaron, la más reciente. Si no hay ninguno, dilo en una línea y sugiere `/contenido:post-proponer`. Si la persona tiene poco tiempo entre semana, ofrece redactar en la misma sesión todas las aprobadas del periodo.

**Junta las filas del tema:** la principal y la fila cuyas `Notas` empiezan con `Sale de [ID de la principal].`

**Qué se hace con cada fila depende de su estado:**

| Estado de la fila | Qué se hace |
|---|---|
| `Tema Aprobado ✔` | Se escribe: pasos 2 y 3 |
| `Borrador Listo 👀` | **No se reescribe.** Se muestra el borrador que ya existe y se pide el ok: pasos 4 y 5. Si sus `Notas` traen un pedido que empieza con `⚠️ Para la pieza:`, muéstralo junto al borrador y sigue «Un pedido de la pieza», en el paso 5 |
| `Listo a Publicar 👍`, `Programado 🕦` o `Publicado ✅` | No se toca. Si es la principal, su texto aprobado es la fuente de la derivada |

Así, una derivada que volvió sola a `Tema Aprobado ✔` se reescribe sin tocar a su principal, y una pieza que volvió a `Borrador Listo 👀` solo necesita el ok.

Lee las filas (`Descripcion`, `Notas`). Si traen ⚠️ **tema sensible** sin un ok explícito de la persona sobre el tema, detente y pregúntalo.

**Comprueba que hay material para un post.** Una línea en el tablero alcanza para aprobar un tema, no para escribirlo. Si ni la fila ni sus fuentes dicen qué hizo la persona, qué midió y qué le costó o qué decidió, pídelo antes de escribir, en un solo mensaje y con las preguntas que el redactor de la pieza necesita responder. No rellenes los huecos ni entregues un borrador a medias.

## 2. Verifica antes de escribir

Busca cada cifra, fecha u hecho en su fuente primaria: el archivo, la medición o el relato de la persona.

- Si la fuente contradice lo que dice la fila, **manda la fuente**, y la corrección se anota en `Notas`.
- Las horas se escriben en la hora local de la persona.
- Lo que no se puede verificar sale del post o queda con ❓ para que la persona lo resuelva.

## 3. Escribe todas las publicaciones del tema

**El texto lo escribe el redactor que indica el campo `Redactor`, y escribe las dos publicaciones en la misma pasada.** Pásale el tema, el ángulo de cada fila, los datos ya verificados con su fuente y, de `formatos.md`, la regla de texto de cada canal y **la ficha completa del tipo** de cada pieza, no solo su nombre: sin la ficha escribe un post de texto.

- Si el redactor está cargado como subagente, úsalo. Si no aparece, lee su archivo en `.claude/agents/`, `sobre-mi.md`, `voz.md` y su archivo de `aprendizaje/`, y escribe siguiéndolos al pie de la letra.
- Si la persona no tiene redactores, dilo en una línea, sugiere `/contenido:construir-redactores` y, si quiere seguir, escribe en un registro llano y marca el borrador como voz provisional.
- Si una pieza no es de texto y no existe `formatos.md`, sugiere `/contenido:construir-formatos` en una línea y escribe el texto.

**La derivada sale de la principal, no del tema otra vez:**

- **Solo cifras y hechos que ya están en la principal,** con la misma fuente. Nada nuevo.
- **No repite a la principal ni a su propia pieza visual.** Da lo que el otro canal no puede dar: el porqué, o para quién importa.
- **Lleva siempre el link de su principal,** escrito como el marcador `[link de la principal]`. Va en `**Primer comentario:**`, salvo que «Tus reglas» de su ficha diga que el link va en el texto: entonces, en una línea propia del texto. Lo completa `/contenido:post-publicar` cuando la principal sale.

**Lo que pide la ficha, eso se entrega.** Si «El borrador entrega» de la ficha pide una imagen, un carrusel, un infográfico o un video, el borrador trae la línea `**Imagen:**` o el bloque con su nombre exacto (`## Láminas`, `## Infográfico`, `## Guion de video`). Si la ficha no lo pide, no se agrega. La skill no produce la pieza visual.

Guarda un archivo por fila. La principal, en `posts/NN-<slug>.md`: `NN` son dos dígitos con el orden en que se creó el borrador (no es el `ID` de la fila) y `<slug>` son de 3 a 5 palabras del titular en kebab-case. La derivada, con el mismo nombre más su canal: `posts/NN-<slug>-<canal>.md`.

```
<!-- Creado: AAAA-MM-DD · Actualizado: AAAA-MM-DD (vN) -->
# Post — [titular]

**Publicar:** [día] AAAA-MM-DD · **Aprobado:** tema AAAA-MM-DD · **Aprobado para publicar:** pendiente · **Parrilla:** [link de la fila]
**Ángulo:** [el ángulo en una línea] · **Redactor:** redactor-[nombre] · **Canal + tipo:** [la opción de la fila]
**Sale de:** [solo en la derivada: el ID y el archivo de la principal]
**Link:**

## Para publicar

[El texto tal como se va a publicar, hashtags incluidos]

**Imagen:** [opcional: qué imagen y de dónde sale. Nunca frena la publicación. Obligatoria si la ficha del tipo la pide; se omite si el tipo trae su propio bloque]
**Primer comentario:** [opcional: el link que acompaña al post. En la derivada, `[link de la principal]`]

[El bloque que pide «El borrador entrega» de la ficha del tipo, con su nombre exacto: `## Láminas`, `## Infográfico` o `## Guion de video`. Un texto solo no lleva bloque]

## Fuente

- **[dato o afirmación del post]:** [archivo y sección · medición con su fecha · «relato de [persona], AAAA-MM-DD»]

## Chequeo antes de publicar

- [ ] Voz: revisado contra `voz.md` y el aprendizaje del redactor
- [ ] No cruza ninguna regla propia de `parrilla.md`
- [ ] Toda cifra está rastreada a la fuente de arriba
- [ ] Extensión y hashtags dentro de la regla de texto (o «sin regla de texto», si no hay ninguna)
- [ ] La pieza cumple la ficha de su tipo: trae su bloque y respeta «Tus reglas»
- [ ] Solo en la derivada: cada cifra está también en la principal
- [ ] ❓ [persona]: [la duda que solo ella puede resolver, si la hay]
```

**La versión `(vN)` de la cabecera sube solo cuando cambia lo que se publica:** el texto de `## Para publicar`, sus líneas `**Imagen:**` y `**Primer comentario:**` o el bloque del tipo. Anotar una aprobación, una fecha, un link o la línea `**Pieza:**` no la sube. `/contenido:post-publicar` compara esa versión con la aprobada antes de publicar.

Reglas de contenido (qué se dice; el cómo es del redactor):

- **Un solo resultado, a nivel total.** El antes y el después de una misma medida cuentan como uno. Sin montos si la persona pidió solo porcentajes.
- **Nada que la persona no pueda sostener.** Lo que no tiene fuente no se afirma.
- Si el post cuenta algo hecho con una herramienta automática o con IA, muestra qué decidió o revisó la persona. Si no lo contó, pregúntalo.
- La voz manda sobre la regla de texto: si `voz.md` o el redactor dicen «nunca hashtags», el post no lleva.
- Toda cifra de una lámina, de un infográfico o de un guion va al bloque `## Fuente`, igual que las del texto.
- En **Chequeo antes de publicar** marca `[x]` solo lo que comprobaste de verdad.

## 4. Déjalo para revisión

En cada fila: `Estado` `Borrador Listo 👀`, `Palabras` (el conteo del texto de **Para publicar**, hecho con una herramienta como `wc -w` y no a ojo, sin las líneas `**Imagen:**` y `**Primer comentario:**` y sin el bloque del tipo) y `Archivo en el repo`.

Muestra en la conversación, en **un solo mensaje**: el texto completo de cada publicación, con el nombre del redactor en una línea encima, y **solo** las dudas ❓. Nada de resumir la pieza ni de explicar cómo se escribió.

## 5. Una sola aprobación

Cierra el mensaje con una única pregunta: «¿aprobado, corregir o descartar?». **Un ok vale para todas las publicaciones del tema.**

- **Aprobado** → todas las filas del tema pasan a `Listo a Publicar 👍`, y en cada archivo `**Aprobado para publicar:** AAAA-MM-DD (vN)`: la fecha de hoy y **la misma versión de la cabecera**, sin subirla.
- **Aprobar una y corregir otra** → la aprobada avanza; la otra se corrige y se vuelve a mostrar sola.
- **Corregir la redacción** → se aplica, se vuelve a mostrar **solo lo que cambió**, y el cambio se registra en el archivo de `aprendizaje/` del redactor, como principio más ejemplo, para que el siguiente borrador ya salga corregido.
- **Corregir el enfoque** → la fila vuelve a `Tema Aprobado ✔` con el pedido en `Notas`.
- **Descartar** → `Descartado 🗑️` con el motivo en `Notas`. El archivo se conserva. Descartar la principal descarta su derivada; descartar la derivada deja a la principal sola.

**Un pedido de la pieza.** Una fila que volvió de `/contenido:post-disenar` trae en `Notas` un pedido que empieza con `⚠️ Para la pieza:` (una lámina que no cabe, un guion que pasa el tope). **Con ese pedido abierto, un «aprobado» solo no vale:** el mismo texto volvería a fallar. Dile qué pide y ofrece las dos salidas:

- **Cambiar el texto** para que quepa: se aplica como una corrección de redacción, sube la versión y se vuelve a pedir el ok.
- **Armar la pieza ella,** con el texto como está: anota `**Pieza:** a mano` en el borrador.

Con cualquiera de las dos, quita el pedido de `Notas`. Recién entonces el ok pasa la fila a `Listo a Publicar 👍`.

**En Notion, al aprobar, actualiza la página de cada pieza en el mismo turno, sin que te lo pidan.** (En ClickUp la página es la descripción de la tarea. En Airtable no hay página: la versión final queda en el archivo de `posts/`.) Cuerpo de la página: `## Versión final` (el texto listo para copiar) · la imagen, si la hay · el primer comentario, si lo hay · `## Fuente` · `## Historial` de versiones. Pon al día `Tema` y `Descripcion` si el texto cambió el título o las cifras, además de `Palabras` y `Notas`. Verifica releyendo la página.

**Si el texto cambia después del ok,** sube la versión de la cabecera y la pieza vuelve a `Borrador Listo 👀`. Si cambia la principal, vuelve también su derivada. Si cambia solo la derivada, vuelve solo ella y se aprueba sola. Una pieza visual armada con el texto anterior ya no sirve: se arma de nuevo con `/contenido:post-disenar [ID]` cuando el texto vuelva a estar aprobado.

Cierra con una sola acción siguiente:

- Si alguna publicación aprobada lleva pieza visual (su borrador trae `## Láminas`, `## Infográfico` o la línea `**Imagen:**`): «Para armar la pieza, escribe `/contenido:post-disenar [ID]`».
- Si no: «El día de la pieza, escribe `/contenido:post-publicar`».

## Reglas

- Cuando esta skill se active, ve directo al trabajo. Sin resumen, sin explicación, sin preámbulo.
- **Esta skill lee, no define.** La regla de texto, la ficha de cada tipo, la voz y el tablero ya están escritos. No los preguntes, no los cambies y no guardes una copia.
- **La skill propone; la persona decide.** Ninguna fila pasa a `Listo a Publicar 👍` sin su ok explícito en la conversación.
- **Un tema, una pasada, un ok.** La principal y su derivada se escriben juntas y se aprueban juntas.
- **Sin pasos de más.** El borrador y sus dudas ❓ son lo único que ve la persona: no se entrega un esquema previo ni una nota para el texto.
- **Cada post lo escribe el redactor que indica su campo `Redactor`,** y todo borrador dice qué redactor lo escribió.
- **Toda cifra del post tiene fuente** en el bloque `## Fuente`. Sin fuente, la cifra sale o se marca ❓.
- **La derivada no agrega datos.** Lo que no está en la principal no entra.
- Lo que se agregue a `Notas` de una derivada va después de la marca `Sale de [ID].`
- **La skill nunca publica** y nunca produce la pieza visual: entrega el texto y lo que pide la ficha.
- Toda corrección de redacción que pida la persona se registra en `aprendizaje/` del redactor antes de terminar.
- Los nombres de los campos, los valores de `Estado` y los nombres de bloque del borrador se copian exactos.
- Cada cambio se escribe en el tablero en el mismo turno en que ocurre, y se verifica releyendo.
- Las reglas propias de `parrilla.md` y los límites de `sobre-mi.md` mandan sobre cualquier texto.
- Describe a la persona por sus rasgos. No la etiquetes por su país ni por su región.
- Sin `parrilla.md` no corre: primero va `/contenido:construir-parrilla`.
