const productos = [
    //camisas
    {
        id: "camisa1",
        titulo:"camisa-senitzu-tanjiro",
        imagen: "./photo/camiza1.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id:"camisa2",
        titulo:"camisa-power",
        imagen:"./photo/camiza2.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id: "camisa3",
        titulo:"camisa-nezuko",
        imagen: "./photo/camiza3.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id:"camisa4",
        titulo:"camisa-all-might",
        imagen:"./photo/camiza4.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id: "camisa5",
        titulo:"camisa-dragon-ball",
        imagen: "./photo/camiza5.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id:"camisa6",
        titulo:"camisa-hatsune-miku",
        imagen:"./photo/camiza6.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id: "camisa7",
        titulo:"camisa-shinobu",
        imagen: "./photo/camiza7.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id:"camisa8",
        titulo:"camisa-tanjiro",
        imagen:"./photo/camiza8.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id: "camisa9",
        titulo:"camisa-titan-acorazado",
        imagen: "./photo/camiza9.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id:"camisa10",
        titulo:"camisa-oshinoko",
        imagen:"./photo/camiza10.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id: "camisa11",
        titulo:"camisa-dragon-ball-2",
        imagen: "./photo/camiza11.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id:"camisa12",
        titulo:"camisa-full-metal",
        imagen:"./photo/camiza12.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id: "camisa13",
        titulo:"camisa-chainsawman",
        imagen: "./photo/camiza13.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    },
    {
        id:"camisa14",
        titulo:"camisa-hatsune-miku-2",
        imagen:"./photo/camiza14.jpeg",
        categoria:
        {
            nombre: "camisas",
            id:"camisas"
        },
        precio: 50,
        cantidad: 1
    }
    
];
const contenedorproductos = document.querySelector("#contenedor-productos");
const botonescategorias = document.querySelectorAll(".boton-categoria");
const tituloprincipal = document.querySelector("#titulo-principal");
let   botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarproductos(productosElegidos)
{
    contenedorproductos.innerHTML = "";  
    productosElegidos.forEach(producto => 
        {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt=" ${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">Q ${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">agregar</button>
            </div>
            `;

            contenedorproductos.append(div);
        })
        actualizarBotonesAgregar();
}

cargarproductos(productos);
botonescategorias.forEach(boton => {
    boton.addEventListener("click",(e) =>{
        botonescategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

            tituloprincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

        cargarproductos(productosBoton);}else
        {
            tituloprincipal.innerText = "todos los productos";
            cargarproductos(productos)
        }
    })
});
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton =>{
         boton.addEventListener("click", agregarAlcarrito);
    });
}

let productoEncarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
productoEncarrito = JSON.parse( productosEnCarritoLS);
actualizarnumerito();
}
else{
    productoEncarrito = [];
}


function agregarAlcarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productoEncarrito.some(producto => producto.id === idBoton))
    {
        const index = productoEncarrito.findIndex(producto => producto.id === idBoton);
        productoEncarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productoEncarrito.push(productoAgregado);
    }
    
    actualizarnumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEncarrito));
    
}
function actualizarnumerito()
{
    let nuevoNumerito = productoEncarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}