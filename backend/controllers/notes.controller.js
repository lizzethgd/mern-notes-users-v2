const notesCtrl = {}

const NoteModel = require('../models/Note')

notesCtrl.getNotes = async(req, res) => {
    const notes = await NoteModel.find()
    res.json(notes)
}

notesCtrl.createNote = async (req, res) => {
    const {title, content, date, author} = req.body
    const newNote = new NoteModel({
        title: title,
        content: content,
        date: date,
        author: author
    })
    await newNote.save()
    res.json({message: 'Note Saved'})
}

notesCtrl.getNote = async (req, res) => {
    const note = await NoteModel.findById(req.params.id)
    res.json(note)
} 


notesCtrl.updateNote = async(req, res) => {
    const {title, content, date, author} = req.body
    await NoteModel.findByIdAndUpdate(req.params.id, {
        title,
        content,
        date,
        author
    })    
    res.json({message: 'Note Updated'})
}    

notesCtrl.deleteNote = async(req, res) => {
    await NoteModel.findByIdAndDelete(req.params.id)
    res.json({message: 'Note Deleted'})
}    

module.exports = notesCtrl