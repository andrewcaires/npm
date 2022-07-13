import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { rmSync } from "fs";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

import pkg from "../package.json";

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license: ${pkg.license}
 */
`;

const name = "Api";
const external = [
  "@andrewcaires/utils.js",
  "cors",
  "crypto-js",
  "dotenv",
  "express",
  "fs",
  "http",
  "https",
  "joi",
  "jsonwebtoken",
  "mime-types",
  "multer",
  "net",
  "path",
  "sequelize",
  "vue",
  "ws",
];

const output = (formats) => {

  return Object.keys(formats).map((format) => {

    return { name, exports: "named", file: formats[format], format };
  });
};

export default [
  {
    external,
    input: "src/index.ts",
    output: output({ cjs: pkg.main, es: pkg.module }),
    plugins: [
      typescript({ module: "esnext", tsconfig: "./tsconfig.json" }),
      commonjs({ extensions: [".js", ".ts"] }),
      terser({ format: { comments: false } }),
      { renderChunk: async (code) => banner + code },
    ],
  },
  {
    external,
    input: "dist/types/index.d.ts",
    output: { file: pkg.types, format: "es" },
    plugins: [
      dts(),
      { renderChunk: (code) => (rmSync("dist/types", { recursive: true, force: true }), banner + code) },
    ]
  }
];
