{
	let gui = (function(){
		let check = document.getElementById("check");
		
		let contador = 0;
		let arrayBolas = [undefined,undefined,undefined,undefined];
		let bolas;
		let resultados;
		let tablero = document.getElementById("tablero");
		let bandera = false;
		
		/* Añade una bola al div */
		let annadirBola = function(event){
			
			//Si hay undefined en el array de bolas, se coloca en el primero que encuentre
			if(arrayBolas.indexOf(undefined) != -1){
				for(let i = 0; i<arrayBolas.length; i++){
					if(arrayBolas[i] == undefined){
						arrayBolas[i] = event.target.id;
						bolas[i].className +=" "+event.target.id;
						break;
					}
				}
			}
			
			// Deshabilitamos el boton check si hay undefined en el array
			if(arrayBolas.indexOf(undefined) == -1 && bandera){
				check.style = "display: block";
			}
		}
		
		/* Quita una bola de la linea actual */ 
		let eliminarBola = function(i){
			bolas[i].className = "bolasGrandes";
			arrayBolas[i] = undefined;
			check.style = "display: none";
			
		};
		
		/* Añade una nueva línea */
		let nuevoIntento = function(){
			check.style = "display: none";
			arrayBolas = [undefined,undefined,undefined,undefined];
			
			if(bolas != undefined){
				bolas =  document.getElementById("tablero"+contador).childNodes;
				
				for(let i = 0; i<bolas.length; i++){
					bolas[i].style.pointerEvents = 'none';
				}
			}
			
			
			let contadorId = 0;
			
			// Creamos un nuevo div para la nueva linea
			let div = document.createElement("div");
			div.id = "tablero"+(++contador);
			
			// Bolas grandes
			for(let i = 0; i<4; i++){
				let bolaGrande = document.createElement("div");
				bolaGrande.className = "bolasGrandes";
				bolaGrande.id = contador+""+contadorId++;
				div.appendChild(bolaGrande);
			}
			
			// Bolas de resultado
			for(let i = 0; i<4; i++){
				let comprobar = document.createElement("div");
				comprobar.className = "resultado";
				comprobar.id = contador+""+contadorId++;
				div.appendChild(comprobar);
			}
			
			tablero.appendChild(div);
			
			bolas = document.getElementById("tablero"+contador).childNodes;
			
			// Añadimos el evento de quitar bola al div
			for(let i = 0; i<4;i++){
				bolas[i].addEventListener("click",eliminarBola.bind(bolas[i], i));
			}		
		}	
		
		/* Si el jugador ha acertado todo, creamos un menú que hará diferentes cosas en función del botón 
		seleccionado
		*/ 
		let menuGanador = function(){
			check.style = "display: none";
			tablero.innerHTML += "<div class='ganador'>"+
			"<button id='jugar'>Jugar de nuevo</button>"+
			"<button id='salir'>Salir</button>"+
			"</div>"+
			"<h1>¡Has ganado!</h1>";
			
			let jugar = document.getElementById("jugar");
			let salir = document.getElementById("salir");
			
			
			jugar.addEventListener("click", function(){
				iniciar();
			});
			
			salir.addEventListener("click", function(){
				tablero.innerHTML = "<h1>¡Adios!</h1>";
			});
			
			if(bolas != undefined){
				bolas =  document.getElementById("tablero"+contador).childNodes;
				
				for(let i = 0; i<bolas.length; i++){
					bolas[i].style.pointerEvents = 'none';
				}
			}
			
			bandera = false;
			
		}
		
		/* Comprueba y pinta */
		let comprobar = function(){
			
			resultados =  document.getElementById("tablero"+contador).childNodes;
			
			arrayResultados = new Array();
			
			// Escogemos solamente los divs del resultado
			resultados.forEach(function(element){
				if(element.className == "resultado")
				arrayResultados.push(element);
			});
			
			let array = masterMind.comprobar(arrayBolas);
			
			// Pintamos los divs
			for(let i = 0; i< array.length; i++){
				arrayResultados[i].className +=" "+array[i];
			}
			
			if(array.length == 4 && array[3] == "negra"){
				menuGanador();
			}
			else
			nuevoIntento();
		}
		
		/* Inicia el tablero */
		let iniciar = function(){
			bandera = true;
			masterMind.init();
			bolas = undefined;
			tablero.innerHTML = "";
			nuevoIntento();
			
			// Recogemos los botones de los colores
			let botones = document.getElementsByName("boton");
			
			for(let i = 0; i<botones.length; i++){
				botones[i].addEventListener("click", annadirBola);
			}
			check.addEventListener("click", comprobar);
			
		}
		
		/* Retornamos el método iniciar */
		return {
			iniciar: iniciar
		}
		
	}());
	
	window.onload = gui.iniciar;	
}