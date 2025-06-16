import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RiCloseCircleFill } from "react-icons/ri";
import { createSubSection, updateSection, updateSubSection } from '../../../../services/operations/courseApi';
import { setEditLecture, setEditSections } from '../../../../slices/courseSlice';



const AddLecture = () => {
  const editSections = useSelector((state) => state.course.editSections);
  const editLecture = useSelector((state)=>state.course.editLecture);
  const course = useSelector((state) => state.course.course);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sectionId = useParams().id;

  const params = new URLSearchParams(useLocation().search);

  const [sectionName, setSectionName] = useState("");
        
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();


    useEffect(()=>{
      if(editLecture && !editSections){
        if(params.has("title")) setValue("title", params.get("title"));
        if(params.has("description")) setValue("description", params.get("description"));
        if(params.has("timeDuration")) setValue("timeDuration", params.get("timeDuration"));
        if(params.has("subSectionId")) setValue("subSectionId", params.get("subSectionId"));
      }
    }, [])

  const updateSectionSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sectionId", sectionId);
    formData.append("courseId", course._id);
    formData.append("sectionName", sectionName);
    await updateSection(formData, token, dispatch, navigate);
    
    navigate(-1);
  };

  const createLectureSubmitHandler = async (data)=>{
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("timeDuration", data.timeDuration);
    formData.append("description", data.description);
    formData.append("file", data.file[0]);
    formData.append("sectionId", sectionId);
    formData.append("courseId", course._id)
    await createSubSection(formData, token, dispatch, navigate);
    navigate(-1);
  }

  const updateLectureSubmitHandler = async (data)=>{
    const formData = new FormData();
    if(params.get("title")!==data.title) formData.append("title", data.title);
    if(params.get("timeDuration")!==data.timeDuration) formData.append("timeDuration", data.timeDuration);
    if(params.get("description")!==data.description) formData.append("description", data.description);
    if(data.file[0]) formData.append("file", data.file[0]);
    formData.append('courseId', course._id);
    formData.append("subSectionId", params.get("subSectionId"));
    await updateSubSection(formData, token, dispatch, navigate);
    navigate(-1);
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      {editSections && (
        <form onSubmit={updateSectionSubmitHandler} className='px-7 py-5 bg-white flex flex-col justify-center items-center gap-5 text-black rounded-2xl w-80 shadow-lg'>
          <div className='w-full text-lg flex justify-between items-center'>
            <h2>Edit Section</h2>
            <RiCloseCircleFill onClick={() => {setEditSections(false); setEditLecture(false);navigate(-1)}} className='hover:text-pink-400 hover:cursor-pointer' />
          </div>
          <input onChange={(e)=>{setSectionName(e.target.value)}} value={sectionName} placeholder='Enter the section name' className='w-full border border-richblack-300 rounded-xl p-3' />
          <input type='submit' className="w-full px-4 py-2 m-2 text-white bg-pink-300 rounded-full hover:bg-pink-500 transition-all cursor-pointer" />
        </form>
      )}

      {
        !editSections && editLecture && (
          <form onSubmit={handleSubmit(updateLectureSubmitHandler)} className='px-7 py-5 bg-white flex flex-col justify-center items-center gap-5 text-black rounded-2xl w-1/2 shadow-lg'>
            <div className='w-full text-lg flex justify-between items-center'>
            <h2>Edit Lecture</h2>
            <RiCloseCircleFill onClick={() => {setEditSections(false); setEditLecture(false);navigate(-1)}} className='hover:text-pink-400 hover:cursor-pointer' />
          </div>

          <div className='flex flex-col justify-center w-full'>
              <label className='text-md text-richblack-100'>Lecture Title <span className={`${(editLecture?'invisible':'')} text-md text-pink-400`}>*</span></label>
              <div className='flex flex-col justify-center gap-0'>
                  <input {...register("title", {required:(editLecture?false:"Lecture Title is required")})} className='border border-richblack-600 rounded-md w-full p-1 mt-2'/>
                  {errors.title && <p className='text-pink-400 text-sm'>{errors.title.message}</p>}
              </div>
          </div>

          <div className='flex flex-col justify-center w-full'>
                <label className='text-md text-richblack-100'>Lecture Description <span className={`${(editLecture?'invisible':'')} text-md text-pink-400`}>*</span></label>
                <div className='flex flex-col justify-center gap-0'>
                    <textarea {...register("description", {required:(editLecture?false:"Lecture Description is required")})} className='my-2 p-1 h-[100px] font-inter w-full border border-richblack-600 rounded-md'/>
                    {errors.description && <p className='text-pink-400 text-sm'>{errors.description.message}</p>}
                </div>
            </div>

            <div className='flex flex-col justify-center w-full'>
              <label className='text-md text-richblack-100'>Lecture Time Duration <span className={`${(editLecture?'invisible':'')} text-md text-pink-400`}>*</span></label>
              <div className='flex flex-col justify-center gap-0'>
                  <input {...register("timeDuration", {required:(editLecture?false:"Lecture Time duration is required")})} className='border border-richblack-600 rounded-md w-full p-1 mt-2'/>
                  {errors.timeDuration && <p className='text-pink-400 text-sm'>{errors.timeDuration.message}</p>}
              </div>

            <div className='flex flex-col justify-center w-full'>
              <label className='text-md text-richblack-100'>Lecture Video<span className={`${(editLecture?'invisible':'')} text-md text-pink-400`}>*</span></label>
              <input type='file'  accept="video/*" {...register("file", {required:(editLecture?false:"Course Title is required")})} className='border border-richblack-600 rounded-md w-full p-1 mt-2'/>
              {errors.file && <p className='text-pink-400 text-sm'>{errors.file.message}</p>}        
              <video src={params.get("videoUrl")} className='h-[200px] w-[200px]' muted controls={false}/>
            </div>
          </div>

          <input type='submit' className="w-full px-4 py-2 m-2 text-white bg-pink-300 rounded-full hover:bg-pink-500 transition-all cursor-pointer" />
          </form>
        )
      }

      {
        !editSections && !editLecture && (
          <form onSubmit={handleSubmit(createLectureSubmitHandler)} className='px-7 py-5 bg-white flex flex-col justify-center items-center gap-5 text-black rounded-2xl w-1/2 shadow-lg'>
            <div className='w-full text-lg flex justify-between items-center'>
            <h2>Add Lecture</h2>
            <RiCloseCircleFill onClick={() => {setEditSections(false); setEditLecture(false);navigate(-1)}} className='hover:text-pink-400 hover:cursor-pointer' />
          </div>

          <div className='flex flex-col justify-center w-full'>
              <label className='text-md text-richblack-100'>Lecture Title <span className={`${(editLecture?'invisible':'')} text-md text-pink-400`}>*</span></label>
              <div className='flex flex-col justify-center gap-0'>
                  <input {...register("title", {required:(editLecture?false:"Lecture Title is required")})} className='border border-richblack-600 rounded-md w-full p-1 mt-2'/>
                  {errors.title && <p className='text-pink-400 text-sm'>{errors.title.message}</p>}
              </div>
          </div>

          <div className='flex flex-col justify-center w-full'>
                <label className='text-md text-richblack-100'>Lecture Description <span className={`${(editLecture?'invisible':'')} text-md text-pink-400`}>*</span></label>
                <div className='flex flex-col justify-center gap-0'>
                    <textarea {...register("description", {required:(editLecture?false:"Lecture Description is required")})} className='my-2 p-1 h-[100px] font-inter w-full border border-richblack-600 rounded-md'/>
                    {errors.description && <p className='text-pink-400 text-sm'>{errors.description.message}</p>}
                </div>
            </div>

            <div className='flex flex-col justify-center w-full'>
              <label className='text-md text-richblack-100'>Lecture Time Duration <span className={`${(editLecture?'invisible':'')} text-md text-pink-400`}>*</span></label>
              <div className='flex flex-col justify-center gap-0'>
                  <input {...register("timeDuration", {required:(editLecture?false:"Lecture Time duration is required")})} className='border border-richblack-600 rounded-md w-full p-1 mt-2'/>
                  {errors.timeDuration && <p className='text-pink-400 text-sm'>{errors.timeDuration.message}</p>}
              </div>

            <div className='flex flex-col justify-center w-full'>
              <label className='text-md text-richblack-100'>Lecture Video<span className={`${(editLecture?'invisible':'')} text-md text-pink-400`}>*</span></label>
              <input type='file'  accept="video/*" {...register("file", {required:(editLecture?false:"Course Title is required")})} className='border border-richblack-600 rounded-md w-full p-1 mt-2'/>
              {errors.file && <p className='text-pink-400 text-sm'>{errors.file.message}</p>}        
            </div>
          </div>

          <input type='submit' className="w-full px-4 py-2 m-2 text-white bg-pink-300 rounded-full hover:bg-pink-500 transition-all cursor-pointer" />
          </form>
        )
      }
    </div>
  );
}

export default AddLecture;
