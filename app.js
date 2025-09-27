import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

import sequelize from './config/db.js';
import sessionConfig from './config/sessionConfig.js';
import './models/index.js';

// Import routes
import userRoutes from './routers/userRoutes.js';
import authRoutes from './routers/authRoutes.js';

const app = express();

const port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './view');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure sessions
app.use(session(sessionConfig));

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Synchroniser la base de données avec force pour résoudre les problèmes de clés
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to synchronize the database:', err);
    console.log('Trying to create database schema...');
  });

// Routes pour les pages web
app.get('/', (req, res) => {
  res.render("index", { name: "Ayoub", classe: "JS" });
});

app.get('/login', (req, res) => {
  // Si l'utilisateur est déjà connecté, rediriger vers dashboard
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  
  const error = req.query.error;
  const message = req.query.message;
  res.render("login", { error, message });
});

app.get('/register', (req, res) => {
  // Si l'utilisateur est déjà connecté, rediriger vers dashboard
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  
  const error = req.query.error;
  res.render("register", { error });
});

app.get('/dashboard', (req, res) => {
  // Vérifier si l'utilisateur est connecté
  if (req.session && req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

// Route POST pour inscription depuis formulaire HTML
app.post('/register', async (req, res) => {
  try {
    const { nom, email, mot_de_passe, devise } = req.body;
    
    const { registerUser } = await import('./services/userService.js');
    const { data, statusCode } = await registerUser({ 
      nom, 
      email, 
      mot_de_passe, 
      devise 
    });
    
    if (statusCode === 201) {
      // Redirection vers login après inscription réussie
      res.redirect('/login?message=Inscription réussie, veuillez vous connecter');
    } else {
      // Redirection vers register avec message d'erreur
      res.redirect('/register?error=' + encodeURIComponent(data));
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.redirect('/register?error=Erreur lors de l\'inscription');
  }
});

// Route POST pour connexion depuis formulaire HTML
app.post('/login', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    
    const { loginUser } = await import('./services/userService.js');
    const { data, statusCode } = await loginUser({ email, mot_de_passe });
    
    if (statusCode === 200) {
      // Créer la session
      req.session.user = {
        id: data.id,
        nom: data.nom,
        email: data.email,
        devise: data.devise
      };
      
      // Redirection vers dashboard après connexion réussie
      res.redirect('/dashboard');
    } else {
      // Redirection vers login avec message d'erreur
      res.redirect('/login?error=' + encodeURIComponent(data));
    }
  } catch (error) {
    console.error('Login error:', error);
    res.redirect('/login?error=Erreur lors de la connexion');
  }
});

// Route GET pour déconnexion
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/login?message=Déconnexion réussie');
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});