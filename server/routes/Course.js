const express = require('express');
const router = express.Router();

const {createCategory, showAllCategories, categoryPageDetails} = require('../controllers/Category');
const {createCourse, showAllCourses, getCourseDetails} = require('../controllers/Course');
const {createRatingAndReview, getAverageRating, getAllRating} = require('../controllers/RatingAndReview');
const {createSection, updateSection, deleteSection} = require('../controllers/Section');
const {createSubSection, updateSubSection, deleteSubSection} = require('../controllers/SubSection');
const {auth, isStudent, isAdmin, isInstructor} = require('../middlewares/auth');
router.post('/createCourse', auth, isInstructor, createCourse);
router.get('/showAllCourses', showAllCourses);
router.get('/getCourseDetails', getCourseDetails);

router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllCategories', showAllCategories);
router.get('/getCategoryPageDetails', categoryPageDetails);

router.post('/createRatingAndReview', auth, isStudent, createRatingAndReview);
router.get('/getAverageRating', getAverageRating);
router.get('/getAllRating', getAllRating);

router.post('/createSection', auth, isInstructor, createSection);
router.put('/updateSection', auth, isInstructor, updateSection);
router.delete('/deleteSection', auth, isInstructor, deleteSection);

router.post('/createSubSection', auth, isInstructor, createSubSection);
router.put('/updateSubSection', auth, isInstructor, updateSubSection);
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection);

module.exports = router;
