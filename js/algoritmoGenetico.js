/* 
 * Técnica de representación entera.
 * Inicialización de población aleatoria.
 * Evaluación es de 0-100 donde 100 es la solución.
 * Selección basada en fitness (la mejor mitad de la población).
 * Cruce en un punto.
 * Mutación en un gen aleatoriamente.
 */

numGenes = 4;
numPoblacion = 8;
poblacion = [];

/* Se crea la población. */
function inicializacion() {
	var max = Object.keys(pegs).length;
	var min = 1;

	for (var t = 0; t < numPoblacion; t++) {		
		var cromosoma = "";
		/* Se generan sus genes. */
		for (var z = 0; z < numGenes; z++) {
			var gen = Math.floor(Math.random() * max) + min;
			cromosoma += gen;
			options[gen - 1].click();
		}

		var individuo = {};
	    individuo.cromosoma = cromosoma;
	    individuo.aptitud = 0;
	    poblacion[t] = individuo;
	}
}

function aptitud(individuo) {
	var aptitud = 0;

	var bien = 25;
	var casi = 10;

	var tmpCode = [];
	var tmpCromosoma = individuo.cromosoma.split('');
	code.forEach(caracter => {
		tmpCode.push(caracter+'');
	});	

	/* Se verifica que tan buena es la solución. */

	/* Si es el color y la posición. */
    	for (var i = 0; i < code.length; i++) {
//console.log(tmpCromosoma[i] + "=" + tmpCode[i]);
      		if (tmpCromosoma[i] === tmpCode[i]) {
        		aptitud += bien;

        		tmpCode[i] = 'b';
        		tmpCromosoma[i] = 'a';
      		}
  	}
//console.log("cromosoma: " + tmpCromosoma + " code: " + tmpCode);

	/* Si es el color pero esta en diferente posición. */
  	for (var j = 0; j < code.length; j++) {
//console.log(tmpCromosoma[j] + "->" + tmpCode.indexOf(tmpCromosoma[j]));
		var indice = tmpCode.indexOf(tmpCromosoma[j]);
      		if (indice !== -1) {
	        	aptitud += casi;
	        	tmpCode[indice] = 'b';
	    	}
    	}

    	individuo.aptitud = aptitud;
    	return aptitud === 100;
}

function evaluacion() {
	console.log("evaluacion()");

	for (var i = 0; i < poblacion.length; i++) {
		if (aptitud(poblacion[i])) {
			clearInterval(para);
			return false;
		}
	}

	return true;
}

function seleccion() {
	console.log("seleccion()");
	var tmpPoblacion = poblacion.sort((indi1, indi2) => {
		return indi1.aptitud - indi2.aptitud;
	});

	poblacion = tmpPoblacion.slice(poblacion.length / 2);
}

function cruce() {
	var tamPoblacion = poblacion.length;
	var cruce = Math.floor(Math.random() * (numGenes - 2)) + 1;	
	console.log("cruce() n=" + cruce);

	for (var i = 0; i < tamPoblacion; i+=2) {
		var papa = poblacion[i].cromosoma;
		var mama = poblacion[i + 1].cromosoma;

		var hijo1 = {};
	    	hijo1.cromosoma = papa.substring(0, cruce) + mama.substring(cruce, numGenes);
	    	hijo1.aptitud = 0;

		var hijo2 = {};
	    	hijo2.cromosoma = mama.substring(0, cruce) + papa.substring(cruce, numGenes);
	    	hijo2.aptitud = 0;

		poblacion.push(hijo1);
		poblacion.push(hijo2);
	}
}

function mutacion() {
	var max = Object.keys(pegs).length;
	console.log("mutacion()");

	poblacion.forEach(individuo => {		
		var pMutacion = Math.floor(Math.random() * (numGenes + 1)) - 1;	
		var mutacion = Math.floor(Math.random() * max) + 1;
		var tmpCromosoma = individuo.cromosoma.split('');

		tmpCromosoma[pMutacion] = mutacion+'';
		individuo.cromosoma = tmpCromosoma.join("");
		console.log("pM=" + pMutacion + " m=" + mutacion + " " + individuo.cromosoma);
	});
}

function simulacion() {	
    	rowIncrement = 1,
    	hintIncrement = 1

    	// Clear the guess sockets
    	for (var i = 0; i < inputRows.length; i++) {
      		inputRows[i].innerHTML = '';
      		for (var j = 0; j < 4; j++) {
        		var socket = document.createElement('div');
        		socket.className = 'socket';
        		inputRows[i].appendChild(socket);
      		}
    	}

    	// Clear the hint sockets
	for (var i = 0; i < hintContainer.length; i++) {
      		var socketCollection = hintContainer[i].getElementsByClassName('socket');
      		for (var j = 0; j < 4; j++) {
        		socketCollection[j].className = 'js-hint-socket socket';
      		}
    	}

    	document.getElementsByTagName('body')[0].className = ''; // Reset background

	poblacion.forEach(individuo => {
		var cromosoma = individuo.cromosoma.split('');
		cromosoma.forEach(gen => {
			options[gen - 1].click();
		});
	});
}

/*function resuelve() {
	console.log(code);
	inicializacion();

	while(evaluacion()) {		
		poblacion.forEach(individuo => {
			console.log(individuo);
		});

		seleccion();
		poblacion.forEach(individuo => {
			console.log(individuo);
		});

		cruce();
		poblacion.forEach(individuo => {
			console.log(individuo);
		});

		mutacion();
		simulacion();		
	}

	console.log("solución->");
	poblacion.forEach(individuo => {
			console.log(individuo);
		});
}*/

function resuelve() {
	console.log(code);
	inicializacion();

	para = setInterval(ciclo, 3000);
}

function ciclo() {
	if (!evaluacion()) {
		console.log("solución->");
		poblacion.forEach(individuo => {
				console.log(individuo);
			});
		return;
	}

	poblacion.forEach(individuo => {
		console.log(individuo);
	});

	seleccion();
	poblacion.forEach(individuo => {
		console.log(individuo);
	});

	cruce();
	poblacion.forEach(individuo => {
		console.log(individuo);
	});

	mutacion();
	simulacion();		
}
