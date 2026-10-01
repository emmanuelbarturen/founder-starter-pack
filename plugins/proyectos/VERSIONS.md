# Versiones

## 0.2.0 — 2026-09-30

- `plugin.json` desaparece: nombre, versión y metadatos viven en la entrada del plugin en
  `.claude-plugin/marketplace.json` del marketplace. El comando de instalación no cambia.
- Cada `SKILL.md` declara `name:` igual a su carpeta.
- El historial pasa de `CHANGELOG.md` a `VERSIONS.md`.

## 0.1.0 — 2026-09-28

- Primera versión como plugin. El ciclo sale del repo Company Cycle OS, donde vivía en `.claude/commands/proyecto/`
  con el prefijo `/proyecto:`; ahora es `/proyectos:`.
- Nueva skill `reglas` con lo que antes estaba en el `CLAUDE.md` y en `Proyectos/_context.md` de la empresa.
- Las plantillas pasan de `_Templates/` del repo de la empresa a `templates/` del plugin.
- `validar.ts` pasa a `scripts/` y gana `bun test` con 6 casos.
