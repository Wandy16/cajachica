import React, { useState, useEffect } from 'react';

const useValidacion = ( stateInicial, validar, fn ) => {
 
    const [valores, guardarValores ] = useState(stateInicial);
    const [valoreseditar, guardarEditarValores] = useState(null);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarSubmitForm] = useState(false);
    const [actualizarData, guardarActualizarData] = useState(false);


    useEffect(()=> {
        if(submitForm){
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores){
                fn(); //Fn = funcion que se ejecuta en el componente
            }
            guardarSubmitForm(false);
            guardarEditarValores(null);
           
        }
        else {
            if(valoreseditar!==null ){
                
                if(valores.id!==valoreseditar.id)
                {
                    guardarValores(valoreseditar);
                }
            }
        }
    },[errores, valoreseditar ]);

    //funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => { 
         if(e.target.name==='date'){
            guardarValores({
                ...valores,
                [e.target.name] : Math.floor(new Date(e.target.value) / 1000)
            })
        }else
        {
            guardarValores({
                ...valores,
                [e.target.name] : e.target.value
            })
        }
        
    }

    //funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
        
    }
    
    //cuando se realiza el evento de blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    //funcion que se ejecuta cuando el usuario borra un registro
    const handleDelete = () => {
        guardarActualizarData(true);
    }
    

    return {
        valores,
        errores,
        valoreseditar,
        submitForm,
        actualizarData,
        handleSubmit,
        handleChange,
        handleBlur,
        handleDelete,
        guardarValores,
        guardarEditarValores,
        guardarActualizarData
    }
}
 
export default useValidacion;