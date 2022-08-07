const path = require('path');
const express = require('express');
const morgan = require('morgan')

const app = express();

app.use(morgan('tiny'));
app.use(express.static('build'));

app.use('/api/v0', require('./api').router)

const PORT = parseInt(process.env.PORT || "8000");
app.listen(PORT);
console.log(`server started: http://localhost:${PORT}`);