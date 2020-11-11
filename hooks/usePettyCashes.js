import React, {useState, useEffect, useContext } from 'react';
import {FirebaseContext} from '../firebase';

const usePettyCashes = (submitForm=false) => {

  const [pettycashes, guardarPettyCashes ]= useState([]);
  

  const{firebase, usuario} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPettyCashes = () => {

        firebase.db.collection("pettycashes")
        .where("user.id", "==", usuario.uid)
        .orderBy('name', 'asc')
          .get()
          .then(function(querySnapshot) {

            const pettycashes = querySnapshot.docs.map(doc => {
           
              return{
                id: doc.id,
                ...doc.data()
              }
            });
              guardarPettyCashes(pettycashes);
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          }); 

    }
    
    if(usuario  && submitForm===false)
     {
      // console.log(usuario)
      obtenerPettyCashes();
     } 
  },[usuario, submitForm]);

  function manejarSnapShot(snapshot){
      const pettycashes = snapshot.docs.map(doc => {
        return{
          id: doc.id,
          ...doc.data()
        }
      });
      guardarPettyCashes(pettycashes);
  }

  


  return{
    pettycashes,
    guardarPettyCashes
  }

}

export default usePettyCashes;