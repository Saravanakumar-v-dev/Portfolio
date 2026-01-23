import Contact from "../models/contact.js";
import sendEmail from "../utils/sendEmail.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Save to database
    const savedMessage = await Contact.create({
      name,
      email,
      message,
    });

    // 2. Try sending email (DO NOT crash if it fails)
   try {
  await sendEmail({
    to: process.env.OWNER_EMAIL,
    subject: "🚀 New Portfolio Message",
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
} catch (err) {
  console.error("Email failed, message saved");
}
    // 3. Always respond success if DB save worked
    return res.status(200).json({
      success: true,
      message: "Message received successfully",
    });

  } catch (error) {
    console.error("CONTACT CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
