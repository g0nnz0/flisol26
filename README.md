# 🐧 FLISoL UNPAZ 2026 — Tu primera huella en Internet

Sitio web de la charla **"Tu primera huella en Internet: Cómo colaborar en Software Libre"**
por **Matías Ríos** · Sábado 25/4 · 15 hs · Aula 210 · UNPAZ

**[→ Ver el sitio](https://flisol26.codeberg.page/flisolweb)**

---

## Estructura del proyecto

El código está separado en archivos para que sea fácil de leer y modificar.
Cada archivo tiene una responsabilidad clara:

```
flisol-demo/
│
├── index.html          ← estructura de la página (qué hay)
├── style.css           ← diseño y colores (cómo se ve)
├── app.js              ← lógica del mural (cómo funciona)
│
├── contributors.json   ← datos de los participantes (quiénes están)
│
├── LICENCIA            ← GPL-3.0
└── README.md           ← este archivo
```

**¿Querés cambiar los colores?** → Editá `style.css`, buscá la sección `:root`

**¿Querés cambiar la lógica del mural?** → Editá `app.js`

**¿Querés agregar tu nombre?** → Editá `contributors.json`

---

## Cómo contribuir según tu nivel

### 🧪 Nivel 1 — Tester

Abrí el sitio en tu dispositivo y reportá si algo no funciona.

1. Abrí [flisol26.codeberg.page/flisolweb](https://flisol26.codeberg.page/flisolweb)
2. Si algo se ve mal o no funciona, abrí un **Issue** en Codeberg:
   - ¿Qué viste? ¿Qué esperabas ver?
   - ¿Desde qué dispositivo y navegador?

**Libertad que ejercés: Libertad 0** — usás y auditás el software.

---

### ✏️ Nivel 2 — Contribuidor (desde el navegador, sin instalar nada)

> **¿Por qué Codeberg pide un fork?**
> No sos colaborador del repo, así que no podés editar directamente —
> eso protege el código del proyecto. Un fork es tu copia personal donde
> podés hacer cambios y luego proponerlos. Eso es la **Libertad 3** en acción.

1. Abrí [`contributors.json`](./contributors.json) en Codeberg
2. Clic en **"Bifurcar"**: Con esto te permitirá crear una copia del repositorio original en tu cuenta.
3. Ahora si podés editar lo que quieras. Agregá tu entrada al final del array `contributors`, antes del `]`:

```json
{
  "nombre": "Tu Nombre",
  "ciudad": "Tu Ciudad, País",
  "mensaje": "Tu mensaje sobre el Software Libre",
  "rol": "sugiere",
  "libertad_favorita": "1"
}
```

> ⚠️ Si no es el último elemento, agregá una coma `,` al final del `}` anterior.

Valores válidos:
- **`rol`**: `"tester"` · `"sugiere"` · `"developer"`
- **`libertad_favorita`**: `"0"` · `"1"` · `"2"` · `"3"`

4. Clic en **Crear commit de los cambios**
5. En la solapa de Pull Request. Clic en **Nuevo pull request**
6. Selecciona fusionar en flisol26:main <-- recuperar de: turepositorio. Clic en **Nuevo pull request**
7. Clic en **Create pull request**
8. Cuando sea mergeado, tu tarjeta aparece en el sitio 🎉

**Libertad que ejercés: Libertad 3** — mejorás el software y publicás el cambio.

---

### 💻 Nivel 3 — Desarrollador

Cloná el repo, modificá el código y abrí un Pull Request.

```bash
# 1. Fork del repo desde Codeberg

# 2. Clonar tu fork
git clone https://codeberg.org/flisol26/flisolweb
cd flisolweb

# 3. Crear una rama para tu cambio
git checkout -b mi-mejora

# 4. Probar localmente
python3 -m http.server 8000
# → Abrí http://localhost:8000

# 5. Hacer el cambio
#    Colores → style.css sección :root
#    Layout  → style.css sección correspondiente
#    Lógica  → app.js
#    Datos   → contributors.json

# 6. Commit y push
git add .
git commit -m "Descripción de mi mejora"
git push origin mi-mejora

# 7. Abrir Pull Request desde Codeberg
```

Ideas para mejorar el proyecto:
- Agregar filtro por libertad favorita en el mural
- Hacer que las tarjetas se ordenen por fecha de merge
- Mejorar la accesibilidad (ARIA, contraste)
- Agregar modo oscuro / claro
- Traducir el sitio a otro idioma

**Libertad que ejercés: las 4 libertades.**

---

## Despliegue en Codeberg Pages

El sitio se publica desde el branch `pages`.

Para activarlo en tu fork:
1. Asegurate de que el branch `pages` exista con los archivos del sitio
2. El sitio queda disponible en `flisol26.codeberg.page/flisolweb`

Para actualizar, cualquier push al branch `pages` redespliega el sitio automáticamente.

---

## Licencia

**GPL-3.0** — Podés usar este código, modificarlo y distribuirlo,
siempre que tu versión también sea libre.

Ver [`LICENCIA`](./LICENCIA) · [gnu.org/licenses/gpl-3.0](https://www.gnu.org/licenses/gpl-3.0)

---

## Recursos para seguir

- [codeberg.org](https://codeberg.org) — plataforma de repositorios 100% libre
- [gnu.org/philosophy](https://www.gnu.org/philosophy/) — las 4 libertades
- [choosealicense.com](https://choosealicense.com) — elegir una licencia
- [firstcontributions.github.io](https://firstcontributions.github.io) — guía para tu primer PR
- [flisol.unpaz.edu.ar](https://flisol.unpaz.edu.ar) — más info del evento
