module.exports = {

    posts: [{id:'dwqddwq',title:'title',description:'description'}],


    getAll() {
        return this.posts
    },
    newPost(title,description) {
        return this.posts.push({id:generetId(),title,description})
    },
}

function generetId() {
    return Math.random().toString(36).substr(2,9)
}