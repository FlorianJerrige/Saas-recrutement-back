const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Récupérer toutes les notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des notes' });
  }
});

// Ajouter une nouvelle note
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création de la note' });
  }
});

// Supprimer une note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la note' });
  }
});

module.exports = router;
