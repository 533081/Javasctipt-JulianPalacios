/*Un calendario para agendar turnos en una estetica*/
// Arreglo de objetos con los meses y la cantidad de días
const meses = [
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


const diasFestivos = ["2024-01-01", "2024-12-25"]; 


let reservas = [];


const validarDia = (dia, maxDias) => dia >= 1 && dia <= maxDias;
const validarHora = (hora) => hora >= 0 && hora <= 23;


const esBisiesto = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);


const esFestivo = (fecha) => diasFestivos.includes(fecha.toISOString().split('T')[0]);


const turnoOcupado = (fecha, hora) => reservas.some(reserva => reserva.fecha.getTime() === fecha.getTime() && reserva.hora === hora);

// Función para reservar turno
function reservarTurno() {
    let year = parseInt(prompt("¿En qué año quieres reservar?"));
    let mes = parseInt(prompt("¿Qué mes quieres reservar? (1-12)")) - 1;
    let dia = parseInt(prompt("¿Qué día quieres reservar?"));
    let hora = parseInt(prompt("¿A qué hora quieres reservar? (0-23)"));

    if (mes < 0 || mes > 11) {
        alert("Elija un mes válido (1-12)");
        return;
    }

    // Ajustar días de febrero si el año es bisiesto
    let maxDias = meses[mes].dias;
    if (mes === 1 && esBisiesto(year)) maxDias = 29;

    if (!validarDia(dia, maxDias)) {
        alert("Elija un día válido para el mes de " + meses[mes].nombre);
        return;
    }

    if (!validarHora(hora)) {
        alert("Elija una hora válida (0-23)");
        return;
    }

   
    let fecha = new Date(year, mes, dia);

    
    if (esFestivo(fecha)) {
        alert("No se puede reservar en días festivos.");
        return;
    }

    
    if (turnoOcupado(fecha, hora)) {
        alert("Ese turno ya está reservado. Elige otro horario.");
        return;
    }

    
    reservas.push({ fecha: fecha, hora: hora });
    alert(`Reserva confirmada para el ${dia} de ${meses[mes].nombre} de ${year} a las ${hora}:00 horas`);
}


function mostrarReservas() {
    const lista = document.getElementById("reservasList");
    lista.innerHTML = ""; // Limpiar contenido previo

    if (reservas.length === 0) {
        lista.innerHTML = "<li>No hay reservas registradas.</li>";
    } else {
        reservas.forEach(reserva => {
            const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaTexto = reserva.fecha.toLocaleDateString('es-ES', opcionesFecha);

            // Crear un elemento de lista para cada reserva
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


reservarTurno(); 
mostrarReservas(); 
