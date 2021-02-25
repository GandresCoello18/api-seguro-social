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
const store_pagos_1 = __importDefault(require("./store-pagos"));
const store_usuarios_1 = __importDefault(require("../usuarios/store-usuarios"));
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const send_email_1 = __importDefault(require("../email/send-email"));
const { comprobar } = require("../util/util-login");
const response_1 = __importDefault(require("../../network/response"));
const moment_1 = __importDefault(require("moment"));
class Pagos {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    crear_pago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha_pago, metodo, monto, admin, id_user } = req.body || null;
            const pago = {
                id_user: admin ? id_user : res.locals.datos_user.id_user,
                fecha_pago,
                status: 'pagado',
                metodo,
                monto,
            };
            const countPago = Math.trunc(Number(pago.monto) / 5);
            try {
                let resPago = [];
                for (let i = 0; i < countPago; i++) {
                    pago.monto = 5;
                    yield store_pagos_1.default.insertar_pagos(pago);
                    let data = yield store_pagos_1.default.consulta_pago(pago.id_user, pago.fecha_pago);
                    resPago.push(data[0]);
                    pago.fecha_pago = moment_1.default(new Date(util_fecha_1.default.incrementarMes(pago.fecha_pago))).format();
                }
                const user = yield store_usuarios_1.default.consulta_usuario(pago.id_user);
                if (admin) {
                    const send = {
                        from: user[0].email,
                        to: user[0].email,
                        subject: 'Pagos del seguro social "La Tereza"',
                        text: `Su pago desde la fecha: ${moment_1.default(fecha_pago).format('LL')} ha sido registrado con metodo de pago: ${metodo} y monto de: ${monto}`,
                    };
                    send_email_1.default.send(send).then(() => {
                        response_1.default.success(req, res, { send: true }, 200);
                    }).catch(error => {
                        response_1.default.error(req, res, error.message, 500, 'Error al enviar mensaje de correo electronico');
                    });
                }
                response_1.default.success(req, res, resPago, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear pago');
            }
        });
    }
    obtener_pagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagos = yield store_pagos_1.default.consulta_pagos();
                response_1.default.success(req, res, pagos, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en obtener pagos");
            }
        });
    }
    obtener_mis_pagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const MisPagos = yield store_pagos_1.default.consulta_mis_pagos(res.locals.datos_user.id_user);
                response_1.default.success(req, res, MisPagos, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en mis obtener pagos");
            }
        });
    }
    obtener_pagos_por_fecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha } = req.params || null;
                const Pagos = yield store_pagos_1.default.consulta_pagos_por_fecha(fecha);
                response_1.default.success(req, res, Pagos, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en mis obtener pagos por mes");
            }
        });
    }
    eliminar_pago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_pago } = req.params || null;
            try {
                const MisPagos = yield store_pagos_1.default.eliminar_pago(Number(id_pago));
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en eliminar pago");
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.get("/mis-pagos", comprobar, this.obtener_mis_pagos);
        this.router.get("/mes/:fecha", this.obtener_pagos_por_fecha);
        this.router.get("/", this.obtener_pagos);
        this.router.post("/", this.crear_pago);
        this.router.delete("/:id_pago", this.eliminar_pago);
    }
}
let store = new Pagos();
exports.default = store.router;
