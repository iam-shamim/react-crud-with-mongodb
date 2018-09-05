import express from 'express';
var MongoClient = require('mongodb').MongoClient;
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'crudWithRedux';

function validate(data){
    let errors = {};
    if(data.title == '') errors.title = "Can't be empty";
    if(data.cover == '') errors.cover = "Can't be empty";
    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid };
}

MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
    if (err) throw err;
    var db = client.db('crudWithRedux');
    app.get('/api/games',(req,res) => {
        db.collection('games').find().toArray(function (err, games) {
            if (err) throw err;
            res.json({games});
        })
    });
    app.post('/api/games',(req,res) => {
        const { errors, isValid } = validate(req.body);
        if(isValid){
            const { title, cover } = req.body;
            db.collection('games').insert({ title, cover}, (err, result)=> {
                if(err){
                    res.status(500).json({ errors: { global: "Something wend wrong." }});
                }else{
                    console.log(result);
                    res.json({ game: result.ops[0] });
                }
            })
        }else{
            res.status(400).json({ errors });
        }
    });
    app.use((req,res) => {
        res.status(404).json({
           errors:{
               global: 'Something wrong.'
           }
        });
    });
    app.listen(8080, ()=> console.log('Server is running on localhost:8080'));
});

