"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_personal_1 = __importDefault(require("./store-personal"));
const { comprobar } = require("../util/util-login");
const response_1 = __importDefault(require("../../network/response"));
const multer_1 = __importDefault(require("multer"));
class Personal {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    store_file() {
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./public/personal");
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            },
        });
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        };
        const upload = multer_1.default({
            storage: storage,
            limits: { fileSize: 1024 * 1024 * 5 },
            fileFilter: fileFilter,
        });
        return upload;
    }
    /* USUARIO */
    crear_personal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombres, apellido, cargo, cedula_p, telefono_p } = req.body || null;
            console.log(req.file);
            const personal = {
                nombres,
                apellido,
                cargo,
                imagen: req.file.originalname,
                cedula_p,
                telefono_p,
            };
            try {
                yield store_personal_1.default.insertar_personal(personal);
                const resPersonal = yield store_personal_1.default.consulta_personal_name_lasname(personal.nombres, personal.apellido);
                response_1.default.success(req, res, resPersonal, 200);
            }
            catch (error) {
                response_1.default.success(req, res, { feeback: error.message }, 200);
            }
        });
    }
    obtener_personal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personal = yield store_personal_1.default.consulta_personal();
                response_1.default.success(req, res, personal, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en obtener personal");
            }
        });
    }
    eliminar_personal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params || null;
            try {
                yield store_personal_1.default.eliminar_personal(Number(id));
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, "Error en eliminar personal");
            }
        });
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
exports.default = user.router;
