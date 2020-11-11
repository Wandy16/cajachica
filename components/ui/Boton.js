import styled from '@emotion/styled';

const Boton = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin-right:2rem auto;
    text-align: center;
    background-color: ${props => props.bgColor ?' var(--primario)' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};
    border-radius: 25px;

    &:last-of-type{
        margin-right:0;
    }

    &:hover{
        cursor: pointer;
    }
`;

export default Boton;

export const BotonLogout = styled.a`
    display: block;
    padding: .8rem 2rem;
    margin-right:2rem auto;
    text-align: center;
    color: ${props => props.bgColor ? 'white' : '#000'};

    &:last-of-type{
        margin-right:0;
    }

    &:hover{
        cursor: pointer;
    }
`;

export const BotonNuevoRegistro = styled.button`
    border:none;
    background-color: var(--primario);
    text-transform: uppercase;
    text-align:center;
    padding: 1rem;
    margin-bottom: 2rem;
    border-radius: 25px;

    &:hover{
        background-color: var(--secundario);
        cursor: pointer;
        color: white;
    }

`;

export const BotonCancelar = styled.button`
    border:1px solid var(--gris3);
    background-color: transparent;
    text-transform: uppercase;
    text-align:center;
    padding: 1rem;
    width:100%;
    margin-top: 2rem;
    border-radius: 25px;

    &:hover{
        background-color: var(--gris3);
        cursor: pointer;
        
    }

`;