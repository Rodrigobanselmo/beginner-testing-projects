
document.addEventListener('DOMContentLoaded', ()=>{
    updatePosts();
})

function updatePosts() {
    fetch("http://192.168.0.22:3000/api/all").then(res =>{
        return res.json()
    }).then(json => {
        console.log(json,'json')

        let postElements= '';
        let posts = JSON.parse(json);
        posts.forEach(post => {
            let postElement = `
            <div id="${post.id}">
                <div class="card-header">
                    <h5 class="card-title">${post.title}</h5>
                </div>
                <div class="card-body">
                    <h5 class="card-text">${post.description}</h5>
                </div>
            </div>
            `
            postElements += postElement
        });

        document.getElementById("posts").innerHTML = postElements
    })
}

function newPost() {

    let title = document.getElementById("title").value
    let description = document.getElementById("desc").value
    let post = {title,description}
    const options = {
        method:"POST",
        headers:new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(post)
    }

    fetch("http://192.168.0.22:3000/api/new", options).then(res =>{
        console.log(res)
        updatePosts()
        document.getElementById("title").value =""
        document.getElementById("desc").value=""
    }).catch((err)=>console.log(err,'err'))
}