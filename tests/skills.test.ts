// Corre validar-skills.ts sobre skills/ del repo: todas las skills publicadas deben pasar.
import { expect, test } from "bun:test";
import { join } from "node:path";

test("skills/ pasa validar-skills.ts: exit 0", () => {
  const r = Bun.spawnSync(["bun", join(import.meta.dir, "..", "validar-skills.ts")]);
  expect(r.stdout.toString()).toContain("0 errores");
  expect(r.exitCode).toBe(0);
});
