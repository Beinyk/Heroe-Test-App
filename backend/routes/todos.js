const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()
const multer = require('multer')


const upload = multer({ dest: './public/uploads' })

router.get('/', async (req, res) => {
    Todo.find((err, todos) => {
        if(err) {
            console.log(err)
        } else {
            return res.json(todos);
        }
    })
})

router.post('/heroe/add', upload.any(), async (req, res) => {
    try {
        const todo = new Todo(req.body);
        const [file] = req.files;
        todo.pathImage = file.path;
        const result = await todo.save();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.massage);
    }
})

router.delete('/delete/:id', (req, res) => {

    Todo.findByIdAndRemove({_id: req.params.id}, (err, todo) => {
        if(err) res.json(err);
        else res.json('heroe was deleted');
     });

})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Todo.findById(id, (err, todo) => {
        return res.json(todo)
    })

})

router.put('/update/:id', upload.any(), async (req, res) => {
    const id = req.params.id;
    const newTodo = new Todo(req.body)
    const [file] = req.files;
    Todo.findById(id, (err, todo) => {

        todo.nickname = newTodo.nickname;
        todo.realName = newTodo.realName;
        todo.originDescription = newTodo.originDescription;
        todo.superpowers = newTodo.superpowers;
        todo.catchPhrase = newTodo.catchPhrase;

        if(file !== undefined) {
            todo.pathImage = file.path;
        }


        todo.save().then(todo => {
           return res.json(todo)
        }).catch(err => {
           return res.json(err.massage)
        })
    })
})

router.post('/heroe/add', upload.any(), async (req, res) => {
    try {
        const todo = new Todo(req.body);

        const [file] = req.files;
        todo.pathImage = file.path;
        const result = await todo.save();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.massage);
    }
})


module.exports = router