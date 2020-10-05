import { Request, Response, Router } from "express";
import Store from "./store-personal";
const { comprobar } = require("../util/util-login");
import Respuestas from "../../network/response";
import { Personal_INT } from "../../interface";

class Personal {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async crear_personal(req: Request, res: Response) {
    const { nombres, apellido, cargo, imagen } = req.body || null;

    const personal: Personal_INT = {
        nombres,
        apellido,
        cargo,
        imagen,
    }

    try {
        const resPersonal = await Store.insertar_personal(personal);
        Respuestas.success(req, res, resPersonal, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear usuario');
    }
  }

  async obtener_personal(req: Request, res: Response) {
    try {
        const personal = await Store.consulta_personal();
        Respuestas.success(req, res, personal, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en obtener personal");
    }
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_personal);
    this.router.post("/", comprobar, this.crear_personal);
  }
}

let user = new Personal();
export default user.router;
