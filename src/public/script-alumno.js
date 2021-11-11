const params = {
    ox: {
        min: 90,
        max: 100
    },
    bpm: {
        min: 90,
        max: 140
    },
    temp: {
        min: 30,
        max: 37.5
    }
};

const isOxOk = (ox) => {
    if(ox < params.ox.min || ox > params.ox.max)return false;
    return true;
}

const isBPMOk = (bpm) => {
    if(bpm < params.bpm.min || bpm > params.bpm.max)return false;
    return true;
}

const isTempOk = (temp) => {
    if(temp < params.temp.min || temp > params.temp.max)return false;
    return true;
}

const createLecturasItem = (lect) => {
    const { bpm, ox, temp, timestamp } = lect;

    const rowItem = document.createElement('tr');
    rowItem.innerHTML = `
        <td class="${isOxOk(ox) ? "" : "table-danger"}">${ox}</td>
        <td class="${isTempOk(temp) ? "" : "table-danger"}">${temp}</td>
        <td class="${isBPMOk(bpm) ? "" : "table-danger"}">${bpm}</td>
        <td>${new Date(timestamp).toLocaleDateString("es-ES", {month: "long",  day: "numeric"})}</td>`;

    return rowItem;
}

const setAlumnoData = (alumno) => {
    console.log(alumno);

    document.querySelector('.alumno-name').innerHTML = `${alumno.nombre}`;
    const tablaLecturas = document.querySelector('#tabla-body-lecturas');

    const {lecturas} = alumno;
    lecturas.forEach(lect => {
        tablaLecturas.prepend(createLecturasItem(lect));
    })
}


const urlParams = new URLSearchParams(window.location.search);
const alumnoID = urlParams.get('id');

if(!alumnoID){
    window.location.assign('/'); 
}

const alumno = fetch('/api/alumno/'+alumnoID);

alumno.then(data => data.json())
.then(alumno => setAlumnoData(alumno.item));