const input1 = document.getElementById("nombre")
const input2 = document.getElementById("desc")
const input3 = document.getElementById("f_ini")
const input4 = document.getElementById("f_end")
const boton = document.getElementById("boton")

boton.addEventListener("click", funcion)

function funcion(){
    // valores de los inputs
    const p1 = input1.value
    const p2 = input2.value
    const p3 = input3.value
    const p4 = input4.value
    const id =  sessionStorage.getItem("id");
    
    // enviar datos al php
    fetch("http://localhost:8000/api/create_p", {
        method: "POST",
        headers: {
            "content-type" : "aplication/json"
        },
        body: JSON.stringify({
            nombre: p1,
            desc: p2,
            f_ini: p3,
            f_end: p4,
            user: id
        })
    })
    .then(response => response.text()) // recoger y mostrar datos del php
    .then(data =>{
        window.location.href = 'dashboard.html';
        console.log(data)
    })
}