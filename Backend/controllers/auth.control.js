const AuthSchema = require("../models/auth.model");
const bcrypt = require("bcrypt");

exports.authdetails = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const Resdata = new AuthSchema({
      username,
      email,
      password: hashedPassword, // Save hashed password
    });

    await Resdata.save();
    res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Auth error" });
  }
};

exports.authlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await AuthSchema.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If the email and password are correct, send the user details (username and email)
    res.status(200).json({
      message: "Login successful",
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
