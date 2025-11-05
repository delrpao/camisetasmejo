// ================= GLOBAL =================
const menu = document.getElementById('menu-juegos');
const main = document.getElementById('juegos');

function abrirJuego(juego) {
    menu.style.display = 'none';
    main.innerHTML = ''; // limpiar pantalla
    switch(juego) {
        case 'adivina': adivinaHTML(); break;
        case 'ppt': pptHTML(); break;
        case 'trivia': triviaHTML(); break;
        case 'tontorrón': tontorronHTML(); break;
        case 'ruleta': ruletaHTML(); break;
        case 'caballo': caballoHTML(); break;
        case 'reflejos': reflejosHTML(); break;
        case 'memoria': memoriaHTML(); break;
        case 'saltos': saltosHTML(); break;
        case 'caza': cazaHTML(); break;
        case 'misterio': misterioHTML(); break;
        case 'snake': snakeHTML(); break;
        case 'pollo': polloHTML(); break;
        case 'perro': perroHTML(); break;
        case 'matereto': materetoHTML(); break;
        case 'equilibrio': equilibrioHTML(); break;
        case 'tragaperras': tragaperrasHTML(); break;
        case 'helicoptero':  helicopteroHTML();  break;
        case 'unSegundo':  unSegundoHTML();  break;
        case 'game2048':  game2048HTML();   break;
        case 'calculadora': calculadoraHTML(); break;

        default: main.innerHTML = '<p>Juego no encontrado</p>'; break;
    }
}

function volverAlMenu() {
    // stop any running intervals/listeners if needed (best-effort resets)
    // Many games clean up on their own, but reload page-state view:
    main.innerHTML = '';
    menu.style.display = 'block';
    // remove any global listeners possibly left (safe-guard)
    try { window.onkeydown = null; } catch(e){}
}

// ===================== JUEGOS ORIGINALES =====================

// -------- Juego 1: Adivina el Número --------
let numeroSecreto = Math.floor(Math.random()*10)+1;
function adivinaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🎲 Adivina el Número</h2>
        <p>Ingresa un número entre 1 y 10:</p>
        <input type="number" id="numero" min="1" max="10" style="width:100%;padding:8px;font-size:16px;">
        <button onclick="adivinar()">Adivinar</button>
        <p id="mensaje"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
}

function adivinar() {
    const input = document.getElementById('numero');
    const valor = parseInt(input.value);
    const mensaje = document.getElementById('mensaje');
    if(isNaN(valor)||valor<1||valor>10){mensaje.textContent="❌ Número inválido"; return;}
    if(valor===numeroSecreto){mensaje.textContent="🎉 ¡Correcto polla vieja!"; numeroSecreto = Math.floor(Math.random()*10)+1;}
    else if(valor<numeroSecreto){mensaje.textContent="⬆️ Más alto"}
    else{mensaje.textContent="⬇️ Más bajo"}
}

// -------- Juego 2: Piedra Papel Tijeras --------
function pptHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>✊ Piedra, 🖐 Papel, ✌ Tijeras</h2>
        <div style="display:flex; justify-content:space-around;">
            <button onclick="pptJugar('piedra')">✊ Piedra</button>
            <button onclick="pptJugar('papel')">🖐 Papel</button>
            <button onclick="pptJugar('tijeras')">✌ Tijeras</button>
        </div>
        <p id="resultado"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
}

function pptJugar(eleccion) {
    const opciones=['piedra','papel','tijeras'];
    const comp = opciones[Math.floor(Math.random()*3)];
    let texto=`Tú: ${eleccion}, Computadora: ${comp}. `;
    if(eleccion===comp) texto+="😐 Empate";
    else if((eleccion==='piedra'&&comp==='tijeras')||(eleccion==='papel'&&comp==='piedra')||(eleccion==='tijeras'&&comp==='papel')) texto+="🎉 Ganaste!";
    else texto+="💻 Perdiste!";
    document.getElementById('resultado').textContent = texto;
}

// -------- Juego 3: Trivia Multitema Avanzado --------
const preguntasPorTema = {
    "Cultura general": [
        { q: "¿Cuál es el país más pequeño del mundo?", a: "vaticano" },
        { q: "¿Qué científico formuló la teoría de la relatividad?", a: "einstein" },
        { q: "¿En qué año llegó el hombre a la Luna?", a: "1969" },
        { q: "¿Cuál es el idioma oficial de Brasil?", a: "portugués" },
        { q: "¿Cuántos huesos tiene el cuerpo humano adulto?", a: "206" },
        { q: "¿Qué océano baña las costas de Perú?", a: "pacífico" },
        { q: "¿Quién escribió 'Cien años de soledad'?", a: "gabriel garcía márquez" },
        { q: "¿Cuál es el metal más caro del mundo?", a: "rodio" },
        { q: "¿El agua hierve a 90°C en condiciones normales?", a: "no" }, // trampa
        { q: "¿Cuál es el país con más habitantes del planeta?", a: "china" },
        { q: "¿Qué gas permite la respiración?", a: "oxígeno" },
        { q: "¿El desierto del Sahara está en Asia?", a: "no" }, // trampa
    ],

    "Deportes": [
        { q: "¿Cuántos minutos dura un partido de fútbol profesional?", a: "90" },
        { q: "¿En qué deporte se usa una tabla sobre el agua?", a: "surf" },
        { q: "¿Cuántas canastas hay en una cancha de baloncesto?", a: "2" },
        { q: "¿Quién ganó más mundiales de fútbol?", a: "brasil" },
        { q: "¿En qué país se originó el boxeo moderno?", a: "inglaterra" },
        { q: "¿Cuántos sets necesita ganar un jugador para ganar un partido de tenis?", a: "2" },
        { q: "¿El golf se juega con una pelota cuadrada?", a: "no" }, // trampa
        { q: "¿Qué corredor ganó más campeonatos de Fórmula 1?", a: "michael schumacher" },
        { q: "¿El baloncesto fue inventado antes que el fútbol?", a: "no" }, // trampa
        { q: "¿En qué deporte se utiliza una flecha?", a: "tiro con arco" },
        { q: "¿Cuántos jugadores tiene un equipo de voleibol en cancha?", a: "6" },
    ],

    "Temas varios": [
        { q: "¿Cuál es el planeta más grande del sistema solar?", a: "júpiter" },
        { q: "¿Cuántos lados tiene un dodecágono?", a: "12" },
        { q: "¿Qué animal pone huevos pero no es un ave?", a: "ornitorrinco" },
        { q: "¿Cuál es el elemento químico del símbolo Fe?", a: "hierro" },
        { q: "¿Los murciélagos son ciegos?", a: "no" }, // trampa
        { q: "¿Cuánto dura un día en la Tierra?", a: "24 horas" },
        { q: "¿Cuál es el país más largo del mundo?", a: "chile" },
        { q: "¿Qué órgano bombea la sangre?", a: "corazón" },
        { q: "¿El ser humano usa solo el 10% del cerebro?", a: "no" }, // trampa famosa
        { q: "¿Cuál es la capital de Australia?", a: "canberra" },
        { q: "¿Cuántas patas tiene un pulpo?", a: "8" },
    ]
};

let preguntasJuego = [], puntos = 0, preguntaActual = 0, temaActual = "";

// Selección de tema
function triviaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🧠 Trivia Multitema</h2>
        <p>Elige un tema para empezar:</p>
        <button onclick="iniciarTrivia('Cultura general')">🌍 Cultura general</button>
        <button onclick="iniciarTrivia('Deportes')">⚽ Deportes</button>
        <button onclick="iniciarTrivia('Temas varios')">🎭 Temas varios</button>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
}

function iniciarTrivia(tema) {
    temaActual = tema;
    puntos = 0;
    preguntaActual = 0;
    preguntasJuego = shuffleArray([...preguntasPorTema[tema]]);

    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🧠 Trivia: ${temaActual}</h2>
        <p id="pregunta"></p>
        <input type="text" id="respuesta" placeholder="Escribe tu respuesta" style="width:100%;padding:8px;">
        <button onclick="verificarRespuesta()">Responder</button>
        <p id="mensajeTrivia"></p>
        <p>Puntos: <span id="puntos">0</span></p>
        <p>Pregunta: <span id="numPregunta">1</span>/${preguntasJuego.length}</p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    
    mostrarPregunta();
}

function mostrarPregunta() {
    document.getElementById('pregunta').textContent = preguntasJuego[preguntaActual].q;
    document.getElementById('respuesta').value = "";
    document.getElementById('numPregunta').textContent = preguntaActual + 1;
}

function verificarRespuesta() {
    const r = document.getElementById('respuesta').value.toLowerCase().trim();
    const msg = document.getElementById('mensajeTrivia');
    const correcta = preguntasJuego[preguntaActual].a.toLowerCase();

    if(r === correcta) {
        puntos++;
        msg.textContent = "✅ ¡Correcto!";
    } else {
        msg.textContent = `❌ Era: ${correcta}`;
    }

    document.getElementById('puntos').textContent = puntos;
    preguntaActual++;

    if(preguntaActual < preguntasJuego.length){
        setTimeout(mostrarPregunta, 1200);
    } else {
        setTimeout(()=>{
            document.getElementById('pregunta').textContent = `🎉 ¡Fin del Trivia ${temaActual}! Has conseguido ${puntos}/${preguntasJuego.length} puntos.`;
            document.getElementById('respuesta').style.display="none";
            msg.textContent="";
            
            const extraBtn = document.createElement('button');
            extraBtn.textContent = "🔁 Jugar otro tema";
            extraBtn.onclick = triviaHTML;
            document.querySelector('.juego').appendChild(extraBtn);
        }, 1200);
    }
}

// Mezclar el array aleatoriamente
function shuffleArray(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// -------- Juego 4: Botón Tontorrón --------
let intentos=0;
function tontorronHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🤣 Botón Tontorrón</h2>
        <button id="tonto" onclick="tontoClick()">¡Púlsame!</button>
        <p id="mensajeTonto"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    intentos=0;
}

function tontoClick() {
    intentos++;
    const msg = document.getElementById('mensajeTonto');
    if(intentos<5) msg.textContent=`Has pulsado ${intentos} veces`;
    else msg.textContent="ERES UN MARICON!";
}

// -------- Juego 5: Ruleta Casino --------
let saldo = 100;

function ruletaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🎰 Ruleta Casino (Versión Europea Realista)</h2>
        <p>Saldo: $<span id="saldo">${saldo}</span></p>
        <input type="number" id="apuesta" placeholder="Cantidad a apostar" style="width:100px;">
        <div style="margin:10px 0;">
            <button onclick="girarRuleta('rojo')">🔴 Rojo</button>
            <button onclick="girarRuleta('negro')">⚫ Negro</button>
            <button onclick="girarRuleta('verde')">🟢 Verde (0)</button>
        </div>
        <p>O apuesta a un número (0–36):</p>
        <input type="number" id="numApuesta" min="0" max="36" placeholder="Número">
        <button onclick="girarRuleta('numero')">🎯 Apostar Número</button>
        <p id="mensaje"></p>
        <canvas id="ruletaCanvas" width="280" height="280" style="border-radius:50%;margin-top:10px;"></canvas>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    dibujarRuletaBase();
}

const numerosRuleta = [
    0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,
    10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26
];

const coloresRuleta = numerosRuleta.map(n => {
    if (n === 0) return "green";
    const rojos = [32,19,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3];
    return rojos.includes(n) ? "red" : "black";
});

function dibujarRuletaBase() {
    const canvas = document.getElementById('ruletaCanvas');
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radio = 120;
    const total = numerosRuleta.length;
    const anguloPorNumero = 2 * Math.PI / total;
    let inicio = 0;

    for (let i = 0; i < total; i++) {
        const color = coloresRuleta[i];
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radio, inicio, inicio + anguloPorNumero);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();

        // Número
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(inicio + anguloPorNumero / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 12px Arial";
        ctx.fillText(numerosRuleta[i], radio - 10, 4);
        ctx.restore();

        inicio += anguloPorNumero;
    }

    // Flecha
    ctx.beginPath();
    ctx.moveTo(cx, cy - radio - 5);
    ctx.lineTo(cx - 10, cy - radio - 20);
    ctx.lineTo(cx + 10, cy - radio - 20);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
}

function girarRuleta(apuestaTipo) {
    const cantidad = parseInt(document.getElementById('apuesta').value);
    const numApuesta = parseInt(document.getElementById('numApuesta').value);
    const msg = document.getElementById('mensaje');
    const canvas = document.getElementById('ruletaCanvas');
    const ctx = canvas.getContext('2d');

    if (isNaN(cantidad) || cantidad <= 0) {
        msg.textContent = "❌ Apuesta inválida.";
        return;
    }
    if (cantidad > saldo) {
        msg.textContent = "❌ No tienes suficiente saldo.";
        return;
    }

    // Elegimos el índice ganador primero (resultado real)
    const total = numerosRuleta.length;
    const indiceGanador = Math.floor(Math.random() * total);
    const numeroGanador = numerosRuleta[indiceGanador];
    const colorGanador = coloresRuleta[indiceGanador];

    // Cálculos de ángulo
    const anguloPorNumero = 2 * Math.PI / total;
    const anguloFlecha = -Math.PI / 2;
    let objetivoLocal = anguloFlecha - (indiceGanador + 0.5) * anguloPorNumero;
    objetivoLocal = ((objetivoLocal % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const girosExtras = 6;
    const objetivo = girosExtras * 2 * Math.PI + objetivoLocal;

    let angle = 0;
    let velocidad = 0.65 + Math.random() * 0.25;
    const deceleracion = 0.993;

    function step() {
        angle += velocidad;
        velocidad *= deceleracion;

        // Interpolación suave al final
        if (velocidad < 0.01) {
            const diff = objetivo - angle;
            if (Math.abs(diff) < 0.02) {
                angle = objetivo;
            } else {
                angle += diff * 0.25;
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarRuletaGirada(ctx, angle);

        if (angle < objetivo - 0.001) {
            requestAnimationFrame(step);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujarRuletaGirada(ctx, objetivo);

            let ganancia = 0;
            if (apuestaTipo === "numero" && !isNaN(numApuesta)) {
                if (numApuesta === numeroGanador) ganancia = cantidad * 36;
            } else if (apuestaTipo === "rojo" && colorGanador === "red") ganancia = cantidad * 2;
            else if (apuestaTipo === "negro" && colorGanador === "black") ganancia = cantidad * 2;
            else if (apuestaTipo === "verde" && colorGanador === "green") ganancia = cantidad * 14;

            saldo = saldo - cantidad + ganancia;
            document.getElementById('saldo').textContent = saldo;

            msg.innerHTML = `
                🎡 Resultado: <b>${numeroGanador}</b> (${colorGanador})<br>
                ${ganancia > 0 ? "🎉 ¡Ganaste $" + ganancia + "!" : "💸 Perdiste $" + cantidad}
            `;
            if (saldo <= 0) msg.innerHTML += "<br>😢 ¡Te quedaste sin dinero!";
        }
    }

    requestAnimationFrame(step);
}

function dibujarRuletaGirada(ctx, angle) {
    const canvas = ctx.canvas;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radio = 120;
    const total = numerosRuleta.length;
    const anguloPorNumero = 2 * Math.PI / total;
    let inicio = angle;

    for (let i = 0; i < total; i++) {
        const color = coloresRuleta[i];
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radio, inicio, inicio + anguloPorNumero);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(inicio + anguloPorNumero / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 12px Arial";
        ctx.fillText(numerosRuleta[i], radio - 10, 4);
        ctx.restore();

        inicio += anguloPorNumero;
    }

    // Flecha
    ctx.beginPath();
    ctx.moveTo(cx, cy - radio - 5);
    ctx.lineTo(cx - 10, cy - radio - 20);
    ctx.lineTo(cx + 10, cy - radio - 20);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
}


// -------- Juego 6: Caballo Ganador --------
let dinero = 100; // dinero inicial

function caballoHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🏇 Caballo Ganador Mejorado</h2>
        <p>Dinero: $<span id="dinero">${dinero}</span></p>
        <p>Apuesta en caballo 1, 2, 3, 4 o 5:</p>
        <input type="number" id="apuestaCaballo" min="1" max="5" style="width:50px;padding:5px;">
        <input type="number" id="cantidadApuesta" min="1" max="${dinero}" placeholder="Cantidad" style="width:70px;padding:5px;">
        <button onclick="correrCaballosAvanzado()">¡Apostar y Correr!</button>
        <canvas id="caballoCanvas" width="500" height="200"></canvas>
        <p id="mensaje"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    
    dibujarCaballosAvanzado([10,10,10,10,10]);
}

function dibujarCaballosAvanzado(posiciones){
    const canvas = document.getElementById('caballoCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);

    const colores = ["brown","gray","orange","blue","green"];
    for(let i=0;i<5;i++){
        ctx.fillStyle = colores[i];
        ctx.fillRect(posiciones[i], 20 + i*35, 40, 25);
    }
}

function correrCaballosAvanzado() {
    const caballoElegido = parseInt(document.getElementById('apuestaCaballo').value);
    let cantidad = parseInt(document.getElementById('cantidadApuesta').value);
    const msg = document.getElementById('mensaje');

    if(isNaN(caballoElegido) || caballoElegido<1 || caballoElegido>5){msg.textContent="❌ Elige un caballo entre 1 y 5"; return;}
    if(isNaN(cantidad) || cantidad<1 || cantidad>dinero){msg.textContent="❌ Cantidad inválida"; return;}

    dinero -= cantidad;
    document.getElementById('dinero').textContent = dinero;

    const canvas = document.getElementById('caballoCanvas');
    const ctx = canvas.getContext('2d');

    let posiciones = [10,10,10,10,10];
    let velocidades = [];
    for(let i=0;i<5;i++){
        velocidades[i] = Math.random()*3 + 2; // velocidad base aleatoria
    }

    const interval = setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);

        for(let i=0;i<5;i++){
            posiciones[i] += velocidades[i] + Math.random()*2; // pequeños picos aleatorios
        }

        dibujarCaballosAvanzado(posiciones);

        if(Math.max(...posiciones) >= canvas.width - 50){
            clearInterval(interval);
            const ganador = posiciones.indexOf(Math.max(...posiciones)) + 1;

            // Calculamos multiplicador: los caballos más lentos pagan más
            let promedioVel = velocidades.reduce((a,b)=>a+b,0)/5;
            let multiplicadores = [];
            for(let i=0;i<5;i++){
                multiplicadores[i] = velocidades[i] < promedioVel ? 3 : 2;
            }

            let ganancia = 0;
            if(caballoElegido === ganador){
                ganancia = cantidad * multiplicadores[ganador-1];
                dinero += ganancia;
                msg.textContent = `🏆 Ganó el caballo ${ganador}! 🎉 ¡Ganaste $${ganancia}!`;
            } else {
                msg.textContent = `💸 Ganó el caballo ${ganador}. Perdiste $${cantidad}`;
            }

            document.getElementById('dinero').textContent = dinero;

            // Reinicio automático si aún hay dinero
            if(dinero>0){
                setTimeout(()=>{
                    posiciones = [10,10,10,10,10];
                    dibujarCaballosAvanzado(posiciones);
                    msg.textContent = "Nueva carrera! Haz tu apuesta!";
                },2000);
            } else {
                msg.textContent += " 😢 Te quedaste sin dinero!";
            }
        }
    },50);
}


// -------- Juego 7: Reflejos Ninja --------
function reflejosHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>⚡ Reflejos Ninja</h2>
        <div id="cuadro" style="width:100px;height:100px;margin:30px auto;background-color:red;border-radius:8px;" onclick="golpear()"></div>
        <p id="mensajeReflejos">Toca el cuadrado verde lo más rápido posible!</p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    cambiarColorReflejos();
}

let tiempoReflejos = 0;
function cambiarColorReflejos() {
    const cuadro = document.getElementById('cuadro');
    if(!cuadro) return;
    tiempoReflejos = Math.random()*2000+500;
    setTimeout(()=>{
        cuadro.style.backgroundColor='green';
        cuadro.onclick = golpear;
    }, tiempoReflejos);
}

function golpear() {
    const cuadro = document.getElementById('cuadro');
    if(!cuadro) return;
    cuadro.style.backgroundColor='red';
    document.getElementById('mensajeReflejos').textContent=`¡Buen golpe! Tiempo: ${Math.round(tiempoReflejos)} ms`;
    cambiarColorReflejos();
}

// -------- Juego 8: Memoria (reemplazado por nueva versión) --------
function memoriaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🟢 Memoria Exprés</h2>
        <div id="tableroMemoria" 
             style="display:grid;grid-template-columns:repeat(4,70px);gap:10px;
                    justify-content:center;margin:20px auto;"></div>
        <p id="mensajeMemoria" style="text-align:center;font-weight:bold;"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarMemoria();
}

function iniciarMemoria(){
    const tablero = document.getElementById('tableroMemoria');
    const mensaje = document.getElementById('mensajeMemoria');
    const emojis = ['🐶','🐱','🐭','🐸','🐢','🦊','🐼','🐰'];
    let cartas = [...emojis, ...emojis]
        .sort(()=>Math.random()-0.5)
        .map((emoji, i)=>({id:i, emoji, volteada:false, encontrada:false}));
    let seleccionadas = [];
    let aciertos = 0;

    tablero.innerHTML = '';
    mensaje.textContent = '';

    cartas.forEach(c=>{
        const div = document.createElement('div');
        div.className = 'cartaMemoria';
        div.style.width = '70px';
        div.style.height = '70px';
        div.style.borderRadius = '10px';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.fontSize = '30px';
        div.style.backgroundColor = '#2196F3';
        div.style.color = 'transparent';
        div.style.transition = 'transform 0.25s';
        div.onclick = ()=>voltearCarta(c, div);
        tablero.appendChild(div);
        c.el = div;
    });

    function voltearCarta(carta, div){
        if(carta.volteada || carta.encontrada || seleccionadas.length>=2) return;
        carta.volteada = true;
        div.textContent = carta.emoji;
        div.style.color = '#fff';
        div.style.backgroundColor = '#4CAF50';
        seleccionadas.push(carta);

        if(seleccionadas.length===2){
            setTimeout(()=>{
                const [c1,c2]=seleccionadas;
                if(c1.emoji===c2.emoji){
                    c1.encontrada = c2.encontrada = true;
                    aciertos++;
                    if(aciertos===emojis.length){
                        mensaje.textContent = "🎉 ¡Ganaste! Has encontrado todos los pares.";
                    }
                } else {
                    c1.volteada = c2.volteada = false;
                    c1.el.textContent = '';
                    c2.el.textContent = '';
                    c1.el.style.backgroundColor = '#2196F3';
                    c2.el.style.backgroundColor = '#2196F3';
                }
                seleccionadas = [];
            }, 700);
        }
    }
}

// -------- Juego 9: Saltos del Gato Extremo (Dino-like) --------
function saltosHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>🐱 Saltos del Gato Extremo</h2>
        <canvas id="gatoCanvas" width="320" height="160" style="border:1px solid #000; touch-action:none; background:#d0f4f7;"></canvas>
        <p>Puntos: <span id="puntosGato">0</span> | Récord: <span id="recordGato">${localStorage.getItem('recordGato') || 0}</span></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    saltosJuegoExtremo();
}

function saltosJuegoExtremo(){
    const canvas = document.getElementById('gatoCanvas');
    const ctx = canvas.getContext('2d');
    let gato = {x:40, y:130, vy:0, size:25, saltando:false};
    let obstaculos = [];
    let sueloY = 150;
    let puntos = 0;
    let velocidad = 4;
    let gravedad = 0.6;
    let enJuego = true;
    let tiempoObstaculo = 0;
    let ultimaFrame = performance.now();

    function dibujar(now){
        const dt = now - ultimaFrame;
        ultimaFrame = now;
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // Fondo
        ctx.fillStyle = "#a8e6cf";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // Suelo
        ctx.fillStyle="#654321";
        ctx.fillRect(0,sueloY-5,canvas.width,10);

        // Gato
        ctx.fillStyle='orange';
        ctx.fillRect(gato.x, gato.y, gato.size, gato.size);

        // Obstáculos
        ctx.fillStyle='brown';
        obstaculos.forEach(o=>{
            ctx.fillRect(o.x,o.y,o.w,o.h);
            o.x -= velocidad * (dt/16);
        });

        // Remove off-screen
        obstaculos = obstaculos.filter(o => o.x + o.w > -10);

        // Spawn
        tiempoObstaculo -= dt/16;
        if(tiempoObstaculo <= 0){
            let alto = Math.random() > 0.5 ? 20 : 35;
            obstaculos.push({x:canvas.width + Math.random()*30, y:sueloY - alto, w:20 + Math.random()*10, h:alto});
            tiempoObstaculo = 50 + Math.random()*60 - Math.min(30, Math.floor(puntos/10)); // get a bit tighter as you score
        }

        // Gravity and movement
        gato.vy += gravedad * (dt/16);
        gato.y += gato.vy * (dt/16);
        if(gato.y > sueloY - gato.size){
            gato.y = sueloY - gato.size;
            gato.vy = 0;
            gato.saltando = false;
        }

        // Collisions
        for(let o of obstaculos){
            if(gato.x < o.x + o.w && gato.x + gato.size > o.x &&
               gato.y < o.y + o.h && gato.y + gato.size > o.y){
                finDelJuego();
                return;
            }
        }

        // Score
        puntos += 0.03 * (dt/16);
        document.getElementById('puntosGato').textContent = Math.floor(puntos);

        // Difficulty ramp
        if(Math.floor(puntos) % 50 === 0 && Math.floor(puntos) !== 0) velocidad += 0.002 * puntos; // slow grow

        // Clouds
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        for(let i=0;i<3;i++){
            ctx.beginPath();
            ctx.arc((i*110 + puntos*1.2) % (canvas.width + 40) -20, 30 + i*8, 14, 0, Math.PI*2);
            ctx.fill();
        }

        if(enJuego) requestAnimationFrame(dibujar);
    }

    function saltar(){
        if(!gato.saltando){
            gato.vy = -11.5;
            gato.saltando = true;
        }
    }

    function finDelJuego(){
        enJuego = false;
        const record = parseInt(localStorage.getItem('recordGato') || 0);
        const puntosFinal = Math.floor(puntos);
        if(puntosFinal > record){
            localStorage.setItem('recordGato', puntosFinal);
            setTimeout(()=> alert(`🎉 ¡Nuevo récord! ${puntosFinal} puntos`), 50);
        } else {
            setTimeout(()=> alert(`💥 ¡Chocaste! Puntos: ${puntosFinal}`), 50);
        }
        setTimeout(()=> volverAlMenu(), 80);
    }

    // Controls
    canvas.addEventListener('click', saltar);
    canvas.addEventListener('touchstart', (e)=>{
        e.preventDefault();
        saltar();
    });

    requestAnimationFrame(dibujar);
}

// -------- Juego 10: Caza Estrellas --------
function cazaHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🌟 Caza Estrellas</h2>
        <canvas id="estrellaCanvas" width="300" height="300"></canvas>
        <p>Puntos: <span id="puntosEstrella">0</span></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    cazaJuego();
}

function cazaJuego(){
    const canvas=document.getElementById('estrellaCanvas');
    const ctx=canvas.getContext('2d');
    let puntos=0;
    let x=Math.random()*270, y=Math.random()*270;
    function dibujar(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='yellow'; ctx.beginPath();
        ctx.arc(x+15,y+15,15,0,Math.PI*2);
        ctx.fill();
    }
    canvas.onclick=(e)=>{
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX-rect.left;
        const my = e.clientY-rect.top;
        if(mx>x && mx<x+30 && my>y && my<y+30){
            puntos++;
            document.getElementById('puntosEstrella').textContent=puntos;
            x=Math.random()*270; y=Math.random()*270;
            dibujar();
        }
    }
    dibujar();
}

// ===================== NUEVO JUEGO 11: HISTORIA MISTERIOSA =====================
function misterioHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🕵️ Historia Misteriosa</h2>
        <div id="historiaTexto" style="text-align:center; padding:10px;"></div>
        <div id="opcionesHistoria" style="text-align:center;"></div>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarHistoria();
}

let etapa = 0;
function iniciarHistoria(){
    etapa = 0;
    mostrarEtapa();
}

function mostrarEtapa(){
    const texto = document.getElementById('historiaTexto');
    const opciones = document.getElementById('opcionesHistoria');
    opciones.innerHTML = '';

    const escenas = [
        {
            texto: "Te despiertas en una mansión antigua sin recordar nada. Ves un pasillo oscuro y una puerta entreabierta iluminada por una vela.",
            opciones: [
                {t:"Entrar por la puerta iluminada", next:1},
                {t:"Explorar el pasillo oscuro", next:2}
            ]
        },
        {
            texto: "Dentro de la habitación, encuentras un escritorio con una nota: 'El culpable está más cerca de lo que crees'. Escuchas pasos detrás de ti.",
            opciones: [
                {t:"Girar rápidamente", next:3},
                {t:"Esconderte bajo el escritorio", next:4}
            ]
        },
        {
            texto: "El pasillo te lleva a una galería con retratos. Uno de ellos tiene los ojos que parecen seguirte.",
            opciones: [
                {t:"Tocar el retrato", next:5},
                {t:"Seguir caminando", next:6}
            ]
        },
        {
            texto: "Giras y ves un espejo que refleja una sombra que no es la tuya... Dentro del reflejo hay una llave flotando.",
            opciones: [
                {t:"Tomar la llave del reflejo", next:7},
                {t:"Romper el espejo", next:8}
            ]
        },
        {
            texto: "Mientras te escondes, una figura pasa lentamente. Susurra: 'No todos los que investigan sobreviven...'. Cuando se va, sales con miedo.",
            opciones: [
                {t:"Correr al pasillo", next:6},
                {t:"Buscar otra salida", next:9}
            ]
        },
        {
            texto: "Detrás del retrato hay una caja fuerte con un código de 3 dígitos. Hay una pista: 'El día que morí fue 3 días antes del 7'.",
            opciones: [
                {t:"Probar 4-0-0", next:7},
                {t:"Probar 0-4-0", next:8}
            ]
        },
        {
            texto: "El pasillo termina en una puerta sellada con símbolos extraños. Uno brilla cuando acercas la mano.",
            opciones: [
                {t:"Tocar el símbolo brillante", next:9},
                {t:"Golpear la puerta", next:10}
            ]
        },
        {
            texto: "La llave encaja en una puerta secreta. Entras y encuentras una sala con una figura encapuchada: 'Has llegado demasiado lejos'.",
            opciones: [
                {t:"Hablar con la figura", next:11},
                {t:"Intentar escapar", next:12}
            ]
        },
        {
            texto: "El espejo se rompe y libera una niebla oscura. Sientes un frío que te congela. Pierdes la conciencia...",
            final: "perder"
        },
        {
            texto: "El símbolo abre la puerta. Dentro, una grabación antigua dice: 'El asesino eras tú'. Todo se desvanece... ¿Sueño o verdad?",
            final: "perder"
        },
        {
            texto: "Golpeas la puerta... y se abre. Afuera amanece. Has escapado, pero las voces siguen en tu mente.",
            final: "ganar"
        },
        {
            texto: "La figura baja la capucha: ¡Eras tú mismo en el futuro! Te entrega una nota: 'Has roto el ciclo'.",
            final: "ganar"
        },
        {
            texto: "Intentas huir, pero la puerta se cierra sola. La sombra te alcanza. Todo se apaga...",
            final: "perder"
        }
    ];

    const escena = escenas[etapa];
    texto.textContent = escena.texto;

    if(escena.final){
        if(escena.final === "ganar"){
            texto.innerHTML += "<br><br>🎉 Has resuelto el misterio. ¡Final bueno!";
        } else {
            texto.innerHTML += "<br><br>💀 El misterio te consumió... Final trágico.";
        }
        const btn = document.createElement('button');
        btn.textContent = "Jugar de nuevo";
        btn.onclick = iniciarHistoria;
        opciones.appendChild(btn);
        return;
    }

    escena.opciones.forEach(o=>{
        const b = document.createElement('button');
        b.textContent = o.t;
        b.style.display='block';
        b.style.margin='10px auto';
        b.onclick = ()=>{ etapa = o.next; mostrarEtapa(); };
        opciones.appendChild(b);
    });
}

// ===================== NUEVO: MINI SNAKE =====================
function snakeHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🐍 Mini Snake</h2>
        <canvas id="snakeCanvas" width="300" height="300"></canvas>
        <p style="text-align:center;">Puntos: <span id="puntosSnake">0</span></p>
        <div id="controlesSnake">
            <button onclick="cambiarDireccion('up')">⬆️</button>
            <div>
                <button onclick="cambiarDireccion('left')">⬅️</button>
                <button onclick="cambiarDireccion('right')">➡️</button>
            </div>
            <button onclick="cambiarDireccion('down')">⬇️</button>
        </div>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarSnake();
}

let snake, comida, direccion, puntosSnake, intervaloSnake;

function iniciarSnake(){
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    let tam = 15;
    snake = [{x:5,y:5}];
    comida = {x:10,y:10};
    direccion = 'right';
    puntosSnake = 0;
    document.getElementById('puntosSnake').textContent = puntosSnake;

    function dibujar(){
        ctx.fillStyle="#eee";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle="green";
        snake.forEach(s=>ctx.fillRect(s.x*tam,s.y*tam,tam,tam));

        ctx.fillStyle="red";
        ctx.fillRect(comida.x*tam,comida.y*tam,tam,tam);
    }

    function mover(){
        const cabeza = {x:snake[0].x, y:snake[0].y};
        if(direccion==='up') cabeza.y--;
        if(direccion==='down') cabeza.y++;
        if(direccion==='left') cabeza.x--;
        if(direccion==='right') cabeza.x++;

        if(cabeza.x<0 || cabeza.y<0 || cabeza.x>=canvas.width/tam || cabeza.y>=canvas.height/tam){
            finSnake();
            return;
        }

        for(let s of snake){
            if(s.x===cabeza.x && s.y===cabeza.y){finSnake();return;}
        }

        snake.unshift(cabeza);
        if(cabeza.x===comida.x && cabeza.y===comida.y){
            puntosSnake++;
            document.getElementById('puntosSnake').textContent = puntosSnake;
            comida = {x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)};
        } else {
            snake.pop();
        }

        dibujar();
    }

    clearInterval(intervaloSnake);
    intervaloSnake = setInterval(mover, 150);
}

function cambiarDireccion(dir){
    const opuestos = {up:'down',down:'up',left:'right',right:'left'};
    if(dir !== opuestos[direccion]) direccion = dir;
}

function finSnake(){
    clearInterval(intervaloSnake);
    alert("💀 Juego terminado. Puntos: "+puntosSnake);
    volverAlMenu();
}

// ===================== NUEVOS JUEGOS SOLICITADOS =====================

// -------- Pollo Travieso: Flappy Chicken Edition --------
function polloHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>🐔 Pollo Travieso</h2>
        <canvas id="polloCanvas" width="320" height="400" style="border-radius:12px; border:2px solid #ffb703; background:linear-gradient(#87CEEB,#bfe9ff); touch-action:none;"></canvas>
        <p>Puntos: <span id="puntosPollo">0</span> | Récord: <span id="recordPollo">${localStorage.getItem('recordPollo') || 0}</span></p>
        <p id="polloMensaje" style="font-weight:bold; min-height:20px;"></p>
        <div style="display:flex; justify-content:center; gap:10px; margin-top:10px;">
            <button onclick="volverAlMenu()">⬅ Volver</button>
            <button onclick="iniciarPollo()">🔁 Reiniciar</button>
        </div>
    </div>`;
    iniciarPollo();
}

function iniciarPollo(){
    const canvas = document.getElementById('polloCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    let pollo = {x: 60, y: H/2, vy: 0, size: 24};
    let tuberias = [];
    let gravedad = 0.4;
    let salto = -6.8;
    let velocidad = 2;
    let puntuacion = 0;
    let record = parseInt(localStorage.getItem('recordPollo')||0);
    let juegoActivo = true;
    let frame = 0;

    // tocar o clic para saltar
    function saltar(){
        if(!juegoActivo){
            iniciarPollo(); // reinicia al tocar después de perder
            return;
        }
        pollo.vy = salto;
    }

    canvas.onclick = saltar;
    canvas.ontouchstart = (e)=>{ e.preventDefault(); saltar(); };
    window.onkeydown = (e)=>{ if(e.key === ' ' || e.key === 'ArrowUp') saltar(); };

    function crearTuberia(){
        const huecoAltura = 90;
        const minAltura = 40;
        const maxAltura = H - huecoAltura - 80;
        const parteSuperior = minAltura + Math.random() * (maxAltura - minAltura);
        tuberias.push({
            x: W,
            y: parteSuperior,
            w: 40,
            hueco: huecoAltura
        });
    }

    function actualizar(){
        frame++;
        pollo.vy += gravedad;
        pollo.y += pollo.vy;

        // cada 90 frames (~1.5s) crea una tubería nueva
        if(frame % 90 === 0){
            crearTuberia();
        }

        // mover tuberías
        for(let i=0;i<tuberias.length;i++){
            tuberias[i].x -= velocidad;
        }

        // eliminar tuberías fuera de pantalla
        tuberias = tuberias.filter(t => t.x + t.w > 0);

        // colisiones
        for(let t of tuberias){
            // si pasa entre tuberías suma punto
            if(t.x + t.w < pollo.x && !t.pasado){
                puntuacion++;
                t.pasado = true;
                document.getElementById("puntosPollo").textContent = puntuacion;
            }
            // detectar colisión
            if(
                pollo.x + pollo.size > t.x && pollo.x < t.x + t.w &&
                (pollo.y < t.y || pollo.y + pollo.size > t.y + t.hueco)
            ){
                finJuego();
            }
        }

        // límites del suelo y techo
        if(pollo.y + pollo.size > H || pollo.y < 0){
            finJuego();
        }
    }

    function dibujar(){
        ctx.clearRect(0, 0, W, H);
        // fondo
        ctx.fillStyle = "#8bc34a";
        ctx.fillRect(0, H-40, W, 40); // suelo

        // tuberías
        ctx.fillStyle = "#3b8c3b";
        for(let t of tuberias){
            // parte superior
            ctx.fillRect(t.x, 0, t.w, t.y);
            // parte inferior
            ctx.fillRect(t.x, t.y + t.hueco, t.w, H - (t.y + t.hueco));
        }

        // pollo
        ctx.fillStyle = "#ffcc00";
        ctx.beginPath();
        ctx.arc(pollo.x, pollo.y, pollo.size/2, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(pollo.x+6, pollo.y-4, 4, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(pollo.x+7, pollo.y-4, 2, 0, Math.PI*2);
        ctx.fill();

        // texto de puntuación
        ctx.fillStyle = "#222";
        ctx.font = "16px Arial";
        ctx.fillText("🐔 Puntos: "+puntuacion, 10, 20);
    }

    function bucle(){
        if(juegoActivo){
            actualizar();
            dibujar();
            requestAnimationFrame(bucle);
        }
    }

    function finJuego(){
        if(!juegoActivo) return;
        juegoActivo = false;
        document.getElementById("polloMensaje").textContent = "💥 ¡El pollo chocó!";
        if(puntuacion > record){
            localStorage.setItem('recordPollo', puntuacion);
            setTimeout(()=> alert(`🎉 ¡Nuevo récord del Pollo Travieso! ${puntuacion} puntos 🐔`), 300);
        } else {
            setTimeout(()=> alert(`🐔 Puntos: ${puntuacion}`), 300);
        }
    }

    document.getElementById("puntosPollo").textContent = puntuacion;
    document.getElementById("recordPollo").textContent = record;
    document.getElementById("polloMensaje").textContent = "💨 Toca o pulsa espacio para volar";
    bucle();
}


// -------- Disparos: Perro Galáctico --------
function perroHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🐶 Perro Galáctico</h2>
        <canvas id="perroCanvas" width="320" height="360"></canvas>
        <p style="text-align:center;">Puntos: <span id="puntosPerro">0</span></p>
        <div style="text-align:center;margin-top:6px;">
            <button onclick="volverAlMenu()">⬅ Volver al menú</button>
        </div>
    </div>`;
    iniciarPerro();
}

function iniciarPerro(){
    const canvas = document.getElementById('perroCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height;
    let jugador = {x: width/2, y: height-60, w:40, h:40};
    let disparos = [];
    let meteoros = [];
    let puntosP = 0;
    let velocidad = 1.5;
    let enJuego = true;
    let spawnTimer = 0;

    function dibujar(){
        ctx.clearRect(0,0,width,height);
        // fondo
        ctx.fillStyle = "#001";
        ctx.fillRect(0,0,width,height);
        // jugador (perro)
        ctx.fillStyle = "#FFD966";
        ctx.fillRect(jugador.x - jugador.w/2, jugador.y, jugador.w, jugador.h);
        // disparos
        ctx.fillStyle = "#8ef";
        disparos.forEach(d=>{ ctx.fillRect(d.x-2, d.y-10, 4, 10); d.y -= 6; });
        // meteoros
        ctx.fillStyle = "#b5651d";
        meteoros.forEach(m=>{ ctx.beginPath(); ctx.arc(m.x,m.y,m.r,0,Math.PI*2); ctx.fill(); m.y += m.vy; m.x += m.vx; });

        // colisiones disparos-meteoros
        for(let i=disparos.length-1;i>=0;i--){
            for(let j=meteoros.length-1;j>=0;j--){
                const d = disparos[i], m = meteoros[j];
                if(d.x > m.x - m.r && d.x < m.x + m.r && d.y > m.y - m.r && d.y < m.y + m.r){
                    // explotar
                    meteoros.splice(j,1);
                    disparos.splice(i,1);
                    puntosP += 1;
                    document.getElementById('puntosPerro').textContent = puntosP;
                    break;
                }
            }
        }

        // colision meteoro-jugador
        for(let m of meteoros){
            if(m.x > jugador.x - jugador.w/2 - m.r && m.x < jugador.x + jugador.w/2 + m.r && m.y > jugador.y - m.r){
                finPerro();
                return;
            }
        }

        // limpiar disparos que salieron
        disparos = disparos.filter(d => d.y > -10);
        // limpiar meteoros que salieron
        meteoros = meteoros.filter(m => m.y < height + 50);

        // spawn
        spawnTimer--;
        if(spawnTimer <= 0){
            meteoros.push({
                x: Math.random()*(width-40)+20,
                y: -20,
                r: 12 + Math.random()*12,
                vy: 1 + Math.random()*1.2 + velocidad*0.05,
                vx: (Math.random()-0.5)*0.6
            });
            spawnTimer = 40 - Math.min(25, Math.floor(puntosP/3));
        }

        // acelerar levemente
        if(puntosP % 10 === 0 && puntosP !== 0) velocidad = 1.5 + Math.floor(puntosP/10)*0.2;

        if(enJuego) requestAnimationFrame(dibujar);
    }

    function disparar(){
        disparos.push({x: jugador.x, y: jugador.y - 6});
    }

    function moverJugadorTo(x){
        jugador.x = Math.max(jugador.w/2, Math.min(width - jugador.w/2, x));
    }

    function finPerro(){
        enJuego = false;
        setTimeout(()=> alert(`💥 ¡El Perro Galáctico fue golpeado! Puntos: ${puntosP}`), 20);
        setTimeout(()=> volverAlMenu(), 60);
    }

    // Touch & mouse
    canvas.addEventListener('touchstart', (e)=>{
        e.preventDefault();
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        moverJugadorTo(t.clientX - rect.left);
        disparar();
    });
    canvas.addEventListener('touchmove', (e)=>{
        e.preventDefault();
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        moverJugadorTo(t.clientX - rect.left);
    });
    canvas.addEventListener('click', (e)=>{
        const rect = canvas.getBoundingClientRect();
        moverJugadorTo(e.clientX - rect.left);
        disparar();
    });

    // keyboard for desktop
    window.onkeydown = function(e){
        if(e.key === 'ArrowLeft') moverJugadorTo(jugador.x - 20);
        if(e.key === 'ArrowRight') moverJugadorTo(jugador.x + 20);
        if(e.key === ' ') disparar();
    }

    requestAnimationFrame(dibujar);
}

// -------- Educativo: MateReto --------
function materetoHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>➗ MateReto</h2>
        <div id="mateArea" style="text-align:center;">
            <p id="matePregunta" style="font-size:18px;"></p>
            <input id="mateRespuesta" type="number" placeholder="Tu respuesta" />
            <div style="margin-top:8px;">
                <button onclick="comprobarMate()">Comprobar</button>
                <button onclick="saltarMate()">Saltar</button>
            </div>
            <p id="mateMens" style="font-weight:bold;"></p>
            <p>Puntos: <span id="matePuntos">0</span></p>
            <p>Tiempo: <span id="mateTiempo">30</span>s</p>
        </div>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarMate();
}

let mateCorrecta = 0, matePuntos = 0, mateTiempoInterval;
function iniciarMate(){
    matePuntos = 0;
    document.getElementById('matePuntos').textContent = matePuntos;
    generarMate();
    let tiempo = 30;
    document.getElementById('mateTiempo').textContent = tiempo;
    clearInterval(mateTiempoInterval);
    mateTiempoInterval = setInterval(()=>{
        tiempo--;
        document.getElementById('mateTiempo').textContent = tiempo;
        if(tiempo<=0){
            clearInterval(mateTiempoInterval);
            document.getElementById('mateMens').textContent = "⏰ Se acabó el tiempo!";
            setTimeout(()=>volverAlMenu(), 900);
        }
    },1000);
}

function generarMate(){
    // operaciones aleatorias (sum, sub, mul, div simple)
    const ops = ['+','-','*','/'];
    const op = ops[Math.floor(Math.random()*ops.length)];
    let a,b,res;
    if(op === '+'){ a = rand(1,50); b = rand(1,50); res = a+b; }
    if(op === '-'){ a = rand(1,50); b = rand(1,a); res = a-b; }
    if(op === '*'){ a = rand(1,12); b = rand(1,12); res = a*b; }
    if(op === '/'){ b = rand(2,12); res = rand(1,12); a = b*res; } // divisible
    mateCorrecta = res;
    document.getElementById('matePregunta').textContent = `¿Cuánto es ${a} ${op} ${b}?`;
    document.getElementById('mateRespuesta').value = '';
    document.getElementById('mateMens').textContent = '';
}

function comprobarMate(){
    const val = Number(document.getElementById('mateRespuesta').value);
    if(isNaN(val)){ document.getElementById('mateMens').textContent = "Introduce un número"; return; }
    if(val === mateCorrecta){
        matePuntos++;
        document.getElementById('matePuntos').textContent = matePuntos;
        document.getElementById('mateMens').textContent = "✅ Correcto!";
    } else {
        document.getElementById('mateMens').textContent = `❌ Incorrecto. Era ${mateCorrecta}`;
    }
    generarMate();
}

function saltarMate(){ generarMate(); }

function rand(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

// -------- Habilidad: Equilibrio Loco --------
function equilibrioHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>⚖️ Equilibrio Loco</h2>
        <div id="equilibrioArea">
            <canvas id="equilibrioCanvas" width="320" height="220"></canvas>
            <p>Puntos: <span id="puntosEquilibrio">0</span></p>
            <p id="equilibrioMens" style="font-weight:bold;"></p>
        </div>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarEquilibrio();
}

function iniciarEquilibrio(){
    const canvas = document.getElementById('equilibrioCanvas');
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    let bola = {x: w/2, y: 60, r:12, vx:0};
    let velocidad=0.02;
    let puntosE = 0;
    let enJuego = true;

    function dib(){
        ctx.clearRect(0,0,w,h);
        // balanza base
        ctx.fillStyle = "#222"; ctx.fillRect(30,120,w-60,8);
        // centro
        ctx.fillStyle = "#444"; ctx.fillRect(w/2 - 6,120-20,12,20);

        // bola
        ctx.beginPath(); ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI*2); ctx.fillStyle="#ffcc00"; ctx.fill();

        // update
        bola.vx += (Math.random()-0.5) * 0.08; // small shake
        bola.vx *= 0.995;
        bola.x += bola.vx;

        // keep within bounds slightly
        if(bola.x < 30 + bola.r) bola.x = 30 + bola.r;
        if(bola.x > w - 30 - bola.r) bola.x = w - 30 - bola.r;

        // check if falls off
        if(bola.x < 30 + bola.r + 2 || bola.x > w - 30 - bola.r - 2){
            perder();
            return;
        }

        if(enJuego) requestAnimationFrame(dib);
    }

    function controlar(delta){
        // delta between -1..1
        bola.vx += delta * velocidad;
    }

    function perder(){
        enJuego = false;
        document.getElementById('equilibrioMens').textContent = `💥 ¡Perdiste! Puntos: ${puntosE}`;
        setTimeout(()=> volverAlMenu(), 900);
    }

    // controles tactiles: arrastra el dedo horizontalmente
    let tocando = false;
    let lastX = null;
    canvas.addEventListener('touchstart', (e)=>{
        e.preventDefault();
        tocando = true;
        lastX = e.touches[0].clientX;
    });
    canvas.addEventListener('touchmove', (e)=>{
        e.preventDefault();
        const x = e.touches[0].clientX;
        const delta = (x - lastX)/50;
        controlar(delta);
        lastX = x;
    });
    canvas.addEventListener('touchend', (e)=>{ tocando=false; lastX=null; });

    // mouse fallback
    canvas.addEventListener('mousedown', (e)=>{
        e.preventDefault();
        tocando = true;
        lastX = e.clientX;
    });
    window.addEventListener('mousemove', (e)=>{
        if(!tocando) return;
        const x = e.clientX;
        const delta = (x - lastX)/50;
        controlar(delta);
        lastX = x;
    });
    window.addEventListener('mouseup', ()=>{ tocando=false; lastX=null; });

    dib();
}

// ===================== Tragaperras===========
function tragaperrasHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🎰 Tragaperras</h2>
        <p>Saldo: $<span id="saldoSlot">100</span></p>
        <div id="slots" style="font-size:40px;margin:20px;">🍒 🍋 🍊</div>
        <button onclick="jugarTragaperras()">🎲 Jugar ($10)</button>
        <p id="mensajeSlot"></p>
        <button onclick="volverAlMenu()">⬅ Volver</button>
    </div>`;
}

let saldoSlot = 100;
function jugarTragaperras(){
    const icons = ['🍒','🍋','🍊','🍇','🍉','⭐','🔔','💎'];
    if(saldoSlot < 10){document.getElementById('mensajeSlot').textContent="💸 Sin saldo!";return;}
    saldoSlot -= 10;
    const result = [icons[Math.floor(Math.random()*icons.length)],icons[Math.floor(Math.random()*icons.length)],icons[Math.floor(Math.random()*icons.length)]];
    document.getElementById('slots').textContent = result.join(' ');
    let msg = "❌ Mala suerte!";
    if(result[0]===result[1] && result[1]===result[2]){
        saldoSlot += 100;
        msg = "🎉 ¡JACKPOT! +$100";
    } else if(result[0]===result[1] || result[1]===result[2]){
        saldoSlot += 20;
        msg = "✨ ¡Dos iguales! +$20";
    }
    document.getElementById('saldoSlot').textContent = saldoSlot;
    document.getElementById('mensajeSlot').textContent = msg;
}

// ============= HELICOPTERO==============
function helicopteroHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🚁 Helicóptero: Trivial Extremo</h2>
        <p>Contesta antes de que se acabe el tiempo. Tienes <b>3 vidas</b>.</p>
        <div id="preguntaHeli"></div>
        <div id="opcionesHeli"></div>
        <p id="tiempoHeli">⏳ Tiempo: 10</p>
        <p id="vidasHeli">❤️❤️❤️</p>
        <p id="mensajeHeli"></p>
        <button onclick="volverAlMenu()">⬅ Volver</button>
    </div>`;
    iniciarHelicopteroTrivia();
}

function iniciarHelicopteroTrivia() {
    const preguntas = [
        {
            q: "¿Cuál es el único mamífero capaz de volar de forma sostenida?",
            opciones: ["Murciélago", "Ardilla voladora", "Colibrí", "Pterodáctilo"],
            correcta: 0
        },
        {
            q: "¿Qué elemento químico tiene el símbolo ‘W’?",
            opciones: ["Wolframio", "Tungsteno", "Ambos son el mismo", "Ninguno"],
            correcta: 2
        },
        {
            q: "¿En qué año cayó Constantinopla?",
            opciones: ["1492", "1453", "1431", "1521"],
            correcta: 1
        },
        {
            q: "¿Qué número sigue en la secuencia? 2, 3, 5, 7, 11, 13, 17, ...",
            opciones: ["19", "21", "23", "25"],
            correcta: 2
        },
        {
            q: "¿Qué físico formuló la ecuación de la relatividad general?",
            opciones: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"],
            correcta: 2
        },
        {
            q: "¿Cuál es el idioma con más hablantes nativos del mundo?",
            opciones: ["Inglés", "Hindi", "Mandarín", "Español"],
            correcta: 2
        },
        {
            q: "¿Qué país tiene más volcanes activos?",
            opciones: ["Japón", "Indonesia", "Chile", "Estados Unidos"],
            correcta: 1
        },
        {
            q: "¿Cuánto dura un día en Venus (en horas terrestres)?",
            opciones: ["24", "243", "365", "117"],
            correcta: 1
        },
        {
            q: "¿Qué número romano representa 500?",
            opciones: ["D", "L", "C", "M"],
            correcta: 0
        },
        {
            q: "¿Quién escribió *El origen de las especies*?",
            opciones: ["Darwin", "Lamarck", "Wallace", "Pasteur"],
            correcta: 0
        },
        {
            q: "¿Qué matemático murió resolviendo el último teorema de Fermat?",
            opciones: ["Andrew Wiles", "Pierre de Fermat", "Euler", "Nadie, se resolvió en vida"],
            correcta: 3
        },
        {
            q: "¿Cuál es la capital de Bután?",
            opciones: ["Katmandú", "Thimbu", "Ulán Bator", "Islamabad"],
            correcta: 1
        },
        {
            q: "¿Qué planeta tiene el día más corto del sistema solar?",
            opciones: ["Saturno", "Júpiter", "Marte", "Neptuno"],
            correcta: 1
        },
        {
            q: "¿Cuál es el hueso más pequeño del cuerpo humano?",
            opciones: ["Estribo", "Martillo", "Yunque", "Estribillo"],
            correcta: 0
        },
        {
            q: "¿Cuál es el lago más profundo del mundo?",
            opciones: ["Titicaca", "Baikal", "Tanganyika", "Vostok"],
            correcta: 1
        }
    ];
preguntas.sort(() => Math.random() - 0.5); // Mezcla las preguntas

    let indice = 0;
    let vidas = 3;
    let tiempo = 10;
    let timer;

    function mostrarPregunta() {
        if (indice >= preguntas.length) {
            document.getElementById('mensajeHeli').textContent = "🏆 ¡Ganaste el Trivial Extremo!";
            clearInterval(timer);
            return;
        }
        const p = preguntas[indice];
        document.getElementById('preguntaHeli').innerHTML = `<h3>${p.q}</h3>`;
        document.getElementById('opcionesHeli').innerHTML = '';
        p.opciones.forEach((op, i) => {
            const btn = document.createElement('button');
            btn.textContent = op;
            btn.onclick = () => verificarRespuesta(i);
            btn.style.display = 'block';
            btn.style.margin = '6px auto';
            btn.style.padding = '10px 20px';
            btn.style.borderRadius = '6px';
            btn.style.border = 'none';
            btn.style.background = '#2196F3';
            btn.style.color = 'white';
            btn.style.fontSize = '16px';
            btn.onmouseover = () => btn.style.background = '#0b7dda';
            btn.onmouseout = () => btn.style.background = '#2196F3';
            document.getElementById('opcionesHeli').appendChild(btn);
        });
        iniciarTiempo();
    }

    function iniciarTiempo() {
        clearInterval(timer);
        tiempo = 10;
        document.getElementById('tiempoHeli').textContent = "⏳ Tiempo: " + tiempo;
        timer = setInterval(() => {
            tiempo--;
            document.getElementById('tiempoHeli').textContent = "⏳ Tiempo: " + tiempo;
            if (tiempo <= 0) {
                perderVida("⏰ ¡Tiempo agotado!");
            }
        }, 1000);
    }

    function verificarRespuesta(indiceSeleccionado) {
        const p = preguntas[indice];
        clearInterval(timer);
        if (indiceSeleccionado === p.correcta) {
            document.getElementById('mensajeHeli').textContent = "✅ Correcto!";
            indice++;
            setTimeout(mostrarPregunta, 1000);
        } else {
            perderVida("❌ Incorrecto!");
        }
    }

    function perderVida(mensaje) {
        vidas--;
        document.getElementById('mensajeHeli').textContent = mensaje;
        const corazones = "❤️".repeat(vidas) + "💔".repeat(3 - vidas);
        document.getElementById('vidasHeli').innerHTML = corazones;
        if (vidas <= 0) {
            clearInterval(timer);
            document.getElementById('mensajeHeli').textContent = "💀 Game Over";
        } else {
            indice++;
            setTimeout(mostrarPregunta, 1000);
        }
    }

    mostrarPregunta();
}


//==================UN SEGUNDO============
function unSegundoHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>⏱️ 1 Segundo Exacto</h2>
        <p>Pulsa "¡YA!" cuando creas que ha pasado 1 segundo desde que pulses "Empezar".</p>
        <button id="btnEmpezar">🎬 Empezar</button>
        <div id="mensajeUnSegundo" style="margin-top:15px;font-weight:bold;"></div>
        <button onclick="volverAlMenu()" style="margin-top:15px;">⬅ Volver</button>
    </div>`;

    const btnEmpezar = document.getElementById('btnEmpezar');
    btnEmpezar.onclick = empezarUnSegundo;
}

let startTime = 0;
function empezarUnSegundo() {
    const mensaje = document.getElementById('mensajeUnSegundo');
    mensaje.textContent = "⏳ Cronómetro iniciado...";

    // Crear botón "¡YA!" dinámicamente
    const btnYA = document.createElement('button');
    btnYA.textContent = "¡YA!";
    btnYA.style.display = 'block';
    btnYA.style.margin = '10px auto';
    btnYA.style.padding = '10px 20px';
    btnYA.style.fontSize = '16px';
    btnYA.style.borderRadius = '6px';
    btnYA.style.border = 'none';
    btnYA.style.backgroundColor = '#4CAF50';
    btnYA.style.color = 'white';

    main.appendChild(btnYA);

    // Iniciar tiempo
    startTime = performance.now();

    // Función al pulsar "¡YA!"
    btnYA.onclick = function () {
        const elapsed = (performance.now() - startTime) / 1000; // tiempo en segundos
        let mensajeFinal = `⏱️ Tiempo medido: ${elapsed.toFixed(2)} s. `;

        if (Math.abs(elapsed - 1) < 0.15) {
            mensajeFinal += "🎯 ¡Perfecto! Has acertado 1 segundo.";
        } else if (Math.abs(elapsed - 1) < 0.3) {
            mensajeFinal += "👍 Casi exacto, buen intento!";
        } else {
            mensajeFinal += "😅 Fallaste, inténtalo de nuevo.";
        }

        mensaje.textContent = mensajeFinal;
        btnYA.remove(); // quitar botón para reiniciar
    };

    // Para dispositivos táctiles
    btnYA.addEventListener('touchstart', btnYA.onclick);
}

//================ juego 2048============
function game2048HTML(){
    main.innerHTML=`
    <div class="juego" style="display:block;text-align:center;">
        <h2>🔢 2048</h2>
        <canvas id="canvas2048" width="200" height="200" style="background:#ccc;border-radius:8px;"></canvas>
        <p>Desliza o usa flechas</p>
        <button onclick="volverAlMenu()">⬅ Volver</button>
    </div>`;
    iniciar2048();
}

function iniciar2048(){
    const canvas=document.getElementById('canvas2048');
    const ctx=canvas.getContext('2d');
    let grid=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    añadirNumero();añadirNumero();
    dibujar();
    function añadirNumero(){
        let vacios=[];
        for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(grid[i][j]===0)vacios.push([i,j]);
        if(vacios.length===0)return;
        let [x,y]=vacios[Math.floor(Math.random()*vacios.length)];
        grid[x][y]=Math.random()<0.9?2:4;
    }
    function dibujar(){
        ctx.clearRect(0,0,200,200);
        for(let i=0;i<4;i++)for(let j=0;j<4;j++){
            ctx.fillStyle=grid[i][j]===0?'#eee':'#f9b233';
            ctx.fillRect(j*50,i*50,48,48);
            if(grid[i][j]!==0){
                ctx.fillStyle='#000';
                ctx.font='20px Arial';
                ctx.fillText(grid[i][j],j*50+15,i*50+30);
            }
        }
    }
    function mover(dir){
        let moved=false;
        function combinar(arr){
            arr=arr.filter(x=>x);
            for(let i=0;i<arr.length-1;i++)if(arr[i]===arr[i+1]){arr[i]*=2;arr[i+1]=0;}
            return arr.filter(x=>x);
        }
        for(let i=0;i<4;i++){
            let fila=[...grid[i]];
            if(dir==='left'){
                let nueva=combinar(fila);
                while(nueva.length<4)nueva.push(0);
                if(nueva.toString()!==fila.toString()){grid[i]=nueva;moved=true;}
            } else if(dir==='right'){
                let nueva=combinar(fila.reverse());
                while(nueva.length<4)nueva.push(0);
                nueva.reverse();
                if(nueva.toString()!==fila.toString()){grid[i]=nueva;moved=true;}
            }
        }
        if(dir==='up'||dir==='down'){
            for(let j=0;j<4;j++){
                let col=[grid[0][j],grid[1][j],grid[2][j],grid[3][j]];
                if(dir==='down')col.reverse();
                let nueva=combinar(col);
                while(nueva.length<4)nueva.push(0);
                if(dir==='down')nueva.reverse();
                for(let i=0;i<4;i++)if(grid[i][j]!==nueva[i]){grid[i][j]=nueva[i];moved=true;}
            }
        }
        if(moved){añadirNumero();dibujar();}
    }
    document.addEventListener('keydown',e=>{
        if(e.key==='ArrowLeft')mover('left');
        if(e.key==='ArrowRight')mover('right');
        if(e.key==='ArrowUp')mover('up');
        if(e.key==='ArrowDown')mover('down');
    });
    // Controles táctiles
    let startX,startY;
    canvas.addEventListener('touchstart',e=>{
        const t=e.touches[0];startX=t.clientX;startY=t.clientY;
    });
    canvas.addEventListener('touchend',e=>{
        const t=e.changedTouches[0];
        const dx=t.clientX-startX, dy=t.clientY-startY;
        if(Math.abs(dx)>Math.abs(dy)) mover(dx>0?'right':'left');
        else mover(dy>0?'down':'up');
    });
}
// -------------------- Juego: Calculadora Guay 🔥 --------------------
function calculadoraHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🧮 Calculadora Gay</h2>
        <input type="text" id="calcPantalla" readonly style="
            width:90%;
            padding:12px;
            font-size:20px;
            margin-bottom:10px;
            text-align:right;
            border-radius:10px;
            border:2px solid #4CAF50;
            background: #f0fff0;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
        ">
        <div style="
            display:grid;
            grid-template-columns: repeat(4, 1fr);
            gap:5px;
            max-width:350px;
            margin:0 auto;
        ">
            ${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(v=>{
                if(v==='=') return `<button onclick="calcCalcularFuego()" style="background-color:#ff9800;color:white;font-weight:bold;font-size:18px;">=</button>`;
                return `<button onclick="calcAgregarFuego('${v}')" style="background-color:#4CAF50;color:white;font-size:18px;border-radius:8px;">${v}</button>`;
            }).join('')}
            <button onclick="calcBorrarFuego()" style="grid-column: span 4; background-color:#f44336; color:white; font-size:18px; border-radius:8px;">C 🧹</button>
        </div>
        <p id="mensajeFuego" style="margin-top:10px; font-style:italic;">😎 Calcula y descubre sorpresas…</p>
        <button onclick="volverAlMenu()" style="
            margin-top:15px;
            padding:10px 20px;
            border:none;
            border-radius:8px;
            background-color:#2196F3;
            color:white;
            font-size:16px;
        ">⬅ Volver al menú</button>
    </div>`;
}

// Variables
let calcExpFuego = "";

// Funciones
function calcAgregarFuego(valor){
    calcExpFuego += valor;
    document.getElementById('calcPantalla').value = calcExpFuego;
}

function calcBorrarFuego(){
    calcExpFuego = "";
    document.getElementById('calcPantalla').value = "";
    document.getElementById('mensajeFuego').textContent = "😎 Calcula y descubre sorpresas…";
}

function calcCalcularFuego(){
    try {
        let resultado = eval(calcExpFuego);
        let mensaje = "✅ Correcto!";
        if(resultado === 69) {
            mensaje = "🔥 ¡Nice! 🔥";
        }
        document.getElementById('calcPantalla').value = resultado;
        document.getElementById('mensajeFuego').textContent = mensaje;
        calcExpFuego = resultado.toString();
    } catch (e) {
        document.getElementById('calcPantalla').value = "Error 💀";
        document.getElementById('mensajeFuego').textContent = "🤯 Algo salió mal...";
        calcExpFuego = "";
    }
}

