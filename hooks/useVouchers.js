import React, {useState, useEffect, useContext } from 'react';
import {FirebaseContext} from '../firebase';

const useVouchers = (submitForm=false  ) => {

  const [vouchers, guardarVouchers ]= useState([]);
  

  const{firebase, usuario} = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerVouchers = () => {
      
      console.log(usuario.uid)
      firebase.db.collection("vouchers")
      .where("user.id", "==", usuario.uid)
      //.where("pettycash","==", pettycash)
      .orderBy('date', 'desc')
        .get()
        .then(function(querySnapshot) {
         
          const vouchers = querySnapshot.docs.map(doc => {
            return{
              id: doc.id,
              ...doc.data()
            }
          });

           
          guardarVouchers(vouchers);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    if(usuario && submitForm===false)
      obtenerVouchers();
      console.log(vouchers)
  },[usuario, submitForm ]);

 

  


  return{
    vouchers
  }

}

export default useVouchers;