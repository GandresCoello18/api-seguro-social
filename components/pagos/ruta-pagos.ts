import { Request, Response, Router } from "express";
import Store from "./store-pagos";
const { comprobar } = require("../util/util-login");
import Respuestas from "../../network/response";
import { Pago_INT } from "../../interface";

class Pagos {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async crear_pago(req: Request, res: Response) {
    const { fecha_pago, metodo, monto, admin, id_user } = req.body || null;

    const pago: Pago_INT = {
        id_user: admin ? id_user : res.locals.datos_user.id_user,
        fecha_pago,
        status: 'pagado',
        metodo,
        monto,
    }

    try {
        await Store.insertar_pagos(pago);
        const resPago = await Store.consulta_pago(pago.id_user, pago.fecha_pago);
        Respuestas.success(req, res, resPago, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear pago');
    }
  }

  async obtener_pagos(req: Request, res: Response) {
    try {
        const pagos = await Store.consulta_pagos();
        Respuestas.success(req, res, pagos, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en obtener pagos");
    }
  }

  async obtener_mis_pagos(req: Request, res: Response) {

    try {
        const MisPagos = await Store.consulta_mis_pagos(res.locals.datos_user.id_user);
        Respuestas.success(req, res, MisPagos, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en mis obtener pagos");
    }
  }

  async eliminar_pago(req: Request, res: Response) {
    const { id_pago } = req.params || null;

    try {
        const MisPagos = await Store.eliminar_pago(Number(id_pago));
        Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en eliminar pago");
    }
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
export default store.router;
