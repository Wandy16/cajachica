export default function validarCrearCajaChica (valores){

    let errores = {};

    //validar el nombre del usuario
    if(!valores.description){
        errores.description = "The description is mandatory";
    }

    if(!valores.paidTo){
        errores.paidTo = "The person you paid this voucher to is mandatory";
    }

    if(!valores.account){
        errores.account = "The account is mandatory";
    }


    if(!valores.amount){
        errores.amount = "The amount is mandatory";
    }

    if(!valores.sequence){
        errores.sequence = "The sequence is mandatory";
    }

    if(!valores.receivedBy){
        errores.receivedBy = "The person that received the money is mandatory";
    }

   

    if(!valores.approvalBy){
        errores.approvalBy = "The person that approved the voucher is mandatory";
    }

   

    return errores;
}