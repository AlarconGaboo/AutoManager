const fs = require('fs-extra');

// Ruta del archivo JSON
const filePath = './autos.json';

// Función para leer el archivo completo
const leerArchivoCompleto = async () => {
  try {
    const data = await fs.readJson(filePath);
    console.log('Contenido del archivo completo:', data);
  } catch (error) {
    console.error('Error al leer el archivo:', error.message);
  }
};

// Función para leer las características de un auto en particular
const leerAutoEspecifico = async (auto) => {
  try {
    const data = await fs.readJson(filePath);
    if (data[auto]) {
      console.log(`Características del ${auto}:`, data[auto]);
    } else {
      console.error('Auto no encontrado.');
    }
  } catch (error) {
    console.error('Error al leer el auto:', error.message);
  }
};

// Función para añadir o modificar propiedades de un auto
const modificarAuto = async (auto, propiedad, valor) => {
  try {
    const data = await fs.readJson(filePath);
    if (!data[auto]) {
      data[auto] = {}; // Crea un nuevo auto si no existe
    }
    data[auto][propiedad] = valor; // Añade o modifica la propiedad
    await fs.writeJson(filePath, data, { spaces: 2 });
    console.log(`Propiedad "${propiedad}" del ${auto} modificada/añadida con éxito.`);
  } catch (error) {
    console.error('Error al modificar el auto:', error.message);
  }
};

// Función principal para manejar los argumentos y ejecutar la acción correcta
const main = () => {
  const [action, auto, propiedad, valor] = process.argv.slice(2);

  switch (action) {
    case 'leer':
      if (auto) {
        leerAutoEspecifico(auto);
      } else {
        leerArchivoCompleto();
      }
      break;

    case 'modificar':
      if (auto && propiedad && valor) {
        modificarAuto(auto, propiedad, valor);
      } else {
        console.error('Faltan argumentos para modificar un auto. Usa: node autos.js modificar <auto> <propiedad> <valor>');
      }
      break;

    default:
      console.error('Acción no reconocida. Usa "leer" para leer el archivo o "modificar" para modificar un auto.');
      break;
  }
};

// Ejecutar la función principal
main();
