import database from "../../db";
import { Usuario_INT } from '../../interface';

class StoreLogin {
  /* SELECT - MOSTRAR - CONSULTA */

  async validar_credenciales(email: String): Promise<Usuario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE email = '${email}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let store = new StoreLogin();
export default store;
