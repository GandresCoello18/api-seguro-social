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
class StoreCita {
    /* INSERTAR - POST - CREAR */
    insertar_cita(cita) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO citas (id_cita, id_horario, id_user, status_cita, fecha_cita, hora_cita) VALUES ('${cita.id_cita}', '${cita.id_horario}', '${cita.id_user}', '${cita.status_cita}', '${cita.fecha_cita}', '${cita.hora_cita}')`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    consulta_citas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM citas INNER JOIN usuarios ON usuarios.id_user = citas.id_user INNER JOIN horario ON horario.id_horario = citas.id_horario INNER JOIN personal ON personal.id_personal = horario.id_personal ORDER BY citas.id_cita DESC;`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_cita(id_cita) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM citas INNER JOIN usuarios ON usuarios.id_user = citas.id_user INNER JOIN horario ON horario.id_horario = citas.id_horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE citas.id_cita = '${id_cita}' ORDER BY citas.id_cita DESC;`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_cita_repeat(fecha, id_horario, hora) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM citas WHERE fecha_cita = '${fecha}' and id_horario = '${id_horario}' and hora_cita = '${hora}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* UPDATE - REMOVE */
    status_cita(id_cita, estado) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`UPDATE citas SET status_cita = '${estado}' WHERE id_cita = '${id_cita}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* DELETE - ELIMINAR - BORRAR */
    eliminar_cita(id_cita) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`DELETE FROM citas WHERE id_cita = '${id_cita}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
}
let store = new StoreCita();
exports.default = store;
