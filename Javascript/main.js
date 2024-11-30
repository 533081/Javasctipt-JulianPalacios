// Simulando las reservas con el uso de localStorage
let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

let meses = [
    { nombre: "Enero", dias: 31 },
    { nombre: "Febrero", dias: 28 },
    { nombre: "Marzo", dias: 31 },
    { nombre: "Abril", dias: 30 },
    { nombre: "Mayo", dias: 31 },
    { nombre: "Junio", dias: 30 },
    { nombre: "Julio", dias: 31 },
    { nombre: "Agosto", dias: 31 },
    { nombre: "Septiembre", dias: 30 },
    { nombre: "Octubre", dias: 31 },
    { nombre: "Noviembre", dias: 30 },
    { nombre: "Diciembre", dias: 31 }
];

// Función para verificar si el año es bisiesto
function esBisiesto(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

// Función para mostrar una notificación con Toastify
function mostrarNotificacion(mensaje, tipo) {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top", // 'top' o 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: tipo === "error" ? "red" : "green",
        stopOnFocus: true
    }).showToast();
}

// Animación con anime.js
function animarElemento(elemento) {
    anime({
        targets: elemento,
        translateX: 250,
        easing: 'easeInOutQuad',
        duration: 1000
    });
}

// Función para validar el día
function validarDia(dia, maxDias) {
    return dia >= 1 && dia <= maxDias;
}

// Función para validar la hora
function validarHora(hora) {
    return hora >= 0 && hora <= 23;
}

// Función para verificar si el turno ya está ocupado
function turnoOcupado(fecha, hora) {
    return reservas.some(reserva => {
        const reservaFecha = new Date(reserva.fecha);
        return reservaFecha.getFullYear() === fecha.getFullYear() &&
            reservaFecha.getMonth() === fecha.getMonth() &&
            reservaFecha.getDate() === fecha.getDate() &&
            reserva.hora === hora;
    });
}

// Función para mostrar un mensaje de "Cargando..." en la interfaz
function mostrarCargando() {
    const mensajeCargando = document.getElementById("mensajeCargando");
    mensajeCargando.style.display = "block"; // Mostrar el mensaje de carga
}

// Función para ocultar el mensaje de "Cargando..."
function ocultarCargando() {
    const mensajeCargando = document.getElementById("mensajeCargando");
    mensajeCargando.style.display = "none"; // Ocultar el mensaje de carga
}

// Función para verificar si el día es festivo
async function esFestivo(fecha) {
    mostrarCargando(); // Mostrar el mensaje de carga mientras obtenemos los festivos

    try {
        const response = await fetch(`https://date.nager.at/Api/v2/PublicHolidays/${fecha.getFullYear()}/AR`);
        const festivos = await response.json();

        // Revisar si la fecha es festiva
        return festivos.some(festivo => {
            const fechaFestivo = new Date(festivo.date);
            return fechaFestivo.getDate() === fecha.getDate() &&
                   fechaFestivo.getMonth() === fecha.getMonth();
        });
    } catch (error) {
        console.error("Error al obtener los festivos:", error);
        return false; // Si ocurre un error, asumimos que no es festivo
    } finally {
        ocultarCargando(); // Ocultar el mensaje de carga, sin importar si hubo error o no
    }
}

// Función para realizar la reserva
async function reservarTurno(event) {
    event.preventDefault(); 
    
    const year = parseInt(document.getElementById("year").value);
    const mes = parseInt(document.getElementById("mes").value);
    const dia = parseInt(document.getElementById("dia").value);
    const hora = parseInt(document.getElementById("hora").value);

    // Validación de entrada
    if (mes < 0 || mes > 11) {
        mostrarNotificacion("Elija un mes válido (1-12)", "error");
        return;
    }

    // Ajustar días de febrero si el año es bisiesto
    let maxDias = meses[mes].dias;
    if (mes === 1 && esBisiesto(year)) {
        maxDias = 29;
    }

    // Validar el día
    if (!validarDia(dia, maxDias)) {
        mostrarNotificacion(`Elija un día válido para el mes de ${meses[mes].nombre}`, "error");
        return;
    }

    // Validar la hora
    if (!validarHora(hora)) {
        mostrarNotificacion("Elija una hora válida (0-23)", "error");
        return;
    }

    // Crear la fecha
    let fecha = new Date(year, mes, dia);

    // Verificar si es festivo
    if (await esFestivo(fecha)) {
        mostrarNotificacion("No se puede reservar en días festivos.", "error");
        return;
    }

    // Verificar si el turno está ocupado
    if (turnoOcupado(fecha, hora)) {
        mostrarNotificacion("Ese turno ya está reservado. Elige otro horario.", "error");
        return;
    }

    // Agregar la reserva
    reservas.push({ fecha: fecha.toISOString(), hora: hora });

    localStorage.setItem("reservas", JSON.stringify(reservas));

    mostrarNotificacion(`Reserva confirmada para el ${dia} de ${meses[mes].nombre} a las ${hora}:00`, "success");

    // Actualizar la lista de reservas
    actualizarListaReservas();
}

// Función para actualizar la lista de reservas
function actualizarListaReservas() {
    const listaReservas = document.getElementById("reservasList");
    listaReservas.innerHTML = ""; // Limpiar la lista existente

    reservas.forEach((reserva, index) => {
        const reservaFecha = new Date(reserva.fecha);
        const li = document.createElement("li");
        li.textContent = `${reservaFecha.getDate()}/${reservaFecha.getMonth() + 1}/${reservaFecha.getFullYear()} - ${reserva.hora}:00`;

        // Crear botón para cancelar la reserva
        const cancelarBtn = document.createElement("button");
        cancelarBtn.textContent = "Cancelar";
        cancelarBtn.classList.add("cancelarReserva");
        cancelarBtn.setAttribute("data-id", index);  // Guardamos el índice de la reserva en el botón

        // Agregar el botón a la lista de reservas
        li.appendChild(cancelarBtn);
        listaReservas.appendChild(li);
    });
}

// Función para cancelar una reserva
function cancelarReserva(reservaId) {
    const reservaCancelada = reservas[reservaId];
    if (confirm(`¿Estás seguro que deseas cancelar la reserva para ${new Date(reservaCancelada.fecha).toLocaleDateString()} a las ${reservaCancelada.hora}:00?`)) {
        // Eliminar la reserva del array
        reservas.splice(reservaId, 1);

        // Actualizar el localStorage con las reservas restantes
        localStorage.setItem("reservas", JSON.stringify(reservas));

        // Recargar las reservas en la página
        actualizarListaReservas();

        // Mostrar notificación de cancelación
        mostrarNotificacion("Reserva cancelada con éxito", "success");
    }
}

// Evento del formulario de reserva
document.getElementById("formReserva").addEventListener("submit", reservarTurno);

// Evento para cancelar una reserva
document.getElementById("reservasList").addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("cancelarReserva")) {
        const reservaId = event.target.getAttribute("data-id");
        cancelarReserva(reservaId);
    }
});

// Inicializar la lista de reservas al cargar la página
actualizarListaReservas()