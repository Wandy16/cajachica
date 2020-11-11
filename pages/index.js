import React, {useEffect} from 'react';
import Layout from '../components/layout/Layout';


import { useRouter } from 'next/router';
import {FirebaseContext} from '../firebase';

export default function Home() {

   //hook de routing par redireccionar
   const router = useRouter();

   
  useEffect( () => {
    router.push('/home');
  },[]);

 

  return (
    <div>
      <Layout>
         <h2>Inicio</h2>
      </Layout>
    </div>
  )
}
