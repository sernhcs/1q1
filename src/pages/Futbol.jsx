import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from '../utils/index'

function Futbol() {

    const [listaFutbol, setListaFutbol] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])


    const leerServicio = () => {
        let myHeaders = new Headers();
        const apiKey = import.meta.env.VITE_API_KEY
        myHeaders.append("x-rapidapi-key", apiKey);
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://v3.football.api-sports.io/leagues", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.response)
                setListaFutbol(result.response)
            }
            )
            .catch(error => console.log('error', error));
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
                        {listaFutbol.map((item, index) =>
                            <tr key={index}>
                                <td>{item.league.name}</td>
                                <td>{item.country.code}</td>
                                <td>{item.country.name}</td>

                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Futbol