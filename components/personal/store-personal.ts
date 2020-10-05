import database from "../../db";
import { Personal_INT } from "../../interface/index";

class StorePersonal {
  /* INSERTAR - POST - CREAR */

  async insertar_personal(personal: Personal_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO personal (nombres, apellido, cargo, imagen) VALUES ('${personal.nombres}', '${personal.apellido}', '${personal.cargo}', '${personal.imagen}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_personal(): Promise<Personal_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM personal ORDER BY RAND(); `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StorePersonal();
export default store;
