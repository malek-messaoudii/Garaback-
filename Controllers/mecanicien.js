const Mecanicien = require('../Models/mecanicien');
const User = require ('../Models/user')


const generateRandomId = () => {
    return Math.floor(Math.random() * 201);
  };
  
  const createMecanicien = async (req, res) => {
    try {
      const { nom, prenom, email, telephone, status, genre, emailperso } = req.body;
  
      const existingMecanicien = await Mecanicien.findOne({ email });
      if (existingMecanicien) {
        return res.status(400).json({ error: 'L\'email existe déjà. Veuillez en utiliser un autre.' });
      }
  
      const newMecanicien = new Mecanicien({
        id: generateRandomId(),
        nom,
        prenom,
        email,
        telephone,
        status,
        genre,
        emailperso
      });
  
      const savedMecanicien = await newMecanicien.save();
      res.status(201).json(savedMecanicien);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getMecaniciens = async (req, res) => {
  try {
    const mecaniciens = await Mecanicien.find();
    res.status(200).json(mecaniciens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMecanicienById = async (req, res) => {
  try {
    const { id } = req.params;
    const mecanicien = await Mecanicien.findOne({ id });
    if (!mecanicien) {
      return res.status(404).json({ message: 'Mecanicien not found' });
    }
    res.status(200).json(mecanicien);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMecanicien = async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, prenom, email, telephone, status, genre } = req.body;
  
      const updatedMecanicien = await Mecanicien.findByIdAndUpdate(
        id,
        { nom, prenom, email, telephone, status, genre },
        { new: true }
      );
  
      if (!updatedMecanicien) {
        return res.status(404).json({ message: 'Mecanicien not found' });
      }
  
      res.status(200).json(updatedMecanicien);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

  const deleteMecanicien = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedMecanicien = await Mecanicien.findByIdAndDelete(id);
  
      if (!deletedMecanicien) {
        return res.status(404).json({ message: 'Mecanicien not found' });
      }
  
      res.status(200).json({ message: 'Mecanicien deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = deleteMecanicien;
  

const getMecanByUserEmail = async (req, res) => {
    const { emailperso } = req.params;

    try {
        const mecaniciens = await Mecanicien.find({ emailperso: emailperso });

        if (mecaniciens.length === 0) {
            return res.status(404).json({ message: 'No mecaniciens found for this user' });
        }

        res.status(200).json(mecaniciens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
  createMecanicien,
  getMecaniciens,
  getMecanicienById,
  updateMecanicien,
  deleteMecanicien,
  getMecanByUserEmail,
};
