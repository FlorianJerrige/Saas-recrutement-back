// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path'); // Ajout pour gérer les chemins
const connectDB = require('./config'); // Import de la fonction pour connecter MongoDB
const tasksRoutes = require('./routes/tasks');
const partnersRoutes = require('./routes/partners');
const candidatesRoutes = require('./routes/candidate');
const notesRoutes = require('./routes/notes');
const jobsRoutes = require('./routes/jobs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Middleware pour analyser les données JSON

// Connectez-vous à MongoDB
connectDB();

// Servir les fichiers du dossier "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route de test
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API To-Do SaaS");
});

// Routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/jobs', jobsRoutes); // Ajouter les routes pour les postes
app.use('/api/candidates', candidatesRoutes);
app.use('/api/notes', notesRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
});









