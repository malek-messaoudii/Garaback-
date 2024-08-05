const Rdv = require('../Models/rdv')

const addRdv = async (rdvData) => {
    try {
        const newRdv = new Rdv(rdvData);
        await newRdv.save();
        return { success: true, data: newRdv };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


const addrdv1 = async (req, res) => {
    try {
        const randomNum = Math.floor(Math.random() * 1000000);

        const { datesouhaite, heuresouhaite, ...rest } = req.body;

        // Convert datesouhaite to Date object if necessary
        let dateSouhaiteConverted = datesouhaite;
        if (typeof datesouhaite === 'string') {
            dateSouhaiteConverted = new Date(datesouhaite);
        }

        // Convert heuresouhaite to number if necessary
        let heureSouhaiteConverted = heuresouhaite;
        if (typeof heuresouhaite === 'string') {
            heureSouhaiteConverted = parseInt(heuresouhaite, 10);
        }

        // Ensure heuresouhaite is provided
        if (heureSouhaiteConverted == null || isNaN(heureSouhaiteConverted)) {
            return res.status(400).json({ success: false, error: 'heuresouhaite is required and must be a valid number' });
        }

        // Create a new rendez-vous object with converted fields and numdevis
        const newRdv = new Rdv({
            ...rest,
            datesouhaite: dateSouhaiteConverted,
            heuresouhaite: heureSouhaiteConverted,
            numdevis: randomNum,
        });

        await newRdv.save();
        res.status(201).json({ success: true, data: newRdv });
    } catch (error) {
        console.error('Error adding rendez-vous:', error);
        res.status(400).json({ success: false, error: error.message });
    }
};





const deleteRdv = async (id) => {
    try {
        await Rdv.findByIdAndDelete(id);
        return { success: true, message: 'Appointment deleted successfully' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const getByUserEmail = async (req, res) => {
    const { email } = req.params;
  
    try {
      const rdvs = await Rdv.find({ email: email });
      return res.status(200).json(rdvs);
    } catch (error) {
      console.error('Error fetching rendez-vous by email:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  };

  const getAll = async (req, res) => {
    try {
      const rdv = await Rdv.find();
      res.status(200).json(rdv);
    } catch (error) {
      console.error('Error fetching all rdv:', error);
      res.status(500).json({ message: 'Failed to fetch all rdv' });
    }
  };
  



const updateRdv = async (id, updatedData) => {
    try {
        const updatedRdv = await Rdv.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, data: updatedRdv };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const getByNumDevis = async (req, res) => {
    const { numdevis } = req.params;

    try {
        const rdv = await Rdv.findOne({ numdevis: numdevis });
        if (rdv) {
            return res.status(200).json(rdv);
        } else {
            return res.status(404).json({ success: false, message: 'Rendez-vous not found' });
        }
    } catch (error) {
        console.error('Error fetching rendez-vous by numdevis:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const updateByNumDevis = async (req, res) => {
    const { numdevis } = req.params;
    const updatedData = req.body;

    try {
        const updatedRdv = await Rdv.findOneAndUpdate({ numdevis: numdevis }, updatedData, { new: true });
        if (updatedRdv) {
            return res.status(200).json({ success: true, data: updatedRdv });
        } else {
            return res.status(404).json({ success: false, message: 'Rendez-vous not found' });
        }
    } catch (error) {
        console.error('Error updating rendez-vous by numdevis:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getRdvByEmailPerso = async (req, res) => {
    const { emailperso } = req.params;

    try {
        const rdvs = await Rdv.find({ emailperso: emailperso});
        if (rdvs.length > 0) {
            return res.status(200).json(rdvs);
        } else {
            return res.status(404).json({ success: false, message: 'No rendez-vous found for this email' });
        }
    } catch (error) {
        console.error('Error fetching rendez-vous by emailperso:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};


const getEmailsByEmailPerso = async (req, res) => {
    const { emailperso } = req.params;
  
    try {
        const emails = await Rdv.find({ emailperso: emailperso }).distinct('email');
        return res.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails by emailperso:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getRdvById = async (req, res) => {
    const { _id } = req.params;
  
    try {
      const rdv = await Rdv.findById(_id);
      if (rdv) {
        return res.status(200).json(rdv);
      } else {
        return res.status(404).json({ success: false, message: 'Rendez-vous not found' });
      }
    } catch (error) {
      console.error('Error fetching rendez-vous by ID:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  };

  
module.exports = {
    addRdv,
    deleteRdv,
    getByUserEmail,
    getAll,
    updateRdv,
    getByNumDevis,
    updateByNumDevis,
    getRdvByEmailPerso,
    getEmailsByEmailPerso,
    addrdv1,
    getRdvById
};
