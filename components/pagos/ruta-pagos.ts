import { Request, Response, Router } from "express";
import Store from "./store-pagos";
import StoreUsuario from '../usuarios/store-usuarios';
import Fecha from '../util/util-fecha';
import Email from '../email/send-email';
const { comprobar } = require("../util/util-login");
import Respuestas from "../../network/response";
import { Email_INT, Pago_INT } from "../../interface";
import moment from "moment";

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

    const countPago = Math.trunc(Number(pago.monto) / 5);

    try {
      let resPago: Pago_INT[] = [];
        for(let i = 0; i < countPago; i++){
          pago.monto = 5;
          await Store.insertar_pagos(pago);
          let data = await Store.consulta_pago(pago.id_user, pago.fecha_pago);
          resPago.push(data[0]);
          pago.fecha_pago = moment(new Date(Fecha.incrementarMes(pago.fecha_pago))).format();
        }

        const user = await StoreUsuario.consulta_usuario(pago.id_user)

        if(admin){
          const send: Email_INT = {
            from: user[0].email,
            to: user[0].email,
            subject: 'Pagos del seguro social "La Tereza"',
            text: `Su pago desde la fecha: ${moment(fecha_pago).format('LL')} ha sido registrado con metodo de pago: ${metodo} y monto de: ${monto}`,
          }

          Email.send(send).then( () => {
            Respuestas.success(req, res, {send: true}, 200);
          }).catch(error => {
            Respuestas.error(req, res, error.message, 500, 'Error al enviar mensaje de correo electronico');
          })
        }

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

  async obtener_pagos_por_fecha(req: Request, res: Response) {

    try {
        const { fecha } = req.params || null
        const Pagos = await Store.consulta_pagos_por_fecha(fecha);
        Respuestas.success(req, res, Pagos, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en mis obtener pagos por mes");
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
    this.router.get("/mes/:fecha", this.obtener_pagos_por_fecha);
    this.router.get("/", this.obtener_pagos);
    this.router.post("/", this.crear_pago);
    this.router.delete("/:id_pago", this.eliminar_pago);
  }
}

let store = new Pagos();
export default store.router;
