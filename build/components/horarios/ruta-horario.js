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
const store_horario_1 = __importDefault(require("./store-horario"));
const { comprobar } = require("../util/util-login");
// import Fechas from "../util/util-fecha";
const uuid_1 = require("uuid");
const response_1 = __importDefault(require("../../network/response"));
class Horario {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    asignar_horario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_personal, jornada, dia } = req.body || null;
            try {
                const countHorario = yield store_horario_1.default.count_jornada_dia(jornada, dia);
                if (countHorario.length < 3) {
                    console.log(req.body);
                    const horario = {
                        id_horario: uuid_1.v4(),
                        id_personal,
                        jornada,
                        dia
                    };
                    yield store_horario_1.default.insertar_horario(horario);
                    const resHorario = yield store_horario_1.default.consulta_horario(horario.id_horario);
                    response_1.default.success(req, res, resHorario, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: `La jornada: ${jornada} y el dia: ${dia} ya estan completas` }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear horario');
            }
        });
    }
    obtener_horario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resHorario = yield store_horario_1.default.consulta_horarios();
                response_1.default.success(req, res, resHorario, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error al consultar horario");
            }
        });
    }
    eliminar_horario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params || null;
            try {
                yield store_horario_1.default.eliminar_horario(id);
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error al eliminar horario");
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.get("/", this.obtener_horario);
        this.router.post("/", comprobar, this.asignar_horario);
        this.router.delete("/:id", comprobar, this.eliminar_horario);
    }
}
let horario = new Horario();
exports.default = horario.router;
