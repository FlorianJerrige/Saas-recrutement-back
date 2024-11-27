const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Route pour ajouter un candidat
router.post('/', async (req, res) => {
  const { name, phone, email, location, skills, cv, linkedin, headline } = req.body;

  try {
    const newCandidate = new Candidate({
      name,
      phone,
      email,
      location,
      skills,
      cv,
      linkedin,
      headline,
    });

    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l’ajout du candidat.' });
  }
});

// Route pour récupérer tous les candidats
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des candidats.' });
  }
});

module.exports = router;


