document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ticketForm");
    const lista = document.getElementById("listaTickets");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const prioridad = document.getElementById("prioridad").value;

        const li = document.createElement("li");
        li.classList.add("ticket");

        li.innerHTML = `
            <h3>${titulo}</h3>
            <p>${descripcion}</p>
            <p class="prioridad">Prioridad: <strong>${prioridad}</strong></p>
        `;

        lista.appendChild(li);

        form.reset();
    });
});
