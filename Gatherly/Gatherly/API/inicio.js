document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "API/inicio.json"; // Reemplaza con la URL real de tu API

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Error al cargar la API");
        const images = await response.json();

        // Rellenar Hero Section (Primera imagen)
        const heroImg = document.querySelector(".hero-section");
        heroImg.style.backgroundImage = `url('${images[0].thumbnailUrl}')`;

        // Rellenar Gallery Section (Omitiendo la primera imagen)
        const galleryCards = document.querySelectorAll(".gallery-section .card");
        images.slice(1,4).forEach((image, index) => {
            const card = galleryCards[index];
            if (card) {
                const imgElement = card.querySelector("img");
                imgElement.src = image.thumbnailUrl;
                imgElement.alt = `Imagen ${image.id}`;
            }
        });

        // Rellenar Call to Action Section
        const ctaImg = document.querySelector(".cta-section img");
        ctaImg.src = images[4]?.thumbnailUrl || "ruta/a/imagen-predeterminada.jpg";
        ctaImg.alt = "Salón Gatherly";

        // Rellenar Servicios (Sección "Permítenos formar parte de tus días especiales")
        // Rellenar Servicios (Sección "Permítenos formar parte de tus días especiales")
        const servicesSection = document.querySelector(".services-wrapper"); // Cambia al contenedor dinámico
        images.slice(4, 8).forEach((image, idx) => {
            const serviceCard = document.createElement("div");
            serviceCard.className = "service-card"; // Clase actualizada
            serviceCard.innerHTML = `
                <img src="${image.thumbnailUrl}" class="service-img" alt="Servicio ${idx + 1}">
            `;
            servicesSection.appendChild(serviceCard); // Agrega la tarjeta al contenedor
        });

    } catch (error) {
        console.error("Error cargando imágenes:", error);
    }
});


