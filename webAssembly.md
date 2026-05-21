\# Guía completa de WebAssembly con Python y Rust



\## 📚 ¿Qué es WebAssembly (WASM)?



WebAssembly es un formato de instrucciones binarias de bajo nivel que permite ejecutar código compilado (C, C++, Rust, Go, etc.) en el navegador web a velocidad casi nativa. Es un complemento de JavaScript, no un reemplazo.



\### Ventajas principales



\- \*\*Rendimiento\*\*: Casi velocidad nativa

\- \*\*Seguridad\*\*: Ejecución en sandbox

\- \*\*Multi-lenguaje\*\*: Compila desde varios lenguajes

\- \*\*Portabilidad\*\*: Funciona en todos los navegadores modernos



\---



\# 🐍 Python con Pyodide



\## ¿Qué es Pyodide?



Pyodide es una distribución de Python 3.x compilada a WebAssembly. Incluye:



\- El intérprete completo de Python

\- Muchas librerías científicas (NumPy, pandas, matplotlib)

\- La capacidad de ejecutar código Python directamente en el navegador



\---



\## Estructura de tu proyecto para Python



```text

web assembly con python/

├── index.html

├── python.js

├── styles.css

├── pyodide/                  # Contiene los archivos WASM de Pyodide

│   ├── pyodide.mjs

│   ├── pyodide.asm.wasm

│   └── ...

└── scripts/

&#x20;   └── suma.py               # Tu código Python

```



\---



\## Explicación de tu `python.js`



```javascript

// Cargar Pyodide (asíncrono)

const pyodide = await loadPyodide({

&#x20; indexURL: "./pyodide/"  // Dónde están los archivos de Pyodide

});



// Cargar script Python externo

const response = await fetch("./scripts/suma.py");

const pythonCode = await response.text();



// Ejecutar código Python en el sandbox de WASM

await pyodide.runPythonAsync(pythonCode);



// Obtener función Python y ejecutarla

const sumarPython = pyodide.globals.get("sumar");

const resultado = sumarPython(a, b);

```



\---



\## Funcionamiento interno



1\. Pyodide descarga e instancia el runtime de Python en WASM

2\. Tu código Python se ejecuta dentro de este runtime

3\. Las funciones quedan disponibles en `pyodide.globals`

4\. JavaScript puede llamar a Python y viceversa



\---



\# 🦀 Rust con WASM



\## Compilación de Rust a WASM



Rust tiene soporte nativo para WebAssembly sin necesidad de herramientas externas.



\---



\## Configuración inicial



```bash

\# Instalar target WASM

rustup target add wasm32-unknown-unknown



\# Crear librería Rust

cargo new hello-wasm --lib

cd hello-wasm

```



\---



\## Tu `lib.rs` explicado



```rust

// La macro #\[no\_mangle] evita que Rust modifique el nombre

// de la función (necesario para que JavaScript la encuentre)

\#\[no\_mangle]



// pub extern "C" usa la convención de llamadas de C,

// compatible con WebAssembly

pub extern "C" fn sumar(a: i32, b: i32) -> i32 {

&#x20;   a + b  // Operación simple

}

```



\---



\## Compilación



```bash

\# Compilar para depuración (archivo más grande)

cargo build --target wasm32-unknown-unknown



\# Para producción (optimizado y más pequeño)

cargo build --target wasm32-unknown-unknown --release



\# Usando wasm-opt para optimizar aún más (opcional)

wasm-opt -Oz hello\_wasm.wasm -o hello\_wasm\_opt.wasm

```



\---



\## Tu `rust.js` explicado



```javascript

// Cargar el archivo WASM compilado

const response = await fetch("./hello-wasm/target/wasm32-unknown-unknown/debug/hello\_wasm.wasm");



// Convertir respuesta a ArrayBuffer (formato binario)

const bytes = await response.arrayBuffer();



// Instanciar el módulo WASM

const result = await WebAssembly.instantiate(bytes);



// Obtener las exportaciones (funciones disponibles)

wasm = result.instance.exports;



// Llamar función WASM

const resultado = wasm.sumar(a, b);

```



\---



\# 🔄 Comparación Python vs Rust en WASM



| Característica | Python (Pyodide) | Rust |

|---|---|---|

| Tamaño | \~20-30 MB | \~50 KB - 2 MB |

| Velocidad | Lenta (interpretado) | Muy rápida (nativa) |

| Inicio | 2-5 segundos | Milisegundos |

| Bibliotecas | NumPy, pandas, etc. | Solo lo que compilas |

| Facilidad | Fácil (Python puro) | Requiere Rust |

| Caso de uso | Prototipado, ciencia de datos | Rendimiento, juegos, cómputo |



\---



\# 📁 Tu estructura de archivos explicada



```text

PS C:\\Proyectos\\Web assembly con python> ls



Directorio: C:\\Proyectos\\Web assembly con python



Mode    LastWriteTime    Length Name

\----    -------------    ------ ----

d-----  21/05/2026 14:01        hello-wasm           # Proyecto Rust

d-----  07/05/2026 7:20         pyodide              # Runtime Python WASM

d-----  21/05/2026 8:45         scripts              # Código Python

\-a----  21/05/2026 14:05   783  index.html           # Interfaz web

\-a----  21/05/2026 8:38    880  python.js            # Cargador Python

\-a----  21/05/2026 14:07   625  rust.js              # Cargador Rust

\-a----  21/05/2026 14:08   311  styles.css           # Estilos

```



\---



\# 🚀 Cómo mejorar tu proyecto



\## 1. Manejo de errores



\### En `python.js`



```javascript

async function sumar() {

&#x20;   try {

&#x20;       const a = Number(document.getElementById("a").value);

&#x20;       const b = Number(document.getElementById("b").value);



&#x20;       if (isNaN(a) || isNaN(b)) {

&#x20;           throw new Error("Ingrese números válidos");

&#x20;       }



&#x20;       const resultado = pyodide.globals.get("sumar")(a, b);



&#x20;       document.getElementById("resultado").innerHTML =

&#x20;           "Resultado: " + resultado;



&#x20;   } catch (error) {



&#x20;       document.getElementById("resultado").innerHTML =

&#x20;           "Error: " + error.message;



&#x20;       document.getElementById("resultado").style.color = "red";

&#x20;   }

}

```



\---



\## 2. Cargar más funciones Python



\### `scripts/matematicas.py`



```python

def sumar(a, b):

&#x20;   return a + b



def multiplicar(a, b):

&#x20;   return a \* b



def potencia(a, b):

&#x20;   return a \*\* b



def fibonacci(n):

&#x20;   if n <= 1:

&#x20;       return n

&#x20;   return fibonacci(n-1) + fibonacci(n-2)

```



\---



\## 3. Pasar arrays entre JavaScript y WASM



\### En Rust (con `wasm-bindgen`)



```rust

use wasm\_bindgen::prelude::\*;



\#\[wasm\_bindgen]

pub fn sumar\_array(arr: \&\[i32]) -> i32 {

&#x20;   arr.iter().sum()

}



\#\[wasm\_bindgen]

pub fn duplicar\_array(arr: \&\[i32]) -> Vec<i32> {

&#x20;   arr.iter().map(|x| x \* 2).collect()

}

```



\### En JavaScript



```javascript

const arr = new Int32Array(\[1, 2, 3, 4, 5]);



const resultado = wasm.sumar\_array(arr);

```



\---



\## 4. Mostrar progreso de carga



\### `index.html`



```html

<div id="loading">

&#x20;   <p>Cargando WebAssembly...</p>

&#x20;   <div class="progress-bar"></div>

</div>

```



\### `python.js`



```javascript

async function initPyodide() {



&#x20;   const loadingDiv = document.getElementById("loading");



&#x20;   loadingDiv.style.display = "block";



&#x20;   const pyodide = await loadPyodide({

&#x20;       indexURL: "./pyodide/",

&#x20;       onProgress: (progreso) => {

&#x20;           console.log(`Cargando: ${progreso}%`);

&#x20;       }

&#x20;   });



&#x20;   loadingDiv.style.display = "none";



&#x20;   return pyodide;

}

```



\---



\# 🛠️ Archivos necesarios para tu proyecto



\## Para Python/Pyodide



✅ `pyodide/` — Completos  

(Descargados desde Pyodide Releases)



✅ `scripts/suma.py` — Tu código Python



✅ `python.js` — Cargador



\---



\## Para Rust



✅ `hello-wasm/src/lib.rs` — Código Rust



✅ `hello-wasm/Cargo.toml`



\---



\## Crear `hello-wasm/Cargo.toml`



```toml

\[package]

name = "hello-wasm"

version = "0.1.0"

edition = "2021"



\[lib]

crate-type = \["cdylib", "rlib"]



\[dependencies]

wasm-bindgen = "0.2"

```



\---



\# 🔧 Solución de problemas comunes



\## Error: `"Cannot find module './pyodide/pyodide.mjs'"`



```bash

\# Descargar Pyodide correctamente

\# Desde:

\# https://github.com/pyodide/pyodide/releases



\# Descargar pyodide-build-xxx.tar.bz2

\# Extraer en carpeta 'pyodide'

```



\---



\## Error: `"WebAssembly.instantiate(): expected magic word"`



\- El archivo WASM está corrupto o no es el correcto



Recompilar Rust:



```bash

cargo build --target wasm32-unknown-unknown

```



\---



\## Error CORS al cargar archivos



Usar un servidor local (no abrir directamente `index.html`)



```bash

\# Python

python -m http.server 8000



\# Node.js

npx http-server



\# Live Server en VS Code

```



\---



\# 📊 Optimizaciones recomendadas



\## Para producción con Rust



```bash

\# Compilación optimizada

cargo build --release --target wasm32-unknown-unknown



\# Optimizar aún más con wasm-opt

wasm-opt -Oz \\

target/wasm32-unknown-unknown/release/hello\_wasm.wasm \\

\-o hello\_wasm\_opt.wasm

```



\---



\## Para Python



```javascript

// Cargar solo lo necesario

await pyodide.loadPackage(\['numpy', 'pandas']);

```



O usar una versión más liviana de Pyodide.



\---



\# 🎯 Casos de uso para tu proyecto



\- Calculadora científica → Python + NumPy

\- Procesamiento de imágenes → Rust

\- Visualización de datos → Python + matplotlib

\- Juegos → Rust

\- Validación de formularios → Rust

\- Algoritmos complejos → Python para prototipado, Rust para producción



\---



\# 📚 Recursos adicionales



\- Documentación Pyodide

\- Rust and WebAssembly

\- MDN WebAssembly

\- WASI (WebAssembly System Interface)



\---



\# ✅ Checklist para tu proyecto



\- \[ ] Verificar que `pyodide/pyodide.mjs` existe

\- \[ ] Verificar que `pyodide/pyodide.asm.wasm` existe

\- \[ ] Crear `hello-wasm/Cargo.toml`

\- \[ ] Compilar Rust:

&#x20; ```bash

&#x20; cargo build --target wasm32-unknown-unknown

&#x20; ```

\- \[ ] Ejecutar con servidor local

\- \[ ] Probar suma Python

\- \[ ] Probar suma Rust

\- \[ ] Agregar manejo de errores

\- \[ ] Agregar indicador de carga

\- \[ ] Optimizar para producción



\---



\# 🎉 Conclusión



Tu proyecto está bien estructurado.  

Sólo te falta el archivo `Cargo.toml` para Rust.



Una vez lo agregues y compiles, tendrás un excelente ejemplo de cómo integrar Python y Rust en el navegador usando WebAssembly.



La combinación Python + Rust te da lo mejor de ambos mundos:



\- Facilidad de desarrollo y potentes bibliotecas (Python)

\- Rendimiento extremo (Rust)



\---

