const bcrypt = require('bcrypt');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const Clientpriv = require('../Models/clientpriv');
const Clientpro = require ('../Models/clientpro');
const Garagiste = require('../Models/garagiste')


exports.login = async (req, res) => {
        const { email, mdp } = req.body;
      
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          const isMatch = await bcrypt.compare(mdp, user.mdp);
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          }
      
          const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
      
          res.json({ mytoken: token, role: user.role });
        } catch (error) {
          console.error('Error logging in:', error);
          res.status(500).json({ message: 'Server error' });
        }
      
};


const getModelByRole = (role) => {
    switch (role) {
        case 'clientprivate':
            return Clientpriv;
        case 'clientpro':
            return Clientpro;
        case 'garagiste':
            return Garagiste;
        default:
            throw new Error('Invalid role');
    }
};

exports.register = async (req, res) => {
    try {
        const data = req.body;

        if (!data.mdp) {
            return res.status(400).send('Password is required');
        }

        let role;
        if (data.datenais) {
            role = 'clientprivate';
        } else if (data.nomsoc) {
            role = 'clientpro';
        } else if (data.id || data.nafc) {
            role = 'garagiste';
        } else {
            return res.status(400).send('Unable to determine user role');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.mdp, salt);

        const UserModel = getModelByRole(role);

        const user = new UserModel({
            ...data,
            mdp: hashedPassword,
            cmdp: hashedPassword,
            role: role,
        });

        const savedUser = await user.save();
        res.status(200).send({ user: savedUser, role: role });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getUserByEmail = async (req, res) => {
    const  uemail  = req.params.email;
    try {
      const user = await User.findOne({ email: uemail });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).send(user);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
