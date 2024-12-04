const express = require('express');
const passport = require('passport');
const UserGmail = require('../models/UserGmail');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/Dangnhap'
}), async (req, res) => {
    try {
        if (!req.userGmail || !req.userGmail._json) {
            return res.redirect('/Dangnhap');
        }

        const { sub, name, email } = req.userGmail._json;

        // Tìm hoặc tạo người dùng từ Google
        let userGmail = await UserGmail.findOne({ googleId: sub });
        if (!userGmail) {
            userGmail = new UserGmail({
                googleId: sub,
                name: name,
                email: email,
            });
            await userGmail.save();
        }

        // Tạo JWT token với thông tin loại đăng nhập
        const token = jwt.sign(
            { _id: userGmail._id, loginType: 'google' },
            "secret_key",
        );

        res.redirect(`http://localhost:3000/Trangchu?token=${token}`);
    } catch (error) {
        console.error('Error during Google login callback:', error);
        res.redirect('/Dangnhap');
    }
});

module.exports = router;