const Intervention = require('../Models/intervention');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDFs are allowed'), false);
    }
  }
});

exports.upload = upload; // Exporting upload to use as middleware

exports.addinterv = async (req, res) => {
  try {
    const { email, titre, kilo, emailperso} = req.body;
    const pdf = req.file ? `/uploads/${req.file.filename}` : null;

    const newInter = new Intervention({
      utilisateur: { email },
      titre,
      kilo,
      pdf,
      emailperso
    });

    await newInter.save();
    res.json({ success: true, data: newInter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getintervByUserEmail = async (req, res) => {
  const { emailperso } = req.params;

  try {
    const interventions = await Intervention.find({ 'emailperso': emailperso });

    if (interventions.length === 0) {
      return res.status(404).json({ message: 'No interventions found for this user' });
    }

    res.status(200).json(interventions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInterventions = async (req, res) => {
  try {
    const interventions = await Intervention.find();
    res.status(200).json(interventions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
