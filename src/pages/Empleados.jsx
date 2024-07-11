import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL, agregarEmpleado } from '../utils'
function Empleados() {

  const [listaEmpleados, setListaEmpleados] = useState([])
  const [listaItems, setListaItems] = useState([])
  const [cantidadProducto, setCantidadProducto] = useState([1])

  useEffect(() => {
    leerServicio()
  }, [])


  const leerServicio = () => {
    const datosCarrito = JSON.parse(sessionStorage.getItem("addEmpleado"))
    setListaItems(datosCarrito)

    const rutaServicio = ApiWebURL + "empleados.php"
    fetch(rutaServicio)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setListaEmpleados(data)
      })
  }
  const dibujarCuadricula = () => {
    return (
      <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2  g-4">
        {listaEmpleados.map(item =>
          <div className="col" key={item.idempleado}>
            <div className="card">
              <img src={ApiWebURL + "fotos/" + item.foto} className="card-img-top" alt={item.nombres} />
              <div className="card-body">
                <h5 className="card-title">{item.nombres} {item.apellidos} <i className="bi bi-person-add iconocarrito"
                  onClick={() => agregarEmpleado(item, 1)}
                  title="Añadir a empleado">
                </i></h5>
                
                <p className="card-text">{item.cargo}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
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
                      a
                        {/* <h2 className="modal-title fs-5" id="exampleModalLabel">
                            {productoSeleccionado.nombre}
                        </h2> */}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="row">
                          a
                            {/* <div className="col">
                                <img src={productoSeleccionado.imagengrande === null ? nofoto :
                                    ApiWebURL + productoSeleccionado.imagengrande}
                                    className="img-fluid" alt={productoSeleccionado.nombre} />
                            </div> */}
                            {/* <div className="col">
                                <table className='table'>
                                    <tbody>
                                        <tr>
                                            <th>Detalle</th>
                                            <td>{productoSeleccionado.detalle}</td>
                                        </tr>
                                        <tr>
                                            <th>Proveedor</th>
                                            <td>{productoSeleccionado.proveedor}</td>
                                        </tr>
                                        <tr>
                                            <th>Stock</th>
                                            <td>{productoSeleccionado.unidadesenexistencia}</td>
                                        </tr>
                                        <tr>
                                            <th>Precio</th>
                                            <td>  S/. {productoSeleccionado.preciorebajado !== "0"
                                                ? parseFloat(productoSeleccionado.preciorebajado).toFixed(2)
                                                : parseFloat(productoSeleccionado.precio).toFixed(2)}
                                                {productoSeleccionado.preciorebajado !== "0" && (
                                                    <span className='precio-anterior'> S/.
                                                        {parseFloat(productoSeleccionado.precio).toFixed(2)}
                                                    </span>
                                                )}</td>
                                        </tr>
                                        <tr>
                                            <th>Cantidad</th>
                                            <td>
                                                <input type="number" name='' id=''
                                                    className='form-control'
                                                    min="1"
                                                    value={cantidadProducto}
                                                    onChange={(event) => setCantidadProducto(event.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> */}
                        </div>
                    </div>
                    <div className="modal-footer">
                      a
                        {/* <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick={() => {
                                agregarCarrito(productoSeleccionado, cantidadProducto)
                                setCantidadProducto(1)
                            }}
                        >
                            Añadir al carrito 
                        </button>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
  return (

    <section id='empleados' className='padded'>
      <div className="container">
        <h2>
          Empleados
        </h2>
        {dibujarCuadricula()}
      </div>
      <div>{dibujarVistaRapidaModal()}</div>
     </section>
  )
}

export default Empleados