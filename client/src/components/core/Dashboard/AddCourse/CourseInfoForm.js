import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../../services/apiconnector';
import { categoryEndPoints } from '../../../../services/apis';
import { useNavigate } from 'react-router-dom';
import { setStep } from '../../../../slices/courseSlice';
import { createCourse } from '../../../../services/operations/courseApi';
import { updateCourse } from '../../../../services/operations/courseApi';
import { ClipLoader } from 'react-spinners';


const CourseInfoForm = () => {
    const step = useSelector((state)=>state.course.step);
    const course = useSelector((state)=>state.course.course);
    const editCourse = useSelector((state)=>state.course.editCourse);
    const token = useSelector((state)=>state.auth.token);
    const [allCategories, setAllCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
        
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();


    const fetchCategories = async ()=>{
        try{
            const result = await apiConnector("GET", categoryEndPoints.CATEGORIES_API);
            console.log(result);
            setAllCategories(result.data.categories);
        }catch(e){
            console.log(e)
        }
    }

    const setDetails = async ()=>{
        await fetchCategories();

        if(editCourse){
            setValue("courseName", course.courseName);
            setValue("courseDescription", course.courseDescription);
            setValue("price", course.price);
            setValue("category", (course.category)._id);
            setValue("whatYouWillLearn", course.whatYouWillLearn);
            setValue("thumbnail", course.thumbnail);
        }
    }


    useEffect(()=>{
        setDetails();
    }, []);


    const onSubmitHandler = async (data)=>{
        const formData = new FormData();
        
        if(editCourse){
            if(course.courseName!==data.courseName) formData.append("courseName", data.courseName);
            if(course.courseDescription!==data.courseDescription) formData.append("courseDescription", data.courseDescription);
            if(course.price!==data.price) formData.append("price", data.price);
            if(course.category!==data.category) formData.append("category", data.category);
            if(course.whatYouWillLearn!==data.whatYouWillLearn) formData.append("whatYouWillLearn", data.whatYouWillLearn);
            if(data.thumbnail) formData.append("thumbnail", data.thumbnail[0]);
            formData.append("courseId", course._id);
            await updateCourse(formData, token, dispatch);
            console.log(course);
            return ;
        }
        formData.append("courseName", data.courseName);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("whatYouWillLearn", data.whatYouWillLearn);
        formData.append("thumbnail", data.thumbnail[0]);
        await createCourse(formData, token, dispatch, navigate);
        console.log(course)
    }

  return (
    <div className='w-full flex justify-center items-center'>
        <form onSubmit={handleSubmit(onSubmitHandler)} className='p-5 w-1/2 bg-richblack-800 rounded-lg flex flex-col justify-center gap-5'>
            <div className='flex flex-col justify-center'>
                <label className='text-md text-richblack-100'>Course Title <span className={`${(editCourse?'invisible':'')} text-md text-pink-400`}>*</span></label>
                <div className='flex flex-col justify-center gap-0'>
                    <input {...register("courseName", {required:(editCourse?false:"Course Title is required")})} className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-900 focus:border-richblack-900 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                    {errors.courseName && <p className='text-pink-400 text-sm'>{errors.courseName.message}</p>}
                </div>
            </div>

            <div className='flex flex-col justify-center'>
                <label className='text-md text-richblack-100'>Course Description <span className={`${(editCourse?'invisible':'')} text-md text-pink-400`}>*</span></label>
                <div className='flex flex-col justify-center gap-0'>
                    <textarea {...register("courseDescription", {required:(editCourse?false:"Course Title is required")})} className='my-2 p-1 focus:outline-none text-white h-[100px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-900 focus:border-richblack-900 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                    {errors.courseDescription && <p className='text-pink-400 text-sm'>{errors.courseDescription.message}</p>}
                </div>
            </div>

            <div className='flex flex-col justify-center'>
                <label className='text-md text-richblack-100'>Course Price <span className={`${(editCourse?'invisible':'')} text-md text-pink-400`}>*</span></label>
                <div className='flex flex-col justify-center gap-0'>
                    <input type='number' {...register("price", {required:(editCourse?false:"Course Title is required")})} className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-900 focus:border-richblack-900 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                    {errors.price && <p className='text-pink-400 text-sm'>{errors.price.message}</p>}
                </div>
            </div>
            
            <div className='flex flex-col justify-center'>
                <label className='text-md text-richblack-100'>Choose a Category <span className={`${(editCourse?'invisible':'')} text-md text-pink-400`}>*</span></label>
                <select {...register("category", {required:(editCourse?false:"Course Title is required")})} className='hover:cursor-pointer my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-900 focus:border-richblack-900 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'>
                    <option value="">---Select Category---</option>
                    {
                        allCategories.map((item, index)=>{
                            return <option key={index} value={item._id}>
                                {item.name}
                            </option>
                        })
                    }
                </select>
                {errors.category && <p className='text-pink-400 text-sm'>{errors.category.message}</p>}
            </div>

            <div className='flex flex-col justify-center'>
                <label className='text-md text-richblack-100'>What You Will Learn from this Course <span className={`${(editCourse?'invisible':'')} text-md text-pink-400`}>*</span></label>
                <div className='flex flex-col justify-center gap-0'>
                    <textarea {...register("whatYouWillLearn", {required:(editCourse?false:"Course Title is required")})} className='my-2 p-1 focus:outline-none text-white h-[100px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-900 focus:border-richblack-900 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                    {errors.whatYouWillLearn && <p className='text-pink-400 text-sm'>{errors.whatYouWillLearn.message}</p>}
                </div>
            </div>
            
            <div className='flex flex-col justify-center'>
                <label className='text-md text-richblack-100'>Select a Thumbnail for this course <span className={`${(editCourse?'invisible':'')} text-md text-pink-400`}>*</span></label>
                <input type='file'  accept="image/*" {...register("thumbnail", {required:(editCourse?false:"Course Title is required")})} className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-900 focus:border-richblack-900 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                <img src={course?.thumbnail} alt='No image ' className={`h-[200px] w-[200px] ${editCourse?'':'hidden'}`}></img>
                {errors.thumbnail && <p className='text-pink-400 text-sm'>{errors.thumbnail.message}</p>}        
            </div>

            <div>
                <button
                    type="submit"
                    className={`rounded-md w-full h-[50px] flex justify-center items-center text-black bg-yellow-50 transition-all duration-200 gap-2
                        ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-95'}
                    `}                    
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? (
                        <ClipLoader color="#000" size={20} />
                    ) : editCourse ? (
                        "Save & Continue"
                    ) : (
                        "Create Course & Continue"
                    )}
                </button>
            </div>
        </form>
    </div>
  )
}

export default CourseInfoForm