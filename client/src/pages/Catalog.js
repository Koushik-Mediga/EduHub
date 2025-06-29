import React, { useEffect, useState } from 'react';
import { getCategoryPageDetails } from '../services/operations/courseApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarRating from '../components/common/StarRating';
import CourseCard from '../components/core/CatalogPage/CourseCard';
import Footer from '../components/common/Footer';
import CourseCardExpanded from '../components/core/CatalogPage/CourseCardExpanded';

const Catalog = () => {
  const [categoryDetails, setCategoryDetails] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      await getCategoryPageDetails({ categoryId: id, setCategoryDetails });
    };
    fetchCategoryDetails();
  }, [id]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full bg-richblack-900 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex flex-col p-10 pl-48 bg-richblack-800 shadow-[0_4px_10px_0_rgba(100,100,100,0.4)]">
        <h1 className="text-2xl text-blue-100 ">
          {categoryDetails?.selectedCategory?.name || 'Catalog'}
        </h1>
        <p className="text-sm text-richblack-100">
          {categoryDetails?.selectedCategory?.description || 'Catalog Description'}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-11/12 max-w-[1200px] mt-16">
        <h2 className="text-3xl font-bold text-richblack-50 mb-5 ml-3">
          Courses to get you started
        </h2>

        {Array.isArray(categoryDetails?.selectedCategory?.courses) &&
        categoryDetails?.selectedCategory?.courses.length > 0 ? (
          <div onClick={()=>{navigate(`/course/${categoryDetails?.selectedCategory?.courses[0]?._id}`)}} className="mb-10 hover:cursor-pointer bg-richblack-800 rounded-lg w-4/12 shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Thumbnail */}
            <img
              src={categoryDetails?.selectedCategory?.courses[0]?.thumbnail}
              alt={categoryDetails?.selectedCategory?.courses[0]?.courseName}
              className="w-full h-48 object-cover"
            />

            {/* Course Info */}
            <div className="p-4 text-richblack-5">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {categoryDetails?.selectedCategory?.courses[0]?.courseName}
              </h3>

              {/* Rating */}
              <div className="flex items-center mb-2 space-x-1 text-yellow-400">
                <StarRating rating={categoryDetails?.selectedCategory?.courses[0]?.rating || 4.3} />
                <span className="text-sm text-richblack-300 ml-1">
                  {categoryDetails?.selectedCategory?.courses[0]?.rating || 4.3}
                </span>
              </div>

              {/* Instructor */}
              <p className="text-sm text-richblack-300">
                By{" "}
                <span className="font-medium text-richblack-200">
                  {categoryDetails?.selectedCategory?.courses[0]?.instructor.firstName || "Unknown"} {categoryDetails?.selectedCategory?.courses[0]?.instructor.lastName || "Unknown"}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-white  m-4">No courses available</p>
        )}

                
        {/* Related Courses */}
        <h2 className="text-3xl font-bold text-richblack-50 mb-5 ml-3">Related Courses</h2>
        {Array.isArray(categoryDetails?.selectedCategory?.courses) &&
        categoryDetails.selectedCategory.courses.length > 0 ? (
          <Carousel
            swipeable
            draggable
            showDots
            responsive={responsive}
            ssr={false}
            infinite
            pauseOnHover={true}
            autoPlaySpeed={3000}
            keyBoardControl
            customTransition="transform 1000ms ease-in-out"
            transitionDuration={1000}
            containerClass="w-full"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass="custom-dot-list-style"
            itemClass="px-2 max-w-[400px]"
          >
            {categoryDetails.selectedCategory.courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </Carousel>
        ) : (
          <p className="text-white ml-3">No courses available</p>
        )}

        {/* Top Selling Courses */}
        <div className="flex flex-col w-full mt-28 px-6">
          <h2 className="text-3xl font-bold text-richblack-50 mb-8">
            Top Selling Courses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-10">
            {categoryDetails.mostSellingCourses?.map((course, index) => (
              <div key={index} className="transition-transform transform hover:scale-105 m-4">
                <CourseCardExpanded course={course} />
              </div>
            ))}
          </div>
        </div>


        {/* Other Categories */}
        <div className="flex flex-col justify-center gap-6 w-full mt-28 mb-16">
          <h2 className="text-3xl font-bold text-richblack-50 mb-5 ml-3">Other Categories</h2>
          {Array.isArray(categoryDetails?.differentCategories) && (
          <Carousel
            swipeable
            draggable
            showDots={false}
            responsive={{
              superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 6 },
              desktop: { breakpoint: { max: 1536, min: 1024 }, items: 5 },
              tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
              mobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
            }}
            ssr={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={500}
            pauseOnHover={true}
            keyBoardControl={true}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="w-full"
            removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
            itemClass="flex items-center justify-center px-2"
          >
            {categoryDetails.differentCategories.map((category, index) => (
              <Link
                key={index}
                to={`/catalog/${category._id}`}
                className="w-[200px] h-[50px] flex items-center justify-center bg-richblack-800 text-richblack-25 rounded-full text-sm font-semibold text-center hover:bg-yellow-300 hover:text-black transition-all duration-300"
              >
                {category.name}
              </Link>
            ))}
          </Carousel>

          )}
        </div>
        
      </div><div className='w-full border-t-2 border-black'><Footer /></div>
    </div>
  );
};

export default Catalog;
