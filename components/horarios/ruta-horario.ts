import { Request, Response, Router } from "express";
import Store from './store-horario';
const { comprobar } = require("../util/util-login");
// import Fechas from "../util/util-fecha";
import { v4 as uuidv4 } from "uuid";
import Respuestas from "../../network/response";
import {
    Horario_INT
} from "../../interface";

class Horario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async asignar_horario(req: Request, res: Response) {
    const { id_personal, jornada, dia } = req.body || null;

    try {
        const HorarioRepeat = await Store.buscar_personal_jornada_dia(jornada, dia, id_personal);

        if(HorarioRepeat.length === 0){
          const countHorario = await Store.count_jornada_dia(jornada, dia, id_personal);

          if(countHorario.length < 3){

              const horario: Horario_INT = {
                  id_horario: uuidv4(),
                  id_personal,
                  jornada,
                  dia
              }

              await Store.insertar_horario(horario);
              const resHorario = await Store.consulta_horario(horario.id_horario);
              Respuestas.success(req, res, resHorario, 200);
          }else{
              Respuestas.success(
                  req,
                  res,
                  { feeback: `La jornada: ${jornada} y el dia: ${dia} ya estan completas` },
                  200
              );
          }
        }else{
          Respuestas.success(
            req,
            res,
            { feeback: `Este Medico ya pertenerce ha la jornada: ${jornada} y el dia: ${dia}.` },
            200
        );
        }

    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear horario');
    }
  }

  async obtener_horario(req: Request, res: Response) {
    try {
        const resHorario = await Store.consulta_horarios();
        Respuestas.success(req, res, resHorario, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error al consultar horario");
    }
  }

  async eliminar_horario(req: Request, res: Response) {
    const { id } = req.params || null;

    try {
      await Store.eliminar_horario(id);
      Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, "Error al eliminar horario");
    }
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_horario);
    this.router.post("/", this.asignar_horario);
    this.router.delete("/:id", this.eliminar_horario);
  }
}

let horario = new Horario();
export default horario.router;