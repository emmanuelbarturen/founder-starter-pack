# Plantilla de la parrilla

Configurar deja la parrilla **exactamente así**, con sus textos y sus ejemplos. Lo único que cambia de una persona a otra va entre corchetes. Los campos, sus tipos, su ayuda y su orden están en «La base» y en «Arriba de la parrilla» de `SKILL.md`; aquí está todo lo demás.

## 1. La página

- **Título:** «Parrilla de contenidos — [nombre de pila]». **Icono:** 🗓️.
- **Primera línea,** tal cual:

  > Arriba está de dónde salen los temas: las **Fuentes** que conviene revisar y los **Temas propios** que anotas tú. Abajo está la parrilla, con una fila por post.

- **Debajo, en este orden:**
  1. `Fuentes` — base de datos, como subpágina (no desplegada).
  2. `Temas propios` — página, con icono 💡.
  3. `Parrilla` — base de datos **en línea**, desplegada, con sus cinco vistas.

En Airtable y en ClickUp no hay página que las contenga: `Fuentes`, `Temas propios` y la parrilla quedan en ese mismo orden dentro de la base o del espacio.

## 2. Las vistas de `Parrilla`

| Vista | Tipo | Configuración |
|---|---|---|
| `Default view` | tabla | Las 14 columnas en el orden por defecto, con `ID` y `Tema` fijas |
| `Board` | tablero | Agrupado por `Estado`. Cada tarjeta muestra `Tema`, `ID`, `Fecha programada`, `Redactor`, `Canal + tipo` |
| `Calendar` | calendario | Por `Fecha programada`. Cada pieza muestra `Tema`, `ID`, `Estado`, `Canal + tipo` |
| `Por Publicar` | tabla | Filtro: `Estado` distinto de `Publicado ✅` y de `Descartado 🗑️`. Orden: `Fecha programada` ascendente. Mismas columnas que la tabla por defecto |
| `Publicado` | tabla | Filtro: `Estado` igual a `Publicado ✅`. Orden: `Fecha de publicacion` descendente. Mismas columnas que la tabla por defecto |

## 3. Los 5 ejemplos de `Parrilla`

Uno por estado, para que la persona vea una parrilla en marcha. Se crean **siempre**. Las fechas se calculan con una herramienta a partir de **P**, el próximo día fijo contado desde hoy.

- `Canal + tipo`: el canal por defecto, salvo donde se indica otro.
- `Redactor`: **R1** es el primer redactor de la persona y **R2** el segundo. Si tiene uno solo, R2 es el mismo. Si no tiene ninguno, los dos son `Otro`.

| # | `Tema` | `Estado` | `Fecha programada` | `Redactor` | `Descripcion` | `Palabras` | `Archivo en el repo` |
|---|---|---|---|---|---|---|---|
| 1 | [PRUEBA] Cómo bajé de 40 a 5 minutos el armado de un reporte | `Publicado ✅` | P menos 3 semanas | R1 | Un agente arma el reporte semanal y yo solo reviso los totales | 195 | `posts/01-reporte-en-cinco-minutos.md` |
| 2 | [PRUEBA] Lo que entendí tarde sobre delegar | `Listo a Publicar 👍` | P menos 2 semanas | R2 | Revisaba todo yo mismo y el equipo dejó de decidir | 172 | `posts/02-entendi-tarde-delegar.md` |
| 3 | [PRUEBA] Probé tres modelos para leer facturas | `Borrador Listo 👀` | P | R1 | Qué midió cada modelo y cuál se quedó en producción | 410 | `posts/03-tres-modelos-facturas.md` |
| 4 | [PRUEBA] Por qué dejé de estimar en horas | `Tema Aprobado ✔` | P más 1 semana | R2 | Pasé de estimar en horas a comprometer una fecha por entrega | vacío | vacío |
| 5 | [PRUEBA] El día que nuestra página de estado mintió | `Tema Propuesto ✍️` | P más 2 semanas | `Otro` | La página mostró una caída que no existió y ocultó las que sí | vacío | vacío |

Lo que no cabe en la tabla:

- **Ejemplo 1:** `Fecha de publicacion` es un día después de su `Fecha programada`, y `URL publicada` es `https://example.com/post-de-prueba-1`.
- **Ejemplo 3:** su `Canal + tipo` es otro formato de la misma red (`[red] - carrusel`), si existe esa opción.
- Los archivos de `posts/` de los ejemplos **no se crean**: la ruta solo muestra cómo se ve el campo.

`Notas` de cada ejemplo, tal cual:

1. Ejemplo, no es real. Salió un día después de lo programado. Cifra: de 40 a 5 minutos por reporte (relato de prueba).
2. Ejemplo, no es real. Texto aprobado y vencido: debía salir el [su fecha programada, en palabras].
3. Ejemplo, no es real. Borrador que supera el máximo de [máximo de la regla de texto] palabras, en carrusel. ❓ Falta confirmar el porcentaje de aciertos. (Si no hay un máximo definido, escribe «Borrador demasiado largo para su canal». Si el ejemplo no quedó en carrusel, quita «en carrusel».)
4. Ejemplo, no es real. Tema aprobado, falta redactar. Cifra: 2 de 3 entregas a tiempo desde el cambio (relato de prueba).
5. Ejemplo, no es real. Tema propuesto, falta que decidas. ⚠️ tema sensible: cuenta un error propio.

## 4. `Fuentes`

**Descripción de la base,** tal cual:

> Lugares de donde salen temas: noticias, boletines, personas, normas. Una fila por fuente. Al proponer temas se revisan y se anota la fecha.

**Dos ejemplos:**

| `Fuente` | `Tipo` | `Link` | `Para que sirve` | `Redactor` |
|---|---|---|---|---|
| [EJEMPLO] Boletín semanal de mi sector | `boletin` | `https://example.com/boletin` | Novedades de la semana para comentar con mi punto de vista | R1 |
| [EJEMPLO] Preguntas que me hacen mis clientes | `persona` | vacío | Cada pregunta repetida es un tema: lo que explico siempre | R2 |

`Ultima revision` queda vacía en los dos.

## 5. `Temas propios`

El contenido de la página, tal cual. La primera línea va en un recuadro de aviso con el icono 💡:

```
Anota aquí tus temas, uno por viñeta: un título y de qué se trata. Cuando un tema entra a la parrilla, se marca con ✅ y baja a «Usados».

## Por usar
- **[EJEMPLO] Dejé de revisar cada entrega yo mismo.** Revisaba todo antes de que saliera y el equipo dejó de decidir.
- **[EJEMPLO] La pregunta que más me hacen mis clientes.** La respondo siempre igual; vale la pena dejarla escrita.

## Usados
- ✅ **[EJEMPLO] Por qué dejé de estimar en horas.** Pasé de estimar en horas a comprometer una fecha por entrega. · usado en [el ID del ejemplo 4]
```

Aquí `[EJEMPLO]` se escribe así, con sus corchetes: es la marca del ejemplo.

## 6. Borrar los ejemplos

Al entregar, la skill pregunta una sola vez si borra los ejemplos. Son ejemplo todo lo que empieza con `[PRUEBA]` o con `[EJEMPLO]`: 5 piezas, 2 fuentes y 3 temas.

Si la persona dice que sí:

1. Quita las tres viñetas de ejemplo de `Temas propios`. Quedan el aviso y las dos secciones vacías.
2. Borra las 5 piezas y las 2 fuentes, si tu herramienta puede borrar filas.
3. Si no puede (el conector de Notion no tiene herramienta para borrar filas), no las cambies de estado ni las escondas. Dile cómo se borran a mano: marcar las filas que empiezan con `[PRUEBA]` o `[EJEMPLO]` y elegir «Eliminar».
4. Relee y di qué quedó borrado y qué falta que borre ella.
5. Anota en `parrilla.md`: «**Ejemplos:** borrados el AAAA-MM-DD», o «pendientes de borrar a mano».

Si dice que no, anota «**Ejemplos:** presentes» y sigue. Mientras existan, los ejemplos **no cuentan**: ninguna skill los toma como piezas, les reserva fecha ni los lista.
