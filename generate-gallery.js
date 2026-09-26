const fs = require('fs');
const path = require('path');

const galeriaDir = path.join(__dirname, 'img', 'galeria');
const outputFile = path.join(__dirname, 'galeria.json');

// Lee el contenido de la carpeta
fs.readdir(galeriaDir, (err, files) => {
    if (err) {
        console.error('No se pudo leer la carpeta de galería:', err);
        fs.writeFileSync(outputFile, JSON.stringify([]));
        return;
    }

    // Filtra para asegurarse de que solo toma archivos de imagen
    const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    // Crea el archivo JSON con la lista
    fs.writeFileSync(outputFile, JSON.stringify(images));
    console.log(`Galería generada exitosamente con ${images.length} imágenes.`);
});