import React, {useContext, useState} from "react";
import './Menubar.css';
import {assets} from "../../assets/assets.js";
import {Link, useNavigate} from "react-router-dom";
import Cart from "../../pages/Cart/Cart.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";


const Menubar = () => {
    const [active, setActive] = useState('');
    const {quantities} = useContext(StoreContext);
    const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link to="/"> <img src={assets.logo} alt='' className='mx-4' height={48} width={48} /> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className={active === '' ? "nav-link fw-bold":"nav-link"} aria-current="page" to="/" onClick={() => setActive('')}>Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={active === 'explorefood' ? "nav-link fw-bold":"nav-link"} aria-current="page" to="/explorefood" onClick={() => setActive('explorefood')}>Explore</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={active === 'contactus' ? "nav-link fw-bold":"nav-link"} aria-current="page" to="/contactus" onClick={() => setActive('contactus')}>Contacts Us</Link>
                        </li>
                    </ul>
                    <div className='d-flex align-items-center gap-4'>
                        <div className="position-relative">
                            <Link to={ `/cart` } >
                                <div className="position-relative">
                                    <img src={assets.cart} alt="" height={32} width={32} className="position-relative" />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">{uniqueItemsInCart}</span>
                                </div>
                            </Link>
                        </div>
                        <button className='btn btn-outline-primary' onClick={ () => navigate('/login')}>Login</button>
                        <button className='btn btn-outline-success' onClick={ () => navigate('/register')}>Register</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Menubar;