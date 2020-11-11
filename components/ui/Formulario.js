import styled from '@emotion/styled';

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 2rem auto 0 auto;

    fieldset{
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size:2rem;
        padding: 2rem;
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label{
        flex: 0 0 150px;
        font-size: 1.8rem;
        margin-right: 1rem;
    }

    input, textarea, select{
        flex: 1;
        padding: 1rem;
        margin-left: 1rem;
    }
    textarea{
        height: 150px;
        margin-left: 1rem;
    }
`;

export const Campo2 = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    align-content: stretch;
    
    
    input{
       width: 100%; 
       padding: 0.5rem;
       border: 1px solid hsl(0,0%,80%);
       border-radius: 4px;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--primario);
    width:100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    border-radius: 25px;

    &:hover{
        cursor: pointer;
    }

`;

export const Error = styled.p`
    background-color: white;
    padding: 0.5rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: red;
    text-align: center;
    text-transform: uppercase;
   /*  margin: 0.5rem 0; */
`;

export const Menu = styled.span`
    color: #e1e1e1;

    &:hover{
        color: white;
        cursor:pointer;
    }

    span{
        margin-left: 1rem;
        margin-right: 1rem;
    }
`;

export const CampoDoble = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
    flex-wrap: wrap;
    
 
`;

export const Label = styled.label`
    margin-top: 1rem;
`;