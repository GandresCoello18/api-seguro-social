"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
class StorePersonal {
    /* INSERTAR - POST - CREAR */
    insertar_pagos(pago) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO pagos (id_user, fecha_pago, status, metodo, monto) VALUES ('${pago.id_user}', '${pago.fecha_pago}', '${pago.status}', '${pago.metodo}', ${pago.monto})`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    consulta_pagos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM pagos INNER JOIN usuarios ON usuarios.id_user = pagos.id_user ORDER BY pagos.id_pago DESC; `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_pago(id_user, fecha_pago) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM pagos INNER JOIN usuarios ON usuarios.id_user = pagos.id_user WHERE pagos.id_user = '${id_user}' and pagos.fecha_pago = '${fecha_pago}' ORDER BY pagos.id_pago DESC; `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_mis_pagos(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM pagos WHERE id_user = '${id_user}' ORDER BY id_pago DESC; `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    ////////7  DELETE
    eliminar_pago(id_pago) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`DELETE FROM pagos WHERE id_pago = ${id_pago} `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
}
let store = new StorePersonal();
exports.default = store;
