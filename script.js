function calcularDeterminante() {
    // Obtener los valores del input
    let dimension = parseInt(document.getElementById('dimension').value);
    let elementos = document.getElementById('elementos').value.split(';').map(Number);

    // Verificar que la cantidad de elementos sea la correcta
    if (elementos.length !== dimension * dimension) {
        alert('La cantidad de elementos no coincide con la dimensión de la matriz.');
        return;
    }

    // Crear la matriz a partir de los elementos
    let matriz = [];
    for (let i = 0; i < dimension; i++) {
        matriz.push(elementos.slice(i * dimension, (i + 1) * dimension));
    }

    // Calcular el determinante utilizando la regla de Cramer
    let determinante = calcularDeterminanteCramer(matriz);

    // Mostrar el resultado
    mostrarResultado(determinante);
}

function calcularDeterminanteCramer(matriz) {
    let dimension = matriz.length;

    // Caso base: matriz de 1x1
    if (dimension === 1) {
        return matriz[0][0];
    }

    // Inicializar el determinante
    let determinante = 0;

    // Calcular el determinante utilizando la regla de Cramer
    for (let columna = 0; columna < dimension; columna++) {
        let dModificado = modificarMatriz(matriz, columna);
        let cofactor = matriz[0][columna] * calcularDeterminanteCramer(dModificado);
        determinante += columna % 2 === 0 ? cofactor : -cofactor;
    }

    return determinante;
}

function modificarMatriz(matriz, columna) {
    let dimension = matriz.length;
    let matrizModificada = [];

    for (let i = 1; i < dimension; i++) {
        matrizModificada.push(matriz[i].slice(0, columna).concat(matriz[i].slice(columna + 1)));
    }

    return matrizModificada;
}

function mostrarResultado(resultado) {
    document.getElementById('resultado').innerText = `El determinante de la matriz es: ${resultado}`;
}
