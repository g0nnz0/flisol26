// 1. Inicializar el mapa centrado en Latinoamérica
const map = L.map('map').setView([-10.0, -65.0], 3);

// 2. Cargar las capas de OpenStreetMap (Mapas Libres)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 3. Listado de Sedes FLISoL 2026
const sedes = [
    { nombre: "José C. Paz, Argentina (UNPAZ)", coords: [-34.5154, -58.7681] },
    { nombre: "CABA, Argentina", coords: [-34.6037, -58.3816] },
    { nombre: "Bogotá, Colombia", coords: [4.6097, -74.0817] },
    { nombre: "CDMX, México", coords: [19.4326, -99.1332] },
    { nombre: "Sucre, Bolivia", coords: [-19.0333, -65.2627] },
    { nombre: "Caracas, Venezuela", coords: [10.4806, -66.9036] },
    { nombre: "Brasília, Brasil", coords: [-15.7975, -47.8919] }
];

// 4. Agregar los marcadores al mapa
sedes.forEach(sede => {
    L.marker(sede.coords)
        .addTo(map)
        .bindPopup(`<b>FLISoL 2026</b><br>${sede.nombre}`);
});