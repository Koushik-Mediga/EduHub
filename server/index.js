const express = require('express');
const app = express();
const dbConnect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');

require("dotenv").config();
const PORT = process.env.PORT;

const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payments');
const fileUpload = require("express-fileupload");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);

app.get('/', (req, res)=>{
    try {
        return res.json({
            success:true,
            message:"Server is up and running",
        });
    } catch (error) {
        console.log(error);
    }
});

dbConnect();
cloudinaryConnect();
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});