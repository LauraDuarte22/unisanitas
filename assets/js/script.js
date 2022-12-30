/*Función para validar si checkbox esta diligenciado
Retorna false, cuando el checbox esta completados
Retorna true, cuando el checbox esta sin llenar
*/
function validate() {
  /*Variable para tarer el id del checkbox*/
  var terminos = document.getElementById("terminos");
  /*Condicional para validad si esta verificado*/
  if (terminos != undefined && !terminos.checked) {
    /*Con la propiedad classList añade o elimina clases de css,
    para cambiar el estilo del chechbox
    Completed: checkbox esta en gris
    validateCheck:checkbox esta en rojo
    */
    terminos.classList.remove("completed");
    terminos.classList.add("validateCheck");
    return false;
  } else {
    terminos.classList.add("completed");
    return true;
  }
}

/*Función para validar si correo tiene la estructura adecuada
Retorna false, cuando el correo está correcto
Retorna true, cuando el correo está incorrecto
*/
function validateEmail() {
  /*En esta función tenemos tres variables 
    email, que es el input donde ingresa el correo
    emailValue, el valor digitados
    regex,expresión regurar para determinar que el valor ingresado si es un correo
  */
  var email = document.getElementById("email");
  var emailValue = document.getElementById("email").value;
  var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  /*Esta condición valida si el valor ingresado es un correo valido*/
  if (!regex.test(emailValue)) {
    /*Con la propiedad classList añade o elimina clases de css,
    para cambiar el estilo del chechbox
    Completed: checkbox esta en gris
    validateCheck:checkbox esta en rojo
    */
    email.classList.remove("completed");
    email.classList.add("validateCheck");
    return false;
  } else {
    email.classList.add("completed");
    return true;
  }
}

/*Función para validar si completaron todos los campos
Retorna true, cuando todos los inputs son completados
Retorna false, cuando existen inputs vacios
*/
function mandatoryFiles() {
  var verificate = false;
  //Variable para traer todo el elemento del formulario
  var form = document.getElementById("form");
  //Este for recorre todo el elemento form
  for (var i = 0; i < form.elements.length - 3; i++) {
    //La siguiente condición verifica cual input esta vació o no
    if (form.elements[i].value === "") {
      /*Con la propiedad classList añade o elimina clases de css,
    para cambiar el estilo del chechbox
    Completed: checkbox esta en gris
    validateCheck:checkbox esta en rojo
    */
      form.elements[i].classList.remove("completed");
      form.elements[i].classList.add("validateCheck");
      verificate = true;
    } else if (
      form.elements[i].type === "select-one" &&
      form.elements[i].options[form.elements[i].selectedIndex].text ===
        "Seleccione el programa que desea"
    ) {
      form.elements[i].classList.remove("completed");
      form.elements[i].classList.add("validateCheck");
      verificate = true;
    } else {
      form.elements[i].classList.add("completed");
      verificate = false;
    }
  }
  return verificate;
}

/*Función para ingresar los datos digitados el CRM*/
async function crm() {
  //Variable para apercer el icono de carga
  let loader = document.getElementById("loader");
  loader.style.display = "inline-block";
  //canal por el que está entrando el lead
  let channel = window.location.href;
  //valores digitados en el  formularios
  let programa = document.getElementsByName("programa_academico")[0].value;
  let name = document.getElementsByName("firstname")[0].value;
  let lastName = document.getElementsByName("lastname")[0].value;
  let fullName = name + " " + lastName;
  let whatsapp = document.getElementsByName("whatsapp")[0].value;
  let email = document.getElementsByName("email")[0].value;
  let terminos_condiciones = true;
  //Consumo de la API de wolkvox https://www.crmvox.com/apis-v2/insert/
  try {
    const request = await fetch(
      "https://crm.wolkvox.com/server/API/v2/custom/insert.php",
      {
        method: "POST",
        mode: "no-cors",

        headers: {
          "Wolkvox-Token":
            "7b6363672d756e6973616e697461737d2d7b32303232303832343134353334377d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //operación a la que van a ingresar los datos
          operation: "ccg-unisanitas",
          //token de wolkvox
          "wolkvox-token":
            "7b6363672d756e6973616e697461737d2d7b32303232303832343134353334377d",
          //Modulo al que van a ingresar los datos
          module: "leads",
          //Campos que van a ser diliguenciados por la API
          fields: {
            names: fullName,
            "Programa académico": programa,
            WhatsApp: {
              type: "telephone",
              value: whatsapp,
              country: "Colombia",
              code: "57",
            },
            Email: email,
            Channel: channel,
            "Terminos y condiciones": terminos_condiciones,
          },
        }),
      }
    );
    //Promesa que retorna el valor del consumo de API
    var promise = Promise.resolve(request);
    promise.then(function (data) {
      //Redirección a la página de gracias
      window.location.href = "gracias.html";
    });
    //Error
  } catch (e) {}
}
/*
Esta es la función que llamamos en el HTML, lo que hace es llamar a las funciones
anteriormente explicadas
*/
function insert() {
  //Validación del checkbox
  var checkBox = validate();
  //Validación del correo
  var email = validateEmail();
  //Validadicón del correo
  var mandatory = mandatoryFiles();
  /*Si todos los campos estan diligenciados y el correo tiene una estructura valida, 
  al cumplir con estas condiciones se ejcutará la función CRM, la cual ingresa los datos al CRM
  */
  if (checkBox === true && email === true && mandatory == false) {
    crm();
  }
}
function addImage() {
   if (window.matchMedia('(max-width: 800px)').matches) {
    var image = document.getElementById("image-resize");
    image.classList.remove("d-none");
    image.classList.add("d-block");
}
}
addImage() ;