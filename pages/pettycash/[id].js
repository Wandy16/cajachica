import React, {useState, useContext, useEffect, Fragment} from 'react';
import Layout from '../../components/layout/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';
import Select from 'react-select';
import Swal from 'sweetalert2';
import FileUploader from 'react-firebase-file-uploader';
//para mostrar el radio button
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { Titulo1 } from '../../components/ui/Titulos';
import Error404 from '../../components/layout/404';
import Voucher from '../../components/ui/Voucher';

import {
  PettyCash as PTC , 
  HeaderPettyCash, 
  BotonesViewExpenses,
  ContenedorVouchers,
  Filtros  
} from '../../components/ui/Estilos';
import {   BotonCancelar } from '../../components/ui/Boton';
import {CampoDoble, Formulario, Error, Campo2,Label,InputSubmit } from '../../components/ui/Formulario';
import validarCrearVoucher from '../../validacion/validarCrearVoucher';
 

import { useRouter } from 'next/router';
import {FirebaseContext} from '../../firebase';
import useValidacion from '../../hooks/useValidacion';
import useAccounts from '../../hooks/useAccounts';
import useEmployees from '../../hooks/useEmployees';

//para evitar el renderizado multiple y que no de error 
import { resetServerContext } from 'react-beautiful-dnd';
import { SmsOutlined } from '@material-ui/icons';



const STATE_INICIAL = {
  sequence: '',
  description: '',
  paidTo: '',
  account: '',
  approvalBy: '',
  receivedBy: '',
  amount: '',
  imagen: ''
}

const selectProperties ={
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  isSearchable: true,
}

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



 const PettyCash = () => {

  //state del componente
  const [pettycash, guardarPettyCash] = useState({});
  const[expensesRegistered, guardarExpensesRegistered] = useState(0);
  const [vouchers, guardarVouchers] = useState([]);
  const [error, guardarError] = useState(false);
  const [editandoValores, guardarEditandoValores] = useState(false);
  const [consultarDB, guardarConsultarDB ] = useState(true);
  const [filtro, guardarFiltro] = useState('Not replenished');
  const [voucheriseditando, guardarVoucheriseditando] = useState(false);
  const [subiNuevoVoucher, guardarSubiNuevoVoucher] = useState(false);

   //state de las imagenes
   const [nombreimagen, guardarNombreImagen] = useState('');
   const [subiendo, guardarSubiendo] = useState(false);
   const [progreso, guardarProgreso]= useState(0);
   const [urlimagen, guardarUrlImagen]= useState('');
 

  //hooks para el state en edicion y creacion y para cargar los datos
  const {  valores,valoreseditar, errores,submitForm, handleSubmit,handleChange, handleBlur, guardarValores,guardarEditarValores } = useValidacion(STATE_INICIAL, validarCrearVoucher, crearVoucher );
  const {accounts} = useAccounts();
  const {employees} = useEmployees();
  //almacenando localmente el state del combo
  const [accountseleccionada, guardarAccountSeleccionada] = useState('');
  const [paidtoseleccionado, guardarPaidToSeleccionado] = useState('');
  const [approvalbyseleccionado, guardarApprovalBySeleccionado]= useState('');
  const [receivedbyseleccionado, guardarReceivedBySeleccionado]= useState('');
  const [dateseleccionado, guardarDateSeleccionado] = useState('');

  //routing para obtener el id actual
  const router = useRouter();
  const {query: {id} } = router;
  //context de firebase
  const {firebase, usuario } = useContext(FirebaseContext);

  //para el modal
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);



  const handleOpen = () => {
    guardarVoucheriseditando(false);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
 }


  const handleClose = () => {
    if(isThereAnyDataTyped())
    {
      hideModal();
      Swal.fire({
        title: 'Are you sure you want to cancel?',
        text: "You will lose the typed data!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'Stay Here'
        
      }).then((result) => {
        if (result.value) {
          setOpen(false);
          //se limpia la pantalla y todas las variables
          guardarValores(STATE_INICIAL);
          guardarEditarValores(null);
        }else{
          setOpen(true);
        }
      })
    }else{
      setOpen(false);
      //se limpia la pantalla y todas las variables
      guardarValores(STATE_INICIAL);
      guardarEditarValores(null);
    }
  };


  resetServerContext();
  //renderToString(...);

  useEffect(() => {
    if(id && consultarDB ){
      //cargando los datos de la caja chica
      const obtenerPettyCash = async () => {
          const pettyQuery = await firebase.db.collection('pettycashes').doc(id);
          const petty = await pettyQuery.get();
          if(petty.exists){
             guardarPettyCash(petty.data());
              guardarConsultarDB(false);
          }else{
              guardarError(true);
              guardarConsultarDB(false);
          }
      }
      
      obtenerPettyCash();
      
      console.log('entre al useefect')
      //cargando los vouchers
      const obtenerVouchers = () => {
        console.log('ntre a obtenervoucher')
        var query=  firebase.db.collection("vouchers");
        if(filtro === 'Not replenished')
          {
            query = query.where("replenished","==", false);
          }
        else if (filtro==="Replenished")
         {
          query = query.where("replenished","==", true);
         } 

       
        query.where("user.id", "==", usuario.uid)
        .where("pettycash","==", id)
        .orderBy('date', 'desc')
          .get()
          .then(function(querySnapshot) {
           
            const voucherss = querySnapshot.docs.map(doc => {
              
              return{
                id: doc.id,
                ...doc.data()
              }
              
            });
           
            guardarVouchers(voucherss);
            guardarSubiNuevoVoucher(false);
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
      }
      console.log(subiNuevoVoucher);

      if(usuario  || usuario && subiNuevoVoucher===true)
        obtenerVouchers();

  }
  },[ id, usuario, vouchers, submitForm, filtro, subiNuevoVoucher, valores  ]); 

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

  if(Object.keys(pettycash).length===0 && !error) return 'Cargando...';

  const { name, fondo, actualAmount, initialValue, usersAllowed, currency, expensesAmount } = pettycash;
  const { sequence, description, paidTo, account,  amount, receivedBy, date, approvalBy, imagen  } = valores;

  function isThereAnyDataTyped(){
    return (sequence!=='' || description!==''  || amount!==''  )
  }

  //funciones para manejar el cambio de los select
  const handleChangeSelectAccounts = (e) => {
    if(e && accounts)
     {
       guardarValores({...valores, account: accounts[e.value]});
        guardarAccountSeleccionada( e.value);
     }
     else if(!e)
      {
        guardarValores({...valores, account: ''});
        guardarAccountSeleccionada( '');
      }
  }

  const handleChangeSelectPaidTo = (e) => {
    if(e && employees)
     {
      guardarValores({...valores, paidTo: employees[e.value]});
      guardarPaidToSeleccionado(e.value);
     }  
     else if(!e)
      {
        guardarValores({...valores, paidTo: ''});
        guardarPaidToSeleccionado('');
      }
  }
  const handleChangeSelectApprovalBy = (e) => {
    if( e &&   employees)
     { 
       guardarValores({...valores, approvalBy: employees [e.value]});
       guardarApprovalBySeleccionado( e.value);
     }
     else if(!e)
     {
        guardarValores({...valores, approvalBy: ''});
        guardarApprovalBySeleccionado('');
     }
  }
  const handleChangeSelectReceivedBy = (e) => {
    if(e &&  employees)
      {
        guardarValores({...valores, receivedBy: employees[e.value]});
       guardarReceivedBySeleccionado( e.value);
      } 
      else if(!e)
      {
        guardarValores({...valores, receivedBy: ''});
        guardarReceivedBySeleccionado( '');
      }
  }

  const handleChangeDate = (e) =>{
     guardarDateSeleccionado(e.target.value)
  }


  //para la subida de imagen
  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const  handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
   guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombreImagen(nombre);

   
    firebase
      .storage
      .ref("vouchers")
      .child(nombre)
      .getDownloadURL()
      .then(url => 
        {
          console.log(url);
          guardarUrlImagen(url);
      } );
  };



  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Titulo1>Create New Expense/ Voucher</Titulo1>

      <Formulario
            onSubmit={handleSubmit}
            noValidate
         >
            <Campo2>
              <Label htmlFor="description">Description</Label>
                    <input  
                        type="text"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
              {errores.description && <Error>{errores.description}</Error>}
            </Campo2>
            

            <CampoDoble>
              <Campo2>
                <Label htmlFor="amount">Amount</Label>
                      <input  
                          type="number"
                          id="amount"
                          placeholder="Amount"
                          name="amount"
                          value={amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  {errores.amount && <Error>{errores.amount}</Error>}
              </Campo2>
              <Campo2>
                <Label htmlFor="sequence">Sequence</Label>
                      <input  
                          type="number"
                          id="sequence"
                          placeholder="Sequence"
                          name="sequence"
                          value={sequence}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  {errores.sequence && <Error>{errores.sequence}</Error>}
              </Campo2>
              <Campo2>
                <Label htmlFor="date">Date</Label>
                      <input  
                          type="date"
                          id="date"
                          name="date"
                          value={dateseleccionado}
                          onChange={handleChangeDate}
                          onBlur={handleBlur}
                      />
                      {errores.date && <Error>{errores.date}</Error>}
              </Campo2>
            </CampoDoble>

           
              <Label htmlFor="account">Account</Label>
              <Select
                styles={{width: '800px', backgroundColor: 'yellow'}}
                className="basic-single"
                classNamePrefix="select"
                isDisabled={selectProperties.isDisabled}
                isLoading={selectProperties.isLoading}
                isClearable={selectProperties.isClearable}
                isSearchable={selectProperties.isSearchable}
                name="account"
                id="account"
                placeholder="Select an account..."
                options={makeOptionsList(accounts)}
                value={valueSelected(accounts, accountseleccionada, account)}
                onChange={handleChangeSelectAccounts}
                
              />
            {errores.account && <Error>{errores.account}</Error>}

            
              <Label htmlFor="paidTo">Paid to</Label>
              <Select
                styles={{width: '800px', backgroundColor: 'yellow'}}
                className="basic-single"
                classNamePrefix="select"
                isDisabled={selectProperties.isDisabled}
                isLoading={selectProperties.isLoading}
                isClearable={selectProperties.isClearable}
                isSearchable={selectProperties.isSearchable}
                name="paidTo"
                id="paidTo"
                placeholder="Select who was this voucher paid to..."
                options={makeOptionsList(employees)}
                value={valueSelected(employees, paidtoseleccionado, paidTo)}
                onChange={handleChangeSelectPaidTo}
              />
            {errores.paidTo && <Error>{errores.paidTo}</Error>}
    
              <Label htmlFor="approvalBy">Approval By</Label>
              <Select
                styles={{width: '800px', backgroundColor: 'yellow'}}
                className="basic-single"
                classNamePrefix="select"
                isDisabled={selectProperties.isDisabled}
                isLoading={selectProperties.isLoading}
                isClearable={selectProperties.isClearable}
                isSearchable={selectProperties.isSearchable}
                name="paidTo"
                id="paidTo"
                placeholder="Select who was this approved by..."
                options={makeOptionsList(employees)}
                value={valueSelected(employees, approvalbyseleccionado, approvalBy)}
                onChange={handleChangeSelectApprovalBy}
              
              />
            {errores.approvalBy && <Error>{errores.approvalBy}</Error>}

            
              <Label htmlFor="receivedBy">Received by</Label>
              <Select
                styles={{width: '800px', backgroundColor: 'yellow'}}
                className="basic-single"
                classNamePrefix="select"
                isClearable
                isSearchable
                name="receivedBy"
                id="receivedBy"
                placeholder="Select who was this received by..."
                options={makeOptionsList(employees)}
                value={valueSelected(employees, receivedbyseleccionado, receivedBy)}
                onChange={handleChangeSelectReceivedBy}
                
              />
            {errores.receivedBy && <Error>{errores.receivedBy}</Error>}

            <Campo2>
                    <Label htmlFor="imagen">Imagen</Label>
                    <FileUploader  
                        accept="image/*"
                        id="imagen"
                        name="imagen"
                        randomizeFilename
                        storageRef={firebase.storage.ref("vouchers")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
              </Campo2>

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


  async function crearVoucher(){
 
    //si el usuario no esta autenticado, llevar al login
    if(!usuario){
        return router.push('/login');
    }
    if(editandoValores===true) //si estamos editando
      {
         //actualizar la bd
         firebase.db.collection('vouchers').doc(valores.id).update({
              sequence,
              description,
              amount,
              date: Math.floor(new Date(dateseleccionado) / 1000),
              paidTo,
              approvalBy,
              receivedBy,
              account,
              replenished: false,
              pettycash: id,
              imagen
          //usersAllowed:[]
        });
        guardarEditandoValores(false);
        
      }
      else{ //si estamos creando uno
          //crear el objeto de nuevo account
            const voucher ={
              sequence,
              description,
              amount,
              registered_date: Date.now(),
              date: Math.floor(new Date(dateseleccionado) / 1000),
              paidTo,
              approvalBy,
              receivedBy,
              account,
              replenished: false,
              pettycash: id,
              imagen,
              user: {
                  id: usuario.uid,
                  nombre: usuario.displayName
              }
            }
            //insertarlo en la base de datos
            firebase.db.collection('vouchers').add(Object.assign({}, voucher));
         
      }
      //actualizamos el valor de expensesAmount de la caja chica
      firebase.db.collection('pettycashes').doc(id).update({
        expensesAmount: (parseFloat(expensesAmount)+parseFloat(amount)-parseFloat(expensesRegistered)),
        actualAmount: (parseFloat(actualAmount)-parseFloat(amount)+parseFloat(expensesRegistered))

      });
     //limpiamos la pantalla para que el modal de confirmacion no salga
     guardarPaidToSeleccionado('');
     guardarApprovalBySeleccionado('');
     guardarReceivedBySeleccionado('');
     guardarAccountSeleccionada('');
     guardarDateSeleccionado('');
     guardarValores(STATE_INICIAL); 
     guardarSubiNuevoVoucher(true);
     guardarExpensesRegistered(0);

      //se llama al metodo para cerrar el modal
     handleClose();
  }


  
  //para formatear el numero a decimal con punto y coma
  const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  };

  const handleChangeFilter = (event) => {
    guardarFiltro(event.target.value);
  };

  //para editar un voucher
  const editVoucher = (voucher) => {

    guardarEditandoValores(true);
    handleChangeSelectAccounts(voucher.account);
    handleChangeSelectApprovalBy(voucher.approvalBy);
    handleChangeSelectPaidTo(voucher.paidTo);
    handleChangeSelectReceivedBy(voucher.receivedBy);
    guardarExpensesRegistered(parseFloat(voucher.amount));

      handleOpen();
      guardarEditarValores(voucher);

  }


  return (
    <div>
      <Layout>
      { !usuario ? <Error404 /> : (<>
        <div >
          
          <HeaderPettyCash key={id} >
            <div>
                <h1>{name}</h1>
                <h4> Authorized: <span>({currency.code}) {Number(fondo).toLocaleString('en', options)}</span></h4>
                <div>
                    <button type="button" onClick={handleOpen}
                    >
                      <AddBoxIcon style={{marginRight:'1rem'}} fontSize='large' />
                      Add Expense/ Voucher
                    </button>  
                    <button>
                        <PaymentRoundedIcon style={{marginRight:'1rem'}} fontSize='large' />
                      Replenish Money
                    </button>
                </div>
            
            </div>
            <div>
                <span>Available</span>
                <span>({currency.code}) {Number(actualAmount).toLocaleString('en', options)} </span>
                <span>Expenses: {Number(expensesAmount).toLocaleString('en', options) }</span>
                
            </div>
          </HeaderPettyCash>
          
          <Filtros>
            <FormControl component="fieldset" >
              <RadioGroup row aria-label="filter" name="filtro" value={filtro} onChange={handleChangeFilter}>
                <FormControlLabel value="Not replenished" control={<Radio />} label="Not replenished" />
                <FormControlLabel value="Replenished" control={<Radio />} label="Replenished" />
                <FormControlLabel value="All" control={<Radio />} label="All" />
              </RadioGroup>
            </FormControl>
          </Filtros>

          {/** listado de vouchers */}
          
          <ContenedorVouchers>
           {
             vouchers.map((voucher) => (
                (<Voucher key={voucher.id} voucher={voucher} editVoucher={editVoucher} /> )
             ))
           }

          </ContenedorVouchers>
         
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


export default PettyCash;