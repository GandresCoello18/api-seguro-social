import { Request, Response, Router } from "express";
import Store from './store-citas';
import StoreUser from '../usuarios/store-usuarios';
import StoreGrupo from '../grupos/store-grupos';
const { comprobar } = require('../util/util-login');
import StoreHorario from '../horarios/store-horario';
import { v4 as uuidv4 } from "uuid";
import Respuestas from "../../network/response";
import {
    Cita_INT,
} from "../../interface";

class Citas {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async asignar_cita(req: Request, res: Response) {
    const { id_user, id_horario, fecha_cita, hora_cita, isGrupo, id_grupo } = req.body || null;

    try {
        const cita: Cita_INT = {
            id_cita: uuidv4(),
            id_user,
            id_horario,
            status_cita: 'Reservado',
            fecha_cita,
            hora_cita,
            isGrupo,
            id_grupo,
        }

        if(isGrupo === 0){
          const grupoAnonimo: any = await StoreGrupo.grupo_anonimo();
          cita.id_grupo = grupoAnonimo[0].id_grupo;
        }else{
          if(!cita.id_user || cita.id_grupo.toString() === cita.id_user){
            const userAnonimo = await StoreUser.consulta_usuario_anonimo();
            cita.id_user = userAnonimo[0].id_user;
          }
        }

        console.log(cita);

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

  async obtener_citas_grupo(req: Request, res: Response) {
    try {
        const resCita = await Store.consulta_citas_grupo(1);
        Respuestas.success(req, res, resCita, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error al consultar citas");
    }
  }

  async obtener_mis_citas(req: Request, res: Response) {

    try {
        const MisCitasGrupo = await Store.consulta_citas_grupo(1);
        let mis_citas_grupo: Array<Cita_INT> = [];

        for(let i = 0; i < MisCitasGrupo.length; i++){
          const grupo = await StoreGrupo.consulta_integrante(MisCitasGrupo[i].id_grupo);
          if(grupo[0].id_user === res.locals.datos_user.id_user){
            mis_citas_grupo.push(MisCitasGrupo[i]);
          }
        }

        const MisCitas = await Store.consulta_mis_citas(res.locals.datos_user.id_user);
        Respuestas.success(req, res, {MisCitas, MisCitasGrupo: mis_citas_grupo}, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en mis obtener citas");
    }
  }

  async validar_cita_hora(req: Request, res: Response) {
    const { id_horario, fecha_cita } = req.params || null;

    try {
      const horas_manana: Array<string> = [
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
      ];

      const horas_tarde: Array<string> = [
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
      ];

      let horas_disponibles: Array<string> = [];

        const resCita = await Store.validar_cita(id_horario, fecha_cita);

        const jornadaHorario =  await StoreHorario.consulta_horario(id_horario);

        if(jornadaHorario[0].jornada === 'Mañana'){

          horas_disponibles = horas_manana;
          for(let i = 0; i < horas_manana.length; i++){
            for(let j = 0; j < resCita.length; j++){
              if(resCita[j].hora_cita === horas_manana[i]){
                horas_disponibles.splice(i, 1);
              }
            }
          }

        }else{

          horas_disponibles = horas_tarde;
          for(let i = 0; i < horas_tarde.length; i++){
            for(let j = 0; j < resCita.length; j++){
              if(resCita[j].hora_cita === horas_tarde[i]){
                horas_disponibles.splice(i, 1);
              }
            }
          }

        }

        Respuestas.success(req, res, horas_disponibles, 200);
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
    this.router.get("/validar_cita/:id_horario/:fecha_cita", this.validar_cita_hora);
    this.router.get("/mis-citas/consulta", comprobar, this.obtener_mis_citas);
    this.router.get("/cita_grupo", this.obtener_citas_grupo);
    this.router.get("/", this.obtener_cita);
    this.router.post("/", this.asignar_cita);
    this.router.put("/estado/:id", this.cita_estado);
    this.router.delete("/:id", this.eliminar_cita);
  }
}

let cita = new Citas();
export default cita.router;
