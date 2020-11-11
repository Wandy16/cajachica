import React, {useState, useEffect, useContext } from 'react';
import {FirebaseContext} from '../firebase';

const useCurrencies = (submitForm=false, actualizarData= false, guardarActualizarData) => {

  const [currencies, guardarCurrencies ]= useState([]);
  

  const{firebase, usuario} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerCurrencies = () => {

      firebase.db.collection("currencies")
      .where("user.id", "==", usuario.uid)
      .orderBy('name', 'asc')
        .get()
        .then(function(querySnapshot) {
         
          const currencies = querySnapshot.docs.map(doc => {
            return{
              id: doc.id,
              ...doc.data()
            }
          });
          guardarCurrencies(currencies);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        
        if(actualizarData===true)
          guardarActualizarData(false);

    }
    if(usuario && submitForm===false  || usuario && actualizarData===true )
      obtenerCurrencies();
  },[usuario, submitForm, actualizarData]);

 

  


  return{
    currencies
  }

}

export default useCurrencies;