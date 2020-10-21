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
const express_1 = require("express");
const store_citas_1 = __importDefault(require("./store-citas"));
// const { comprobar } = require("../util/util-login");
// import Fechas from "../util/util-fecha";
const uuid_1 = require("uuid");
const response_1 = __importDefault(require("../../network/response"));
class Citas {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    asignar_cita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, id_horario, fecha_cita, hora_cita } = req.body || null;
            try {
                const cita = {
                    id_cita: uuid_1.v4(),
                    id_user,
                    id_horario,
                    status_cita: 'Reservado',
                    fecha_cita,
                    hora_cita,
                };
                const repeatCita = yield store_citas_1.default.consulta_cita_repeat(cita.fecha_cita, cita.id_horario, cita.hora_cita);
                if (repeatCita.length === 0) {
                    yield store_citas_1.default.insertar_cita(cita);
                    const thisCita = yield store_citas_1.default.consulta_cita(cita.id_cita);
                    response_1.default.success(req, res, thisCita, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: "La fecha, hora o jornada especificada ya estan tomandas por otra cita." }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear cita');
            }
        });
    }
    obtener_cita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resCita = yield store_citas_1.default.consulta_citas();
                response_1.default.success(req, res, resCita, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error al consultar citas");
            }
        });
    }
    eliminar_cita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params || null;
            try {
                yield store_citas_1.default.eliminar_cita(id);
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error al eliminar cita");
            }
        });
    }
    cita_estado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params || null;
            const { estado } = req.body || null;
            try {
                yield store_citas_1.default.status_cita(id, estado);
                const thisCita = yield store_citas_1.default.consulta_cita(id);
                response_1.default.success(req, res, { update: true, cita: thisCita }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error al editar status cita");
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.get("/", this.obtener_cita);
        this.router.post("/", this.asignar_cita);
        this.router.put("/estado/:id", this.cita_estado);
        this.router.delete("/:id", this.eliminar_cita);
    }
}
let cita = new Citas();
exports.default = cita.router;
