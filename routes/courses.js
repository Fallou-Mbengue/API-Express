const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'courses1' },
    { id: 2, name: 'courses2' },
    { id: 3, name: 'courses3' },
]

router.get('/', (req, res) => {
    res.send(courses)
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('le cours existe pas')
    res.send(course)
});

// creation http POST
router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.send(400).send(result.error.details[0].message)


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
});

// creation http PUT
router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('le cours existe pas')

    const { error } = validateCourse(req.body);
    if (error) return res.send(400).send(result.error.details[0].message)

    // Update course
    course.name = req.body.name;
    // Return the update course
    res.send(course);
});

// creation http DELETE
router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('le cours existe pas')

    //delet course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course)
}

module.exports = router;