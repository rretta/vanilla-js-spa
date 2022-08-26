export function ContactForm(){
    const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-styles");

    $form.classList.add("contact-form");

    $styles.innerHTML =`
    /*** ESTILO FORMULARIO ENVIO ***/
    .contact-form {
      --form-ok-color: #4caf50;
      --form-error-color: #f44336;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
    }
    
    /**Aca marco TODO elemento que es hijo directo de contact-form**/
    .contact-form > * {
      padding: 0.5rem;
      margin: 1rem auto;
      display: block;
      width: 100%;
    
    }
    
    .contact-form textarea{
      resize: none;
    }
    
    .contact-form legend,
    .contact-form-response {
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
    }
    
    .contact-form input,
    .contact-form textarea{
      font-size: 1rem;
      font-family: sans-serif;
    }
    
    .contact-form input[type="submit"]{
      width: 50%;
      font-weight: bold;
      cursor: pointer;
    }
    
    .contact-form *::placeholder{
      color: black;
    }
    
    .contact-form [required]:valid{
      border: thin solid var(--form-ok-color)
    }
    
    .contact-form [required]:invalid{
      border: thin solid var(--form-error-color);
    }
    
    .contact-form-error {
      margin-top: -1rem;
      font-size: 80%;
      background-color: var(--form-error-color);
      color: white;
      transition: all 800ms ease;
    }
    
    .contact-form-error.is-active{
      display: block;
      animation: show-message 1s 1 normal 0s ease-out both;
    }
    
    .none {
      display: none;
    }
    
    @keyframes show-message {
      0% {
        visibility: hidden;
        opacity: 0;
      }
    100%{
      visibility: visible;
      opacity: 1;
    }
    
    
    }
      
    .contact-form-loader{
        text-align: center;
    }
    `


    $form.innerHTML= `
    <legend>Envianos tus comentarios</legend>
        <input id="nombre" type="text" name="text" placeholder="Ingrese nombre" title="El nombre solo acepta letra y espacios en blanco." pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>
      
        <input id="from" type="email" name="email" placeholder="Ingrese mail" title="Mail invalido" pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
      
        <input type="text" id="about" name="subject" placeholder="Asunto a tratar" title="El asunto es requerido" required>
      
       
        <textarea name="comments" id="mensaje" cols="50" rows="5" placeholder="Escribe tus comentarios" title="Tu comentario no debe exceder los 255 caracteres"  data-pattern="^.{1,255}$" required></textarea>
      
      
      
      
      <input type="submit" value="Enviar">
      
      <div class="contact-form-loader none">
        <img src="../app/assets/loader.svg" alt="Cargando">
      </div>
      
      <div class="contact-form-response none">
        <p>Los datos han sido enviados</p>
      </div>
      `



      function validationsForm(){
        const $form = d.querySelector(".contact-form"),
        $inputs = d.querySelectorAll(".contact-form [required]"),
        $nombre = d.getElementById("nombre"),
        $from = d.getElementById("from"),
        $about = d.getElementById("about"),
        $mensaje = d.getElementById("mensaje")
    
    $inputs.forEach(input =>{
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none")
        input.insertAdjacentElement("afterend", $span);
    
    
    });
    
    d.addEventListener("keyup", e =>{
        
        if (e.target.matches(".contact-form [required]")){
            let $input = e.target,
            
            /**El dataset.pattern es para el textarea ya que un textarea no puede validar un pattern y tiene que buscar ese pattern que le pusimos nosotros COMO UN DATASET (google that) */
            pattern = $input.pattern || $input.dataset.pattern;
           
            // console.log($input, pattern)
            if(pattern && $input.value != ""){
                // console.log("tiene patron")
                //*Creo una nueva expresion regular que trae el valor desde pattern*//
                let regex = new RegExp(pattern)
                //Si el valor de input no cumple con la expresion regular: parte verdadera y parte falsa
                return !regex.exec($input.value)
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active")
                 
            }
            if(!pattern){
    // console.log("no tiene patron")
                return $input.value === ""
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active")
            }
        }
    
    
    
    })
    
    
    d.addEventListener("submit", e=>{
        e.preventDefault();
    
        
        alert("Enviando formulario")
    
    
    
    const $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");
    
    $loader.classList.remove("none")
    
    
    fetch("https://formsubmit.co/ajax/<<<INGRESAR-TU-CORREO>>>>>, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: $nombre.value,
            from: $from.value,
            about: $about.value,
            message: $mensaje.value,
        })
    })
    .then(res =>res.ok? res.json():Promise.reject(res))
    .then(json =>{ console.log(json)
        $response.classList.remove("none");
        $loader.classList.add("none");
        $form.reset();
    })
    .catch(err=>{
        console.log(err)
    })
    
    
    
    
    // setTimeout(() => {
    //     $response.classList.remove("none");
    //     $loader.classList.add("none");
    //     $form.reset();
    
    
    //    setTimeout(() => $response.classList.add("none") , 3000);
    
    
    // }, 3000);
    
    
    })
        
    
    }

validationsForm();

      return $form
}
