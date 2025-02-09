let tablero = [];

function init() {
    // Inicializamos la matriz de 10x10 con false
    for (let i = 0; i < 10; i++) {
        tablero[i] = [];
        for (let j = 0; j < 10; j++) {
            tablero[i][j] = false;
        }
    }
    crearTablero();
    ponerMinas();
}

// 1º ponerMinas()
// Coloca 10 minas en posiciones aleatorias dentro de la matriz
//1- Declaramos la variable minas que sea el valor inical 0
function ponerMinas() {
    let minas = 0;

    while (minas < 10) {
        // 2-Generamos randoms aleatorias ,Colocamos 10 minas aleatoriamente
        let x = Math.floor(Math.random() * 10); // Random para la fila
        let y = Math.floor(Math.random() * 10); // Random para la columna

        //3- Verificamos si ya hay una mina en esa posición
        if (!tablero[x][y]) {
            tablero[x][y] = true; // Hay Mina
            minas++;
        }
    }
}

// 2º contieneMina(x, y)
// Comprueba si la celda (x,y) tiene bomba ('X') => true, o no => false
function contieneMina(x, y) {
    return tablero[x][y] === true ? true : false;
}

// 3º numMinaRadio(x, y)
// Devuelve la cantidad de minas alrededor de la celda (x,y)
function numMinaRadio(x, y) {
    let contadorMinas = 0;
    let isValid = true;

    for (let fila = x - 1; fila <= x + 1; fila++) {
        for (let columna = y - 1; columna <= y + 1; columna++) {
            if (fila < 0 || columna < 0 || fila >= tablero.length || columna >= tablero.length) {
                isValid = false;
            }

            if (isValid && contieneMina(fila, columna)) {
                contadorMinas += 1;
            }
        }
    }
    return contadorMinas;
}

//4º cambiarNumeroCelda(x, y, numero)
function cambiarNumeroCelda(x, y, numero) {
    let celdaId = "celda_" + x + "_" + y;
    let celdaElement = document.getElementById(celdaId);

    celdaElement.innerHTML = numero;

    if (numero === 0) {
        celdaElement.classList.add('celdaVacia');
    } else {
        celdaElement.classList.add('celda' + numero);
    }
}

//5º cambiaCeldaBomba(x, y)
function cambiaCeldaBomba(x, y) {
    let celda = "celda_" + x + "_" + y;
    document.getElementById(celda).classList.add('celdaBomba');
};

//6º mostrarBombas()
function mostrarBombas() {

    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (contieneMina(i, j)) {
                let celda = "celda_" + i + "_" + j;
                document.getElementById(celda).classList.add('celdaBombaSinFondoRojo');
            }
        }
    };
    deshabilitarClicks();
}

//7º mostrarMensajeDerrota()
function mostrarMensajeDerrota() {
    let mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "💥 ¡Has perdido! Inténtalo de nuevo.";
    mensaje.style.color = "red";
    mensaje.style.fontSize = "20px";
    mensaje.style.textAlign = "center";
    mensaje.style.fontWeight = "bold";
    mensaje.style.marginTop = "20px";
}

// Función que crea el HTML del tablero
function crearTablero() {
    let tablero = document.getElementById("tablero");

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let celda = document.createElement("div");
            celda.classList.add("celda");
            celda.setAttribute("id", "celda_" + i + "_" + j)
            /*celda.addEventListener("click", function () {
                clickCelda(i, j);
            });*/
            celda.onclick = function () {
                clickCelda(i, j);
                this.onclick = null;
            };
            tablero.appendChild(celda);
        };
    }
}

//Funcion deshabilitarClicks()
function deshabilitarClicks() {
    let elementos = document.getElementsByClassName("celda");
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].onclick = null;
    }
}

//Funcion clickCelda()
function clickCelda(x, y) {
    let numBombas;
    if (!contieneMina(x, y)) {
        numBombas = numMinaRadio(x, y);
        cambiarNumeroCelda(x, y, numBombas);
    } else {
        cambiaCeldaBomba(x, y);
        mostrarMensajeDerrota();
        mostrarBombas();
    }
}



function reiniciarJuego() {
    // Limpiar el contenido del tablero en pantalla
    let contenedor = document.getElementById("tablero");
    contenedor.innerHTML = "";

    // Resetear la matriz del tablero
    tablero = [];

    // Volver a inicializar el juego
    init();
}

document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);



init();