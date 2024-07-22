const contTareas = document.querySelector(".tareas");
const formulario = document.querySelector("form");
const inputTexto = document.querySelector('form input[type="text"]');


fetch("https://ceidwfs24-api-todo.onrender.com/tareas")
.then(respuesta => respuesta.json())
.then(tareas => {
    tareas.sort((a, b) => a.id - b.id).forEach(({id, tarea, terminada}) => {
        new Tarea(id, tarea, terminada, contTareas);
    });
});

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    if(inputTexto.value.trim() != ""){
        let tarea = inputTexto.value.trim();

        fetch("https://ceidwfs24-api-todo.onrender.com/tareas/nueva", {
            method : "POST",
            body : JSON.stringify({tarea}),
            headers : {
                "Content-type" : "application/json"
            }
        })
        .then(respuesta => respuesta.json())
        .then(({id, error}) => {
            if(error){
                new Tarea(id, tarea, false, contTareas);
                return inputTexto.value = "";
            }
            console.log("error");
            // console.log(respuesta);
        })


        /*
        new Tarea(1, inputTexto.value.trim(), false, contTareas);
        inputTexto.value = "";
        */
    }
});