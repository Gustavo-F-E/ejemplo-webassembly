let wasm;

async function init() {

  //const response = await fetch("./hello-wasm/target/wasm32-unknown-unknown/debug/hello_wasm.wasm");
  const response = await fetch("./wasm/hello_wasm.wasm");

  const bytes = await response.arrayBuffer();

  const result =
    await WebAssembly.instantiate(bytes);

  wasm = result.instance.exports;
}

await init();

window.sumarRust = function () {

  const a =
    Number(document.getElementById("aRust").value);

  const b =
    Number(document.getElementById("bRust").value);

  const resultado = wasm.sumar(a, b);

  document.getElementById("resultadoRust").innerHTML =
    "Resultado: " + resultado;
};