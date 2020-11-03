import database from "../../db";
import { Usuario_INT } from "../../interface/index";

class StoreUsuario {
  /* INSERTAR - POST - CREAR */

  async insertar_usuario(user: Usuario_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO usuarios (id_user, cedula, email, password, status, nombres, apellidos, sexo, fecha_nacimiento, fecha_registro) VALUES ('${user.id_user}', ${user.cedula}, '${user.email}', '${user.password}', '${user.status}', '${user.nombres}', '${user.apellidos}', '${user.sexo}', '${user.fecha_nacimiento}', '${user.fecha_registro}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async validar_usuario_existente(email: String, cedula: number): Promise<Usuario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE email = '${email}' OR cedula = ${cedula} `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consultar_usuarios(): Promise<Usuario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(`SELECT * FROM usuarios`, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  async consulta_usuario(id: string): Promise<Usuario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_usuario_anonimo(): Promise<Usuario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE email = 'anonimo@gmail.com';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  async editar_usuario(
    id: string,
    nombres: string,
    apellidos: string,
    email_on: Boolean,
    tipo_user: string
  ) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE usuarios SET nombres = '${nombres}', apellidos = '${apellidos}', email_on = ${email_on}, tipo_user = '${tipo_user}' WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async update_password(id: string, new_password: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE usuarios SET password = '${new_password}' WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async verificar_email(id: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE usuarios SET email_on = 1 WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - BORRAR - ELIMINAR */

  async eliminar_usuario(id: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM usuarios WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StoreUsuario();
export default store;