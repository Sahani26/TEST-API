// routes/posts.js
const router = require("express").Router();
const Quotation = require("../models/Post"); // Correct import for the Quotation model

// CREATE QUOTATION
router.post("/", async (req, res) => {
  try {
    const { serviceId, serviceName, quantity, total } = req.body;

    // Create and save the new quotation
    const newQuotation = new Quotation({ serviceId, serviceName, quantity, total });
    const savedQuotation = await newQuotation.save();

    res.status(201).json(savedQuotation);
  } catch (err) {
    res.status(500).json({ error: "Failed to create quotation", details: err.message });
  }
});

// UPDATE QUOTATION
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, total } = req.body;

    const updatedQuotation = await Quotation.findByIdAndUpdate(
      id,
      { $set: { quantity, total } },
      { new: true }
    );

    if (updatedQuotation) {
      res.status(200).json(updatedQuotation);
    } else {
      res.status(404).json({ error: "Quotation not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update quotation", details: err.message });
  }
});

// DELETE QUOTATION
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuotation = await Quotation.findByIdAndDelete(id);

    if (deletedQuotation) {
      res.status(200).json({ message: "Quotation deleted successfully" });
    } else {
      res.status(404).json({ error: "Quotation not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete quotation", details: err.message });
  }
});

// GET QUOTATION BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await Quotation.findById(id);

    if (quotation) {
      res.status(200).json(quotation);
    } else {
      res.status(404).json({ error: "Quotation not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quotation", details: err.message });
  }
});

// GET ALL QUOTATIONS
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quotations", details: err.message });
  }
});

module.exports = router;
