import React, { useEffect } from 'react';
import './Noticias.css'
import slide1 from './../assets/images/sds.jpeg'
import slide2 from './../assets/images/sds1.jpg'

function Noticias() {

    return (
        <section className='padded'>
            <div className="container mb-4">
                <h1 className='padd-bottom'>Albums</h1>
                <div className="row">
                    <article className="col text-center">
                        <h3>Modo Despegar</h3>
                        <img src={slide1} className="article-image" alt="..." />
                    </article>
                    <article className="col text-center">
                        <h3>SOS</h3>
                        <img src={slide2} className=" article-image " alt="..." />
                    </article>
                </div>
            </div>
            <div className="container text-center mt-4">
                <div className="row text-center">

                    <p className=" d-flex justify-content-center align-items-center gap-4">
                        <a
                            className="btn btn-outline-secondary"
                            data-bs-toggle="collapse"
                            href="#multiCollapseExample1"
                            role="button"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample1"
                        >
                            Aún no nos sigues?
                        </a>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#multiCollapseExample2"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample2"
                        >
                            SDS Tour 2024
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target=".multi-collapse"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample1 multiCollapseExample2"
                        >
                            Conócenos
                        </button>
                    </p>
                    <div className="row">
                        <div className="col">
                            <div className="collapse multi-collapse" id="multiCollapseExample1">
                                <div className="card card-body">
                                    “Somos una banda que ama tocar en vivo, disfrutamos la conexión que es recíproca, el sentimiento, el calor de los shows, la energía… Eso nos hacía falta y aunque no fue el escenario ideal, pudimos volver a ensayar y tocar canciones nuevas. Teníamos ganas de hacer cosas que no volverán muy pronto. Es doloroso decirlo pero así es”.
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="collapse multi-collapse" id="multiCollapseExample2">
                                <div className="card card-body">
                                    <p>Perú, Noviembre </p>
                                    <p>Argentina, Diciembre </p>
                                    <p>Chile, Diciembre </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>)
}

export default Noticias