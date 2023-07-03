export interface Tareas {
    id?:string,
    titulo:string,
    descripcion:string,
}


export interface TareaRealizada extends Tareas{
    id?:string,
    fecha:Date;
    
}
