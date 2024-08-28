//Services
const adminUserService = require('../services/adminUserService');
const adminCategoryService = require('../services/adminCategoryService');
const adminSubCategoryService = require('../services/adminSubCategoryServices')
const adminProductService = require('../services/adminProductService');
const adminService = require('../services/adminService');

//Utils
const generateAccessToken = require('../utils/JWTUtils');

//Render login page
exports.getLogin = (req, res) => {
    res.render('admin/login')
}

//handles user login
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        //when email and password not entered
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const adminData = await adminService.findUserByEmail(email);

        //when email doesnot exist in database
        if (!adminData) {
            return res.status(400).json({ error: 'Admin does not exist' });
        }

        const isValidPassword = await adminService.validateUserCredentials(password, adminData.password);

        //If the password entered is not valid
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        //creating and storing JWT access token to in the cookie
        const accessToken = generateAccessToken(email);
        res.cookie('token', accessToken, { httpOnly: true, sameSite: 'Strict' });

        res.redirect('/admin');

    } catch (err) {
        console.error("Admin Post Logout Error: " + err);
        res.redirect('/error')
    }
}

//handles logout
exports.postLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).redirect('/admin/login');
}

//render dashboard
exports.getDashboard = async (req, res) => {
    res.render('admin/dashboard')

}

//renders users list page
exports.getUsers = async (req, res) => {
    try {
        let userList = await adminUserService.userList();
        res.render('admin/users.ejs', { userList })

    } catch (err) {
        console.log("Admin getUsers Error: " + err);
        res.redirect('/error');

    }

}

//Block or Unblock user 
exports.patchBlockUnblockUser = async (req, res) => {
    _id = req.params.id;
    try {
        await adminUserService.blockUnblockUser(_id)
        res.redirect('/admin/users')

    }
    catch (err) {
        console.log("Admin patchBlockUnblockUser Error: " + err);
        res.redirect('/error');

    }
}

//renderes product page
exports.getProducts = async (req, res) => {
    try {
        let productList = await adminProductService.productList();
        res.render('admin/products', { productList })

    } catch (err) {
        console.log("Admin getProducts Error: " + err);
        res.redirect('/error');

    }
}

//render page to add new product
exports.getAddProduct = async (req, res) => {
    let categories = await adminProductService.categories();
    let subCategories = await adminProductService.subCategories();

    res.render('admin/addProduct', { categories, subCategories, error: req.flash('ProductError') || '' })

}

//Adds new product
exports.postAddProduct = async (req, res) => {
    try {
        let error = await adminProductService.addProduct(req, res)
        if (error) {
            req.flash('ProductError', error)
            return res.redirect('/admin/products/addProduct')
        }
        res.redirect('/admin/products')

    } catch (err) {
        console.log("Admin postAddProduct Error: " + err);
        res.redirect('/error');
    }
}

//render product detailed page
exports.getViewEditProduct = async (req, res) => {
    try {
        let _id = req.params.id;


        let categories = await adminProductService.categories();
        let subCategories = await adminProductService.subCategories();
        let product = await adminProductService.viewProduct(_id);


        res.render('admin/viewEditProduct', { product, categories, subCategories })


    } catch (err) {
        console.log("Admin getViewEditProduct Page rendered" + err);
        res.redirect('/error');

    }
}

//update product
exports.putViewEditProduct = async (req, res) => {
    let _id = req.params.id;

    try {
        await adminProductService.editProduct(req, res, _id)
        res.redirect('/admin/products')

    } catch (err) {
        console.log("Admin putViewEditProduct Error: " + err);
        res.redirect('/error');
    }
}

//delete product
exports.deleteProduct = async (req, res) => {
    try {
        let _id = req.params.id;
        await adminProductService.deleteProduct(_id);
        res.redirect('/admin/products')


    } catch (err) {
        console.log("Admin deleteProduct Error: " + err);
        res.redirect('/error');

    }
}


//Categories and subCategory get
exports.getCategories = async (req, res) => {
    try {
        let categoryList = await adminCategoryService.categoryList();
        let subCategoryList = await adminSubCategoryService.subCategoryList();
        res.render('admin/categories', { categoryList, subCategoryList, categoryError: req.flash('CategoryError') || '', subCategoryError: req.flash('SubCategoryError') || '' })


    } catch (err) {
        console.log("Admin getCategories Error: " + err);
        res.redirect('/error');

    }

}


//categories

//add new category
exports.addCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;

        if (!categoryName || !categoryDescription) {
            req.flash('CategoryError', "category name or category name should not be empty")
            return res.redirect('/admin/categories')
        }
        let error = await adminCategoryService.addCategory(categoryName, categoryDescription)

        if (error) {
            req.flash('CategoryError', error)
        }

        res.redirect('/admin/categories')

    } catch (err) {
        console.log("Admin addCategory Error: " + err);
        res.redirect('/error');
    }
}

//edit category
exports.putEditCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        const { categoryName, categoryDescription } = req.body;

        if (!categoryName || !categoryDescription) {
            req.flash('CategoryError', "category name or category name should not be empty")
            return res.redirect('/admin/categories')
        }

        let error = await adminCategoryService.editCategory(_id, categoryName, categoryDescription);
        if (error) {
            req.flash('CategoryError', error)
        }

        res.redirect('/admin/categories')

    } catch (err) {
        console.log("Admin putEditCategory Error: " + err);
        res.redirect('/error');
    }
}

//delete specific category
exports.deleteCategory = async (req, res) => {
    try {
        let _id = req.params.id;
        let error = await adminCategoryService.deleteCategory(_id);
        if (error) {
            req.flash('CategoryError', error)
        }
        res.redirect('/admin/categories')


    } catch (err) {
        console.log("Admin deleteCategory Error: " + err);
        res.redirect('/error');
    }
}

//subCategory

exports.addSubCategory = async (req, res) => {
    try {
        const { subCategoryName, subCategoryDescription } = req.body;

        if (!subCategoryName || !subCategoryDescription) {
            req.flash('SubCategoryError', "subCategory name or subCategory description should not be empty")
            return res.redirect('/admin/categories')
        }

        let error = await adminSubCategoryService.addSubCategory(subCategoryName, subCategoryDescription)

        if (error) {
            req.flash('SubCategoryError', error)
        }

        res.redirect('/admin/categories')

    } catch (err) {
        console.log("Admin addSubCategory Error: " + err);
        res.redirect('/error');

    }
}

//edit subcategory
exports.putEditSubCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        const { subCategoryName, subCategoryDescription } = req.body;

        if (!subCategoryName || !subCategoryDescription) {
            req.flash('SubCategoryError', "subCategory name or subCategory description should not be empty")
            return res.redirect('/admin/categories')
        }
        let error = await adminSubCategoryService.editSubCategory(_id, subCategoryName, subCategoryDescription);
        if (error) {
            req.flash('SubCategoryError', error)
        }

        res.redirect('/admin/categories')

    } catch (err) {
        console.log("Admin putEditSubCategory Error: " + err);
        res.redirect('/error');
    }
}

//delete specific subcategory
exports.deleteSubCategory = async (req, res) => {
    try {
        let _id = req.params.id;
        const error = await adminSubCategoryService.deleteSubCategory(_id);
        if (error) {
            req.flash('SubCategoryError', error)
        }
        res.redirect('/admin/categories')

    } catch (err) {
        console.log("Admin deleteSubCategory Error: " + err);
        res.redirect('/error');

    }
}




