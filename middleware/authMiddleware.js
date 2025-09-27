// Middleware d'authentification
export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ 
      message: "Accès non autorisé. Veuillez vous connecter." 
    });
  }
};

// Middleware pour rediriger les utilisateurs connectés
export const redirectIfAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.status(200).json({ 
      message: "Utilisateur déjà connecté",
      user: req.session.user 
    });
  } else {
    return next();
  }
};

// Middleware pour obtenir les informations utilisateur actuelles
export const getCurrentUser = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  next();
};
