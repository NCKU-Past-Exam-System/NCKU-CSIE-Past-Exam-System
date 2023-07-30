import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { api } from "../../credential";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
export const Upload = () => {
    const [selectedCourse, setSelectedCourse] = useState();
    const [selectedType, setSelectedType] = useState();
    const [courses, setCourses] = useState([]);
    const [file, setFile] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const res= await axios.get(`${api}/courselist?key=grade`);
            setCourses(res.data);
        };
        fetchData();

    }, []);
    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
        console.log(event.target.value);
    };
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };
    const handleUpload = () => {
         const formData = new FormData();
         const courseTeacher = document.getElementById("teacher").value;
         const courseYear = document.getElementById("year").value||0;
         if( selectedCourse==undefined || selectedType==undefined || courseTeacher==undefined || courseYear==undefined){
                alert("請填寫完整資料");
                return;
            }
        if(file==undefined){
            alert("請選擇檔案");
            return;
        }
        formData.append('file', file);
        axios.post(`${api}/uploadfile/?course_id=${selectedCourse}&year=${courseYear}&examtype=${selectedType}&teacher=${courseTeacher}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res);
            if (res.data.status=='error'){
                alert("上傳失敗 "+res.data.message);
            }else{
                alert("上傳成功");
                window.location.reload();
            }
        }).catch((err) => {
            alert(err);
        }
        );
    }
    return (
        <div>
            <h1>Upload</h1>
            <Box sx={{'& > :not(style)': { m: 1, width: '25ch' }}}>
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Course</InputLabel>
                    <Select
                        labelId="course-label"
                        id="demo-simple-select"
                        value={selectedCourse}
                        label="course"
                        required="true"
                        onChange={handleCourseChange}
                    >
                        {courses.map((course) => (
                            <MenuItem value={course.id}>{course.course}</MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                    <FormControl>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        labelId="type-label"
                        id="type"
                        value={selectedType}
                        label="type"
                        required="true"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value={'midterm'}>期中考</MenuItem>
                        <MenuItem value={'final'}>期末考</MenuItem>
                        <MenuItem value={'quiz'}>小考</MenuItem>
                        <MenuItem value={'other'}>其他</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl>
                    <TextField id="teacher" label="teacher" variant="outlined" required="true"/>
                    </FormControl>
                    <FormControl>
                    <TextField id="year" label="year" variant="outlined"  required="true"/>
                </FormControl>
            </Box>
            <input
                type={'file'}
                onChange={
                    (e) => {
                        setFile(e.target.files[0]);
                    }
                }
            />
            <Button variant="contained" component="span" onClick={handleUpload} >
                Upload
            </Button>
        </div>
    )
}