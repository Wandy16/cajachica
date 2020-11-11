export default function validarCrearDepartamento (valores){

    let errores = {};

    //validar el nombre del usuario
    if(!valores.name){
        errores.name = "The name is mandatory";
    }

    //validar el codigo
    if(!valores.code){
        errores.code = "The code is mandatory";
    }
   

    return errores;
}