"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fechas {
    constructor() { }
    fecha_actual() {
        let ano = new Date().getFullYear();
        let mes = new Date().getMonth();
        let dia = new Date().getDate();
        if (mes < 10) {
            mes = `${0}${mes + 1}`;
        }
        if (dia < 10) {
            dia = `${0}${dia}`;
        }
        return ano + "-" + mes + "-" + dia;
    }
    fecha_con_hora_actual() {
        let hoy = new Date();
        let mes = hoy.getMonth();
        let dia = hoy.getDate();
        let ano = hoy.getFullYear();
        if (mes < 10) {
            mes = `${0}${mes + 1}`;
        }
        if (dia < 10) {
            dia = `${0}${dia}`;
        }
        let fecha = ano + "-" + mes + "-" + dia;
        let hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
        return `${fecha} ${hora}`;
    }
    incrementarMes(ultimo_pago) {
        return new Date(ultimo_pago).setMonth(new Date(ultimo_pago).getMonth() + 1);
    }
}
let fechas = new Fechas();
exports.default = fechas;
