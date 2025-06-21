const express = require('express');
const router = express.Router();

const {createCategory, showAllCategories, categoryPageDetails} = require('../controllers/Category');
const {createCourse, showAllCourses, getCourseDetails, getMyCourses, updateCourse, deleteCourse} = require('../controllers/Course');
const {createRatingAndReview, getAverageRating, getAllRating} = require('../controllers/RatingAndReview');
const {createSection, updateSection, deleteSection} = require('../controllers/Section');
const {createSubSection, updateSubSection, deleteSubSection} = require('../controllers/SubSection');
const {auth, isStudent, isAdmin, isInstructor} = require('../middlewares/auth');
router.post('/createcourse', auth, isInstructor, createCourse);
router.put('/updatecourse', auth, isInstructor, updateCourse);
router.delete('/deletecourse', auth, isInstructor, deleteCourse);
router.get('/getmycourses', auth, isInstructor, getMyCourses);
router.get('/showallcourses', showAllCourses);
router.get('/getcoursedetails', getCourseDetails);

router.post('/createcategory', auth, isAdmin, createCategory);
router.get('/showallcategories', showAllCategories);
router.get('/getcategorypagedetails', categoryPageDetails);

router.post('/createratingandreview', auth, isStudent, createRatingAndReview);
router.get('/getaveragerating', getAverageRating);
router.get('/getallrating', getAllRating);

router.post('/createsection', auth, isInstructor, createSection);
router.put('/updatesection', auth, isInstructor, updateSection);
router.delete('/deletesection', auth, isInstructor, deleteSection);

router.post('/createsubsection', auth, isInstructor, createSubSection);
router.put('/updatesubsection', auth, isInstructor, updateSubSection);
router.delete('/deletesubsection', auth, isInstructor, deleteSubSection);

module.exports = router;
