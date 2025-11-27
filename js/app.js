document.getElementById("ticketForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let titulo = document.getElementById("titulo").value;
    let descripcion = document.getElementById("descripcion").value;
    let categoria = document.getElementById("categoria").value;

    let lista = document.getElementById("listaTickets");

    let li = document.createElement("li");
    li.classList.add("ticket");

    li.innerHTML = `<strong>${titulo}</strong><br>
                    ${descripcion}<br>
                    <em>Categoría: ${categoria}</em>`;

    lista.appendChild(li);

    this.reset();
});
