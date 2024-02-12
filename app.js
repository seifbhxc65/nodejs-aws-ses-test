const express = require('express');
const cors = require('cors');
const app = express();
const mailer = require('./routes/router');
app.use(cors());
app.use(express.json()) ;
app.use('',express.static('public'));
app.use( mailer);
       
const port = 3000;    
app.get('/', (req, res) => {
     res.send('Hello World!');
    });    
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
    });