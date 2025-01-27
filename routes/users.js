// routes/users.js
const router = require("express").Router();
const Service = require("../models/Service"); // Correct import for the Service model

// CREATE a new service
router.post('/', async (req, res) => {
  try {
    const newService = new Service({
      name: req.body.name,
      amount: req.body.amount,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service', details: err.message });
  }
});

// READ all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services', details: err.message });
  }
});

// READ a single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service', details: err.message });
  }
});

// UPDATE a service by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true } // Ensures the updated data is validated
    );

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service', details: err.message });
  }
});

// DELETE a service by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service', details: err.message });
  }
});

module.exports = router;
