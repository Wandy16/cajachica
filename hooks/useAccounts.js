import React, {useState, useEffect, useContext } from 'react';
import {FirebaseContext} from '../firebase';

const useAccounts = (submitForm=false, actualizarData= false, guardarActualizarData) => {

  const [accounts, guardarAccounts ]= useState([]);
  const{firebase, usuario} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerAccounts = () => {

      firebase.db.collection("accounts")
      .where("user.id", "==", usuario.uid)
      .orderBy('name', 'asc')
        .get()
        .then(function(querySnapshot) {
          const accounts = querySnapshot.docs.map(doc => {
            return{
              id: doc.id,
              ...doc.data()
            }
          });
          guardarAccounts(accounts);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        if(actualizarData===true)
          guardarActualizarData(false);

    }
    if(usuario && submitForm===false  || usuario && actualizarData===true && submitForm===false )
      obtenerAccounts();
  },[usuario,submitForm, actualizarData]);

  return{
    accounts
  }

}

export default useAccounts;