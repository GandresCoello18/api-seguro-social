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
const store_grupos_1 = __importDefault(require("./store-grupos"));
const { comprobar } = require("../util/util-login");
const response_1 = __importDefault(require("../../network/response"));
class Grupos {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    agregar_integrante_grupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, tipo_familiar, nombres, sexo, apellidos, fecha_nacimiento } = req.body || null;
            const grupo = {
                id_user,
                tipo_familiar,
                nombres,
                sexo,
                apellidos,
                fecha_nacimiento,
                status_grupo: 'registrado'
            };
            try {
                const integranteExist = yield store_grupos_1.default.consulta_integrante_afiliado(grupo.nombres, grupo.fecha_nacimiento, grupo.tipo_familiar);
                if (integranteExist.length === 0) {
                    yield store_grupos_1.default.insertar_grupos(grupo);
                    const resGrupo = yield store_grupos_1.default.consulta_integrante_afiliado(grupo.nombres, grupo.fecha_nacimiento, grupo.tipo_familiar);
                    response_1.default.success(req, res, resGrupo, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: `Este integrante ya existe, seleccione otros datos.` }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en agregar al grupo del afiliado');
            }
        });
    }
    obtener_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupos = yield store_grupos_1.default.consulta_grupos_afiliados();
                response_1.default.success(req, res, grupos, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error al consultar grupos del afilidos");
            }
        });
    }
    eliminar_integrante_grupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield store_grupos_1.default.eliminar_integrante_afiliado(Number(id));
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error al eliminar integrante de grupo del afilidos");
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.get("/", this.obtener_usuarios);
        this.router.post("/", this.agregar_integrante_grupo);
        this.router.delete("/:id", this.eliminar_integrante_grupo);
    }
}
const grupo = new Grupos();
exports.default = grupo.router;
