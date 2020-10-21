import { Request, Response, Router } from "express";
import Store from './store-citas';
// const { comprobar } = require("../util/util-login");
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
    const { id_user, id_horario, fecha_cita, hora_cita } = req.body || null;

    try {
        const cita: Cita_INT = {
            id_cita: uuidv4(),
            id_user,
            id_horario,
            status_cita: 'Reservado',
            fecha_cita,
            hora_cita,
        }

        const repeatCita = await Store.consulta_cita_repeat(cita.fecha_cita, cita.id_horario, cita.hora_cita);
        if(repeatCita.length === 0){
          await Store.insertar_cita(cita);
          const thisCita = await Store.consulta_cita(cita.id_cita);

          Respuestas.success(req, res, thisCita, 200);
        }else{
          Respuestas.success(
            req,
            res,
            { feeback: "La fecha, hora o jornada especificada ya estan tomandas por otra cita." },
            200
          );
        }

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

  async cita_estado(req: Request, res: Response) {
    const { id } = req.params || null;
    const { estado } = req.body || null;

    try {
        await Store.status_cita(id, estado);
        const thisCita = await Store.consulta_cita(id);
        Respuestas.success(req, res, {update: true, cita: thisCita}, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error al editar status cita");
    }
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_cita);
    this.router.post("/", this.asignar_cita);
    this.router.put("/estado/:id", this.cita_estado);
    this.router.delete("/:id", this.eliminar_cita);
  }
}

let cita = new Citas();
export default cita.router;
