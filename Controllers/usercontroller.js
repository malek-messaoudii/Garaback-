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
  const uemail = req.params.email;

  try {
    const user = await User.findOne({ email: uemail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user); 
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.updateUser1 = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  console.log('Updating user with ID:', userId);
  console.log('Update data:', updateData);

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.send(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: error.message });
  }
};


exports.updateUser = async (req, res) => {
  const { email } = req.params;
  const newData = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (newData.mdp) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newData.mdp, salt);
          user.mdp = hashedPassword;
          user.cmdp = hashedPassword; 
      }

      const UserModel = getModelByRole(user.role);
      Object.keys(newData).forEach(key => {
          if (key !== 'mdp' && key !== 'cmdp') {
              user[key] = newData[key];
          }
      });

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

  