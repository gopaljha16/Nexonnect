const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
const crypto = require("crypto");
const { sendEmail, emailVerificationDone } = require("../utils/sendEmail");


const register = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ msg: "Please enter all the fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        return res.status(400).json({ msg: "Please verify your email before registering" });
      }
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      email,
      password: hashedPassword,
      isVerified: true
    });

    const savedUser = await newUser.save();

    // generate a token
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        email: savedUser.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all the fields" })
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    // generate a token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" })
  }
}



const logout = async (req, res) => {
  try {
    const {token} = req.cookies;
    console.log("Token from cookies:", token);
    if (!token) {
      return res.status(400).json({ msg: "No token provided" });
    }

    // mark token as blocked in Redis
    await redisClient.set(`token:${token}`, "Blocked");

    const payload = jwt.decode(token);
    if (payload && payload.exp) {
        await redisClient.expireAt(`token:${token}`, payload.exp);
    }

    // clear cookie
    res.cookie("token", "", { 
        maxAge: 0, 
        httpOnly: true, 
        sameSite: 'lax', 
        secure: process.env.NODE_ENV === 'production' 
    });

    res.status(200).json({ msg: "User Logged Out Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const sendVerificationEmail = async (req, res) => {
  try {
    const { firstName, email } = req.body;

    if (!firstName || !email) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }


    const token = jwt.sign(
      { firstName, email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // link valid for 15 minutes
    );

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    // Send email
    await sendEmail(
      email,
      "Verify your email",
      `<p>Hi ${firstName}, click <a href="${verificationLink}">here</a> to verify your email</p>`
    );

    res.status(200).json({ msg: "Verification email sent" , verificationLink:verificationLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};




const resetPassword = async (req, res) => {
  try {
     
  } catch (error) {

  }
}

const forgotPassword = async (req, res) => {
  try {

  } catch (error) {

  }
}

const googleLogin = async (req, res) => {
  try {

  } catch (error) {

  }
}


const verifyEmail = async (req, res) => {
  // const {email, otp} = req.body;

  // if (!email || !otp) {
  //     return res.status(400).json({msg: "Please enter all the fields"});
  // }

  // try {
  //     const savedOtp = await redisClient.get(`otp:${email}`);

  //     if (!savedOtp) {
  //         return res.status(400).json({msg: "OTP expired"});
  //     }
  //     if (otp !== savedOtp) {
  //         return res.status(400).json({msg: "Invalid OTP"});
  //     }

  //     const user = await User.findOneAndUpdate(
  //         {email},
  //         {isVerified: true},
  //         {new: true}
  //     );

  //     if (!user) {
  //         return res.status(404).json({msg: "User not found"});
  //     }

  //     await emailVerificationDone(email);
  //     await redisClient.del(`otp:${email}`);

  //     return res.status(200).json({msg: "Email verified successfully"});
  // } catch (error) {
  //     return res.status(500).json({msg: "Server error", error: error.message});
  // }
}


const sentOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please enter all the fields" });
  }

  try {
    const otp = crypto.randomInt(100000, 1000000).toString();

    await redisClient.set(`otp:${email}`, otp, "EX", 300); // 5min expiration
    await sendEmail(email, "Your OTP", `Your OTP is ${otp}`);

    return res.status(200).json({ msg: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};



const verifyPhone = async (req, res) => {

}


module.exports = { register, login, logout, verifyEmail, sentOtp, resetPassword, forgotPassword, verifyEmail, verifyPhone, googleLogin, sendVerificationEmail };