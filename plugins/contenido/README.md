# contenido

Skills para que tu contenido en redes lo escriban redactores con tu propia voz, y para que salga cada semana.

**Empieza aquí:** escribe `/contenido:setup`. Te lleva, etapa por etapa, desde un proyecto vacío hasta tu primera publicación: corre las demás skills en su orden, muestra cuánto falta y, si cortas, retoma donde quedaste al volver a escribirlo.

| Comando | Qué hace |
|---|---|
| `/contenido:setup` | La guía: redactores, formatos, estilo, tablero, tema, texto, pieza visual y publicación, una etapa tras otra. No define nada: cada etapa la hace su skill |
| `/contenido:construir-redactores` | Lee tus recursos (LinkedIn, webs), te entrevista y aprende de tus textos → deja `sobre-mi.md`, `voz.md` (la base), un redactor por grupo de temas en `.claude/agents/` y lo que cada uno aprendió en `aprendizaje/` |
| `/contenido:construir-formatos` | Define tus formatos: por cada canal (LinkedIn, Instagram, Facebook, blog u otro), qué tipos de publicación usas (texto solo, texto + imagen, texto + video, carrusel, infográfico, artículo), cuál va por defecto y tu regla de texto → deja `formatos.md`, con una ficha por tipo: qué es, cuándo conviene, qué entrega el borrador y tus reglas. También pregunta qué otra publicación sale de cada pieza (`Lleva:`) y cómo publicas en tu blog (`Publicar:`). Solo define: no arma la pieza visual |
| `/contenido:construir-estilo` | Define cómo se ven tus piezas: fondo, color de acento, tipografías, firma, logo y proporción de la lámina → deja `estilo.md` y una lámina de muestra. Solo define |
| `/contenido:construir-parrilla` | Crea tu parrilla de contenidos en Notion, Airtable o ClickUp (una fila por pieza, de tema propuesto a publicado) y la pone al día cuando cambian tus formatos o tus redactores → deja la parrilla y `parrilla.md`. Solo construye el tablero: no propone, no redacta y no publica |

## El proceso de una pieza, en tres pasos

Las skills `construir-*` definen: tus redactores, tus formatos y tu tablero. Las skills `post-*` hacen el trabajo de
cada pieza y no definen nada: leen lo que ya está escrito. Las escribes como comando o las pides con tus palabras («propón temas», «redacta el post», «ya publiqué»).

| Paso | Comando | Qué hace | Deja las filas en |
|---|---|---|---|
| 1 | `/contenido:post-proponer` | Propone los temas de las próximas fechas como filas en el tablero y los itera contigo. No redacta | `Tema Aprobado ✔` o `Descartado 🗑️` |
| 2 | `/contenido:post-redactar` | El redactor de la fila escribe todas las publicaciones del tema, con la fuente de cada dato y la forma de su ficha. Las apruebas con un solo ok | `Listo a Publicar 👍` |
| Opcional | `/contenido:post-disenar` | Arma la pieza visual del post aprobado (carrusel, infográfico o tarjeta) con tu estilo, sin cambiarle una palabra: un HTML exportado a PDF e imágenes, o el diseño en tu cuenta de Canva, según la herramienta de tus formatos | No cambia el estado: anota la pieza en el borrador |
| 3 | `/contenido:post-publicar` | El día de la pieza te entrega todo para publicar (o publica, si tu canal lo dice y le das el ok), te deja lista la publicación que sale de ella y cierra cada fila con su link | `Programado 🕦` y `Publicado ✅` |

Son dos aprobaciones por tema: el tema y el texto.

Dos líneas opcionales de `formatos.md`, debajo de un canal, cambian lo que hacen estos pasos. Las pregunta `/contenido:construir-formatos`, y también puedes escribirlas a mano:

- `Lleva: linkedin - carrusel, al día hábil siguiente`: cada pieza de ese canal lleva otra publicación en otro canal.
  Se proponen, se escriben y se aprueban juntas. Sin la línea, cada tema da una sola publicación.
- `Publicar: a mano`: cómo se publica en ese canal. Sin la línea, publicas tú y pasas el link.

## La parrilla

Lo primero que hace `construir-parrilla` es configurarse: pregunta dónde va la parrilla y consigue el acceso. El plugin
trae los conectores (`.mcp.json`): al instalarlo solo te falta autorizar tu cuenta con `/mcp`. No depende de ningún
otro plugin.

El cuarto conector es el de Canva (`claude mcp add --transport http canva https://mcp.canva.com/mcp`). Solo lo usa `/contenido:post-disenar`, y solo si en tus formatos dijiste que armas tus piezas en Canva.

| Destino | Conector, si lo agregas a mano | Qué queda |
|---|---|---|
| Notion | `claude mcp add --transport http notion https://mcp.notion.com/mcp` | Una base de datos con tablero, calendario y una página por pieza |
| Airtable | `claude mcp add --transport http airtable https://mcp.airtable.com/mcp` | Una base con los mismos campos, tablero Kanban y calendario |
| ClickUp | `claude mcp add --transport http clickup https://mcp.clickup.com/mcp` | Una lista de tareas con tablero por estado. Los estados y los campos personalizados los creas tú una vez, a mano: el conector no los crea |

La estructura es la misma en los tres: 14 campos, cada uno con una ayuda que explica para qué sirve, y siete estados. Arriba de la parrilla
van dos lugares de donde salen los temas: `Fuentes` (links y referencias que conviene revisar) y `Temas propios` (una
lista de viñetas donde anotas tus ideas: título y descripción; lo usado se marca y baja al final).

Con `formatos.md`, la parrilla usa tus formatos: las opciones de `Canal + tipo` son tus tipos, la regla de texto sale de
ahí y cada borrador llega con la forma de su tipo (un carrusel, con su guion lámina por lámina). Sin `formatos.md` la
parrilla funciona igual, con una lista fija de tipos.

La parrilla recién creada trae ejemplos marcados `[PRUEBA]` y `[EJEMPLO]` para que veas cómo se usa; al terminar, la skill
pregunta si los borra.

Pensada para un emprendedor que es la cara de su negocio y publica él mismo. Un redactor es un subagente que escribe
como tú sobre un grupo de temas. Cada redactor tiene su propia voz, porque cada grupo de temas pide un lector, un
propósito y un tono distintos. Para usarlo: «redactor-<nombre>, escribe un post sobre…».

Historial en [VERSIONS.md](VERSIONS.md).
