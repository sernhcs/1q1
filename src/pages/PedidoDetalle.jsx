import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from '../utils'
import nofoto from "./../assets/images/images.png"


function PedidoDetalle() {
    const params = useParams()
    console.log(params)
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])


    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidosdetalle.php?idpedido=" + params.idproducto
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPedidoSeleccionado(data[0])
            })
    }

    return (
        <section className='padded'>
            <div className="container">
                <h2>
                    {pedidoSeleccionado.nombre}
                </h2>
                <div className="row">
                    <div className="col">
                        <img src={pedidoSeleccionado.imagenchica === null ? nofoto :
                            ApiWebURL + pedidoSeleccionado.imagenchica}
                            className="img-fluid" alt={pedidoSeleccionado.nombre} />
                    </div>
                    <div className="col">
                        <table className='table'>
                            <tr>
                                <th>Detalle</th>
                                <td>{pedidoSeleccionado.detalle}</td>
                            </tr>
                            <tr>
                                <th>Cantidad</th>
                                <td>{pedidoSeleccionado.cantidad}</td>
                            </tr>
                            <tr>
                                <th>Precio</th>
                                <td>{parseFloat(pedidoSeleccionado.precio).toFixed(2)}</td>
                            </tr>

                        </table>
                        {/* <h3>Descripción</h3>
                        <div dangerouslySetInnerHTML={{__html: pedidoSeleccionado.descripcion}}></div> */}
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PedidoDetalle