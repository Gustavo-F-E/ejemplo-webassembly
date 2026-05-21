import { loadPyodide } from "./pyodide/pyodide.mjs";

    // Inicializa Pyodide
    const pyodide = await loadPyodide({
      indexURL: "./pyodide/"
    });

    // Carga el archivo Python
    const response = await fetch("./scripts/suma.py");

    // Lee el contenido del archivo
    const pythonCode = await response.text();

    // Ejecuta el script Python
    await pyodide.runPythonAsync(pythonCode);

    async function sumar(){

      const a = Number(document.getElementById("a").value);
      const b = Number(document.getElementById("b").value);

      // Obtiene la función Python
      const sumarPython = pyodide.globals.get("sumar");

      // Ejecuta función Python
      const resultado = sumarPython(a, b);

      document.getElementById("resultado").innerHTML =
        "Resultado: " + resultado;
    }

    window.sumar = sumar;