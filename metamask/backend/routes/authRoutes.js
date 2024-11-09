const express = require('express');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key'; // Use a secure key in production

router.post('/login', async (req, res) => {
    const { address, signature, message } = req.body;

    try {
        // Verify the signature
        const signerAddress = ethers.utils.verifyMessage(message, signature);

        if (signerAddress.toLowerCase() === address.toLowerCase()) {
            // Generate JWT token
            const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Signature verification failed' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
