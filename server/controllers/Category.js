const Category = require('../models/Category');

exports.createCategory = async (req, res)=>{
    try {  
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"Invalid entries",
            });
        }
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(400).json({
                success:false,
                message:"Category already exists",
            });
        }
        const tag = await Category.create({name, description, courses:[]});
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong with Category creation",
        });
    }
}

exports.showAllCategories = async (req, res)=>{
    try{
        const allCategories = await Category.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:"Fetched all Categories successfully",
            categories: allCategories,
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:e.message,
        })
    }
}

exports.categoryPageDetails = async (req, res)=>{
    try {
        const {categoryId} = req.body;
        const selectedCategory = await Category.findOne({_id:categoryId}).populate("courses").exec();
        if(!selectedCategory){
            return res.status.json({
                success:false,
                message:"Data not found",
            });
        }
        const differentCategories = await Category.find({
            _id: {$ne: categoryId},
        }).populate("courses").exec();
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}