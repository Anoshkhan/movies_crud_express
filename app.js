import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());


//connect to mongoDb

const Connection=async()=>{
    try {
        await mongoose.connect('mongodb://anoshkhandb:54321@ac-t5uxa54-shard-00-00.sektjwh.mongodb.net:27017,ac-t5uxa54-shard-00-01.sektjwh.mongodb.net:27017,ac-t5uxa54-shard-00-02.sektjwh.mongodb.net:27017/?ssl=true&replicaSet=atlas-gxbtcf-shard-0&authSource=admin&retryWrites=true&w=majority',
        {useUnifiedTopology:true });
        console.log('Connected to db');
    } catch (error) {
        console.log('Connection to db failed', error.message);
    }
}
Connection();

//create a movies collection
const moviesSchema = new mongoose.Schema({
    name: String,
    year: Number,
    rating: Number,
});

const movieModel = mongoose.model('movies', moviesSchema);

app.post('/movies',(req, res) => {
    const body = req.body;

    //create or saving data
    movieModel.create(body);
    res.status(201);
    res.send({
        message: 'Movie created ' + body.name,
    })
});

app.get('/movies', async (req, res) => {
   const movies = await movieModel.find({
    //for a single movie name inception
   // name: 'Inception',
   });
   res.status(200);
   res.send({
    message: 'Data fetched',
    data: movies,
   });

});
app.delete('/movies', async (req, res) => {
    const body = req.body;
    await movieModel.findByIdAndDelete(body.id);
    res.status(200);
    res.send({
        message: 'Movie deleted',
    });
});

app.patch('/movies', async (req, res) => {
    const body = req.body;
    const id = body.id;
    await movieModel.findByIdAndUpdate(id, body);
    res.status(200);
    res.send({
        message: 'Movie updated',
    });
});

app.listen(4000, console.log('Server started at port 4000'));