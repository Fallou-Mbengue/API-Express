const Joi = require('joi')
const express = require('express')
const { status } = require('express/lib/response')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'courses1' },
    { id: 2, name: 'courses2' },
    { id: 3, name: 'courses3' },
]

// creation http GET
app.get('/', (req, res) => {
    res.send('hello word')
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('le cours existe pas')
    res.send(course)
});

// creation http POST
app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.send(400).send(result.error.details[0].message)


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
});

// creation http PUT
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('le cours existe pas')

    const {error} = validateCourse(req.body);
    if (error) return res.send(400).send(result.error.details[0].message)
    
    // Update course
    course.name = req.body.name;
    // Return the update course
    res.send(course);
});

// creation http DELETE
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('le cours existe pas')

    //delet course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course){
    const schema = Joi.object ({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course)
}

// configuration variable d'environnement 
const port = process.env.PORT || 3000
app.listen(port, () => console.log('creation de serveur dans un port specifique'))