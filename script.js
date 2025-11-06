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
        case 'bola':  bolaHTML();   break;
        case 'calculadora': calculadoraHTML(); break;
         case 'banderas': banderasHTML(); break;
         case 'blackjac': blackjackHTML(); break;
         case 'capitales': capitalesHTML(); break;
         case 'ruleta': ruletaHTML(); break;
          case 'carrera': carreraHTML(); break;
        case 'perro2': perro2HTML(); break;
        case 'toque': toqueHTML(); break;
          case 'roboGemas': roboGemasHTML(); break;
        case 'pillaPilla': pillaPillaHTML(); break;
        case 'preguntas': preguntasHTML(); break;



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

// ===================== JUEGOS =====================

// -------- Juego 1: Adivina el Número --------
let numeroSecreto = Math.floor(Math.random()*10)+1;

function adivinaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>🎲 Adivina el Número</h2>
        <p>Haz clic en un número entre 1 y 10:</p>
        <div id="botonesNumeros" style="display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin:10px 0;"></div>
        <p id="mensaje" style="font-size:16px; font-weight:bold;"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;

    const contenedor = document.getElementById("botonesNumeros");
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.style.width = "40px";
        btn.style.height = "40px";
        btn.style.fontSize = "16px";
        btn.style.cursor = "pointer";
        btn.onclick = () => adivinar(i);
        contenedor.appendChild(btn);
    }
}

function adivinar(valor) {
    const mensaje = document.getElementById('mensaje');
    if(valor === numeroSecreto){
        mensaje.textContent="🎉 ¡Correcto, polla vieja!";
        numeroSecreto = Math.floor(Math.random()*10)+1; // reinicia número
    }
    else if(valor < numeroSecreto){
        mensaje.textContent="⬆️ Más alto";
    } 
    else {
        mensaje.textContent="⬇️ Más bajo";
    }
}


// -------- Juego 2: Piedra Papel Tijeras --------
let pptModo = 'pc'; // 'pc' o '2jugadores'

function pptHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>✊ Piedra, 🖐 Papel, ✌ Tijeras</h2>
        <p>Elige modo de juego:</p>
        <div style="margin-bottom:15px;">
            <button onclick="iniciarPPT('pc')">💻 Contra PC</button>
            <button onclick="iniciarPPT('2jugadores')">👥 2 Jugadores</button>
        </div>
        <div id="pantallaPPT"></div>
        <p id="resultado" style="font-weight:bold; margin-top:10px;"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
}

let eleccion1 = null;

function iniciarPPT(modo) {
    pptModo = modo;
    eleccion1 = null;
    const pantalla = document.getElementById('pantallaPPT');
    const opciones = ['piedra', 'papel', 'tijeras'];
    pantalla.innerHTML = '';

    if (modo === 'pc') {
        // Contra computadora
        opciones.forEach(op => {
            const btn = document.createElement('button');
            btn.textContent = op === 'piedra' ? '✊ Piedra' : op === 'papel' ? '🖐 Papel' : '✌ Tijeras';
            btn.style.margin = '5px';
            btn.style.padding = '8px 12px';
            btn.style.fontSize = '16px';
            btn.onclick = () => pptJugarPC(op);
            pantalla.appendChild(btn);
        });
    } else {
        // 2 jugadores local
        pantalla.innerHTML = '<p>Jugador 1: Elige tu opción</p>';
        opciones.forEach(op => {
            const btn = document.createElement('button');
            btn.textContent = op === 'piedra' ? '✊ Piedra' : op === 'papel' ? '🖐 Papel' : '✌ Tijeras';
            btn.style.margin = '5px';
            btn.style.padding = '8px 12px';
            btn.style.fontSize = '16px';
            btn.onclick = () => pptJugador1(op);
            pantalla.appendChild(btn);
        });
    }
}

// --- Modo PC ---
function pptJugarPC(eleccion) {
    const opciones = ['piedra','papel','tijeras'];
    const comp = opciones[Math.floor(Math.random()*3)];
    let texto = `Tú: ${eleccion}, Computadora: ${comp}. `;
    if(eleccion===comp) texto+="😐 Empate";
    else if((eleccion==='piedra'&&comp==='tijeras')||(eleccion==='papel'&&comp==='piedra')||(eleccion==='tijeras'&&comp==='papel')) texto+="🎉 Ganaste!";
    else texto+="💻 Perdiste!";
    document.getElementById('resultado').textContent = texto;
}

// --- Modo 2 Jugadores ---
function pptJugador1(eleccion) {
    eleccion1 = eleccion;
    const pantalla = document.getElementById('pantallaPPT');
    pantalla.innerHTML = '<p>Jugador 2: Elige tu opción</p>';
    const opciones = ['piedra', 'papel', 'tijeras'];
    opciones.forEach(op => {
        const btn = document.createElement('button');
        btn.textContent = op === 'piedra' ? '✊ Piedra' : op === 'papel' ? '🖐 Papel' : '✌ Tijeras';
        btn.style.margin = '5px';
        btn.style.padding = '8px 12px';
        btn.style.fontSize = '16px';
        btn.onclick = () => pptJugador2(op);
        pantalla.appendChild(btn);
    });
}

function pptJugador2(eleccion2) {
    const opciones = ['piedra','papel','tijeras'];
    let texto = `Jugador 1: ${eleccion1}, Jugador 2: ${eleccion2}. `;
    if(eleccion1===eleccion2) texto+="😐 Empate";
    else if((eleccion1==='piedra'&&eleccion2==='tijeras')||(eleccion1==='papel'&&eleccion2==='piedra')||(eleccion1==='tijeras'&&eleccion2==='papel')) texto+="🎉 Jugador 1 gana!";
    else texto+="🎉 Jugador 2 gana!";
    document.getElementById('resultado').textContent = texto;

    // Reinicia para la siguiente partida
    const pantalla = document.getElementById('pantallaPPT');
    pantalla.innerHTML = '';
    setTimeout(() => iniciarPPT('2jugadores'), 1500);
}


// -------- Juego 3: Trivia --------
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
        { q: "¿El agua hierve a 90°C en condiciones normales?", a: "no" },
        { q: "¿Cuál es el país con más habitantes del planeta?", a: "china" },
        { q: "¿Qué gas permite la respiración?", a: "oxígeno" },
        { q: "¿El desierto del Sahara está en Asia?", a: "no" },
        { q: "¿Cuál es la capital de Bután?", a: "thimbu" },
        { q: "¿Qué físico formuló la ecuación de campo gravitatorio?", a: "einstein" },
        { q: "¿Cuál es el país con más volcanes activos?", a: "indonesia" }
    ],

    "Deportes": [
        { q: "¿Cuántos minutos dura un partido de fútbol profesional?", a: "90" },
        { q: "¿En qué deporte se usa una tabla sobre el agua?", a: "surf" },
        { q: "¿Cuántas canastas hay en una cancha de baloncesto?", a: "2" },
        { q: "¿Quién ganó más mundiales de fútbol?", a: "brasil" },
        { q: "¿En qué país se originó el boxeo moderno?", a: "inglaterra" },
        { q: "¿Cuántos sets necesita ganar un jugador para ganar un partido de tenis?", a: "2" },
        { q: "¿El golf se juega con una pelota cuadrada?", a: "no" },
        { q: "¿Qué corredor ganó más campeonatos de Fórmula 1?", a: "michael schumacher" },
        { q: "¿El baloncesto fue inventado antes que el fútbol?", a: "no" },
        { q: "¿En qué deporte se utiliza una flecha?", a: "tiro con arco" },
        { q: "¿Cuántos jugadores tiene un equipo de voleibol en cancha?", a: "6" },
        { q: "¿Cuál es el récord de velocidad más alta en natación (100m libre) en segundos?", a: "46.91" },
        { q: "¿Quién tiene el récord de más medallas olímpicas?", a: "michael phelps" },
        { q: "¿En qué año se jugaron los primeros Juegos Olímpicos modernos?", a: "1896" }
    ],

    "Temas varios": [
        { q: "¿Cuál es el planeta más grande del sistema solar?", a: "júpiter" },
        { q: "¿Cuántos lados tiene un dodecágono?", a: "12" },
        { q: "¿Qué animal pone huevos pero no es un ave?", a: "ornitorrinco" },
        { q: "¿Cuál es el elemento químico del símbolo Fe?", a: "hierro" },
        { q: "¿Los murciélagos son ciegos?", a: "no" },
        { q: "¿Cuánto dura un día en la Tierra?", a: "24 horas" },
        { q: "¿Cuál es el país más largo del mundo?", a: "chile" },
        { q: "¿Qué órgano bombea la sangre?", a: "corazón" },
        { q: "¿El ser humano usa solo el 10% del cerebro?", a: "no" },
        { q: "¿Cuál es la capital de Australia?", a: "canberra" },
        { q: "¿Cuántas patas tiene un pulpo?", a: "8" },
        { q: "¿Cuál es el metal más ligero del mundo?", a: "litio" },
        { q: "¿Qué matemático es conocido por el Último Teorema?", a: "fermat" },
        { q: "¿Cuál es el océano más profundo del mundo?", a: "pacífico" }
    ]
};

let preguntasJuego = [], puntos = 0, preguntaActual = 0, temaActual = "";
let recordTrivia = { "Cultura general": 0, "Deportes": 0, "Temas varios": 0 };

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
        <p>Tu récord: <span id="recordTrivia">${recordTrivia[temaActual]}</span></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    
    mostrarPregunta();
}

function mostrarPregunta() {
    document.getElementById('pregunta').textContent = preguntasJuego[preguntaActual].q;
    document.getElementById('respuesta').value = "";
    document.getElementById('numPregunta').textContent = preguntaActual + 1;
}

// --- FUNCIÓN NUEVA para tolerar errores de escritura (distancia de Levenshtein) ---
function similitud(a, b) {
    a = a.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // quitar acentos
    b = b.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const m = [];
    for (let i = 0; i <= b.length; i++) m[i] = [i];
    for (let j = 0; j <= a.length; j++) m[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            m[i][j] = b.charAt(i-1) == a.charAt(j-1)
                ? m[i-1][j-1]
                : Math.min(m[i-1][j-1]+1, m[i][j-1]+1, m[i-1][j]+1);
        }
    }
    const distancia = m[b.length][a.length];
    const maxLen = Math.max(a.length, b.length);
    return 1 - distancia / maxLen;
}

function verificarRespuesta() {
    const r = document.getElementById('respuesta').value.toLowerCase().trim();
    const msg = document.getElementById('mensajeTrivia');
    const correcta = preguntasJuego[preguntaActual].a.toLowerCase();

    const parecidas = similitud(r, correcta);

    if (parecidas >= 0.75 || r === correcta) {
        puntos++;
        msg.textContent = "✅ ¡Correcto!";
    } else {
        msg.textContent = `❌ Era: ${correcta}`;
    }

    document.getElementById('puntos').textContent = puntos;
    preguntaActual++;

    if (preguntaActual < preguntasJuego.length) {
        setTimeout(mostrarPregunta, 1200);
    } else {
        setTimeout(() => {
            document.getElementById('pregunta').textContent = `🎉 ¡Fin del Trivia ${temaActual}! Has conseguido ${puntos}/${preguntasJuego.length} puntos.`;
            document.getElementById('respuesta').style.display = "none";
            msg.textContent = "";

            if (puntos > recordTrivia[temaActual]) {
                recordTrivia[temaActual] = puntos;
            }
            document.getElementById('recordTrivia').textContent = recordTrivia[temaActual];

            const extraBtn = document.createElement('button');
            extraBtn.textContent = "🔁 Jugar otro tema";
            extraBtn.onclick = triviaHTML;
            document.querySelector('.juego').appendChild(extraBtn);
        }, 1200);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
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
    if(intentos < 3) {
        msg.textContent=`Has pulsado ${intentos} veces`;
    } else {
        msg.textContent="ERES UN MARICON!";
        // Reproducir sonido de risa
        const risa = new Audio("https://actions.google.com/sounds/v1/human/ha_ha_1.ogg");
        risa.play();
    }
}



// -------- Juego 5: Ruleta Casino --------
let saldo = 100;

function ruletaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🎰 Ruleta Casino (Versión Europea Realista)</h2>
        <p>Saldo: $<span id="saldo">${saldo}</span></p>

        <p>💵 Selecciona tu apuesta:</p>
        <input type="number" id="apuesta" placeholder="Cantidad a apostar" style="width:100px;">

        <div style="margin:10px 0;">
            <button onclick="girarRuleta('rojo')">🔴 Rojo</button>
            <button onclick="girarRuleta('negro')">⚫ Negro</button>
            <button onclick="girarRuleta('verde')">🟢 Verde (0)</button>
        </div>

        <div style="margin:10px 0;">
            <button onclick="girarRuleta('par')">🔢 Par</button>
            <button onclick="girarRuleta('impar')">🧮 Impar</button>
        </div>

        <div style="margin:10px 0;">
            <button onclick="girarRuleta('docena1')">1️⃣ 1ª Docena (1–12)</button>
            <button onclick="girarRuleta('docena2')">2️⃣ 2ª Docena (13–24)</button>
            <button onclick="girarRuleta('docena3')">3️⃣ 3ª Docena (25–36)</button>
        </div>

        <div style="margin:10px 0;">
            <button onclick="girarRuleta('vecinos0')">🎯 Vecinos del 0</button>
            <button onclick="girarRuleta('huerfanos')">💥 Huérfanos</button>
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

// Orden real de ruleta europea
const numerosRuleta = [
    0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,
    10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26
];

// Colores
const coloresRuleta = numerosRuleta.map(n => {
    if (n === 0) return "green";
    const rojos = [32,19,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3];
    return rojos.includes(n) ? "red" : "black";
});

// Grupos especiales
const vecinosDel0 = [12,35,3,26,0,32,15,19,4,21,2,25];
const huerfanos = [1,20,14,31,9,17,34,6];

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

    const total = numerosRuleta.length;
    const indiceGanador = Math.floor(Math.random() * total);
    const numeroGanador = numerosRuleta[indiceGanador];
    const colorGanador = coloresRuleta[indiceGanador];

    // Ángulos y animación
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

        if (velocidad < 0.01) {
            const diff = objetivo - angle;
            if (Math.abs(diff) < 0.02) angle = objetivo;
            else angle += diff * 0.25;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarRuletaGirada(ctx, angle);

        if (angle < objetivo - 0.001) {
            requestAnimationFrame(step);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujarRuletaGirada(ctx, objetivo);

            let ganancia = 0;

            // ------- Tipos de apuestas -------
            if (apuestaTipo === "numero" && !isNaN(numApuesta)) {
                if (numApuesta === numeroGanador) ganancia = cantidad * 36;
            } 
            else if (apuestaTipo === "rojo" && colorGanador === "red") ganancia = cantidad * 2;
            else if (apuestaTipo === "negro" && colorGanador === "black") ganancia = cantidad * 2;
            else if (apuestaTipo === "verde" && colorGanador === "green") ganancia = cantidad * 14;
            else if (apuestaTipo === "par" && numeroGanador !== 0 && numeroGanador % 2 === 0) ganancia = cantidad * 2;
            else if (apuestaTipo === "impar" && numeroGanador % 2 === 1) ganancia = cantidad * 2;
            else if (apuestaTipo === "docena1" && numeroGanador >= 1 && numeroGanador <= 12) ganancia = cantidad * 3;
            else if (apuestaTipo === "docena2" && numeroGanador >= 13 && numeroGanador <= 24) ganancia = cantidad * 3;
            else if (apuestaTipo === "docena3" && numeroGanador >= 25 && numeroGanador <= 36) ganancia = cantidad * 3;

            // Vecinos del 0 (modo realista)
            else if (apuestaTipo === "vecinos0") {
                const porNumero = cantidad / vecinosDel0.length;
                if (vecinosDel0.includes(numeroGanador)) ganancia = porNumero * 36;
            }

            // Huérfanos (modo realista)
            else if (apuestaTipo === "huerfanos") {
                const porNumero = cantidad / huerfanos.length;
                if (huerfanos.includes(numeroGanador)) ganancia = porNumero * 36;
            }

            saldo = saldo - cantidad + ganancia;
            document.getElementById('saldo').textContent = saldo;

            msg.innerHTML = `
                🎡 Resultado: <b>${numeroGanador}</b> (${colorGanador})<br>
                ${ganancia > 0 ? "🎉 ¡Ganaste $" + ganancia.toFixed(2) + "!" : "💸 Perdiste $" + cantidad}
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



// -------------------- Juego 5: Caballo Ganador --------------------
function caballoHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🏇 Caballo Ganador</h2>
        <p>💰 Dinero: $<span id="dineroCaballo">100</span></p>
        <p>Elige un caballo y la cantidad a apostar:</p>
        <div id="apuestasCaballo" style="display:flex; justify-content:center; gap:10px; margin-bottom:10px;">
            <button onclick="seleccionarCaballo(0)" style="padding:8px 15px; border-radius:8px; background:#FF0000; color:white;">1</button>
            <button onclick="seleccionarCaballo(1)" style="padding:8px 15px; border-radius:8px; background:#00AA00; color:white;">2</button>
            <button onclick="seleccionarCaballo(2)" style="padding:8px 15px; border-radius:8px; background:#0000FF; color:white;">3</button>
            <button onclick="seleccionarCaballo(3)" style="padding:8px 15px; border-radius:8px; background:#FFAA00; color:white;">4</button>
            <button onclick="seleccionarCaballo(4)" style="padding:8px 15px; border-radius:8px; background:#AA00FF; color:white;">5</button>
        </div>
        <input id="cantidadApuesta" type="number" placeholder="Cantidad a apostar" style="padding:6px 10px; border-radius:6px; width:150px; margin-bottom:10px;">
        <canvas id="caballoCanvas" width="600" height="300" style="border:2px solid #222; border-radius:12px;"></canvas>
        <p id="mensajeCarrera" style="font-weight:bold; margin-top:10px;"></p>
        <button onclick="iniciarCarreraCaballos()" style="
            margin-top:10px; padding:10px 20px; border:none; border-radius:8px;
            background-color:#2196F3; color:white; font-size:16px;">🏁 Iniciar Carrera</button>
        <button onclick="volverAlMenu()" style="
            margin-top:10px; padding:10px 20px; border:none; border-radius:8px;
            background-color:#f44336; color:white; font-size:16px;">⬅ Volver al menú</button>
    </div>`;

    dinero = 100;
    document.getElementById('dineroCaballo').textContent = dinero;
    apuestaActual = null;
    cantidadApuesta = 0;
    carreraEnCurso = false;
}

// ---------------- Variables Globales ----------------
let caballos = [];
let dinero = 100;
let apuestaActual = null;
let cantidadApuesta = 0;
let carreraEnCurso = false;

// ---------------- Funciones ----------------
function seleccionarCaballo(num){
    if(carreraEnCurso){ 
        alert("⏳ La carrera ya está en curso"); 
        return; 
    }
    apuestaActual = num;
    document.getElementById('mensajeCarrera').textContent = `💸 Has seleccionado el caballo ${num+1}`;
}

function iniciarCarreraCaballos(){
    if(carreraEnCurso){
        alert("⏳ La carrera ya está en curso");
        return;
    }
    if(apuestaActual === null){
        alert("⚠️ Debes seleccionar un caballo primero");
        return;
    }

    let cantidadInput = parseInt(document.getElementById('cantidadApuesta').value);
    if(isNaN(cantidadInput) || cantidadInput <= 0){
        alert("⚠️ Ingresa una cantidad válida");
        return;
    }
    if(cantidadInput > dinero){
        alert("⚠️ No tienes suficiente dinero");
        return;
    }

    cantidadApuesta = cantidadInput;

    const canvas = document.getElementById('caballoCanvas');
    const ctx = canvas.getContext('2d');
    const colores = ["#FF0000","#00AA00","#0000FF","#FFAA00","#AA00FF"];
    const yBase = [50,100,150,200,250];

    caballos = [];

    for(let i=0;i<5;i++){
        caballos.push({
            x:0,
            y:yBase[i],
            velocidad:1.5 + Math.random()*2, // velocidad base distinta
            color:colores[i],
        });
    }

    const meta = canvas.width - 50;
    carreraEnCurso = true;
    document.getElementById('mensajeCarrera').textContent = "🏇 Carrera en curso...";

    function dibujarCaballo(c) {
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y-10, 40, 20); // cuerpo
        ctx.fillStyle = "#000";
        ctx.fillRect(c.x+30, c.y-15, 10, 10); // cabeza
        ctx.fillRect(c.x+5, c.y+10, 5, 10); // patas traseras
        ctx.fillRect(c.x+25, c.y+10, 5, 10); // patas delanteras
    }

    function dibujar(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#222";
        ctx.fillRect(meta,0,4,canvas.height); // meta
        caballos.forEach(c=>dibujarCaballo(c));
    }

    function actualizar(){
        caballos.forEach(c=>{
            c.x += c.velocidad + (Math.random()*0.4-0.2); // variación natural
            if(c.x>meta) c.x = meta;
        });

        dibujar();

        const ganadores = caballos.filter(c=>c.x >= meta);
        if(ganadores.length>0){
            carreraEnCurso = false;
            const ganador = ganadores.reduce((a,b)=>a.x>=b.x?a:b);
            const mensaje = document.getElementById('mensajeCarrera');

            if(apuestaActual === caballos.indexOf(ganador)){
                // Ganancia proporcional a la apuesta
                let premio = Math.floor(cantidadApuesta * (4 + Math.random()));
                dinero += premio;
                mensaje.textContent = `🏆 Ganaste! El caballo ganador es ${colores[ganador.color]} (+$${premio})`;
            } else {
                dinero -= cantidadApuesta;
                mensaje.textContent = `💥 Perdiste. El caballo ganador es ${colores[ganador.color]}. -$${cantidadApuesta}`;
            }
            document.getElementById('dineroCaballo').textContent = dinero;
            apuestaActual = null;
            cantidadApuesta = 0;
            document.getElementById('cantidadApuesta').value = "";
        }
    }

    function bucle(){
        if(carreraEnCurso){
            actualizar();
            requestAnimationFrame(bucle);
        }
    }

    bucle();
}


// -------- Juego 6: Reflejos Ninja --------
let mejorTiempo = null;
let esperandoVerde = false;
let inicioVerde = 0;
let combo = 0;

function reflejosHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>⚡ Reflejos Ninja</h2>
        <div id="cuadro" style="width:100px;height:100px;margin:30px auto;background-color:red;border-radius:8px;cursor:pointer;" onclick="golpear()"></div>
        <p id="mensajeReflejos">Toca el cuadrado verde lo más rápido posible!</p>
        <p id="recordReflejos">🏆 Mejor tiempo: --</p>
        <button onclick="reiniciarReflejos()">🔁 Reiniciar</button>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    cambiarColorReflejos();
}

function cambiarColorReflejos() {
    const cuadro = document.getElementById('cuadro');
    if (!cuadro) return;

    cuadro.style.backgroundColor = 'red';
    cuadro.style.cursor = 'not-allowed';
    document.getElementById('mensajeReflejos').textContent = "Espera que se ponga verde...";
    esperandoVerde = true;

    const espera = Math.random() * 2000 + 1000; // entre 1 y 3 segundos
    setTimeout(() => {
        const colores = ['green', 'lime', 'yellowgreen'];
        const tam = Math.floor(Math.random() * 40) + 80; // tamaño aleatorio 80–120px
        cuadro.style.width = `${tam}px`;
        cuadro.style.height = `${tam}px`;
        cuadro.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        cuadro.style.cursor = 'pointer';

        esperandoVerde = false;
        inicioVerde = performance.now(); // momento exacto
    }, espera);
}

function golpear() {
    const cuadro = document.getElementById('cuadro');
    const msg = document.getElementById('mensajeReflejos');

    if (esperandoVerde) {
        msg.textContent = "⛔ Muy pronto! Espera al verde...";
        combo = 0;
        cambiarColorReflejos();
        return;
    }

    const tiempoReaccion = performance.now() - inicioVerde;
    cuadro.style.backgroundColor = 'red';

    msg.textContent = `⚡ Tiempo de reacción: ${Math.round(tiempoReaccion)} ms`;

    // Actualizar récord
    if (mejorTiempo === null || tiempoReaccion < mejorTiempo) {
        mejorTiempo = tiempoReaccion;
        document.getElementById('recordReflejos').textContent = `🏆 Mejor tiempo: ${Math.round(mejorTiempo)} ms`;
        msg.textContent += " 🥇 ¡Nuevo récord!";
    }

    // Sistema de combos
    if (tiempoReaccion < 300) combo++;
    else combo = 0;

    if (combo >= 3) msg.textContent += ` 🔥 Combo x${combo}!`;
    else if (combo === 2) msg.textContent += " ⚡ Vas rápido!";

    cambiarColorReflejos();
}

function reiniciarReflejos() {
    mejorTiempo = null;
    combo = 0;
    document.getElementById('mensajeReflejos').textContent = "Toca el cuadrado verde lo más rápido posible!";
    document.getElementById('recordReflejos').textContent = "🏆 Mejor tiempo: --";
    cambiarColorReflejos();
}

// -------- Juego 7: Memoria Exprés  --------
function memoriaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🟢 Memoria Exprés</h2>
        <div id="tableroMemoria" 
             style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;
                    justify-content:center;margin:10px auto;max-width:350px;"></div>
        <p id="mensajeMemoria" style="text-align:center;font-weight:bold;"></p>
        <p id="mejorPuntaje" style="text-align:center;">🏆 Mejor puntuación: <span id="puntajeMax">0</span></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarMemoria();
}

let puntajeMax = 0;

function iniciarMemoria(){
    const tablero = document.getElementById('tableroMemoria');
    const mensaje = document.getElementById('mensajeMemoria');
    const maxSpan = document.getElementById('puntajeMax');

    const emojis = ['🐶','🐱','🐭','🐸','🐢','🦊','🐼','🐰','🐵','🦁'];
    let cartas = [...emojis, ...emojis]
        .sort(()=>Math.random()-0.5)
        .map((emoji, i)=>({id:i, emoji, volteada:false, encontrada:false}));
    
    let seleccionadas = [];
    let aciertos = 0;

    tablero.innerHTML = '';
    mensaje.textContent = '';

    // Detectar ancho de pantalla para ajustar tamaño de cartas
    let anchoCarta = Math.min(70, window.innerWidth / 6);
    let fuenteCarta = Math.floor(anchoCarta * 0.5);

    // Ajuste de columnas para móvil
    let columnas = window.innerWidth < 400 ? 4 : 5;
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    tablero.style.gap = `${Math.floor(anchoCarta/10)}px`;
    tablero.style.maxWidth = `${columnas * (anchoCarta + Math.floor(anchoCarta/10))}px`;

    cartas.forEach(c=>{
        const div = document.createElement('div');
        div.className = 'cartaMemoria';
        div.style.width = `${anchoCarta}px`;
        div.style.height = `${anchoCarta}px`;
        div.style.borderRadius = '10px';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.fontSize = `${fuenteCarta}px`;
        div.style.backgroundColor = '#1976D2';
        div.style.color = 'transparent';
        div.style.transition = 'transform 0.25s, background-color 0.25s';
        div.style.cursor = 'pointer';
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
                const [c1,c2] = seleccionadas;
                if(c1.emoji === c2.emoji){
                    c1.encontrada = c2.encontrada = true;
                    aciertos++;
                    if(aciertos === emojis.length){
                        mensaje.textContent = "🎉 ¡Ganaste! Has encontrado todos los pares.";
                        if(aciertos > puntajeMax) {
                            puntajeMax = aciertos;
                            maxSpan.textContent = puntajeMax;
                        }
                    }
                } else {
                    setTimeout(()=>{
                        c1.volteada = c2.volteada = false;
                        c1.el.textContent = '';
                        c2.el.textContent = '';
                        c1.el.style.backgroundColor = '#1976D2';
                        c2.el.style.backgroundColor = '#1976D2';
                    }, 400);
                }
                seleccionadas = [];
            }, 400);
        }
    }

    // Actualiza tamaño si cambia la orientación o ancho
    window.addEventListener('resize', ()=>{
        let anchoCarta = Math.min(70, window.innerWidth / 6);
        let fuenteCarta = Math.floor(anchoCarta * 0.5);
        let columnas = window.innerWidth < 400 ? 4 : 5;
        tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
        tablero.style.gap = `${Math.floor(anchoCarta/10)}px`;
        tablero.style.maxWidth = `${columnas * (anchoCarta + Math.floor(anchoCarta/10))}px`;

        cartas.forEach(c=>{
            c.el.style.width = `${anchoCarta}px`;
            c.el.style.height = `${anchoCarta}px`;
            c.el.style.fontSize = `${fuenteCarta}px`;
        });
    });
}


// -------- Juego 8: Saltos del Gato Extremo  --------
function saltosHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>🐱 Saltos del Gato Extremo</h2>
        <canvas id="gatoCanvas" width="320" height="160" style="border:1px solid #000; touch-action:none; background:#d0f4f7;"></canvas>
        <p>Puntos: <span id="puntosGato">0</span> | Récord: <span id="recordGato">${localStorage.getItem('recordGato') || 0}</span></p>
        <p id="mensajeGato"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    saltosJuegoExtremo();
}

function saltosJuegoExtremo(){
    const canvas = document.getElementById('gatoCanvas');
    const ctx = canvas.getContext('2d');
    let gato = {x:40, y:130, vy:0, size:25, saltando:false, color:'orange'};
    let obstaculos = [];
    let monedas = [];
    let sueloY = 150;
    let puntos = 0;
    let velocidad = 4;
    let velocidadExtra = 0; // pico de velocidad
    let gravedad = 0.6;
    let enJuego = true;
    let tiempoObstaculo = 0;
    let tiempoMoneda = 150;
    let ultimaFrame = performance.now();
    let cicloDia = 0;
    let mensajeActivo = 0;

    // Sonidos simples (generados con AudioContext)
    function sonido(frecuencia, duracion){
        const ctxA = new (window.AudioContext||window.webkitAudioContext)();
        const o = ctxA.createOscillator();
        const g = ctxA.createGain();
        o.connect(g);
        g.connect(ctxA.destination);
        o.frequency.value = frecuencia;
        o.type = 'square';
        o.start();
        o.stop(ctxA.currentTime + duracion);
        g.gain.exponentialRampToValueAtTime(0.00001, ctxA.currentTime + duracion);
    }

    // Función para iniciar un pico de velocidad
    function picoVelocidad(){
        velocidadExtra = 3 + Math.random()*2; // velocidad extra entre 3 y 5
        setTimeout(() => {
            velocidadExtra = 0; // vuelve a normal después de 3 segundos
            // programa otro pico aleatorio entre 4 y 8 segundos
            if(enJuego) setTimeout(picoVelocidad, 4000 + Math.random()*4000);
        }, 3000);
    }

    // inicia primer pico aleatorio
    setTimeout(picoVelocidad, 4000 + Math.random()*4000);

    function dibujar(now){
        const dt = now - ultimaFrame;
        ultimaFrame = now;
        cicloDia += dt / 1000;
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // Fondo: alterna día y noche
        const esNoche = Math.floor(cicloDia / 20) % 2 === 1;
        ctx.fillStyle = esNoche ? "#001d3d" : "#a8e6cf";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // Sol o Luna
        ctx.beginPath();
        ctx.arc(270, 30, 15, 0, Math.PI*2);
        ctx.fillStyle = esNoche ? "white" : "yellow";
        ctx.fill();

        // Suelo
        ctx.fillStyle="#654321";
        ctx.fillRect(0,sueloY-5,canvas.width,10);

        // Gato con animación simple
        if(gato.saltando) gato.color = '#ffb347';
        else gato.color = 'orange';
        ctx.fillStyle = gato.color;
        ctx.fillRect(gato.x, gato.y, gato.size, gato.size);
        // Cola oscilante
        ctx.fillStyle = '#cc6600';
        const colaY = gato.y + (Math.sin(Date.now()/100) * 3);
        ctx.fillRect(gato.x-8, colaY + 5, 8, 4);

        // Obstáculos
        ctx.fillStyle='brown';
        obstaculos.forEach(o=>{
            ctx.fillRect(o.x,o.y,o.w,o.h);
            o.x -= (velocidad + velocidadExtra) * (dt/16);
        });
        obstaculos = obstaculos.filter(o => o.x + o.w > -10);

        // Monedas
        ctx.fillStyle='gold';
        monedas.forEach(m=>{
            ctx.beginPath();
            ctx.arc(m.x, m.y, 6, 0, Math.PI*2);
            ctx.fill();
            m.x -= (velocidad + velocidadExtra) * (dt/16);
        });
        monedas = monedas.filter(m => m.x > -10);

        // Generar obstáculos
        tiempoObstaculo -= dt/16;
        if(tiempoObstaculo <= 0){
            let alto = Math.random() > 0.5 ? 20 : 35;
            obstaculos.push({x:canvas.width + Math.random()*30, y:sueloY - alto, w:20 + Math.random()*10, h:alto});
            tiempoObstaculo = 50 + Math.random()*60 - Math.min(30, Math.floor(puntos/10));
        }

        // Generar monedas
        tiempoMoneda -= dt/16;
        if(tiempoMoneda <= 0){
            monedas.push({x:canvas.width + 10, y:sueloY - (50 + Math.random()*40)});
            tiempoMoneda = 120 + Math.random()*100;
        }

        // Gravedad y movimiento
        gato.vy += gravedad * (dt/16);
        gato.y += gato.vy * (dt/16);
        if(gato.y > sueloY - gato.size){
            gato.y = sueloY - gato.size;
            gato.vy = 0;
            gato.saltando = false;
        }

        // Colisiones
        for(let o of obstaculos){
            if(gato.x < o.x + o.w && gato.x + gato.size > o.x &&
               gato.y < o.y + o.h && gato.y + gato.size > o.y){
                sonido(80, 0.2);
                finDelJuego();
                return;
            }
        }

        // Monedas recogidas
        monedas.forEach((m,i)=>{
            const dx = (gato.x + gato.size/2) - m.x;
            const dy = (gato.y + gato.size/2) - m.y;
            if(Math.sqrt(dx*dx+dy*dy) < 20){
                puntos += 10;
                monedas.splice(i,1);
                sonido(600,0.1);
                document.getElementById('mensajeGato').textContent = "💰 ¡Moneda!";
                mensajeActivo = 20;
            }
        });

        // Puntuación
        puntos += 0.03 * (dt/16);
        document.getElementById('puntosGato').textContent = Math.floor(puntos);

        // Dificultad
        if(Math.floor(puntos) % 80 === 0 && Math.floor(puntos) !== 0) velocidad += 0.002 * puntos;

        // Mensajes de ánimo
        if(mensajeActivo > 0){
            mensajeActivo--;
            if(mensajeActivo <= 0) document.getElementById('mensajeGato').textContent = "";
        } else if(Math.floor(puntos) % 100 === 0 && Math.floor(puntos)!==0){
            document.getElementById('mensajeGato').textContent = "🔥 ¡Sigue así!";
            mensajeActivo = 40;
        }

        if(enJuego) requestAnimationFrame(dibujar);
    }

    function saltar(){
        if(!gato.saltando){
            gato.vy = -11.5;
            gato.saltando = true;
            sonido(400, 0.1);
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

    canvas.addEventListener('click', saltar);
    canvas.addEventListener('touchstart', e => { e.preventDefault(); saltar(); });

    requestAnimationFrame(dibujar);
}

// -------- Juego 9: Caza Estrellas Extremo --------
function cazaHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🌟 Caza Estrellas Extremo</h2>
        <canvas id="estrellaCanvas" width="300" height="300" style="background:#000;border-radius:10px;"></canvas>
        <p>Puntos: <span id="puntosEstrella">0</span></p>
        <p>Tiempo restante: <span id="tiempoEstrella">60</span>s</p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    cazaJuego();
}

function cazaJuego(){
    const canvas=document.getElementById('estrellaCanvas');
    const ctx=canvas.getContext('2d');
    let puntos=0;
    let tiempo=60;
    let radio=20;
    let tiempoMostrar=2200;
    let estrellaActiva=true;
    let tipo="normal";
    let x=0, y=0;
    let intervaloJuego;
    let fallos=0; // cuenta de clics fallidos

    const sonidos = {
        acierto: new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"),
        fallo: new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"),
        bonus: new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg")
    };

    function nuevaEstrella(){
        if(!estrellaActiva) return;
        x=Math.random()*(canvas.width-2*radio);
        y=Math.random()*(canvas.height-2*radio);
        tipo = Math.random() < 0.15 ? "bonus" : "normal";
        dibujar();
        setTimeout(()=>{
            if(estrellaActiva){
                nuevaEstrella(); // aparece la siguiente estrella
            }
        }, tiempoMostrar);
    }

    function dibujar(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.fillStyle = (tipo === "bonus") ? "red" : "yellow";
        ctx.arc(x+radio,y+radio,radio,0,Math.PI*2);
        ctx.shadowBlur = 15;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    canvas.onclick=(e)=>{
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX-rect.left;
        const my = e.clientY-rect.top;
        if(mx>x && mx<x+2*radio && my>y && my<y+2*radio){
            // Clic correcto
            puntos += (tipo==="bonus") ? 3 : 1;
            actualizarPuntos();
            sonidos.acierto.play();
            // aumenta dificultad despacio
            tiempoMostrar = Math.max(700, tiempoMostrar - 15);
            radio = Math.max(12, radio - 0.05);
            nuevaEstrella();
        } else {
            // Clic fuera de estrella
            fallos++;
            if(fallos % 2 === 0){ // cada 2 clics fuera, resta 1 punto
                puntos = Math.max(0, puntos-1);
                actualizarPuntos();
                sonidos.fallo.play();
            }
        }
    }

    function actualizarPuntos(){
        document.getElementById('puntosEstrella').textContent=puntos;
    }

    intervaloJuego = setInterval(()=>{
        tiempo--;
        document.getElementById('tiempoEstrella').textContent=tiempo;
        if(tiempo<=0){
            finDelJuego();
        }
    },1000);

    function finDelJuego(){
        estrellaActiva=false;
        clearInterval(intervaloJuego);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#fff";
        ctx.font="20px Arial";
        ctx.textAlign="center";
        ctx.fillText(`🎮 ¡Fin del juego! Puntos: ${puntos}`, canvas.width/2, canvas.height/2);
        setTimeout(()=>volverAlMenu(),2000);
    }

    nuevaEstrella();
}


// =====================  JUEGO 10: HISTORIA MISTERIOSA =====================
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
// ===================== JUEGO 11: MINI SNAKE =====================
function snakeHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🐍 Mini Snake</h2>
        <canvas id="snakeCanvas" width="300" height="300" style="border:2px solid #228B22; background:linear-gradient(#e0ffe0,#a0ffa0); border-radius:12px;"></canvas>
        <p style="text-align:center; margin:5px 0;">Puntos: <span id="puntosSnake">0</span> | Récord: <span id="recordSnake">${localStorage.getItem('recordSnake') || 0}</span></p>
        <p id="snakeMensaje" style="font-weight:bold; min-height:20px;"></p>
        <div id="controlesSnake" style="display:inline-block; text-align:center; margin-top:10px;">
            <div><button onclick="cambiarDireccion('up')" style="font-size:18px; padding:8px 12px; border-radius:6px;">⬆️</button></div>
            <div style="margin-top:5px;">
                <button onclick="cambiarDireccion('left')" style="font-size:18px; padding:8px 12px; border-radius:6px;">⬅️</button>
                <button onclick="cambiarDireccion('down')" style="font-size:18px; padding:8px 12px; border-radius:6px;">⬇️</button>
                <button onclick="cambiarDireccion('right')" style="font-size:18px; padding:8px 12px; border-radius:6px;">➡️</button>
            </div>
        </div>
        <div style="margin-top:10px; display:flex; justify-content:center; gap:10px;">
            <button onclick="volverAlMenu()" style="padding:8px 16px; font-size:16px; border-radius:6px; background:#228B22; color:white; border:none;">⬅ Volver al menú</button>
            <button onclick="iniciarSnake()" style="padding:8px 16px; font-size:16px; border-radius:6px; background:#FF6347; color:white; border:none;">🔁 Reiniciar</button>
        </div>
    </div>`;
    iniciarSnake();
}

let snake, comida, direccion, puntosSnake, intervaloSnake;

function iniciarSnake(){
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const tam = 15;
    const filas = canvas.height / tam;
    const columnas = canvas.width / tam;

    snake = [{x:Math.floor(columnas/2),y:Math.floor(filas/2)}];
    comida = {x:Math.floor(Math.random()*columnas), y:Math.floor(Math.random()*filas)};
    direccion = 'right';
    puntosSnake = 0;
    document.getElementById('puntosSnake').textContent = puntosSnake;
    document.getElementById('snakeMensaje').textContent = "🟢 ¡A jugar!";

    // Cargar récord
    let record = parseInt(localStorage.getItem('recordSnake') || 0);
    document.getElementById('recordSnake').textContent = record;

    function dibujar(){
        // fondo
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // snake
        snake.forEach((s,i)=>{
            ctx.fillStyle = i===0 ? "#006400" : "#32CD32";
            ctx.fillRect(s.x*tam, s.y*tam, tam-1, tam-1); 
        });

        // comida
        ctx.fillStyle = "#FF4500";
        ctx.fillRect(comida.x*tam, comida.y*tam, tam-1, tam-1);
    }

    function mover(){
        const cabeza = {x:snake[0].x, y:snake[0].y};

        if(direccion==='up') cabeza.y--;
        if(direccion==='down') cabeza.y++;
        if(direccion==='left') cabeza.x--;
        if(direccion==='right') cabeza.x++;

        // colisión con bordes
        if(cabeza.x<0 || cabeza.y<0 || cabeza.x>=columnas || cabeza.y>=filas){finSnake(); return;}

        // colisión con cuerpo
        for(let s of snake){
            if(s.x===cabeza.x && s.y===cabeza.y){finSnake(); return;}
        }

        snake.unshift(cabeza);

        // comer comida
        if(cabeza.x===comida.x && cabeza.y===comida.y){
            puntosSnake++;
            document.getElementById('puntosSnake').textContent = puntosSnake;
            // actualizar récord si es superado
            if(puntosSnake > record){
                record = puntosSnake;
                localStorage.setItem('recordSnake', record);
                document.getElementById('recordSnake').textContent = record;
                document.getElementById('snakeMensaje').textContent = "🎉 ¡Nuevo récord!";
            }
            // nueva comida en posición libre
            let nueva;
            do{
                nueva = {x:Math.floor(Math.random()*columnas), y:Math.floor(Math.random()*filas)};
            } while(snake.some(s=>s.x===nueva.x && s.y===nueva.y));
            comida = nueva;
        } else {
            snake.pop();
        }

        dibujar();
    }

    clearInterval(intervaloSnake);
    intervaloSnake = setInterval(mover, 120);

    // controles de teclado
    window.onkeydown = function(e){
        if(e.key==='ArrowUp') cambiarDireccion('up');
        if(e.key==='ArrowDown') cambiarDireccion('down');
        if(e.key==='ArrowLeft') cambiarDireccion('left');
        if(e.key==='ArrowRight') cambiarDireccion('right');
    };
}

function cambiarDireccion(dir){
    const opuestos = {up:'down', down:'up', left:'right', right:'left'};
    if(dir !== opuestos[direccion]) direccion = dir;
}

function finSnake(){
    clearInterval(intervaloSnake);
    document.getElementById('snakeMensaje').textContent = "💀 Juego terminado. Toca 🔁 para reiniciar 🐍";
}



// -------- Juego 12: Pollo Travieso --------
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
        // actualizar record si se supera
        if(puntuacion > record){
            record = puntuacion;
            localStorage.setItem('recordPollo', record);
            document.getElementById("recordPollo").textContent = record;
            document.getElementById("polloMensaje").textContent += " 🎉 ¡Nuevo récord!";
        }
        // ningún alert molesto
    }

    document.getElementById("puntosPollo").textContent = puntuacion;
    document.getElementById("recordPollo").textContent = record;
    document.getElementById("polloMensaje").textContent = "💨 Toca o pulsa espacio para volar";
    bucle();
}

// -------- Juego 13: Perro Galáctico Extremo Mejorado v3 --------
let recordPerro = parseInt(localStorage.getItem('recordPerro') || 0);

function perroHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block;">
        <h2>🐶 Perro Galáctico Extremo</h2>
        <canvas id="perroCanvas" width="320" height="360"></canvas>
        <p style="text-align:center;">Puntos: <span id="puntosPerro">0</span></p>
        <p style="text-align:center;">🏆 Récord: <span id="recordPerro">${recordPerro}</span></p>
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
    let jugador = {x: width/2, y: height-60, w:40, h:40, estelas: []};
    let disparos = [];
    let meteoros = [];
    let powerups = [];
    let puntosP = 0;
    let velocidad = 1.5;
    let enJuego = true;
    let spawnTimer = 0;
    let tripleShot = false;
    let escudo = false;
    let tripleTimer = 0;
    let escudoTimer = 0;

    // Sonidos
    const sonidos = {
        disparo: new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"),
        explosion: new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"),
        perro: new Audio("https://actions.google.com/sounds/v1/animals/dog_bark.ogg"),
        powerup: new Audio("https://actions.google.com/sounds/v1/cartoon/slide_whistle_up.ogg")
    };

    function crearParticulas(x,y,color,cantidad=8){
        let particulas = [];
        for(let i=0;i<cantidad;i++){
            particulas.push({
                x, y,
                vx: (Math.random()-0.5)*3,
                vy: (Math.random()-0.5)*3,
                alpha: 1,
                color
            });
        }
        return particulas;
    }

    let particulas = [];

    function dibujar(){
        ctx.clearRect(0,0,width,height);
        // fondo
        ctx.fillStyle = "#001d3d";
        ctx.fillRect(0,0,width,height);

        // estelas del jugador
        jugador.estelas.forEach(e=>{
            ctx.fillStyle = `rgba(255, 215, 102, ${e.alpha})`;
            ctx.fillRect(e.x-e.w/2, e.y, e.w, e.h);
            e.alpha -= 0.05;
        });
        jugador.estelas = jugador.estelas.filter(e=>e.alpha>0);

        // jugador rediseñado
        ctx.fillStyle = escudo ? "#88FF88" : "#FFD966";
        // cuerpo
        ctx.fillRect(jugador.x - 15, jugador.y, 30, 30);
        // cabeza
        ctx.beginPath();
        ctx.arc(jugador.x, jugador.y-5, 8, 0, Math.PI*2);
        ctx.fill();
        // orejas
        ctx.fillStyle = "#FFA500";
        ctx.beginPath();
        ctx.moveTo(jugador.x-8,jugador.y-8);
        ctx.lineTo(jugador.x-12,jugador.y-15);
        ctx.lineTo(jugador.x-4,jugador.y-10);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(jugador.x+8,jugador.y-8);
        ctx.lineTo(jugador.x+12,jugador.y-15);
        ctx.lineTo(jugador.x+4,jugador.y-10);
        ctx.fill();

        // disparos
        ctx.fillStyle = "#8ef";
        disparos.forEach(d=>{
            ctx.fillRect(d.x-2, d.y-10, 4, 10);
            d.y -= 6;
        });

        // meteoros
        ctx.fillStyle = "#b5651d";
        meteoros.forEach(m=>{
            ctx.beginPath();
            ctx.arc(m.x,m.y,m.r,0,Math.PI*2);
            ctx.fill();
            m.y += m.vy;
            m.x += m.vx;
        });

        // power-ups
        powerups.forEach(p=>{
            ctx.fillStyle = p.tipo==='triple'?'#ff0':'#0ff';
            ctx.beginPath();
            ctx.arc(p.x,p.y,8,0,Math.PI*2);
            ctx.fill();
            p.y += 1.5;
        });

        // colisiones disparos-meteoros
        for(let i=disparos.length-1;i>=0;i--){
            for(let j=meteoros.length-1;j>=0;j--){
                const d = disparos[i], m = meteoros[j];
                if(d.x > m.x - m.r && d.x < m.x + m.r && d.y > m.y - m.r && d.y < m.y + m.r){
                    particulas.push(...crearParticulas(m.x,m.y,"#b5651d", m.r));
                    meteoros.splice(j,1);
                    disparos.splice(i,1);
                    puntosP += 1;
                    document.getElementById('puntosPerro').textContent = puntosP;
                    sonidos.explosion.play();
                    break;
                }
            }
        }

        // limpiar meteoros fuera del canvas antes de colisiones
        meteoros = meteoros.filter(m => m.y < height + m.r && m.x > -m.r && m.x < width+m.r);

        // colision meteoro-jugador
        for(let m of meteoros){
            if(m.x > jugador.x - jugador.w/2 - m.r && m.x < jugador.x + jugador.w/2 + m.r && m.y > jugador.y - m.r){
                if(escudo){
                    escudo=false;
                    escudoTimer=0;
                } else {
                    sonidos.perro.play();
                    finPerro();
                    return;
                }
            }
        }

        // colision jugador-powerup
        for(let i=powerups.length-1;i>=0;i--){
            const p = powerups[i];
            if(Math.abs(jugador.x - p.x)<20 && Math.abs(jugador.y - p.y)<20){
                if(p.tipo==='triple') {
                    tripleShot = true;
                    tripleTimer = 300; // 5 segundos a 60fps aprox
                }
                if(p.tipo==='escudo') {
                    escudo = true;
                    escudoTimer = 300; // 5 segundos
                }
                powerups.splice(i,1);
                sonidos.powerup.play();
            }
        }

        // partículas
        particulas.forEach(p=>{
            ctx.fillStyle = `rgba(181,101,29,${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x,p.y,2,0,Math.PI*2);
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.03;
        });
        particulas = particulas.filter(p=>p.alpha>0);

        // limpiar disparos fuera del canvas
        disparos = disparos.filter(d => d.y > -10);

        // limpiar power-ups fuera del canvas
        powerups = powerups.filter(p => p.y < height + 10);

        // spawn meteoros
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

        // spawn power-ups aleatorios
        if(Math.random()<0.005){
            powerups.push({
                x: Math.random()*(width-20)+10,
                y: -10,
                tipo: Math.random()<0.5?'triple':'escudo'
            });
        }

        // temporizadores de power-ups
        if(tripleShot){
            tripleTimer--;
            if(tripleTimer<=0) tripleShot=false;
        }
        if(escudo){
            escudoTimer--;
            if(escudoTimer<=0) escudo=false;
        }

        // acelerar levemente
        if(puntosP % 10 === 0 && puntosP !== 0) velocidad = 1.5 + Math.floor(puntosP/10)*0.2;

        if(enJuego) requestAnimationFrame(dibujar);
    }

    function disparar(){
        if(tripleShot){
            disparos.push({x: jugador.x, y: jugador.y - 6});
            disparos.push({x: jugador.x - 10, y: jugador.y - 6});
            disparos.push({x: jugador.x + 10, y: jugador.y - 6});
        } else {
            disparos.push({x: jugador.x, y: jugador.y - 6});
        }
        sonidos.disparo.play();
    }

    function moverJugadorTo(x){
        jugador.estelas.push({x:jugador.x, y:jugador.y, w:jugador.w, h:jugador.h, alpha:0.6});
        jugador.x = Math.max(jugador.w/2, Math.min(width - jugador.w/2, x));
    }

    function finPerro(){
        enJuego = false;
        if(puntosP > recordPerro){
            recordPerro = puntosP;
            localStorage.setItem('recordPerro', recordPerro);
            document.getElementById('recordPerro').textContent = recordPerro;
            setTimeout(()=> alert(`🎉 ¡Nuevo récord! ${puntosP} puntos`), 20);
        } else {
            setTimeout(()=> alert(`💥 ¡El Perro Galáctico fue golpeado! Puntos: ${puntosP}`), 20);
        }
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

    // keyboard
    window.onkeydown = function(e){
        if(e.key === 'ArrowLeft') moverJugadorTo(jugador.x - 20);
        if(e.key === 'ArrowRight') moverJugadorTo(jugador.x + 20);
        if(e.key === ' ') disparar();
    }

    requestAnimationFrame(dibujar);
}


// -------- Juego 14: MateReto Mejorado con Récord -----------
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
            <p>🏆 Mejor puntuación: <span id="recordMate">${localStorage.getItem('recordMate')||0}</span></p>
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
        if(tiempo <= 0){
            clearInterval(mateTiempoInterval);
            document.getElementById('mateMens').textContent = "⏰ Se acabó el tiempo!";
            actualizarRecord();
            setTimeout(()=>volverAlMenu(), 900);
        }
    },1000);
}

function generarMate(){
    const ops = ['+','-','*','/'];
    const op = ops[Math.floor(Math.random()*ops.length)];
    let a,b,res;
    if(op === '+'){ a = rand(1,50); b = rand(1,50); res = a+b; }
    if(op === '-'){ a = rand(1,50); b = rand(1,a); res = a-b; }
    if(op === '*'){ a = rand(1,12); b = rand(1,12); res = a*b; }
    if(op === '/'){ b = rand(2,12); res = rand(1,12); a = b*res; }
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

function actualizarRecord(){
    const recordActual = parseInt(localStorage.getItem('recordMate')||0);
    if(matePuntos > recordActual){
        localStorage.setItem('recordMate', matePuntos);
        document.getElementById('recordMate').textContent = matePuntos;
    }
}

//========== Juego 15: EQUILIBRIO BOLA==============
function equilibrioHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>⚡ Equilibrio Loco</h2>
        <canvas id="equilibrioCanvas" style="width:90vw; height:65vh; border:2px solid #444; border-radius:12px; background:linear-gradient(to bottom, #87CEEB, #bfe9ff);"></canvas>
        <p>Puntos: <span id="puntosEquilibrio">0</span></p>
        <p>Record: <span id="recordEquilibrio">0</span></p>
        <p id="equilibrioMens" style="font-weight:bold;"></p>
        <button onclick="volverAlMenu()" style="margin-top:10px;">⬅ Volver al menú</button>
    </div>`;
    iniciarEquilibrioNuevo();
}

function iniciarEquilibrioNuevo() {
    const canvas = document.getElementById('equilibrioCanvas');
    const ctx = canvas.getContext('2d');

    function ajustarCanvas() {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.65;
    }
    ajustarCanvas();
    window.addEventListener('resize', ajustarCanvas);

    const w = canvas.width, h = canvas.height;
    let bola = { x: w / 2, y: h / 2, r: 12, vx: 3, vy: -3 };
    let plataforma = { x: w / 2 - 45, y: h - 25, w: 90, h: 10 };
    let puntos = 0;
    let enJuego = true;

    // Cargar record desde localStorage
    let record = localStorage.getItem('recordEquilibrio') || 0;
    document.getElementById('recordEquilibrio').textContent = record;

    function dibujar() {
        ctx.clearRect(0, 0, w, h);

        // bola
        ctx.beginPath();
        ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ff5733";
        ctx.fill();

        // plataforma
        ctx.fillStyle = "#333";
        ctx.fillRect(plataforma.x, plataforma.y, plataforma.w, plataforma.h);
    }

    function actualizar() {
        bola.x += bola.vx;
        bola.y += bola.vy;

        // rebotes paredes
        if (bola.x - bola.r < 0 || bola.x + bola.r > w) bola.vx *= -1;
        if (bola.y - bola.r < 0) bola.vy *= -1;

        // colisión con plataforma
        if (
            bola.y + bola.r >= plataforma.y &&
            bola.y + bola.r <= plataforma.y + plataforma.h &&
            bola.x >= plataforma.x &&
            bola.x <= plataforma.x + plataforma.w
        ) {
            bola.vy *= -1;
            // cada rebote aumenta un poco la velocidad
            bola.vx *= 1.08;
            bola.vy *= 1.08;

            puntos++;
            document.getElementById('puntosEquilibrio').textContent = puntos;

            if (puntos > record) {
                record = puntos;
                localStorage.setItem('recordEquilibrio', record);
                document.getElementById('recordEquilibrio').textContent = record;
            }

            // reducir tamaño de la plataforma cada 5 puntos (mínimo visible)
            if (puntos % 5 === 0) {
                plataforma.w *= 0.95;
                if (plataforma.w < 50) plataforma.w = 50;
            }
        }

        // cae al suelo
        if (bola.y - bola.r > h) {
            enJuego = false;
            document.getElementById('equilibrioMens').textContent = `💥 ¡Perdiste! Puntos: ${puntos}`;
            setTimeout(() => volverAlMenu(), 1200);
        }
    }

    function bucle() {
        if (!enJuego) return;
        actualizar();
        dibujar();
        requestAnimationFrame(bucle);
    }

    // controles táctiles / ratón
    let tocando = false;
    let lastX = null;

    canvas.addEventListener('touchstart', e => { tocando = true; lastX = e.touches[0].clientX; });
    canvas.addEventListener('touchmove', e => {
        if (!tocando) return;
        let dx = e.touches[0].clientX - lastX;
        plataforma.x += dx;
        plataforma.x = Math.max(0, Math.min(w - plataforma.w, plataforma.x));
        lastX = e.touches[0].clientX;
    });
    canvas.addEventListener('touchend', () => { tocando = false; });

    canvas.addEventListener('mousedown', e => { tocando = true; lastX = e.clientX; });
    window.addEventListener('mousemove', e => {
        if (!tocando) return;
        let dx = e.clientX - lastX;
        plataforma.x += dx;
        plataforma.x = Math.max(0, Math.min(w - plataforma.w, plataforma.x));
        lastX = e.clientX;
    });
    window.addEventListener('mouseup', () => { tocando = false; });

    bucle();
}



//==================Juego 16: TRAGAPERRAS PROFESIONAL =================
let saldoSlot = 250; // saldo inicial
let diamantesConsecutivos = 0;
let megaSlotActivo = false;

function tragaperrasHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🎰 Tragaperras Profesional</h2>
        <p>Saldo: $<span id="saldoSlot">${saldoSlot}</span></p>
        <input type="number" id="apuestaSlot" placeholder="Apuesta" style="width:80px;padding:5px;margin:5px;text-align:center;">
        <div id="slotMachine" style="
            width:300px;
            height:120px;
            margin:20px auto;
            border:4px solid #222;
            border-radius:12px;
            background:linear-gradient(#111,#333);
            display:flex;
            justify-content:space-around;
            align-items:center;
            font-size:50px;
            color:white;
            box-shadow: 0 0 20px #ff0 inset, 0 0 30px #ff0;
        ">🍒 🍋 🍊</div>
        <button id="btnJugar" style="
            padding:12px 24px;
            font-size:18px;
            margin:10px;
            border:none;
            border-radius:8px;
            background:linear-gradient(#f39c12,#e67e22);
            color:white;
            cursor:pointer;
        ">🎲 Jugar</button>
        <p id="mensajeSlot" style="font-weight:bold;"></p>
        <button onclick="volverAlMenu()" style="
            margin-top:15px;
            padding:10px 20px;
            border:none;
            border-radius:8px;
            background-color:#3498db;
            color:white;
            font-size:16px;
        ">⬅ Volver</button>
    </div>`;

    document.getElementById('btnJugar').onclick = jugarTragaperras;
}

function jugarTragaperras() {
    const apuestaInput = document.getElementById('apuestaSlot');
    let apuesta = parseInt(apuestaInput.value);
    if (isNaN(apuesta) || apuesta <= 0) {
        document.getElementById('mensajeSlot').textContent = "Introduce una apuesta válida!";
        return;
    }
    if (!megaSlotActivo && apuesta > saldoSlot) {
        document.getElementById('mensajeSlot').textContent = "💸 No tienes suficiente saldo!";
        return;
    }

    // Íconos (balance intermedio)
    const icons = ['🍒','🍋','🍊','🍇','⭐','🔔','💎','🍀','🍉'];

    if (!megaSlotActivo) saldoSlot -= apuesta;

    // Tirada
    const result = [
        icons[Math.floor(Math.random() * icons.length)],
        icons[Math.floor(Math.random() * icons.length)],
        icons[Math.floor(Math.random() * icons.length)]
    ];
    document.getElementById('slotMachine').textContent = result.join(' ');

    let msg = "❌ Mala suerte!";

    // --- Sistema de premios equilibrado ---
    if (result[0] === result[1] && result[1] === result[2]) {
        if (result[0] === '💎') {
            saldoSlot += apuesta * 25;
            msg = "💎💎💎 ¡Triple Diamante! +" + apuesta * 25 + "$";
        } else {
            saldoSlot += apuesta * 12;
            msg = "🎉 ¡Jackpot! +" + apuesta * 12 + "$";
        }
    } 
    else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
        // Dos iguales, más razonable
        const chance = Math.random();
        if (chance < 0.8) { // 80% de ganar algo
            const ganancia = Math.floor(apuesta * (1.2 + Math.random() * 0.8)); // entre x1.2 y x2
            saldoSlot += ganancia;
            msg = "✨ ¡Dos iguales! +" + ganancia + "$";
        }
    } 
    else if (result.includes('💎')) {
        diamantesConsecutivos++;
        saldoSlot += Math.floor(apuesta * 0.4); // pequeño bono
        msg = "💎 ¡Diamante! +" + Math.floor(apuesta * 0.4) + "$";

        if (diamantesConsecutivos >= 3) {
            megaSlotActivo = true;
            diamantesConsecutivos = 0;
            msg = "💎 Mega Slot desbloqueada! Tirada especial!";
            setTimeout(() => megaSlot(apuesta), 500);
        }
    } 
    else if (Math.random() < 0.1) {
        const bonus = Math.floor(apuesta * 0.5);
        saldoSlot += bonus;
        msg = "🍀 ¡Suerte inesperada! +" + bonus + "$";
    }

    document.getElementById('saldoSlot').textContent = saldoSlot;
    document.getElementById('mensajeSlot').textContent = msg;
}

function megaSlot(apuestaOriginal) {
    const iconsMega = ['🍒','🍋','🍊','🍇','⭐','🔔','💎','🍀','🍉'];
    const result = [
        iconsMega[Math.floor(Math.random() * iconsMega.length)],
        iconsMega[Math.floor(Math.random() * iconsMega.length)],
        iconsMega[Math.floor(Math.random() * iconsMega.length)]
    ];
    document.getElementById('slotMachine').textContent = result.join(' ');

    let ganancia = 0;
    let msg = "🎰 Mega Slot: ";

    if (result[0] === result[1] && result[1] === result[2]) {
        ganancia = apuestaOriginal * 30;
        msg += "💥 ¡JACKPOT MEGA! +" + ganancia + "$";
    } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
        ganancia = Math.floor(apuestaOriginal * (2.5 + Math.random())); // entre x2.5 y x3.5
        msg += "✨ ¡Dos iguales en Mega! +" + ganancia + "$";
    } else if (result.includes('💎')) {
        ganancia = apuestaOriginal * 6;
        msg += "💎 Diamante en Mega +" + ganancia + "$";
    } else {
        msg += "Sin premio 😢";
    }

    saldoSlot += ganancia;
    document.getElementById('saldoSlot').textContent = saldoSlot;
    document.getElementById('mensajeSlot').textContent = msg;

    megaSlotActivo = false;
}

// ============= Juego 17: HELICOPTERO==============

let recordHeli = 0;

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
        <p>Record: <span id="recordHeli">${recordHeli}</span></p>
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
        },
        // Preguntas difíciles adicionales
        {
            q: "¿Cuál es el metal más ligero del mundo?",
            opciones: ["Aluminio", "Litio", "Titanio", "Magnesio"],
            correcta: 1
        },
        {
            q: "¿Qué gas constituye la mayor parte de la atmósfera terrestre?",
            opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Hidrógeno"],
            correcta: 1
        },
        {
            q: "¿Cuál es la capital de Mongolia?",
            opciones: ["Ulán Bator", "Astana", "Bishkek", "Tashkent"],
            correcta: 0
        },
        {
            q: "¿Qué planeta tiene el mayor número de lunas conocidas?",
            opciones: ["Saturno", "Júpiter", "Urano", "Neptuno"],
            correcta: 1
        },
        {
            q: "¿Cuál es el río más largo de África?",
            opciones: ["Nilo", "Congo", "Níger", "Zambeze"],
            correcta: 0
        },
        // Preguntas muy difíciles y trampa
        {
            q: "¿El Sol es más grande que la Tierra?",
            opciones: ["Sí", "No", "A veces", "Solo en verano"], 
            correcta: 0
        },
        {
            q: "¿El polo Norte está compuesto completamente de hielo sólido?",
            opciones: ["Sí", "No", "Solo la mitad", "Depende del año"], 
            correcta: 1
        },
        {
            q: "¿El número π puede escribirse exactamente en decimales?",
            opciones: ["Sí", "No", "Solo en binario", "Solo en hexadecimal"], 
            correcta: 1
        },
        {
            q: "¿La Gran Muralla China es visible desde la Luna?",
            opciones: ["Sí", "No", "Depende del clima", "Solo con telescopio"], 
            correcta: 1
        }
    ];

    preguntas.sort(() => Math.random() - 0.5);

    let indice = 0;
    let vidas = 3;
    let tiempo = 10;
    let puntos = 0;
    let timer;

    function mostrarPregunta() {
        if (indice >= preguntas.length) {
            document.getElementById('mensajeHeli').textContent = `🏆 ¡Ganaste! Puntos: ${puntos}`;
            if(puntos > recordHeli) recordHeli = puntos;
            document.getElementById('recordHeli').textContent = recordHeli;
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
            if (tiempo <= 0) perderVida("⏰ ¡Tiempo agotado!");
        }, 1000);
    }

    function verificarRespuesta(indiceSeleccionado) {
        const p = preguntas[indice];
        clearInterval(timer);
        if (indiceSeleccionado === p.correcta) {
            puntos++;
            document.getElementById('mensajeHeli').textContent = "✅ Correcto!";
        } else {
            perderVida("❌ Incorrecto!");
            return;
        }
        indice++;
        setTimeout(mostrarPregunta, 1000);
    }

    function perderVida(mensaje) {
        vidas--;
        document.getElementById('mensajeHeli').textContent = mensaje;
        const corazones = "❤️".repeat(vidas) + "💔".repeat(3 - vidas);
        document.getElementById('vidasHeli').innerHTML = corazones;
        if (vidas <= 0) {
            clearInterval(timer);
            document.getElementById('mensajeHeli').textContent = `💀 Game Over. Puntos: ${puntos}`;
            if(puntos > recordHeli) recordHeli = puntos;
            document.getElementById('recordHeli').textContent = recordHeli;
        } else {
            indice++;
            setTimeout(mostrarPregunta, 1000);
        }
    }

    mostrarPregunta();
}


//==================Juego 18: UN SEGUNDO============
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


// =============== Juego 19: Bola Mágica Extrema Mejorado ===============
function bolaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>⚪ Bola Mágica Extrema</h2>
        <canvas id="bolaCanvas" width="320" height="400" style="border:2px solid #333; border-radius:10px; background:#c9f6ff;"></canvas>
        <p>Nivel: <span id="nivelBola">1</span></p>
        <p id="mensajeBola"></p>
        <button onclick="reiniciarBola()">🔄 Reiniciar</button>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarBolaJuego();
}

let reiniciarBola;

function iniciarBolaJuego() {
    const canvas = document.getElementById("bolaCanvas");
    const ctx = canvas.getContext("2d");

    let nivel = 1;
    let jugando = true;

    // ----------------- 15 niveles -----------------
    const niveles = [
        { agujero: { x: 260, y: 360, r: 15 }, obstaculos: [] },
        { agujero: { x: 60, y: 60, r: 15 }, obstaculos: [{ x: 100, y: 200, w: 120, h: 15 }] },
        { agujero: { x: 280, y: 60, r: 15 }, obstaculos: [{ x: 80, y: 150, w: 160, h: 10 }, { x: 40, y: 270, w: 200, h: 10 }] },
        { agujero: { x: 160, y: 40, r: 15 }, obstaculos: [{ x: 40, y: 120, w: 240, h: 10 }, { x: 100, y: 240, w: 120, h: 10 }, { x: 60, y: 330, w: 200, h: 10 }] },
        { agujero: { x: 300, y: 50, r: 15 }, obstaculos: [{ x: 60, y: 100, w: 180, h: 10 }, { x: 40, y: 220, w: 200, h: 10 }, { x: 100, y: 330, w: 150, h: 10 }] },
        { agujero: { x: 260, y: 60, r: 13 }, obstaculos: [{ x: 60, y: 120, w: 200, h: 10 }, { x: 80, y: 230, w: 160, h: 10 }, { x: 40, y: 340, w: 240, h: 10 }] },
        { agujero: { x: 50, y: 50, r: 12 }, obstaculos: [{ x: 100, y: 100, w: 140, h: 10 }, { x: 50, y: 200, w: 200, h: 10 }, { x: 100, y: 300, w: 120, h: 10 }] },
        { agujero: { x: 300, y: 60, r: 12 }, obstaculos: [{ x: 40, y: 100, w: 240, h: 10 }, { x: 60, y: 200, w: 200, h: 10 }, { x: 80, y: 300, w: 160, h: 10 }] },
        { agujero: { x: 160, y: 40, r: 10 }, obstaculos: [{ x: 60, y: 120, w: 200, h: 8 }, { x: 40, y: 220, w: 240, h: 8 }, { x: 80, y: 320, w: 160, h: 8 }] },
        { agujero: { x: 280, y: 40, r: 10 }, obstaculos: [{ x: 60, y: 100, w: 200, h: 8 }, { x: 40, y: 200, w: 240, h: 8 }, { x: 80, y: 300, w: 160, h: 8 }, { x: 120, y: 150, w: 10, h: 200 }] },
        { agujero: { x: 40, y: 40, r: 10 }, obstaculos: [{ x: 80, y: 100, w: 180, h: 8 }, { x: 40, y: 200, w: 240, h: 8 }, { x: 60, y: 300, w: 200, h: 8 }, { x: 140, y: 150, w: 10, h: 200 }, { x: 200, y: 50, w: 10, h: 300 }] },
        { agujero: { x: 300, y: 30, r: 10 }, obstaculos: [{ x: 40, y: 80, w: 240, h: 8 }, { x: 60, y: 160, w: 200, h: 8 }, { x: 80, y: 240, w: 160, h: 8 }, { x: 100, y: 320, w: 120, h: 8 }, { x: 150, y: 120, w: 10, h: 220 }] },
        { agujero: { x: 180, y: 50, r: 12 }, obstaculos: [{ x: 50, y: 100, w: 200, h: 10 }, { x: 100, y: 220, w: 150, h: 10 }, { x: 40, y: 330, w: 200, h: 10 }] },
        { agujero: { x: 280, y: 80, r: 12 }, obstaculos: [{ x: 60, y: 140, w: 200, h: 10 }, { x: 120, y: 260, w: 150, h: 10 }, { x: 40, y: 360, w: 220, h: 10 }] },
        { agujero: { x: 40, y: 360, r: 12 }, obstaculos: [{ x: 60, y: 100, w: 200, h: 10 }, { x: 120, y: 220, w: 160, h: 10 }, { x: 200, y: 340, w: 120, h: 10 }] }
    ];

    let bola = { x: 40, y: 360, r: 10, vx: 0, vy: 0, enMovimiento: false };

    function resetBola() {
        bola.x = 40;
        bola.y = 360;
        bola.vx = 0;
        bola.vy = 0;
        bola.enMovimiento = false;
        dibujarNivel();
    }

    function dibujarNivel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const lvl = niveles[nivel - 1];

        const colores = ["#c9f6ff", "#b2ebf2", "#a5d6a7", "#fff59d", "#ffcc80", "#ef9a9a", "#ce93d8", "#90caf9", "#f48fb1", "#80cbc4", "#dce775", "#ffb74d", "#aed581", "#81d4fa", "#f06292"];
        ctx.fillStyle = colores[(nivel - 1) % colores.length];
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // agujero
        ctx.beginPath();
        ctx.arc(lvl.agujero.x, lvl.agujero.y, lvl.agujero.r, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        // obstáculos
        ctx.fillStyle = "#333";
        lvl.obstaculos.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));

        // bola
        ctx.beginPath();
        ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ff8800";
        ctx.fill();
    }

    function actualizar() {
        if (!bola.enMovimiento) return;

        // movimiento
        bola.x += bola.vx;
        bola.y += bola.vy;

        // fricción suave
        bola.vx *= 0.992;
        bola.vy *= 0.992;

        // límites canvas
        if (bola.x - bola.r < 0) { bola.x = bola.r; bola.vx *= -0.7; }
        if (bola.x + bola.r > canvas.width) { bola.x = canvas.width - bola.r; bola.vx *= -0.7; }
        if (bola.y - bola.r < 0) { bola.y = bola.r; bola.vy *= -0.7; }
        if (bola.y + bola.r > canvas.height) { bola.y = canvas.height - bola.r; bola.vy *= -0.7; }

        // colisión con obstáculos
        const lvl = niveles[nivel - 1];
        for (let o of lvl.obstaculos) {
            if (bola.x + bola.r > o.x && bola.x - bola.r < o.x + o.w &&
                bola.y + bola.r > o.y && bola.y - bola.r < o.y + o.h) {
                const overlapX = Math.min(bola.x + bola.r - o.x, o.x + o.w - (bola.x - bola.r));
                const overlapY = Math.min(bola.y + bola.r - o.y, o.y + o.h - (bola.y - bola.r));
                if (overlapX < overlapY) bola.vx *= -0.7;
                else bola.vy *= -0.7;
            }
        }

        // check agujero
        const dx = bola.x - lvl.agujero.x;
        const dy = bola.y - lvl.agujero.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < lvl.agujero.r + bola.r/2) {
            siguienteNivel();
            return;
        }

        // velocidad mínima
        if (Math.abs(bola.vx) < 0.05 && Math.abs(bola.vy) < 0.05) {
            bola.enMovimiento = false;
            falloNivel();
        }

        dibujarNivel();
        requestAnimationFrame(actualizar);
    }

    function falloNivel() {
        document.getElementById("mensajeBola").textContent = "💥 Fallaste, reiniciando nivel...";
        setTimeout(() => {
            resetBola();
            document.getElementById("mensajeBola").textContent = "";
        }, 1000);
    }

    function siguienteNivel() {
        nivel++;
        if (nivel > niveles.length) {
            document.getElementById("mensajeBola").textContent = "🏆 ¡Completaste los 15 niveles!";
            jugando = false;
            return;
        }
        document.getElementById("nivelBola").textContent = nivel;
        document.getElementById("mensajeBola").textContent = "✅ ¡Nivel superado!";
        setTimeout(() => {
            document.getElementById("mensajeBola").textContent = "";
            resetBola();
        }, 800);
    }

    reiniciarBola = function() {
        nivel = 1;
        jugando = true;
        document.getElementById("mensajeBola").textContent = "";
        document.getElementById("nivelBola").textContent = nivel;
        resetBola();
    };

    let startX, startY;

    // eventos touch
    canvas.addEventListener("touchstart", e => {
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
    });
    canvas.addEventListener("touchend", e => {
        const t = e.changedTouches[0];
        disparar(t.clientX, t.clientY);
    });

    // eventos mouse
    canvas.addEventListener("mousedown", e => {
        startX = e.clientX;
        startY = e.clientY;
    });
    canvas.addEventListener("mouseup", e => {
        disparar(e.clientX, e.clientY);
    });

    function disparar(endX, endY) {
        if (!jugando || bola.enMovimiento) return;

        const dx = endX - startX;
        const dy = endY - startY;

        // velocidad proporcional al arrastre
        const fuerza = Math.min(Math.sqrt(dx*dx + dy*dy), 150);
        const ang = Math.atan2(dy, dx);
        bola.vx = (fuerza * Math.cos(ang)) * 0.15;
        bola.vy = (fuerza * Math.sin(ang)) * 0.15;
        bola.enMovimiento = true;

        actualizar();
    }

    dibujarNivel();
}



// -------------------- Juego 20: Calculadora Guay 🔥 --------------------
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
            mensaje = "🔥 SEXO 🔥";
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

// ===================== Juego 21: JUEGO DE BANDERAS LINEAL =====================
let recordBanderas = parseInt(localStorage.getItem('recordBanderas') || 0);

function banderasHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🌍 Juego de Banderas</h2>
        <canvas id="banderaCanvas" width="300" height="180" style="border:2px solid #444; border-radius:12px; background:#f0f0f0;"></canvas>
        <p>Puntos: <span id="puntosBanderas">0</span> | Récord: <span id="recordBanderas">${recordBanderas}</span></p>
        <p id="mensajeBanderas" style="font-weight:bold; min-height:20px;">🟢 ¡A jugar!</p>
        <div id="opcionesBanderas" style="margin-top:10px;"></div>
        <p id="vidasBanderas">❤️❤️❤️</p>
        <div style="margin-top:10px;">
            <button onclick="volverAlMenu()" style="padding:8px 16px; font-size:16px; border-radius:6px; background:#228B22; color:white; border:none;">⬅ Volver al menú</button>
            <button onclick="iniciarBanderas()" style="padding:8px 16px; font-size:16px; border-radius:6px; background:#FF6347; color:white; border:none;">🔁 Reiniciar</button>
        </div>
    </div>`;
    iniciarBanderas();
}

let vidasBanderas, puntosBanderas, tiempoBanderas, banderaActual, indexBanderas, timerBanderas;

// -------------------------------------------------
// BANDERAS: normales, intermedias, difíciles y imposibles
// -------------------------------------------------
const banderas = [
    // 30 normales / conocidas
    {pais:"España", url:"https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"},
    {pais:"Francia", url:"https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"},
    {pais:"Italia", url:"https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"},
    {pais:"Alemania", url:"https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg"},
    {pais:"Japón", url:"https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"},
    {pais:"Brasil", url:"https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"},
    {pais:"México", url:"https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg"},
    {pais:"Canadá", url:"https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg"},
    {pais:"Estados Unidos", url:"https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"},
    {pais:"Reino Unido", url:"https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"},
    {pais:"China", url:"https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"},
    {pais:"India", url:"https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"},
    {pais:"Argentina", url:"https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg"},
    {pais:"Chile", url:"https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg"},
    {pais:"Suecia", url:"https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg", opcionesDificiles:["Suecia","Suiza","Noruega","Finlandia"]},
    {pais:"Noruega", url:"https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg", opcionesDificiles:["Noruega","Suecia","Dinamarca","Finlandia"]},
    {pais:"Finlandia", url:"https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg", opcionesDificiles:["Finlandia","Suecia","Noruega","Estonia"]},
    {pais:"Suiza", url:"https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg", opcionesDificiles:["Suiza","Suecia","Austria","Liechtenstein"]},
    {pais:"Países Bajos", url:"https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg"},
    {pais:"Portugal", url:"https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"},
    {pais:"Grecia", url:"https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg"},
    {pais:"Turquía", url:"https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"},
    {pais:"Corea del Sur", url:"https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg", opcionesDificiles:["Corea del Sur","Corea del Norte","Japón","China"]},
    {pais:"Rusia", url:"https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg"},
    {pais:"Sudáfrica", url:"https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg"},
    {pais:"Egipto", url:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg"},
    {pais:"Australia", url:"https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg"},
    {pais:"Nueva Zelanda", url:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg"},
    {pais:"Pakistán", url:"https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg"},
    {pais:"Arabia Saudita", url:"https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"},

    // 10 intermedias / confusas nuevas
    {pais:"Polonia", url:"https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg", opcionesDificiles:["Polonia","Indonesia","Mónaco","Austria"]},
    {pais:"Indonesia", url:"https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg", opcionesDificiles:["Indonesia","Polonia","Mónaco","Austria"]},
    {pais:"Mónaco", url:"https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Monaco.svg", opcionesDificiles:["Mónaco","Polonia","Indonesia","Austria"]},
    {pais:"Austria", url:"https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg", opcionesDificiles:["Austria","Polonia","Indonesia","Mónaco"]},
    {pais:"Malasia", url:"https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg", opcionesDificiles:["Malasia","Tailandia","Indonesia","Filipinas"]},
    {pais:"Tailandia", url:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg", opcionesDificiles:["Tailandia","Malasia","Indonesia","Filipinas"]},
    {pais:"Filipinas", url:"https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg", opcionesDificiles:["Filipinas","Malasia","Tailandia","Indonesia"]},
    {pais:"Bangladesh", url:"https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg", opcionesDificiles:["Bangladesh","Pakistán","India","Nepal"]},
    {pais:"Nepal", url:"https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg", opcionesDificiles:["Nepal","Bhután","Bangladesh","Tíbet"]},
    {pais:"Corea del Norte", url:"https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_North_Korea.svg", opcionesDificiles:["Corea del Norte","Corea del Sur","China","Japón"]},
    {pais:"Maldivas", url:"https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Maldives.svg", opcionesDificiles:["Maldivas","Seychelles","Mauricio","Comoras"]},
    {pais:"Seychelles", url:"https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Seychelles.svg", opcionesDificiles:["Seychelles","Maldivas","Mauricio","Comoras"]},
    {pais:"Mauricio", url:"https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Mauritius.svg", opcionesDificiles:["Mauricio","Seychelles","Maldivas","Comoras"]},
    {pais:"Belice", url:"https://upload.wikimedia.org/wikipedia/commons/e/e7/Flag_of_Belize.svg", opcionesDificiles:["Belice","Guatemala","Honduras","Costa Rica"]},
    {pais:"Comoras", url:"https://upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg", opcionesDificiles:["Comoras","Maldivas","Seychelles","Mauricio"]},
    {pais:"Bután", url:"https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg", opcionesDificiles:["Bután","Nepal","Fiyi","Maldivas"]},

    // Última bandera
    {pais:"San Vicente y las Granadinas", url:"https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Saint_Vincent_and_the_Grenadines.svg", opcionesDificiles:["San Vicente y las Granadinas","Santa Lucía","Barbados","Granada"]}
];


// -------------------------------------------------
// FUNCIONES DEL JUEGO
// -------------------------------------------------
function iniciarBanderas() {
    vidasBanderas = 3;
    puntosBanderas = 0;
    indexBanderas = 0;
    document.getElementById('puntosBanderas').textContent = puntosBanderas;
    document.getElementById('vidasBanderas').innerHTML = "❤️❤️❤️";
    document.getElementById('mensajeBanderas').textContent = "🟢 ¡A jugar!";
    mostrarBandera();
}

function mostrarBandera() {
    clearInterval(timerBanderas);
    if (indexBanderas >= banderas.length) {
        document.getElementById('mensajeBanderas').textContent = `🏆 ¡Juego completado! Puntos: ${puntosBanderas}`;
        if (puntosBanderas > recordBanderas) {
            recordBanderas = puntosBanderas;
            localStorage.setItem('recordBanderas', recordBanderas);
        }
        document.getElementById('recordBanderas').textContent = recordBanderas;
        return;
    }

    tiempoBanderas = Math.max(4, 15 - Math.floor(puntosBanderas / 2));

    let bandera = banderas[indexBanderas];
    banderaActual = bandera;

    const canvas = document.getElementById('banderaCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = bandera.url;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    let opciones = bandera.opcionesDificiles || [bandera.pais];
    while (opciones.length < 4) {
        let opt = banderas[Math.floor(Math.random() * banderas.length)].pais;
        if (!opciones.includes(opt)) opciones.push(opt);
    }
    opciones.sort(() => Math.random() - 0.5);

    const contOpciones = document.getElementById('opcionesBanderas');
    contOpciones.innerHTML = '';
    opciones.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
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
        btn.onclick = () => verificarBandera(opt);
        contOpciones.appendChild(btn);
    });

    timerBanderas = setInterval(() => {
        tiempoBanderas--;
        if (!document.getElementById('tiempoBanderas')) {
            const tElem = document.createElement('p');
            tElem.id = 'tiempoBanderas';
            document.getElementById('mensajeBanderas').insertAdjacentElement('beforebegin', tElem);
        }
        document.getElementById('tiempoBanderas').textContent = "⏳ Tiempo: " + tiempoBanderas;
        if (tiempoBanderas <= 0) {
            perderBandera("⏰ Tiempo agotado");
        }
    }, 1000);
}

function verificarBandera(opcion) {
    clearInterval(timerBanderas);
    if (opcion === banderaActual.pais) {
        puntosBanderas++;
        document.getElementById('puntosBanderas').textContent = puntosBanderas;
        document.getElementById('mensajeBanderas').textContent = "✅ Correcto!";
        indexBanderas++;
        setTimeout(mostrarBandera, 500);
    } else {
        perderBandera("❌ Incorrecto");
    }
}

function perderBandera(mensaje) {
    vidasBanderas--;
    document.getElementById('mensajeBanderas').textContent = mensaje;
    const corazones = "❤️".repeat(vidasBanderas) + "💔".repeat(3 - vidasBanderas);
    document.getElementById('vidasBanderas').innerHTML = corazones;
    if (vidasBanderas <= 0) {
        clearInterval(timerBanderas);
        document.getElementById('mensajeBanderas').textContent = `💀 Game Over. Puntos: ${puntosBanderas}`;
        if (puntosBanderas > recordBanderas) {
            recordBanderas = puntosBanderas;
            localStorage.setItem('recordBanderas', recordBanderas);
        }
        document.getElementById('recordBanderas').textContent = recordBanderas;
    } else {
        indexBanderas++;
        setTimeout(mostrarBandera, 500);
    }
}
// ============ Juego 22: BLACKJACK  ============

let saldoBJ = 100;
let mazoBJ = [];
let jugadorBJ = [];
let dealerBJ = [];
let apuestaBJ = 0;
let partidaActivaBJ = false;

function blackjackHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🃏 Blackjack Europeo</h2>
        <p>Saldo: €<span id="saldoBJ">${saldoBJ}</span></p>
        <input type="number" id="apuestaBJ" placeholder="Apuesta (€)" style="width:80px;padding:5px;margin:5px;text-align:center;">
        <div id="mesaBJ" style="margin-top:15px;">
            <p><b>Crupier:</b> <span id="dealerBJ">❓</span></p>
            <p><b>Tú:</b> <span id="jugadorBJ"></span></p>
            <p id="mensajeBJ" style="font-weight:bold;margin-top:10px;"></p>
        </div>
        <div id="controlesBJ" style="margin-top:10px;display:none;">
            <button onclick="pedirCartaBJ()">🃏 Pedir</button>
            <button onclick="plantarseBJ()">✋ Plantarse</button>
            <button onclick="doblarBJ()">💰 Doblar</button>
        </div>
        <div id="reinicioBJ" style="margin-top:10px;display:none;">
            <button onclick="reiniciarManoBJ()" style="padding:8px 16px;background:#28a745;color:white;border:none;border-radius:6px;">🔁 Volver a jugar</button>
        </div>
        <button id="btnJugarBJ" onclick="iniciarBlackjack()" style="margin-top:10px;">🎲 Jugar</button>
        <button onclick="volverAlMenu()" style="margin-top:15px;">⬅ Volver al menú</button>
    </div>`;
}

function crearMazoBJ() {
    const palos = ['♠', '♥', '♦', '♣'];
    const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    mazoBJ = [];
    for (let p of palos) {
        for (let v of valores) {
            mazoBJ.push(v + p);
        }
    }
    mazoBJ.sort(() => Math.random() - 0.5);
}

function valorCartaBJ(carta) {
    const v = carta.slice(0, -1);
    if (v === 'A') return 11;
    if (['J', 'Q', 'K'].includes(v)) return 10;
    return parseInt(v);
}

function valorManoBJ(mano) {
    let total = 0;
    let ases = 0;
    for (let c of mano) {
        total += valorCartaBJ(c);
        if (c.startsWith('A')) ases++;
    }
    while (total > 21 && ases > 0) {
        total -= 10;
        ases--;
    }
    return total;
}

function iniciarBlackjack() {
    const input = document.getElementById('apuestaBJ');
    apuestaBJ = parseInt(input.value);
    const mensaje = document.getElementById('mensajeBJ');

    if (isNaN(apuestaBJ) || apuestaBJ <= 0) {
        mensaje.textContent = "❌ Apuesta inválida.";
        return;
    }
    if (apuestaBJ > saldoBJ) {
        mensaje.textContent = "💸 No tienes suficiente saldo.";
        return;
    }

    crearMazoBJ();
    jugadorBJ = [mazoBJ.pop(), mazoBJ.pop()];
    dealerBJ = [mazoBJ.pop()]; // modo europeo → solo 1 carta visible
    partidaActivaBJ = true;

    document.getElementById('btnJugarBJ').style.display = 'none';
    document.getElementById('reinicioBJ').style.display = 'none';
    document.getElementById('controlesBJ').style.display = 'block';
    saldoBJ -= apuestaBJ;
    document.getElementById('saldoBJ').textContent = saldoBJ;
    actualizarMesaBJ();

    const totalJugador = valorManoBJ(jugadorBJ);
    if (totalJugador === 21) plantarseBJ();
}

function actualizarMesaBJ() {
    document.getElementById('dealerBJ').textContent = dealerBJ.join(' ');
    document.getElementById('jugadorBJ').textContent = jugadorBJ.join(' ') + 
        ` (${valorManoBJ(jugadorBJ)})`;
}

function pedirCartaBJ() {
    if (!partidaActivaBJ) return;
    jugadorBJ.push(mazoBJ.pop());
    actualizarMesaBJ();

    const total = valorManoBJ(jugadorBJ);
    if (total > 21) {
        terminarBlackjack("💥 Te pasaste de 21. Pierdes.");
    }
}

function doblarBJ() {
    if (!partidaActivaBJ || jugadorBJ.length !== 2) return;
    if (saldoBJ < apuestaBJ) {
        document.getElementById('mensajeBJ').textContent = "❌ No tienes saldo para doblar.";
        return;
    }
    saldoBJ -= apuestaBJ;
    apuestaBJ *= 2;
    document.getElementById('saldoBJ').textContent = saldoBJ;
    pedirCartaBJ();
    if (valorManoBJ(jugadorBJ) <= 21) plantarseBJ();
}

function plantarseBJ() {
    if (!partidaActivaBJ) return;
    partidaActivaBJ = false;

    // El crupier roba hasta tener 17 o más
    while (valorManoBJ(dealerBJ) < 17) {
        dealerBJ.push(mazoBJ.pop());
    }

    const totalJugador = valorManoBJ(jugadorBJ);
    const totalDealer = valorManoBJ(dealerBJ);

    let resultado = "";
    if (totalDealer > 21) {
        saldoBJ += apuestaBJ * 2;
        resultado = "🎉 El crupier se pasó. ¡Ganaste!";
    } else if (totalJugador > totalDealer) {
        saldoBJ += apuestaBJ * 2;
        resultado = "🏆 Ganaste la mano.";
    } else if (totalJugador === totalDealer) {
        saldoBJ += apuestaBJ;
        resultado = "🤝 Empate.";
    } else {
        resultado = "💸 Pierdes la mano.";
    }

    document.getElementById('dealerBJ').textContent = dealerBJ.join(' ') + 
        ` (${totalDealer})`;
    document.getElementById('saldoBJ').textContent = saldoBJ;
    document.getElementById('mensajeBJ').textContent = resultado;

    document.getElementById('controlesBJ').style.display = 'none';
    document.getElementById('btnJugarBJ').style.display = 'none';
    document.getElementById('reinicioBJ').style.display = 'block';
}

function terminarBlackjack(msg) {
    partidaActivaBJ = false;
    document.getElementById('mensajeBJ').textContent = msg;
    document.getElementById('controlesBJ').style.display = 'none';
    document.getElementById('btnJugarBJ').style.display = 'none';
    document.getElementById('reinicioBJ').style.display = 'block';
}

function reiniciarManoBJ() {
    document.getElementById('mensajeBJ').textContent = "";
    document.getElementById('dealerBJ').textContent = "❓";
    document.getElementById('jugadorBJ').textContent = "";
    document.getElementById('reinicioBJ').style.display = 'none';
    document.getElementById('btnJugarBJ').style.display = 'block';
}
// ================== JUEGO 23: CAPITALES ==================
let indiceCapital = 0;
let puntosCapital = 0;
let recordCapital = localStorage.getItem("recordCapital") || 0;

function capitalesHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block;text-align:center;">
        <h2>🌍 Juego de Capitales</h2>
        <p><b>Puntuación:</b> <span id="puntosCapital">${puntosCapital}</span> | 🏆 Récord: <span id="recordCapital">${recordCapital}</span></p>
        <p id="preguntaCapital" style="font-size:18px;">Pregunta...</p>
        <input id="respuestaCapital" type="text" placeholder="Escribe la capital..." style="padding:8px;width:220px;text-align:center;margin:10px;">
        <button onclick="comprobarCapital()" style="padding:8px 16px;border:none;border-radius:8px;background-color:#27ae60;color:white;cursor:pointer;">Responder</button>
        <p id="mensajeCapital" style="font-weight:bold;margin-top:10px;"></p>
        <button onclick="volverAlMenu()" style="margin-top:15px;padding:10px 20px;border:none;border-radius:8px;background-color:#3498db;color:white;">⬅ Volver</button>
    </div>`;
    indiceCapital = 0;
    puntosCapital = 0;
    siguienteCapital();
}

const preguntasCapitales = [
    // --- Nivel fácil ---
    {pais:"España", capital:"Madrid"},
    {pais:"Francia", capital:"París"},
    {pais:"Italia", capital:"Roma"},
    {pais:"Portugal", capital:"Lisboa"},
    {pais:"Alemania", capital:"Berlín"},
    {pais:"Reino Unido", capital:"Londres"},
    {pais:"Países Bajos", capital:"Ámsterdam"},
    {pais:"Bélgica", capital:"Bruselas"},
    {pais:"Suiza", capital:"Berna"},
    {pais:"Austria", capital:"Viena"},

    // --- Nivel medio ---
    {pais:"Noruega", capital:"Oslo"},
    {pais:"Suecia", capital:"Estocolmo"},
    {pais:"Finlandia", capital:"Helsinki"},
    {pais:"Dinamarca", capital:"Copenhague"},
    {pais:"Polonia", capital:"Varsovia"},
    {pais:"Chequia", capital:"Praga"},
    {pais:"Hungría", capital:"Budapest"},
    {pais:"Grecia", capital:"Atenas"},
    {pais:"Irlanda", capital:"Dublín"},
    {pais:"Turquía", capital:"Ankara"},

    // --- Nivel difícil ---
    {pais:"Rumanía", capital:"Bucarest"},
    {pais:"Serbia", capital:"Belgrado"},
    {pais:"Croacia", capital:"Zagreb"},
    {pais:"Bulgaria", capital:"Sofía"},
    {pais:"Eslovaquia", capital:"Bratislava"},
    {pais:"Eslovenia", capital:"Liubliana"},
    {pais:"Letonia", capital:"Riga"},
    {pais:"Estonia", capital:"Tallin"},
    {pais:"Lituania", capital:"Vilna"},
    {pais:"Islandia", capital:"Reikiavik"},
    {pais:"Japón", capital:"Tokio"},
{pais:"Brasil", capital:"Brasilia"},
{pais:"Canadá", capital:"Ottawa"},
{pais:"Australia", capital:"Canberra"},
{pais:"Egipto", capital:"El Cairo"},
{pais:"India", capital:"Nueva Delhi"},
{pais:"Argentina", capital:"Buenos Aires"},
{pais:"Sudáfrica", capital:"Pretoria"},
{pais:"México", capital:"Ciudad de México"},
{pais:"Nueva Zelanda", capital:"Wellington"},

    // --- Nivel imposible 😈 ---
    {pais:"Kiribati", capital:"Tarawa"},
    {pais:"Burundi", capital:"Gitega"},
    {pais:"Bután", capital:"Timbu"},
    {pais:"Micronesia", capital:"Palikir"},
    {pais:"Nauru", capital:"Yaren"},
    {pais:"Togo", capital:"Lomé"},
    {pais:"Surinam", capital:"Paramaribo"},
    {pais:"Mongolia", capital:"Ulán Bator"},
    {pais:"Kazajistán", capital:"Astaná"},
    {pais:"Malaui", capital:"Lilongüe"},
];

function siguienteCapital() {
    if (indiceCapital >= preguntasCapitales.length) {
        document.getElementById("preguntaCapital").textContent = "🎉 ¡Has completado todas las capitales!";
        document.getElementById("respuestaCapital").style.display = "none";
        document.querySelector("button[onclick='comprobarCapital()']").style.display = "none";
        if (puntosCapital > recordCapital) {
            recordCapital = puntosCapital;
            localStorage.setItem("recordCapital", recordCapital);
        }
        document.getElementById("recordCapital").textContent = recordCapital;
        document.getElementById("mensajeCapital").textContent = "🏆 Récord final: " + recordCapital + " puntos";
        return;
    }

    const pregunta = preguntasCapitales[indiceCapital];
    document.getElementById("preguntaCapital").textContent = `¿Cuál es la capital de ${pregunta.pais}?`;
    document.getElementById("respuestaCapital").value = "";
    document.getElementById("respuestaCapital").focus();
}

function comprobarCapital() {
    const respuesta = document.getElementById("respuestaCapital").value.trim();
    const correcta = preguntasCapitales[indiceCapital].capital;

    if (compararCapitales(respuesta, correcta)) {
        puntosCapital++;
        document.getElementById("mensajeCapital").textContent = "✅ ¡Correcto!";
        document.getElementById("mensajeCapital").style.color = "green";
    } else {
        document.getElementById("mensajeCapital").textContent = `❌ Era ${correcta}`;
        document.getElementById("mensajeCapital").style.color = "red";
    }

    document.getElementById("puntosCapital").textContent = puntosCapital;
    indiceCapital++;

    if (puntosCapital > recordCapital) {
        recordCapital = puntosCapital;
        localStorage.setItem("recordCapital", recordCapital);
        document.getElementById("recordCapital").textContent = recordCapital;
    }

    setTimeout(siguienteCapital, 1200);
}

// --- Permisividad ortográfica ---
function compararCapitales(a, b) {
    if (!a || !b) return false;
    a = a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    b = b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Si son casi iguales (distancia de Levenshtein <= 2)
    return distanciaLevenshtein(a, b) <= 2;
}

// --- Cálculo de distancia Levenshtein (tolerancia de escritura) ---
function distanciaLevenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }
    return dp[m][n];
}
// -------- Juego 24: Ruleta  --------
function ruletaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>🎡 Ruleta Extrema</h2>
        <canvas id="ruletaCanvas" width="400" height="400" style="border:2px solid #333; border-radius:10px; background:#fff;"></canvas>
        <div style="margin-top:10px;">
            <input type="text" id="nuevaOpcion" placeholder="Añadir opción" style="width:200px;">
            <button onclick="agregarOpcion()">➕ Añadir</button>
            <button onclick="quitarOpcion()">➖ Quitar última</button>
        </div>
        <p id="mensajeRuleta" style="color:red;font-size:14px;margin:5px;"></p>
        <p id="resultadoRuleta" style="font-size:18px;font-weight:bold;margin-top:10px;"></p>
        <button onclick="girarRuleta()">🎯 Girar</button>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;

    iniciarRuleta();
}

let ruletaOpciones = []; // vacía al inicio
let anguloRuleta = 0;
let velocidadRuleta = 0;
let canvas, ctx;
let girando = false;

function iniciarRuleta() {
    canvas = document.getElementById("ruletaCanvas");
    ctx = canvas.getContext("2d");
    dibujarRuleta();
}

function dibujarRuleta() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const radio = 150;
    const n = ruletaOpciones.length;
    if (n === 0) return;

    const anguloPorOpcion = (2 * Math.PI) / n;

    for (let i = 0; i < n; i++) {
        const inicio = anguloRuleta + i * anguloPorOpcion;
        const fin = inicio + anguloPorOpcion;

        // Color alternado o aleatorio
        ctx.fillStyle = i % 2 === 0 ? "#FFCC66" : "#66CCFF";

        ctx.beginPath();
        ctx.moveTo(centroX, centroY);
        ctx.arc(centroX, centroY, radio, inicio, fin);
        ctx.closePath();
        ctx.fill();

        // Texto
        ctx.save();
        ctx.translate(centroX, centroY);
        ctx.rotate(inicio + anguloPorOpcion / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.fillText(ruletaOpciones[i], radio - 10, 5);
        ctx.restore();
    }

    // Flecha arriba
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(centroX, centroY - radio - 10);
    ctx.lineTo(centroX - 10, centroY - radio + 10);
    ctx.lineTo(centroX + 10, centroY - radio + 10);
    ctx.closePath();
    ctx.fill();
}

function agregarOpcion() {
    const input = document.getElementById("nuevaOpcion");
    const val = input.value.trim();
    const mensaje = document.getElementById("mensajeRuleta");
    mensaje.textContent = "";
    if (!val) return;
    if (ruletaOpciones.length >= 50) {
        mensaje.textContent = "Máximo 50 opciones alcanzado";
        return;
    }
    ruletaOpciones.push(val);
    input.value = "";
    dibujarRuleta();
}

function quitarOpcion() {
    const mensaje = document.getElementById("mensajeRuleta");
    mensaje.textContent = "";
    if (ruletaOpciones.length <= 2) {
        mensaje.textContent = "Debe haber al menos 2 opciones";
        return;
    }
    ruletaOpciones.pop();
    dibujarRuleta();
}

function girarRuleta() {
    if (girando) return;
    if (ruletaOpciones.length < 2) {
        document.getElementById("mensajeRuleta").textContent = "Añade al menos 2 opciones para girar";
        return;
    }

    girando = true;
    velocidadRuleta = Math.random() * 0.3 + 0.25;

    function animar() {
        anguloRuleta += velocidadRuleta;
        anguloRuleta %= 2 * Math.PI;

        velocidadRuleta *= 0.97;

        dibujarRuleta();

        if (velocidadRuleta > 0.002) {
            requestAnimationFrame(animar);
        } else {
            girando = false;
            mostrarResultado();
        }
    }

    animar();
}

function mostrarResultado() {
    const n = ruletaOpciones.length;
    const anguloPorOpcion = (2 * Math.PI) / n;
    let anguloFlecha = (3 * Math.PI / 2 - anguloRuleta) % (2 * Math.PI);
    if (anguloFlecha < 0) anguloFlecha += 2 * Math.PI;
    const indice = Math.floor(anguloFlecha / anguloPorOpcion);
    const resultado = ruletaOpciones[indice];
    document.getElementById("resultadoRuleta").textContent = `🎉 Resultado: ${resultado}`;
}
// -------- Juego XX: Carrera Rápida --------
function carreraHTML(){
    main.innerHTML = `
    <div class="juego" style="display:flex;flex-direction:column;align-items:center;">
        <h2>🏁 Carrera Rápida</h2>
        <p style="text-align:center;">Espera el <strong>YA!</strong> para tocar. Tocar antes resta un punto.</p>
        <div id="mensajeCarrera" style="font-size:2em;margin:20px;height:50px;">Preparados...</div>
        <div style="display:flex;gap:40px;flex-wrap:wrap;justify-content:center;">
            <button id="jugador1Btn" style="width:150px;height:150px;font-size:1.5em;border-radius:15px;">Jugador 1</button>
            <button id="jugador2Btn" style="width:150px;height:150px;font-size:1.5em;border-radius:15px;">Jugador 2</button>
        </div>
        <p style="margin-top:20px;">Puntos: Jugador 1: <span id="puntosJ1">0</span> | Jugador 2: <span id="puntosJ2">0</span></p>
        <button onclick="volverAlMenu()" style="margin-top:15px;">⬅ Volver al menú</button>
    </div>`;
    iniciarCarrera();
}

function iniciarCarrera(){
    const btn1 = document.getElementById('jugador1Btn');
    const btn2 = document.getElementById('jugador2Btn');
    const msg = document.getElementById('mensajeCarrera');
    let puntosJ1 = 0, puntosJ2 = 0;
    let yaActivo = false;
    let rondaActiva = true;

    // Función para iniciar la ronda
    function nuevaRonda(){
        if(!rondaActiva) return;
        yaActivo = false;
        msg.style.color = "#000";
        msg.textContent = "Preparados...";
        const tiempoRandom = Math.random()*2000 + 1500; // 1.5 a 3.5 segundos
        setTimeout(()=>{
            yaActivo = true;
            msg.textContent = "YA!";
            msg.style.color = "#28a745";
        }, tiempoRandom);
    }

    // Función de toque
    function tocar(jugador){
        if(!rondaActiva) return;

        if(!yaActivo){
            // tocó antes → resta un punto
            if(jugador===1) puntosJ1 = Math.max(0, puntosJ1-1);
            else puntosJ2 = Math.max(0, puntosJ2-1);
        } else {
            // tocó en YA → suma un punto
            if(jugador===1) puntosJ1 += 1;
            else puntosJ2 += 1;
        }

        document.getElementById('puntosJ1').textContent = puntosJ1;
        document.getElementById('puntosJ2').textContent = puntosJ2;

        // Verificar ganador
        if(puntosJ1 >= 10){
            rondaActiva = false;
            msg.style.color = "#FFD700";
            msg.textContent = "🏆 ¡Jugador 1 gana!";
            setTimeout(()=>{
                puntosJ1 = puntosJ2 = 0;
                document.getElementById('puntosJ1').textContent = puntosJ1;
                document.getElementById('puntosJ2').textContent = puntosJ2;
                rondaActiva = true;
                nuevaRonda();
            }, 2000);
            return;
        }
        if(puntosJ2 >= 10){
            rondaActiva = false;
            msg.style.color = "#FFD700";
            msg.textContent = "🏆 ¡Jugador 2 gana!";
            setTimeout(()=>{
                puntosJ1 = puntosJ2 = 0;
                document.getElementById('puntosJ1').textContent = puntosJ1;
                document.getElementById('puntosJ2').textContent = puntosJ2;
                rondaActiva = true;
                nuevaRonda();
            }, 2000);
            return;
        }

        nuevaRonda();
    }

    btn1.onclick = ()=>tocar(1);
    btn2.onclick = ()=>tocar(2);

    // Soporte táctil para móviles
    btn1.addEventListener('touchstart', e=>{e.preventDefault(); tocar(1);});
    btn2.addEventListener('touchstart', e=>{e.preventDefault(); tocar(2);});

    // Inicia la primera ronda
    nuevaRonda();
}

// -------- Juego 13: Perro Galáctico Extremo Multiplayer --------
function perro2HTML(){
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>🐶 Perro Galáctico Extremo</h2>
        <canvas id="perroCanvas" width="360" height="400" style="background:#001; border-radius:10px;"></canvas>
        <p>Puntos Jugador 1: <span id="puntosPerro1">0</span> | Puntos Jugador 2: <span id="puntosPerro2">0</span></p>
        <p>🏆 Récord: <span id="recordPerro">0</span></p>
        <p id="mensajeFinal" style="font-weight:bold; color:#FFD700;"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarPerro();
}

function iniciarPerro(){
    const canvas = document.getElementById('perroCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height;

    let jugadores = [
        {x: width/4, y: height-50, w:40, h:40, puntos:0, color:"#FFD966", disparos:[]}, // Jugador 1
        {x: 3*width/4, y: height-50, w:40, h:40, puntos:0, color:"#66FFAA", disparos:[]} // Jugador 2
    ];

    let meteoros = [];
    let enJuego = true;
    let spawnTimer = 0;
    let record = parseInt(localStorage.getItem('recordPerro') || 0);

    function sonido(frecuencia,duracion){
        const ctxA = new (window.AudioContext||window.webkitAudioContext)();
        const o = ctxA.createOscillator();
        const g = ctxA.createGain();
        o.connect(g);
        g.connect(ctxA.destination);
        o.frequency.value = frecuencia;
        o.type='square';
        o.start();
        o.stop(ctxA.currentTime + duracion);
        g.gain.exponentialRampToValueAtTime(0.00001, ctxA.currentTime+duracion);
    }

    function dibujar(){
        ctx.clearRect(0,0,width,height);
        ctx.fillStyle="#001";
        ctx.fillRect(0,0,width,height);

        ctx.fillStyle="#b5651d";
        meteoros.forEach(m=>{
            ctx.beginPath();
            ctx.arc(m.x,m.y,m.r,0,Math.PI*2);
            ctx.fill();
        });

        jugadores.forEach(j=>{
            ctx.fillStyle="#8ef";
            j.disparos.forEach(d=>{
                ctx.fillRect(d.x-3,d.y-10,6,10);
            });
            ctx.fillStyle=j.color;
            ctx.fillRect(j.x-j.w/2,j.y,j.w,j.h);
        });
    }

    function actualizar(){
        if(!enJuego) return;

        meteoros.forEach(m=>{
            m.y += m.vy;
            m.x += m.vx;
        });
        meteoros = meteoros.filter(m=>m.y<m.canvasHeight+50);

        jugadores.forEach(j=>{
            j.disparos.forEach(d=>{ d.y -= 6; });
            j.disparos = j.disparos.filter(d=>d.y>-10);
        });

        jugadores.forEach(j=>{
            for(let i=j.disparos.length-1;i>=0;i--){
                for(let k=meteoros.length-1;k>=0;k--){
                    const d=j.disparos[i], m=meteoros[k];
                    if(d.x>m.x-m.r && d.x<m.x+m.r && d.y>m.y-m.r && d.y<m.y+m.r){
                        meteoros.splice(k,1);
                        j.disparos.splice(i,1);
                        j.puntos++;
                        document.getElementById(`puntosPerro${jugadores.indexOf(j)+1}`).textContent=j.puntos;
                        if(j.puntos>record){
                            record=j.puntos;
                            localStorage.setItem('recordPerro',record);
                            document.getElementById('recordPerro').textContent=record;
                        }
                        break;
                    }
                }
            }
        });

        for(let j of jugadores){
            for(let m of meteoros){
                if(m.x>j.x-j.w/2-m.r && m.x<j.x+j.w/2+m.r && m.y>j.y-m.r && m.y<j.y+j.h+m.r){
                    finJuego();
                    return;
                }
            }
        }

        spawnTimer--;
        if(spawnTimer<=0){
            meteoros.push({
                x: Math.random()*(width-40)+20,
                y: -20,
                r: 12+Math.random()*12,
                vy: 1+Math.random()*1.5,
                vx: (Math.random()-0.5)*0.6,
                canvasHeight:height
            });
            spawnTimer = 35;
        }

        dibujar();
        requestAnimationFrame(actualizar);
    }

    function disparar(jugador){
        jugadores[jugador].disparos.push({x: jugadores[jugador].x, y: jugadores[jugador].y-6});
        sonido(400,0.05);
    }

    function moverJugador(jugador, dx){
        jugadores[jugador].x = Math.max(jugadores[jugador].w/2, Math.min(width-jugadores[jugador].w/2, jugadores[jugador].x + dx));
    }

    function finJuego(){
        enJuego=false;
        let mensaje="";
        if(jugadores[0].puntos>jugadores[1].puntos) mensaje="🏆 Jugador 1 gana!";
        else if(jugadores[1].puntos>jugadores[0].puntos) mensaje="🏆 Jugador 2 gana!";
        else mensaje="🤝 Empate!";
        document.getElementById("mensajeFinal").textContent = `${mensaje} | Puntos J1: ${jugadores[0].puntos} | Puntos J2: ${jugadores[1].puntos}`;
    }

    canvas.addEventListener('touchmove', e=>{
        e.preventDefault();
        for(let t of e.touches){
            const rect=canvas.getBoundingClientRect();
            if(t.clientX<width/2) jugadores[0].x = t.clientX-rect.left;
            else jugadores[1].x = t.clientX-rect.left;
        }
    });

    canvas.addEventListener('touchstart', e=>{
        e.preventDefault();
        for(let t of e.touches){
            const rect=canvas.getBoundingClientRect();
            if(t.clientX<width/2) disparar(0);
            else disparar(1);
        }
    });

    canvas.addEventListener('click', e=>{
        const rect=canvas.getBoundingClientRect();
        if(e.clientX-rect.left<width/2) disparar(0);
        else disparar(1);
    });

    window.addEventListener('keydown', e=>{
        switch(e.key){
            case 'a': moverJugador(0,-15); break;
            case 'd': moverJugador(0,15); break;
            case 'w':
            case ' ': disparar(0); break;
            case 'ArrowLeft': moverJugador(1,-15); break;
            case 'ArrowRight': moverJugador(1,15); break;
            case 'ArrowUp':
            case 'Enter': disparar(1); break;
        }
    });

    requestAnimationFrame(actualizar);
}


// -------- Juego XX: Toques Rápidos --------
function toqueHTML() {
    main.innerHTML = `
    <div class="juego" style="display:flex;flex-direction:column;align-items:center;">
        <h2>✊ Toques Rápidos</h2>
        <p>¡Toca tu botón tantas veces como puedas en 15 segundos!</p>
        <div style="display:flex; gap:40px; flex-wrap:wrap; justify-content:center; margin:20px 0;">
            <button id="btnJ1" style="width:150px; height:150px; font-size:2em; border-radius:15px;">Jugador 1</button>
            <button id="btnJ2" style="width:150px; height:150px; font-size:2em; border-radius:15px;">Jugador 2</button>
        </div>
        <p>Puntos: Jugador 1: <span id="puntosJ1">0</span> | Jugador 2: <span id="puntosJ2">0</span></p>
        <p>Tiempo restante: <span id="tiempoRestante">15</span>s</p>
        <p id="mensajeGanador" style="font-size:1.5em; color:#FFD700; margin-top:10px;"></p>
        <button onclick="volverAlMenu()" style="margin-top:20px;">⬅ Volver al menú</button>
    </div>`;

    iniciarToques();
}

function iniciarToques() {
    const btnJ1 = document.getElementById('btnJ1');
    const btnJ2 = document.getElementById('btnJ2');
    const puntosSpanJ1 = document.getElementById('puntosJ1');
    const puntosSpanJ2 = document.getElementById('puntosJ2');
    const tiempoSpan = document.getElementById('tiempoRestante');
    const mensaje = document.getElementById('mensajeGanador');

    let puntosJ1 = 0, puntosJ2 = 0;
    let tiempo = 15;
    let juegoActivo = true;

    function actualizarPuntos() {
        puntosSpanJ1.textContent = puntosJ1;
        puntosSpanJ2.textContent = puntosJ2;
    }

    function finalizarJuego() {
        juegoActivo = false;
        let resultado;
        if (puntosJ1 > puntosJ2) resultado = "🏆 ¡Jugador 1 gana!";
        else if (puntosJ2 > puntosJ1) resultado = "🏆 ¡Jugador 2 gana!";
        else resultado = "😐 ¡Empate!";
        mensaje.textContent = resultado;
    }

    // Eventos de toque o click
    function tocar(jugador) {
        if (!juegoActivo) return;
        if (jugador === 1) puntosJ1++;
        else puntosJ2++;
        actualizarPuntos();
    }

    btnJ1.onclick = () => tocar(1);
    btnJ2.onclick = () => tocar(2);

    // Soporte táctil
    btnJ1.addEventListener('touchstart', e => { e.preventDefault(); tocar(1); });
    btnJ2.addEventListener('touchstart', e => { e.preventDefault(); tocar(2); });

    // Temporizador
    const intervalo = setInterval(() => {
        if (!juegoActivo) {
            clearInterval(intervalo);
            return;
        }
        tiempo--;
        tiempoSpan.textContent = tiempo;
        if (tiempo <= 0) {
            clearInterval(intervalo);
            finalizarJuego();
        }
    }, 1000);
}

// -------- Juego: Robo de Gemas --------
function roboGemasHTML(){
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>💎 Robo de Gemas</h2>
        <canvas id="gemasCanvas" width="320" height="400" style="border:1px solid #000; background:#def;"></canvas>
        <p>Jugador 1: <span id="puntos1">0</span> 💎 | Jugador 2: <span id="puntos2">0</span> 💎</p>
        <div style="display:flex; justify-content:space-around; margin-top:10px;">
            <div>
                <p>Jugador 1</p>
                <button id="j1Izq">⬅</button>
                <button id="j1Der">➡</button>
                <button id="j1Arr">⬆</button>
                <button id="j1Aba">⬇</button>
            </div>
            <div>
                <p>Jugador 2</p>
                <button id="j2Izq">⬅</button>
                <button id="j2Der">➡</button>
                <button id="j2Arr">⬆</button>
                <button id="j2Aba">⬇</button>
            </div>
        </div>
        <p id="mensajeGemas" style="text-align:center;"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarGemas();
}

function iniciarGemas(){
    const canvas = document.getElementById('gemasCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height;

    let jugadores = [
        {x:50,y:height-50,w:20,h:20,puntos:0,color:'red'},
        {x:width-50,y:height-50,w:20,h:20,puntos:0,color:'blue'}
    ];

    const gemas = [];
    const gemasMeta = 20;
    let enJuego = true;

    function crearGema(){
        gemas.push({
            x: 20 + Math.random()*(width-40),
            y: 20 + Math.random()*(height-80),
            r: 10
        });
    }
    setInterval(crearGema,1500);

    function dibujar(){
        ctx.clearRect(0,0,width,height);
        // fondo
        ctx.fillStyle='#def';
        ctx.fillRect(0,0,width,height);
        // gemas
        ctx.fillStyle='gold';
        gemas.forEach(g=>{ ctx.beginPath(); ctx.arc(g.x,g.y,g.r,0,Math.PI*2); ctx.fill(); });
        // jugadores
        jugadores.forEach(j=>{
            ctx.fillStyle=j.color;
            ctx.fillRect(j.x,j.y,j.w,j.h);
        });
    }

    function actualizar(){
        // recoger gemas
        jugadores.forEach(j=>{
            for(let i=gemas.length-1;i>=0;i--){
                const g=gemas[i];
                if(j.x<g.x+g.r && j.x+j.w>g.x-g.r && j.y<g.y+g.r && j.y+j.h>g.y-g.r){
                    gemas.splice(i,1);
                    j.puntos++;
                    document.getElementById(`puntos${jugadores.indexOf(j)+1}`).textContent=j.puntos;
                    if(j.puntos>=gemasMeta){
                        enJuego=false;
                        document.getElementById('mensajeGemas').textContent=`🏆 Jugador ${jugadores.indexOf(j)+1} gana!`;
                    }
                }
            }
        });
        dibujar();
        if(enJuego) requestAnimationFrame(actualizar);
    }

    // movimiento continuo al mantener pulsado
    const botones = [
        {id:'j1Izq',dx:-2,dy:0,j:0},{id:'j1Der',dx:2,dy:0,j:0},{id:'j1Arr',dx:0,dy:-2,j:0},{id:'j1Aba',dx:0,dy:2,j:0},
        {id:'j2Izq',dx:-2,dy:0,j:1},{id:'j2Der',dx:2,dy:0,j:1},{id:'j2Arr',dx:0,dy:-2,j:1},{id:'j2Aba',dx:0,dy:2,j:1},
    ];

    botones.forEach(b=>{
        let interval;
        const boton=document.getElementById(b.id);
        const mover=()=>{
            if(!enJuego) return;
            const j=jugadores[b.j];
            j.x=Math.max(0,Math.min(width-j.w,j.x+b.dx));
            j.y=Math.max(0,Math.min(height-j.h,j.y+b.dy));
        };
        boton.addEventListener('mousedown',()=>{ interval=setInterval(mover,20); });
        boton.addEventListener('mouseup',()=>{ clearInterval(interval); });
        boton.addEventListener('mouseleave',()=>{ clearInterval(interval); });
        boton.addEventListener('touchstart',(e)=>{ e.preventDefault(); interval=setInterval(mover,20); });
        boton.addEventListener('touchend',(e)=>{ e.preventDefault(); clearInterval(interval); });
    });

    // compatibilidad teclado
    const teclas = {
        'a': {dx:-2,dy:0,j:0}, 'd':{dx:2,dy:0,j:0}, 'w':{dx:0,dy:-2,j:0}, 's':{dx:0,dy:2,j:0},
        'ArrowLeft': {dx:-2,dy:0,j:1}, 'ArrowRight': {dx:2,dy:0,j:1}, 'ArrowUp': {dx:0,dy:-2,j:1}, 'ArrowDown': {dx:0,dy:2,j:1},
    };

    const teclasPresionadas = {};

    window.addEventListener('keydown',e=>{
        if(teclas[e.key]) teclasPresionadas[e.key]=true;
    });

    window.addEventListener('keyup',e=>{
        if(teclas[e.key]) teclasPresionadas[e.key]=false;
    });

    function moverTeclado(){
        if(!enJuego) return;
        for(const key in teclasPresionadas){
            if(teclasPresionadas[key]){
                const t = teclas[key];
                const j=jugadores[t.j];
                j.x=Math.max(0,Math.min(width-j.w,j.x+t.dx));
                j.y=Math.max(0,Math.min(height-j.h,j.y+t.dy));
            }
        }
        requestAnimationFrame(moverTeclado);
    }

    actualizar();
    moverTeclado();
}

// -------- Juego: Pilla-Pilla Extremo Mejorado --------
function pillaPillaHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>🏃‍♂️ Pilla-Pilla Extremo</h2>
        <canvas id="pillaCanvas" width="360" height="360" style="border:2px solid #333; border-radius:10px; background:linear-gradient(to bottom, #e0f7fa, #80deea);"></canvas>
        <p>Tiempo: <span id="tiempoPilla">60</span>s | P1: <span id="puntosP1">0</span> | P2: <span id="puntosP2">0</span></p>
        <div id="controlsP1" style="margin-top:10px;">Jugador 1<br>
            ⬆️ <button id="upP1">↑</button><br>
            ⬅️ <button id="leftP1">←</button> ⬇️ <button id="downP1">↓</button> ➡️ <button id="rightP1">→</button>
        </div>
        <div id="controlsP2" style="margin-top:10px;">Jugador 2<br>
            ⬆️ <button id="upP2">↑</button><br>
            ⬅️ <button id="leftP2">←</button> ⬇️ <button id="downP2">↓</button> ➡️ <button id="rightP2">→</button>
        </div>
        <p id="mensajePilla" style="font-weight:bold;"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;
    iniciarPillaPilla();
}

function iniciarPillaPilla() {
    const canvas = document.getElementById('pillaCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height;

    let jugador1 = {x:50, y:50, w:25, h:25, color:'#f44336', puntos:0};
    let jugador2 = {x:width-75, y:height-75, w:25, h:25, color:'#2196f3', puntos:0};
    let atrapador = Math.random() < 0.5 ? jugador1 : jugador2;
    let tiempo = 60;
    let enJuego = true;
    let obstaculos = [];

    const velocidad = 3;
    let keys = {};

    // Generar obstáculos aleatorios
    function generarObstaculos() {
        obstaculos = [];
        for(let i=0;i<8;i++){
            obstaculos.push({
                x: Math.random()*(width-50),
                y: Math.random()*(height-50),
                w: 40 + Math.random()*20,
                h: 40 + Math.random()*20
            });
        }
    }
    generarObstaculos();

    // Colocar jugadores sin chocar con obstáculos
    function colocarJugadores() {
        [jugador1,jugador2].forEach(j=>{
            let intentos = 0;
            do {
                j.x = Math.random()*(width-j.w);
                j.y = Math.random()*(height-j.h);
                intentos++;
            } while(obstaculos.some(o=>rectColision(j,o)) && intentos<100);
        });
    }
    colocarJugadores();

    function dibujar(){
        ctx.clearRect(0,0,width,height);
        // Fondo con degradado
        const grad = ctx.createLinearGradient(0,0,0,height);
        grad.addColorStop(0,'#e0f7fa');
        grad.addColorStop(1,'#80deea');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,width,height);

        // Obstáculos
        ctx.fillStyle = '#555';
        obstaculos.forEach(o => {
            ctx.fillRect(o.x,o.y,o.w,o.h);
            ctx.strokeStyle='#333';
            ctx.strokeRect(o.x,o.y,o.w,o.h);
        });

        // Jugadores
        [jugador1,jugador2].forEach(j=>{
            ctx.fillStyle = j.color;
            ctx.fillRect(j.x,j.y,j.w,j.h);
            if(j===atrapador){
                ctx.strokeStyle='yellow';
                ctx.lineWidth=3;
                ctx.strokeRect(j.x,j.y,j.w,j.h);
            }
        });
    }

    function actualizar(){
        if(!enJuego) return;

        // Movimiento jugador 1
        if(keys['ArrowUp']) mover(jugador1,0,-velocidad);
        if(keys['ArrowDown']) mover(jugador1,0,velocidad);
        if(keys['ArrowLeft']) mover(jugador1,-velocidad,0);
        if(keys['ArrowRight']) mover(jugador1,velocidad,0);

        // Movimiento jugador 2 (WASD)
        if(keys['w']) mover(jugador2,0,-velocidad);
        if(keys['s']) mover(jugador2,0,velocidad);
        if(keys['a']) mover(jugador2,-velocidad,0);
        if(keys['d']) mover(jugador2,velocidad,0);

        // Comprobar colisión atrapador
        if(atrapador===jugador1 && colision(jugador1,jugador2)){
            jugador1.puntos++;
            document.getElementById('puntosP1').textContent = jugador1.puntos;
            reiniciarRonda(jugador2);
        }
        else if(atrapador===jugador2 && colision(jugador2,jugador1)){
            jugador2.puntos++;
            document.getElementById('puntosP2').textContent = jugador2.puntos;
            reiniciarRonda(jugador1);
        }

        dibujar();
        requestAnimationFrame(actualizar);
    }

    function mover(jugador,dx,dy){
        const nx = jugador.x + dx;
        const ny = jugador.y + dy;
        if(nx>=0 && nx+jugador.w<=width && ny>=0 && ny+jugador.h<=height){
            let choque = obstaculos.some(o => rectColision({x:nx,y:ny,w:jugador.w,h:jugador.h},o));
            if(!choque){
                jugador.x = nx;
                jugador.y = ny;
            }
        }
    }

    function colision(a,b){
        return !(a.x+a.w<b.x || a.x>b.x+b.w || a.y+a.h<b.y || a.y>b.y+b.h);
    }

    function rectColision(a,b){
        return !(a.x+a.w<b.x || a.x>b.x+b.w || a.y+a.h<b.y || a.y>b.y+b.h);
    }

    function reiniciarRonda(nuevoAtrapador){
        atrapador = nuevoAtrapador;
        generarObstaculos();
        colocarJugadores();
        document.getElementById('mensajePilla').textContent = `${nuevoAtrapador===jugador1?'Jugador 1':'Jugador 2'} es el atrapador!`;
        setTimeout(()=>document.getElementById('mensajePilla').textContent='',800);
    }

    // Temporizador
    const intervalo = setInterval(()=>{
        if(!enJuego) { clearInterval(intervalo); return; }
        tiempo--;
        document.getElementById('tiempoPilla').textContent = tiempo;
        if(tiempo<=0){
            enJuego=false;
            let ganador = jugador1.puntos>jugador2.puntos?'Jugador 1':jugador1.puntos<jugador2.puntos?'Jugador 2':'Empate';
            document.getElementById('mensajePilla').textContent = `⏰ Fin del tiempo! Ganador: ${ganador}`;
        }
    },1000);

    // Teclas
    window.addEventListener('keydown',e=>keys[e.key]=true);
    window.addEventListener('keyup',e=>keys[e.key]=false);

    // Botones móviles
    const controles = [
        {id:'upP1',key:'ArrowUp'}, {id:'downP1',key:'ArrowDown'}, {id:'leftP1',key:'ArrowLeft'}, {id:'rightP1',key:'ArrowRight'},
        {id:'upP2',key:'w'}, {id:'downP2',key:'s'}, {id:'leftP2',key:'a'}, {id:'rightP2',key:'d'}
    ];
    controles.forEach(c=>{
        const btn = document.getElementById(c.id);
        btn.addEventListener('mousedown',()=>keys[c.key]=true);
        btn.addEventListener('mouseup',()=>keys[c.key]=false);
        btn.addEventListener('touchstart',e=>{ e.preventDefault(); keys[c.key]=true; });
        btn.addEventListener('touchend',e=>{ e.preventDefault(); keys[c.key]=false; });
    });

    actualizar();
}

// -------- Juego 20: Preguntas Rápidas Multijugador --------
function preguntasHTML() {
    main.innerHTML = `
    <div class="juego" style="display:block; text-align:center;">
        <h2>❓ Preguntas Rápidas</h2>
        <p id="preguntaTexto" style="font-weight:bold; margin-bottom:20px;"></p>
        <div style="display:flex; flex-wrap:wrap; justify-content:space-around; margin-bottom:15px;">
            <div style="flex:1; min-width:160px; margin:5px;">
                <h3>Jugador 1</h3>
                <button id="j1A" onclick="responder(1,'A')">Opción A</button>
                <button id="j1B" onclick="responder(1,'B')">Opción B</button>
                <button id="j1C" onclick="responder(1,'C')">Opción C</button>
                <button id="j1D" onclick="responder(1,'D')">Opción D</button>
                <p>Puntos: <span id="puntos1">0</span></p>
            </div>
            <div style="flex:1; min-width:160px; margin:5px;">
                <h3>Jugador 2</h3>
                <button id="j2A" onclick="responder(2,'A')">Opción A</button>
                <button id="j2B" onclick="responder(2,'B')">Opción B</button>
                <button id="j2C" onclick="responder(2,'C')">Opción C</button>
                <button id="j2D" onclick="responder(2,'D')">Opción D</button>
                <p>Puntos: <span id="puntos2">0</span></p>
            </div>
        </div>
        <p id="mensajeFinal" style="font-weight:bold;"></p>
        <button onclick="volverAlMenu()">⬅ Volver al menú</button>
    </div>`;

    iniciarPreguntas();
}

// Preguntas originales, ahora 30, divididas en 4 niveles de dificultad
let preguntas = [
    // Nivel 1
    {q:"¿Qué animal tiene memoria excepcional?", A:"Elefante", B:"Perro", C:"Gato", D:"Ratón", correcta:"A"},
    {q:"Número primo más pequeño", A:"1", B:"2", C:"3", D:"0", correcta:"B"},
    {q:"Color que resulta de mezclar rojo y azul", A:"Morado", B:"Naranja", C:"Verde", D:"Rosa", correcta:"A"},
    {q:"Planeta más cercano al Sol", A:"Venus", B:"Mercurio", C:"Marte", D:"Tierra", correcta:"B"},
    {q:"Fruta que flota en agua", A:"Sandía", B:"Manzana", C:"Plátano", D:"Cereza", correcta:"A"},
    {q:"Día que sigue al lunes", A:"Martes", B:"Miércoles", C:"Domingo", D:"Viernes", correcta:"A"},
    {q:"Número de patas de un perro", A:"4", B:"2", C:"6", D:"8", correcta:"A"},
    {q:"Color del cielo en día despejado", A:"Verde", B:"Azul", C:"Rojo", D:"Amarillo", correcta:"B"},
    {q:"Estación después de invierno", A:"Otoño", B:"Primavera", C:"Verano", D:"Invierno", correcta:"B"},
    {q:"Objeto usado para escribir", A:"Lápiz", B:"Silla", C:"Mesa", D:"Zapato", correcta:"A"},

    // Nivel 2
    {q:"¿Cuál es la palabra más larga del español sin 'a'?", A:"Electrodoméstico", B:"Esternocleidomastoideo", C:"Inconstitucional", D:"Paralelepípedo", correcta:"B"},
    {q:"En qué año se inventó la imprenta?", A:"1450", B:"1500", C:"1600", D:"1400", correcta:"A"},
    {q:"Número de huesos en el cuerpo humano adulto", A:"206", B:"208", C:"210", D:"201", correcta:"A"},
    {q:"Elemento químico con símbolo 'K'", A:"Potasio", B:"Calcio", C:"Cobalto", D:"Kriptón", correcta:"A"},
    {q:"País más grande de África", A:"Argelia", B:"Sudán", C:"Egipto", D:"Libia", correcta:"A"},
    {q:"Capital de Noruega", A:"Oslo", B:"Estocolmo", C:"Helsinki", D:"Copenhague", correcta:"A"},
    {q:"Cuántos continentes hay", A:"5", B:"6", C:"7", D:"8", correcta:"C"},
    {q:"El gas que respiramos", A:"Oxígeno", B:"Nitrógeno", C:"Hidrógeno", D:"Dióxido de carbono", correcta:"A"},
    {q:"Velocidad promedio de un humano corriendo", A:"15 km/h", B:"10 km/h", C:"20 km/h", D:"5 km/h", correcta:"B"},
    {q:"Animal más rápido del mundo", A:"Guepardo", B:"León", C:"Tigre", D:"Águila", correcta:"A"},

    // Nivel 3
    {q:"Palíndromo: ¿Cuál es correcto?", A:"Anilina", B:"Radar", C:"Casa", D:"Perro", correcta:"B"},
    {q:"¿Qué número falta en la secuencia: 2, 3, 5, 8, 12, ?", A:"15", B:"17", C:"18", D:"20", correcta:"B"},
    {q:"Ciudad que no está en Europa", A:"Oslo", B:"Lisboa", C:"Toronto", D:"París", correcta:"C"},
    {q:"Significado de 'onomatopeya'", A:"Palabra que imita sonido", B:"Animal fantástico", C:"Objeto antiguo", D:"Fenómeno meteorológico", correcta:"A"},
    {q:"¿Cuál de estos números es irracional?", A:"1/2", B:"√2", C:"0.75", D:"3/4", correcta:"B"},
    {q:"País con más volcanes activos", A:"Japón", B:"Indonesia", C:"EEUU", D:"Chile", correcta:"B"},
    {q:"Número de planetas en el sistema solar", A:"8", B:"9", C:"7", D:"10", correcta:"A"},
    {q:"En qué continente está Egipto", A:"África", B:"Asia", C:"Europa", D:"Oceanía", correcta:"A"},
    {q:"Animal más grande de la Tierra", A:"Elefante africano", B:"Ballena azul", C:"Jirafa", D:"Tiburón blanco", correcta:"B"},
    {q:"Inventor de la bombilla eléctrica", A:"Thomas Edison", B:"Nikola Tesla", C:"Benjamin Franklin", D:"Alexander Graham Bell", correcta:"A"},

    // Nivel 4 (Imposible)
    {q:"¿Cuántos granos de arena hay en la Tierra (aprox.)?", A:"10^18", B:"10^22", C:"10^24", D:"10^30", correcta:"C"},
    {q:"La obra 'Divina Comedia' fue escrita por:", A:"Dante Alighieri", B:"Shakespeare", C:"Goethe", D:"Cervantes", correcta:"A"},
    {q:"Velocidad de la luz en km/s", A:"300,000", B:"150,000", C:"299,792", D:"400,000", correcta:"C"},
    {q:"Número de islas en Indonesia aprox.", A:"17,000", B:"10,000", C:"20,000", D:"25,000", correcta:"A"},
    {q:"¿Qué es un agujero negro?", A:"Un planeta", B:"Un tipo de estrella", C:"Un objeto con gravedad extrema", D:"Una galaxia", correcta:"C"},
    {q:"Número de combinaciones posibles de un cubo Rubik", A:"43 quintillones", B:"12 millones", C:"1 billón", D:"Infinitas", correcta:"A"},
    {q:"¿Quién pintó 'La última cena'?", A:"Leonardo da Vinci", B:"Michelangelo", C:"Raphael", D:"Donatello", correcta:"A"},
    {q:"Distancia media de la Tierra al Sol en km", A:"149,600,000", B:"100,000,000", C:"200,000,000", D:"50,000,000", correcta:"A"},
    {q:"Significado de 'quimera'", A:"Animal mitológico o ilusión", B:"Hormona", C:"Río", D:"Enfermedad", correcta:"A"},
    {q:"Número de cromosomas en el ser humano", A:"46", B:"23", C:"44", D:"48", correcta:"A"}
];

let puntosJ1 = 0;
let puntosJ2 = 0;
let erroresJ1 = 0;
let erroresJ2 = 0;
let indexPregunta = 0;
let preguntaActiva = true;

function iniciarPreguntas() {
    mostrarPregunta();
}

function mostrarPregunta() {
    if(indexPregunta >= preguntas.length){
        finalizarJuego();
        return;
    }
    preguntaActiva = true;
    const p = preguntas[indexPregunta];
    document.getElementById('preguntaTexto').textContent = p.q;
    ["A","B","C","D"].forEach(l=>{
        document.getElementById('j1'+l).textContent = l+". "+p[l];
        document.getElementById('j2'+l).textContent = l+". "+p[l];
    });
    document.getElementById('puntos1').textContent = puntosJ1;
    document.getElementById('puntos2').textContent = puntosJ2;
}

function responder(jugador, opcion){
    if(!preguntaActiva) return;
    const p = preguntas[indexPregunta];
    preguntaActiva = false;

    if(opcion === p.correcta){
        if(jugador===1) puntosJ1++;
        else puntosJ2++;
        document.getElementById('mensajeFinal').style.color = 'green';
        document.getElementById('mensajeFinal').textContent = `Jugador ${jugador} respondió correcto!`;
    } else {
        document.getElementById('mensajeFinal').style.color = 'red';
        document.getElementById('mensajeFinal').textContent = `Jugador ${jugador} respondió incorrecto!`;
        if(jugador===1){
            erroresJ1++;
            if(erroresJ1 % 2 === 0 && puntosJ1>0) puntosJ1--;
        } else {
            erroresJ2++;
            if(erroresJ2 % 2 === 0 && puntosJ2>0) puntosJ2--;
        }
    }

    indexPregunta++;
    setTimeout(()=>{
        document.getElementById('mensajeFinal').textContent = '';
        mostrarPregunta();
    },1200);
}

function finalizarJuego() {
    let ganador = '';
    if(puntosJ1 > puntosJ2) ganador = 'Jugador 1 gana! 🎉';
    else if(puntosJ2 > puntosJ1) ganador = 'Jugador 2 gana! 🎉';
    else ganador = '¡Empate!';
    document.getElementById('preguntaTexto').textContent = `🏆 Juego terminado! ${ganador}`;
}
