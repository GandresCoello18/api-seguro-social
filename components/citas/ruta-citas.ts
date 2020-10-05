import { Request, Response, Router } from "express";
import Store from './store-citas';
const { comprobar } = require("../util/util-login");
// import Fechas from "../util/util-fecha";
import { v4 as uuidv4 } from "uuid";
import Respuestas from "../../network/response";
import {
    Cita_INT
} from "../../interface";

class Citas {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async asignar_cita(req: Request, res: Response) {
    const { id_user, id_horario, status, fecha, hora } = req.body || null;

    try {
        const cita: Cita_INT = {
            id_cita: uuidv4(),
            id_user,
            id_horario,
            status_cita: status,
            fecha_cita: fecha,
            hora_cita: hora
        }
        await Store.insertar_cita(cita);
        const thisCita = await Store.consulta_cita(cita.id_cita);

        Respuestas.success(req, res, thisCita, 200);

    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear cita');
    }
  }

  async obtener_cita(req: Request, res: Response) {
    try {
        const resCita = await Store.consulta_citas();
        Respuestas.success(req, res, resCita, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error al consultar citas");
    }
  }

  async eliminar_cita(req: Request, res: Response) {
    const { id } = req.params || null;

    try {
        await Store.eliminar_cita(id);
        Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error al eliminar cita");
    }
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_cita);
    this.router.post("/", comprobar, this.asignar_cita);
    this.router.delete("/:id", comprobar, this.eliminar_cita);
  }
}

let cita = new Citas();
export default cita.router;
