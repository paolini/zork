const path = require('path');
const express = require('express');
var morgan = require('morgan')

const app = express();

app.use(morgan('tiny'));
app.use(express.static('build'));

app.get('/api/v0/status', (req, res) => {
    res.send({
        title: "hello there!!!!"
    })
})


const PORT = 8000;
app.listen(PORT);
console.log(`server started: http://localhost:${PORT}`);