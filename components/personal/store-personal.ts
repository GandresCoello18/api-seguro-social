import database from "../../db";
import { Personal_INT } from "../../interface/index";

class StorePersonal {
  /* INSERTAR - POST - CREAR */

  async insertar_personal(personal: Personal_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO personal (nombres, apellido, cargo, imagen, cedula_p, telefono_p) VALUES ('${personal.nombres}', '${personal.apellido}', '${personal.cargo}', '${personal.imagen}', ${personal.cedula_p}, ${personal.telefono_p})`,
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

  async consulta_personal_name_lasname(nombre: string, apellido: string): Promise<Personal_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM personal WHERE nombres = '${nombre}' AND apellido = '${apellido}' ; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* ELIMINAR - DELETE - REMOVER */

  async eliminar_personal(id_personal: number): Promise<Personal_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM personal WHERE id_personal = ${id_personal};`,
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
