import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from '../utils'
import '../pages/Proveedores.css'

function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([])
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([])
    const [textoBuscar, setTextoBuscar] = useState("")
    const [filasPagina, setFilasPagina] = useState(5)
    const [totalPaginas, setTotalPagina] = useState(0)
    const [totalFilas, setTotalFilas] = useState(0)
    const [pagina, setPagina] = useState(0)
    const [estadoAscendente, setEstadoAscendente] = useState(1)
    const [columnaAnterior, setColumnaAnterior] = useState("")
    const [productoSeleccionado, setProductoSeleccionado] = useState([])
    const [cantidadProducto, setCantidadProducto] = useState([1])
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);


    useEffect(() => {
        leerServicio()
    }, [])


    const leerServicio = (idproveedor) => {
        const rutaServicio = ApiWebURL + "proveedores.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data.slice(listaProveedores))
                setListaProveedores(data)
                setListaProveedoresFiltrados(data)
                setTotalFilas(data.length)
                setTotalPagina(Math.ceil(data.length / filasPagina))
                if (idproveedor !== null) {
                    const proveedor = data.find(p => p.idproveedor === idproveedor);
                    setProveedorSeleccionado(proveedor);
                }
            })
    }

    const seleccionarColumna = (event, columna) => {
        // console.log(columna)
        let iconosOrden = document.querySelectorAll("#tabla-proveedores th i")
        iconosOrden.forEach(item => item.remove())

        let ascendente = estadoAscendente
        if (columna !== columnaAnterior) {
            ascendente = 1
        }
        else {
            ascendente = -ascendente
        }
        const resultado = [...listaProveedoresFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? ascendente : -ascendente
        )
        // let icono = ascendente ===1 ?'<i className="bi bi-caret-down "></i>':'<i className="bi bi-caret-up "></i>'
        // event.currentTarget.innerHTML += icono
        const icono = ascendente === 1 ? 'bi-caret-down' : 'bi-caret-up';
        setListaProveedoresFiltrados(resultado)
        setColumnaAnterior(columna)
        setEstadoAscendente(ascendente)

        // Limpiar los iconos anteriores
        const thElements = document.querySelectorAll("#tabla-proveedores th");
        thElements.forEach(th => {
            th.innerHTML = th.innerHTML.replace(/<i class="bi bi-caret-[a-z]+"><\/i>/, '');
        });

        // Agregar el nuevo icono
        event.currentTarget.innerHTML += `<i class="bi ${icono}"></i>`;

    }
    const abrirVistaRapidaModal = (idproveedor) => {
        const proveedor = listaProveedores.find(p => p.idproveedor === idproveedor);
        setProveedorSeleccionado(proveedor);
    };
    
    const dibujarVistaRapidaModal = () => {
        return (
            <div
                className="modal fade"
                id="vistaRapidaModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-1" id="exampleModalLabel">
                                {proveedorSeleccionado ? proveedorSeleccionado.nombreempresa : ''}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {/* <div className="col">
                                    {proveedorSeleccionado ? proveedorSeleccionado.idproveedor : ''}
                                </div> */}
                                <div className="col">
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <th>Cargo</th>
                                                <td>{proveedorSeleccionado ? proveedorSeleccionado.cargocontacto : ''}</td>
                                            </tr>
                                            <tr>
                                                <th>Dirección</th>
                                                <td>{proveedorSeleccionado ? proveedorSeleccionado.direccion : ''}</td>
                                            </tr>
                                            <tr>
                                                <th>País</th>
                                                <td>{proveedorSeleccionado ? proveedorSeleccionado.pais : ''}</td>
                                            </tr>
                                            <tr>
                                                <th>Teléfono</th>
                                                <td>{proveedorSeleccionado ? proveedorSeleccionado.telefono : ''}</td>
                                            </tr>
                                            {/* Añadir más filas según sea necesario */}
                                            <tr></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                                {/* <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => {
                                        agregarCarrito(productoSeleccionado, cantidadProducto);
                                        setCantidadProducto(1);
                                    }}
                                >
                                    Añadir al carrito
                                </button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
  
    const dibujarTabla = () => {
        return (
            <table className="table" id='tabla-proveedores'>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th onClick={(event) => seleccionarColumna(event, "nombreempresa")}>Proveedor</th>
                        <th onClick={(event) => seleccionarColumna(event, "nombrecontacto")}>Contacto</th>
                        <th onClick={(event) => seleccionarColumna(event, "ciudad")}>Ciudad</th>
                        <th onClick={(event) => seleccionarColumna(event, "pais")}>País</th>
                        <th>Acciones</th>
                        <th>{listaProveedoresFiltrados.idproveedor}</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrados.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                            <td><i className='bi bi-eye  d-flex text-center align-items-center icono-vista-rapida2'
                                 data-bs-toggle="modal" data-bs-target="#vistaRapidaModal"
                                 onClick={() => abrirVistaRapidaModal(item.idproveedor)}
                            ></i></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
    const buscarTexto = (event) => {
        let texto = event.target.value
        setTextoBuscar(texto)
        // console.log(texto)
        const resultado = listaProveedores.filter(item =>
            item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["pais"].toUpperCase().includes(texto.toUpperCase()) ||
            item["ciudad"].toUpperCase().includes(texto.toUpperCase())
        )
        setListaProveedoresFiltrados(resultado)
    }
    const dibujarPaginacion = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => retroceder()}>Anterior</a></li>
                    {dibujarNumerosPaginacion()}
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => avanzar()}>Siguiente</a></li>
                </ul>
            </nav>
        )
    }
    const dibujarNumerosPaginacion = () => {
        return (
            <>
                {
                    Array.from({ length: totalPaginas }).map((item, index) =>
                        <li className={index === pagina ? "page-item active" : "page-item"} key={index}>
                            <a className='page-link' href='#'
                                onClick={() => setPagina(index)}
                            >{index + 1}</a>
                        </li>
                    )
                }
            </>

        )
    }

    const retroceder = () => {
        if (pagina > 0) {
            setPagina(pagina - 1)
        }

    }
    const avanzar = () => {
        if (pagina < totalPaginas - 1) {
            setPagina(pagina + 1)
        }
    }
    return (
        <section id='proveedores' className='padded'>
            <div className="container">
                <h1>
                    Proveedores
                </h1>
                <div className="mb-3"><input placeholder='Indique expresión a buscar' value={textoBuscar} onChange={(event) => buscarTexto(event)} className='form-control' /></div>
                {dibujarTabla()}
                {dibujarPaginacion()}
                <div>{dibujarVistaRapidaModal()}</div>


            </div>
        </section>
    )
}

export default Proveedores