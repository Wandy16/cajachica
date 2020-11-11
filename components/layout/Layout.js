import React from 'react';
import { Global, css }from '@emotion/core';
import Head from 'next/head';
import Header from './Header';


const Layout = (props) => {
    return ( 
        <>
            <Global 
                styles={css`
                    :root{
                        --gris: #3d3d3d;
                        --gris2: #6f6f6f;
                        --gris3: #e1e1e1;
                        --primario: #06d6a0;
                        --secundario: #106951;
                    }

                    html{
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before *:after{
                        box-sizing: inherit;
                    }
                    body{
                        font-size: 1.6rem; /** = 16px */
                        line-height: 1.5;
                        font-family: 'PT-Sans', sans-serif;
                        background-color: #e1e1e1;
                    }
                    h1,h2, h3{
                        margin: 0,0 2rem 0;
                        line-height: 1.5;
                    }
                    h1, h2{
                        font-family: 'Roboto Slab', serif;
                        font-weight: 700;
                    }
                    h3{
                        font-family: 'PT-Sans', sans-serif;
                    }
                    ul{
                        list-style: none;
                        margin: 0;
                        padding:0;
                    }
                    a{
                        text-decoration:none;
                    }
                    img{
                        max-width: 100%;
                    }
                    .navbar-dark .navbar-nav .nav-link {
                        color: #e1e1e1;
                    }
                    .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
                        flex: 1;
                        padding: 1rem;
                    }
                    /** poniendo los alerts por encima de los modales */
                    .swall-overlay {
                        z-index: 1000099;
                    }
                    .swal-modal {
                        z-index: 99999999;
                    }
                    .swal2-container {
                        z-index: 1000099;
                    }
                   
                `}
            />

            {/** todo lo que se ponga en la etiqueta head es lo que va antes del body de la pag */}
            <Head>
               
                <title>Control de Caja Chica </title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto+Slab:400,700&display=swap" rel="stylesheet"/>
                <link href="/static/css/app.css" rel="stylesheet" />
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                    />

                <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>

                <script
                src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                crossorigin></script>

                <script
                src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossorigin></script>

                <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>

            <Header />

            <main>
                {props.children}
            </main>
        </>
     );
}
 
export default Layout;