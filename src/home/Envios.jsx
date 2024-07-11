import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from '../utils/index'

function Envios() {

    const [listaEnvios, setListaEnvios] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    
    const leerServicio = () => {
        const rutaServicio = ApiWebURL+"envios.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaEnvios(data)
            })
    }

    return (
        <section className='padded'>
            <div className="container">
                <h2>Envíos</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Telèfono</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaEnvios.map(i =>
                            <tr key={i.idempresaenvio}>
                                <td>{i.idempresaenvio}</td>
                                <td>{i.nombre}</td>
                                <td>{i.telefono}</td>
                                <td>{i.latitud}</td>
                                <td>{i.longitud}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Envios