import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from '../utils/index'

function Nosotros() {
    const [listaPaises, setListaPaises] = useState([])
    const [codpais, setCodpais] = useState("")
    const [pais, setPais] = useState("")
    const [capital, setCapital] = useState("")
    const [area, setArea] = useState("")
    const [poblacion, setPoblacion] = useState("")
    const [continente, setContinente] = useState("")

    useEffect(() => {
        leerServicio()
    }, [])


    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "paises.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaPaises(data)
            })
    }

    const dibujarInsertModal = () => {
        return (
            <div className="modal fade" id="insertModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Nuevo Director</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => insertPaises(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Código"
                                        required minLength="2" maxLength="15"
                                        value={codpais} onChange={(event) => setCodpais(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="País"
                                        required minLength="1" maxLength="20"
                                        value={pais} onChange={(event) => setPais(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Capital"
                                        required minLength="1" maxLength="20"
                                        value={capital} onChange={(event) => setCapital(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Área"
                                        required minLength="1" maxLength="20"
                                        value={area} onChange={(event) => setArea(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Poblacion"
                                        required minLength="1" maxLength="20"
                                        value={poblacion} onChange={(event) => setPoblacion(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Continente"
                                        required minLength="1" maxLength="20"
                                        value={continente} onChange={(event) => setContinente(event.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }

    const insertPaises = (event) => {
        event.preventDefault()
        console.log("  - -  " + codpais)

        const rutaServicio = ApiWebURL + "paisesinsert.php"

        let formData = new FormData()
        formData.append("codpais", codpais)
        formData.append("pais", pais)
        formData.append("capital", capital)
        formData.append("area", area)
        formData.append("poblacion", poblacion)
        formData.append("continente", continente)
        // formData.append("paises", paises)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                leerServicio()
                setCodpais("")
                setPais("")
                setCapital("")
                setArea("")
                setPoblacion("")
                setContinente("")
                document.querySelector("#insertModal .btn-close").click()
            })
    }

    return (
        <section className='padded'>
            <div className="container">
                <h1>Países</h1>
                <div className="mb-3">
                    <button className="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#insertModal">Nuevo Director</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Código</th>
                            <th>País</th>
                            <th>Capital</th>
                            <th>Área</th>
                            <th>Continente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaPaises.map(i =>
                            <tr key={i.idpais}>
                                <td>{i.idpais}</td>
                                <td>{i.codpais}</td>
                                <td>{i.pais}</td>
                                <td>{i.capital}</td>
                                <td>{i.area}</td>
                                <td>{i.continente}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {dibujarInsertModal()}

            </div>
        </section>
    )
}


export default Nosotros