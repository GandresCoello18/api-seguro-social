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
                db_1.default.query(`INSERT INTO citas (id_cita, id_horario, id_user, status_cita, fecha_cita, hora_cita, isGrupo, id_grupo) VALUES ('${cita.id_cita}', '${cita.id_horario}', '${cita.id_user}', '${cita.status_cita}', '${cita.fecha_cita}', '${cita.hora_cita}', ${cita.isGrupo}, ${cita.id_grupo})`, (err, data) => {
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
                db_1.default.query(`SELECT *, usuarios.nombres as nombre_afiliado FROM citas INNER JOIN usuarios ON usuarios.id_user = citas.id_user INNER JOIN horario ON horario.id_horario = citas.id_horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE isGrupo = 0 ORDER BY citas.id_cita DESC;`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_citas_grupo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT *, grupo_seguro.nombres as nombre_grupo_afiliado FROM citas INNER JOIN grupo_seguro ON grupo_seguro.id_grupo = citas.id_grupo INNER JOIN horario ON horario.id_horario = citas.id_horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE isGrupo = 1 ORDER BY citas.id_cita DESC;`, (err, data) => {
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
    consulta_mis_citas(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM citas INNER JOIN usuarios ON usuarios.id_user = citas.id_user INNER JOIN horario ON horario.id_horario = citas.id_horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE citas.id_user = '${id_user}' ORDER BY citas.id_cita DESC;`, (err, data) => {
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
    validar_cita(id_horario, fecha_cita) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM citas WHERE fecha_cita = '${fecha_cita}' and id_horario = '${id_horario}';`, (err, data) => {
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
