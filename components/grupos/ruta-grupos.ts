import { Request, Response, Router } from "express";
import Store from "./store-grupos";
const { comprobar } = require("../util/util-login");
import Respuestas from "../../network/response";
import { Grupo_afiliados_INT } from "../../interface";

class Grupos {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async agregar_integrante_grupo(req: Request, res: Response) {
    const { id_user, tipo_familiar, nombres, sexo, apellidos, fecha_nacimiento, cedula_g } = req.body || null;

    const grupo: Grupo_afiliados_INT = {
        id_user,
        tipo_familiar,
        nombres,
        sexo,
        apellidos,
        fecha_nacimiento,
        status_grupo: 'registrado',
        cedula: cedula_g,
    }

    try {
        const integranteExist = await Store.consulta_integrante_afiliado(grupo.nombres, grupo.fecha_nacimiento, grupo.tipo_familiar);
        if(integranteExist.length === 0){
            await Store.insertar_grupos(grupo);
            const resGrupo = await Store.consulta_integrante_afiliado(grupo.nombres, grupo.fecha_nacimiento, grupo.tipo_familiar);
            Respuestas.success(req, res, resGrupo, 200);
        }else{
            Respuestas.success(
                req,
                res,
                { feeback: `Este integrante ya existe, seleccione otros datos.` },
                200
            );
        }
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en agregar al grupo del afiliado');
    }
  }

  async obtener_usuarios(req: Request, res: Response) {
    try {
        const grupos = await Store.consulta_grupos_afiliados();
        Respuestas.success(req, res, grupos, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error al consultar grupos del afilidos");
    }
  }

  async eliminar_integrante_grupo(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await Store.eliminar_integrante_afiliado(Number(id));
        Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error al eliminar integrante de grupo del afilidos");
    }
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_usuarios);
    this.router.post("/", this.agregar_integrante_grupo);
    this.router.delete("/:id", this.eliminar_integrante_grupo);
  }
}

const grupo = new Grupos();
export default grupo.router;