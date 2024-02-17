// Objeto que representa a la profesora
const profesora = {
    nombre: 'Lucia',
    asignatura: 'Matemáticas'
};

// Array para almacenar los nombres de los alumnos
let nombresAlumnos = [];

// Función para calcular el promedio
function calcularPromedio() {
    const nombre = document.getElementById('inputNombre').value;
    const nota1 = parseFloat(document.getElementById('inputNota1').value);
    const nota2 = parseFloat(document.getElementById('inputNota2').value);
    const nota3 = parseFloat(document.getElementById('inputNota3').value);

    if (nombre && !isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3)) {
        const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);

        // Verificar si el promedio está dentro del rango permitido
        if (promedio >= 1 && promedio <= 10) {
            if (promedio >= 7) {
                mostrarResultado(`${nombre} ha aprobado con un promedio de ${promedio}.`);
                realizarAnimacion('aprobado');
            } else {
                mostrarResultado(`${nombre} ha desaprobado con un promedio de ${promedio}.`);
                realizarAnimacion('desaprobado');
            }

            // Guardar datos en localStorage y mostrarlos en el DOM
            guardarDatos(nombre, promedio);
        } else {
            mostrarResultado('El promedio debe estar entre 1 y 10.', 0);
        }
    } else {
        mostrarResultado('Por favor, complete todos los campos correctamente.', 0);
    }
}

// Función para reiniciar el formulario
function reiniciar() {
    document.getElementById('inputNombre').value = '';
    document.getElementById('inputNota1').value = '';
    document.getElementById('inputNota2').value = '';
    document.getElementById('inputNota3').value = '';
}

// Función para mostrar el resultado en el DOM
function mostrarResultado(mensaje) {
    const resultado = document.getElementById('resultado');
    resultado.textContent = mensaje;
}

// Función para mostrar la lista de alumnos en el DOM
function mostrarListaAlumnos() {
    const listaAlumnos = document.getElementById('listaAlumnos');
    listaAlumnos.innerHTML = ''; // Limpiar lista

    nombresAlumnos.forEach((alumno) => {
        const item = document.createElement('li');
        item.textContent = `${alumno.nombre}: ${alumno.promedio}`;
        listaAlumnos.appendChild(item);
    });
}

// Función para realizar animaciones
function realizarAnimacion(estado) {
    const container = document.querySelector('.container');

    // Animación de anime.js
    anime({
        targets: '.container',
        duration: 1000,
        easing: 'easeInOutQuad',
        backgroundColor: estado === 'aprobado' ? '#5cb85c' : '#d9534f',
        complete: function (anim) {
            console.log(`Animación de ${estado} completada.`);
        }
    });
}

// Función para guardar datos en localStorage y mostrarlos en el DOM
function guardarDatos(nombre, promedio) {
    // Verificar si el nombre del alumno ya existe en el array
    if (nombresAlumnos.some((alumno) => alumno.nombre === nombre)) {
        console.log(`El alumno ${nombre} ya existe en la lista.`);
    } else {
        // Agregar el nuevo nombre de alumno al array
        nombresAlumnos.push({ nombre, promedio });
        mostrarListaAlumnos();

        // Guardar los datos en localStorage
        localStorage.setItem('alumnos', JSON.stringify(nombresAlumnos));
    }
}

// Utilizando fetch para obtener datos de una API de Pokémon
let url = 'https://pokeapi.co/api/v2/pokemon/1/';

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const resultadoApi = document.getElementById('resultadoApi');
        resultadoApi.textContent = `Nombre del Pokémon: ${data.name}`;
    })
    .catch((error) => console.log(error));
