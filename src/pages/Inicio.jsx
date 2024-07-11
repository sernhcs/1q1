import React from 'react'
import MainBanner from '../home/MainBanner'
import Nosotros from '../home/Nosotros'
import Noticias from '../home/Noticias'
import Envios from '../home/Envios'

function Inicio() {
    return (
        <>
            <MainBanner />
            <Nosotros />
            <Noticias/>
            {/* <Envios/> */}
        </>
    )
}

export default Inicio