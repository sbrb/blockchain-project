const express = require('express');
const mongoose  = require('mongoose');

const route = require('./route/route');

const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://riju:riju@cluster0.s4hmv.mongodb.net/blockChain', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDb is Connected..'))
    .catch((error) => console.log(error));

app.use('/', route);

app.use((req, res) => res.status(400).json({ status: false, message: 'Invalid URL.' }));
app.listen(3000, () => console.log('Express is running on port 3000') );
