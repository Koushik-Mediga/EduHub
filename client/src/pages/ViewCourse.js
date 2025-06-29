import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCourseDetails } from '../services/operations/courseApi';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { ClipLoader } from 'react-spinners';
import { FaVideo } from "react-icons/fa";

const ViewCourse = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const [lecture, setLecture] = useState({
    title: "",
    timeDuration: "",
    description: "",
    videoUrl: ""
  });
  const [showSideBar, setShowSideBar] = useState(true);
  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        await getCourseDetails({ courseId: id, setCourseDetails: setCourse });
      } catch (error) {
        toast.error("Failed to fetch course details");
        navigate("/");
      }
    }

    function isStudentEnrolled(courseId, user) {
      return user?.courses?.includes(courseId);
    }

    if (!isStudentEnrolled(id, user)) {
      toast.error("This course is for enrolled students only");
      navigate("/");
      return;
    }

    fetchCourseDetails();
  }, [id, user, navigate]);

  const subSectionClickHandler = (subSection) => {
    setLecture(subSection);
  };

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!course) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <ClipLoader color='#FFFFFF' />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col lg:flex-row text-white relative'>
      {/* Main Content Area */}
      <div className={`flex flex-col gap-5 p-4 transition-all duration-300 ${showSideBar ? 'lg:w-3/4' : 'w-full'}`}>
        <div className="w-full max-w-[1280px] h-[620px] mx-auto rounded-md overflow-hidden bg-black">
          {
            lecture.videoUrl === "" ? (
              <img src={course.thumbnail} alt='Course Thumbnail' className='w-full h-full object-cover rounded-md' />
            ) : (
              <video src={lecture.videoUrl} controls className='w-full h-full object-cover rounded-md' />
            )
          }
        </div>

        <div className='w-full flex flex-col'>
          <h3 className='text-2xl font-semibold text-richblack-100'>
            {lecture.title === "" ? course.courseName : lecture.title}
          </h3>
          <p className='text-richblack-200 mt-2'>
            {lecture.description === "" ? course.courseDescription : lecture.description}
          </p>
        </div>
      </div>

      {/* Sidebar */}
      {
        showSideBar ? (
          <div className='lg:w-1/4 bg-richblack-800 p-4'>
            <h2 className='flex text-md flex-row items-center justify-between text-richblack-100 mb-4 font-bold uppercase'>
              {course?.courseName}
              <RiCloseCircleFill
                className='hover:text-pink-300 transition-all hover:cursor-pointer'
                onClick={() => setShowSideBar(false)}
              />
            </h2>

            {
              course?.courseContent?.length === 0 ? (
                <p className='text-richblack-200 px-5 pb-4'>No course content available</p>
              ) : (
                course.courseContent.map((section, secIdx) => {
                  const isOpen = openSections[section._id] || false;
                  const totalLectures = section.subSection?.length || 0;
                  const totalDuration = section.subSection?.reduce((acc, curr) => acc + parseInt(curr.timeDuration || 0), 0);

                  return (
                    <div key={section._id} className="mb-2 border border-richblack-600 rounded-md">
                      <button
                        onClick={() => toggleSection(section._id)}
                        className="w-full text-left px-4 py-3 bg-richblack-600 text-white font-semibold hover:bg-richblack-500 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm text-richblack-25 font-bold">
                            Section {secIdx + 1}: {section.sectionName}
                          </p>
                          <p className="text-xs text-richblack-300">
                            {totalLectures} | {totalDuration}min
                          </p>
                        </div>
                        <IoIosArrowDown
                          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {
                        isOpen && (
                          <div className='flex flex-col bg-richblack-800'>
                            {
                              section?.subSection?.length > 0 ? (
                                section.subSection.map((subSection, subIdx) => (
                                  <div
                                    key={subSection._id}
                                    onClick={() => subSectionClickHandler(subSection)}
                                    className={`flex justify-between items-center px-3 py-2 cursor-pointer ${
                                      lecture && lecture._id === subSection._id
                                        ? 'border-l border-yellow-100 bg-richblack-900 text-yellow-100'
                                        : 'text-richblack-100 hover:bg-richblack-700'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 p-1">
                                      <span className="text-sm"><FaVideo /></span>
                                      <p className="text-sm">{`${subIdx + 1}. ${subSection.title}`}</p>
                                    </div>
                                    <p className="text-xs text-richblack-300">{subSection.timeDuration}</p>
                                  </div>
                                ))
                              ) : (
                                <p className='text-richblack-300 text-sm p-3'>No subsections available</p>
                              )
                            }
                          </div>
                        )
                      }
                    </div>
                  );
                })
              )
            }
          </div>
        ) : (
          <div className='absolute top-48 right-0 bg-richblack-800 hover:bg-pink-300 hover:scale-95 transition-all duration-300 rounded-tl-md rounded-bl-md w-[50px] p-2'>
            <MdKeyboardDoubleArrowLeft
              onClick={() => setShowSideBar(true)}
              className='text-richblack-25 text-2xl hover:cursor-pointer '
            />
          </div>
        )
      }
    </div>
  );
};

export default ViewCourse;
