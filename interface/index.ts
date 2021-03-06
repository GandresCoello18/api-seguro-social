export interface Usuario_INT {
    readonly id_user: string;
    cedula: number;
    email: string;
    password: string;
    status: string;
    admin?: boolean;
    nombres: string;
    apellidos: string;
    sexo: string;
    fecha_nacimiento: string;
    fecha_registro: string;
}

export interface Afiliados_INT {
    readonly id_afiliados: number;
    cedula: number;
    nombre: string;
    apellido: string;
}

export interface Grupo_afiliados_INT {
    readonly id_grupo?: number;
    id_user: string;
    tipo_familiar: string;
    nombres: string;
    sexo: string;
    apellidos: string;
    fecha_nacimiento: string;
    status_grupo: string;
    cedula: number;
}

export interface Personal_INT {
    readonly id_personal?: number;
    nombres: string;
    apellido: string;
    cargo: string;
    imagen: string;
    cedula_p: number;
    telefono_p: number;
}

export interface Token {
    id_user: string;
    status: string;
    admin: boolean;
}

export interface Contacto_INT {
    readonly id_contacto?: number;
    mensaje: string;
    nombre: string;
    correo: string;
    tema: string;
}

export interface Pago_INT {
    readonly id_pago?: number;
    id_user: string;
    fecha_pago: string;
    status: string;
    metodo: string;
    monto: number
}

export interface Horario_INT {
    readonly id_horario: string;
    id_personal: number;
    jornada: string;
    dia: string;
}

export interface Cita_INT {
    readonly id_cita: string;
    id_horario: string;
    id_user: string;
    status_cita: string;
    fecha_cita: string;
    hora_cita: string;
    isGrupo: boolean | number;
    id_grupo: number;
}

export interface Email_INT {
    from: string,
    to: string,
    subject: string,
    text: string,
}