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


function esBisiesto(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}


function validarDia(dia, maxDias) {
    return dia >= 1 && dia <= maxDias;
}


function validarHora(hora) {
    return hora >= 0 && hora <= 23;
}


function turnoOcupado(fecha, hora) {
    return reservas.some(reserva => {
        const fechaReserva = new Date(reserva.fecha);
        return fechaReserva.toLocaleDateString() === fecha.toLocaleDateString() && reserva.hora === hora;
    });
}


function esFestivo(fecha) {
    const festivos = [
        new Date('2024-12-25'), // Navidad
        new Date('2024-01-01')  // Año Nuevo
    ];
    return festivos.some(festivo => festivo.toLocaleDateString() === fecha.toLocaleDateString());
}

// Función para reservar un turno
function reservarTurno(event) {
    event.preventDefault(); 
    
    const year = parseInt(document.getElementById("year").value);
    const mes = parseInt(document.getElementById("mes").value);
    const dia = parseInt(document.getElementById("dia").value);
    const hora = parseInt(document.getElementById("hora").value);

    // Validación de entrada
    if (mes < 0 || mes > 11) {
        alert("Elija un mes válido (1-12)");
        return;
    }

    // Ajustar días de febrero si el año es bisiesto
    let maxDias = meses[mes].dias;
    if (mes === 1 && esBisiesto(year)) {
        maxDias = 29;
    }

    // Validar el día
    if (!validarDia(dia, maxDias)) {
        alert(`Elija un día válido para el mes de ${meses[mes].nombre}`);
        return;
    }

    // Validar la hora
    if (!validarHora(hora)) {
        alert("Elija una hora válida (0-23)");
        return;
    }

    // Crear la fecha
    let fecha = new Date(year, mes, dia);

    // Verificar si es festivo
    if (esFestivo(fecha)) {
        alert("No se puede reservar en días festivos.");
        return;
    }

    // Verificar si el turno está ocupado
    if (turnoOcupado(fecha, hora)) {
        alert("Ese turno ya está reservado. Elige otro horario.");
        return;
    }

    // Agregar la reserva
    reservas.push({ fecha: fecha.toISOString(), hora: hora });

   
    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert(`Reserva confirmada para el ${dia} de ${meses[mes].nombre} de ${year} a las ${hora}:00 horas`);

    mostrarReservas();
}

// Mostrar las reservas
function mostrarReservas() {
    const lista = document.getElementById("reservasList");
    lista.innerHTML = ""; // Limpiar la lista antes de mostrar

    if (reservas.length === 0) {
        lista.innerHTML = "<li>No hay reservas registradas.</li>";
    } else {
        reservas.forEach(reserva => {
            const fechaObj = new Date(reserva.fecha); 
            const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaTexto = fechaObj.toLocaleDateString('es-ES', opcionesFecha);

           
            const reservaItem = document.createElement("li");
            reservaItem.className = "reserva-item";
            reservaItem.innerHTML = `
                <p class="reserva-fecha">Fecha: ${fechaTexto}</p>
                <p class="reserva-hora">Hora: ${reserva.hora}:00</p>
            `;
            lista.appendChild(reservaItem);
        });
    }
}


document.getElementById("formReserva").addEventListener("submit", reservarTurno);


mostrarReservas();
