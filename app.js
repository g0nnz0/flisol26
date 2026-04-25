/**
 * app.js — FLISoL UNPAZ 2026
 * Licencia: GPL-3.0
 *
 * Este archivo hace una sola cosa:
 * lee contributors.json y construye el mural de participantes.
 *
 * Funciones:
 *   loadContributors()  → lee el JSON desde el servidor
 *   renderMural(lista)  → construye las tarjetas en el DOM
 *   crearTarjeta(datos) → devuelve el HTML de una tarjeta
 *   escaparHTML(texto)  → evita inyección de código malicioso
 *
 * ¿Querés cambiar cómo se ve una tarjeta?
 *   → Modificá crearTarjeta()
 *
 * ¿Querés cargar los datos desde otro lado?
 *   → Modificá loadContributors()
 *
 * ¿Querés agregar filtros o búsqueda?
 *   → Agregá lógica antes de llamar a renderMural()
 */


/* ─── Etiquetas visibles para cada rol ─── */
const ROLES = {
  tester:    { etiqueta: '▸ tester',       clase: 'rol-tester' },
  sugiere:   { etiqueta: '▸ contribuidor', clase: 'rol-sugiere' },
  developer: { etiqueta: '▸ developer',    clase: 'rol-developer' },
};

/* Rol por defecto si el JSON tiene un valor desconocido */
const ROL_DEFAULT = ROLES.sugiere;


/**
 * Punto de entrada principal.
 * Se llama automáticamente cuando carga la página.
 */
async function loadContributors() {
  const grilla   = document.getElementById('mural-grid');
  const contador = document.getElementById('contador');

  try {
    /* Agrega ?v=timestamp para evitar que el navegador use caché */
    const respuesta = await fetch('contributors.json?v=' + Date.now());

    if (!respuesta.ok) {
      throw new Error('No se pudo cargar contributors.json (HTTP ' + respuesta.status + ')');
    }

    const datos = await respuesta.json();
    const lista = datos.contributors || [];

    renderMural(lista, grilla, contador);

  } catch (error) {
    /* Si algo falla, muestra un mensaje amigable en lugar de romperse en silencio */
    grilla.innerHTML = `
      <div class="mural-loading">
        No se pudo cargar el mural.<br>
        <small>Verificá que contributors.json existe en el repositorio.</small>
      </div>
    `;
    contador.textContent = 'error';
    console.error('Error cargando el mural:', error);
  }
}


/**
 * Toma la lista de contribuidores y la dibuja en el DOM.
 *
 * @param {Array}       lista    - Array de objetos del JSON
 * @param {HTMLElement} grilla   - Elemento contenedor del mural
 * @param {HTMLElement} contador - Elemento donde mostrar la cantidad
 */
function renderMural(lista, grilla, contador) {
  grilla.innerHTML = '';

  if (lista.length === 0) {
    grilla.innerHTML = '<div class="mural-loading">Todavía no hay participantes. ¡Sé el primero!</div>';
    contador.textContent = '0 participantes';
    return;
  }

  /* Crea y agrega cada tarjeta con un pequeño delay de animación */
  lista.forEach(function(participante, indice) {
    const tarjeta = crearTarjeta(participante, indice);
    grilla.appendChild(tarjeta);
  });

  /* Actualiza el contador */
  const n = lista.length;
  contador.textContent = n + (n === 1 ? ' participante' : ' participantes');
}


/**
 * Construye el elemento DOM de una tarjeta individual.
 *
 * @param {Object} p      - Datos del participante
 * @param {number} indice - Posición en la lista (para el delay de animación)
 * @returns {HTMLElement}
 */
function crearTarjeta(p, indice) {
  /* Determina el rol — usa default si el valor no existe en el mapa */
  const rol = ROLES[p.rol] || ROL_DEFAULT;

  /* El número de libertad favorita aparece como decoración de fondo */
  const libertad = p.libertad_favorita !== undefined ? p.libertad_favorita : '';

  /* Crea el elemento */
  const tarjeta = document.createElement('div');
  tarjeta.className = 'mural-card';
  tarjeta.style.animationDelay = (indice * 50) + 'ms';

  tarjeta.innerHTML = `
    <div class="mural-libertad">${escaparHTML(String(libertad))}</div>
    <div class="mural-rol ${rol.clase}">${rol.etiqueta}</div>
    <div class="mural-nombre">${escaparHTML(p.nombre || 'Participante')}</div>
    <div class="mural-ciudad">📍 ${escaparHTML(p.ciudad || '')}</div>
    <div class="mural-mensaje">"${escaparHTML(p.mensaje || '')}"</div>
  `;

  return tarjeta;
}


/**
 * Escapa caracteres HTML especiales para evitar XSS.
 * Siempre usá esta función antes de insertar texto del JSON en el DOM.
 *
 * @param {string} texto - Texto a escapar
 * @returns {string}
 */
function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


/* ─── Arranca todo cuando la página termina de cargar ─── */
document.addEventListener('DOMContentLoaded', loadContributors);
