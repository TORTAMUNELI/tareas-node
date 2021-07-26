const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }


    crearTarea(desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => this._listado[tarea.id] = tarea);
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            if (completadoEn) {
                console.log(`${idx} ${desc} :: ${(completadoEn + '').green}`);
            } else {
                console.log(`${idx} ${desc} :: ${'Pendiente'.red}`);
            }
        });
    }

    listarPendientesOCompletadas(completadas = true) {
        console.log();
        let i = 1;
        this.listadoArr.forEach((tarea) => {
            const idx = `${i}.`.green;
            const { desc, completadoEn } = tarea;
            if (completadas) {
                if (completadoEn) {
                    console.log(`${idx} ${desc} :: ${(completadoEn + '').green}`);
                    i += 1;
                }
            } else {
                if (!completadoEn) {
                    console.log(`${idx} ${desc} :: ${'Pendiente'.red}`);
                    i += 1;
                }
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) tarea.completadoEn = new Date().toISOString();
        });
        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;