// backend/routes/tasks.js
const express = require('express');
const router = express.Router();

// Modèle de tâche pour MongoDB
const Task = require('../models/Task'); // Assurez-vous d'avoir un modèle Task

// Route pour récupérer toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
  }
});

// Route pour ajouter une nouvelle tâche
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
  }
});

module.exports = router;
