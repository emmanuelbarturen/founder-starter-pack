// Tests del validador: cada caso copia la empresa de fixture a un directorio temporal,
// la rompe de una forma concreta y comprueba el exit code y el chequeo que lo reporta.
import { afterEach, expect, test } from "bun:test";
import { cpSync, mkdtempSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SCRIPT = join(import.meta.dir, "..", "scripts", "validar.ts");
const FIXTURE = join(import.meta.dir, "fixtures", "empresa");
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

afterEach(() => {
  while (creados.length) rmSync(creados.pop()!, { recursive: true, force: true });
});

test("empresa limpia: exit 0", () => {
  const r = validar(copia());
  expect(r.code).toBe(0);
  expect(r.out).toContain("0 errores");
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

test("residuo del ejemplo con Id propio: exit 1 por V10", () => {
  const dir = copia();
  writeFileSync(join(dir, ".ccos", "ejemplo.txt"), "# manifiesto\nVentas/clientes/\n");
  const r = validar(dir);
  expect(r.code).toBe(1);
  expect(r.out).toContain("V10");
});
