const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // 1️⃣ Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // 2️⃣ Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        picture,
        role: "user", // ✅ default role
      });
    }

    // 3️⃣ Create app JWT (VERY IMPORTANT)
    const appToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, // ✅ must include role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Send back to frontend
    res.json({
      token: appToken,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = { googleLogin };
