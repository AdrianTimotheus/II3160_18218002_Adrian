const { Router } = require('express');
const express = require('express');
const mongoDB = require('mongodb');

const router = express.Router();

//get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//add posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text
        // createdAt: new Date()
    });
    res.status(201).send();
});

//delete posts
router.delete('/:id', async (req,res) =>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongoDB.ObjectID(req.params.id) });
    res.status(200).send();     
});

//database functions
async function loadPostsCollection(){
    const client = await mongoDB.MongoClient.connect('mongodb+srv://adrian:falconpalkon@tst-18218002-adrian.feugw.mongodb.net/tst-18218002-adrian?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });

    return client.db('tst-18218002-adrian').collection('posts');
}

module.exports = router;

