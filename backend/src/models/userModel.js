// Mock user/role system
// No persistent user table; roles are provided via req.headers['x-role']
// Supported roles: 'admin', 'contributor'
// Example usage: set 'x-role' header in API requests 