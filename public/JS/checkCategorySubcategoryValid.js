function checkCategorySubCategoryValid(name, description) {

    if (!checkName(name)) {
        return "Name must be at least 3 characters long and contain only letters."
    }

    if (!checkDescription(description)) {
        return "Description must be at least 20 characters long and contain only letters and spaces."
    }

    return false;

    function checkName(name) {
        const regex = /^[A-Za-z\s]{3,}$/;
        return regex.test(name);
    }

    function checkDescription(description) {
        return description.length >= 20 && /^[A-Za-z\s]+$/.test(description);
    }
}