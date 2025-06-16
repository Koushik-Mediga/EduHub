import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSection, deleteSubSection } from '../../../../services/operations/courseApi';
import { useNavigate } from 'react-router-dom';
import { setEditLecture, setEditSections, setStep } from '../../../../slices/courseSlice';
import { RxCaretDown } from "react-icons/rx";
import { MdEdit, MdDelete} from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { FaBullseye } from 'react-icons/fa6';




const CourseBuilderForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const course = useSelector((state) => state.course.course);
    const token = useSelector((state) => state.auth.token);

    const [openSection, setOpenSection] = useState(null); // for collapsible sections

    useEffect(() => {
        setEditLecture(false);
        setEditSections(false);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSectionSubmitHandler = async (data) => {
        const formData = new FormData();
        formData.append("sectionName", data.sectionName);
        formData.append("courseId", course._id);
        await createSection(formData, token, dispatch, navigate);
    };


    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='p-5 w-1/2 bg-richblack-800 rounded-lg flex flex-col justify-center gap-5'>
                {/* Section Form */}
                <form className='w-full flex flex-col justify-center items-end' onSubmit={handleSubmit(onSectionSubmitHandler)}>
                    <div className='flex flex-col justify-center w-full'>
                        <input
                            type='text'
                            placeholder='Section Name'
                            {...register("sectionName", { required: "Section Name is required" })}
                            className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'
                        />
                        {errors.sectionName && <p className='text-pink-400 text-sm'>{errors.sectionName.message}</p>}
                    </div>
                    <input
                        type='submit'
                        value={isSubmitting ? 'Submitting...' : 'Add Section'}
                        className='p-1 hover:cursor-pointer rounded-sm w-fit h-fit flex justify-center items-center text-black bg-yellow-50 hover:scale-95 transition-all duration-200'
                    />
                </form>

                {/* Sections and Subsections */}
                {
                    Array.isArray(course?.courseContent) && course.courseContent.length > 0 ? (
                        <div className='flex flex-col justify-center items-center text-white w-full'>
                            {course.courseContent.map((item, index) => (
                                <div key={item._id || index} className='my-2 w-full border-b border-richblack-600'>
                                    <h3
                                        className='text-lg font-semibold cursor-pointer p-2 bg-richblack-700 rounded flex flex-row justify-between items-center'
                                        onClick={() => toggleSection(index)}
                                    >
                                        {item.sectionName}
                                        <div className='flex flex-row gap-1'>
                                            <MdEdit className='text-lg text-richblack-200 hover:text-white ' onClick={()=>{dispatch(setEditSections(true)); dispatch(setEditLecture(false)); navigate(`/dashboard/editsection/${item._id}`)}} />
                                            <MdDelete className='text-lg text-richblack-200 hover:cursor-pointer hover:text-pink-300' onClick={()=>{navigate(`/dashboard/deletecourse?courseId=${course._id}&sectionId=${item._id}`)}}/>
                                            <RxCaretDown className={`text-lg ${(openSection===index)?'rotate-180':''}`}/>
                                        </div>
                                        
                                    </h3>

                                    {/* Subsections */}
                                    {
                                        openSection === index && (
                                            Array.isArray(item?.subSection) && item.subSection.length > 0 ? (
                                                <div className='pl-4 py-2 w-full flex flex-col items-end gap-1'>
                                                    {item.subSection.map((lecture, subIndex) => (
                                                        <div className='p-1 w-full flex flex-row gap-3 border-b border-richblack-600'>
                                                            <video src={lecture.videoUrl} autoPlay muted controls={false} className='h-auto w-1/3'/>
                                                            <div className=' flex flex-col w-full'>
                                                                <div className='flex flex-row justify-between items-center w-full'>
                                                                    <p className='text-lg text-richblack-25'>{lecture.title}</p>
                                                                    <div className='flex flex-row justify-center items-center gap-1'>
                                                                        <MdEdit className='text-richblack-500 hover:cursor-pointer hover:text-white' onClick={()=>{dispatch(setEditLecture(true));dispatch(setEditSections(false)); navigate(`/dashboard/editsection/${item._id}?title=${lecture.title}&description=${lecture.description}&timeDuration=${lecture.timeDuration}&videoUrl=${lecture.videoUrl}&subSectionId=${lecture._id}`)}} />
                                                                        <MdDelete className='text-richblack-500 hover:cursor-pointer hover:text-pink-300' onClick={()=>{navigate(`/dashboard/deletecourse?courseId=${course._id}&sectionId=${item._id}&subSectionId=${lecture._id}`)}}/>
                                                                    </div>
                                                                </div>
                                                                
                                                                <p className='text-sm text-richblack-50'>{lecture.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button onClick={()=>{dispatch(setEditLecture(false));dispatch(setEditSections(false));navigate(`/dashboard/editsection/${item._id}`)}} className='text-yellow-400 underline text-sm'>Add Lecture</button>
                                                </div>
                                            ) : (
                                                <div className='pl-4 py-2'>
                                                    <p className='text-gray-400'>No lectures are present</p>
                                                    <button onClick={()=>{dispatch(setEditLecture(false));dispatch(setEditSections(false));navigate(`/dashboard/editsection/${item._id}`)}} className='text-yellow-400 underline text-sm'>Add Lecture</button>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-white'>No sections are present</div>
                    )
                }

                <div className='flex flex-row justify-between items-center'>
                    <button onClick={(e)=>{ dispatch(setStep(1))}} className='p-1 hover:cursor-pointer rounded-sm w-fit h-fit flex justify-center items-center text-black bg-yellow-50 hover:scale-95 transition-all duration-200'>Previous</button>
                    <button onClick={(e)=>{ dispatch(setStep(3))}} className='p-1 hover:cursor-pointer rounded-sm w-fit h-fit flex justify-center items-center text-black bg-yellow-50 hover:scale-95 transition-all duration-200'>Next</button>
                </div>
            </div>
        </div>
    );
};

export default CourseBuilderForm;
