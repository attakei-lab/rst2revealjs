import { loadPyodide, version as pyodideVersion } from "pyodide";
import mainPy from "./main.py?raw";

const pyodide = await loadPyodide({
  indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
});

await pyodide.loadPackage("micropip");
await pyodide.runPythonAsync(`
  import micropip
  
  await micropip.install(["rst2revealjs"])
`);
await pyodide.runPython(mainPy);

function publishRevealjs(source: string, settings: string): string {
  return pyodide.globals.get("publish_revealjs")(source, settings);
}

export { publishRevealjs };
