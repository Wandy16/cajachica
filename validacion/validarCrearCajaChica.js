export default function validarCrearCajaChica (valores){

    let errores = {};

    //validar el nombre del usuario
    if(!valores.name){
        errores.name = "The name is mandatory";
    }

    if(!valores.fondo){
        errores.fondo = "The authorized fund balance is mandatory";
    }

    if(!valores.location){
        errores.location = "The location is mandatory";
    }

    if(!valores.currency){
        errores.currency = "The currency is mandatory";
    }

    if(!valores.initialValue){
        errores.initialValue = "The actual amount is mandatory";
    }


    /**
     * name: '',
  fondo: 0,
  actualAmount:0,
  location: {},
  usersAllowed:[],
  currency:''
     */
   

    return errores;
}