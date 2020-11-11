import React from 'react';
import styled from '@emotion/styled';

const EstiloDepa = styled.li`
    
        padding: 1rem;
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 2px;
  
    &:hover{
        background-color: var(--secundario);
        color:white;
        cursor: pointer;
    }
   
   h5{
       justify-self:right;
   }
`;
const STATE_INICIAL = {
    code: '',
    name: ''
  }

const Departamento = ({departamento, guardarEditarValores}) => {


    //const {   valoreseditar, guardarEditarValores } = useValidacion( STATE_INICIAL, {}, editar );
   
    const {code, name } = departamento;

    const editar = () =>{
        guardarEditarValores(departamento); 
    }

    return ( 
        <EstiloDepa 
            className="card"
            onClick={ editar }
        >
           <h5>{code}</h5>
           <h3>{name}</h3>
           
        </EstiloDepa>
     );
}
 
export default Departamento;