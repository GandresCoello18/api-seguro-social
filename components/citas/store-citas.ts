import database from "../../db";
import { Cita_INT } from "../../interface/index";

class StoreCita {
  /* INSERTAR - POST - CREAR */

  async insertar_cita(cita: Cita_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO citas (id_cita, id_horario, id_user, status_cita, fecha_cita, hora_cita) VALUES ('${cita.id_cita}', '${cita.id_horario}', '${cita.id_user}', '${cita.status_cita}', '${cita.fecha_cita}', '${cita.hora_cita}')`,
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
        `SELECT * FROM citas INNER JOIN usuarios ON usuarios.id_user = citas.id_user INNER JOIN horario ON horario.id_horario = citas.id_horario INNER JOIN personal ON personal.id_personal = horario.id_personal ORDER BY citas.id_cita DESC;`,
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
        `SELECT * FROM citas INNER JOIN usuarios ON usuarios.id_user = citas.id_user INNER JOIN horario ON horario.id_horario = citas.id_horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE citas.id_cita = '${id_cita}' ORDER BY citas.id_cita DESC;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_cita_repeat(fecha: string, id_horario: string, hora: string): Promise<Cita_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM citas WHERE fecha_cita = '${fecha}' and id_horario = '${id_horario}' and hora_cita = '${hora}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* UPDATE - REMOVE */

  async status_cita(id_cita: string, estado: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE citas SET status_cita = '${estado}' WHERE id_cita = '${id_cita}';`,
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
