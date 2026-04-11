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

let pilotos = JSON.parse(localStorage.getItem('pilotos')) || [];  // busca en el localStorage si hay algo con el valor pilotos, si lo haylo pasa a array ya que
                                                                    // el localStorage solo guarda String y luego le dice que si no encuentra ninguno en vez de devolver null devuelva vacio



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
                ${naves.map(nave => `<option value="${nave.id}">${nave.nombre}</option>`).join('')}  // recorrer las distintas naves y crea opciones, el valor es la clave id,
                                                                                                    //  muestra el nombre que le corresponde y vuelve a convertirlo en cadena
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
    document.getElementById('form-piloto').addEventListener('submit', addPiloto);
}
renderFormularioPiloto();

function addPiloto(e) {
    e.preventDefault();

    // 1. Recoger los valores del formulario
    const nombre = document.getElementById('piloto-nombre').value.trim();
    const rango = document.getElementById('piloto-rango').value.trim();
    const nave = document.getElementById('piloto-nave').value;
    const victorias = Number(document.getElementById('piloto-victorias').value);
    const estado = document.getElementById('piloto-estado').value;

    // 2. Validar
    if (nombre === '' || rango === '' || nave === '' || victorias < 0) {
        alert('Por favor rellena todos los campos correctamente');
        return;
    }

    // Crea el objeto piloto
    const nuevoPiloto = {
        id: Date.now(),
        nombre,
        rango,
        nave,
        victorias,
        estado
    };

    pilotos.push(nuevoPiloto);
    localStorage.setItem('pilotos', JSON.stringify(pilotos)); // convierte el array en texto para guardarlo en el LocalStorage
    renderPilotos();
}

function renderPilotos() {
    const contenedor = document.getElementById('lista-pilotos');
    contenedor.innerHTML = '';

    if (pilotos.length === 0) {
        contenedor.innerHTML = '<p>No hay pilotos registrados</p>';
        return;
    }

    pilotos.forEach(piloto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        tarjeta.innerHTML = `
            <h3>✈️ ${piloto.nombre}</h3>
            <p>Rango: ${piloto.rango}</p>
            <p>Nave: ${naves.find(n => n.id == piloto.nave)?.nombre || 'Sin nave'}</p>
            <p>Victorias: ${piloto.victorias}</p>
            <p>Estado: ${piloto.estado}</p>
            <button onclick="eliminarPiloto(${piloto.id})">🗑️ Eliminar</button>
        `;

        contenedor.appendChild(tarjeta);
    });
}

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
