const Promotion = require('../Models/promotion')

exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addPromotion = async (req, res) => {
  const { price, prestation, mois } = req.body;

  if (!price || !prestation || !prestation.titre || !mois) {
    return res.status(400).json({ message: 'Price, prestation.titre, and mois are required.' });
  }

  try {
    const newPromotion = new Promotion({ price, prestation, mois });
    await newPromotion.save();
    res.status(201).json(newPromotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findById(id);
    
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found.' });
    }

    await Promotion.findByIdAndDelete(id);
    res.status(200).json({ message: 'Promotion deleted successfully.' });
  } catch (error) {
    console.error('Error deleting promotion:', error); // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
