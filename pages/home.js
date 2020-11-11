import React, {useContext, useEffect} from 'react';
import Layout from '../components/layout/Layout';
import { Titulo1 } from '../components/ui/Titulos';
import Link from 'next/link';

//cargar los datos
import usePettyCashes from '../hooks/usePettyCashes';

import { useRouter } from 'next/router';
import {FirebaseContext} from '../firebase';

import Error404 from '../components/layout/404';
import {PettyCash, ContenedorPettyCash  } from '../components/ui/Estilos';

export default function Home() {

  const {pettycashes, guardarPettyCashes} = usePettyCashes();

  //hook de routing par redireccionar
  const router = useRouter();

  //context con las operaciones crud de firebase
  const { usuario, firebase }  = useContext(FirebaseContext);
  
  //para formatear el numero a decimal con punto y coma
  const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  };

  /* useEffect(() => {
    console.log(usuario)
    if(!usuario){
      router.push('/login');
    }

  },[usuario]); */

  return (
    <div>
      <Layout>
        { !usuario ? <Error404 /> : (<>
         <Titulo1>Home</Titulo1>
          
          <ContenedorPettyCash>
          {pettycashes.map(pet => ( 
            <Link href="/pettycash/[id]" as={`/pettycash/${pet.id}`} key={pet.id} >
              <PettyCash key={pet.id}>
                <div>
                    <span>{Number(pet.actualAmount).toLocaleString('en', options)}</span>
                    <span>Available</span>
                </div>

                <div>
                    <h2>{pet.name}</h2>
                    <h4>Authorized: <span>{Number(pet.fondo).toLocaleString('en', options)}</span></h4>
                </div>
                
              </PettyCash>
            </Link>

          ))}
          </ContenedorPettyCash>

         </>)}
      </Layout>
     

     
    </div>
  )
}
