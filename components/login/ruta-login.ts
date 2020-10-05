import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "./store-login";
import StoreUser from '../usuarios/store-usuarios';
import encripctacion from "bcryptjs";
import { Token } from '../../interface';
import jwt from "jsonwebtoken";
const { comprobar } = require("../util/util-login");
const { config } = require("../../config/index");

class Login {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async validar_vida_token(req: Request, res: Response) {
    console.log("validando el tiempo de vida del token, TOKEN ACTIVO");
    try {
        const myUser = await StoreUser.consulta_usuario(res.locals.datos_user.id_user);
        myUser[0].admin = res.locals.datos_user.admin;
        Respuesta.success(req, res, { myUser }, 200);
    } catch (error) {
        Respuesta.error(req, res, error, 500, "Error en pedir datos unico user, life token");
    }
  }

  async autenticar(req: Request, res: Response) {
    const { email, password } = req.body || null;

    const validar = await Store.validar_credenciales(email);

    if(validar.length !== 0){
        if(await encripctacion.compare(password, validar[0].password)){

            let save: Token = {
                id_user: validar[0].id_user,
                status: validar[0].status,
                admin: email === 'administrador@gmail.com' ? true : false,
            };

            const token = jwt.sign(save, config.jwtSecret);

            Respuesta.success(req, res, { token: token }, 200);
        }else{
            Respuesta.success(
                req,
                res,
                { feeback: "Los Datos que ingreso son incorrectos" },
                200
            );
        }
    }else{
        Respuesta.success(
            req,
            res,
            { feeback: "Los Datos que ingreso son incorrectos" },
            200
        );
    }
  }

  ruta() {
    // LOGIN
    this.router.post("/vida-token", comprobar, this.validar_vida_token);
    this.router.post("/autenticacion", this.autenticar);
  }
}

let login = new Login();
export default login.router;
