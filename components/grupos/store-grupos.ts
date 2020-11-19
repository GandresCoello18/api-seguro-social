import database from "../../db";
import { Grupo_afiliados_INT } from "../../interface/index";

class StoreGrupos {
  /* INSERTAR - POST - CREAR */

  async insertar_grupos(grupo: Grupo_afiliados_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO grupo_seguro (id_user, tipo_familiar, nombres, apellidos, fecha_nacimiento, status_grupo, sexo, cedula_g) VALUES ('${grupo.id_user}', '${grupo.tipo_familiar}', '${grupo.nombres}', '${grupo.apellidos}', '${grupo.fecha_nacimiento}', '${grupo.status_grupo}', '${grupo.sexo}', ${grupo.cedula})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_grupos_afiliados(): Promise<Grupo_afiliados_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM grupo_seguro;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_integrante_afiliado(nombres: string, fecha_nacimiento: string, tipo_familiar: string): Promise<Grupo_afiliados_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM grupo_seguro WHERE tipo_familiar = '${tipo_familiar}' AND nombres = '${nombres}' AND fecha_nacimiento = '${fecha_nacimiento}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_integrante(id_grupo: number): Promise<Grupo_afiliados_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM grupo_seguro WHERE id_grupo = ${id_grupo};`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async grupo_anonimo(): Promise<Grupo_afiliados_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM grupo_seguro WHERE nombres = 'anonimo' AND apellidos = 'anonimo';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* ELIMINAR - DELETE - REMOVER */

  async eliminar_integrante_afiliado(id_grupo: number): Promise<any> {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM grupo_seguro WHERE id_grupo = ${id_grupo}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let store = new StoreGrupos();
export default store;
