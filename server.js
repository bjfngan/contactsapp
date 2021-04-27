//Import statement for express module
const express = require('express');
const app = express();

//looks for environment var called PORT first
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Forwards routes to the correct files
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

//Home route
app.get('/', (req, res)=> res.json({ msg: "Welcome to the Contact API"}));







































































































