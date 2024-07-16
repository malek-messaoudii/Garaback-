const Vehicule = require('../Models/vehicule');
const User = require ('../Models/user')
exports.addVehicule = async (req, res) => {
    const {
        make,
        model,
        immatriculation,
        kilo,
        boite,
        energie,
        datedernierrev,
        email  // Assuming email is passed from the frontend
    } = req.body;

    try {
        // Find the user based on the email (or ID, adjust as per your setup)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new Vehicule object and associate it with the user
        const newVehicule = new Vehicule({
            make,
            model,
            immatriculation,
            kilo,
            boite,
            energie,
            datedernierrev,
            email
        });

        // Save the new vehicle
        const savedVehicule = await newVehicule.save();
        res.status(201).json(savedVehicule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllVehicules = async (req, res) => {
    try {
        const vehicules = await Vehicule.find();
        res.status(200).json(vehicules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVehiculeById = async (req, res) => {
    try {
        const { vehiculeId } = req.params;
        const vehicule = await Vehicule.findById(vehiculeId);

        if (!vehicule) {
            return res.status(404).json({ message: 'Vehicule not found' });
        }

        res.status(200).json(vehicule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateVehicule = async (req, res) => {
    const { vehiculeId } = req.params;
    const {
        make,
        model,
        immatriculation,
        kilo,
        boite,
        energie,
        datedernierrev, 
        email
    } = req.body;

    try {
        const updatedVehicule = await Vehicule.findByIdAndUpdate(vehiculeId, {
            make,
            model,
            immatriculation,
            kilo,
            boite,
            energie,
            datedernierrev,
            email
        }, { new: true });

        if (!updatedVehicule) {
            return res.status(404).json({ message: 'Vehicule not found' });
        }

        res.status(200).json(updatedVehicule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteVehicule = async (req, res) => {
    const { vehiculeId } = req.params;

    try {
        const deletedVehicule = await Vehicule.findByIdAndDelete(vehiculeId);

        if (!deletedVehicule) {
            return res.status(404).json({ message: 'Vehicule not found' });
        }

        res.status(200).json({ message: 'Vehicule deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getVehiculeByUserEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const vehicules = await Vehicule.find({ email }); 

        if (vehicules.length === 0) {
            return res.status(404).json({ message: 'No vehicles found for this user' });
        }

        res.status(200).json(vehicules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
