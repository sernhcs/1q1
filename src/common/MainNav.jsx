import React from 'react'
import { Link } from 'react-router-dom'
import '../common/MainNav.css'
function MainNav() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Lia
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                       

                        <li className="nav-item">
                            <Link className="nav-link" to="/mentiras">
                                Tanta Mentira Tour
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tienda">
                                Tienda
                            </Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link" to="/directores">
                                Directores
                            </Link>
                        </li> 
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/futbol">
                                Futbol
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/empleados">
                                Empleados
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/proveedores">
                                Proveedores
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/paises">
                                Paíßes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">
                                + Info
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/carrito">
                                <i className='bi bi-handbag'></i>Shopping Bag
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/seleccionados">
                                <i className='bi bi-person'></i>Seleccionados
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainNav
