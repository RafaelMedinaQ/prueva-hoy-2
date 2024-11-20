const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragmento = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('API/Galeria.json')
        const data = await res.json()
        console.log(data)
        mostrarProductos(data)
    } catch (error) {
        console.log(error)
    }
}

const mostrarProductos = data => {
    data.forEach((producto, index) => {
        const card = templateCard.cloneNode(true);
        const img = card.querySelector('img');
        img.setAttribute("src", producto.thumbnailUrl);

        // Cambia las clases de acuerdo al índice o propiedad de `producto`
        const colDiv = card.querySelector('div.col-md-6');
        switch (index) {
            case 0:
                colDiv.className = 'col-lg-8 col-md-6 mb-4';
                img.style.height = '300px';
                break;
            case 1:
                colDiv.className = 'col-lg-4 col-md-6 mb-4';
                img.style.height = '300px';
                break;
            case 2:
            case 3:
            case 4:
                colDiv.className = 'col-lg-4 col-md-6 mb-4';
                img.style.height = '150px';
                break;
            case 5:
            case 6:
                colDiv.className = 'col-lg-6 col-md-6 mb-4';
                img.style.height = '200px';
                break;
            default:
                colDiv.className = 'col-md-6 mb-4';
                img.style.height = '200px';
        }

        fragmento.appendChild(card);
    });
    items.appendChild(fragmento);
};

