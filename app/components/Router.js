import { ajax } from "../helpers/ajax.js"
import api from "../helpers/wp_api.js"
import { ContactForm } from "./ContactForm.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js"
import { SearchCard } from "./SearchCard.js";

const d= document,
w = window;
export async function Router(){

    


let {hash} = location;


let $main = d.getElementById("main");
// console.log(hash)

$main.innerHTML = ""
if(!hash || hash === "#/"){

 await ajax({
        url: api.POSTS,
        cbSuccess: (posts) =>{
            // console.log(posts)
            let html ="";
            posts.forEach(post => html += PostCard(post))
                // d.querySelector(".loader").style.display = "none";
                d.getElementById("main").innerHTML= html
           
        }
    })


} else if( hash.includes("#/search")){
    

    let query = localStorage.getItem("wpSearch");

    if (!query) {
        d.querySelector(".loader").style.display= "none";
        return false
    };





    await ajax({
        url: `${api.SEARCH}${query}`,
        cbSuccess: (busqueda) =>{
            // console.log(busqueda)
    // d.getElementById("main").innerHTML= Post(post)
    let html ="";

    if(busqueda.length === 0){
        html =`<p class="not-found">No se encontraron resultados para <mark>${query}</mark>🙅 </p>`
    }
    busqueda.forEach(post=> html += SearchCard(post))

    d.getElementById("main").innerHTML= html
           
        }
    })


} else if( hash ==="#/contacto"){





    
    $main.appendChild(ContactForm())
    // console.log(``)
} else{
    // console.log(api.POST)

    await ajax({
        url: `${api.POST}?slug=${hash.slice(2)}`,
        cbSuccess: (post) =>{
            // console.log(post)
    d.getElementById("main").innerHTML= Post(post)
           
        }
    })






    
}
d.querySelector(".loader").style.display = "none";

}