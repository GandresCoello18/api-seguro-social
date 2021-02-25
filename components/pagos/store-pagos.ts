import database from "../../db";
import { Pago_INT } from "../../interface/index";

class StorePersonal {
  /* INSERTAR - POST - CREAR */

  async insertar_pagos(pago: Pago_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO pagos (id_user, fecha_pago, status, metodo, monto) VALUES ('${pago.id_user}', '${pago.fecha_pago}', '${pago.status}', '${pago.metodo}', ${pago.monto})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_pagos(): Promise<Pago_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT *, pagos.status as status FROM pagos INNER JOIN usuarios ON usuarios.id_user = pagos.id_user ORDER BY pagos.id_pago DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_pago(id_user: string, fecha_pago: string): Promise<Pago_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM pagos INNER JOIN usuarios ON usuarios.id_user = pagos.id_user WHERE pagos.id_user = '${id_user}' and pagos.fecha_pago = '${fecha_pago}' ORDER BY pagos.id_pago DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_mis_pagos(id_user: string): Promise<Pago_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM pagos WHERE id_user = '${id_user}' ORDER BY id_pago DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_pagos_por_fecha(fecha_pago: string): Promise<Pago_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM pagos INNER JOIN usuarios ON usuarios.id_user = pagos.id_user WHERE pagos.fecha_pago LIKE '%${fecha_pago}%' ORDER BY pagos.id_pago DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  ////////7  DELETE

  async eliminar_pago(id_pago: number): Promise<any> {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM pagos WHERE id_pago = ${id_pago} `,
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
