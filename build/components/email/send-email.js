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
const nodemailer_1 = __importDefault(require("nodemailer"));
const { config } = require("../../config");
class UtilEmail {
    constructor() { }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entro en send");
            let testAccount = yield nodemailer_1.default.createTestAccount();
            let transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                service: "gmail",
                requireTLS: true,
                secure: true,
                tls: { rejectUnauthorized: false },
                auth: {
                    user: config.correoGmail,
                    pass: config.claveGmail,
                },
            });
            let info = yield transporter.sendMail({
                from: `${data.from}`,
                to: `${data.to}`,
                subject: `${data.subject}`,
                text: `${data.text}`,
                html: `<h1>SEGURO SOCIAL CAMPECINO "LA TEREZA"</h1>`,
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
        });
    }
}
let utilemail = new UtilEmail();
exports.default = utilemail;
