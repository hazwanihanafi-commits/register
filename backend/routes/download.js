import express from "express";
import { generatePDF } from "../services/pdfGenerator.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    console.log("Starting PDF generation...");

    const pdfPath = await generatePDF();

    res.download(
      pdfPath,
      "ICEE2026_Backup_Badges.pdf"
    );

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

export default router;
