const Category = require('../models/Category');
const { populate } = require('../models/Course');

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

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.query;

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "categoryId is required in query parameters",
            });
        }

        const selectedCategory = await Category.findOne({ _id: categoryId })
            .populate({path:"courses", populate:{path:"instructor"}})
            .exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data not found",
            });
        }

        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        })
            .populate("courses")
            .exec();

        const allCategories = await Category.find().populate({
        path: "courses",
        match: { publishStatus: "published" },
        populate: {
            path: "instructor"
        }
        }).exec();


        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 6);

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
                mostSellingCourses,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
