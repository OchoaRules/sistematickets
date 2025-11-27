const form = document.getElementById("ticketForm");
const ticketsContainer = document.getElementById("ticketsContainer");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let titulo = document.getElementById("titulo");
    let descripcion = document.getElementById("descripcion");
    let prioridad = document.getElementById("prioridad");

    // Validaciones
    let valido = true;

    if (titulo.value.trim().length < 3) {
        titulo.classList.add("is-invalid");
        valido = false;
    } else {
        titulo.classList.remove("is-invalid");
    }

    if (descripcion.value.trim().length < 10) {
        descripcion.classList.add("is-invalid");
        valido = false;
    } else {
        descripcion.classList.remove("is-invalid");
    }

    if (!valido) return;

    // Crear ticket
    let ticket = document.createElement("div");
    ticket.classList.add("card", "p-3", "mb-3", "ticket");

    switch(prioridad.value) {
        case "alta": ticket.classList.add("ticket-alta"); break;
        case "media": ticket.classList.add("ticket-media"); break;
        case "baja": ticket.classList.add("ticket-baja"); break;
    }

    ticket.innerHTML = `
        <h5>${titulo.value}</h5>
        <p>${descripcion.value}</p>
        <span class="badge bg-danger">Prioridad: ${prioridad.value}</span>
        <button class="btn btn-sm btn-outline-danger mt-2 btn-delete">Eliminar</button>
    `;

    // Botón eliminar
    ticket.querySelector(".btn-delete").addEventListener("click", () => {
        ticket.remove();
    });

    // Agregar al contenedor (arriba de los demás)
    ticketsContainer.prepend(ticket);

    // Limpiar formulario
    form.reset();
});
