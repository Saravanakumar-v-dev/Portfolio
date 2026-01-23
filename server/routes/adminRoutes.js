import express from "express";
import Contact from "../models/contact.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/messages", protectAdmin, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.delete("/messages/:id", protectAdmin, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
