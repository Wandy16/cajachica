export default function validarCrearAccount (valores){

    let errores = {};

    //validar el nombre del usuario
    if(!valores.name){
        errores.name = "The name is mandatory";
    }

    //validar el codigo
    if(!valores.code){
        errores.code = "The code is mandatory";
    }

    if(!valores.description){
        errores.description = "The description is mandatory";
    }

    if(!valores.transaction){
        errores.transaction = "The transaction description is mandatory";
    }

   

    return errores;
}