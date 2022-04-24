const express = require('express')
const app = express()

const port = 3000

const Knex = require("knex");
const knexConfig = require("../../knexfile");

const knex = Knex(knexConfig.development);

app.get('/blog/:id', async (req, res) => {
    const blog = (await knex.select('*').from('blogs').where('id', req.params.id).limit(1))[0];
    const author = (await knex.select('*').from('users').where('id', blog.author_id).limit(1))[0];
    const posts = await knex.select('*').from('posts').where('blog_id', blog.id);

    res.send({...blog, posts, author});
})

app.get('/blogs', async (req, res) => {
    const blogs = await knex.select().table('blogs');
    for (const blog of blogs) {
        blog.author = (await knex.select('*').from('users').where('id', blog.author_id).limit(1))[0];
    }
    res.send({ blogs });
});

app.get('/post/:id', async (req, res) => {
    const post = (await knex.select('*').from('posts').where('id', req.params.id).limit(1))[0];
    const blog = (await knex.select('*').from('blogs').where('id', post.blog_id))[0];
    const author = (await knex.select('*').from('users').where('id', blog.author_id))[0];

    res.send({...post, blog, author});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})