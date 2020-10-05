import { Request, Response, Router } from "express";
import Store from "./store-usuarios";
import StoreAfiliado from '../afiliados/store-afiliados';
const { comprobar } = require("../util/util-login");
// import Fechas from "../util/util-fecha";
import { v4 as uuidv4 } from "uuid";
import encriptacion from "bcryptjs";
import Respuestas from "../../network/response";
import {
    Usuario_INT
} from "../../interface";

class Usuario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async crear_usuario(req: Request, res: Response) {
    const { cedula, email, password, admin } = req.body || null;

    try {
        const isAfiliado = await StoreAfiliado.obtener_afiliado(cedula);

        if(isAfiliado.length !== 0){
          const cuenta = await Store.validar_usuario_existente(email);
          if(cuenta.length === 0){
              encriptacion
                  .hash(admin ? email+'9019' : password, 10)
                  .then( async (clave_encriptada) => {
                      const user: Usuario_INT = {
                          id_user: uuidv4(),
                          cedula: Number(cedula),
                          email,
                          status: 'registrado',
                          password: clave_encriptada,
                          id_afiliado: Number(isAfiliado[0].id_afiliados),
                      };

                      await Store.insertar_usuario(user);
                      const usuario = await Store.consulta_usuario(user.id_user);
                      Respuestas.success(req, res, usuario, 200);

                  }).catch( (err: any) => Respuestas.error(req, res, err, 500, 'Error en encriptar clave'));
          }else{
              Respuestas.success(
                  req,
                  res,
                  { feeback: "Este usuario ya existe" },
                  200
              );
          }
        }else{
          Respuestas.success(
            req,
            res,
            { feeback: "No afiliado, puede realizar el proceso de afilicion en el BIES" },
            200
        );
        }

    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear usuario');
    }
  }

  obtener_usuario(req: Request, res: Response) {
    const { id } = req.params || null;

    Store.consulta_usuario(id)
      .then((info) => {
        Respuestas.success(req, res, info, 200);
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "error en pedir datos unico user");
      });
  }

  obtener_usuarios(req: Request, res: Response) {
    Store.consultar_usuarios()
      .then((data) => {
        Respuestas.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "Error al consultar usuarios");
      });
  }

  editar_usuario(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id } = req.params || null;
      const { nombres, apellidos, email_on, tipo_user } = req.body || null;

      Store.editar_usuario(id, nombres, apellidos, email_on, tipo_user)
        .then((data) => {
          Respuestas.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuestas.error(req, res, err, 500, "Error al modificar usuarios");
        });
    } else {
      Respuestas.success(
        req,
        res,
        { feeback: "No tienes permisos para esta accion" },
        200
      );
    }
  }

  eliminar_usuario(req: Request, res: Response) {
    const { id } = req.params || null;

    Store.eliminar_usuario(id)
      .then( () => {
        Respuestas.success(req, res, {removed: true}, 200);
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "Error al eliminar usuarios");
      });
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_usuarios);
    this.router.get("/:id", this.obtener_usuario);
    this.router.post("/", this.crear_usuario);
    this.router.put("/:id", comprobar, this.editar_usuario);
    this.router.delete("/:id", comprobar, this.eliminar_usuario);
  }
}

let user = new Usuario();
export default user.router;