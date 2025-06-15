const jwt = require('jsonwebtoken');
const user = require('../models/user');

const createToken = (user) => {
    return jwt.sign({ id:
        user._id},
        process.env.JWT_SECRET, {
            expiresIn:
            process.env.JWT_EXPIRES_IN,
        });
}

exports.signup = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;
        const userExists = await 
        user.findOne({ email });
        if (userExists) return
        res.status(400).json({message:
            'Email already in use'});

            const user = await
            UserActivation.create({ 
                first_name,
                last_name,
                email,
                password});
                const token = 
                createToken(user);

                res.status(201).json({ token,
                    user:
                    { id: user._id,
                      email: user.email }});
    } catch (err) {
        res.status(500).json({message:
            err.message});
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } =
        req.body;
        const user = await User.findOne({ email });
        if (!user || !(await
            user.comparePassword(password)))
            {
            return res.status(401).json({message:
                'Invalid credentials'});
        }
        const token = createToken(user);

        res.status(200).json({ token,
            user:
            { id: user._id,
                email: user.email } });
    } catch (err) {
        res.status(500).json({message:
            err.message});
    }
}
