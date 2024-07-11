import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from '../utils/index'
import { Link, useNavigate } from 'react-router-dom'

function Mentiras(props) {
    const [listaPedidos, setListaPedidos] = useState([])
    const [listaPedidosFiltrados, setListaPedidosFiltrados] = useState([])
    const [filasPagina, setFilasPagina] = useState(30)
    const [totalPaginas, setTotalPagina] = useState(0)
    const [totalFilas, setTotalFilas] = useState(0)
    const [pagina, setPagina] = useState(0)
    const [estadoAscendente, setEstadoAscendente] = useState(1)
    const [columnaAnterior, setColumnaAnterior] = useState("")
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])


    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidos.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setListaPedidos(data)
                setListaPedidosFiltrados(data)
                setTotalFilas(data.length)
                setTotalPagina(Math.ceil(data.length / filasPagina))
                seleccionarCategoria(data[0])
            })
    }
    const seleccionarCategoria = (item) => {
        // console.log(item)
        setCategoriaSeleccionada(item)
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
        const resultado = [...listaPedidosFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? ascendente : -ascendente
        )

        const icono = ascendente === 1 ? 'bi-caret-down' : 'bi-caret-up';
        setListaPedidosFiltrados(resultado)
        setColumnaAnterior(columna)
        setEstadoAscendente(ascendente)


        const thElements = document.querySelectorAll("#tabla-proveedores th");
        thElements.forEach(th => {
            th.innerHTML = th.innerHTML.replace(/<i class="bi bi-caret-[a-z]+"><\/i>/, '');
        });


        event.currentTarget.innerHTML += `<i class="bi ${icono}"></i>`;

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
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const dibujarTabla = () => {
        const navigate = useNavigate();

        const handleRowClick = (idpedido) => {
            navigate(`/pedidosdetalle/${idpedido}`);
        };
        return (
            <table className="table" id='tabla-proveedores'>
                <thead>
                    <tr>

                        <th onClick={(event) => seleccionarColumna(event, "nombreempresa")}>Pedido</th>
                        <th onClick={(event) => seleccionarColumna(event, "nombrecontacto")}>Fecha</th>
                        <th onClick={(event) => seleccionarColumna(event, "ciudad")}>Nombre</th>
                        <th onClick={(event) => seleccionarColumna(event, "total")}>Total</th>
                        <th onClick={(event) => seleccionarColumna(event, "user")}>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidosFiltrados.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(i =>
                        <tr key={i.idpedido} onClick={() => handleRowClick(i.idpedido)} style={{ cursor: 'pointer' }}>

                            <td className='no-gutter'>
                                {i.idpedido}
                            </td>
                            <td>{formatDate(i.fechapedido)}</td>
                            <td>{i.nombres}</td>
                            <td>{parseFloat(i.total).toFixed(2)}</td>
                            <td>{i.usuario}</td>
                        </tr>
                    )}

                </tbody>
            </table>
        )
    }
    return (
        <section id='mentiras' className='padded'>
            <div className="container">
                <h1>
                    SDS
                </h1>
                <p>Nuestra propuesta es exprimir la vida y sacarle todo el jugo para que ese “todo” que vamos a perder sea mucho.
                    Y que el día que nos toque irnos, vibremos por última vez.</p>
                <p>Conocé a nuestros usuarios</p>
                {/* {listaPedidos.map(i =>
                    <div key={i.idproducto}>
                        <Link to={"/pedidosdetalle/" + i.idpedido}>
                            a
                        </Link>
                    </div>)} */}
            </div>
            <div className="container">
                {dibujarTabla()}


                {dibujarPaginacion()}

            </div>


        </section>
    )
}

export default Mentiras