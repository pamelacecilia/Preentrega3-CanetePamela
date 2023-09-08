let reservas = [];  

//Guardo la reserva en localStorage junto a las reservas previas
function guardarReserva(documento, habitacion, precio, fechaIngreso, fechaEgreso){
    const diasTotales = calcularEstadia(fechaIngreso, fechaEgreso);
    let precioFinal = diasTotales * precio;
    reservas = JSON.parse(localStorage.getItem("reservas"));
    reservas.push({dni: documento, habitacion: habitacion, precio: precioFinal, dias: diasTotales, llegada: fechaIngreso, salida: fechaEgreso});
    const reservasJS = JSON.stringify(reservas);
    localStorage.setItem("reservas", reservasJS); 
}

//Calculo los dias que se va a quedar la persona
function calcularEstadia(fechaIngreso, fechaEgreso){
    let fIng = new Date(fechaIngreso).getTime();
    let fEgr = new Date(fechaEgreso).getTime();
    let diasTotales = (fEgr - fIng) / 86400000;
    return diasTotales; 
}

//Busco la reserva
function verReserva(array, dni){
    return array.find(el=>{ return el.dni == dni}) || null
}

//Busco la habitacion
function buscarHabitacion(array, habitacion){
    return array.find(el=>{ return el.nombre == habitacion}) || null
}

//Armo el HTML para mostrar las fotos de las habitaciones
function crearHtml(el) {
    imgHabitacion.innerHTML = "";
    let html = `<div class="card">
                  <img class="foto"src=" ./img/${el.img}" alt="${el.nombre}">
                  <hr>
                  <h3>${el.nombre}</h3>
                  <p>Precio: $${el.precio} </p>
                    <div class="card-action">
                    </div>
                </div>`;
    imgHabitacion.innerHTML = imgHabitacion.innerHTML + html;
}

//Defino las habitaciones
const habitaciones = [
    { id: 1, nombre: "simple", precio: 5000, img: 'hab1.jpg'},
    { id: 2, nombre: "doble", precio: 10000, img: 'hab2.jpg'},
    { id: 3, nombre: "matrimonial", precio: 12000, img: 'habm.jpg'},
  ];

//Defino los elementos con Eventos
const btnReservar = document.querySelector("#btnReservar"), inputs = document.querySelectorAll('input'), btnBuscar = document.querySelector("#btnSearch");
const resultado = document.querySelector("#resultado");
const select = document.querySelector("#habitaciones");
const imgHabitacion = document.querySelector("#imgHab");

//Reservar Habitacion
btnReservar.addEventListener("click", () => {
    const dni = (inputs[1].value), fechai = (inputs[2].value), fechae = (inputs[3].value), tipoh = select.options[select.selectedIndex].value;
    const precio = buscarHabitacion(habitaciones, tipoh)
    guardarReserva(dni, tipoh, precio.precio, fechai, fechae);
    alert("Su reserva se ha realizado con exito");
})

//Ver Reserva de Habitacion
btnBuscar.addEventListener("click", () => {
    reservas = JSON.parse(localStorage.getItem("reservas"));
    const reserva = verReserva(reservas, inputs[0].value);
    if (reserva == null){
        resultado.innerHTML = `<label> Ud no tiene reservas realizadas  </label>`;
    }else{
        resultado.innerHTML = `<label> Su reserva es por una habitacion ${reserva.habitacion}\n por un total de  $${reserva.precio}  </label>`;
    }
})

//Armar lista de Habitaciones
habitaciones.forEach(habitacion => {
    let option = document.createElement('option');
    option.innerText = habitacion.nombre;
    option.value = habitacion.nombre;
    select.appendChild(option);
})

//Mostrar imagenes y precios de cada Habitacion
select.addEventListener("change", () => {
    let option = select.options[select.selectedIndex].value;
    const encontrado = buscarHabitacion(habitaciones, option);
    crearHtml(encontrado);
})

