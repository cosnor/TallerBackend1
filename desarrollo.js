// Extraemos los datos de la API

let datos

fetchJson('https://www.dnd5eapi.co/api/2014/monsters')
  .then(monstruos => {
    console.log(monstruos)
    const primeros40= filtrarPrimeros40(monstruos)  
    const indices = primeros40.map(m=>m.index)

    const lotes=[]
    while (indices.length){
        const parte =indices.splice(0,10)
        lotes.push(Promise.all(parte.map(i=>fetchJson("https://www.dnd5eapi.co/api/monsters/"+i))));
    }

  })
  .catch(error => {
    console.error('Falló la consulta:', error);
  });


// Filtrar los primeros 40 monstruos
function filtrarPrimeros40 (datos,n) {

    const primerosN=datos.results.slice(0,n)
    return primerosN

}

function fetchJson (url){
    return fetch (url).then(r=>{
        if (!r.ok){
            throw new Error (r.status)
        }
        return r.json()
    })
}

function filtros(monster,n,m){
if (monster.cr>=n && monster.hp>=m){
    return(monster)
}
}

function buscar(monsters,tipo,n){
    monsters.find(m => {if (m.type=tipo && m.cr>=n)
        return m
    })
}

function alguno(monsters){
    return monsters.some(hasLegendary === true)
}

function todos(monsters){
    return monsters.every(m=>{
        if (Object.keys(m.stats)=6 && m.hp>0 ){
            return true
        }
    })
}

function agrupartipos(monsters){
    const clasificacion=monsters.reduce((count,avgCR,maxHP,m)=>{
        tipo[m.tipo]={
            count:+1,
            avgCR:+m.CR,
            maxHP:maxHP=>{if (maxHP < m.hp){
                return maxHP=m.hp
            }}
        }
    })
    
}

function buckets(){
    return
}
