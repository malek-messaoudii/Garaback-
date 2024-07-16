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
        return       res.status(200).json(rdvs);

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
        console.error('Error fetching all devis:', error);
        res.status(500).json({ message: 'Failed to fetch all devis' });
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

module.exports = {
    addRdv,
    deleteRdv,
    getByUserEmail,
    getAll,
    updateRdv
};