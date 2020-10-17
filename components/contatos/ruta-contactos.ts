import { Request, Response, Router } from "express";
import Store from "./store-contactos";
import Email from '../email/send-email';
const { comprobar } = require("../util/util-login");
import Respuestas from "../../network/response";
import { Contacto_INT, Email_INT } from "../../interface";

class Contacto {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async crear_contacto(req: Request, res: Response) {
    const { nombres, tema, mensaje, correo } = req.body || null;

    const contacto: Contacto_INT = {
        nombre: nombres,
        tema,
        mensaje,
        correo,
    }

    try {
        await Store.insertar_contacto(contacto);
        const resContacto = await Store.consulta_contacto(contacto.id_contacto);
        Respuestas.success(req, res, resContacto, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear contacto');
    }
  }

  async send_email(req: Request, res: Response) {
    const { email, message } = req.body || null;

    const send: Email_INT = {
      from: email,
      to: email,
      subject: 'Respondiendo dudas',
      text: message,
    }

    try {
      Email.send(send).then( () => {
        Respuestas.success(req, res, {send: true}, 200);
      }).catch(error => {
        Respuestas.error(req, res, error.message, 500, 'Error al enviar mensaje de correo electronico');
      })
    } catch (error) {
        Respuestas.error(req, res, error.message, 500, 'Error al enviar mensaje de correo electronico');
    }
  }

  async obtener_contactos(req: Request, res: Response) {
    try {
        const contacto = await Store.consulta_contactos();
        Respuestas.success(req, res, contacto, 200);
    } catch (error) {
        Respuestas.error(req, res, error.message, 500, "Error en obtener personal");
    }
  }

  async eliminar_contacto(req: Request, res: Response) {
    const { id_contacto } = req.params || null;
    try {
        await Store.eliminar_contacto(Number(id_contacto));
        Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en obtener personal");
    }
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_contactos);
    this.router.post("/send", this.send_email);
    this.router.post("/", this.crear_contacto);
    this.router.delete("/:id_contacto", this.eliminar_contacto);
  }
}

let store = new Contacto();
export default store.router;
