// MENÚ
function mostrarJuego(id) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ------------------
// JUEGOS ANTERIORES
// ------------------

// Adivina el número
const numeroSecreto = Math.floor(Math.random() * 10) + 1;
function adivinar() {
    const valor = parseInt(document.getElementById('numero').value);
    const mensaje = document.getElementById('mensaje');
    if(isNaN(valor) || valor<1 || valor>10) { mensaje.textContent="❌ Ingresa un número válido"; return; }
    if(valor===numeroSecreto) mensaje.textContent="🎉 Correcto!";
    else if(valor<numeroSecreto) mensaje.textContent="⬆️ Más alto";
    else mensaje.textContent="⬇️ Más bajo";
}

// Piedra Papel Tijeras
function jugar(eleccion) {
    const opciones = ['piedra','papel','tijeras'];
    const comp = opciones[Math.floor(Math.random()*3)];
    let r = `Tú: ${eleccion}, CPU: ${comp}. `;
    if(eleccion===comp) r+="😐 Empate";
    else if((eleccion==='piedra'&&comp==='tijeras')||(eleccion==='papel'&&comp==='piedra')||(eleccion==='tijeras'&&comp==='papel')) r+="🎉 Ganaste!";
    else r+="💻 Perdiste!";
    document.getElementById('resultado').textContent = r;
}

// Trivia
const preguntas = [
    {q:"Capital de Francia?", a:"paris"},
    {q:"5+7=?", a:"12"},
    {q:"Color del cielo?", a:"azul"},
    {q:"Meses con 30 días?", a:"4"},
    {q:"Lenguaje de páginas web?", a:"html"},
    {q:"Capital de España?", a:"madrid"},
    {q:"Cuántos continentes?", a:"7"},
    {q:"Animal que dice 'miau'?", a:"gato"},
    {q:"Elemento químico Oxígeno?", a:"o"},
    {q:"Raíz cuadrada de 144?", a:"12"}
];
let puntos=0, pregActual=0;
document.getElementById('pregunta').textContent = preguntas[pregActual].q;
function verificarRespuesta() {
    const resp = document.getElementById('respuesta').value.toLowerCase();
    const mensaje = document.getElementById('mensajeTrivia');
    if(resp===preguntas[pregActual].a){puntos++; mensaje.textContent="✅ Correcto!";}
    else mensaje.textContent=`❌ Incorrecto! Respuesta: ${preguntas[pregActual].a}`;
    document.getElementById('puntos').textContent=puntos;
    pregActual++;
    if(pregActual<preguntas.length){document.getElementById('pregunta').textContent=preguntas[pregActual].q; document.getElementById('respuesta').value='';}
    else {document.getElementById('pregunta').textContent="¡Se acabaron las preguntas!"; document.getElementById('respuesta').style.display='none';}
}

// Botón Tontorrón
const botonTonto = document.getElementById('botonTonto');
let intentos=0;
botonTonto.addEventListener('click', ()=>{
    intentos++; document.getElementById('intentos').textContent=intentos;
    const maxX = window.innerWidth - botonTonto.offsetWidth - 20;
    const maxY = 200 - botonTonto.offsetHeight;
    botonTonto.style.left = Math.floor(Math.random()*maxX)+'px';
    botonTonto.style.top = Math.floor(Math.random()*maxY)+'px';
});

// Caballos
function apostar(num){
    const ganador = Math.floor(Math.random()*3)+1;
    document.getElementById('resultadoCaballos').textContent = ganador===num ? "🏆 ¡Ganaste!" : `💥 Perdiste! Ganó el caballo ${ganador}`;
}

// Ruleta
function girar(color){
    const colores = ['rojo','negro','verde'];
    const elegido = colores[Math.floor(Math.random()*3)];
    document.getElementById('resultadoRuleta').textContent = color===elegido ? "🎉 Ganaste!" : `💥 Perdiste! Salió ${elegido}`;
}

// ------------------
// NUEVOS JUEGOS
// ------------------

// Reflejos Ninja
let puntosNinja=0;
const contCuadros=document.getElementById('cuadrados');
function generarCuadros(){
    contCuadros.innerHTML='';
    for(let i=0;i<9;i++){
        const div=document.createElement('div');
        div.addEventListener('touchstart',()=>{ if(div.style.background==='green'){ puntosNinja++; document.getElementById('puntosNinja').textContent=puntosNinja; generarCuadros(); } });
        contCuadros.appendChild(div);
    }
    const verde = contCuadros.children[Math.floor(Math.random()*9)];
    verde.style.background='green';
}
generarCuadros();

// Aquí se podrían añadir scripts de los otros juegos nuevos (Tiro al Blanco, Atrapa Diamantes, Esquiva Meteoro, Burger Builder, Bomba)
// Se usarían canvas, touch events y requestAnimationFrame para móvil
