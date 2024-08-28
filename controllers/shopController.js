const shopServices=require('../services/shopServices')


exports.getProductList=async(req,res)=>{
    try{
        const {category,sortby,price,subCategory,search,page} = req.query;
        const currentPage=page || 1;
        const  noOfProducts=4;
        const skipPages=currentPage-1
        const {productList,categoryList,subCategoryList,totalNoOfProducts}=await shopServices.productList(category,sortby,price,subCategory,search,currentPage,noOfProducts,skipPages);
        const totalNoOfPages=totalNoOfProducts/noOfProducts;
        res.render('shop',{productList,categoryList,subCategoryList,categoryFilter:category || null,sortbyFilter:sortby || null,priceFilter:price || null,subCategoryFilter:subCategory || null,searchFilter:search || null,currentPage,totalNoOfPages})
    }catch(err){
        console.log(err);
        
    }
}

exports.getProduct=async(req,res)=>{
    
    let _id = req.params.id;
    try {
        const { product, relatedProducts } = await shopServices.viewProduct(_id);
        
        res.render('product', { product, relatedProducts })
    } catch (err) {
        console.log(err);
        res.redirect('/error')
    }
}

exports.postReview=async(req,res)=>{
    let _id=req.params.id;
    try{
        const {ratingStar,comments}=req.body;
        const userID=req.userID
        
        const newReview={
            comments,
            ratingStar,
            userID
        }
        
        await shopServices.addReview(_id,newReview);
        res.redirect(`/shop/product/${_id}`)
    }catch(err){
        console.log(err);  
    }
}