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
class StoreHorario {
    /* INSERTAR - POST - CREAR */
    insertar_horario(horario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO horario (id_horario, id_personal, jornada, dia) VALUES ('${horario.id_horario}', ${horario.id_personal}, '${horario.jornada}', '${horario.dia}')`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    consulta_horarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM horario INNER JOIN personal ON personal.id_personal = horario.id_personal ORDER BY horario.id_horario DESC; `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_horario(id_horario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE horario.id_horario = '${id_horario}' ORDER BY horario.id_horario DESC; `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    count_jornada_dia(jornada, dia, id_personal) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE horario.jornada = '${jornada}' and horario.dia = '${dia}' and horario.id_personal = ${id_personal} ORDER BY horario.id_horario DESC; `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    buscar_personal_jornada_dia(jornada, dia, id_personal) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE horario.jornada = '${jornada}' and horario.dia = '${dia}' and horario.id_personal = ${id_personal} ORDER BY horario.id_horario DESC; `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    ///// DELETE
    eliminar_horario(id_horario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`DELETE FROM horario WHERE id_horario = '${id_horario}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
}
let store = new StoreHorario();
exports.default = store;
