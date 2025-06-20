function requireRole(roles) {
  return (req, res, next) => {
    const role = req.headers['x-role'] || 'contributor';
    if (!roles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    req.user = { role };
    next();
  };
}

module.exports = { requireRole }; 