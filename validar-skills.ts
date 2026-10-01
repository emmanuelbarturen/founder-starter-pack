#!/usr/bin/env bun
/**
 * validar-skills.ts — revisa cada plugins/<plugin>/skills/<nombre>/SKILL.md contra el formato de Agent Skills.
 *
 * Uso:  bun validar-skills.ts
 *
 * Chequea: frontmatter YAML, `name` igual a la carpeta (kebab-case, ≤64), `description` presente (≤1024 avisa),
 * tamaño del SKILL.md (>500 líneas avisa). Salida: 0 sin errores · 1 con errores.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PLUGINS = join(import.meta.dir, "plugins");
const RE_NOMBRE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
let errores = 0;
let avisos = 0;

const err = (s: string, m: string) => { errores++; console.log(`  ✗ ${s}: ${m}`); };
const aviso = (s: string, m: string) => { avisos++; console.log(`  ! ${s}: ${m}`); };

const dirs = (p: string) => (existsSync(p) ? readdirSync(p).filter((n) => !n.startsWith(".") && statSync(join(p, n)).isDirectory()).sort() : []);
const plugins = dirs(PLUGINS);
if (plugins.length === 0) { console.error("No encuentro plugins/<plugin>/."); process.exit(1); }
let total = 0;

for (const p of plugins) for (const s of dirs(join(PLUGINS, p, "skills"))) {
  total++;
  const id = `${p}/${s}`;
  const md = join(PLUGINS, p, "skills", s, "SKILL.md");
  if (!existsSync(md)) { err(id, "falta SKILL.md"); continue; }
  if (!RE_NOMBRE.test(s)) err(id, "la carpeta debe ir en kebab-case (a-z, 0-9, guiones)");

  const texto = readFileSync(md, "utf8");
  const fm = texto.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) { err(id, "SKILL.md debe abrir con frontmatter YAML (---)"); continue; }

  const nombre = (fm[1].match(/^name:\s*["']?([^"'\n]*?)["']?\s*$/m) ?? [])[1] ?? "";
  if (!nombre) err(id, "falta `name` en el frontmatter");
  else if (nombre !== s) err(id, `name '${nombre}' no coincide con la carpeta`);
  else if (nombre.length > 64) err(id, "name pasa de 64 caracteres");

  const desc = ((fm[1].match(/^description:\s*(.*)$/m) ?? [])[1] ?? "").trim();
  if (!desc) err(id, "falta `description` en el frontmatter");
  else if (desc.length > 1024) aviso(id, `description de ${desc.length} caracteres; recórtala bajo 1024`);

  const lineas = texto.split("\n").length;
  if (lineas > 500) aviso(id, `SKILL.md de ${lineas} líneas; mueve detalle a references/`);
}

console.log(`${plugins.length} plugins · ${total} skills · ${errores} errores · ${avisos} avisos`);
process.exit(errores > 0 ? 1 : 0);
