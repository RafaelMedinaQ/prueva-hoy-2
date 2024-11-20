document.addEventListener('DOMContentLoaded', () => {
    fetchBackground();
});

const fetchBackground = async () => {
    try {
        const res = await fetch('API/Login.json'); // Asegúrate de que la ruta sea válida
        const data = await res.json();
        // Seleccionar el primer elemento del JSON para obtener la URL de la imagen
        const imageUrl = data[0]?.thumbnailUrl;
        if (imageUrl) {
            document.getElementById('dynamic-background').style.backgroundImage = `url('${imageUrl}')`;
        } else {
            console.error("No se encontró una URL de imagen en la API.");
        }
    } catch (error) {
        console.error("Error al cargar la API:", error);
    }
};
