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
const { comprobar } = require("../util/util-login");
const response_1 = __importDefault(require("../../network/response"));
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
            try {
                yield store_pagos_1.default.insertar_pagos(pago);
                const resPago = yield store_pagos_1.default.consulta_pago(pago.id_user, pago.fecha_pago);
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
        this.router.get("/", this.obtener_pagos);
        this.router.post("/", comprobar, this.crear_pago);
        this.router.delete("/:id_pago", comprobar, comprobar, this.eliminar_pago);
    }
}
let store = new Pagos();
exports.default = store.router;
