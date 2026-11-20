import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("public/dist", { recursive: true });
mkdirSync("public/interactive_dragon", { recursive: true });

copyFileSync("index.html", "public/index.html");
copyFileSync("styles.css", "public/styles.css");
copyFileSync("dist/main.js", "public/dist/main.js");
copyFileSync(
  "interactive_dragon/interactive dragon.js",
  "public/interactive_dragon/interactive dragon.js",
);
