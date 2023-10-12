        class Estudiante {
            constructor(codigo,nombre,carrera){
                this.Codigo = codigo
                this.Nombre = nombre
                this.Carrera = carrera
            }
           
        }
        class Curso{
            constructor(codigo_curso,nombre,salon,duracion,creditos){
                this.Codigo_curso = codigo_curso
                this.Nombre = nombre
                this.Salon = salon
                this.Duracion = duracion
                this.Creditos = creditos

            }

        }
        class Horario{
            constructor(nombre,dia,hora_inicio,hora_final){
                this.Nombre= nombre
                this.Dia = dia
                this.Hora_inicio=hora_inicio
                this.hora_final = hora_final
            }

        }
        
        const inputAgregarCodigo = document.getElementById("inputAgregarNombre")
        const inputAgregarNombre = document.getElementById("inputAgregarCodigo")
        const inputAgregarSemestre = document.getElementById("inputAgregarSemestre")
        
        const selectOp = document.getElementById("opciones")
        const inputOpcion = document.getElementById("opcion_a_validar")
        const divResultados =document.getElementById("resultado_busqueda")

        const selectOpMod = document.getElementById("opciones_modificar")
        const inputOpcionMod = document.getElementById("opcion_a_validar_modificar")
        const divResultadosMod =document.getElementById("resultado_busqueda_modificar")
        
        // funcionalidad
        
        // deberiamos usar diccionarios ?
        function agregarEstudiante(){
            if(inputAgregarCodigo.value=="" || inputAgregarNombre=="" || inputAgregarSemestre==""){
                alert("Por favor rellena todos los campos")
            }
            else{
                if(localStorage.getItem("estudiantes")){
                    localStorage.setItem("estudiantes",JSON.stringify([]))
                }
                let estudiante= new Estudiante(inputAgregarNombre.value.trim(), inputAgregarCodigo.value, inputAgregarSemestre.value)
                //personas.push(estudiante)
                personas.push(estudiante)
                
                localStorage.setItem("estudiantes", JSON.stringify(personas))
                inputAgregarSemestre.value=""
                inputAgregarCodigo.value=""
                inputAgregarNombre.value=""
                alert("estudiante agregado correctamente")
            }
            listarEstu()
        }
        
        let data = localStorage.getItem('estudiantes')
        let personas = JSON.parse(data)
        console.log(personas)

        // BUSCAAAR
        function buscar(){
            let opcionTexto = selectOp.value
            let opcionAValidar = inputOpcion.value
            
            const fieldset = document.getElementById("mostrar_field");
            fieldset.style.display = "block";

            if(opcionTexto == "Nombre"){
               
                personas.forEach((element,index)=> {
                    console.log(element,index)
                    
                    if(element.Nombre == opcionAValidar)
                    {
                        console.log("pasa por aca")
                        divResultados.innerHTML=
                        `<div>${element.Codigo}</div>
                        <div>${element.Nombre}</div>
                        <div>${element.Carrera}</div>`
                    }

            

            });
            }else{
                personas.forEach((element)=> {
                    if(element.Codigo == parseFloat(opcionAValidar))
                    {
                        
                        divResultados.innerHTML=
                        `<div class='code'>${element.Codigo}</div>
                        <div class='nombre'>${element.Nombre}</div>
                        <div class='carrera'>${element.Carrera}</div>`
                    }

            });

            }
            //listar

            
        }

        const name_curso = document.querySelector("#curso");
        const name = document.querySelector("#conte");

        
        function listarEstu(){
            let validador=false
            if(localStorage.getItem("fechas")){
                localStorage.setItem("fechas", JSON.stringify([]))
            }
            name_curso.innerHTML=
            `<tr  id="mostrar_tabla">
                <th>Estudiante</th>
                <th>Curso</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
            </tr>`
            personas.forEach((element,index) => {
                
                
                name_curso.innerHTML+=`
                <td class="centrar_datos"> ${index+1}.${element.Nombre}</td>
                <td class="centrar_datos"> ${element.Carrera}</td>
                <td class="centrar_info" onclick="modalFecha(this)" id='${element.Nombre}-lunes' >Lunes<br> Hora de inicio <br> Hora de fin</td>
                <td class="centrar_info" onclick="modalFecha(this)" id='${element.Nombre}-martes'>Martes<br> Hora de inicio <br> Hora de fin</td>
                <td class="centrar_info" onclick="modalFecha(this)" id='${element.Nombre}-miercoles'>Miércoles<br> Hora de inicio <br> Hora de fin</td>
                <td class="centrar_info" onclick="modalFecha(this)" id='${element.Nombre}-jueves'>Jueves<br> Hora de inicio <br> Hora de fin</td>
                <td class="centrar_info" onclick="modalFecha('Viernes')" id='${element.Nombre}-viernes'>Viernes<br> Hora de inicio <br> Hora de fin</td>
                <td class="centrar_info" onclick="modalFecha('Sabado')" id='${element.Nombre}-ssabado'>Sábado<br> Hora de inicio <br> Hora de fin</td>`


            });
            revisar()
            
        }
        function revisar(){
           if(lista_fechas.length!=0)
           {
            lista_fechas.forEach(n => {
                document.getElementById(n.Nombre+"-"+n.Dia).innerHTML=`${n.Dia}<br> Hora de inicio: ${n.Hora_inicio} <br> Hora de fin: ${n.hora_final}`
            });
           }
           
            
                
    
        }

        function eliminarEstudiante(){
            let opcionTexto = selectOp.value
            let opcionAValidar = inputOpcion.value
            
            if(opcionTexto == "Nombre"){
                personas.forEach((element,index)=> {
                    if(element.Nombre == opcionAValidar)
                    {

                        inputOpcion.value=""
                        divResultados.innerHTML=""
                        personas.splice(index)
                        localStorage.setItem("estudiantes", JSON.stringify(personas))
                        
                    }

            

            });
            }else{
                personas.forEach((element,index)=> {
                    if(element.Codigo == parseFloat(opcionAValidar))
                    {
                        
                        inputOpcion.value=""
                        divResultados.innerHTML=""
                        personas.splice(index)
                        localStorage.setItem("estudiantes", JSON.stringify(personas))
                    }

            });

            }
            listarEstu()

        }
        // MOOOOOODIFICAR ESTUDIANTE

        function buscarMod(){
            let opcionTexto = selectOpMod.value
            let opcionAValidar = inputOpcionMod.value
            

            
            if(opcionTexto == "Nombre"){
                personas.forEach((element,index)=> {
                    
                    if(element.Nombre == opcionAValidar)
                    {
                        let pCod = document.createElement("p")
                        pCod.textContent="Codigo"
                        let pNom = document.createElement("p")
                        pNom.textContent="Nombre"
                        let pCar = document.createElement("p")
                        pCar.textContent="Carrera"

                        let inputNomMod = document.createElement("input")
                        inputNomMod.type="text"
                        inputNomMod.setAttribute("id","Nom-modificado")
                        inputNomMod.placeholder =`${element.Nombre}`
                    
                        
                        
                        let inputCodMod = document.createElement("input")
                        inputCodMod.type="number"
                        inputCodMod.setAttribute("id","Cod-modificado")
                        inputCodMod.placeholder=`${element.Codigo}`

                        let inputCarMod= document.createElement("input")
                        inputCarMod.type="number"
                        inputCarMod.setAttribute("id","Car-modificado")
                        inputCarMod.placeholder=`${element.Carrera}`


                        divResultadosMod.appendChild(pNom)
                        divResultadosMod.appendChild(inputNomMod)
                        divResultadosMod.appendChild(pCod)
                        divResultadosMod.appendChild(inputCodMod)
                        divResultadosMod.appendChild(pCar)
                        divResultadosMod.appendChild(inputCarMod)
                
                        
                    }

            

            });
            }else{
                personas.forEach((element)=> {
                    if(element.Codigo == parseFloat(opcionAValidar))
                    {
                        
                        divResultados.innerHTML=
                        `<div class='code'>${element.Codigo}</div>
                        <div class='nombre'>${element.Nombre}</div>
                        <div class='carrera'>${element.Carrera}</div>`
                    }

            });

            }
            
            listarEstu()

        }

        //modificación rela
        const nom_mod = document.getElementById("inputNomMod")
        function modificarElemento() {
            if(nom_mod.value!="")
            {
                alert("Hay un elemento")
            }

        
        }


        

        //agregar fecha
        const inputHoraInicial =document.getElementById("hora_a_iniciar")
        const inputHoraFinal = document.getElementById("hora_a_terminar")
        function agregarFecha(){
            
            if(inputHoraFinal.value == ""|| inputHoraInicial ==""){
                alert("campos incompletos, por favor llenalos todos")
            }
            else{
                
            }
        }





        // ventanas emergentes

        const toggleBtn = document.querySelector(".toggle_btn")
        const toggleBtnIcon = document.querySelector(".toggle_btn i")
        const dropDownMenu =document.querySelector(".dropdown-menu")
        const horaIn=document.getElementById("hora_a_iniciar")
        const horaFin=document.getElementById("hora_a_terminar")
        
        toggleBtn.onclick = function(){
            dropDownMenu.classList.toggle("open")
            const isOpen = dropDownMenu.classList.contains("open")
            toggleBtnIcon.classList=isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
        }

        function openPopup(identificador){
            document.getElementById(identificador).style.display="block"
            document.getElementById("overlay").style.display="block"
        }
        function modalFecha(e){
            console.log(e.id.split("-")[0])
            document.getElementById("dia_a_colocar").textContent = e.textContent.split(" ")[0]
            document.getElementById("modal_fechas").style.display="block"
            document.getElementById("overlay").style.display="block"
            nombre_parafecha=e.id.split("-")[0]
            dia_instancia=e.id.split("-")[1]

            
        }
        
        function agregarFecha(){
            
            
            
            let fecha = new Horario(nombre_parafecha,dia_instancia,horaIn.value,horaFin.value)
            lista_fechas.push(fecha)
            localStorage.setItem("fechas", JSON.stringify(lista_fechas))
            
            let td = document.getElementById(nombre_parafecha+'-'+dia_instancia)
            td.innerHTML=`${dia_instancia}<br> Hora de inicio: ${horaIn.value} <br> Hora de fin: ${horaFin.value}`
            console.log(lista_fechas)
        }
        
        
       
        let data_fechas = localStorage.getItem('fechas')
        let lista_fechas = JSON.parse(data_fechas)
        let nombre_parafecha=""
        let dia_instancia=""
        console.log(nombre_parafecha)
        
        function closePopup(identificador){
            console.log(identificador)
            if(identificador == 'todos'){
                lista = ['agregar-estudiante','eliminar-estudiante','modificar-estudiante','modal_fechas']
                lista.forEach(element => {
                    document.getElementById(identificador).style.display="none"
                    document.getElementById("overlay").style.display="none"

                });
                
                
            }else{
                document.getElementById(identificador).style.display="none"
                document.getElementById("overlay").style.display="none"

            }
            
        }
        
        function cerrarModal() {
        // Cerrar el modal
        document.querySelector("#popup").style.display = "none";
        }
        
