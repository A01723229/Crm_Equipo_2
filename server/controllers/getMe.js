const getMe = (req, res) => {
  console.log("/me route hit");
  console.log("Authenticated user:", req.user);

  res.json({
    sellerName: req.user.SellerName,
    email: req.user.Email,
    role: req.user.Role,
    company: req.user.Company,
  });
};

module.exports = { getMe };
