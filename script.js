const firebaseConfig = {
    apiKey: "AIzaSyCe67dwmOQcIoZhQWixEVyveZ2-N2UrCNM",
    authDomain: "datos-de-formulario-prueba.firebaseapp.com",
    projectId: "datos-de-formulario-prueba",
    storageBucket: "datos-de-formulario-prueba.appspot.com",
    messagingSenderId: "857563128016",
    appId: "1:857563128016:web:ff71da81d5341cfeacbed5",
    measurementId: "G-7YSCNXJJ9K"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //Validar campo nombre
const nombreEntrada = document.getElementById('name');
const nombreError = document.getElementById('nameError');

if(nombreEntrada.value.trim() === ''){
    nombreError.textContent = 'Por favor, ingresa tu nombre';
    nombreError.classList.add('error-message');
}else{
    nombreError.textContent = '';
    nombreError.classList.remove('error-message');
}
    //Validar correo electrónico
const emailEntrada = document.getElementById('email');
const emailError = document.getElementById('emailError');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Patrón de validación básico
if(!emailPattern.test(emailEntrada.value)){
    emailError.textContent = 'Por favor, ingresa un correo válido';
    emailError.classList.add('error-message');
}else{
    emailError.textContent = '';
    emailError.classList.remove('error-message');    
}
    //Validar la contraseña
    const contrasenaEntrada = document.getElementById('password');
    const contrasenaError = document.getElementById('passwordError');
    const contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe contener entre 8 y 15 carácteres y al menos una mayúscula, una minúscula, un número y un carácter especial';
        contrasenaError.classList.add('error-message');     
    }else{
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');    
    }
    //Si todos los campos son válidos, enviar formulario

    if(!nombreError.textContent && !emailError.textContent && !contrasenaError.textContent){
    //BACKEND que reciba la información

    db.collection("users").add({
        nombre: nombreEntrada.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value
    })
    .then((docRef) => {
        alert('Formulario enviado con éxito', docRef.id);
        document.getElementById('formulario').reset();
    })
    .catch((error) => {
        alert(error)
    });

    }})