import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteSubSection, deleteSection, deleteCourse } from '../../../../services/operations/courseApi';

const DeleteCourse = () => {
    const token = useSelector((state)=>state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = new URLSearchParams(useLocation().search)  
    const courseId = params.get("courseId");
    const sectionId = params.get("sectionId");
    const subSectionId = params.get("subSectionId");

    const deleteCourseHandler = async ()=>{
        if(courseId && sectionId && subSectionId){
            await deleteSubSection({courseId, sectionId, subSectionId}, token, dispatch);
            navigate(-1);
            return;
        }
        else if(courseId && sectionId){
            await deleteSection({courseId, sectionId}, token, dispatch);
            navigate(-1);
            return;
        }
        else if(courseId){
            await deleteCourse({courseId}, token, dispatch);
            navigate(-1);
            return;
        }

    }
  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                
                <div className="px-7 py-5 bg-white flex flex-col justify-center items-center gap-5 text-black rounded-2xl w-80 shadow-lg">
                    <h2 className="text-xl mt-4 font-semibold text-center">{`Are you sure you want to delete the ${(courseId && sectionId && subSectionId)?'Lecture':(courseId && sectionId ? 'Section' : 'Course')}`}</h2>
                    
                    <div className="flex flex-col w-full">
                    <button onClick={deleteCourseHandler} className="px-4 py-2 bg-red-600 m-2 text-white bg-pink-300 rounded-full hover:bg-pink-500 transition-all ">
                        {`Delete ${(courseId && sectionId && subSectionId)?'Lecture':(courseId && sectionId ? 'Section' : 'Course')}`}
                    </button>
                    <button onClick={()=>{navigate(-1)}} className="px-4 py-2 mr-2 m-2 text-black rounded-full hover:bg-pure-greys-400 transition-all ">
                        Cancel
                    </button>
                    </div>
                </div>
                
            </div>
  )
}

export default DeleteCourse