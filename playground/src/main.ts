import { loadPyodide, version as pyodideVersion } from "pyodide";
import Alpine from "alpinejs";

window.Alpine = Alpine;
window.pyodide = await loadPyodide({
  indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
});

Alpine.start();
