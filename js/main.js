// ============================================================
// ÍNDICE:
//  1. DATOS (arrays globales)
//  2. HANGAR (render, filtros, ordenación, modal)
//  3. PILOTOS (formulario, CRUD)
//  4. MISIONES (formulario, kanban, drag & drop)
//  5. DASHBOARD (estadísticas, barra de progreso)
//  6. NAVEGACIÓN (mostrar/ocultar secciones)
//  7. TEMA (modo oscuro/claro)
//  8. INICIO (llamadas iniciales al cargar la página)
// ============================================================
 

 
// ============================================================
// 1. DATOS
// ============================================================
 
let naves = [
    { id: 1,  nombre: 'X-Wing',             tipo: 'Caza',                 velocidad: 2000, tripulacion: 1,       estado: 'operativa', emojiRepresentativo: '🚀', imagen: 'images/nave1.webp'  },
    { id: 2,  nombre: 'TIE Fighter',        tipo: 'Caza',                 velocidad: 1500, tripulacion: 1,       estado: 'operativa', emojiRepresentativo: '🛸', imagen: 'images/nave2.webp'  },
    { id: 3,  nombre: 'Millennium Falcon',  tipo: 'Transporte',           velocidad: 1050, tripulacion: 4,       estado: 'operativa', emojiRepresentativo: '🛳️', imagen: 'images/nave3.webp'  },
    { id: 4,  nombre: 'Star Destroyer',     tipo: 'Destructor',           velocidad: 975,  tripulacion: 47000,   estado: 'operativa', emojiRepresentativo: '🚢', imagen: 'images/nave4.webp'  },
    { id: 5,  nombre: 'Death Star',         tipo: 'Estrella de la Muerte',velocidad: 0,    tripulacion: 1000000, estado: 'destruida', emojiRepresentativo: '💥', imagen: 'images/nave5.webp'  },
    { id: 6,  nombre: 'TIE Interceptor',    tipo: 'Caza',                 velocidad: 1700, tripulacion: 1,       estado: 'operativa', emojiRepresentativo: '🛸', imagen: 'images/nave6.webp'  },
    { id: 7,  nombre: 'Slave I',            tipo: 'Caza',                 velocidad: 1200, tripulacion: 1,       estado: 'operativa', emojiRepresentativo: '🛰️', imagen: 'images/nave7.webp'  },
    { id: 8,  nombre: 'Y-Wing',             tipo: 'Bombardero',           velocidad: 1500, tripulacion: 2,       estado: 'operativa', emojiRepresentativo: '🦅', imagen: 'images/nave8.webp'  },
    { id: 9,  nombre: 'A-Wing',             tipo: 'Caza',                 velocidad: 1900, tripulacion: 1,       estado: 'operativa', emojiRepresentativo: '🦆', imagen: 'images/nave9.webp'  },
    { id: 10, nombre: 'B-Wing',             tipo: 'Caza',                 velocidad: 1600, tripulacion: 1,       estado: 'operativa', emojiRepresentativo: '🦇', imagen: 'images/nave10.webp' },
];
 
// Pilotos y misiones se recuperan de localStorage al cargar la página.
// localStorage solo guarda strings, por eso se usa JSON.parse para convertirlo a array.
// El || [] evita que devuelva null si no existe aún.
let pilotos  = JSON.parse(localStorage.getItem('pilotos'))  || [];
let misiones = JSON.parse(localStorage.getItem('misiones')) || [];
 
// ============================================================
// 2. HANGAR
// ============================================================
 
// Genera las tarjetas de nave dinámicamente desde el array.
// Recibe el array a mostrar como parámetro (puede ser el completo o uno filtrado).
function renderHangar(navesFiltradas) {
    const contenedor = document.getElementById('contenedor-hangar');
    contenedor.innerHTML = ''; // limpiar el contenedor antes de agregar las tarjetas
 
    for (let i = 0; i < navesFiltradas.length; i++) {
        const nave = navesFiltradas[i];
 
        const tarjeta = document.createElement('div'); // crear un div para cada tarjeta
        tarjeta.classList.add('tarjeta');              // agregar la clase tarjeta al div
 
        tarjeta.innerHTML = `
            <img src="${nave.imagen}" alt="${nave.nombre}" class="imagen-nave">
        `;
 
        contenedor.appendChild(tarjeta);              // agregar la tarjeta al contenedor
        tarjeta.addEventListener('click', () => abrirModal(nave)); // abrir modal al hacer clic
    }
 
    // Actualizar el contador de naves visibles
    document.getElementById('contador-hangar').textContent = `Total de naves: ${navesFiltradas.length}`;
}
 
// Rellena el select de tipos con los valores únicos del array de naves
// y añade el listener para filtrar al cambiar la selección.
function rellenarFiltroTipo() {
    const filtroTipo  = document.getElementById('filtro-tipo');
    const tiposUnicos = Array.from(new Set(naves.map(nave => nave.tipo))); // extrae los tipos únicos del array de naves
 
for (let i = 0; i < tiposUnicos.length; i++) { // recorrer el array de tipos únicos
    const option       = document.createElement('option'); // crear un elemento option para cada tipo. option es un elemento específico para los select,
    option.value       = tiposUnicos[i];                    // que representa cada una de las opciones disponibles.
    option.textContent = tiposUnicos[i]; 
    filtroTipo.appendChild(option); // el bucle añade cada option al select, para que el usuario pueda elegir entre los tipos de naves disponibles.
}
 
filtroTipo.addEventListener('change', function() {
    const tipoSeleccionado = this.value;
    let navesFiltradas;

    if (tipoSeleccionado === 'todas') {
        navesFiltradas = naves;
    } else {
        navesFiltradas = naves.filter(nave => nave.tipo === tipoSeleccionado);
    }

    renderHangar(navesFiltradas);
});
}
 
// Buscador en tiempo real: filtra mientras el usuario escribe (evento input)
document.getElementById('buscar').addEventListener('input', function(e) {
    const termino      = e.target.value.toLowerCase(); // convertir a minúsculas para hacer la búsqueda case-insensitive
    const navesFiltradas = [];

    for (let i = 0; i < naves.length; i++) {
        const nombreMinusculas = naves[i].nombre.toLowerCase();
        const tipoMinusculas   = naves[i].tipo.toLowerCase();

        if (nombreMinusculas.includes(termino) || tipoMinusculas.includes(termino)) {
            navesFiltradas.push(naves[i]);
        }
    }  // El bucle recorre el array de naves y compara el término de búsqueda con el nombre y tipo de cada nave. Si el término está incluido en el nombre o tipo, la nave se añade al array de naves filtradas.

    renderHangar(navesFiltradas);
});
 
// Ordenación por velocidad: alterna entre ascendente y descendente en cada clic
let orden = true; // true = ascendente, false = descendente
 
document.getElementById('ordenar-velocidad').addEventListener('click', function() {
    orden = !orden; // niega lo existente: si es true pasa a false y viceversa
 
    const navesOrdenadas = [...naves].sort((a, b) => {
        if (orden) {
            return a.velocidad - b.velocidad; // ascendente
        } else {
            return b.velocidad - a.velocidad; // descendente
        }
    });
 
    renderHangar(navesOrdenadas);
});
 
// Abre el modal con la información detallada de la nave seleccionada
function abrirModal(nave) {
    const modal    = document.getElementById('modal');
    const contenido = document.getElementById('modal-contenido');
 
    contenido.innerHTML = `
        <h2>${nave.nombre} ${nave.emojiRepresentativo}</h2>
        <p>Tipo: ${nave.tipo}</p>
        <p>Velocidad: ${nave.velocidad} km/h</p>
        <p>Tripulación: ${nave.tripulacion}</p>
        <p>Estado: ${nave.estado}</p>
    `;
 
    modal.classList.remove('oculto'); // mostrar el modal quitando la clase oculto
}
 
// Cierra el modal al hacer clic en el botón de cerrar
document.getElementById('modal-cerrar').addEventListener('click', function() {
    document.getElementById('modal').classList.add('oculto');
}); // El modal se cierra añadiendo la clase oculto, que tiene display: none en CSS.
 
 
 
 
// ============================================================
// 3. PILOTOS
// ============================================================
 
// Genera el formulario de pilotos dinámicamente y añade el listener de submit
function renderFormularioPiloto() {
    const contenedor = document.getElementById('contenedor-formulario-piloto');
 
    // El select de naves se genera desde el array de naves
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
 
    document.getElementById('form-piloto').addEventListener('submit', addPiloto);
}
 
// Añade o edita un piloto al hacer submit del formulario
function addPiloto(e) {
    e.preventDefault();
 
    // Recoger los valores del formulario
    const nombre    = document.getElementById('piloto-nombre').value.trim();
    const rango     = document.getElementById('piloto-rango').value.trim();
    const nave      = document.getElementById('piloto-nave').value;
    const victorias = Number(document.getElementById('piloto-victorias').value);
    const estado    = document.getElementById('piloto-estado').value;
 
    // Limpiar errores anteriores
    document.querySelectorAll('.error').forEach(e => e.remove()); //recorre y elimina los mensajes de error
    document.querySelectorAll('.invalido').forEach(e => e.classList.remove('invalido')); //recorre y quita las inválidas
 
    let hayErrores = false; // bandera para controlar si hay errores en el formulario
 
    // Muestra un mensaje de error debajo del campo y lo marca en rojo
    function mostrarError(idCampo, mensaje) {
        const campo = document.getElementById(idCampo);
        campo.classList.add('invalido');
        const error       = document.createElement('p');
        error.classList.add('error');
        error.textContent  = mensaje;
        campo.insertAdjacentElement('afterend', error); // inserta el error justo debajo del campo
        hayErrores = true;
    }
 
    if (nombre === '')               mostrarError('piloto-nombre',    'El nombre no puede estar vacío');
    if (rango === '')                mostrarError('piloto-rango',     'El rango no puede estar vacío');
    if (nave === '')                 mostrarError('piloto-nave',      'Debes seleccionar una nave');
    if (!victorias || victorias < 0) mostrarError('piloto-victorias', 'Las victorias deben ser un número positivo');
    //validaciones: si el nombre o rango están vacíos,
    //  si no se ha seleccionado una nave o 
    // si las victorias no son un número positivo,
    //  se muestra un mensaje de error y se marca el campo en rojo.  también establece la bandera hayErrores a true.


    // Si hayErrores es true → sale de la función. El piloto no se crea.
    // Si hayErrores es false → el código continúa y el piloto sí se crea.
    if (hayErrores) return;
 
    // Comprobar si estamos en modo edición
    const editando = document.getElementById('form-piloto').dataset.editando; //dataset permite guardar información personalizada en el HTML.
                                                                            // En este caso, guardamos el id del piloto que estamos editando.
 
    if (editando) {
        // Editar: sustituir el piloto existente por los nuevos datos
        pilotos = pilotos.map(p => {
            if (p.id === Number(editando)) {
                return { id: p.id, nombre, rango, nave, victorias, estado };
            }
            return p;
        });
 
        // Limpiar el modo edición y restaurar el texto del botón
        delete document.getElementById('form-piloto').dataset.editando;
        document.querySelector('#form-piloto button[type="submit"]').textContent = '➕ Añadir piloto';
 
    } else {
        // Añadir: crear un nuevo piloto con id único
        const nuevoPiloto = { id: Date.now(), nombre, rango, nave, victorias, estado };
        pilotos.push(nuevoPiloto);
    }
 
    localStorage.setItem('pilotos', JSON.stringify(pilotos)); // guardar en localStorage
    document.getElementById('form-piloto').reset();           // limpiar el formulario
    renderPilotos(); // actualizar la lista de pilotos en pantalla
}
 
// Renderiza la lista de pilotos como tarjetas dinámicas
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
        tarjeta.dataset.id = piloto.id; // guardamos el id para poder editar/eliminar
 
        tarjeta.innerHTML = `
            <h3>✈️ ${piloto.nombre}</h3>
            <p>Rango: ${piloto.rango}</p>
            <p>Nave: ${naves.find(n => n.id == piloto.nave)?.nombre || 'Sin nave'}</p>
            <p>Victorias: ${piloto.victorias}</p>
            <p>Estado: ${piloto.estado}</p>
            <button onclick="editarPiloto(${piloto.id})"   class="btn-editar">✏️ Editar</button>
            <button onclick="eliminarPiloto(${piloto.id})" class="btn-eliminar">🗑️ Eliminar</button>
        `;
 
        contenedor.appendChild(tarjeta);
    });
}
 
// Rellena el formulario con los datos del piloto para editarlo
function editarPiloto(id) {
    const piloto = pilotos.find(p => p.id === id);
 
    // Rellenar cada campo con el valor actual del piloto
    document.getElementById('piloto-nombre').value    = piloto.nombre;
    document.getElementById('piloto-rango').value     = piloto.rango;
    document.getElementById('piloto-nave').value      = piloto.nave;
    document.getElementById('piloto-victorias').value = piloto.victorias;
    document.getElementById('piloto-estado').value    = piloto.estado;
 
    // Cambiar el texto del botón para indicar que estamos editando
    document.querySelector('#form-piloto button[type="submit"]').textContent = '💾 Guardar cambios';
 
    // Guardar el id del piloto que estamos editando en el dataset del formulario
    document.getElementById('form-piloto').dataset.editando = id;
}
 
// Elimina un piloto con animación y confirmación previa
function eliminarPiloto(id) {
    const confirmacion = confirm('¿Seguro que quieres eliminar este piloto?');
 
    if (confirmacion) {
        const tarjeta = document.querySelector(`.tarjeta[data-id="${id}"]`); // selecciona la tarjeta del piloto a eliminar usando su id
        tarjeta.classList.add('desaparece'); // lanza la animación de desaparición
 
        // Espera a que termine la animación antes de borrar del array
        setTimeout(() => {
            pilotos = pilotos.filter(piloto => piloto.id !== id); // guarda todos menos el borrado
            localStorage.setItem('pilotos', JSON.stringify(pilotos));
            renderPilotos();
        }, 1000); // el tiempo debe coincidir con la duración de la animación en CSS (1s en este caso)
    }
}
 
// ============================================================
// 4. MISIONES (KANBAN)
// ============================================================
 
// Genera el formulario de misiones con el select de pilotos activos
function renderFormularioMision() {
    const contenedor     = document.getElementById('contenedor-formulario-mision');
    const pilotosActivos = pilotos.filter(p => p.estado === 'activo'); // lambda solo pilotos activos
 
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
 
// Añade una nueva misión al array y la guarda en localStorage
function addMision(e) { // sigue el mismo patron que addPiloto: recoge los datos, valida, muestra errores, si no hay errores crea la misión, guarda en localStorage, limpia el formulario y renderiza el kanban.
    e.preventDefault();
 
    const nombre      = document.getElementById('mision-nombre').value.trim();
    const descripcion = document.getElementById('mision-descripcion').value.trim();
    const piloto      = document.getElementById('mision-piloto').value;
    const dificultad  = document.getElementById('mision-dificultad').value;
    const fecha       = document.getElementById('mision-fecha').value;
 
    // Limpiar errores anteriores
    document.querySelectorAll('.error').forEach(e => e.remove());
    document.querySelectorAll('.invalido').forEach(e => e.classList.remove('invalido'));
 
    let hayErrores = false;
 
    function mostrarError(idCampo, mensaje) {
        const campo       = document.getElementById(idCampo);
        campo.classList.add('invalido');
        const error       = document.createElement('p');
        error.classList.add('error');
        error.textContent  = mensaje;
        campo.insertAdjacentElement('afterend', error);
        hayErrores = true;
    }
 
    if (nombre === '')      mostrarError('mision-nombre',      'El nombre no puede estar vacío');
    if (descripcion === '') mostrarError('mision-descripcion', 'La descripción no puede estar vacía');
    if (piloto === '')      mostrarError('mision-piloto',      'Debes seleccionar un piloto');
    if (fecha === '')       mostrarError('mision-fecha',       'Debes seleccionar una fecha');
 
    if (hayErrores) return;
 
    const nuevaMision = {
        id: Date.now(),
        nombre,
        descripcion,
        piloto,
        dificultad,
        fecha,
        columna: 'pendiente' // las misiones siempre empiezan en pendiente
    };
 
    misiones.push(nuevaMision);
    localStorage.setItem('misiones', JSON.stringify(misiones));
    document.getElementById('form-mision').reset();
    renderKanban();
}
 
// Renderiza el tablero Kanban con las misiones en sus columnas correspondientes.
// Acepta un filtro de dificultad opcional (por defecto muestra todas).
function renderKanban(filtro = 'todas') {
    document.querySelector('#pendiente .tarjetas').innerHTML  = ''; //querySelector, selecciona el contenedor de tarjetas de cada columna y lo limpia antes de volver a llenarlo con las misiones filtradas.
    document.querySelector('#en-curso .tarjetas').innerHTML   = '';
    document.querySelector('#completada .tarjetas').innerHTML = '';
 
    // Filtrar según la dificultad seleccionada
    let misionesFiltradas;

    if (filtro === 'todas') { //si el filtro es todas, no se aplica y se muestran todas; si es otro, se recorre por separado y se añaden las que coinciden.
        misionesFiltradas = misiones;
    } else {
        misionesFiltradas = [];
        for (let i = 0; i < misiones.length; i++) {
            if (misiones[i].dificultad === filtro) {
                misionesFiltradas.push(misiones[i]); //push añade cada misión que cumple la condición al array de misiones filtradas.
            }
        }
    }
 
    // Recorrer las misiones filtradas y crear una tarjeta por cada una
    misionesFiltradas.forEach(mision => {
        const piloto  = pilotos.find(p => p.id == mision.piloto);
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.dataset.id = mision.id;
 
        // Los botones de retroceder/avanzar se muestran según la columna actual:
        // - Retroceder: solo si NO está en pendiente
        // - Avanzar: solo si NO está en completada
        tarjeta.innerHTML = `
            <h3>${mision.nombre}</h3>
            <p>${mision.descripcion}</p>
            <p>Piloto: ${piloto ? piloto.nombre : 'Sin piloto'}</p>
            <p>Dificultad: ${mision.dificultad}</p>
            <p>Fecha: ${mision.fecha}</p>
            ${mision.columna !== 'pendiente'   ? `<button onclick="retrocederMision(${mision.id})" class="btn-retroceder">⬅️ Retroceder</button>` : ''}
            ${mision.columna !== 'completada'  ? `<button onclick="avanzarMision(${mision.id})"   class="btn-avanzar">➡️ Avanzar</button>`     : ''}
            <button onclick="eliminarMision(${mision.id})" class="btn-eliminar">🗑️ Eliminar</button>
        `;
 
        document.querySelector(`#${mision.columna} .tarjetas`).appendChild(tarjeta);
 
        // El dragstart se registra aquí, dentro del forEach que recorre las misiones filtradas, 
        // para que cada tarjeta tenga su propio listener de arrastre con su id específico.
        tarjeta.setAttribute('draggable', true); // hace que la tarjeta sea arrastrable.
        tarjeta.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', mision.id); // al iniciar el arrastre, se guarda el id de la misión en el dataTransfer del evento, para poder recuperarlo al soltar la tarjeta en otra columna.
        });
    });
 
    actualizarContadores();
}
 
// Mueve la misión a la siguiente columna (pendiente → en-curso → completada)
function avanzarMision(id) {
    const tarjeta = document.querySelector(`.tarjeta[data-id="${id}"]`);
    tarjeta.classList.add('mover'); // animación de movimiento
 
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
 
// Mueve la misión a la columna anterior (completada → en-curso → pendiente)
function retrocederMision(id) {
    const tarjeta = document.querySelector(`.tarjeta[data-id="${id}"]`);
    tarjeta.classList.add('mover');
 
    setTimeout(() => {
        misiones = misiones.map(m => {
            if (m.id === id) {
                if (m.columna === 'en-curso')   m.columna = 'pendiente';
                else if (m.columna === 'completada') m.columna = 'en-curso';
            }
            return m;
        });
        localStorage.setItem('misiones', JSON.stringify(misiones));
        renderKanban();
    }, 400);
}
 
// Elimina una misión con animación y confirmación previa
function eliminarMision(id) {
    const confirmacion = confirm('¿Seguro que quieres eliminar esta misión?');
 
    if (confirmacion) {
        const tarjeta = document.querySelector(`.tarjeta[data-id="${id}"]`);
        tarjeta.classList.add('desaparece'); // animación de desaparición
 
        // Espera a que termine la animación y luego borra del array
        setTimeout(() => {
            misiones = misiones.filter(m => m.id !== id);
            localStorage.setItem('misiones', JSON.stringify(misiones));
            renderKanban();
        }, 600);
    }
}
 
// Actualiza los contadores numéricos en el encabezado de cada columna
function actualizarContadores() {
    document.querySelector('#pendiente span').textContent  = misiones.filter(m => m.columna === 'pendiente').length;
    document.querySelector('#en-curso span').textContent   = misiones.filter(m => m.columna === 'en-curso').length;
    document.querySelector('#completada span').textContent = misiones.filter(m => m.columna === 'completada').length;
}
 
// Genera el filtro de dificultad del Kanban y añade su listener
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
 
// Drag & drop: se registra UNA sola vez al cargar la página, fuera de renderKanban.
// Cada columna escucha dragover (para permitir soltar) y drop (para mover la misión).
document.querySelectorAll('.columna').forEach(columna => {
    columna.addEventListener('dragover', (e) => {
        e.preventDefault(); // necesario para permitir el drop
    });
 
    columna.addEventListener('drop', (e) => {
        e.preventDefault();
        const idMision       = e.dataTransfer.getData('text/plain');
        const misionArrastrada = misiones.find(m => m.id == idMision);
 
        if (misionArrastrada) {
            misionArrastrada.columna = columna.id; // actualizar la columna de la misión
            localStorage.setItem('misiones', JSON.stringify(misiones));
            renderKanban();
        }
    });
});
 
 
 
 
// ============================================================
// 5. DASHBOARD
// ============================================================
 
// Calcula y muestra todas las estadísticas a partir de los arrays globales.
// Se llama cada vez que el usuario navega a la sección panel.
function calcularDashboard() {
    const contenedor = document.getElementById('contenedor-estadisticas');
    contenedor.innerHTML = '';
 
    /* --- NAVES --- */
    const totalNaves      = naves.length;
    const navesOperativas = naves.filter(nave => nave.estado === 'operativa').length;
    const navesDestruidas = naves.filter(nave => nave.estado === 'destruida').length;
    const navesRep        = naves.filter(nave => nave.estado === 'reparacion').length;
 
    const naveMasRapida = naves.reduce((max, nave) => {
        if (nave.velocidad > max.velocidad) return nave;
        else return max;
    });
 
    /* --- PILOTOS --- */
    const pilotosTotales  = pilotos.length;
    const pilotosActivos  = pilotos.filter(p => p.estado === 'activo').length;
    const pilotosHeridos  = pilotos.filter(p => p.estado === 'herido').length;
    const pilotosKIA      = pilotos.filter(p => p.estado === 'KIA').length;
 
    // Si no hay pilotos, mostramos un valor por defecto para evitar errores en el reduce
    let pilotoMasVictorias;
    if (pilotos.length === 0) {
        pilotoMasVictorias = { nombre: 'Sin pilotos', victorias: 0 };
    } else {
        pilotoMasVictorias = pilotos.reduce((max, piloto) => {
            if (piloto.victorias > max.victorias) return piloto;
            else return max;
        });
    }
 
    /* --- MISIONES --- */
    const misionesTotales    = misiones.length;
    const misionesPendientes = misiones.filter(m => m.columna === 'pendiente').length;
    const misionesEnCurso    = misiones.filter(m => m.columna === 'en-curso').length;
    const misionesCompletadas= misiones.filter(m => m.columna === 'completada').length;
 
    /* --- TARJETAS DE ESTADÍSTICAS --- */
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
 
    /* --- BARRA DE PROGRESO --- */
    if (misionesTotales > 0) {
        const porcentajeMisionesCompletadas = (misionesCompletadas / misionesTotales) * 100;
 
        const porcentajeElement       = document.createElement('p');
        porcentajeElement.textContent = `Porcentaje de misiones completadas: ${porcentajeMisionesCompletadas.toFixed(2)}%`;
        contenedor.appendChild(porcentajeElement);
 
        document.getElementById('barra-progreso').style.width    = `${porcentajeMisionesCompletadas}%`;
        document.getElementById('label-progreso').textContent    = `Misiones completadas: ${porcentajeMisionesCompletadas.toFixed(0)}%`;
    }
}
 
// Botón para exportar los datos de pilotos y misiones como archivo JSON
document.getElementById('btn-exportar').addEventListener('click', function() {
    const data = { naves, pilotos, misiones };
    const json = JSON.stringify(data, null, 2); //json stringify convierte el objeto data a un string JSON. El segundo parámetro es null porque no usamos una función de reemplazo, y el tercero es 2 para que el JSON resultante tenga una indentación de 2 espacios.
    const blob = new Blob([json], { type: 'application/json' }); //blob es un objeto que representa un archivo, en este caso el JSON con los datos. Se crea a partir del string JSON y se especifica el tipo MIME para que se descargue como un archivo JSON.
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'starwars_data.json';
    a.click();
    URL.revokeObjectURL(url); // liberar la URL temporal
});

//esta funcuion se encarga de exportar los datos de naves, pilotos y misiones a un archivo JSON que el usuario puede descargar. 
// Al hacer clic en el botón de exportar, se crea un objeto con los datos, se convierte a JSON, 
// se crea un Blob para representar el archivo, se genera una URL temporal para ese Blob, y se simula un clic en un enlace para descargar el archivo.
//  Finalmente, se revoca la URL temporal para liberar recursos.
 
 
// ============================================================
// 6. NAVEGACIÓN
// ============================================================
 
const seleccionarBoton = document.querySelectorAll('[data-seccion]');
const seleccionarNav   = document.querySelectorAll('.seccion');
 
// Al hacer clic en un botón de la nav: oculta todas las secciones y muestra la destino
seleccionarBoton.forEach((boton) => {
    boton.addEventListener('click', function() {
 
        // Ocultar todas las secciones
        for (let i = 0; i < seleccionarNav.length; i++) {
            seleccionarNav[i].classList.remove('activa');
        }
 
        // Mostrar la sección destino
        document.getElementById(boton.dataset.seccion).classList.add('activa');
 
        // Regenerar el formulario de misiones al entrar en esa sección
        // (para que el select de pilotos activos esté actualizado)
        if (boton.dataset.seccion === 'misiones') {
            renderFormularioMision();
        }
 
        // Recalcular el dashboard al entrar en panel
        if (boton.dataset.seccion === 'panel') {
            calcularDashboard();
        }
    });
});
 
 

// ============================================================
// 7. TEMA (modo oscuro / claro)
// ============================================================
 
// Aplica el tema guardado en localStorage al cargar la página
function iniciarTema() {
    const temaGuardado = localStorage.getItem('tema');
 
    if (temaGuardado === 'claro') {
        document.body.classList.add('claro');
        document.getElementById('toggle-tema').textContent = '🌙 Modo oscuro';
    }
}
 
// Toggle: cambia entre modo oscuro y claro y guarda la preferencia
document.getElementById('toggle-tema').addEventListener('click', function() {
    document.body.classList.toggle('claro');
    const estaClaro = document.body.classList.contains('claro');
    localStorage.setItem('tema', estaClaro ? 'claro' : 'oscuro');
    this.textContent = estaClaro ? '🌙 Modo oscuro' : '☀️ Modo claro';
});
 
 
 
 
// ============================================================
// 8. INICIO — llamadas al cargar la página
// ============================================================
 
renderHangar(naves);      // mostrar las tarjetas de naves
rellenarFiltroTipo();     // rellenar el select de tipos
renderFormularioPiloto(); // generar el formulario de pilotos
renderFormularioMision(); // generar el formulario de misiones
renderPilotos();          // cargar la lista de pilotos desde localStorage
renderKanban();           // cargar las misiones desde localStorage
renderFiltroMisiones();   // generar el filtro de dificultad del kanban
