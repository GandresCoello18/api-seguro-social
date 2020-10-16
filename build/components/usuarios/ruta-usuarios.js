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
const store_usuarios_1 = __importDefault(require("./store-usuarios"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { comprobar } = require("../util/util-login");
// import Fechas from "../util/util-fecha";
const uuid_1 = require("uuid");
const bcryptjs_2 = __importDefault(require("bcryptjs"));
const response_1 = __importDefault(require("../../network/response"));
class Usuario {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    crear_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, email, nombres, apellidos, sexo, fecha_nacimiento, password, admin } = req.body || null;
            try {
                const cuenta = yield store_usuarios_1.default.validar_usuario_existente(email, Number(cedula));
                if (cuenta.length === 0) {
                    bcryptjs_2.default
                        .hash(admin ? email + '9019' : password, 10)
                        .then((clave_encriptada) => __awaiter(this, void 0, void 0, function* () {
                        const user = {
                            id_user: uuid_1.v4(),
                            cedula: Number(cedula),
                            email,
                            status: 'registrado',
                            password: clave_encriptada,
                            nombres,
                            apellidos,
                            sexo,
                            fecha_nacimiento,
                        };
                        yield store_usuarios_1.default.insertar_usuario(user);
                        const usuario = yield store_usuarios_1.default.consulta_usuario(user.id_user);
                        response_1.default.success(req, res, usuario, 200);
                    })).catch((err) => response_1.default.error(req, res, err, 500, 'Error en encriptar clave'));
                }
                else {
                    response_1.default.success(req, res, { feeback: "Este usuario ya existe" }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear usuario');
            }
        });
    }
    obtener_usuario(req, res) {
        const { id } = req.params || null;
        store_usuarios_1.default.consulta_usuario(id)
            .then((info) => {
            response_1.default.success(req, res, info, 200);
        })
            .catch((err) => {
            response_1.default.error(req, res, err, 500, "error en pedir datos unico user");
        });
    }
    obtener_usuarios(req, res) {
        store_usuarios_1.default.consultar_usuarios()
            .then((data) => {
            response_1.default.success(req, res, data, 200);
        })
            .catch((err) => {
            response_1.default.error(req, res, err, 500, "Error al consultar usuarios");
        });
    }
    editar_usuario(req, res) {
        if (res.locals.datos_user.tipo_user == "Administrador") {
            const { id } = req.params || null;
            const { nombres, apellidos, email_on, tipo_user } = req.body || null;
            store_usuarios_1.default.editar_usuario(id, nombres, apellidos, email_on, tipo_user)
                .then((data) => {
                response_1.default.success(req, res, data, 200);
            })
                .catch((err) => {
                response_1.default.error(req, res, err, 500, "Error al modificar usuarios");
            });
        }
        else {
            response_1.default.success(req, res, { feeback: "No tienes permisos para esta accion" }, 200);
        }
    }
    update_password(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params || null;
            const { password, newPassword } = req.body || null;
            try {
                const user = yield store_usuarios_1.default.consulta_usuario(id);
                if (yield bcryptjs_1.default.compare(password, user[0].password)) {
                    bcryptjs_1.default.hash(newPassword, 10).then((nueva_clave) => __awaiter(this, void 0, void 0, function* () {
                        console.log(nueva_clave);
                        yield store_usuarios_1.default.update_password(id, nueva_clave);
                        response_1.default.success(req, res, { update: true }, 200);
                    })).catch((error) => {
                        response_1.default.success(req, res, { feeback: error.message }, 200);
                    });
                }
                else {
                    response_1.default.success(req, res, { feeback: "Datos incorrectos, asegurece de escribir la clave actual correctamente." }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error.message, 500, "Error al cambiar clave");
            }
        });
    }
    eliminar_usuario(req, res) {
        const { id } = req.params || null;
        store_usuarios_1.default.eliminar_usuario(id)
            .then(() => {
            response_1.default.success(req, res, { removed: true }, 200);
        })
            .catch((err) => {
            response_1.default.error(req, res, err, 500, "Error al eliminar usuarios");
        });
    }
    ruta() {
        /* entry point user */
        this.router.get("/", this.obtener_usuarios);
        this.router.get("/:id", this.obtener_usuario);
        this.router.post("/", this.crear_usuario);
        this.router.put("/cambiar_clave/:id", this.update_password);
        this.router.put("/:id", comprobar, this.editar_usuario);
        this.router.delete("/:id", comprobar, this.eliminar_usuario);
    }
}
let user = new Usuario();
exports.default = user.router;
