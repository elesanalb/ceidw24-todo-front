const contTareas = document.querySelector(".tareas");
const formulario = document.querySelector("form");
const inputTexto = document.querySelector('form input[type="text"]');


fetch("http://localhost:4000/tareas")
.then(respuesta => respuesta.json())
.then(tareas => {
    tareas.sort((a, b) => a.id - b.id).forEach(({id, tarea, terminado}) => {
        new Tarea(id, tarea, terminado, contTareas);
    });
});

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    if(inputTexto.value.trim() != ""){
        let tarea = inputTexto.value.trim();

        fetch("http://localhost:4000/taraas/nueva", {
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