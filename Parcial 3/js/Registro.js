const inputNombre = document.getElementById("idNombre");
const inputApellido = document.getElementById("idApellido");
const inputCorreo = document.getElementById("idCorreo");
const inputFecha = document.getElementById("idFecha");
const inputObservacion = document.getElementById("idObservacion");
const checkSXM = document.getElementById("idMasculino");
const checkSXF = document.getElementById("idFemenino");

const buttonAgregarPersona = document.getElementById("idBtnEnviar");


let arrayPaciente = [];

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFecha.value = "";
    inputCorreo.value = "";
    inputObservacion.value = "";
    inputNombre.focus();
}

const addPersona = function() {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let correo = inputCorreo.value;
    let sexo = checkSXM.checked == true ? "Masculino" : checkSXF.checked == true ? "Femenino" : "";
    let fecha = inputFecha.value;
    let observacion = inputObservacion.value;
    

    //Expresiones regulares
    let patronNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let patronCorreo = /^\w+@(\w+\.)+\w{2,4}$/;
    var fechasistema= new Date();
    var anio = fechasistema.getFullYear();
    var dia = fechasistema.getDate();
    var mes = fechasistema.getMonth() + 1;
    var fechahoy = anio + "-" + mes + "-" + dia;
    var fecha1 = new Date(fechahoy);
    var fecha2 = new Date(fecha);

    if(patronNombre.test(nombre) && patronNombre.test(apellido) &&  patronCorreo.test(correo) && (fecha2<fecha1) && observacion != "" && sexo != ""){

        arrayPaciente.push(
            new Array(nombre,apellido,correo,sexo,fecha,observacion)
        );
        alert("Se ha registrado una nueva reservacion");
        limpiarForm();
        imprimirRegistro();
    }else{
        alert("Error en los campos");
    }
}

function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element)=> {
        $fila += `<tr>
        <td scope="row" class="text-center fw-bold">${contador}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td>${element[3]}</td>
        <td>${element[4]}</td>
        <td>${element[5]}</td>
        <td>
        <button id="idBtnEliminar${contador}" type="button" class"btn btn-primary" alt="Editar" onclick="Eliminar(${contador})">
        <i class="bi bi-trash3-fill">Eliminar</i>
        </button>
        </td>
        </tr>`;
        contador++;
    })
    return $fila;
}

function Eliminar(num) {

    arrayPaciente.splice(num-1,1)
    imprimirRegistro();

}

const imprimirRegistro = () => {
    let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
    <tr>
    <th scope="col" class="text-center" style"width:5%">#</th>
    <th scope="col" class="text-center" style"width:15%">Nombre</th>
    <th scope="col" class="text-center" style"width:15%">Apellido</th>
    <th scope="col" class="text-center" style"width:10%">Correo</th>
    <th scope="col" class="text-center" style"width:10%">Sexo</th>
    <th scope="col" class="text-center" style"width:10%">Fecha de Nacimiento</th>
    <th scope="col" class="text-center" style"width:10%">Observaciones</th>
    <th scope="col" class="text-center" style"width:10%">Opcion</th>
    </tr>
    ${imprimirFilas()}
    </table>
    </div>`;
    document.getElementById("idDivResultado").innerHTML = $table;
};


buttonAgregarPersona.onclick = () => {
    addPersona();
}


