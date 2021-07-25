require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
// const { mostrarMenu, pausa } = require('./helpers/mensajes')
const { inquireMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquireMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas.listadoArr);
                break;
            case '3':
                break;
            case '4':
                break;
            case '5':
                break;
            case '6':
                break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();
    } while (opt !== '0');
}

main();