let naves = [
{
    id: 1, nombre: 'X-Wing', tipo: 'Caza', velocidad: 2000, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🚀'
},

{
    id: 2, nombre: 'TIE Fighter', tipo: 'Caza', velocidad: 1500, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🛸'
}, 

{
     id: 3, nombre: 'Millennium Falcon', tipo: 'Transporte', velocidad: 1050, tripulacion: 4, estado: 'operativa', emojiRepresentativo: '🛳️'
},
 
{
    id: 4, nombre: 'Star Destroyer', tipo: 'Destructor', velocidad: 975, tripulacion: 47000, estado: 'operativa', emojiRepresentativo: '🚢'
},

{
    id: 5, nombre: 'Death Star', tipo: 'Estrella de la Muerte', velocidad: 0, tripulacion: 1000000, estado: 'destruida', emojiRepresentativo: '💥'
},

{
    id: 6, nombre: 'TIE Interceptor', tipo: 'Caza', velocidad: 1700, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🛸'
},
{
    id: 7, nombre: 'Slave I', tipo: 'Caza', velocidad: 1200, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🛰️'
},
{
    id: 8, nombre: 'Y-Wing', tipo: 'Bombardero', velocidad: 1500, tripulacion: 2, estado: 'operativa', emojiRepresentativo: '🦅'
},

{
    id: 9, nombre: 'A-Wing', tipo: 'Caza', velocidad: 1900, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🦆'
},

{
    id: 10, nombre: 'B-Wing', tipo: 'Caza', velocidad: 1600, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🦇'
}
];

<<<<<<< HEAD

function renderFormularioPiloto() {
    const contenedor = document.getElementById('contenedor-formulario-piloto');
 contenedor.innerHTML = `
        <form id="form-piloto">
            <h3>Añadir Piloto</h3>
            <label for="piloto-nombre">Nombre</label>
            <input type="text" id="piloto-nombre" placeholder="Ej: Luke Skywalker">

            <label for="piloto-rango">Rango</label>
            <input type="text" id="piloto-rango" placeholder="Ej: Comandante">

            <label for="piloto-nave">Nave asignada</label>
            <select id="piloto-nave">
                <option value="">-- Selecciona una nave --</option>
                ${naves.map(nave => `<option value="${nave.id}">${nave.nombre}</option>`).join('')}
            </select>

            <label for="piloto-victorias">Victorias en combate</label>
            <input type="number" id="piloto-victorias" placeholder="Ej: 10" min="0">

            <label for="piloto-estado">Estado</label>
            <select id="piloto-estado">
                <option value="activo">Activo</option>
                <option value="herido">Herido</option>
                <option value="KIA">KIA</option>
            </select>

            <button type="submit">➕ Añadir piloto</button>
        </form>
    `;
}
renderFormularioPiloto();

document.querySelectorAll('nav button').forEach(boton => {
    boton.addEventListener('click', () => {
        const seccion = boton.dataset.seccion;

        // Ocultar todas las secciones
        document.querySelectorAll('.seccion').forEach(s => {
            s.classList.remove('activa');
            s.classList.add('oculta');
        });

        // Mostrar la sección elegida
        document.getElementById(seccion).classList.remove('oculta');
        document.getElementById(seccion).classList.add('activa');
    });
});
=======
const seleccionarBoton= document.querySelectorAll('[data-seccion]');
const seleccionarNav= document.querySelectorAll('.seccion');

seleccionarBoton.forEach((boton) => {               //recorrer cada boton. primero una lambda y después hice un for normal, más entendible.   
    boton.addEventListener('click', function() {
        for (let i = 0; i < seleccionarNav.length; i++) {
            seleccionarNav[i].classList.remove('activa');
        }
        document.getElementById(boton.dataset.seccion) 
        .classList.add('activa');                           

    });
});
>>>>>>> daa47d72dc698d43e491dd51925b0f22db802252
