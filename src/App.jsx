
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Inicio from './pages/Inicio'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'
import Tienda from './pages/Tienda'
import Carrito from './pages/Carrito'
import Directores from './pages/Directores'
import ProductoDetalle from './pages/ProductoDetalle'
import './components/Productos.css'
import Futbol from './pages/Futbol'
import Mentiras from './pages/Mentiras'
import Seleccionados from './pages/Seleccionados'
import PedidoDetalle from './pages/PedidoDetalle'
import Paises from './pages/Paises'

function App() {

  return (
    <>
      <BrowserRouter >
        <MainHeader />
        <MainNav />
        <main>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/proveedores' element={<Proveedores />} />
            <Route path='/empleados' element={<Empleados />} />
            <Route path='/tienda' element={<Tienda />} />
            <Route path='/productoDetalle/:idproducto' element={<ProductoDetalle />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/directores' element={<Directores />} />
            <Route path='/futbol' element={<Futbol />} />
            <Route path='/mentiras' element={<Mentiras />} />
            <Route path='/pedidosDetalle/:idproducto' element={<PedidoDetalle />} />
            <Route path='/seleccionados' element={<Seleccionados />} />
            <Route path='/paises' element={<Paises />} />


          </Routes>
        </main>
        <MainFooter />
      </BrowserRouter >
    </>
  )
}

export default App
