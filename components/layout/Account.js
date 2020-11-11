import React from 'react';
import styled from '@emotion/styled';




const EstiloAccount = styled.li`
    
        padding: 1rem;
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 2px;
        width: 100%;
  
    &:hover{
        background-color: var(--secundario);
        color:white;
        cursor: pointer;
    }
   
   h5{
       text-align:center;

       span{
           font-weight:bold;
       }
   }

`;
const STATE_INICIAL = {
    code: '',
    name: ''
  }

const Account = ({account, guardarEditarValores}) => {

   
    //const {   valoreseditar, guardarEditarValores } = useValidacion( STATE_INICIAL, {}, editar );
   
    const {code, name, description, transaction }= account;

    const editar = () =>{
        guardarEditarValores(account); 
    }

    return ( 
        <EstiloAccount 
            className="card"
            onClick={ editar }
        >
           <h5>{code}</h5>
           <h3>{name}</h3>
           <h5><span>Description:</span>{description}</h5>
           <h5><span>Transaction description:</span>{transaction}</h5>
           
        </EstiloAccount>
     );
}
 
export default Account;