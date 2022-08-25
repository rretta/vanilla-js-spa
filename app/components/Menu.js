import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js"

export function Menu(){
   const $menu = document.createElement("nav")
   $menu.classList.add("menu");
   $menu.innerHTML = `
  <a href="#/">Home</a>
  <span>-</span>
  <a href="#/search">Busqueda</a>
  <span>-</span>
  <a href="#/contacto">Contacto</a>
  
   `
   
//    ajax({
//     url: api.CATEGORIES,
//     cbSuccess: (res) => {
//         res.forEach(el =>{
//             $menu.innerHTML += `<a href="${el.link}">${el.name}</a>
//             <span>-</span>`
//         })
//     }
// })



   return $menu
}