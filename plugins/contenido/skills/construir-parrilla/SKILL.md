---
name: construir-parrilla
description: >
  Construye el tablero de la parrilla de contenidos de un emprendedor que publica él mismo en redes sociales. La parrilla vive en Notion, en Airtable o en ClickUp, a elección de la persona, con una fila por pieza: tema, canal, estado, fecha programada, redactor, palabras y link publicado, y una ayuda en cada columna que explica para qué sirve. Arriba de la parrilla van una base de fuentes y una página de temas propios. Pregunta dónde va la parrilla, consigue el acceso, la crea con su estructura y deja parrilla.md; después la pone al día cuando cambian los formatos o los redactores. Solo construye el tablero: proponer temas, redactar y publicar son de /contenido:post-proponer, /contenido:post-redactar y /contenido:post-publicar. Actívala cuando el usuario diga "construye mi parrilla", "configura mi parrilla", "arma mi parrilla", "crea mi tablero de contenidos", "pon al día mi parrilla" o "agrega una opción a mi parrilla".
---

# Construir parrilla

## Para quién es esta skill

Para un emprendedor que es la cara de su negocio y publica él mismo. Usa estos rasgos para interpretar sus respuestas; no los recites.

- **Lo que se le traba es publicar, no las ideas.** La parrilla existe para que cada semana solo le quede leer un borrador y publicarlo.
- **Su audiencia desconfía de las promesas grandes.** Cada cifra y cada hecho de un post tiene que poder rastrearse a algo que de verdad pasó.
- **Él decide, la skill propone.** Ningún tema y ningún texto avanzan sin su ok explícito.
- **Publica él, en su cuenta.** Esta skill deja el tablero listo: no propone temas, no escribe y no publica.

## Qué construye

```
La parrilla                  una fila por pieza, de tema propuesto a publicado.
                             Vive donde la persona elija: Notion, Airtable o ClickUp
Fuentes                      dónde mirar para encontrar temas: links y referencias. Va arriba de la parrilla
Temas propios                donde la persona anota sus temas en viñetas: título y descripción. Va arriba de la parrilla
parrilla.md                  dónde está la parrilla y las reglas propias de esta persona
```

**El objetivo final es la parrilla en el destino que eligió la persona,** con la misma estructura en los tres. `parrilla.md` existe para que las demás skills encuentren el tablero en cada sesión. En el resto de esta skill, «la base» es esa parrilla, esté en Notion, en Airtable o en ClickUp.

**Esta skill construye el tablero y nada más.** Los temas los propone `/contenido:post-proponer`, los textos los escribe `/contenido:post-redactar`, la pieza visual la arma `/contenido:post-disenar` y la publicación la cierra `/contenido:post-publicar`. Las cuatro leen de aquí los nombres de los campos y de los estados.

## La base

Nombre: **«Parrilla de contenidos — [nombre de pila de la persona]»**. Los nombres de los campos van **sin tilde y se copian exactos**: así se leen y se escriben igual desde cualquier herramienta.

| # | Campo | Tipo | Ayuda (se copia en el campo) | Regla | Ancho |
|---|---|---|---|---|---|
| 1 | `ID` | ID único, con las iniciales de la persona en mayúsculas como prefijo (`AB-1`) | El código de esta fila. Se pone solo | Sirve para nombrar la pieza en la conversación | 80 |
| 2 | `Tema` | título | El título del post | El titular de la pieza | 320 |
| 3 | `Estado` | selección | En qué paso va: de propuesto a publicado | Los siete valores de abajo | 170 |
| 4 | `Fecha programada` | fecha | El día en que toca publicarlo | Siempre en el día fijo | 140 |
| 5 | `Redactor` | selección | Quién lo escribe | Cada redactor cubre un grupo de temas | 150 |
| 6 | `Canal + tipo` | selección | En qué red se publica y en qué formato | Una opción por red y formato | 150 |
| 7 | `Descripcion` | texto | De qué trata, en una línea | El ángulo, 20 palabras como máximo, sin repetir el título | 320 |
| 8 | `Notas` | texto | De dónde salió el tema, cambios pedidos y dudas | Dudas con ❓, avisos con ⚠️, la cifra del tema con su fuente y el motivo de un descarte | 320 |
| 9 | `Palabras` | número | Cuántas palabras tiene el texto | El conteo real del texto que se publica, hashtags incluidos. No cuenta la imagen ni el primer comentario | 90 |
| 10 | `min. lectura` | fórmula | Minutos que toma leerlo. Se calcula solo | `if(empty(Palabras), "", ceil(Palabras / 200))` | 100 |
| 11 | `Archivo en el repo` | texto | Dónde está guardado el borrador | La ruta, escrita como código (entre comillas invertidas): sin ellas, Notion convierte el nombre `.md` en un enlace | 240 |
| 12 | `Fecha de publicacion` | fecha | El día en que de verdad se publicó | La fecha real, no la programada | 140 |
| 13 | `URL publicada` | URL | El link del post ya publicado | Solo el que pasa la persona | 200 |
| 14 | `Created time` | fecha de creación | Cuándo se creó esta fila. Se pone sola | Automático | 160 |

**El orden de la tabla es el orden por defecto de las columnas,** de izquierda a derecha: primero lo que identifica a la pieza, después en qué paso va y cuándo sale, quién la escribe y dónde, de qué trata, los datos del texto y al final los de la publicación. Vale para la tabla por defecto, `Por Publicar` y `Publicado`, con las dos primeras columnas (`ID` y `Tema`) fijas al desplazarse. En el tablero, cada tarjeta muestra `Tema`, `ID`, `Fecha programada`, `Redactor` y `Canal + tipo`. En el calendario, cada pieza muestra, además de su `Tema`, estos tres en este orden: `ID`, `Estado` y `Canal + tipo`. La persona puede reordenar después: lo que ella mueva se respeta y no se vuelve a ordenar.

**«Ancho» es el ancho sugerido de la columna, en píxeles.** Aplícalo solo si tu herramienta deja fijar el ancho de una columna. Si no lo permite, no lo simules ni lo des por hecho: dile a la persona, en una línea, que los anchos se ajustan arrastrando el borde de cada columna.

**Cada campo lleva su ayuda.** El texto de la columna «Ayuda» se copia exacto en la descripción del campo al crearlo, para que la persona entienda cada columna sin abrir esta skill. Es una frase corta, en palabras de todos los días, sin términos de la skill. Un campo que se agregue después se agrega con su ayuda.

**`Estado`** — siete valores, se copian exactos, con su emoji y sin número, **en este orden**. El orden es el del recorrido de una pieza y el de las columnas del tablero:

| Valor | Color | Significa |
|---|---|---|
| `Tema Propuesto ✍️` | gris | La skill lo propuso; falta que la persona decida |
| `Tema Aprobado ✔` | amarillo | La persona aprobó el tema; falta redactar |
| `Borrador Listo 👀` | azul | El texto está escrito; falta que la persona lo lea |
| `Listo a Publicar 👍` | morado | La persona aprobó el texto |
| `Programado 🕦` | por defecto | La persona lo dejó programado en la red |
| `Publicado ✅` | verde | Salió, y la persona pasó el link |
| `Descartado 🗑️` | rojo | No va. El motivo queda en `Notas` |

**`Canal + tipo`** — una opción por red y formato, con la forma `<red> - <formato>`, en minúsculas: `linkedin - texto`, `linkedin - carrusel`, `linkedin - foto`, `linkedin - video`. Si además publica en un blog: `blog - largo` y `blog - corto`. Para otra red, la misma forma (`instagram - carrusel`). Esta lista vale solo cuando no existe `formatos.md`.

**Con `formatos.md`, mandan los formatos de la persona.** Ese archivo lo deja `/contenido:construir-formatos`: por cada canal, su tipo por defecto (`Por defecto:`), su regla de texto (`Texto:`) y una ficha por tipo. Esta skill lo lee y lo usa; no lo escribe, no vuelve a preguntar lo que dice y no guarda una copia.

- **Las opciones de `Canal + tipo`** son la línea «Opción en la parrilla» de cada ficha, copiada exacta y sin sus comillas invertidas (`linkedin - texto + imagen`, `linkedin - infografico`).
- **Una fila cuya opción no tiene ficha** (un canal o un tipo que la persona no definió) se trata como sin formatos: se escribe el texto y se sugiere en una línea «agrega un canal» o «agrega un formato».
- **Si la base ya existe y le falta una opción de `formatos.md`,** agrégala al poner al día el tablero y relee (en ClickUp, pídesela a la persona). Nunca borres ni renombres una opción que tenga filas.
- **Opciones de antes:** `<red> - foto` equivale a `<red> - texto + imagen` (en Instagram, a `instagram - imagen`) y `<red> - video` a `<red> - texto + video` (en Instagram no cambia). Mover las filas de la opción vieja a la nueva se pregunta una vez, con `AskUserQuestion`.
- **La regla de texto y la forma de cada borrador** también salen de `formatos.md`. Las usa `/contenido:post-redactar`: aquí no se copian.

**`Redactor`** — una opción por redactor de la persona, con su nombre sin el prefijo `redactor-` (`construir-con-ia` para `.claude/agents/redactor-construir-con-ia.md`), más `Otro`. Una pieza con `Otro` la escribe el redactor que la persona indique. Si la persona todavía no tiene redactores, la única opción es `Otro`: sugiere `/contenido:construir-redactores`, y cada redactor nuevo agrega su opción.

### Arriba de la parrilla: Fuentes y Temas propios

De ahí salen los temas. Los dos van **arriba de la parrilla**, en este orden: `Fuentes`, `Temas propios`, la parrilla.

**`Fuentes`** — una base con una fila por fuente: un lugar donde mirar para encontrar temas, noticias o novedades. Sus campos, en su orden por defecto y con su ayuda:

| # | Campo | Tipo | Ayuda (se copia en el campo) |
|---|---|---|---|
| 1 | `Fuente` | título | El nombre de la fuente |
| 2 | `Tipo` | selección: `noticias`, `boletin`, `blog`, `persona`, `norma o documento`, `comunidad`, `otro` | Qué clase de fuente es |
| 3 | `Link` | URL | Dónde se lee |
| 4 | `Para que sirve` | texto | Qué temas se pueden sacar de aquí |
| 5 | `Redactor` | selección, con las mismas opciones que en la parrilla | A qué redactor le sirve |
| 6 | `Ultima revision` | fecha | La última vez que se revisó |

Una fuente no necesita link: «las preguntas que me hacen mis clientes» es una fuente de tipo `persona`.

**`Temas propios`** — una página donde la persona anota sus temas, lo más simple posible: una lista de viñetas, una por tema, con el título en negrita y una descripción corta al lado.

```
Anota aquí tus temas, uno por viñeta: un título y de qué se trata. Cuando un tema entra a la parrilla, se marca con ✅ y baja a «Usados».

## Por usar
- **[Título del tema].** [De qué se trata, en una o dos líneas]

## Usados
- ✅ **[Título del tema].** [De qué se trata] · usado en [ID]
```

Cuando `/contenido:post-proponer` propone un tema de «Por usar», en el mismo turno lo marca con ✅, le agrega `usado en [ID]` y lo mueve **al final de «Usados»**. Así arriba queda solo lo que falta usar. No cambia ni el título ni la descripción que escribió la persona, y no le pide más datos para anotar un tema: lo que falte se pregunta al redactar.

### En Notion

Una página «Parrilla de contenidos — [nombre de pila de la persona]» que contiene, en este orden: una línea que explica qué hay arriba y qué hay abajo · la base `Fuentes`, como subpágina · la página `Temas propios` · la base de la parrilla, **en línea**, para que se vea al abrir la página. La página lleva el nombre completo; la base de adentro se llama `Parrilla`. Lo que se agrega a una página queda al final: crea primero `Fuentes`, después `Temas propios` y la parrilla al último.


Una base de datos con los 14 campos, sus tipos y la ayuda de cada uno en la descripción de la propiedad. `Estado`, `Canal + tipo` y `Redactor` son de tipo **selección**, con sus opciones y colores (`Estado` es una selección normal, no el tipo de propiedad «estado» de Notion). Al crear la fórmula con el conector, la propiedad se escribe `prop("Palabras")`, y la ayuda de cada campo va en su `COMMENT`, también en el título, el `ID`, la fórmula y la fecha de creación. El orden de las columnas se fija en cada vista de tabla con `SHOW`, también en la tabla por defecto (el orden en que se piden los campos al crear la base no ordena las columnas), y las columnas fijas con `FREEZE COLUMNS 2`; el conector no fija anchos. Para renombrar un campo y cambiarle las opciones, haz dos pedidos: juntos en uno crean un campo duplicado.

**Vistas** — cinco: la tabla por defecto con todos los campos · `Board` agrupado por `Estado` · `Calendar` por `Fecha programada` · `Por Publicar` (todo lo que no está en `Publicado ✅` ni en `Descartado 🗑️`, ordenado por `Fecha programada`) · `Publicado` (solo `Publicado ✅`). En un tablero recién creado las columnas sin piezas pueden estar ocultas: aparecen cuando hay una pieza en ese estado.

### En Airtable

Una base con una tabla `Parrilla` y los 14 campos, cada uno con su ayuda en la descripción del campo. `Tema` es el campo principal. `Estado`, `Canal + tipo` y `Redactor` son de selección única, con sus opciones exactas y en su orden. `ID` es una fórmula sobre un campo de numeración automática (`"AB-" & {N}`), `min. lectura` es la fórmula `IF({Palabras}, CEILING({Palabras} / 200), BLANK())` y `Created time` es el campo de fecha de creación.

**Vistas** — las mismas cinco: la cuadrícula por defecto · `Board`, un Kanban apilado por `Estado` · `Calendar` por `Fecha programada` · `Por Publicar` · `Publicado`.

`Fuentes` y `Temas propios` son dos tablas más de la misma base. `Temas propios` tiene tres campos: `Tema`, `Descripcion` y `Usado en`, que guarda el `ID` de la pieza; su vista deja abajo los que ya tienen `Usado en`.

Airtable no tiene una página por pieza: la versión final de cada pieza vive en su archivo de `posts/`.

### En ClickUp

Una lista «Parrilla de contenidos — [nombre de pila de la persona]» dentro del espacio que indique la persona. Cada pieza es una tarea, y la estructura se reparte así:

- `Tema` es el nombre de la tarea, `Estado` es su estado, `Fecha programada` es su fecha límite, `ID` es el identificador que ClickUp le da a la tarea y `Created time` es su fecha de creación.
- Los otros 9 campos son campos personalizados de la lista, con el mismo nombre: `Canal + tipo` y `Redactor` como lista desplegable, `Fecha de publicacion` como fecha, `Palabras` como número, `URL publicada` como URL, `min. lectura` como fórmula y el resto como texto.
- **El conector de ClickUp crea la lista y las tareas, y escribe estados, fechas y campos. No crea estados, campos personalizados ni vistas:** eso lo hace la persona una vez, a mano, en Configurar. Los siete estados son obligatorios, porque son las columnas del tablero. Un campo personalizado que la persona no haya creado se escribe en la descripción de la tarea, una línea por campo (`Descripcion: …`).
- El tablero es la vista de tablero de la lista, agrupada por estado. La descripción de la tarea hace de página de la pieza.
- `Fuentes` y `Temas propios` son dos listas más, junto a la de la parrilla. Cada fuente y cada tema es una tarea: el título es el nombre de la tarea y lo demás va en su descripción. Un tema usado se marca como completado, con `usado en [ID]` en la descripción.
- En el plan gratuito de ClickUp el conector admite 50 llamadas cada 24 horas: crea y actualiza las tareas en bloque, no una por una.

## Entorno

- **La base se crea y se opera con el acceso real que tenga la sesión** al destino elegido: sus herramientas para crear, escribir filas, actualizar campos y releer. Sin acceso no se crea ni se opera nada: se consigue primero, en Configurar. No hay parrilla sin destino, y nunca inventes que la base existe.
- Si tu herramienta no puede crear algo de la estructura (el `ID` único, la fórmula, una vista, un estado o un campo), crea todo lo demás y dile a la persona, en una lista corta, qué agregar a mano y cómo, paso por paso.
- Los ejemplos de `AskUserQuestion` describen las preguntas: si la herramienta está disponible respeta sus límites (máximo 4 preguntas por llamada, de 2 a 4 opciones); si no, haz las mismas preguntas en el chat. Reutiliza lo que el usuario ya haya dicho.
- **Calcula las fechas y los días de la semana con una herramienta** (por ejemplo el comando `date`), nunca de memoria. «Hoy» es hoy en la hora local de la persona.
- Trabaja en el proyecto que eligió el usuario. Instalar la skill nunca crea nada.
- Construir el tablero no autoriza a publicar, programar posts ni enviar mensajes.

## CRÍTICO: arranque automático al cargar

Cuando el usuario pida este flujo, mira en silencio si existe `parrilla.md` y sigue:

- **No existe:** el tablero todavía no está construido. Ve a Configurar: tu siguiente mensaje es la pregunta del destino, con sus tres opciones. Nada más.
- **Existe:** el tablero ya está construido. Léelo y ve a «Poner al día». Si el pedido fue «arma mi parrilla» y no queda claro qué quiere, pregunta una vez: poner al día el tablero, o proponer temas (eso es `/contenido:post-proponer`).

En los dos casos, lee también `formatos.md` si existe, en silencio. Si `parrilla.md` trae una línea `Texto:` de antes y ya existe `formatos.md`, manda `formatos.md`: pregunta una vez si borras la línea vieja.

**Esta skill no propone temas, no redacta y no cierra publicaciones.** Si el pedido es uno de esos, di en una línea qué comando lo hace y detente:

| Pedido | Comando |
|---|---|
| Proponer temas, armar el calendario | `/contenido:post-proponer` |
| Redactar o aprobar un post | `/contenido:post-redactar` |
| Armar un carrusel, un infográfico o una tarjeta | `/contenido:post-disenar` |
| Publicar, «ya publiqué» o «lo dejé programado» | `/contenido:post-publicar` |

No resumas esta skill, no expliques cómo funciona y no preguntes si el usuario quiere correrla.

## Configurar — lo primero, una sola vez

Ninguna skill `post-*` funciona hasta que este flujo termina. Tiene cinco pasos y no se salta ninguno.

### 1. Pregunta dónde va la parrilla

Es la primera pregunta, sola, antes que cualquier otra:

```json
[
  {
    "question": "¿Dónde quieres llevar tu parrilla de contenidos?",
    "header": "Destino",
    "multiSelect": false,
    "options": [
      {"label": "Notion", "description": "Una base de datos con tablero por estado, calendario y una página por pieza"},
      {"label": "Airtable", "description": "Una base con los mismos campos, tablero Kanban por estado y calendario"},
      {"label": "ClickUp", "description": "Una lista de tareas con tablero por estado. Los estados y los campos los creas tú una vez, a mano"}
    ]
  }
]
```

Las opciones son estas tres. Si la persona pide otro destino, dile que por ahora la skill trabaja con Notion, Airtable y ClickUp, y que elija uno.

### 2. Consigue el acceso

El acceso es el conector MCP del destino elegido. El plugin `contenido` trae los tres conectores: al instalarlo ya están en la sesión y solo falta que la persona autorice su cuenta en el navegador. No sigas al paso 3 hasta **comprobar el acceso con una lectura real** (listar o buscar algo en su cuenta). Decir «ya está» no cuenta.

Si el conector no aparece en la sesión (por ejemplo, porque la skill se usa sin el plugin), se agrega a mano:

| Destino | Comando para agregar el conector |
|---|---|
| Notion | `claude mcp add --transport http notion https://mcp.notion.com/mcp` |
| Airtable | `claude mcp add --transport http airtable https://mcp.airtable.com/mcp` |
| ClickUp | `claude mcp add --transport http clickup https://mcp.clickup.com/mcp` |

1. Mira si la sesión tiene herramientas del destino elegido.
2. **El conector está instalado pero pide autenticación:** inicia la autenticación con la herramienta del conector y pásale el enlace, o dile que escriba `/mcp`, elija el conector y complete el acceso en el navegador.
3. **No aparece en la sesión:** pídele que lo agregue, con el paso exacto según donde trabaje:
   - En la terminal: el comando de la tabla. Después tiene que **reiniciar la sesión** (un conector recién agregado no aparece en la sesión en curso) y, ya dentro, escribir `/mcp` para autenticarse.
   - En la app: activar el conector del destino en la sección de conectores, si aparece ahí, y autorizarlo.

   Dile que al volver escriba «configura mi parrilla». Detente ahí.
4. Si el acceso que dio solo permite leer, dilo: con acceso de solo lectura la parrilla no se puede configurar.

### 3. Pregunta lo que define la parrilla

Si existen `sobre-mi.md` y redactores en `.claude/agents/redactor-*.md`, léelos primero: de ahí salen el nombre, los redactores, las redes y los límites, y no se vuelven a preguntar. Con redactores tampoco se pregunta el tipo de tema: cada redactor ya define sus temas y su propósito, y en `parrilla.md` se anota «lo define cada redactor». Si la persona responde que los temas los decide después, se anota igual. Con `formatos.md` tampoco se pregunta la red: sus canales son los de la parrilla. Si trae más de un canal, pregunta cuál es el principal: ese es el canal por defecto. Pregunta solo lo que falte. Las opciones de abajo son la referencia; ajústalas a lo que ya sabes de la persona.

```json
[
  {
    "question": "¿En qué red publicas con esta parrilla?",
    "header": "Red",
    "multiSelect": true,
    "options": [
      {"label": "LinkedIn", "description": "Texto, carrusel, foto o video"},
      {"label": "Instagram", "description": "Carrusel, foto o video"},
      {"label": "Facebook", "description": "Texto, foto o video"},
      {"label": "Blog propio", "description": "Artículos largos o cortos"}
    ]
  },
  {
    "question": "¿Qué día fijo de la semana publicas?",
    "header": "Día fijo",
    "multiSelect": false,
    "options": [
      {"label": "Martes", "description": "Deja el lunes para leer el borrador"},
      {"label": "Miércoles", "description": "Mitad de semana"},
      {"label": "Jueves", "description": "Deja tres días para leer el borrador"},
      {"label": "Lunes", "description": "El borrador se lee el fin de semana"}
    ]
  },
  {
    "question": "¿Qué tipo de tema va a tener tu parrilla? (uno solo: es lo que la hace reconocible)",
    "header": "Tipo de tema",
    "multiSelect": false,
    "options": [
      {"label": "Cómo logré un resultado", "description": "«Cómo logré [resultado con número] usando [método]», contado por quien lo hizo"},
      {"label": "Cómo resuelvo un problema", "description": "«Cómo resuelvo [problema de mi cliente]», con un caso propio"},
      {"label": "Lo que decidí y por qué", "description": "«Por qué elegí [decisión] y qué pasó después»"},
      {"label": "Lo que aprendí haciendo", "description": "«Lo que aprendí al [experiencia propia]», con lo que cambió"}
    ]
  }
]
```

Después, en un solo mensaje en el chat, pide lo que no cabe en opciones:

> Tres cosas más: 1) [en Notion: el link de la página dentro de la cual creo la base; si no me pasas ninguno, la creo en tu sección privada y después la mueves · en Airtable: en qué espacio de trabajo la creo, si tienes más de uno · en ClickUp: en qué espacio creo la lista]; 2) cuántos seguidores tienes hoy en esa red, para tener un «antes» (si no lo tienes a mano, queda pendiente); 3) si guardas ideas o documentas tu trabajo en algún archivo o carpeta de este proyecto, dime cuál.

**La regla de texto no se pregunta aquí:** la define `/contenido:construir-formatos`. Si no existe `formatos.md`, haz una sola pregunta con `AskUserQuestion`: «Definir mis formatos ahora» o «Seguir sin formatos». Si elige definirlos, sigue esa skill ahí mismo y vuelve a este paso con `formatos.md` escrito. Si sigue sin formatos, no hay tope de extensión ni de hashtags: solo manda la voz. Si `sobre-mi.md` no dice cómo se nombra a terceros (clientes, amigos, colegas), pregúntalo: por su nombre o por su rol.

### 4. Crea la base

1. Crea `Fuentes` y `Temas propios`, en ese orden, con la estructura de «Arriba de la parrilla». **Deja la plantilla completa:** lee `references/plantilla.md`, que está en la carpeta de esta skill, y síguela al pie de la letra: la página, sus textos, las vistas y los ejemplos (5 piezas, 2 fuentes y 3 temas). Los ejemplos se crean siempre, marcados `[PRUEBA]` o `[EJEMPLO]`: le muestran a la persona una parrilla en marcha. Después crea la base en el destino elegido, con **todos los campos de «La base»**, sus tipos, sus opciones exactas y su ayuda en la descripción de cada campo, y con las columnas en el orden por defecto. Las opciones de `Canal + tipo` salen de `formatos.md`, o de las redes elegidas si no existe; las de `Redactor`, de sus redactores más `Otro`.
2. **En Notion:** crea las cinco vistas. Si tu herramienta no puede crear una vista, dile a la persona cómo hacerla a mano: en la base, **+** junto a las pestañas de vistas → elegir el tipo (`Board`, `Calendar` o `Table`) → ponerle el nombre exacto → en `Board`, agrupar por `Estado`; en `Calendar`, mostrar por `Fecha programada`; en `Por Publicar` y `Publicado`, el filtro de `Estado` que indica «La base».
   **En Airtable:** crea la base con la tabla `Parrilla` y sus campos en la misma creación, en un espacio de trabajo donde la persona tenga permiso de creador. Las vistas que el conector no pueda crear se piden a mano, con los mismos nombres.
   **En ClickUp:** crea la lista y pídele a la persona, en un solo mensaje, lo que el conector no crea: los siete estados de la lista, con su nombre exacto y en su orden; los campos personalizados de «La base», con su nombre, su tipo y su ayuda para pegarla en la descripción; y la vista de tablero agrupada por estado. Espera a que diga que terminó.
3. Escribe el bloque **«Cómo funciona»**, con sus datos reales (en Notion, en la descripción de la base; en Airtable, en la descripción de la tabla; en ClickUp, en la descripción de la lista):

   > Parrilla de [red] de [nombre]. Las skills proponen y [nombre] decide.
   >
   > **Tipo de tema:** [el tipo elegido, o «lo define cada redactor»].
   >
   > **1 · Proponer** (`/contenido:post-proponer`): se proponen temas en `Tema Propuesto ✍️`, uno por [día]. Apruebo, corrijo o descarto cada uno.
   >
   > **2 · Redactar** (`/contenido:post-redactar`): se verifica cada cifra y se escribe con mi voz. El post queda en `Borrador Listo 👀`. Con mi ok pasa a `Listo a Publicar 👍`.
   >
   > **Si lleva pieza visual** (`/contenido:post-disenar`): el carrusel, el infográfico o la tarjeta se arman con mi estilo, sin cambiarle una palabra al texto.
   >
   > **3 · Publicar** (`/contenido:post-publicar`): el día de la pieza recibo todo para publicar. Un post solo pasa a `Publicado ✅` cuando yo paso el link.
   >
   > **Reglas:** un post por [día]. [Sus límites, uno por línea.]

4. **Relee la base** con tu herramienta y comprueba que `Fuentes` y `Temas propios` existen y quedaron arriba de la parrilla, y que están los ejemplos de la plantilla. Después compara campo por campo contra «La base»: los 14 nombres exactos, cada uno con su ayuda, las columnas de las tablas en el orden por defecto, y `Estado` como selección (en ClickUp, los estados de la lista) con sus siete valores exactos. ClickUp puede devolver los estados en minúsculas: al compararlos, ignora mayúsculas y minúsculas. Si algo quedó distinto, corrígelo antes de seguir; si no puedes, dilo. En ClickUp, anota qué campos personalizados existen: los que falten se escriben en la descripción de cada tarea.

### 5. Escribe parrilla.md y entrega

`parrilla.md` se escribe **solo después** de releer la base: su existencia le dice a las demás skills que el tablero está listo.

```
# Parrilla

- **Destino:** [Notion | Airtable | ClickUp]
- **Base:** Parrilla de contenidos — [nombre] · [URL de la base o de la lista]
- **Identificador:** [el que devolvió la herramienta al crearla: la fuente de datos en Notion, la base y la tabla en Airtable, la lista en ClickUp]
- **Fuentes:** [URL de la base de fuentes]
- **Temas propios:** [URL de la página de temas propios]
- **Campos en la descripción:** [solo en ClickUp: los campos que no existen como campo personalizado]
- **Canal por defecto:** [con `formatos.md`, solo el canal principal (`linkedin`): su tipo se lee en cada sesión de la línea `Por defecto:` de ese canal · sin `formatos.md`, `[red] - texto`]
- **Día fijo:** [día], una pieza por semana
- **Tipo de tema:** «[el tipo elegido, con su fórmula]», o «lo define cada redactor»
- **Redactores:** [los redactores de la persona: son las opciones del campo `Redactor`]
- **Formatos:** [`formatos.md`: de ahí salen los tipos y la regla de texto · o «sin formatos: solo manda la voz»]
- **Borradores:** `posts/`
- **Punto de partida:** [seguidores] al AAAA-MM-DD, o «pendiente»
- **Ejemplos:** [presentes · borrados el AAAA-MM-DD · pendientes de borrar a mano]

## Reglas propias
- [Los límites de sobre-mi.md y los que la persona agregue: qué nunca se publica, cómo se nombra a terceros]

## Bancos de temas
- [Archivos o carpetas donde la persona guarda ideas o documenta su trabajo. Los temas ya usados se marcan ahí]
```

Después di, con sus datos reales: el link de la base, dónde anotar sus temas (`Temas propios`) y dónde agregar sus fuentes (`Fuentes`), lo que haya que agregar a mano si algo no se pudo crear, y una sola pregunta: «La parrilla tiene ejemplos para que veas cómo funciona. ¿Los borro o los dejas un tiempo para guiarte?». Si dice que sí, bórralos como indica la plantilla y anótalo en `parrilla.md`. Después da una sola acción siguiente: «Para proponer los temas de los próximos cuatro [día], escribe `/contenido:post-proponer`».

## Poner al día — cuando el tablero ya existe

Empieza cuando existe `parrilla.md`. Compara el tablero con lo que hoy dicen `formatos.md` y los redactores, y corrige solo lo que falte:

1. **Comprueba el acceso** con una lectura real del tablero. Sin acceso, sigue el paso 2 de Configurar.
2. **`Canal + tipo`:** agrega cada «Opción en la parrilla» de `formatos.md` que falte (en ClickUp, pídesela a la persona). Nunca borres ni renombres una opción que tenga filas.
3. **`Redactor`:** agrega una opción por cada redactor nuevo de `.claude/agents/redactor-*.md`.
4. **Los campos y los estados:** compáralos contra «La base». Lo que falte se crea con su ayuda; lo que no puedas crear, se lo pides a la persona con el paso exacto.
5. **`parrilla.md`:** pon al día las líneas `Redactores` y `Formatos`.
6. Relee el tablero y di, en una lista corta, qué cambió. Si no había nada que cambiar, dilo en una línea.

Si la persona pide cambiar el día fijo o una regla propia, cámbialo en `parrilla.md` y en la descripción del tablero. Mover la parrilla a otro destino es volver a Configurar: avisa antes que las filas no se copian solas.

## Reglas

- Cuando esta skill se active, ve directo al trabajo. Sin resumen, sin explicación, sin preámbulo.
- **Esta skill construye el tablero y nada más.** No propone temas, no redacta, no arma piezas y no cierra publicaciones: eso es de las skills `post-*`.
- Los nombres de los campos y los valores de `Estado` se copian exactos: sin tilde los campos; con su emoji, sin número y en su orden los estados. Las demás skills los leen de aquí.
- Cada cambio se escribe en la base en el mismo turno en que ocurre, y se verifica releyendo.
- Los límites de `sobre-mi.md` y lo que la persona agregue se anotan en «Reglas propias» de `parrilla.md`: mandan sobre cualquier tema.
- Describe a la persona por sus rasgos. No la etiquetes por su país ni por su región.
- **Los formatos se usan, no se definen aquí.** Los tipos de `Canal + tipo` salen de `formatos.md`. Esta skill no los pregunta ni los copia en `parrilla.md`.
- **Los ejemplos no cuentan.** Lo que empieza con `[PRUEBA]` o `[EJEMPLO]` no es una pieza, una fuente ni un tema: ninguna skill lo usa ni le reserva fecha.
- **Primero se configura.** Sin `parrilla.md` no corre ninguna skill `post-*`: se pregunta el destino (Notion, Airtable o ClickUp) y se consigue el acceso.
- La estructura es la misma en los tres destinos: los mismos 14 campos con su ayuda, los mismos siete estados.
- Si falta el acceso, dilo y pide el paso exacto. Nunca afirmes que creaste o actualizaste algo en la base sin haberlo releído.
