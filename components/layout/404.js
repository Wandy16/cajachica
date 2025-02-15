import React from 'react';
import {css } from '@emotion/core';

const Error404 = ({mensaje = 'Elemento no disponible - Acceso restringido'}) => {
    return (  
        <h1
            css={css`
            margin-top: 5rem;
            text-align: center;
            `}
        >{mensaje}</h1>
    );
}
 
export default Error404;