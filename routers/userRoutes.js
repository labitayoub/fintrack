import express from 'express';
import { registerUser, loginUser } from '../services/userService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nom, email, mot_de_passe, devise } = req.body;
    
    const { data, statusCode } = await registerUser({ 
      nom, 
      email, 
      mot_de_passe, 
      devise 
    });
    
    if (statusCode === 201) {
      return res.status(statusCode).json({ 
        message: "Compte créé avec succès. Veuillez vous connecter.", 
        user: {
          id: data.id,
          nom: data.nom,
          email: data.email,
          devise: data.devise
        }
      });
    } else {
      return res.status(statusCode).json({ message: data });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    
    const { data, statusCode } = await loginUser({ email, mot_de_passe });
    
    if (statusCode === 200) {
      // Create session
      req.session.user = {
        id: data.id,
        nom: data.nom,
        email: data.email,
        devise: data.devise
      };
      
      return res.status(statusCode).json({ 
        message: "Connexion réussie", 
        user: req.session.user
      });
      
    } else {
      return res.status(statusCode).json({ message: data });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: "Déconnexion réussie" });
  });
});



export default router;