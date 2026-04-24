const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !password || !email || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "pls fill all the input fields",
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirmPassword not matched",
      });
    }
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "This user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();

    const profilePicture = `https://api.dicebear.com/7.x/initials/svg?seed=${cleanFirstName}%20${cleanLastName}`;

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email.trim(),
      password: hashedPassword,
      profilePic: profilePicture,
    });

    return res.status(200).json({
      success: true,
      message: "SignUp successfull",
      newUser: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "pls fill all the inpt fields",
      });
    }
    const isUserRegistered = await User.findOne({ email: email });
    if (!isUserRegistered) {
      return res.status(400).json({
        success: false,
        message: "email not registered",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserRegistered.password,
    );
    if (isPasswordMatched) {
      const payload = {
        email: email,
        userId: isUserRegistered._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      isUserRegistered.password = undefined;

      return res.status(200).json({
        success: true,
        message: "Log in successfull",
        token: token,
        userDetails: isUserRegistered,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "wrong password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong during fetching userId",
      });
    }

    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password",
    );
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all users",
      allUsers: allUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
