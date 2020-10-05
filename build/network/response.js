"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
class Respuestas {
    constructor() { }
    success(req, res, mensaje, estado) {
        res.status(estado || 200).send(mensaje);
    }
    error(req, res, mensaje, estado, detalles) {
        console.log(colors_1.default.bgRed(colors_1.default.white(mensaje + " [response error] " + detalles)));
        res.status(estado || 500).send({
            error: mensaje,
            body: "",
        });
    }
}
let responder = new Respuestas();
exports.default = responder;
