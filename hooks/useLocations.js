import React, {useState, useEffect, useContext } from 'react';
import {FirebaseContext} from '../firebase';

const useLocations = (submitForm=false, actualizarData= false, guardarActualizarData) => {

  const [locations, guardarLocations ]= useState([]);
  

  const{firebase, usuario} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerLocations = () => {
       
      firebase.db.collection("locations")
      .where("user.id", "==", usuario.uid)
      .orderBy('name', 'asc')
        .get()
        .then(function(querySnapshot) {
         
          const locations = querySnapshot.docs.map(doc => {
         
            return{
              id: doc.id,
              ...doc.data()
            }
          });
          guardarLocations(locations);
          if(actualizarData===true)
            guardarActualizarData(false);

        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    }
    if(usuario && submitForm===false || usuario && actualizarData===true)
      obtenerLocations();

     
  },[usuario, submitForm, actualizarData]);

  function manejarSnapShot(snapshot){
      const locations = snapshot.docs.map(doc => {
        return{
          id: doc.id,
          ...doc.data()
        }
      });
      guardarLocations(locations);
  }

  


  return{
    locations
  }

}

export default useLocations;