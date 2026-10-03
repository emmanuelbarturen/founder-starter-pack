// Tests del validador: cada caso copia la empresa de fixture a un directorio temporal,
// la rompe de una forma concreta y comprueba el exit code y el chequeo que lo reporta.
import { afterEach, expect, test } from "bun:test";
import { cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SCRIPT = join(import.meta.dir, "..", "scripts", "validar.ts");
const FIXTURE = join(import.meta.dir, "fixtures", "empresa");
const BASE = join(import.meta.dir, "..", "templates", "base");
const CABECERA = "<!-- Creado: 2026-09-28 · Actualizado: 2026-09-28 · Creador: fixture -->";
const creados: string[] = [];

function copia(): string {
  const dir = mkdtempSync(join(tmpdir(), "validar-"));
  cpSync(FIXTURE, dir, { recursive: true });
  creados.push(dir);
  return dir;
}

function validar(dir: string, ...extra: string[]) {
  const r = Bun.spawnSync(["bun", SCRIPT, "--raiz", dir, ...extra]);
  return { code: r.exitCode, out: r.stdout.toString() + r.stderr.toString() };
}

function mds(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? mds(p) : p.endsWith(".md") ? [p] : [];
  });
}

function trabajo(fase: string, archivado = false): string {
  return `${CABECERA}\n# Trabajo\n\n## Estado\n\n- **Fase:** ${fase}\n- **Área:** Ventas\n- **Resultado esperado:** ninguno — trámite${archivado ? "\n- **Resultado:** ninguno — trámite" : ""}\n`;
}

afterEach(() => {
  while (creados.length) rmSync(creados.pop()!, { recursive: true, force: true });
});

test("empresa limpia: exit 0", () => {
  const r = validar(copia());
  expect(r.code).toBe(0);
  expect(r.out).toContain("0 errores");
  expect(r.out).toContain("0 avisos");
  expect(r.out).not.toContain("_context");
});

test("lo que init crea pasa el validador", () => {
  const dir = mkdtempSync(join(tmpdir(), "validar-base-"));
  cpSync(BASE, dir, { recursive: true });
  creados.push(dir);
  for (const p of mds(dir)) {
    const texto = readFileSync(p, "utf8");
    const salto = texto.indexOf("\n");
    const primera = (salto < 0 ? texto : texto.slice(0, salto)).replaceAll("AAAA-MM-DD", "2026-10-03").replaceAll("<nombre>", "por definir");
    writeFileSync(p, salto < 0 ? primera : `${primera}${texto.slice(salto)}`);
  }
  const r = validar(dir);
  expect(r.code).toBe(0);
  expect(r.out).toContain("0 errores");
  expect(r.out).toContain("1 avisos");
  expect(r.out).toContain("pendiente");
});

test("archivo de 121 líneas: exit 1 por V5", () => {
  const dir = copia();
  const cuerpo = Array.from({ length: 121 }, (_, i) => `línea ${i + 1}`).join("\n");
  writeFileSync(join(dir, "Ventas", "clientes", "largo.md"), `${CABECERA}\n${cuerpo}\n`);
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("largo.md");
});

test("descriptor de área faltante: exit 1 por V1", () => {
  const dir = copia();
  unlinkSync(join(dir, "Ventas", "_rules.md"));
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("Ventas/_rules.md");
});

test("ruta personal con --publicar: exit 2 por higiene", () => {
  const dir = copia();
  const ruta = ["", "Users", "alguien", "notas"].join("/");
  writeFileSync(join(dir, "Ventas", "clientes", "segmentos.md"), `${CABECERA}\n# Segmentos\n\nVer ${ruta}\n`);
  expect(validar(dir).code).toBe(0);
  expect(validar(dir, "--publicar").code).toBe(2);
});

test("Estado con Fase inválida: exit 1 por V8", () => {
  const dir = copia();
  writeFileSync(
    join(dir, "Proyectos", "Tareas", "renovar-contrato.md"),
    `${CABECERA}\n# Renovar contrato\n\n## Estado\n\n- **Fase:** terminado\n- **Área:** Ventas\n`,
  );
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("renovar-contrato.md");
});

test("proyecto en la forma antigua: exit 1 por V8", () => {
  const dir = copia();
  const destino = join(dir, "Proyectos", "algo-viejo");
  mkdirSync(destino);
  writeFileSync(join(destino, "propuesta.md"), trabajo("proponer"));
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("V8");
  expect(r.out).toContain("Proyectos-Regulares");
});

test("Proyectos/Archivados antiguo: exit 1 por V8", () => {
  const dir = copia();
  mkdirSync(join(dir, "Proyectos", "Archivados"));
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("V8");
  expect(r.out).toContain("Proyectos/Archivados");
});

test(".md sueltos fuera de su hogar: exit 1 por V8", () => {
  const dir = copia();
  writeFileSync(join(dir, "Proyectos", "suelto.md"), `${CABECERA}\n# Suelto\nUna nota.\n`);
  writeFileSync(join(dir, "Proyectos", "Proyectos-Regulares", "suelto.md"), `${CABECERA}\n# Suelto\nUna nota.\n`);
  writeFileSync(join(dir, "Proyectos", "Proyectos-Regulares", "Archivados", "suelto.md"), `${CABECERA}\n# Suelto\nUna nota.\n`);
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("V8");
  expect(r.out).toContain("Proyectos/suelto.md");
  expect(r.out).toContain("Proyectos/Proyectos-Regulares/suelto.md");
  expect(r.out).toContain("Proyectos/Proyectos-Regulares/Archivados/suelto.md");
});

test("carpeta dentro de Tareas: exit 1 por V8", () => {
  const dir = copia();
  mkdirSync(join(dir, "Proyectos", "Tareas", "carpeta"));
  mkdirSync(join(dir, "Proyectos", "Tareas", "Archivados", "carpeta"));
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("V8");
  expect(r.out).toContain("una tarea es un solo archivo");
  expect(r.out).toContain("Proyectos/Tareas/Archivados/carpeta/");
});

test("Fase inválida en Proyectos-Regulares: exit 1 por V8", () => {
  const dir = copia();
  const destino = join(dir, "Proyectos", "Proyectos-Regulares", "fase-invalida");
  mkdirSync(destino);
  writeFileSync(join(destino, "propuesta.md"), trabajo("terminado"));
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("Proyectos/Proyectos-Regulares/fase-invalida/propuesta.md");
});

test("tarea archivada con Fase activa: exit 1 por V8", () => {
  const dir = copia();
  writeFileSync(join(dir, "Proyectos", "Tareas", "Archivados", "llamar-proveedor.md"), trabajo("proponer", true));
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("V8");
  expect(r.out).toContain("Proyectos/Tareas/Archivados/");
});

test("descriptor de Decisiones faltante: aviso V1", () => {
  const dir = copia();
  unlinkSync(join(dir, "Decisiones", "_rules.md"));
  const r = validar(dir);
  expect(r.code).toBe(0);
  expect(r.out).toContain("V1");
  expect(r.out).toContain("Decisiones/_rules.md");
});

test("Proyectos/_context.md faltante: exit 1 por V1, sin aviso duplicado", () => {
  const dir = copia();
  unlinkSync(join(dir, "Proyectos", "_context.md"));
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("Proyectos/_context.md — falta el descriptor");
  expect(r.out).toContain("0 avisos");
});
