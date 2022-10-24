import { rmSync } from "fs";

rmSync(".next", { recursive: true, force: true });
rmSync(".swc", { recursive: true, force: true });
rmSync("node_modules", { recursive: true, force: true });
rmSync("tsconfig.tsbuildinfo", { recursive: true, force: true });
