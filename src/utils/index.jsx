export const ApiWebURL = "https://servicios.campus.pe/"

export const agregarCarrito =(item, cantidadProducto)=>{
    item.cantidad= Number(cantidadProducto)
    item.precio = item.preciorebajado === "0" ? item.precio:item.preciorebajado
    console.log(item)
    let carrito=[]

    if(sessionStorage.getItem("carritocompras")){
        carrito=JSON.parse(sessionStorage.getItem("carritocompras"))
        let index =-1
        for(let i=0; i<carrito.length;i++ ){
            if(item.idproducto === carrito[i].idproducto){
                index = i
                break;
            }
        }
        if(index===-1){
            carrito.push(item)
        }
        else{
            carrito[index].cantidad += Number(cantidadProducto)
        }
    }else{
        carrito.push(item)
    }

    sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
}

export const agregarEmpleado =(item, cantidadEmpleado)=>{
    item.cantidad= Number(cantidadEmpleado)
    // item.precio = item.preciorebajado === "0" ? item.precio:item.preciorebajado
    console.log(item)
    let carrito=[]

    if(sessionStorage.getItem("addEmpleado")){
        carrito=JSON.parse(sessionStorage.getItem("addEmpleado"))
        let index =-1
        for(let i=0; i<carrito.length;i++ ){
            if(item.idempleado === carrito[i].idempleado){ 
                index = i
                break;
            }
        }
        if(index===-1){
            carrito.push(item)
        }
        else{
            carrito[index].cantidad += Number(cantidadEmpleado)
        }
    }else{
        carrito.push(item)
    }

    sessionStorage.setItem("addEmpleado", JSON.stringify(carrito))
}