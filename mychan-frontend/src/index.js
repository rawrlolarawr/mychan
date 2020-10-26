//Global Variables
const BASE_URL = "http://localhost:3000"
const POSTS_URL = `${BASE_URL}/posts`
const main = document.querySelector('main')

//HTML element builder class
class htmlFactory {
    static build(tag, klass, id, content = null){
        let element = document.createElement(tag)
        element.setAttribute('class', klass)
        element.setAttribute('id', id)
        if(content){
            element.innerText = content
        }
        return element
    }
}

//Initial Calls
document.addEventListener("DOMContentLoaded", () => {
    main.appendChild(buildForm('post', ['title', 'content'], POSTS_URL))
    fetchPosts()
})

//Posts Methods
const fetchPosts = function(){
    fetch(POSTS_URL).then(response => response.json()).then(json => createPostCards(json))
}

const createPostCards = function(posts){
    let postsArr = posts.data.reverse()
    for(const post of postsArr){
        let div = htmlFactory.build('div', 'card', `post-id-${post.id}`)
        let title = htmlFactory.build('h3', 'card-title', `card-title-${post.id}`, post.attributes.title)
        let content = htmlFactory.build('p', 'card-content', `card-content-${post.id}`, post.attributes.content)
        let comments = htmlFactory.build('ul', 'comment-list', `comment-list-${post.id}`)

        main.appendChild(div)
        div.appendChild(title)
        div.appendChild(content)
        div.appendChild(comments)

        for(const comment of post.attributes.comments){
            let li = htmlFactory.build('li', 'comment', `comment-id-${comment.id}`)
            comments.appendChild(li)
            li.innerText = comment.content
        }

        div.addEventListener('click', () => {
            fetchPost(post)
        })
    }
}

const buildForm = (model, fieldsArr, url) => {
    let form = htmlFactory.build('form', 'form')
    form.setAttribute('method', 'POST')
    form.setAttribute('action', url)

    for(const field of fieldsArr){
        let newField = htmlFactory.build('input', 'form-field')
        let label = htmlFactory.build('label', 'label')
        newField.setAttribute('type', 'text')
        newField.setAttribute('name', `${model}[${field}]`)
        label.setAttribute('name', field)
        label.innerText = `${field}: `
        form.appendChild(label)
        form.appendChild(newField)
    }

    let submit = htmlFactory.build('input', 'field')
    submit.setAttribute('type', 'submit')

    form.appendChild(submit)
    return form
}

//Post Methods
const fetchPost = function(post){
   fetch(`${POSTS_URL}/${post.id}`).then(response => response.json()).then(json => loadPostPage(json))
}

const loadPostPage = function(post){
    post = post.data
    clearDOM()
    let div = htmlFactory.build('div', 'post', `post-id-${post.id}`)
    let title = htmlFactory.build('h2', 'post-title', `post-title-id-${post.id}`, post.attributes.title)
    let content = htmlFactory.build('p', 'post-content', `post-content-id-${post.id}`, post.attributes.content)
    
    main.appendChild(div)
    div.appendChild(title)
    div.appendChild(content)
    main.appendChild(buildForm('comment', ['content'], `${POSTS_URL}/${post.id}/comments`))
    
    for(const comment of post.attributes.comments){
        createCommentCard(comment)
    }
}

//Comment Methods
const createCommentCard = function(comment){
    let div = htmlFactory.build('div', 'card', `comment-id-${comment.id}`)
    let content = htmlFactory.build('p', 'card-content', `card-content-${comment.id}`, comment.content)

    main.appendChild(div)
    div.appendChild(content)
}

const clearDOM = function(){
    while(main.firstChild){
        main.firstChild.remove()
    }
}
