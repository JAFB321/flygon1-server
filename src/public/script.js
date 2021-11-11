const createSalonItem = (salon) => {
    const navItem = document.createElement('li');
    navItem.innerHTML = `
        <a href="/salon.html?id=${salon._id}">
        <i class="bi bi-circle"></i><span>${salon.nombre}</span>
        </a>`;

    return navItem;
}

const salones = fetch('/api/salon');

const setSalones = (salones) => {
    if(salones.length > 0){
        const nav = document.querySelector('#components-nav');
        salones.forEach(salon => nav.append(createSalonItem(salon)));
    }
}

salones.then((value)  => {
    value.json().then(setSalones);
});