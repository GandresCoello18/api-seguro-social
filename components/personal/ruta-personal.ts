import { Request, Response, Router } from "express";
import Store from "./store-personal";
const { comprobar } = require("../util/util-login");
import Respuestas from "../../network/response";
import multer from 'multer';
import { Personal_INT } from "../../interface";

class Personal {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  store_file() {
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, "./public/personal");
      },
      filename: function (req: Request, file: any, cb: any) {
        cb(null, file.originalname);
      },
    });
    const fileFilter = (
      req: any,
      file: { mimetype: string },
      cb: (arg0: null, arg1: boolean) => void
    ) => {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter: fileFilter,
    });
    return upload;
  }

  /* USUARIO */

  async crear_personal(req: Request, res: Response) {
    const { nombres, apellido, cargo } = req.body || null;
    const personal: Personal_INT = {
      nombres,
      apellido,
      cargo,
      imagen: req.file.originalname,
    }

    try {
        await Store.insertar_personal(personal);
        const resPersonal = await Store.consulta_personal_name_lasname(personal.nombres, personal.apellido);
        Respuestas.success(req, res, resPersonal, 200);
    } catch (error) {
        Respuestas.success(req, res, {feeback: error.message}, 200);
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

  async eliminar_personal(req: Request, res: Response) {
    const { id } = req.params || null;
    try {
        await Store.eliminar_personal(Number(id));
        Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, "Error en eliminar personal");
    }
  }

  ruta() {
    /* entry point user */
    const upload = this.store_file();
    this.router.get("/", this.obtener_personal);
    this.router.post("/", upload.single('imagen'), this.crear_personal);
    this.router.delete("/:id", this.eliminar_personal);
  }
}

let user = new Personal();
export default user.router;
