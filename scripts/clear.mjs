import { rmSync } from "fs";

rmSync(".next", { recursive: true, force: true });
rmSync(".swc", { recursive: true, force: true });
