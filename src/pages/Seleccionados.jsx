import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from '../utils'
import './Seleccionados.css'

function Seleccionados() {
    const [listaItems, setListaItems] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        leerServicio()
    }, [])


    const leerServicio = () => {
        const datosCarrito = JSON.parse(sessionStorage.getItem("addEmpleado")) 

        setListaItems(datosCarrito)
        
        console.log(datosCarrito)
        calcularTotal(datosCarrito)
    }
    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th className='text-center' >Cargo</th>
                        <th className='text-center'>País</th>
                        <th className='text-center'>Foto</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaItems !== null ?
                        listaItems.map(item =>
                            <tr key={item.idempleado}>
                                <td className='align-content-center'>{item.idempleado}</td>
                                <td className='align-content-center'>{item.nombres}</td>
                                <td className='align-content-center'>{item.apellidos}</td>
                                <td className='text-center align-content-center'>{item.cargo}</td>
                                <td className='text-center align-content-center'>{item.pais}</td>
                                <td className='text-center'><img src={ApiWebURL + "fotos/" + item.foto} className=" img-thumbnail-custom"  /></td>
                                <td className='text-center align-content-center'>
                                    <i className="bi bi-x-lg icono-eliminar"
                                        title='Eliminar'
                                        onClick={() => eliminarItem(item)}
                                    ></i>
                                </td>
                            </tr>
                        )
                        :
                        <div className="alert alert-warning" role="alert">
                            Su lista de empleados está vacia.
                        </div>
                    }
                </tbody>
                {/* <tfoot>
                    <tr>
                        <th colSpan="4" className='text-end'>Total</th>
                        <th className='text-end'>{total.toFixed(2)}</th>
                    </tr>
                </tfoot> */}
            </table>
        )
    }
    const eliminarItem = (item) => {
        let carritoMenos = listaItems.filter(itemCart => itemCart.idproducto !== item.idproducto)
        setListaItems(carritoMenos)
        sessionStorage.setItem("addEmpleado", JSON.stringify(carritoMenos))
    }
    const calcularTotal = (datosCarrito) => {
        let sumaTotal = datosCarrito.reduce((acumulador, fila) => acumulador + fila["precio"] * fila["cantidad"], 0)
        setTotal(sumaTotal)
    }

    const vaciarCarrito = () => {
        setListaItems([])
        sessionStorage.removeItem("addEmpleado")
    }
    return (
        <section className='padded'>
            <div className="container">
                <h1>Personal Seleccionado</h1>
                {dibujarTabla()}
                <button className="btn btn-secondary"
                    onClick={() => vaciarCarrito()}>Limpiar lista de empleados</button>
            </div>
        </section>
    )

}

export default Seleccionados 