import { Request, Response, Router } from "express";
import Store from "./store-contactos";
const { comprobar } = require("../util/util-login");
import Respuestas from "../../network/response";
import { Contacto_INT } from "../../interface";

class Contacto {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async crear_contacto(req: Request, res: Response) {
    const { nombre, tema, mensaje, correo } = req.body || null;

    const contacto: Contacto_INT = {
        nombre,
        tema,
        mensaje,
        correo,
    }

    try {
        const resContacto = await Store.insertar_contacto(contacto);
        Respuestas.success(req, res, resContacto, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear contacto');
    }
  }

  async obtener_contactos(req: Request, res: Response) {
    try {
        const contacto = await Store.consulta_contacto();
        Respuestas.success(req, res, contacto, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en obtener personal");
    }
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_contactos);
    this.router.post("/", this.crear_contacto);
  }
}

let store = new Contacto();
export default store.router;
