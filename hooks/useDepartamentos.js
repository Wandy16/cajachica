import React, {useState, useEffect, useContext } from 'react';
import {FirebaseContext} from '../firebase';

const useDepartamentos = (submitForm=false, actualizarData= false, guardarActualizarData) => {

  const [departamentos, guardarDepartamentos ]= useState([]);
  

  const{firebase, usuario} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerDepartamentos = () => {
      firebase.db.collection("departamentos")
      .where("user.id", "==", usuario.uid)
      .orderBy('name', 'asc')
        .get()
        .then(function(querySnapshot) {

          const departamentos = querySnapshot.docs.map(doc => {
            
            return{
              id: doc.id,
              ...doc.data()
            }
          });
          guardarDepartamentos(departamentos);

          if(actualizarData===true)
            guardarActualizarData(false);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    }
    if(usuario && submitForm===false || usuario && actualizarData===true)
      obtenerDepartamentos();
  },[usuario,submitForm, actualizarData]);

  function manejarSnapShot(snapshot){
      const departamentos = snapshot.docs.map(doc => {
        return{
          id: doc.id,
          ...doc.data()
        }
      });
      guardarDepartamentos(departamentos);
  }

  


  return{
    departamentos
  }

}

export default useDepartamentos;