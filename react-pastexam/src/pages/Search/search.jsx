import React from "react";
import { Course } from "../../conponents/Course/Course";
import { Box, Typography } from "@mui/material";
import { CourseTable } from "../../conponents/CourseTable/courseTable";
import { ThemeProvider ,createTheme} from '@mui/material/styles';
import { Navbar } from "../../conponents/Navbar/navbar";
import {Loading} from "../../conponents/Loading/loading";
const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Switches the theme to dark mode
      // You can also customize other theme aspects like primary and secondary colors
    },
    // Add any other theme customizations here
  });
export const Search = () => {
    const [courseName, setCourseName] = React.useState("");
    const [instructor, setInstructor] = React.useState("");
    const [dept, setDept] = React.useState("");
    const [courseData, setCourseData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    return (
        <ThemeProvider theme={darkTheme}>
        <Box>
            <Navbar />
            <Course
                courseName={courseName} setCourseName={setCourseName}
                instructor={instructor} setInstructor={setInstructor}
                dept={dept} setDept={setDept}
                courseData={courseData} setCourseData={setCourseData}
                setLoading={setLoading}
            />

            {loading?<Loading/>:null}
            <CourseTable courseData={courseData}/>
        </Box>
        </ThemeProvider>
    )
}