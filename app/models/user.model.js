    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema(
        {
            email: String,
            username: String,
            image: String,
            bookmark: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Apartment",
                },
            ],
        },
        { timestamps: true }
    );

    const User = mongoose.model("User", userSchema);

    module.exports = User;
