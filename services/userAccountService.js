const userCollection = require('../models/userModel')

exports.viewUserProfile = async (_id) => {
    try {
        let userProfile = await userCollection.findById(_id);
        return userProfile
    } catch (err) {
        console.log(err);

    }
}

exports.updateUserProfile = async (username, phoneNumber, _id) => {
    try {
        console.log(username, phoneNumber, _id);

        let anotherUser = await userCollection.findOne({ _id: { $ne: _id }, phoneNumber });
        if (anotherUser) {
            return { error: "Phone number aldready exist" }
        }
        await userCollection.updateOne({ _id }, { username, phoneNumber });
    } catch (err) {
        console.log(err);
    }
}
