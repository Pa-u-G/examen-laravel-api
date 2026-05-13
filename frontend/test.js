function masprecio(e){
    console.log(e.target.id)
    let precio = prompt("precio??")
    precio = parseFloat(precio)
    console.log(typeof(precio))
    console.log(precio)
    if (precio === precio) {
        console.log("numero")

        fetch("http://localhost:8000/api/save", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                id: e.target.id,
                precio: precio
            })
        })
        .then(response => response.json()) // recoger y mostrar datos del php
        .then(data =>{
            // document.getElementById("respuesta").innerHTML = data
            console.log(data)
            console.log(data["id"])
            document.getElementById("precio_"+data["id"]).textContent = data["precio"]
        })



    } else {
        console.log("caracter")
    }
}

function obtenerdatos(){
    fetch('http://localhost:8000/api/test')
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => {
            console.log(data)
            tabla.innerHTML = ""
            // let productos
            data.forEach(producto => {
                // let linea = "<tr><td>"+producto["nombre"]+"</td><td>"+producto["precio"]+"</td></tr>"
                // productos+=linea
                let tr = document.createElement("tr")
                let nombre = document.createElement("td")
                let precio = document.createElement("td")
                let accion = document.createElement("td")
                let boton_accion = document.createElement("button")

                nombre.textContent = producto["nombre"]
                precio.textContent = producto["precio"]
                boton_accion.textContent = "boton"

                boton_accion.id=producto["id"]
                
                precio.id="precio_"+producto["id"]

                boton_accion.addEventListener("click", masprecio)

                accion.appendChild(boton_accion)
                
                tr.appendChild(nombre)
                tr.appendChild(precio)

                tr.appendChild(accion)

                tabla.appendChild(tr)
            });
        }) // Maneja los datos
        .catch(error => console.error('Error:', error)); // Maneja errores
}

const boton = document.getElementById("boton")
const tabla = document.getElementById("tabla")
boton.addEventListener("click", obtenerdatos)

// Logout handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        const token = localStorage.getItem('api_token');
        try {
            if (token) {
                await fetch('http://localhost:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (err) {
            console.error('Error during logout request', err);
        }
        localStorage.removeItem('api_token');
        window.location.href = './login.html';
    });
}