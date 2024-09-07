//collections
const userCollection = require('../models/userModel')

exports.userList = async (search,currentPage, noOfList, skipPages) => {
    let findQuery = { isAdmin: false };

    //for search user
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
    }
}


exports.blockUnblockUser = async (userID) => {
    try {
        await userCollection.updateOne({ _id:userID }, { isblocked: {$not:'$isblocked'} } )
    } catch (err) {
        console.log(err);

    }
}