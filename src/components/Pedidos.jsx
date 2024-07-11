import React, { useEffect, useState } from 'react';
import { ApiWebURL, agregarCarrito } from '../utils';
import nofoto from "./../assets/images/images.png";
import { Link } from 'react-router-dom';

function Pedidos(props) {
    console.log('Props:', props);

    const [listaProductos, setListaProductos] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState([])


    useEffect(() => {
        if (props.codigoCategoria) {
            leerServicio(props.codigoCategoria);
        }
    }, [props.codigoCategoria]);

    const leerServicio = (idcategoria) => {
        const rutaServicio = ApiWebURL + "productos.php?idcategoria=" + idcategoria
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setListaProductos(data);
                } else {
                    console.error('Expected array but received:', data);
                    setListaProductos([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setListaProductos([]);
            });
    }

    const mostrarVistaRapida = (e) => {
        e.currentTarget.querySelector(".icono-vista-rapida").classList.add("icono-vista-rapida-mostrar")
    }

    const ocultarVistaRapida = (e) => {
        e.currentTarget.querySelector(".icono-vista-rapida").classList.remove("icono-vista-rapida-mostrar")

    }

    const leerProductoSeleccionado = (idproducto) => {
        const rutaServicio = ApiWebURL + "productos.php?idproducto=" + idproducto
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProductoSeleccionado(data[0])
            })
    }
    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2  g-4">
                {listaProductos.map(item =>
                    <div className="col" key={item.idproducto}>
                        <div className="card text-center h-100"
                            onMouseEnter={(e) => mostrarVistaRapida(e)}
                            onMouseLeave={(e) => ocultarVistaRapida(e)}

                        >
                            <Link to={"/productoDetalle/" + item.idproducto}>
                                <img src={item.imagenchica === null ? nofoto :
                                    ApiWebURL + item.imagenchica}
                                    className="card-img-top" alt={item.nombres} />
                            </Link>
                            <i className='bi bi-eye icono-vista-rapida'
                                data-bs-toggle="modal" data-bs-target="#vistaRapidaModal"
                                onClick={() => leerProductoSeleccionado(item.idproducto)}
                            ></i>

                            {item.preciorebajado !== "0" ?
                                <div className='porcentaje-descuento'>
                                    {((1 - item.preciorebajado / item.precio) * 100).toFixed(0) + "%"}
                                </div>
                                : ""
                            }

                            <div className="card-body">
                                <h5 className="card-title">{item.nombre}
                                    <i className="bi bi-basket iconocarrito"
                                        onClick={() => agregarCarrito(item, 1)}
                                        title="Añadir al carrito">
                                    </i> </h5>
                                <p className="card-text">
                                    S/. {item.preciorebajado !== "0"
                                        ? parseFloat(item.preciorebajado).toFixed(2)
                                        : parseFloat(item.precio).toFixed(2)}
                                    {item.preciorebajado !== "0" && (
                                        <span className='precio-anterior'> S/.
                                            {parseFloat(item.precio).toFixed(2)}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }


    return (
        <section>
            <div className='my-3'>Pedidos</div>
            <div>{dibujarCuadricula()}</div>
        </section>
    )
}

export default Pedidos