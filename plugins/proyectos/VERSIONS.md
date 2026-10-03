# Versiones

## 0.3.0 — 2026-10-03

- Nueva skill `/proyectos:init`: en una carpeta vacía crea la estructura base (7 carpetas, cada una con
  `_context.md`, `_rules.md` y `_enlaces.md`) desde `templates/base/` y sigue con `setup`. No pregunta nada y no pisa
  archivos que ya existan.
- **Cambia la forma de `Proyectos/`.** Los proyectos viven en `Proyectos/Proyectos-Regulares/<slug>/`. Lo archivado
  vive en `Proyectos/Proyectos-Regulares/Archivados/` y en `Proyectos/Tareas/Archivados/`. `Proyectos/<slug>/` y
  `Proyectos/Archivados/` ahora son error del validador (V8).
- `setup` corre después de `init` (`Id` = `pendiente`). Ya no existe la empresa de ejemplo: se retiran su paso de
  borrado en `setup` y el chequeo del manifiesto en el validador. El chequeo de higiene pasa a ser V10.
- El validador acepta los tres descriptores en las carpetas de servicio, avisa si falta alguno y avisa si el `Id`
  sigue en `pendiente`. Marca como error los archivos y carpetas sueltos dentro de `Proyectos/`.
- `templates/_rules-raiz.md` y `templates/_enlaces-raiz.md` pasan a `templates/base/_rules.md` y `_enlaces.md`.

Para migrar un repo con la forma anterior, desde su raíz (cada `mv` solo si esa carpeta tiene contenido):

```bash
mkdir -p Proyectos/Proyectos-Regulares/Archivados Proyectos/Tareas/Archivados
mv Proyectos/Archivados/Tareas/*.md Proyectos/Tareas/Archivados/
rmdir Proyectos/Archivados/Tareas
mv Proyectos/Archivados/* Proyectos/Proyectos-Regulares/Archivados/
rmdir Proyectos/Archivados
# por cada proyecto activo:
mv Proyectos/<slug> Proyectos/Proyectos-Regulares/<slug>
```

Las rutas de `Resultado:` no cambian: apuntan a las áreas, no a `Proyectos/`.

## 0.2.0 — 2026-09-30

- `plugin.json` desaparece: nombre, versión y metadatos viven en la entrada del plugin en
  `.claude-plugin/marketplace.json` del marketplace. El comando de instalación no cambia.
- Cada `SKILL.md` declara `name:` igual a su carpeta.
- El historial pasa de `CHANGELOG.md` a `VERSIONS.md`.

## 0.1.0 — 2026-09-28

- Primera versión del plugin, con el prefijo `/proyectos:`.
- Skill `reglas` con las reglas del repo de la empresa.
- Las plantillas viven en `templates/` del plugin.
- `validar.ts` vive en `scripts/`, con `bun test` de 6 casos.
