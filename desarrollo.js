// Extraemos los datos de la API

function fetchJson (url){
    return fetch (url).then(r=>{
        if (!r.ok){
            throw new Error (r.status)
        }
        return r.json()
    })
}

fetchJson('https://www.dnd5eapi.co/api/2014/monsters')
  .then(monstruos => {
    const primeros40= filtrarPrimeros40(monstruos)  
    const indices = primeros40.map(m=>m.index)

    const lotes=[]
    while (indices.length){
        const parte =indices.splice(0,10)
        lotes.push(Promise.all(parte.map(i=> fetchJson(`https://www.dnd5eapi.co/api/2014/monsters/${i}`))));
    }
    // Unimos la información
    return Promise.all(lotes).then(arrays => ({
      monstruos: primeros40,
      descripcion: arrays.flat()
    }));

  })
  .then(({monstruos, descripcion}) => normalizar(monstruos, descripcion))
  .catch(error => {
    console.error('Falló la consulta:', error);
  });


// Filtrar los primeros 40 monstruos
function filtrarPrimeros40 (datos,n=40) {

    const primerosN=datos.results.slice(0,n)
    return primerosN

}

function normalizar(datos, descripcion){
    let datosNormalizados = datos.map((dato, i) => {
      const sp = descripcion[i].speed || {};
      const maxSpeed = Object.values(sp)
        .map(v => parseInt(v, 10) || 0)
        .reduce((a, b) => Math.max(a, b), 0);

      return {
        index: dato.index,
        name: dato.name,
        size: descripcion[i].size,
        type: descripcion[i].type,
        alignment: descripcion[i].alignment,
        cr: descripcion[i].challenge_rating,
        ac: descripcion[i].armor_class[0].value,
        hp: descripcion[i].hit_points,
        speed: maxSpeed,
        stats: {"str": descripcion[i].strength , "dexterity": descripcion[i].dexterity, "con": descripcion[i].constitution, "int": descripcion[i].intelligence, "wis": descripcion[i].wisdom, "cha": descripcion[i].charisma},
        immuneCount: descripcion[i].damage_immunities.length,
        resistCount: descripcion[i].damage_resistances.length,
        hasLegendary: Array.isArray(descripcion[i].legendary_actions) && descripcion[i].legendary_actions.length > 0
      };
    });
    console.log(datosNormalizados);
}



