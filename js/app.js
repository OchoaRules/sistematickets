document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;

    // Crear objeto del ticket
    const ticket = {
        titulo,
        descripcion,
        fecha: new Date().toLocaleString()
    };

    // Guardar en localStorage
    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    agregarTicketALista(ticket);

    // Limpia formulario
    document.getElementById("ticketForm").reset();
});

// Mostrar tickets existentes al cargar
window.onload = () => {
    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.forEach(t => agregarTicketALista(t));
};

function agregarTicketALista(ticket) {
    const lista = document.getElementById("listaTickets");

    const item = document.createElement("li");
    item.innerHTML = `<strong>${ticket.titulo}</strong><br>${ticket.descripcion}<br><small>${ticket.fecha}</small>`;

    lista.appendChild(item);
}
