const multer = require('multer');
const path = require('path');
const User = require ('../Models/user')
const Devis = require ('../Models/devis')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array('images', 10); 

exports.addDevis2 = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to upload images' });
    }

    try {
      const randomNum = Math.floor(Math.random() * 1000000);

      const images = req.files.map(file => file.path);

      const newDevis = new Devis({
        ...req.body,
        numdevis: randomNum,
        images: images
      });

      await newDevis.save();
      res.status(201).json(newDevis);
    } catch (err) {
      console.error('Error adding devis:', err);
      res.status(500).json({ message: 'Failed to add devis' });
    }
  });
};

exports.addDevis = async (req, res) => {
  try {
    const randomNum = Math.floor(Math.random() * 1000000);

    const newDevis = new Devis({
      ...req.body,
      numdevis: randomNum,
    });

    await newDevis.save();
    res.status(201).json(newDevis);
  } catch (err) {
    console.error('Error adding devis:', err);
    res.status(500).json({ message: 'Failed to add devis' });
  }
};



exports.getDevisByUserEmail = async (req, res) => {
  const { email } = req.params;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      const demandes = await Devis.find({ 'utilisateur.email': email });

      if (demandes.length === 0) {
          return res.status(404).json({ message: 'Pas de demandes pour cet utilisateur' });
      }

      res.status(200).json(demandes);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const devis = await Devis.find();
    res.status(200).json(devis);
  } catch (error) {
    console.error('Error fetching all devis:', error);
    res.status(500).json({ message: 'Failed to fetch all devis' });
  }
};


exports.valider = async (req, res) => {
  try {
    const devis = await Devis.findByIdAndUpdate(req.params.id, { status: 'Validé' }, { new: true });
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.refuser = async (req, res) => {
  try {
    const devis = await Devis.findByIdAndUpdate(req.params.id, { status: 'Refusé' }, { new: true });
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.recu =  async (req, res) => {
  try {
    const devis = await Devis.findByIdAndUpdate(req.params.id, { devisrec: 'Reçu' }, { new: true });
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



exports.programme =  async (req, res) => {
  try {
    const devis = await Devis.findByIdAndUpdate(req.params.id, { rdv: 'Programmé à une date affichée dans vos rendez-vous' }, { new: true });
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
