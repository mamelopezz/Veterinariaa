
const data = [
    { codigo: "3", nombre: "Biología Celular y Molecular", semestre: 1, requisitos: [] },
    { codigo: "10", nombre: "Histoembriología Veterinaria", semestre: 2, requisitos: ["3"] },
    { codigo: "15", nombre: "Fisiología Veterinaria", semestre: 3, requisitos: ["10"] },
    { codigo: "20", nombre: "Etología y Bienestar Animal", semestre: 4, requisitos: ["15"] },
    { codigo: "32", nombre: "Semiología Veterinaria", semestre: 6, requisitos: ["20"] }
];

const container = document.getElementById("malla-container");

function crearTabla() {
    const agrupado = {};

    data.forEach(ramo => {
        if (!agrupado[ramo.semestre]) agrupado[ramo.semestre] = [];
        agrupado[ramo.semestre].push(ramo);
    });

    for (const [semestre, ramos] of Object.entries(agrupado)) {
        const tabla = document.createElement("table");
        const cabecera = document.createElement("tr");
        cabecera.innerHTML = `<th colspan="3">Semestre ${semestre}</th>`;
        tabla.appendChild(cabecera);

        ramos.forEach(ramo => {
            const fila = document.createElement("tr");
            fila.classList.add(`semestre-${romano(semestre)}`, "ramo");
            fila.dataset.codigo = ramo.codigo;
            fila.dataset.requisitos = JSON.stringify(ramo.requisitos);
            fila.innerHTML = `<td>${ramo.codigo}</td><td>${ramo.nombre}</td><td>${ramo.requisitos.join(", ") || "Ingreso"}</td>`;
            tabla.appendChild(fila);
        });

        container.appendChild(tabla);
    }
}

function romano(num) {
    const map = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return map[num] || num;
}

function actualizarEstado() {
    const completados = JSON.parse(localStorage.getItem("ramos_aprobados") || "[]");

    document.querySelectorAll(".ramo").forEach(ramo => {
        const reqs = JSON.parse(ramo.dataset.requisitos);
        const habilitado = reqs.every(r => completados.includes(r) || r === "Ingreso");

        ramo.classList.toggle("locked", !habilitado && !completados.includes(ramo.dataset.codigo));
        ramo.classList.toggle("unlocked", habilitado && !completados.includes(ramo.dataset.codigo));
        ramo.classList.toggle("completed", completados.includes(ramo.dataset.codigo));
    });
}

function manejarClick() {
    document.querySelectorAll(".ramo.unlocked").forEach(ramo => {
        ramo.addEventListener("click", () => {
            const completados = JSON.parse(localStorage.getItem("ramos_aprobados") || "[]");
            if (!completados.includes(ramo.dataset.codigo)) {
                completados.push(ramo.dataset.codigo);
                localStorage.setItem("ramos_aprobados", JSON.stringify(completados));
                actualizarEstado();
            }
        });
    });
}

crearTabla();
actualizarEstado();
manejarClick();
