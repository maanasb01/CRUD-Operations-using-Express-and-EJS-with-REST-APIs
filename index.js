const path = require('path')
const express = require("express");
const { v4: uuid } = require('uuid'); //For generating ID's
const methodOverride = require('method-override')
const app = express();
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')

app.use(express.urlencoded())
app.use(express.json())

app.use(methodOverride('_method'))




// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments',(req,res)=>{
    res.render('comments/index.ejs', { comments })
})
app.get('/comments/new',(req,res)=>{
    res.render('comments/new.ejs')
})
app.post('/comments', (req,res)=>{
    const {username, comment}=req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');

})
app.get('/comments/:id', (req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c=>c.id===id);
    res.render('comments/show.ejs',{ comment })
})
app.get('/comments/:id/edit', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c=>c.id===id);
    res.render('comments/edit.ejs',{ comment })
})
app.patch('/comments/:id',(req,res)=>{
    const {id} = req.params
    const foundComment = comments.find(c => c.id === id);
    //get new text from req.body
    const newCommentText = req.body.comment;
    //update the comment with the data from req.body:
    foundComment.comment = newCommentText;
    res.redirect(`/comments/${id}`)
})
app.delete('/comments/:id', (req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c=> c.id !== id);
    res.redirect('/comments')
})

app.listen(port,()=>{
    console.log("listening at port",port)
})
