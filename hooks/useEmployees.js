import React, {useState, useEffect, useContext } from 'react';
import {FirebaseContext} from '../firebase';

const useEmployees = (submitForm=false, actualizarData= false, guardarActualizarData) => {

  const [employees, guardarEmployees ]= useState([]);
  

  const{firebase, usuario} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerEmployees = () => {

      firebase.db.collection("employees")
      .where("user.id", "==", usuario.uid)
      .orderBy('name', 'asc')
        .get()
        .then(function(querySnapshot) {
          const employees = querySnapshot.docs.map(doc => {
            return{
              id: doc.id,
              ...doc.data()
            }
          });
          guardarEmployees(employees);
          if(actualizarData===true)
            guardarActualizarData(false);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    }
    if(usuario && submitForm===false || usuario && actualizarData===true)
      obtenerEmployees();
  },[usuario, submitForm, actualizarData]);

  function manejarSnapShot(snapshot){
      const employees = snapshot.docs.map(emp => {
        return{
          id: emp.id,
          ...emp.data()
        }
      });
      guardarEmployees(employees);
  }

  


  return{
    employees
  }

}

export default useEmployees;