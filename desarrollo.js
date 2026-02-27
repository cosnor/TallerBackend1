// Extraemos los datos de la API

let datos

fetch('https://www.dnd5eapi.co/api/2014/monsters')
  .then(respuesta => {
    if (!respuesta.ok) {
      throw new Error('Error al cargar datos: ' + respuesta.status);
    }
    return respuesta.json();          
  })
  .then(datos => filtrarPrimeros40(datos))
  .catch(error => {
    console.error('Falló la consulta:', error);
  });


// Filtrar los primeros 40 monstruos
function filtrarPrimeros40 (datos) {
    console.log(datos);
}

