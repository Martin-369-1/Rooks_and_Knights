//used to hash and compare hash password

//requring modules
const bcrypt = require('bcrypt')

//function to convert plain password to hashed password
const passwordHasher = (plainPassword) => {
    let saltRounds = 12;
    return bcrypt.hash(plainPassword, saltRounds);
}

//finction to compare stored hashed password and entered password
const comparePassword = (plainPassword, storedHash) => {
    return bcrypt.compare(plainPassword, storedHash)
}


module.exports = { passwordHasher, comparePassword };