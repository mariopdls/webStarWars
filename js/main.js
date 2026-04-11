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

// funcion que muestra las secciones al hacer click en el boton correspondiente.

const seleccionarBoton= document.querySelectorAll('[data-seccion]');
const seleccionarNav= document.querySelectorAll('.seccion');

seleccionarBoton.forEach((boton) => {               //recorrer cada boton. primero una lambda y después hice un for    
    boton.addEventListener('click', function() {    // indexado, más entendible que con dos lambdas.
        for (let i = 0; i < seleccionarNav.length; i++) {
            seleccionarNav[i].classList.remove('activa');
        }
        document.getElementById(boton.dataset.seccion) 
        .classList.add('activa');                           

    });
});
