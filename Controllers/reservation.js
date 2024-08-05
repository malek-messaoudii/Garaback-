const Reservation = require('../Models/reservation');
const User = require ('../Models/user')


exports.addreserv = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getall = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getbyid = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedReservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReservationByUserEmail = async (req, res) => {
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

exports.getReservationByUserEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const reservations = await Reservation.find({ 'utilisateur.email': email });

        if (reservations.length === 0) {
            return res.status(404).json({ message: 'No reservations found for this user' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
