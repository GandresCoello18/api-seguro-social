import database from "../../db";
import { Horario_INT } from "../../interface/index";

class StoreHorario {
  /* INSERTAR - POST - CREAR */

  async insertar_horario(horario: Horario_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO horario (id_horario, id_personal, jornada, dia) VALUES ('${horario.id_horario}', ${horario.id_personal}, '${horario.jornada}', '${horario.dia}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_horarios(): Promise<Horario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM horario INNER JOIN personal ON personal.id_personal = horario.id_personal ORDER BY horario.id_horario DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_horario(id_horario: string): Promise<Horario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE horario.id_horario = '${id_horario}' ORDER BY horario.id_horario DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async count_jornada_dia(jornada: string, dia: string, id_personal: number): Promise<Horario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE horario.jornada = '${jornada}' and horario.dia = '${dia}' and horario.id_personal = ${id_personal} ORDER BY horario.id_horario DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async buscar_personal_jornada_dia(jornada: string, dia: string, id_personal: number): Promise<Horario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM horario INNER JOIN personal ON personal.id_personal = horario.id_personal WHERE horario.jornada = '${jornada}' and horario.dia = '${dia}' and horario.id_personal = ${id_personal} ORDER BY horario.id_horario DESC; `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  ///// DELETE

  async eliminar_horario(id_horario: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM horario WHERE id_horario = '${id_horario}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StoreHorario();
export default store;
