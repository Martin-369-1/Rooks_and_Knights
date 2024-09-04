const { find } = require('../models/CategoryModel');
const userCollection = require('../models/userModel')

exports.userList = async (search,currentPage, noOfList, skipPages) => {
    let findQuery = { isAdmin: false };

    if (search) {
        findQuery["$or"] = [
            { 'username': { "$regex": new RegExp(search, 'i') } },
            { 'email': { "$regex": new RegExp(search, 'i') } }
        ];
    }
    
    try {
        let totalNoOfList = await userCollection.countDocuments({ isAdmin: false })
        let userList = await userCollection.find(findQuery).skip(skipPages * noOfList).limit(currentPage * noOfList);
        
        return {userList,currentPage,totalNoOfList};
    } catch (err) {
        console.log(err);
        throw err; // Optionally re-throw the error if you want the caller to handle it
    }
}


exports.blockUnblockUser = async (_id) => {
    try {
        let userdata = await userCollection.findOne({ _id })

        if (userdata) {
            await userCollection.updateOne({ _id }, { $set: { isblocked: !userdata.isblocked } })
        } else {
            console.log("user not found");

        }

    } catch (err) {
        console.log(err);

    }
}