const ContactForm = require('../Models/contactform')

exports.addContactForm = async (req, res) => {
    const { nom, prenom, email, telephone, message } = req.body;
  
    const newContactForm = new ContactForm({
      nom,
      prenom,
      telephone,
      email,
      message
    });
  
    try {
      const savedContactForm = await newContactForm.save();
      res.status(201).json(savedContactForm);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };