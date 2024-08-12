import UserModel from "../models/user_models.js";

export const GetUsers = async (req, res) => {
  const { user } = req.user;
  const isUser = await UserModel.findOne({ _id: user._id });
  if (!isUser) {
    return res.status(400).json({ error: true, message: `User is not found` });
  }
  return res.json({
    error: false,
    user: [
      {
        fullName: isUser.fullName,
        email: isUser.email,
        password: isUser.password,
        createdOn: isUser.createdOn,
      },
    ],
    message: "User detail retrived succesfully",
  });
};
