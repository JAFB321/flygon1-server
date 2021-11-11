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
        max: 38
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

const createLecturasItem = (alumno) => {
    const {expediente, ultimaLectura, nombre} = alumno;
    const { bpm, ox, temp, timestamp } = ultimaLectura;

    const rowItem = document.createElement('tr');
    rowItem.innerHTML = `
        <th scope="row">
        <a href="/alumno.html?id=${expediente}">${nombre}</a>
        </th>
        <td class="${isOxOk(ox) ? "" : "table-danger"}">${ox}</td>
        <td class="${isTempOk(temp) ? "" : "table-danger"}">${temp}</td>
        <td class="${isBPMOk(bpm) ? "" : "table-danger"}">${bpm}</td>
        <td>${new Date(timestamp).toLocaleDateString("es-ES", {month: "long",  day: "numeric"})}</td>`;

    return rowItem;
}

const setSalonData = (salon) => {
    console.log(salon);

    document.querySelector('.salon-name').innerHTML = `Salon ${salon.nombre}`;
    const tablaLecturas = document.querySelector('#tabla-body-lecturas');

    const {alumnos} = salon;
    alumnos.forEach(al => {
        tablaLecturas.append(createLecturasItem(al));
    })
}

const urlParams = new URLSearchParams(window.location.search);
const salonID = urlParams.get('id');

if(!salonID){
    window.location.assign('/'); 
}

const salon = fetch('/api/salon/'+salonID);

salon.then(data => data.json())
.then(salon => setSalonData(salon.item));
