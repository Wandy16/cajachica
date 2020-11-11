import React, {useState, useContext, useEffect} from 'react';
import Layout from '../components/layout/Layout';
import MaterialTable, { MTableToolbar, Chip } from 'material-table';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Select, { components } from 'react-select';

import { Titulo1 } from '../components/ui/Titulos';
import { Formulario, Campo, InputSubmit, Error, Campo2, Label, CampoDoble} from '../components/ui/Formulario';
import {  BotonNuevoRegistro, BotonCancelar } from '../components/ui/Boton';
import Error404 from '../components/layout/404';


import { useRouter } from 'next/router';
import {FirebaseContext} from '../firebase';

//validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCajaChica from '../validacion/validarCrearCajaChica';


//cargar los datos
import usePettyCashes from '../hooks/usePettyCashes';
import useCurrencies from '../hooks/useCurrencies';
//para evitar el renderizado multiple y que no de error 
import { resetServerContext } from 'react-beautiful-dnd';
import useLocations from '../hooks/useLocations';


const STATE_INICIAL = {
  name: '',
  fondo: '',
  actualAmount:0,
  expensesAmount:0,
  initialValue:'',
  location: {},
  usersAllowed:[],
  currency:{}
}

const COLUMNS = [
 
  {
  title: 'Name', field: 'name', align:'left', sorting:true,
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
  {
    title: 'Authorized Fund Balance', field: 'fondo', align:'left', sorting:true, type:'numeric',
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
    {
      title: 'Currency', field: 'currency.code', align:'left', sorting:true,
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
      {
        title: 'Location', field: 'location.name', align:'left', sorting:true,
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

//para los selects
const selectProperties ={
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  isSearchable: true,
}

const controlStyles = {
  borderRadius: '1px solid black',
  padding: '5px',
  color: 'white',
  flex: '1',
  padding: '1rem',
  width: '100%'
};

const ControlComponent = props => (
  <div style={controlStyles}>
    {<p>Petty Cash</p>}
    <components.Control {...props} />
  </div>
);



export default function PettyCash() {

  
  const [datostabla, guardarDatosTabla] = useState({
    columns: [],
    data: []
    
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const [error, guardarError] = useState(false);
  const [editandoValores, guardarEditandoValores] = useState(false);
  const {  valores,valoreseditar, errores,submitForm, handleSubmit,handleChange, handleBlur, guardarValores,guardarEditarValores } = useValidacion(STATE_INICIAL, validarCrearCajaChica, crearPettyCash );
  const {currencies} = useCurrencies();
  const {locations} = useLocations();
  const {pettycashes, guardarPettyCashes} = usePettyCashes(submitForm);

  //almacenando localmente el state del combo
  const [locationseleccionado, guardarLocationSeleccionado] = useState('');
  const [currencyseleccionado, guardarCurrencySeleccionado] = useState('');

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
    guardarDatosTabla({data: pettycashes, columns: COLUMNS});

    if(usuario){
      
    }

  },[  valores, pettycashes ]); 

  
  function makeOptionsList (listaValores){
    let lista = [];
    listaValores.map( (valor, index) => {
        lista.push({
          label: valor.name,
          value: index
        })
    });
    return lista;
  }

  function valueSelected( listaValores, index, val){
   
    if(Object.keys(listaValores).length>0 && index)
    {
      return {
        label: listaValores[index].name,
        value: index
      } 
    }else if(Object.keys(listaValores).length>0 && !index && val){
      let indice = listaValores.findIndex((element) => element.id===val.id);
      if(indice>=0)
      {
        return {
          label: listaValores[indice].name,
          value: index
        } 
      }
    }
  }

  if(!valores) return (
    <div>
        <Layout>
          <Titulo1>Petty Cash</Titulo1>
        </Layout>
      </div>
  );

  const { name, fondo, actualAmount, initialValue, usersAllowed, location, currency,expensesAmount } = valores;
  
    
  const handleChangeSelectCurrencies = (e) => {
    console.log(e, currencies);
    if(e && currencies)
     {
       guardarValores({...valores, currency: currencies[e.value]});
        guardarCurrencySeleccionado( e.value);
     }
     else if(!e)
      {
        guardarValores({...valores, currency: ''});
        guardarCurrencySeleccionado( '');
      }
  }

  const handleChangeSelectLocations = (e) => {
    console.log('seleccion: ', e);
    if(e && locations)
    {
      guardarValores({...valores, location: locations[e.value]});
       guardarLocationSeleccionado( e.value);
    }
    else if(!e)
     {
       guardarValores({...valores, location: ''});
       guardarLocationSeleccionado( '');
     }
  }



  function isThereAnyDataTyped(){
    return (name!=='' || fondo!==''  || actualAmount!==''  || initialValue!=='' 
      || location!==''  || currency!==''  )
  }


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Titulo1>Create New Petty Cash</Titulo1>
      <Formulario
            onSubmit={handleSubmit}
            noValidate
         >
            
            <Campo2>
              <Label htmlFor="name">Name</Label>
                    <input  
                        type="text"
                        id="name"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
              {errores.name && <Error>{errores.name}</Error>}
            </Campo2>
           
            <CampoDoble>
              <Campo2>
                <Label htmlFor="fondo">Authorized Fund Balance</Label>
                      <input  
                          type="numeric"
                          id="fondo"
                          placeholder="Authorized Fund Balance"
                          name="fondo"
                          value={fondo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  {errores.fondo && <Error>{errores.fondo}</Error>}
              </Campo2>
              {/* cuando esten editando, este valor no puede ser modificado */}
              <Campo2>
                <Label htmlFor="initialValue">Initial Value (Cash on hand right now) </Label>
                  <input  
                      type="numeric"
                      id="initialValue"
                      placeholder="Initial Value (Cash on hand)"
                      name="initialValue"
                      value={initialValue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                    {errores.initialValue && <Error>{errores.initialValue}</Error>}
              </Campo2>
            </CampoDoble>
            
          

              <Label htmlFor="currency">Currency</Label>
              <Select
                styles={{width: '800px', backgroundColor: 'yellow'}}
                className="basic-single"
                classNamePrefix="select"
                isDisabled={selectProperties.isDisabled}
                isLoading={selectProperties.isLoading}
                isClearable={selectProperties.isClearable}
                isSearchable={selectProperties.isSearchable}
                name="currency"
                id="currency"
                placeholder="Select a currency..."
                options={makeOptionsList(currencies)}
                value={ valueSelected(currencies, currencyseleccionado, currency) }
                onChange={handleChangeSelectCurrencies}
              />
            {errores.currency && <Error>{errores.currency}</Error>}

           
              <Label htmlFor="location">Location</Label>
              <Select
                styles={{width: '800px', backgroundColor: 'yellow'}}
                className="basic-single"
                classNamePrefix="select"
                isDisabled={selectProperties.isDisabled}
                isLoading={selectProperties.isLoading}
                isClearable={selectProperties.isClearable}
                isSearchable={selectProperties.isSearchable}
                name="location"
                id="location"
                placeholder="Select a location..."
                options={makeOptionsList(locations)}
                value={valueSelected(locations, locationseleccionado, location)}
                onChange={handleChangeSelectLocations}
              />
            {errores.location && <Error>{errores.location}</Error>}

            
            <InputSubmit
                  type="submit"
                  value="Save"
                  style={{marginTop: '2rem'}}
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
    /*if(!usuario){
        return router.push('/login');
    }*/

   

   async function crearPettyCash(){
 
    //si el usuario no esta autenticado, llevar al login
    if(!usuario){
        return router.push('/login');
    }
    if(editandoValores===true) //si estamos editando
      {
         //actualizar la bd
         firebase.db.collection('pettycashes').doc(valores.id).update({
          name,
          fondo,
          location,
          currency,
          expensesAmount
          //usersAllowed:[]
        });
        guardarEditandoValores(false);
        guardarPettyCashes({...pettycashes, valores});
      }
      else{ //si estamos creando uno
          //crear el objeto de nuevo account
            const pettycash ={
              name,
              fondo,
              registered_date: Date.now(),
              location,
              currency,
              actualAmount: initialValue,
              expensesAmount,
              initialValue,
              usersAllowed:[],
              user: {
                  id: usuario.uid,
                  nombre: usuario.displayName
              }
            }
            //insertarlo en la base de datos
            firebase.db.collection('pettycashes').add(Object.assign({}, pettycash));
            guardarPettyCashes({...pettycashes, valores});
            //add(pettycash);
      }
     //se limpia la pantalla y todas las variables
     handleClose();
  }


  return (
    <div>
      <Layout>
      { !usuario ? <Error404 /> : (<>
        <div >
          <MaterialTable
            title="Petty Cash"
            columns={datostabla.columns}
            data={datostabla.data}
            actions={[
              {
                icon:'edit',
                iconProps:{color: 'primary', fontSize:'large'},
                tooltip:"Edit",
                onClick: (event, rowData)=> { handleOpen(); guardarEditarValores(rowData); },
                
              },
             /*  {
                icon:'delete',
                iconProps:{color: 'primary', fontSize:'large'},
                tooltip:'Delete',
                onClick: (event, rowData) => alert("You deleted " + rowData.code)
              } */
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
              exportAllData :true
              
            }}
            components={{
              
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{padding: '0px 10px'}}>
                    <BotonNuevoRegistro type="button" onClick={handleOpen} >
                      <AddBoxIcon style={{marginRight:'1rem'}} fontSize='large' />
                      Add New Petty Cash
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
