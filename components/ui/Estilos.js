import styled from '@emotion/styled';


export const ContenedorPettyCash = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;


export const PettyCash = styled.div`
 border-radius: 5%;
 color: white;
 margin: 5rem auto 0 auto;
 display: flex;
 justify-content: space-around;
 padding-left:0;
 align-items: stretch;


 &:hover{
     cursor: pointer;
 }

 h2{
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
 }

 div{
    font-size: 2.5rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    margin-left:0px;
    align-items: center;
 }

/*  div del lado del monto */
 div:nth-of-type(1){
    align-items: stretch;
    color: black;
    border: 3px solid #99f2c8;
    flex-grow:1;
    font-weight: bold;
    padding: 3rem  1rem 0 1rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    background-color: white;
    
    span:nth-of-type(1){
        text-shadow: #e1e1e1 0.1em 0.1em 0.2em;
    }
    span:nth-of-type(2){
        color: #444a46;
        font-size: 1rem;
        padding: 0;
        text-align:center;
    }
 }

/*  div del lado del nombre y fondo */
 div:nth-of-type(2){
    align-self: flex-end;
    text-shadow: black 0.1em 0.1em 0.2em;
    background: #1f4037;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #99f2c8, #1f4037);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #99f2c8, #1f4037); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    flex-grow:1;
 }
`;



export const HeaderPettyCash = styled.div`
    padding: 2rem ;
    display: flex;
    justify-content: space-between;
    padding-left:0;
    color: black;
    align-content: stretch;
    width: 100%;
    background: #1f4037; 
    background: -webkit-linear-gradient(to right, #99f2c8, #1f4037);  
    background: linear-gradient(to right, #99f2c8, #1f4037);    
    flex-wrap: wrap;


    div:nth-of-type(1){
        text-shadow: white 0.1em 0.1em 0.2em;
        font-size: 2rem;
        padding-left: 2rem;
        h1{
            font-size: 3rem;
        }
        h4 span{
            font-weight:bold;
        }

        div{
            display: flex;
            align-content: flex-start;
            margin-left:0px;
            padding-left:0px;

            button{
                background-color: transparent;
                margin-right: 1rem;
                border-radius: 15px;
            }
            button:hover{
                background-color:white;
                color:black;
            }
        }
    }

    div:nth-of-type(2){
        color:white;
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align:center;

        span:nth-of-type(1){
            font-size: 1.3rem;
            padding: 0;
            color: #e1e1e1;
        }
        span:nth-of-type(2){
            font-size: 3rem;
            text-shadow: #e1e1e1 0.1em 0.1em 0.2em;
        }
    }
`;


export const BotonesViewExpenses = styled.button`
    border: 1px solid white;
    background-color: transparent;
    color: white;
    text-shadow: none;
    font-size: 1rem;

    &:hover{
        background-color: var(--primario);
        color:black;
    }

`;

export const ContenedorVouchers = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top:2rem;
    align-items: flex-start;
    justify-content: center;

`;

export const Voucher = styled.div`
    
    padding: 1rem;
    margin: 1rem;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    align-items: stretch;
    background-color: white;

    
    flex: 1 0 450px;

    -webkit-box-shadow: 3px -2px 18px -2px rgba(133,116,133,0.41);
    -moz-box-shadow: 3px -2px 18px -2px rgba(133,116,133,0.41);
    box-shadow: 3px -2px 18px -2px rgba(133,116,133,0.41);

    
    div:nth-of-type(1){
        margin: -1rem -1rem 1rem -1rem;
        display: flex;
        justify-content: space-between;
        padding: 1rem 1rem 0 1rem;
        
        border-bottom: 1px solid #f2f2f2;

        h2:nth-of-type(1){
            color: var(--primario);
        }

        h2{
            font-size: 2rem; 
        }
    }

    div:nth-of-type(2){
        margin-top: 0.5rem;
        color: #6d736f;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        
    }

    div:nth-of-type(3){
        margin-top:0.5rem;
        display:flex;
        align-items: flex-end;
        justify-content: space-between;
        

        h2{ 
            order: 1;
            /* background-color: #d7fcf2; */
            background-color: var(--primario);
            color:  #1f4037;
            font-size: 3rem;
            margin-right:-1rem;
            padding: 0.5rem 1rem;
            margin-bottom: -1rem;

            border-radius: 103px 10px 10px 103px;
            -moz-border-radius: 103px 10px 10px 103px;
            -webkit-border-radius: 103px 10px 10px 103px;

            -webkit-box-shadow: 3px -2px 18px -2px #d7fcf2;
            -moz-box-shadow: 3px -2px 18px -2px #d7fcf2;
             box-shadow: 3px -2px 18px -2px #d7fcf2;
        }

        div{
            border:none;
        }

        button{
            align-self: flex-end;
            border: none;
            background-color: transparent;
            color: #1f4037;
        }
    }

`;


export const Filtros= styled.div`
    display:flex;
    justify-content:flex-end;

`;