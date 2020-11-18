import { Request, Response, Router } from "express";
import Store from "./store-usuarios";
import bcryptjs from "bcryptjs";
const { comprobar } = require("../util/util-login");
import Fechas from "../util/util-fecha";
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
    const { cedula, email, nombres, apellidos, sexo, fecha_nacimiento, password, admin } = req.body || null;

    try {
          const cuenta = await Store.validar_usuario_existente(email, Number(cedula));
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
                          nombres,
                          apellidos,
                          sexo,
                          fecha_nacimiento,
                          fecha_registro: Fechas.fecha_actual(),
                      };

                      console.log(user);

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
    const { id } = req.params || null;
    const { nombres, apellidos, email_on, tipo_user } = req.body || null;

    Store.editar_usuario(id, nombres, apellidos, email_on, tipo_user)
      .then((data) => {
        Respuestas.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "Error al modificar usuarios");
      });
  }

  async update_password(req: Request, res: Response) {
      const { id } = req.params || null;
      const { password, newPassword } = req.body || null;

      try {
        const user = await Store.consulta_usuario(id);
        if(await bcryptjs.compare(password, user[0].password)){
          bcryptjs.hash(newPassword, 10).then( async nueva_clave => {
            console.log(nueva_clave);
            await Store.update_password(id, nueva_clave);
            Respuestas.success(req, res, {update: true}, 200);
          }).catch( (error) => {
            Respuestas.success(
              req,
              res,
              { feeback: error.message },
              200
            );
          })
        }else{
          Respuestas.success(
            req,
            res,
            { feeback: "Datos incorrectos, asegurece de escribir la clave actual correctamente." },
            200
          );
        }
      } catch (error) {
        Respuestas.error(req, res, error.message, 500, "Error al cambiar clave");
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
    this.router.put("/cambiar_clave/:id", this.update_password);
    this.router.put("/:id", this.editar_usuario);
    this.router.delete("/:id", this.eliminar_usuario);
  }
}

let user = new Usuario();
export default user.router;