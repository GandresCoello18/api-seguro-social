import database from "../../db";
import { Contacto_INT } from "../../interface/index";

class StorePersonal {
  /* INSERTAR - POST - CREAR */

  async insertar_contacto(contacto: Contacto_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO contacto (nombres, correo, mensaje, tema) VALUES ('${contacto.nombre}', '${contacto.correo}', '${contacto.mensaje}', '${contacto.tema}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_contactos(): Promise<Contacto_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM contacto ORDER BY id_contacto DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_contacto(): Promise<Contacto_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM contacto ORDER BY id_contacto DESC LIMIT 1; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - ELIMINAR - REMOVER */

  async eliminar_contacto(id_contacto: number): Promise<Contacto_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM contacto WHERE id_contacto = ${id_contacto}; `,
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
