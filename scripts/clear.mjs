import { rm } from "node:fs/promises";

await rm(".next", { recursive: true, force: true });
await rm(".swc", { recursive: true, force: true });
