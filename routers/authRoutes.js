import express from 'express';
import { isAuthenticated, getCurrentUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour vérifier le statut d'authentification
router.get('/status', getCurrentUser, (req, res) => {
  if (req.user) {
    res.json({
      authenticated: true,
      user: req.user
    });
  } else {
    res.json({
      authenticated: false,
      user: null
    });
  }
});

// Route protégée pour obtenir le profil utilisateur
router.get('/profile', isAuthenticated, (req, res) => {
  res.json({
    message: "Profil utilisateur",
    user: req.session.user
  });
});

export default router;