

// valores de los inputs
const p1 = sessionStorage.getItem("id");

// enviar datos al php
fetch("http://localhost:8000/api/proyectos", {
    method: "POST",
    headers: {
        "content-type" : "aplication/json"
    },
    body: JSON.stringify({
        id: p1,
    })
})
.then(response => response.json()) // recoger y mostrar datos del php
.then(data =>{
    console.log(data)
    document.getElementById("respuesta").innerHTML = ""
    data.forEach(producto => {
        let p = document.createElement("p")
        let boton_accion = document.createElement("a")
        let div = document.createElement("div")
        
        p.textContent = producto["nombre"]
        boton_accion.textContent = "edit"
        
        boton_accion.id = producto["id"]
        
        boton_accion.href = "edit.html"
        
        div.appendChild(p)
        div.appendChild(boton_accion)
        console.log(div)
        


        document.getElementById("respuesta").appendChild = div

    });
})