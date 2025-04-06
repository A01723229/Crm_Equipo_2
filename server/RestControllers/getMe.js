const getMe = (req, res) => {
  console.log("/me route hit");
  console.log("Authenticated user:", req.user);
    res.json({
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      company: req.user.company,
    });
  };
  
  module.exports = { getMe };