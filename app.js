const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const db = require('./models');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    db.Todo.findAll().then(r => res.json(r));
});

app.get('/newtodo', (req, res) => {
    res.render('newtodo', {
        title: 'Create a new Todo',
    });
});

app.post('/newtodo', (req, res) => {
    const { name } = req.body;
    db.Todo.create({
        name: name
    }).then(r => res.json(r));
});

app.get('/:id', (req, res) => {
    db.Todo.findByPk(req.params.id).then(r => res.json(r));
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});