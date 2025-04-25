const getMe = (req, res) => {
  console.log("/me route hit");
  console.log("Authenticated user:", req.user);
    res.json({
      sellerName: req.user.SellerName,
      email: req.user.email,
      role: req.user.role,
      company: req.user.company,
    });
  };
  
  module.exports = { getMe };