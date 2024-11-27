// backend/routes/partners.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Partner = require('../models/Partner'); // Importez le modèle Partner


// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nom unique pour chaque fichier
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers PDF sont autorisés'));
    }
  },
});

// GET : Récupérer tous les partenaires
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des partenaires' });
  }
});



// dernier ajout chat gpt
router.get('/:id', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id).populate('jobs');
    if (!partner) {
      return res.status(404).json({ error: 'Partenaire introuvable' });
    }
    res.json(partner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du partenaire' });
  }
});


// POST : Ajouter un nouveau partenaire
router.post('/', upload.single('contract'), async (req, res) => {
  try {
    const { name, type, contact, address, responsable } = req.body;
    const contract = req.file ? req.file.path : null; // Chemin du fichier si présent

    const newPartner = new Partner({ name, type, contact, address, responsable, contract });
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du partenaire' });
  }
});

// GET : Récupérer les noms de tous les partenaires>
router.get('/names', async (req, res) => {
  try {
    const partners = await Partner.find({}, 'name'); // Récupérer uniquement les noms
    res.json(partners);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des noms des partenaires' });
  }
});

module.exports = router;
