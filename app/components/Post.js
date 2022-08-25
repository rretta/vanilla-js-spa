import api from "../helpers/wp_api.js"

export function Post(props) {

    let {date, title, content} = props[0],
    dateFormat = new Date(date).toLocaleString();
    

 return `
<section class="post-page">
<aside>
<h2>${title.rendered}</h2>
<time datetime="${date}">${dateFormat}</time>
</aside>
<hr>
<article>${content.rendered}</article>
</section>
`
}