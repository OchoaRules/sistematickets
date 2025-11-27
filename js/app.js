// Clase para representar un Ticket
class Message {
    constructor(nombre, email, texto, prioridad) {
        this.nombre = nombre;
        this.email = email;
        this.texto = texto;
        this.prioridad = prioridad;
        this.fecha = new Date().toLocaleString();
        this.leido = false;
    }

    // Convierte el objeto a HTML
    toHTML(index) {
        return `
        <div class="ticket prioridad-${this.prioridad} shadow p-3">
            <div class="d-flex justify-content-between">
                <strong>${this.nombre}</strong>
                <span>${this.fecha}</span>
            </div>

            <p>${this.texto}</p>

            <span class="badge bg-secondary">${this.prioridad}</span>

            <div class="mt-2">
                <button class="btn btn-sm btn-success" onclick="marcarLeido(${index})">✔ Leer</button>
                <button class="btn btn-sm btn-danger" onclick="eliminar(${index})">🗑 Eliminar</button>
            </div>
        </div>
        `;
    }
}

// Lista donde guardamos los tickets
let lista = [];
let urgentes = 0;

// Evento del formulario
document.getElementById("ticketForm").addEventListener("submit", function(e){
    e.preventDefault();
    validarYCrear();
});

// Validación y creación del ticket
function validarYCrear() {
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let prioridad = document.getElementById("prioridad").value;
    let mensaje = document.getElementById("mensaje").value.trim();

    let errores = [];

    // Validaciones --------------------------
    if (nombre.length < 3) errores.push("➤ El nombre debe tener al menos 3 caracteres.");
    if (!email.includes("@")) errores.push("➤ El email no es válido.");
    if (mensaje.length < 10) errores.push("➤ El mensaje debe tener al menos 10 caracteres.");

    let divErrores = document.getElementById("msg-errors");

    if (errores.length > 0) {
        divErrores.innerHTML = errores.join("<br>");
        divErrores.classList.remove("d-none");
        return;
    }

    divErrores.classList.add("d-none");

    // Crear el ticket ------------------------
    let ticket = new Message(nombre, email, mensaje, prioridad);

    // Agregar arriba (como tickets recientes)
    lista.unshift(ticket);

    // Control de flujo con switch
    switch(prioridad){
        case "alta":
            urgentes++;
            break;
        case "normal":
            // nada especial
            break;
        case "baja":
            // nada especial
            break;
        default:
            console.log("Prioridad desconocida");
    }

    render();
}

// Pintar la lista en pantalla
function render() {
    let cont = document.getElementById("lista-tickets");
    cont.innerHTML = "";

    lista.forEach((ticket, index) => {
        cont.innerHTML += ticket.toHTML(index);
    });

    document.getElementById("contadorUrgentes").textContent = urgentes + " urgentes";
}

// Eliminar ticket
function eliminar(idx) {
    if (lista[idx].prioridad === "alta") urgentes--;
    lista.splice(idx, 1);
    render();
}

// Marcar como leído
function marcarLeido(idx) {
    lista[idx].leido = true;
    alert("Ticket marcado como leído");
}
