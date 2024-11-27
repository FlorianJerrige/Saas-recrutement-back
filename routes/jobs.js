const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Importez le modèle Job
const Partner = require('../models/Partner'); // Importez le modèle Partner

// GET : Récupérer tous les postes
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('partner', 'name'); // Inclure les informations du partenaire
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des postes' });
  }
});

// GET : Récupérer les postes par partenaire
router.get('/partner/:partnerId', async (req, res) => {
  try {
    const jobs = await Job.find({ partner: req.params.partnerId }).populate('partner', 'name');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des postes pour ce partenaire' });
  }
});

// POST : Ajouter un nouveau poste
router.post('/', async (req, res) => {
    try {
      const {
        title,
        description,
        experienceRequired,
        skills,
        location,
        salary,
        contractType,
        applicationLink,
        partnerName, // Nom du partenaire au lieu de l'ID
      } = req.body;
  
      // Recherche du partenaire par son nom
      const partner = await Partner.findOne({ name: partnerName });
      if (!partner) {
        return res.status(404).json({ error: 'Partenaire introuvable' });
      }
  
      // Créer un nouveau poste
      const jobs = new Job({
        title,
        description,
        experienceRequired,
        skills,
        location,
        salary,
        contractType,
        applicationLink,
        partner: partner._id, // Associer l'ID du partenaire
      });
  
      await jobs.save();
     // Ajoutez le poste à la liste des postes du partenaire
    partner.jobs.push(jobs._id);
    await partner.save();

    res.status(201).json({ message: 'Poste ajouté avec succès', jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’ajout du poste' });
  }
});
  

// PUT : Mettre à jour un poste
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ error: 'Poste introuvable' });
    }
    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du poste' });
  }
});

// DELETE : Supprimer un poste
router.delete('/:id', async (req, res) => {
  try {
    const jobs = await Job.findById(req.params.id);
    if (!jobs) {
      return res.status(404).json({ error: 'Poste introuvable' });
    }

    // Supprimer le job de la liste des jobs du partenaire
    await Partner.updateOne(
      { _id: jobs.partner },
      { $pull: { jobs: jobs._id } }
    );

    await jobs.remove(); // Supprimer le job
    res.json({ message: 'Poste supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du poste' });
  }
});


module.exports = router;
