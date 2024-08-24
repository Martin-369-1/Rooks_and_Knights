let homeServices = require('../services/homeServices');

exports.getHome = async (req, res) => {
    try {
        let { categories, topProductList } = await homeServices.index();
        res.render('index', { categories, topProductList })
    } catch (err) {
        console.log(err);
        res.redirect('/error')
    }
}

exports.getProduct = async (req, res) => {
    let _id = req.params.id;
    try {
        const { product, relatedProducts } = await homeServices.viewProduct(_id);
        res.render('product', { product, relatedProducts })
    } catch (err) {
        console.log(err);
        res.redirect('/error')
    }
}   