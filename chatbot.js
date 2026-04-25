/**
 * chatbot.js — Asistente Tux para FLISoL UNPAZ 2026
 * Licencia: GPL-3.0
 *
 * Chatbot de solo lectura: responde únicamente sobre el contenido
 * de esta página (evento, Software Libre, libertades, licencias,
 * cómo contribuir y el mural de participantes).
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════
     BASE DE CONOCIMIENTO
     Cada entrada tiene palabras clave y su respuesta en HTML.
  ══════════════════════════════════════ */
  const KB = [
    {
      kw: ['hola', 'hey', 'buenas', 'buen dia', 'buenos dias', 'saludos', 'que tal', 'bienvenido'],
      r: '¡Hola! Soy <strong>Tux</strong> 🐧, el asistente del FLISoL UNPAZ 2026.<br>Podés preguntarme sobre el evento, el Software Libre, las 4 libertades, licencias o cómo contribuir.'
    },
    {
      kw: ['flisol', 'festival', 'latinoamericano', 'de que trata', 'que es esto', 'primera huella', 'charla taller', 'charla-taller'],
      r: '<strong>FLISoL</strong> (Festival Latinoamericano de Instalación de Software Libre) es el evento de Software Libre más grande de América Latina.<br><br>Esta edición, <strong>FLISoL UNPAZ 2026</strong>, es una charla-taller llamada <em>"Tu primera huella en Internet"</em>: aprendés a colaborar en proyectos de Software Libre desde tu navegador, sin saber programar.'
    },
    {
      kw: ['cuando', 'fecha', 'horario', 'hora', 'que dia', 'sabado', 'sábado', 'abril', '25 de abril', '15 hs'],
      r: '📅 La charla es el <strong>sábado 25 de abril de 2026 a las 15 hs</strong> en el <strong>Aula 210</strong>.'
    },
    {
      kw: ['donde', 'lugar', 'ubicacion', 'aula', 'sede', 'direccion', 'alem', '4731', 'jose c paz', 'unpaz', '210'],
      r: '📍 <strong>UNPAZ — Sede Central</strong><br>Av. Presidente Perón (Alem) 4731, José C. Paz<br>Aula <strong>210</strong>.'
    },
    {
      kw: ['matias', 'ríos', 'rios', 'quien da', 'quien habla', 'expositor', 'disertante', 'presentador'],
      r: 'La charla la da <strong>Matías Ríos</strong> 👤, colaborador de proyectos de Software Libre y parte de la comunidad FLISoL UNPAZ.'
    },
    {
      kw: ['software libre', 'que es libre', 'que es el software libre', 'open source', 'codigo abierto', 'fuente abierta'],
      r: 'El <strong>Software Libre</strong> no se trata del precio, sino del control. Garantiza que vos, como usuario, tenés libertades reales:<br><br>✅ El código fuente es público y auditable<br>✅ Podés modificarlo para tus necesidades<br>✅ Podés compartirlo con quien quieras<br>✅ La comunidad detecta y corrige errores<br>✅ Nadie puede quitarte el acceso<br><br>Ejemplos: Linux, Firefox, LibreOffice, VLC.'
    },
    {
      kw: ['propietario', 'privativo', 'diferencia', 'diferencias', 'comparacion', 'windows', 'photoshop', 'microsoft office'],
      r: 'El <strong>Software Propietario</strong> es lo opuesto al Software Libre:<br><br>❌ El código es secreto — confiás a ciegas<br>❌ No podés modificarlo, aunque sea tuyo<br>❌ Redistribuirlo puede ser ilegal<br>❌ Solo la empresa puede corregir errores<br>❌ Pueden desactivarlo o cobrarte más<br><br>Ejemplos: Windows, Photoshop, Microsoft Office.'
    },
    {
      kw: ['4 libertades', 'cuatro libertades', 'libertades del software', 'stallman', 'richard stallman', '1985'],
      r: 'Las <strong>4 Libertades del Software Libre</strong>, definidas por Richard Stallman en 1985. Un software es libre si y solo si garantiza las cuatro:<br><br>🔓 <strong>0</strong> — Usar: para cualquier propósito<br>📖 <strong>1</strong> — Estudiar: acceder al código fuente<br>📤 <strong>2</strong> — Distribuir: compartir copias<br>🔧 <strong>3</strong> — Mejorar: modificar y publicar mejoras'
    },
    {
      kw: ['libertad 0', 'libertad cero', 'usar el programa', 'ejecutar'],
      r: '<strong>Libertad 0 — Usar</strong> 🔓<br>Correr el programa para cualquier propósito, sin restricciones ni permisos.<br><br><em>Ej: instalar Linux en todas las computadoras de tu escuela.</em>'
    },
    {
      kw: ['libertad 1', 'libertad uno', 'estudiar', 'codigo fuente', 'leer el codigo'],
      r: '<strong>Libertad 1 — Estudiar</strong> 📖<br>Acceder al código fuente y entender exactamente cómo funciona el programa.<br><br><em>Ej: leer el código de Firefox y ver cómo maneja tu historial.</em>'
    },
    {
      kw: ['libertad 2', 'libertad dos', 'distribuir', 'compartir copias'],
      r: '<strong>Libertad 2 — Distribuir</strong> 📤<br>Compartir copias del software con quien quieras, gratis o cobrando.<br><br><em>Ej: grabar un pendrive con LibreOffice y regalarlo.</em>'
    },
    {
      kw: ['libertad 3', 'libertad tres', 'mejorar', 'modificar el programa', 'publicar mejoras'],
      r: '<strong>Libertad 3 — Mejorar</strong> 🔧<br>Modificar el programa y publicar las mejoras para que toda la comunidad se beneficie.<br><br><em>Ej: traducir una app al español y publicar la traducción.</em>'
    },
    {
      kw: ['licencias', 'licencia', 'legal', 'garantia', 'documento legal'],
      r: 'Las <strong>licencias</strong> son los documentos legales que garantizan las libertades del Software Libre. Las tres más usadas son:<br><br>📜 <strong>GPL</strong> — copyleft: si usás código GPL tu proyecto también debe ser libre<br>📜 <strong>MIT</strong> — muy permisiva: podés usarla hasta en proyectos propietarios<br>📜 <strong>Apache 2.0</strong> — como MIT pero con protección de patentes'
    },
    {
      kw: ['gpl', 'gnu general', 'copyleft', 'gpl-2', 'gpl-3', 'gpl3', 'gpl2', 'licencia gpl'],
      r: '<strong>GPL — GNU General Public License</strong> 📜<br>La más usada en Software Libre. Tiene <em>copyleft</em>: si usás código GPL en tu proyecto, tu proyecto también debe ser libre. Protege que el código nunca sea privatizado.<br><br>Ejemplos: Linux, WordPress, Git.<br><br>Este sitio usa <strong>GPL-3.0</strong>.'
    },
    {
      kw: ['mit', 'massachusetts institute', 'licencia mit'],
      r: '<strong>MIT — Massachusetts Institute of Technology</strong> 📜<br>Muy permisiva. Podés usar el código en casi cualquier proyecto, incluso propietario, siempre que mantengas el aviso de autoría.<br><br>Ejemplos: jQuery, React, Ruby on Rails.'
    },
    {
      kw: ['apache', 'apache 2', 'apache 2.0', 'licencia apache'],
      r: '<strong>Apache 2.0</strong> 📜<br>Similar a MIT pero con protección adicional de patentes. Muy usada en proyectos empresariales que quieren ser abiertos.<br><br>Ejemplos: Android, Kubernetes, TensorFlow.'
    },
    {
      kw: ['licencia del proyecto', 'gpl-3.0', 'que licencia usa', 'licencia de este sitio'],
      r: 'Este sitio usa la licencia <strong>GPL-3.0</strong>: podés usarlo, modificarlo y distribuirlo, pero si publicás una versión mejorada, también tiene que ser libre. Podés ver la licencia completa en el archivo <code>LICENCIA</code>.'
    },
    {
      kw: ['contribuir', 'colaborar', 'ayudar', 'participar', 'como me sumo', 'dejar huella', 'como contribuyo', 'como participo'],
      r: 'Hay <strong>3 formas de contribuir</strong>, según tu nivel:<br><br>🧪 <strong>Nivel 1 — Tester</strong>: probás el sitio y reportás problemas como Issues en Codeberg. Sin cuenta ni instalación.<br><br>✏️ <strong>Nivel 2 — Contribuidor</strong>: agregás tu nombre al mural editando <code>contributors.json</code> desde el navegador.<br><br>💻 <strong>Nivel 3 — Desarrollador</strong>: clonás el repo, modificás el código y abrís un Pull Request.'
    },
    {
      kw: ['nivel 1', 'tester', 'testear', 'probar el sitio', 'issue', 'reportar', 'bug', 'error'],
      r: '<strong>Nivel 1 — 🧪 Tester</strong><br>Probás el sitio y reportás si algo no funciona. No necesitás cuenta ni instalar nada.<br><br>1. Abrí el sitio en tu dispositivo<br>2. Revisá que todo se vea bien<br>3. Si algo falla → abrí un <strong>Issue</strong> en Codeberg y describí el problema<br><br>Ejercés la Libertad <strong>0</strong>.'
    },
    {
      kw: ['nivel 2', 'contribuidor', 'agregar al mural', 'pull request', 'pr', 'fork', 'contributors.json'],
      r: '<strong>Nivel 2 — ✏️ Contribuidor</strong><br>Agregás tu nombre al mural desde el navegador.<br><br>1. Abrí <code>contributors.json</code> en Codeberg<br>2. Fork del repositorio<br>3. Agregá tu entrada (nombre, ciudad, mensaje)<br>4. "Propose file change" → "Create Pull Request"<br>5. Cuando sea mergeado, aparecés en el mural 🎉<br><br>Ejercés la Libertad <strong>3</strong>.'
    },
    {
      kw: ['nivel 3', 'desarrollador', 'developer', 'clonar', 'git clone', 'terminal', 'programar'],
      r: '<strong>Nivel 3 — 💻 Desarrollador</strong><br>1. Fork + <code>git clone</code> desde Codeberg<br>2. <code>index.html</code> → estructura<br>   <code>style.css</code> → diseño<br>   <code>app.js</code> → lógica<br>3. Probá con <code>python3 -m http.server</code><br>4. <code>git commit</code> + <code>git push</code> + Pull Request<br><br>Ejercés las <strong>4 libertades</strong>.'
    },
    {
      kw: ['mural', 'participantes', 'tarjetas', 'quienes estan', 'tarjeta', 'nombres'],
      r: 'El <strong>Mural de Participantes</strong> es una grilla de tarjetas donde aparece cada persona que hizo su primera contribución al proyecto. Para aparecer, editás <code>contributors.json</code> en Codeberg y enviás un Pull Request. ¡Cada tarjeta es una primera huella en el Software Libre!'
    },
    {
      kw: ['codeberg', 'repositorio', 'repo', 'codigo del sitio', 'ver codigo', 'ver el codigo', 'codigo fuente', 'github'],
      r: 'El código está en <strong>Codeberg</strong>, una plataforma libre y gratuita (alternativa a GitHub):<br><code>codeberg.org/flisol26/flisolweb</code><br><br>Tres archivos principales:<br>• <code>index.html</code> — estructura<br>• <code>style.css</code> — diseño<br>• <code>app.js</code> — lógica del mural<br><br>Podés usar el botón "Ver código ↗" del menú.'
    },
    {
      kw: ['linux', 'tux', 'pinguino', 'kernel', 'linus torvalds', 'linus'],
      r: '🐧 ¡Ese soy yo! <strong>Tux</strong>, la mascota de Linux.<br><br>Linux es el kernel libre más usado del mundo, creado por Linus Torvalds en 1991. Está en servidores, Android, supercomputadoras y millones de escritorios. Usa licencia <strong>GPL-2.0</strong>.'
    },
    {
      kw: ['gracias', 'thanks', 'muchas gracias', 'perfecto', 'genial', 'excelente', 'buenisimo', 'estuvo bien'],
      r: '¡De nada! 🐧 Si tenés más dudas sobre el FLISoL o el Software Libre, estoy acá.'
    },
    {
      kw: ['chau', 'hasta luego', 'bye', 'adios', 'nos vemos', 'hasta pronto'],
      r: '¡Hasta luego! 🐧 Recordá: <strong>sábado 25/4 a las 15 hs</strong> en el Aula 210. ¡Te esperamos!'
    }
  ];

  const FALLBACK = 'No tengo información sobre eso. Puedo ayudarte con:<br>• 📅 Fecha, lugar y detalles del evento<br>• 🐧 Qué es el Software Libre<br>• 🔓 Las 4 Libertades (0 a 3)<br>• 📜 Licencias: GPL, MIT, Apache<br>• 🤝 Cómo contribuir (3 niveles)<br>• 🎨 El Mural de Participantes';

  /* ══════════════════════════════════════
     COINCIDENCIA DE TEXTO
  ══════════════════════════════════════ */
  function normalize(text) {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findResponse(userInput) {
    const q = normalize(userInput);
    let best = null;
    let bestScore = 0;

    for (const item of KB) {
      let score = 0;
      for (const kw of item.kw) {
        const nkw = normalize(kw);
        if (q.includes(nkw)) {
          score += nkw.split(' ').length * 2;
        } else {
          for (const word of nkw.split(' ')) {
            if (word.length > 3 && q.includes(word)) score += 1;
          }
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }

    return bestScore >= 2 ? best.r : FALLBACK;
  }

  /* ══════════════════════════════════════
     DOM — Referencias
  ══════════════════════════════════════ */
  const toggle    = document.getElementById('chatbot-toggle');
  const closeBtn  = document.getElementById('chatbot-close');
  const chatPanel = document.getElementById('chatbot-window');
  const messages  = document.getElementById('chatbot-messages');
  const input     = document.getElementById('chatbot-input');
  const sendBtn   = document.getElementById('chatbot-send');
  const badge     = document.getElementById('chatbot-badge');

  let isOpen    = false;
  let welcomed  = false;

  /* ══════════════════════════════════════
     ACCIONES
  ══════════════════════════════════════ */
  function openChat() {
    isOpen = true;
    chatPanel.classList.add('open');
    chatPanel.setAttribute('aria-hidden', 'false');
    badge.classList.add('hidden');
    input.focus();
    if (!welcomed) {
      welcomed = true;
      addMsg('bot', '¡Hola! Soy <strong>Tux</strong> 🐧, el asistente de FLISoL UNPAZ 2026.<br>Preguntame sobre el evento, el Software Libre, las licencias o cómo contribuir.');
    }
  }

  function closeChat() {
    isOpen = false;
    chatPanel.classList.remove('open');
    chatPanel.setAttribute('aria-hidden', 'true');
    toggle.focus();
  }

  function addMsg(role, html) {
    const div = document.createElement('div');
    div.className = 'chatbot-msg chatbot-msg--' + role;
    div.innerHTML = html;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chatbot-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMsg('user', escHtml(text));
    const typing = showTyping();
    setTimeout(function () {
      typing.remove();
      addMsg('bot', findResponse(text));
    }, 500 + Math.random() * 350);
  }

  /* ══════════════════════════════════════
     EVENTOS
  ══════════════════════════════════════ */
  toggle.addEventListener('click', function () { isOpen ? closeChat() : openChat(); });
  closeBtn.addEventListener('click', closeChat);
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleSend(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) closeChat(); });

})();
