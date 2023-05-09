// Declaramos las variables del formulario para poder activar y desactivar campos
var inputId = document.getElementById("idUser");
console.log("🚀 ~ file: index.js:2 ~ inputId:", inputId);
var submit = document.getElementById("submitBut");
console.log("🚀 ~ file: index.js:3 ~ submit:", submit);
var formLoan = document.getElementById("formLoan");
console.log("🚀 ~ file: index.js:6 ~ formLoan:", formLoan);

//Variables error
var errorInput = document.getElementById("errorInput");
var errorDiv = document.getElementById("errorDiv");
var returnBackError = document.getElementById("returnBackError");

//Formulario 2
var userName = document.getElementById("userName");
var userSurname = document.getElementById("userSurname");
var userEmail = document.getElementById("userEmail");
var userPhone = document.getElementById("userPhone");
var userLoan = document.getElementById("userLoan");
var getLoan = document.getElementById("getLoan");
var returnLoan = document.getElementById("returnLoan");
var submitLoan = document.getElementById("submitLoan");
var returnBack = document.getElementById("returnBack");

//Escondemos el segundo formulario
formLoan.classList.add("hidden");

//Variable para comprobar que el primer formulario reciba bien los datos
var correcto = false;

//Expresión regular para comprobar que el id que se manda a la API para recibir al user es un número
var expNum = "^[0-9]+$";

//Desactivamos el botón del primer formulario para que no se pueda pulsar hasta que no haya un valor correcto
submit.disabled = true;
console.log("🚀 ~ file: index.js:9 ~ submit.disabled:", submit.disabled)
submit.classList.add("bg-zinc-400");
submit.classList.remove("hover:bg-cyan-600");
submit.classList.remove("cursor-pointer");

var main = document.getElementById("main");
console.log("🚀 ~ file: index.js:17 ~ main:", main);

//Comprobamos que el inpur del primer formulario recibe un número mediante un evento que sucede al levantar una tecla
idUser.addEventListener("keyup", () => {
    var idUser = inputId.value;
    console.log("🚀 ~ file: index.js:10 ~ idUser.addEventListener ~ idUser:", idUser)

    //Comprobamos que lo insertado coincide con lo que queremos y activamos el botón
    if(idUser.match(expNum)){
        submit.disabled = false;
        inputId.classList.remove("border-rose-700")
        console.log("🚀 ~ file: index.js:18 ~ idUser.addEventListener ~ inputId:", inputId)
        console.log("🚀 ~ file: index.js:17 ~ idUser.addEventListener ~ submit.disabled:", submit.disabled)
        console.log("if");
        submit.classList.remove("bg-zinc-400");
        submit.classList.add("hover:bg-cyan-600");
        submit.classList.add("cursor-pointer");

        correcto = true;

    //Si es algo que no queremos, ponemos el input de borde rojo y el botón deshabilitado
    }else{
        submit.disabled = true;
        console.log("🚀 ~ file: index.js:21 ~ idUser.addEventListener ~ submit.disabled:", submit.disabled)
        inputId.className += " border-rose-700";
        console.log("🚀 ~ file: index.js:23 ~ idUser.addEventListener ~ inputId:", inputId)
        console.log("else");
        submit.classList.add("bg-zinc-400");
        submit.classList.remove("hover:bg-cyan-600");
        submit.classList.remove("cursor-pointer");

        correcto = false;
    }
});

//Evitamos que el usuario se pueda confundir al recargar la página, por eso inicializamos las condiciones en la carga de la página
window.onload = () => {
    var idUser = inputId.value;

    console.log("hola");

    if(idUser.match(expNum)){
        submit.disabled = false;
        console.log("if");
        submit.classList.remove("bg-zinc-400");
        submit.classList.add("hover:bg-cyan-600");
        submit.classList.add("cursor-pointer");

        correcto = true;
    }else{
        submit.disabled = true;
        console.log("else");
        submit.classList.add("bg-zinc-400");
        submit.classList.remove("hover:bg-cyan-600");
        submit.classList.remove("cursor-pointer");
    }
}

//Evitamos que el formulario vaya a otra página, ya que trabajamos sobre la misma
function previene(ev){
    var idUser = inputId.value;
    ev.preventDefault();

    //Si sale todo correcto, llamamos a la APi para que nos envíe los datos del ID que le hemos pasado
    if(correcto){
        var form0 = document.getElementById("form0");

        const api = "https://api7.cloudframework.io/recruitment/fullstack/users?id="+idUser;

        fetch(api, {
            method: "GET",
            headers: {
                "X-WEB-KEY" : "Development"
            }
        }).then(resp =>
            resp.json()
        ).then(response => {
            console.log(response);

            form0.classList.add("hidden");
            formLoan.classList.add("hidden");

            //Si la response de la API es 400, mostramos un error por medio de un div que hay en el HTML
            if(response.status >= 400){
                console.log("todo mal");
                console.log(response.message);

                errorDiv.classList.remove("hidden");

                errorInput.innerHTML = "Error " + response.status + ": " + response.message;

            //Si sale todo bien, mostramos el segundo formulario y ponemos los valores que recibimos del usuario con el ID que hemos recibido del formulario 1
            }else{
                form0.classList.add("hidden");
                formLoan.classList.remove("hidden");

                userName.value = response.data.name;
                userSurname.value = response.data.surname;
                userPhone.value = response.data.phone;
                userAge.value = response.data.age;
                userEmail.value = response.data.email; 
            }
        }).catch(err =>{ 
            console.log(err);
        });

    }
}

//Evitamos que el segundo formulario se envíe también, y preparamos el JSON para mandarlo a la API
function previeneForm(ev){
    ev.preventDefault();

    let userId = idUser.value;

    console.log(idUser.value);

    const mandaApi = "https://api7.cloudframework.io/recruitment/fullstack/users/"+userId

    //Todos los valores que necesitamos para enviar datos a la API
     let envio = {
        phone: userPhone.value,
        age: userAge.value,
        loan_amount: userLoan.value,
        loan_date: getLoan.value,
        loan_weeks: returnLoan.value,
        check: 1
     }


console.log(JSON.stringify(envio));

//console.log(datosApi)
    fetch(mandaApi, {
        method: "POST",
        body: JSON.stringify(envio),
        headers: {
            "X-WEB-KEY" : "Development"
        }
    }).then(resp =>
        resp.json()
    ).then(response => {
        console.log(response);

        form0.classList.add("hidden");
        formLoan.classList.add("hidden");

        //Si la response de la API es 400, mostramos un error por medio de un div que hay en el HTML
        if(response.status >= 400){
            console.log("todo mal");
            console.log(response.message);

            errorDiv.classList.remove("hidden");

            errorInput.innerHTML = "Error " + response.status + ": " + response.message;
        }else{

            console.log("todo bien");
            console.log(response.message);

            errorDiv.classList.remove("hidden");

            errorInput.innerHTML = "Muchas gracias. Nos pondremos en contacto con usted tan pronto como nos sea posibles. Esperemos que siga confiando en nuestros servicios :D"

        }
    });
}

// Segundo formulario

//Los siguiente dos listener son para que el botón volver devuelva al usuario al formulario
returnBack.addEventListener("click", () =>{
    formLoan.classList.add("hidden");
    form0.classList.remove("hidden");
}); 

returnBackError.addEventListener("click", () => {
    form0.classList.remove("hidden");
    errorDiv.classList.add("hidden");
});

//Comprobamos que el préstamo que solicita el cliente, se encuentre dentro de los límites establecidos en el ejercicio, y, en caso de error, mostramos una ventana roja alrededor del input
userLoan.addEventListener("keyup", () => {
    var userLoanValue = userLoan.value;

    console.log(userLoan);

    if(userLoanValue < 10 || userLoanValue > 1000){
        userLoan.classList.add("border-rose-700");
        userLoan.classList.add("border");
    }else{
        userLoan.classList.remove("border-rose-700");

    }
});

//Comprobamos que la fecha sea futura como pide el ejercicio
getLoan.addEventListener("change", () => {
    var getLoanValue = getLoan.value;
    console.log("🚀 ~ file: index.js:170 ~ getLoan.addEventListener ~ getLoanValue:", getLoanValue);

    var hoy = new Date();
    var yearHoy = hoy.getFullYear();
    var monthHoy = hoy.getMonth() + 1;
    var dayHoy = hoy.getDate();
    console.log(hoy);

    var fechaFormYear = getLoanValue.substring(0, 4);
    var fechaFormMes = getLoanValue.substring(5, 8);
    var fechaFormDia = getLoanValue.substring(8,10);

    fechaFormDia = fechaFormDia.replace("-", "");
    fechaFormMes = fechaFormMes.replace("-", "");
    fechaFormYear = fechaFormYear.replace("-", "");

    console.log("Form Día: " + fechaFormDia + " hoy día: " + dayHoy);
    console.log("Form Mes: " + fechaFormMes + " hoy Mes: " + monthHoy);
    console.log("Form Año: " + fechaFormYear + " hoy Año: " + yearHoy);

    console.log(getLoan);

    if(fechaFormYear < yearHoy){
        getLoan.classList.add("border-rose-700");
        getLoan.classList.add("border");

        console.log(1);
    }else{

        if(fechaFormYear == yearHoy && fechaFormMes < monthHoy){
            getLoan.classList.add("border-rose-700");
            getLoan.classList.add("border");

            console.log(2);

        }else{

            if(fechaFormYear == yearHoy && fechaFormMes == monthHoy && fechaFormDia < dayHoy){
                getLoan.classList.add("border-rose-700");
                getLoan.classList.add("border");

                console.log(3);

            }else{

                getLoan.classList.remove("border-rose-700");

            }

        }
    }
});

//Comprobamos que los años en que el usuario devuelve el dinero está entre 1 y 20, como especifica el ejercicio
returnLoan.addEventListener("keyup", () => {
    var returnLoanValue = returnLoan.value;

    console.log(returnLoan);

    if(returnLoanValue < 1 || returnLoanValue > 20){
        returnLoan.classList.add("border-rose-700");
        returnLoan.classList.add("border");
    }else{
        returnLoan.classList.remove("border-rose-700");

    }
});

