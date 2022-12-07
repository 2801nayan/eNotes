const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Note = require('../modules/Notes');
const { body, validationResult } = require('express-validator');

// Endpoint 1 : Get All Notes of Logged in User
router.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error Occured.." })
    }
})

// Endpoint 2 : Add Notes
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Description must be of atleast 5 character.').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)

        } catch (error) {
            res.status(500).send({ error: "Internal Server Error Occured.." })
        }
    })

// Endpoint 3 : Update an existing note
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body

    //create new note obj
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    //find the note to be update and update it.
    let note = await Note.findById(req.params.id)
    if (!note) {
        return res.status(404).json("Note you are trying to update isn't found!!")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).json("Not Allowed!!!")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ Updated_Note: note })
})

// Endpoint 4 : Delete an existing note

router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    try {

        //find the note to be deleted and delete it.
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Note you are trying to update isn't found!!")
        }

        //Allow deletion only if this note belongs to logged in user.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed!!!")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ Success: "Note Has Been Deleted...", Deleted_Note: note })
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error Occured.." })
    }
})
module.exports = router