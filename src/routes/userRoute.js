const express = require("express");
const { verifyToken } = require("../config/middleware");
const {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  login,
} = require("../controller/userController");
const { celebrate, Joi } = require("celebrate");
const router = express.Router();

router.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

router.post(
  "/createPost",
  celebrate({
    body: Joi.object().keys({
      content: Joi.string().required(),
    }),
  }),
  verifyToken,
  createPost
);

router.get("/getAllPost", verifyToken, getAllPost);

router.get("/getPost/:postId", verifyToken, getPostById);

router.post(
  "/updatePost/:postId",
  celebrate({
    body: Joi.object().keys({
      content: Joi.string().required(),
    }),
  }),
  verifyToken,
  updatePost
);

router.post("/removePost/:postId", verifyToken, deletePost);

module.exports = router;
