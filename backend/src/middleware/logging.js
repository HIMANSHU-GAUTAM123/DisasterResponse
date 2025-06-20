function loggingMiddleware(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(JSON.stringify({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration,
      user: req.user?.role || 'guest',
      timestamp: new Date().toISOString()
    }));
  });
  next();
}

module.exports = { loggingMiddleware }; 