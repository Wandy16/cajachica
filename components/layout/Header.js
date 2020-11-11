import React, { useContext } from 'react';
import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar'

import {FirebaseContext} from '../../firebase';
import { Nav, NavDropdown } from 'react-bootstrap';


import {Menu}  from '../ui/Formulario';
import {BotonLogout} from '../ui/Boton';

import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';
import PersonPinTwoToneIcon from '@material-ui/icons/PersonPinTwoTone';
import AccountTreeTwoToneIcon from '@material-ui/icons/AccountTreeTwoTone';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import SentimentVerySatisfiedTwoToneIcon from '@material-ui/icons/SentimentVerySatisfiedTwoTone';
import AccountBalanceSharpIcon from '@material-ui/icons/AccountBalanceSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import EuroSymbolRoundedIcon from '@material-ui/icons/EuroSymbolRounded';


const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext);
   


    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home" style={{ marginRight:'1rem'}}><MonetizationOnRoundedIcon  style={{color: 'var(--primario)', fontSize: 40}}  />PETTY CASH</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mr-auto">
                      
                    { usuario && (<Link href="/pettycash"><Menu> <AccountBalanceSharpIcon style={{color: 'var(--primario)'}} /><span> Petty Cash</span></Menu></Link> )}
                    { usuario && (<Link href="/accounts"><Menu><AccountTreeTwoToneIcon  style={{color: 'var(--primario)'}} /> <span>Accounts</span></Menu></Link> )}
                 
                    {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>  */}
                        
                        { usuario && (   <NavDropdown title={
                                <Menu style={{marginLeft:'1rem', marginRight:'1rem'}}><SettingsSharpIcon  style={{color: 'var(--primario)'}} /><span>Other Settings</span></Menu>
                                }  id="collasible-nav-dropdown" style={{color: 'var(--gris3)'}}>
                                   
                                <NavDropdown.Item href="#">
                                    <Link href="/employees"><span><PersonPinTwoToneIcon  style={{color: 'var(--primario)'}} /><span> Employees</span></span></Link>
                                   
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    <Link href="/locations"><span><LocationOnRoundedIcon  style={{color: 'var(--primario)'}} /> <span>Locations</span></span></Link>
                               </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    <Link href="/departments"><span> <CategoryTwoToneIcon style={{color: 'var(--primario)'}} /><span> Departments</span></span></Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    <Link href="/currencies"><span> <EuroSymbolRoundedIcon style={{color: 'var(--primario)'}} /><span> Currencies</span></span></Link>
                                </NavDropdown.Item>
                              
                            </NavDropdown>
                        )}
                       


                    </Nav>
                    
                    <Nav>
                        {usuario ? (
                            <>
                            <Link href="#deets">
                                <Menu>
                                    <SentimentVerySatisfiedTwoToneIcon  style={{color: 'var(--primario)', marginRight:'1rem'}} fontSize="large"  />
                                    <span>Hola, {usuario.displayName}</span>
                                </Menu>
                            </Link>
                            
                            <BotonLogout
                                 bgColor="true"
                                onClick={ () => firebase.cerrarSesion() }
                            >
                                    <Menu>
                                        <ExitToAppRoundedIcon   style={{color: 'var(--primario)', marginRight:'1rem'}} fontSize="large"  />
                                        <span>Logout</span>
                                    </Menu>
                            </BotonLogout>
                            </>
                        ): (
                            <>
                            <Link   href='/login'>
                                <Menu>
                                    <VpnKeyRoundedIcon style={{color: 'var(--primario)', marginRight:'1rem'}} />
                                    <span> Login</span>
                                 </Menu>
                            </Link>
                            <Link  href='/signin'>
                                <Menu>
                                    <PersonAddRoundedIcon   style={{color: 'var(--primario)', marginRight:'1rem'}}  fontSize="large" />
                                    <span>Sign In</span>
                                </Menu>
                            </Link>
                            </>
                        )}
                      
                        
                        
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        </header>
      );
}
 
export default Header;