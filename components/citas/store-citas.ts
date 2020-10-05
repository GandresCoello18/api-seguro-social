import database from "../../db";
import { Cita_INT } from "../../interface/index";

class StoreCita {
  /* INSERTAR - POST - CREAR */

  async insertar_cita(cita: Cita_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO citas (id_cita, id_horario, id_user, status_cita, fecha_cita, hora_cita) VALUES ('${cita.id_cita}', ${cita.id_horario}, '${cita.id_user}', '${cita.status_cita}', '${cita.fecha_cita}', '${cita.hora_cita}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_citas(): Promise<Cita_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM citas INNER JOIN usuarios ON usuarios.id_user = citas.id_user INNER JOIN horario ON horario.id_horario = citas.id_horario ORDER BY horario.id_horario DESC;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_cita(id_cita: string): Promise<Cita_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM citas INNER JOIN usuarios ON usuarios.id_user = citas.id_user INNER JOIN horario ON horario.id_horario = citas.id_horario WHERE cita.id_cita = '${id_cita}' ORDER BY horario.id_horario DESC;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - ELIMINAR - BORRAR */

  async eliminar_cita(id_cita: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM citas WHERE id_cita = '${id_cita}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StoreCita();
export default store;
