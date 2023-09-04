const User = require("../models/userModel");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({
      email: email,
    });
    console.log(user);

    if (!user || user.password != md5(password)) {
      return res.status(400).json({
        message: "Invalid Details",
        success: false,
      });
    }

    user = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        access_token: jwt.sign(
          {
            email: email,
          },
          "supsersecret",
          { expiresIn: "30d" }
        ),
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: "User LogedIn Successfully!",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userData._id;

    let post = await Post.create({
      content,
      user: userId,
    });

    if (!post) {
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Post Created Successfully!",
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const user = req.userData;

    const posts = await Post.find();

    if (!posts) {
      return res.status(404).json({
        message: "No Post Available!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Post Get Successfully!",
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findOne({
      _id: postId,
    });

    if (!post) {
      return res.status(404).json({
        message: "No Post Available!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Post Get Successfully!",
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const content = req.body.content;

    let post = await Post.findOne({
      _id: postId,
    });

    if (!post) {
      return res.status(404).json({
        message: "No Post Available!",
        success: false,
      });
    }

    post = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        content: content,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Post Updated Successfully!",
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.userData._id;

    let post = await Post.findOne({
      _id: postId,
      user: userId,
    });

    if (!post) {
      return res.status(404).json({
        message: "No Post Available!",
        success: false,
      });
    }

    post.deleteOne();

    return res.status(200).json({
      message: "Post Deleted Successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  login,
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};
