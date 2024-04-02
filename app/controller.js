const express = require('express');
const router = express.Router();
const User = require('../app/models/user.model');
const Apartment = require('../app/models/apartment.model');

router.use(express.json());

router.post('/insert', async (req, res) => {
    try {
        // Buat pengguna baru
        const newUser = await User.create({
            email: req.body.user.email,
            username: req.body.user.username,
            image: req.body.user.image
        });

        // Dapatkan ID pengguna baru
        const userId = newUser._id;

        // Dapatkan data apartemen dari body request
        const apartmentsData = req.body.user.bookmark;

        // Buat array untuk menyimpan ID apartemen yang telah dibuat
        const apartmentIds = [];

        // Iterasi melalui setiap apartemen yang akan disimpan
        for (const apartmentData of apartmentsData) {
            // Tambahkan ID pengguna ke data apartemen
            apartmentData.user = userId;

            // Buat apartemen baru
            const newApartment = await Apartment.create(apartmentData);

            // Dapatkan ID apartemen baru dan tambahkan ke array apartmentIds
            apartmentIds.push(newApartment._id);
        }

        // Tambahkan ID apartemen ke dalam daftar bookmark pengguna
        newUser.bookmark = apartmentIds;

        // Simpan perubahan pada pengguna
        await newUser.save();

        // Kirim respons berhasil
        return res.status(201).json({ message: 'User and bookmark inserted successfully.', newUser });
    } catch (error) {
        // Tangani kesalahan
        return res.status(500).json({ message: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        // Find all users and populate the 'bookmark' field for each user
        const users = await User.find().populate('bookmark');

        res.json({ users });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID and populate the 'bookmark' field
        const user = await User.findById(userId).populate('bookmark');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;