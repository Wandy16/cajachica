import React from 'react';
import {Voucher as EstilosVoucher} from '../ui/Estilos.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const Voucher = ({voucher, editVoucher}) => {

    
    const {description, paidTo, account, amount, sequence, receivedBy, approvalBy, date } = voucher;

    const datee = new Date(date*1000);
    const formattedDate =  (datee.getUTCMonth() + 1) + '/' + datee.getUTCDate() + '/' + datee.getUTCFullYear()

    //para formatear el numero a decimal con punto y coma
    const options = { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    };
    
    //para poner la primera letra del texto en mayuscula
    function jsUcfirst(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
  //funcion para eliminar vouchers 
  const deleteVoucher = async(id_voucher) => {
    try {
        await firebase.db.collection("vouchers").doc(id_voucher).delete();
    } catch (error) {
        console.log('Hubo un error');
    }
  }


  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 13,
    },
  }))(Tooltip);


    return (
        <EstilosVoucher>
            <div>
               <h2>{sequence}</h2>
               <h2>{jsUcfirst(description)}</h2>
            </div>
            <div>
                <span> {formattedDate} - {paidTo.name}</span>
            </div>
            <div>
                <h2>{Number(amount).toLocaleString('en', options) }</h2>    
                <div>
                    <LightTooltip  title="Edit" style={{fontSize: '25px'}}>    
                        <button id="editar" onClick={() => editVoucher(voucher)}>
                            <EditIcon style={{marginRight:'1rem'}} fontSize='large' />
                        </button>
                    </LightTooltip >
                    <LightTooltip  title="Delete" style={{fontSize: '25px'}}> 
                        <button id="delete">
                            <DeleteIcon style={{marginRight:'1rem'}} fontSize='large' />
                        </button>
                    </LightTooltip >
                </div>
            </div>
            
        </EstilosVoucher>
      );
}
 
export default Voucher;