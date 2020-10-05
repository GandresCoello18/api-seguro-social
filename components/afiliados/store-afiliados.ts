import database from "../../db";
import { Afiliados_INT } from "../../interface/index";

class StoreAfiliado {


    async obtener_afiliado(cedula: number): Promise<Afiliados_INT[]> {
        return await new Promise((resolve, reject) => {
          database.query(
            `SELECT * FROM afiliados WHERE cedula = ${cedula} `,
            (err, data) => {
              if (err) return reject(err);
              resolve(data);
            }
          );
        });
      }

}

let store = new StoreAfiliado();
export default store;