---
name: post-disenar
description: >
  Paso opcional del proceso de contenido, entre redactar y publicar: arma la pieza visual de un post ya aprobado (carrusel, infográfico o tarjeta de imagen) a partir del guion de su borrador y con el estilo de estilo.md, sin cambiarle una palabra. Qué entrega depende de la herramienta que dice la ficha del tipo en formatos.md: con Claude Code, un HTML exportado a PDF y a imágenes; con Canva, el diseño en la cuenta de la persona. No define nada: lee parrilla.md, formatos.md y estilo.md. Se usa escribiendo /contenido:post-disenar, con el ID de la pieza o sin él, después de /contenido:post-redactar y antes de /contenido:post-publicar. Actívala cuando el usuario diga "arma el carrusel", "arma las láminas del post", "arma el infográfico" o "diseña la pieza".
argument-hint: "[ID de la pieza; por defecto, la aprobada sin pieza con la fecha más cercana]"
---

# Diseñar la pieza

## Para quién es esta skill

Para un emprendedor que es la cara de su negocio y publica él mismo. Usa estos rasgos para interpretar sus respuestas; no los recites.

- **No tiene diseñador.** Este paso existe para que el carrusel aprobado llegue armado, y no como un guion que hay que pasar a mano.
- **El texto ya lo aprobó.** Lo que se arma aquí dice exactamente lo que él leyó y aceptó.
- **Él decide, la skill propone.** La pieza se le muestra y él dice si queda así.

## Dónde está en el proceso

| Paso | Skill | Deja las filas en |
|---|---|---|
| 1 · Proponer temas | `/contenido:post-proponer` | `Tema Aprobado ✔` o `Descartado 🗑️` |
| 2 · Redactar | `/contenido:post-redactar` | `Listo a Publicar 👍` |
| **Opcional · Diseñar la pieza** | `/contenido:post-disenar` | No cambia el estado: anota la pieza en el borrador |
| 3 · Publicar y cerrar | `/contenido:post-publicar` | `Programado 🕦` y `Publicado ✅` |

**Resultado de este paso:** cada publicación del tema que lleva pieza visual tiene su pieza armada, y su borrador dice dónde está en la línea `**Pieza:**`.

## Qué lee

Esta skill no define nada y no pregunta lo que ya está escrito:

| De dónde | Qué toma |
|---|---|
| `parrilla.md` | Dónde está el tablero y cómo se llega, y la carpeta de borradores (`posts/`) |
| `formatos.md` | La ficha del tipo de la pieza: «Tus reglas» (el tope de láminas) y la `Herramienta:` de «Lo haces tú» |
| `estilo.md` | Los ocho campos del estilo y sus «Reglas propias» |
| `posts/` | El borrador aprobado: el bloque `## Láminas` o `## Infográfico`, o la línea `**Imagen:**` |

**Qué pieza sale de cada borrador:**

| El borrador trae | Se arma |
|---|---|
| `## Láminas` | Un carrusel: una lámina por viñeta |
| `## Infográfico` | Una sola lámina con `Título:`, los bloques y `Pie:` |
| `**Imagen:**` que pide una frase o un dato sobre un fondo | Una tarjeta: una sola lámina con ese texto |
| `**Imagen:**` que pide una foto, una captura o un gráfico propio | Nada que armar: esa imagen la consigue la persona. Se anota `**Pieza:** a mano` |
| `## Guion de video` | Nada: el video lo graba la persona. No se anota nada |

## Entorno

- **Se opera con el acceso real que tenga la sesión al tablero.** Sin acceso, no sigas: dile a la persona que escriba `/mcp`, elija el conector del destino que dice `parrilla.md` y lo autorice. Si el conector no aparece en la sesión, lo agrega `/contenido:construir-parrilla`. Nunca afirmes que creaste o actualizaste una fila sin haberla releído.
- **Nunca afirmes que una pieza quedó bien sin haberla mirado.** «El comando no dio error» no es una comprobación.
- Armar una pieza no autoriza a publicarla, a compartir el diseño ni a enviar mensajes.
- La skill no genera imágenes ni usa fotos de banco. Las fotos y el logo son archivos de la persona.

## CRÍTICO: arranque automático al cargar

Mira en silencio qué existe y sigue:

- **No existe `parrilla.md`:** di una sola línea: «Primero va el tablero: escribe `/contenido:construir-parrilla`». Detente ahí.
- **No existe `estilo.md`:** di una sola línea: «Primero va tu estilo: escribe `/contenido:construir-estilo`». Detente ahí.
- **Existen los dos:** léelos, lee `formatos.md` si existe y ve directo al paso 1.

No resumas esta skill, no expliques cómo funciona y no preguntes si el usuario quiere correrla.

## 1. Toma el tema

**Con `ID`:** esa fila y la otra fila de su tema, si la tiene. La **derivada** de una pieza lleva `Sale de [ID].` al inicio de sus `Notas`, con su punto, y el `ID` se compara completo (`Sale de AB-1.` no es `Sale de AB-12.`).

**Sin `ID`:** entre las filas en `Listo a Publicar 👍` cuyo borrador lleva pieza visual y no tiene la línea `**Pieza:**`, la de `Fecha programada` más próxima de hoy en adelante. Si no hay ninguna, dilo en una línea y detente.

**Qué se hace con cada fila del tema depende de su estado:**

| Estado de la fila | Qué se hace |
|---|---|
| `Listo a Publicar 👍` | Se arma su pieza, si su borrador la lleva |
| `Tema Aprobado ✔` o `Borrador Listo 👀` | No se arma: el texto no está aprobado. Di: «Primero se aprueba el texto: escribe `/contenido:post-redactar [ID]`» |
| `Programado 🕦` o `Publicado ✅` | No se toca, salvo que la persona pida rehacer esa pieza con su `ID` |

Lo que empieza con `[PRUEBA]` o `[EJEMPLO]` no es una pieza: no lo uses.

## 2. Comprueba que el texto es el aprobado

Abre el borrador de la fila. La versión de `**Aprobado para publicar:** AAAA-MM-DD (vN)` tiene que ser la misma de la cabecera `Actualizado: AAAA-MM-DD (vN)`.

- **No coinciden, o la aprobación dice «pendiente»:** el texto cambió después del ok. No armes nada: devuelve la fila.
- **El borrador ya tiene `**Pieza:**` con una versión anterior:** el texto cambió después de armar la pieza. Se arma de nuevo.
- **El guion pasa el tope de «Tus reglas»** (más láminas de las que dice la ficha): no recortes. Devuelve la fila, diciendo cuántas sobran.

**Cuando el texto tiene que cambiar, esta skill no lo cambia: devuelve la fila.** `Estado` pasa a `Borrador Listo 👀`; el motivo va a `Notas` (en una derivada, después de la marca `Sale de [ID].`), y empieza con `⚠️ Para la pieza:` solo si es de la pieza (una lámina no cabe, el guion pasa el tope), no si el texto cambió después del ok; en el borrador, `**Aprobado para publicar:**` vuelve a `pendiente`, porque ese texto ya no está aprobado; y se dice en una línea: «[ID] vuelve a revisión: [motivo]. Escribe `/contenido:post-redactar [ID]`». Relee la fila. Es el único caso en que este paso cambia un estado.

## 3. Arma la pieza, según la herramienta

Busca la ficha del tipo de la fila en `formatos.md` y lee la `Herramienta:` de «Lo haces tú».

| `Herramienta:` | Qué haces |
|---|---|
| `Claude Code` | Paso 3A |
| `Canva` | Paso 3B |
| Otra, `pendiente`, sin etiqueta, o no existe `formatos.md` | Una sola pregunta: «¿La armo aquí, o la armas tú con el guion?». Si la armas tú, paso 3A. Si la arma ella, anota `**Pieza:** a mano` en el borrador y ve al paso 5 |

Si preguntaste, dilo una vez: para que quede fijo, la herramienta se cambia con `/contenido:construir-formatos`.

### 3A. En HTML, exportada a PDF y a imágenes

1. **La carpeta:** `posts/<nombre del borrador sin .md>-pieza/`. Para `posts/04-cierre-de-caja.md`, `posts/04-cierre-de-caja-pieza/`.
2. **El archivo:** lee `${CLAUDE_PLUGIN_ROOT}/skills/post-disenar/references/plantilla.html` y escribe `pieza.html` en esa carpeta. Copia su cabecera y sus estilos tal cual, y cambia solo los valores de `:root`:

   | En `estilo.md` | En la plantilla |
   |---|---|
   | `Fondo`, `Texto`, `Acento` | `--fondo`, `--texto`, `--acento` |
   | `Tipografia de titulos`, `Tipografia de texto` | `--fuente-titulos`, `--fuente-texto` |
   | `Proporcion` `4:5` | `--alto: 1350px` y `@page { size: 1080px 1350px }` |
   | `Proporcion` `1:1` | `--alto: 1080px` y `@page { size: 1080px 1080px }` |

   `--sobre-acento` es `#FFFFFF` o `#111111`, el que mejor se lea sobre el acento.
3. **Las láminas:** una `<section class="lamina …">` por lámina, con `id` `lamina-01`, `lamina-02`, en orden. Usa los modelos de la plantilla: `portada`, `contenido` y `cierre` para un carrusel; `infografico` para un infográfico; `tarjeta` para una tarjeta. Borra los modelos que no uses.
   - **El texto se copia del borrador, palabra por palabra.** En un carrusel, el título en negrita de cada lámina va en `h2` y sus frases en `p`. Cualquier otra negrita del borrador va en `<strong>`. Nada más se resalta.
   - **Lo que pone la forma, no el texto:** la barra de acento, el número de orden de cada lámina de contenido (`01`, `02`) y la numeración `N / total` de un carrusel. No son texto del post.
   - **El pie de un carrusel o de una tarjeta** lleva la firma y el logo de los campos `Firma` y `Logo` de `estilo.md`. La ruta del logo se escribe relativa a la carpeta de la pieza. Con `Firma: ninguna` el pie va sin firma (en un carrusel conserva la numeración); con `Logo: ninguno` no va imagen junto a la firma.
   - **El pie de un infográfico** lleva el `Pie:` del borrador, tal cual y siempre: es parte del texto aprobado. La firma de `estilo.md` no se le agrega.
   - **Una imagen que pide una lámina:** si el archivo existe en el proyecto, va con `class="imagen"`. Si no existe, va el recuadro `class="hueco"` con lo que falta, y se dice al entregar.
   - Respeta las «Reglas propias» de `estilo.md`.
4. **Exporta con el navegador de la máquina.** Sirve Chrome, Chromium, Edge o Brave. Búscalo donde suele estar: en macOS, `/Applications/<navegador>.app/Contents/MacOS/<navegador>`; en Linux, `google-chrome`, `chromium` o `microsoft-edge`; en Windows, `chrome.exe` o `msedge.exe` en Archivos de programa. Con rutas absolutas:

   ```
   "<navegador>" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="<carpeta>/pieza.pdf" "file://<carpeta>/pieza.html"
   "<navegador>" --headless=new --disable-gpu --hide-scrollbars --window-size=1080,1350 --screenshot="<carpeta>/lamina-01.png" "file://<carpeta>/pieza.html#lamina-01"
   ```

   - El PDF se exporta solo para un carrusel: una página por lámina.
   - La imagen se exporta una vez por lámina, cambiando el número en el nombre y en `#lamina-NN`. Con proporción `1:1`, `--window-size=1080,1080`.
5. **Si no puedes exportar** (no hay navegador, o la sesión no puede correr comandos): deja `pieza.html` y dilo, con el paso para hacerlo a mano: «Abre `pieza.html` en tu navegador → Imprimir → Guardar como PDF, sin márgenes y con los gráficos de fondo activados». No digas que hay imágenes si no las exportaste. La pieza cuenta como armada: en el paso 5 se anota la ruta de `pieza.html`.

### 3B. En Canva

1. **Comprueba el acceso** con una lectura real de la cuenta. El plugin trae el conector de Canva: si pide autenticación, dile que escriba `/mcp`, elija Canva y complete el acceso en el navegador. Si el conector no aparece en la sesión, se agrega con `claude mcp add --transport http canva https://mcp.canva.com/mcp`, hay que reiniciar la sesión y, al volver, escribir `/contenido:post-disenar [ID]`. Detente ahí. **Si la persona no tiene cuenta de Canva o no quiere autorizarla,** no la dejes parada: ofrece una vez armar la pieza aquí (paso 3A) o que la arme ella (`**Pieza:** a mano`).
2. **Crea el diseño** con las herramientas que tenga el conector: una página por lámina, con la proporción, los colores, las tipografías y la firma de `estilo.md`, y el texto de cada lámina tal como está en el borrador. El título del diseño es el titular de la pieza.
3. **Relee el diseño** y compara el texto de cada página con el borrador. Si el conector cambió el texto, o no pudo poner el texto exacto de una lámina, dilo con el número de la lámina. **Un diseño con otro texto no se entrega como terminado.** Ofrece una vez: armarla aquí (paso 3A) o que ella corrija el texto en Canva. Si la corrige ella, anota `**Pieza:** a mano` y deja el link del diseño en el mensaje.
4. **Exporta** si el conector lo permite: PDF para un carrusel, imagen para lo demás, en `posts/<nombre del borrador sin .md>-pieza/`. Si no lo permite, dilo: la persona lo exporta desde Canva.
5. Guarda el link del diseño para el paso 5.

## 4. Mira lo que salió

Abre cada imagen exportada y mírala (en Canva, la vista del diseño que dé el conector):

- Ningún texto cortado en los bordes ni tapado por el pie.
- El texto se lee: tamaño y contraste.
- Cada lámina dice lo que dice su viñeta del borrador.

**Si el texto de una lámina no cabe:** achica solo esa lámina (el tamaño de su título, hasta una quinta parte) y vuelve a exportar. Si sigue sin caber, **no cortes ni resumas el texto**: devuelve la fila, como dice el paso 2, diciendo qué lámina es.

Si no puedes abrir las imágenes, dilo: no afirmes que quedó bien.

## 5. Anota y entrega

1. **En el borrador,** debajo de `**Link:**`, la línea `**Pieza:** [ruta o link] (vN)`, con la versión del texto con que se armó:
   - Un carrusel en HTML: la ruta del PDF. Un infográfico o una tarjeta: la ruta de la imagen. Si no se pudo exportar: la ruta de `pieza.html`.
   - En Canva: el link del diseño.
   - Si la arma la persona, o la imagen es una foto, una captura o un gráfico suyo: `**Pieza:** a mano`, sin versión.

   Anotar esta línea no sube la versión del borrador ni toca su aprobación.
2. **El tablero no cambia.** La fila sigue en `Listo a Publicar 👍`.
3. **Un solo mensaje** con: dónde está cada archivo (o el link), qué quedó pendiente (un recuadro sin imagen, una tipografía que salió con su respaldo, algo que no se pudo exportar) y una sola pregunta: «¿Queda así, o ajusto algo de la forma?».
4. **Los ajustes son de forma:** tamaños, saltos de línea, qué lámina lleva la imagen. Un cambio de colores o de tipografía es del estilo: se hace con `/contenido:construir-estilo` y la pieza se arma de nuevo. Un cambio de texto es de `/contenido:post-redactar`.

Cierra con una sola acción siguiente: «El día de la pieza, escribe `/contenido:post-publicar`».

## Reglas

- Cuando esta skill se active, ve directo al trabajo. Sin resumen, sin explicación, sin preámbulo.
- **Esta skill lee, no define.** El estilo, la herramienta y el tope de láminas ya están escritos. No los preguntes, no los cambies y no guardes una copia.
- **Nunca cambia el texto.** Cada lámina dice lo que dice el borrador aprobado. Si no cabe, se dice; no se corta ni se resume.
- **Solo sobre un texto aprobado.** Sin la versión aprobada igual a la de la cabecera, no se arma nada.
- **La entrega la decide la `Herramienta:` de la ficha:** HTML con PDF e imágenes, o el diseño en Canva. Con otra herramienta, se pregunta una vez.
- **Toda pieza queda anotada en `**Pieza:**`,** con la versión del texto con que se armó, o `a mano`.
- **Nada se da por bueno sin mirarlo.** Las imágenes exportadas se abren y se revisan antes de entregar.
- **El estado de la fila no cambia,** salvo cuando el texto tiene que cambiar: entonces la fila vuelve a `Borrador Listo 👀` con el motivo en `Notas`. Este paso no aprueba ni publica.
- Toda cifra de una lámina es la del borrador, con su fuente en el bloque `## Fuente` del borrador.
- La skill no genera imágenes, no usa fotos de banco y no descarga tipografías.
- Los nombres de los campos, los valores de `Estado` y los nombres de bloque del borrador se copian exactos.
- Describe a la persona por sus rasgos. No la etiquetes por su país ni por su región.
- Sin `parrilla.md` no corre: primero va `/contenido:construir-parrilla`. Sin `estilo.md` tampoco: primero va `/contenido:construir-estilo`.
