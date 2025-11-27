let tickets = [];

// Cargar tickets almacenados al iniciar
window.onload = function () {
    const guardados = localStorage.getItem("tickets");

    if (guardados) {
        tickets = JSON.parse(guardados);
        mostrarTickets();
    }
};

// Guardar en LocalStorage
function guardarLocal() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

// Crear ticket
document.getElementById("ticketForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let ticket = {
        id: Date.now(),
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        categoria: document.getElementById("categoria").value
    };

    tickets.push(ticket);
    guardarLocal();
    mostrarTickets();

    this.reset();
});

// Mostrar tickets con filtros
function mostrarTickets() {
    let lista = document.getElementById("listaTickets");
    lista.innerHTML = "";

    let filtroCat = document.getElementById("filtroCategoria").value;
    let busqueda = document.getElementById("busquedaTexto").value.toLowerCase();

    let filtrados = tickets.filter(t => {
        return (filtroCat === "Todos" || t.categoria === filtroCat) &&
               (t.titulo.toLowerCase().includes(busqueda) ||
                t.descripcion.toLowerCase().includes(busqueda));
    });

    filtrados.forEach(t => {
        let li = document.createElement("li");
        li.classList.add("ticket");
        li.innerHTML = `
            <strong>${t.titulo}</strong><br>
            ${t.descripcion}<br>
            <em>Categoría: ${t.categoria}</em><br>
            <button class="eliminar" onclick="eliminarTicket(${t.id})">Eliminar</button>
        `;
        lista.appendChild(li);
    });
}

// Eliminar un ticket
function eliminarTicket(id) {
    tickets = tickets.filter(t => t.id !== id);
    guardarLocal();
    mostrarTickets();
}

// Eventos de filtro y búsqueda
document.getElementById("filtroCategoria").addEventListener("change", mostrarTickets);
document.getElementById("busquedaTexto").addEventListener("input", mostrarTickets);
