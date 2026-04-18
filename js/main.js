let naves = [
    { id: 1, nombre: 'X-Wing', tipo: 'Caza', velocidad: 2000, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🚀', imagen: 'images/nave1.webp' },
    { id: 2, nombre: 'TIE Fighter', tipo: 'Caza', velocidad: 1500, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🛸', imagen: 'images/nave2.webp' },
    { id: 3, nombre: 'Millennium Falcon', tipo: 'Transporte', velocidad: 1050, tripulacion: 4, estado: 'operativa', emojiRepresentativo: '🛳️', imagen: 'images/nave3.webp' },
    { id: 4, nombre: 'Star Destroyer', tipo: 'Destructor', velocidad: 975, tripulacion: 47000, estado: 'operativa', emojiRepresentativo: '🚢', imagen: 'images/nave4.webp' },
    { id: 5, nombre: 'Death Star', tipo: 'Estrella de la Muerte', velocidad: 0, tripulacion: 1000000, estado: 'destruida', emojiRepresentativo: '💥', imagen: 'images/nave5.webp' },
    { id: 6, nombre: 'TIE Interceptor', tipo: 'Caza', velocidad: 1700, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🛸', imagen: 'images/nave6.webp' },
    { id: 7, nombre: 'Slave I', tipo: 'Caza', velocidad: 1200, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🛰️', imagen: 'images/nave7.webp' },
    { id: 8, nombre: 'Y-Wing', tipo: 'Bombardero', velocidad: 1500, tripulacion: 2, estado: 'operativa', emojiRepresentativo: '🦅', imagen: 'images/nave8.webp' },
    { id: 9, nombre: 'A-Wing', tipo: 'Caza', velocidad: 1900, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🦆', imagen: 'images/nave9.webp' },
    { id: 10, nombre: 'B-Wing', tipo: 'Caza', velocidad: 1600, tripulacion: 1, estado: 'operativa', emojiRepresentativo: '🦇', imagen: 'images/nave10.webp' }
];

// funcion que muestra las secciones al hacer click en el boton correspondiente.

let pilotos = JSON.parse(localStorage.getItem('pilotos')) || [];  // busca en el localStorage si hay algo con el valor pilotos, si lo haylo pasa a array ya que
                                                                    // el localStorage solo guarda String y luego le dice que si no encuentra ninguno en vez de devolver null devuelva vacio
let misiones = JSON.parse(localStorage.getItem('misiones')) || [];

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
    //${naves.map(nave => `<option value="${nave.id}">${nave.nombre}</option>`).join('')}  
    // recorrer las distintas naves y crea opciones, el valor es la clave id,
    //  muestra el nombre que le corresponde y vuelve a convertirlo en cadena
    
    document.getElementById('form-piloto').addEventListener('submit', addPiloto);
}

function addPiloto(e) {
    e.preventDefault();

    // 1. Recoger los valores del formulario
    const nombre = document.getElementById('piloto-nombre').value.trim();
    const rango = document.getElementById('piloto-rango').value.trim();
    const nave = document.getElementById('piloto-nave').value;
    const victorias = Number(document.getElementById('piloto-victorias').value);
    const estado = document.getElementById('piloto-estado').value;

    // 2. Validar
    //  borra los mensajes de error y los bordes rojos que hubiera del intento anterior
    document.querySelectorAll('.error').forEach(e => e.remove());
    document.querySelectorAll('.invalido').forEach(e => e.classList.remove('invalido'));

    let hayErrores = false;

    function mostrarError(idCampo, mensaje) {
        const campo = document.getElementById(idCampo);
        campo.classList.add('invalido');
        const error = document.createElement('p');
        error.classList.add('error');
        error.textContent = mensaje;
        campo.insertAdjacentElement('afterend', error);
        // después del elemento inserta el mensaje de error
        hayErrores = true;
    }

    if (nombre === '') mostrarError('piloto-nombre', 'El nombre no puede estar vacío');
    if (rango === '') mostrarError('piloto-rango', 'El rango no puede estar vacío');
    if (nave === '') mostrarError('piloto-nave', 'Debes seleccionar una nave');
    if (!victorias || victorias < 0) mostrarError('piloto-victorias', 'Las victorias deben ser un número positivo');

    if (hayErrores) return;

    // Crea el objeto piloto
    const nuevoPiloto = {
        id: Date.now(),
        nombre,
        rango,
        nave,
        victorias,
        estado
    };

    // saber si esta en edicion
     const editando = document.getElementById('form-piloto').dataset.editando;

    if (editando) {
        // recorre pilotos y cuando encuentra al que se esta editando lo sustituye por el nuevo
        pilotos = pilotos.map(p => { 
            if (p.id === Number(editando)) {
                return { id: p.id, nombre, rango, nave, victorias, estado };
            }
            return p;
        });
        //Borra el id guardado en el formulario y vuelve a poner el texto original del botón.
        delete document.getElementById('form-piloto').dataset.editando;
        document.querySelector('#form-piloto button[type="submit"]').textContent = '➕ Añadir piloto';
    } else {
        const nuevoPiloto = { id: Date.now(), nombre, rango, nave, victorias, estado };
        pilotos.push(nuevoPiloto);
    }

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
        //Le crea un id al piloto
        tarjeta.dataset.id = piloto.id;

        tarjeta.innerHTML = `
            <h3>✈️ ${piloto.nombre}</h3>
            <p>Rango: ${piloto.rango}</p>
            <p>Nave: ${naves.find(n => n.id == piloto.nave)?.nombre || 'Sin nave'}</p>
            <p>Victorias: ${piloto.victorias}</p>
            <p>Estado: ${piloto.estado}</p>
            <button onclick="editarPiloto(${piloto.id})" class="btn-editar">✏️ Editar</button>
            <button onclick="eliminarPiloto(${piloto.id})" class="btn-eliminar">🗑️ Eliminar</button>
        `;

        contenedor.appendChild(tarjeta);
    });
}







function eliminarPiloto(id) {
    const confirmacion = confirm('¿Seguro que quieres eliminar este piloto?');
    if (confirmacion) {
        const tarjeta = document.querySelector(`.tarjeta[data-id="${id}"]`);
        tarjeta.classList.add('desaparece');

        setTimeout(() => {
            pilotos = pilotos.filter(piloto => piloto.id !== id);
            localStorage.setItem('pilotos', JSON.stringify(pilotos));
            renderPilotos();
        }, 1000);
    }
}

function editarPiloto(id) {
    const piloto = pilotos.find(p => p.id === id);

    // Rellenar el formulario con sus datos
    document.getElementById('piloto-nombre').value = piloto.nombre;
    document.getElementById('piloto-rango').value = piloto.rango;
    document.getElementById('piloto-nave').value = piloto.nave;
    document.getElementById('piloto-victorias').value = piloto.victorias;
    document.getElementById('piloto-estado').value = piloto.estado;

    // Cambiar el texto del botón
    const boton = document.querySelector('#form-piloto button[type="submit"]');
    boton.textContent = '💾 Guardar cambios';

    // Guardar qué piloto estamos editando
    document.getElementById('form-piloto').dataset.editando = id;
}





function renderFormularioMision() {
    const contenedor = document.getElementById('contenedor-formulario-mision');
    //Solo guarda pilotos en activo
    const pilotosActivos = pilotos.filter(p => p.estado === 'activo');

    contenedor.innerHTML = `
        <form id="form-mision">
            <h3>Nueva Misión</h3>

            <label for="mision-nombre">Nombre de la misión</label>
            <input type="text" id="mision-nombre" placeholder="Ej: Destruir la Death Star">

            <label for="mision-descripcion">Descripción</label>
            <input type="text" id="mision-descripcion" placeholder="Descripción breve">

            <label for="mision-piloto">Piloto asignado</label>
            <select id="mision-piloto">
                <option value="">-- Selecciona un piloto --</option>
                ${pilotosActivos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
            </select>

            <label for="mision-dificultad">Dificultad</label>
            <select id="mision-dificultad">
                <option value="facil">Fácil</option>
                <option value="media">Media</option>
                <option value="dificil">Difícil</option>
                <option value="suicida">Suicida</option>
            </select>

            <label for="mision-fecha">Fecha de inicio</label>
            <input type="date" id="mision-fecha">

            <button type="submit">➕ Crear misión</button>
        </form>
    `;

    document.getElementById('form-mision').addEventListener('submit', addMision);
}





function addMision(e) {
    e.preventDefault();

    const nombre = document.getElementById('mision-nombre').value.trim();
    const descripcion = document.getElementById('mision-descripcion').value.trim();
    const piloto = document.getElementById('mision-piloto').value;
    const dificultad = document.getElementById('mision-dificultad').value;
    const fecha = document.getElementById('mision-fecha').value;

    // Limpiar errores anteriores
    document.querySelectorAll('.error').forEach(e => e.remove());
    document.querySelectorAll('.invalido').forEach(e => e.classList.remove('invalido'));

    let hayErrores = false;

    function mostrarError(idCampo, mensaje) {
        const campo = document.getElementById(idCampo);
        campo.classList.add('invalido');
        const error = document.createElement('p');
        error.classList.add('error');
        error.textContent = mensaje;
        campo.insertAdjacentElement('afterend', error);
        hayErrores = true;
    }

    if (nombre === '') mostrarError('mision-nombre', 'El nombre no puede estar vacío');
    if (descripcion === '') mostrarError('mision-descripcion', 'La descripción no puede estar vacía');
    if (piloto === '') mostrarError('mision-piloto', 'Debes seleccionar un piloto');
    if (fecha === '') mostrarError('mision-fecha', 'Debes seleccionar una fecha');

    if (hayErrores) return;

    const nuevaMision = {
        id: Date.now(),
        nombre,
        descripcion,
        piloto,
        dificultad,
        fecha,
        columna: 'pendiente'
    };

    misiones.push(nuevaMision);
    localStorage.setItem('misiones', JSON.stringify(misiones));
    renderKanban();
}




// Se registra UNA sola vez al cargar la página, fuera de renderKanban
document.querySelectorAll('.columna').forEach(columna => {
    columna.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    columna.addEventListener('drop', (e) => {
        e.preventDefault();
        const idMision = e.dataTransfer.getData('text/plain');
        const misionArrastrada = misiones.find(m => m.id == idMision);
        if (misionArrastrada) {
            misionArrastrada.columna = columna.id;
            localStorage.setItem('misiones', JSON.stringify(misiones));
            renderKanban();
        }
    });
});

function renderKanban(filtro = 'todas') {
    document.querySelector('#pendiente .tarjetas').innerHTML = '';
    document.querySelector('#en-curso .tarjetas').innerHTML = '';
    document.querySelector('#completada .tarjetas').innerHTML = '';

    // Filtra según la dificultad seleccionada
    const misionesFiltradas = filtro === 'todas' 
        ? misiones 
        : misiones.filter(m => m.dificultad === filtro);

    //recorre las misiones con esa dificultad y las muestra
    misionesFiltradas.forEach(mision => {
        const piloto = pilotos.find(p => p.id == mision.piloto);
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.dataset.id = mision.id

        tarjeta.innerHTML = `
            <h3>${mision.nombre}</h3>
            <p>${mision.descripcion}</p>
            <p>Piloto: ${piloto ? piloto.nombre : 'Sin piloto'}</p>
            <p>Dificultad: ${mision.dificultad}</p>
            <p>Fecha: ${mision.fecha}</p>
            ${mision.columna !== 'pendiente' ? `<button onclick="retrocederMision(${mision.id})" class="btn-retroceder">⬅️ Retroceder</button>` : ''}
            ${mision.columna !== 'completada' ? `<button onclick="avanzarMision(${mision.id})" class="btn-avanzar">➡️ Avanzar</button>` : ''}
            <button onclick="eliminarMision(${mision.id})" class="btn-eliminar">🗑️ Eliminar</button>
        `;

        document.querySelector(`#${mision.columna} .tarjetas`).appendChild(tarjeta);

        // dragstart sí va aquí porque cada tarjeta nueva necesita el suyo
        tarjeta.setAttribute('draggable', true);   
        tarjeta.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', mision.id);
        });
    });

    actualizarContadores();
}
//Si no es pendiente crear el boton de retroceder
//${mision.columna !== 'pendiente' ? `<button onclick="retrocederMision(${mision.id})">⬅️ Retroceder</button>` : ''}
//Si no es completada crea el boton de avanzar
//${mision.columna !== 'completada' ? `<button onclick="avanzarMision(${mision.id})">➡️ Avanzar</button>` : ''}




function avanzarMision(id) {
    const tarjeta = document.querySelector(`.tarjeta[data-id="${id}"]`);
    tarjeta.classList.add('mover');

    setTimeout(() => {
        misiones = misiones.map(m => {
            if (m.id === id) {
                if (m.columna === 'pendiente') m.columna = 'en-curso';
                else if (m.columna === 'en-curso') m.columna = 'completada';
            }
            return m;
        });
        localStorage.setItem('misiones', JSON.stringify(misiones));
        renderKanban();
    }, 400);
}




function retrocederMision(id) {
    const tarjeta = document.querySelector(`.tarjeta[data-id="${id}"]`);
    tarjeta.classList.add('mover');

    setTimeout(() => {
        misiones = misiones.map(m => {
            if (m.id === id) {
                if (m.columna === 'en-curso') m.columna = 'pendiente';
                else if (m.columna === 'completada') m.columna = 'en-curso';
            }
            return m;
        });
        localStorage.setItem('misiones', JSON.stringify(misiones));
        renderKanban();
    }, 400);
}



function eliminarMision(id) {
    const confirmacion = confirm('¿Seguro que quieres eliminar esta misión?');
    if (confirmacion) {
        // Busca solo la tarjeta que queremos borrar
        const tarjeta = document.querySelector(`.tarjeta[data-id="${id}"]`);
        tarjeta.classList.add('desaparece');

        // Espera a que termine la animación y luego borra
        setTimeout(() => {
            misiones = misiones.filter(m => m.id !== id);
            localStorage.setItem('misiones', JSON.stringify(misiones));
            renderKanban();
        }, 600);
    }
}



//Da la longitud de cuantas tarjetas hay en cada columna
function actualizarContadores() {
    document.querySelector('#pendiente span').textContent =
        misiones.filter(m => m.columna === 'pendiente').length;
    document.querySelector('#en-curso span').textContent =
        misiones.filter(m => m.columna === 'en-curso').length;
    document.querySelector('#completada span').textContent =
        misiones.filter(m => m.columna === 'completada').length;
}





function renderFiltroMisiones() {
    const contenedor = document.getElementById('filtros-misiones');
    contenedor.innerHTML = `
        <label for="filtro-dificultad">Filtrar por dificultad:</label>
        <select id="filtro-dificultad">
            <option value="todas">Todas</option>
            <option value="facil">Fácil</option>
            <option value="media">Media</option>
            <option value="dificil">Difícil</option>
            <option value="suicida">Suicida</option>
        </select>
    `;

    document.getElementById('filtro-dificultad').addEventListener('change', function() {
        renderKanban(this.value);
    });
}
renderFiltroMisiones();


//ACTIVAR SESIONES

const seleccionarBoton = document.querySelectorAll('[data-seccion]');
const seleccionarNav = document.querySelectorAll('.seccion');

seleccionarBoton.forEach((boton) => {
    boton.addEventListener('click', function() {
        for (let i = 0; i < seleccionarNav.length; i++) {
            seleccionarNav[i].classList.remove('activa');
        }
        document.getElementById(boton.dataset.seccion).classList.add('activa');

        // Regenerar formulario de misiones al entrar en esa sección
        if (boton.dataset.seccion === 'misiones') {
            renderFormularioMision();
        }

        // Recalcular dashboard al entrar en panel
        if (boton.dataset.seccion === 'panel') {
            calcularDashboard();
        }
    });
});



//funcion para buscar elementos a tiempo real

document.getElementById('buscar').addEventListener('input', function(e) {
    const termino = e.target.value.toLowerCase(); 
    const navesFiltradas = naves.filter(nave => nave.nombre.toLowerCase().includes(termino) || nave.tipo.toLowerCase().includes(termino));
    renderHangar(navesFiltradas);
}); 

function rellenarFiltroTipo() {
    const filtroTipo = document.getElementById('filtro-tipo'); 
    const tiposUnicos = [...new Set(naves.map(nave => nave.tipo))]; // crea un array con los tipos únicos de naves
    tiposUnicos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        filtroTipo.appendChild(option);
    }
    );

    filtroTipo.addEventListener('change', function() {
        const tipoSeleccionado = this.value;
        const navesFiltradas = tipoSeleccionado === 'todas' ? naves : naves.filter(nave => nave.tipo === tipoSeleccionado);
        renderHangar(navesFiltradas);
    });
}

//funcion para generar las tarjetas de las naves.
function renderHangar(navesFiltradas) {
const contenedor= document.getElementById('contenedor-hangar')
contenedor.innerHTML = ''; //limpiar el contenedor antes de agregar las tarjetas.

for (let i = 0; i < navesFiltradas.length; i++) { 
    const nave = navesFiltradas[i];
    const tarjeta = document.createElement('div'); //crear un div para cada tarjeta.
    tarjeta.classList.add('tarjeta'); //agregar la clase tarjeta al div.
    tarjeta.innerHTML = `
    <img src="${nave.imagen}" alt="${nave.nombre}" class="imagen-nave">
`;   
    contenedor.appendChild(tarjeta); //agregar la tarjeta al contenedor.
    tarjeta.addEventListener('click', () => abrirModal(nave));

}
    document.getElementById('contador-hangar').textContent = `Total de naves: ${navesFiltradas.length}`; //mostrar el total de naves en el hangar.       

}


function iniciarTema() {
    //Si el tema es claro le pone el estilo de claro y se cambia para cambiarlo a modo oscuro
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'claro') {
        document.body.classList.add('claro');
        document.getElementById('toggle-tema').textContent = '🌙 Modo oscuro';
    }
}

document.getElementById('toggle-tema').addEventListener('click', function() {
    document.body.classList.toggle('claro');
    const estaClaro = document.body.classList.contains('claro');
    localStorage.setItem('tema', estaClaro ? 'claro' : 'oscuro');
    this.textContent = estaClaro ? '🌙 Modo oscuro' : '☀️ Modo claro';
});


//funcion para ordenar por velocidad de mayor a menor o al reves.
let orden = true;

document.getElementById('ordenar-velocidad').addEventListener('click', function() {
     orden = !orden; // niega lo existente, si es true pasa a false y viceversa, así cada vez que se pulse el botón se alterna entre ambos .
    const navesOrdenadas = [...naves].sort((a, b) => {
        if (orden) {
            return a.velocidad - b.velocidad;
        } else {
            return b.velocidad - a.velocidad;
        }
    });
    renderHangar(navesOrdenadas);
});

function calcularDashboard() {

const contenedor = document.getElementById('contenedor-estadisticas');
contenedor.innerHTML = '';
    
/* NAVES */

//calcular el número total de naves
const totalNaves = naves.length;   

// naves operativas
const navesOperativas = naves.filter(nave => nave.estado === 'operativa').length;

// naves en estado destruida
const navesDestruidas = naves.filter(nave => nave.estado === 'destruida').length;

//naves en relación 
const navesRep = naves.filter(nave => nave.estado === 'reparacion').length;

//nave mas rapida

const naveMasRapida = naves.reduce((max, nave) => {
    if (nave.velocidad > max.velocidad) {
        return nave;    
    } else {
        return max;
    }
});

/* PILOTOS */

//pilotos totales
const pilotosTotales = pilotos.length;
//pilotos activos
const pilotosActivos = pilotos.filter(p => p.estado === 'activo').length;

//pilotos heridos
const pilotosHeridos = pilotos.filter(p => p.estado === 'herido').length;

//pilotos KIA
const pilotosKIA = pilotos.filter(p => p.estado === 'KIA').length;

//piloto con mas victorias
let pilotoMasVictorias;

if (pilotos.length === 0) {
    pilotoMasVictorias = { nombre: 'Sin pilotos', victorias: 0 };
} else {
    pilotoMasVictorias = pilotos.reduce((max, piloto) => {
        if (piloto.victorias > max.victorias) {
            return piloto;
        } else {
            return max;
        }
    });
}

/* MISIONES */

//misiones totales
const misionesTotales = misiones.length;    
//misiones pendientes
const misionesPendientes = misiones.filter(m => m.columna === 'pendiente').length;
//misiones en curso
const misionesEnCurso = misiones.filter(m => m.columna === 'en-curso').length;  
//misiones completadas      
const misionesCompletadas = misiones.filter(m => m.columna === 'completada').length;


// contenedor de naves
const tarjetaNaves = document.createElement('div');
tarjetaNaves.classList.add('estadistica');
tarjetaNaves.innerHTML = `
    <h3>🛸 Naves</h3>
    <p>Total: ${totalNaves}</p>
    <p>Operativas: ${navesOperativas}</p>
    <p>Destruidas: ${navesDestruidas}</p>
    <p>En reparación: ${navesRep}</p>
    <p>Más rápida: ${naveMasRapida.nombre} (${naveMasRapida.velocidad} km/h)</p>
`;
contenedor.appendChild(tarjetaNaves);

//contenedor de pilotos 
const tarjetaPilotos = document.createElement('div');
tarjetaPilotos.classList.add('estadistica');
tarjetaPilotos.innerHTML = `   
    <h3>👨‍✈️ Pilotos</h3>
    <p>Total: ${pilotosTotales}</p>
    <p>Activos: ${pilotosActivos}</p>   
    <p>Heridos: ${pilotosHeridos}</p>
    <p>KIA: ${pilotosKIA}</p>
    <p>Con más victorias: ${pilotoMasVictorias.nombre} (${pilotoMasVictorias.victorias} victorias)</p>
`;
contenedor.appendChild(tarjetaPilotos);

//contenedor de misiones
const tarjetaMisiones = document.createElement('div');
tarjetaMisiones.classList.add('estadistica');
tarjetaMisiones.innerHTML = `
    <h3>🚀 Misiones</h3>   
    <p>Total: ${misionesTotales}</p>    
    <p>Pendientes: ${misionesPendientes}</p>
    <p>En curso: ${misionesEnCurso}</p>
    <p>Completadas: ${misionesCompletadas}</p>
`;
contenedor.appendChild(tarjetaMisiones);


if (misionesTotales > 0) {
    const porcentajeMisionesCompletadas = ((misionesCompletadas / misionesTotales) * 100);
    const porcentajeElement = document.createElement('p');
    porcentajeElement.textContent = `Porcentaje de misiones completadas: ${porcentajeMisionesCompletadas.toFixed(2)}%`;
    contenedor.appendChild(porcentajeElement);
    document.getElementById('barra-progreso').style.width = `${porcentajeMisionesCompletadas}%`;
    document.getElementById('label-progreso').textContent = `Misiones completadas: ${porcentajeMisionesCompletadas.toFixed(0)}%`;
    }
}       


renderHangar(naves); //llamar a la función para mostrar las tarjetas al cargar la página.
rellenarFiltroTipo();   
renderFormularioPiloto();
renderFormularioMision();
renderPilotos(); // carga los pilotos al abrir la página
renderKanban();  // carga las misiones al abrir la página
iniciarTema();


//boton exportar a json
document.getElementById('btn-exportar').addEventListener('click', function() {   
    const data = {
        naves,
        pilotos,
        misiones
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'starwars_data.json';
    a.click();
    URL.revokeObjectURL(url);
}   );


//abrir modal oculto al clickar la nave

function abrirModal(nave) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('modal-contenido');
    contenido.innerHTML = `
        <h2>${nave.nombre} ${nave.emojiRepresentativo}</h2>
        <p>Tipo: ${nave.tipo}</p>
        <p>Velocidad: ${nave.velocidad} km/h</p>
        <p>Tripulación: ${nave.tripulacion}</p>
        <p>Estado: ${nave.estado}</p>
    `;
    modal.classList.remove('oculto');
}     

              //cerrar el modal al hacer click en el boton de cerrar
    document.getElementById('modal-cerrar').addEventListener('click', () => {
        document.getElementById('modal').classList.add('oculto');
    });
