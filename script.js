/* ===== Control del menú ===== */
function mostrarJuego(id){
  document.getElementById('menu').style.display='none';
  document.querySelectorAll('.juego').forEach(s=>s.style.display='none');
  document.getElementById(id).style.display='block';
}
function volverMenu(){
  document.getElementById('menu').style.display='block';
  document.querySelectorAll('.juego').forEach(s=>s.style.display='none');
}

/* ===== Adivina el número ===== */
let numeroSecreto=Math.floor(Math.random()*10)+1;
function adivinar(){
  const v=parseInt(document.getElementById('numero').value);
  const m=document.getElementById('mensaje');
  if(v===numeroSecreto){m.textContent="🎉 ¡Correcto!";numeroSecreto=Math.floor(Math.random()*10)+1;}
  else if(v<numeroSecreto)m.textContent="⬆️ Más alto";
  else m.textContent="⬇️ Más bajo";
}

/* ===== Piedra Papel Tijeras ===== */
function jugar(j){
  const o=['piedra','papel','tijeras'];
  const c=o[Math.floor(Math.random()*3)];
  let r=`Tú: ${j} | PC: ${c} → `;
  if(j===c)r+="😐 Empate";
  else if((j==='piedra'&&c==='tijeras')||(j==='papel'&&c==='piedra')||(j==='tijeras'&&c==='papel'))r+="🎉 ¡Ganaste!";
  else r+="💻 Perdiste";
  document.getElementById('resultado').textContent=r;
}

/* ===== Trivia ===== */
const preguntas=[
  {q:"¿Capital de Canadá?",a:"ottawa"},
  {q:"¿Quién pintó la Mona Lisa?",a:"leonardo da vinci"},
  {q:"¿Elemento con símbolo Ag?",a:"plata"},
  {q:"¿Planeta más cercano al sol?",a:"mercurio"},
  {q:"¿Cuántos lados tiene un octágono?",a:"8"}
];
let puntos=0,actual=0;
document.getElementById('pregunta').textContent=preguntas[actual].q;
function verificarRespuesta(){
  const r=document.getElementById('respuesta').value.toLowerCase();
  const msg=document.getElementById('mensajeTrivia');
  if(r===preguntas[actual].a){puntos++;msg.textContent="✅ Correcto";}
  else msg.textContent="❌ Era "+preguntas[actual].a;
  document.getElementById('puntos').textContent=puntos;
  actual++;
  if(actual<preguntas.length){
    document.getElementById('pregunta').textContent=preguntas[actual].q;
    document.getElementById('respuesta').value="";
  } else document.getElementById('pregunta').textContent="🎯 ¡Fin!";
}

/* ===== Botón tontorrón ===== */
const boton=document.getElementById('botonTonto');
let intentos=0;
function mover(){
  intentos++;
  document.getElementById('intentos').textContent=intentos;
  const maxX=window.innerWidth-boton.offsetWidth-50;
  const maxY=100;
  boton.style.left=Math.random()*maxX+"px";
  boton.style.top=Math.random()*maxY+"px";
}
boton.addEventListener('mouseenter',mover);
boton.addEventListener('touchstart',mover);

/* ===== Caballo ===== */
function empezarCaballos(){
  const elegido=parseInt(document.getElementById('caballoElegido').value);
  const mensaje=document.getElementById('mensajeCaballo');
  const ancho=document.getElementById('pistaCaballos').offsetWidth-40;
  const cabs=[document.getElementById('cab1'),document.getElementById('cab2'),document.getElementById('cab3')];
  let pos=[0,0,0];
  mensaje.textContent="🏁 ¡Corriendo!";
  const carrera=setInterval(()=>{
    for(let i=0;i<3;i++){
      pos[i]+=Math.random()*10;
      cabs[i].style.left=pos[i]+"px";
      if(pos[i]>=ancho){
        clearInterval(carrera);
        const ganador=i+1;
        mensaje.textContent = ganador===elegido ? "🎉 ¡Tu caballo ganó!" : `💻 Ganó el caballo ${ganador}`;
      }
    }
  },100);
}

/* ===== Ruleta ===== */
function girarRuleta(){
  const apuesta=document.getElementById('apuestaColor').value;
  const colores=['rojo','negro','verde'];
  const resultado=colores[Math.floor(Math.random()*colores.length)];
  const msg=document.getElementById('resultadoRuleta');
  msg.textContent=`Cayó en ${resultado.toUpperCase()} ${resultado==='rojo'?'🔴':resultado==='negro'?'⚫':'🟢'}`;
  msg.textContent += apuesta===resultado ? " 🎉 ¡Ganaste!" : " ❌ Perdiste.";
}

/* ===== Memoria ===== */
const emojis=["🍎","🍌","🍒","🍇"];
let baraja=[...emojis,...emojis].sort(()=>Math.random()-0.5);
let seleccionadas=[];
const tablero=document.getElementById('tableroMemoria');
baraja.forEach((em,i)=>{
  const c=document.createElement('button');
  c.textContent="❓";
  c.onclick=()=>voltear(c,em);
  tablero.appendChild(c);
});
function voltear(carta,emoji){
  if(carta.textContent!=="❓"||seleccionadas.length===2)return;
  carta.textContent=emoji;
  seleccionadas.push({carta,emoji});
  if(seleccionadas.length===2){
    setTimeout(()=>{
      if(seleccionadas[0].emoji===seleccionadas[1].emoji){
        seleccionadas.forEach(c=>c.carta.disabled=true);
      }else{
        seleccionadas.forEach(c=>c.carta.textContent="❓");
      }
      seleccionadas=[];
    },700);
  }
}

/* ===== Reacción Rápida ===== */
const botonReaccion=document.getElementById('botonReaccion');
const resultadoReaccion=document.getElementById('resultadoReaccion');
let tiempoInicio,espera;
function prepararReaccion(){
  botonReaccion.style.background='red';
  botonReaccion.textContent='Espera...';
  resultadoReaccion.textContent='';
  espera=setTimeout(()=>{
    botonReaccion.style.background='green';
    botonReaccion.textContent='¡Toca ahora!';
    tiempoInicio=Date.now();
  },Math.random()*3000+2000);
}
botonReaccion.onclick=function(){
  if(botonReaccion.style.background==='green'){
    const tiempo=Date.now()-tiempoInicio;
    resultadoReaccion.textContent=`⏱️ Reaccionaste en ${tiempo} ms`;
    prepararReaccion();
  }else{
    clearTimeout(espera);
    resultadoReaccion.textContent='⏰ ¡Te adelantaste!';
    prepararReaccion();
  }
};
prepararReaccion();
