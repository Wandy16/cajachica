import React, {useState, useContext, useEffect} from 'react';
import Layout from '../components/layout/Layout';
import MaterialTable, { MTableToolbar, Chip } from 'material-table';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { Titulo1 } from '../components/ui/Titulos';
import { Formulario, Campo, InputSubmit, Error} from '../components/ui/Formulario';
import {  BotonNuevoRegistro, BotonCancelar } from '../components/ui/Boton';
import Error404 from '../components/layout/404';

import { useRouter } from 'next/router';
import {FirebaseContext} from '../firebase';

//validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearAccount from '../validacion/validarCrearAccount';


//cargar los datos
import useAccounts from '../hooks/useAccounts';

//para evitar el renderizado multiple y que no de error 
import { resetServerContext } from 'react-beautiful-dnd';

const STATE_INICIAL = {
  code: '',
  name: '',
  description: '',
  transaction: ''
}

const COLUMNS = [
  {title: 'Code', field: 'code', align:'left', sorting:true,
  cellStyle:{
    width: '80px',
    maxWidth:'150px'
  }, 
  headerStyle: {
    width:80,
    maxWidth: 150,
    fontSize:'1.5rem',
    backgroundColor: '#e1e1e1',
  } },
  {title: 'Name', field: 'name', align:'left', sorting:true,
  cellStyle:{
    width: 200,
    maxWidth:250
  }, 
  headerStyle: {
    width:200,
    maxWidth: 250,
    fontSize:'1.5rem',
    backgroundColor: '#e1e1e1',
  } },
  {title: 'Description', field: 'description', align:'left', sorting:true,
  cellStyle:{
    width: 200,
    maxWidth:250
  }, 
  headerStyle: {
    width:200,
    maxWidth: 250,
    fontSize:'1.5rem',
    backgroundColor: '#e1e1e1',
  } },
  {title: 'Transaction Description', field: 'transaction', align:'left', sorting:true,
  cellStyle:{
    width: 200,
    maxWidth:250
  }, 
  headerStyle: {
    width:200,
    maxWidth: 250,
    fontSize:'1.5rem',
    backgroundColor: '#e1e1e1',
  } },
];

//para el estilo del modal formulario
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;// + rand();
  const left = 50;// + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 850,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid var(--primario)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



export default function Accounts() {

  
  const [datostabla, guardarDatosTabla] = useState({
    columns: [],
    data: []
    
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const [error, guardarError] = useState(false);
  const [editandoValores, guardarEditandoValores] = useState(false);
  const {  valores,valoreseditar, errores,submitForm,actualizarData, handleSubmit,handleChange, handleBlur, handleDelete,guardarValores,guardarEditarValores, guardarActualizarData } = useValidacion(STATE_INICIAL, validarCrearAccount, crearAccount );
  const {accounts} = useAccounts(submitForm, actualizarData, guardarActualizarData);
  //para el modal
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //se limpia la pantalla y todas las variables
    guardarValores(STATE_INICIAL);
    guardarEditarValores(null);
  };

  const HideModal = () => {
     setOpen(false);
  }

  

  resetServerContext();
  //renderToString(...);

  useEffect(() => {

    const editando = () => {
      if(valoreseditar!==null && editandoValores===false){
        guardarValores({...valores,valoreseditar});
        guardarEditandoValores(true);
        
      }else{
      // guardarValores(STATE_INICIAL);
      }
    }
    editando();
    guardarDatosTabla({data: accounts, columns: COLUMNS});

  },[  valores, accounts ]); 



  if(!valores) return (
    <div>
        <Layout>
          <Titulo1>Accounts</Titulo1>
        </Layout>
      </div>
  );

  const {code, name, description, transaction } = valores;

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Titulo1>Create New Account</Titulo1>
      <Formulario
            onSubmit={handleSubmit}
            noValidate
         >
            <Campo>
              <label htmlFor="code">Code</label>
                    <input  
                        type="text"
                        id="code"
                        placeholder="Code"
                        name="code"
                        value={code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
            </Campo>
            {errores.code && <Error>{errores.code}</Error>}
            <Campo>
              <label htmlFor="name">Name</label>
                    <input  
                        type="text"
                        id="name"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
            </Campo>
            {errores.name && <Error>{errores.name}</Error>}
            <Campo>
              <label htmlFor="description">Description</label>
                    <textarea  
                        type="text"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
            </Campo>
            {errores.description && <Error>{errores.description}</Error>}

            <Campo>
              <label htmlFor="transaction">Transaction description</label>
                    <textarea  
                        type="text"
                        id="transaction"
                        placeholder="Transaction description"
                        name="transaction"
                        value={transaction}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
            </Campo>
            {errores.transaction && <Error>{errores.transaction}</Error>}


            <InputSubmit
                  type="submit"
                  value="Save"
              />
            <BotonCancelar onClick={handleClose}>
              Cancel
            </BotonCancelar>
         </Formulario>
    </div>
  );

   //hook de routing par redireccionar
   const router = useRouter();

   //context con las operaciones crud de firebase
   const { usuario, firebase }  = useContext(FirebaseContext);

   //si el usuario no esta autenticado, llevar al login
   /* if(!usuario){
      return router.push('/login');
  } */

   async function crearAccount(){
 
    //si el usuario no esta autenticado, llevar al login
    if(!usuario){
        return router.push('/login');
    }

    if(editandoValores===true) //si estamos editando un departamento
      {
         //actualizar la bd
         firebase.db.collection('accounts').doc(valores.id).update({
          code, 
          name,
          description,
          transaction
        });
        guardarEditandoValores(false);
       
      }
      else{ //si estamos creando uno
          //crear el objeto de nuevo account
            const account ={
              code,
              name,
              description,
              transaction,
              registered_date: Date.now(),
              user: {
                  id: usuario.uid,
                  nombre: usuario.displayName
              }
            }

            //insertarlo en la base de datos
            firebase.db.collection('accounts').add(account);
      }
     //se limpia la pantalla y todas las variables
     handleClose();
  }
  
  //funcion para eliminar
  const deleteRegister = async( e, data_borrar) => {
    console.log('borrar: ', data_borrar.id)
   try{
       await firebase.db.collection('accounts').doc(data_borrar.id).delete();
       handleDelete();
    }catch(error){
      console.log(error);
    }
  }


  return (
    <div>
      <Layout>
      { !usuario ? <Error404 /> : (<>
        <div >
          <MaterialTable
            title="Accounts"
            columns={datostabla.columns}
            data={datostabla.data}
            actions={[
              {
                icon:'edit',
                iconProps:{color: 'primary', fontSize:'large'},
                tooltip:"Edit",
                onClick: (event, rowData)=> { handleOpen(); guardarEditarValores(rowData); },
                
              },
              {
                icon:'delete',
                iconProps:{color: 'primary', fontSize:'large'},
                tooltip:'Delete',
                onClick: ( event,  rowData) =>{ deleteRegister(event, rowData) },
              }
            ]}
            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
              rowStyle: rowData => ({
                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
              }),
              exportButton: true,
              search:true,
              searchFieldStyle:{fontSize: '2rem'},
              headerStyle:{ fontSize:'1.5rem', backgroundColor: '#e1e1e1',},
              exportAllData :true,
              
              
            }}
            components={{
              
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{padding: '0px 10px'}}>
                    <BotonNuevoRegistro type="button" onClick={handleOpen} >
                      <AddBoxIcon style={{marginRight:'1rem'}} fontSize='large' />
                      Add New Account
                    </BotonNuevoRegistro>
                    {/* <Chip label="New Account" color="secondary" style={{marginRight: 5}}/> */}
                  </div>
                </div>
              ),
            }}
            />
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        </>)}
      </Layout>
    </div>
  )
}
