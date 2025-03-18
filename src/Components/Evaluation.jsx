import React, { useState , useEffect } from 'react'
import '../Design/Evaluation.css'
import axios from 'axios'

const Evaluation = () => {
    const [faculty, setFaculty] = useState([]);
    const [formData , setFormData] = useState({
        facultyname:'',
        facultyemail:'',
        branch:'',
        year:'',
        subject:'',
        for:''
    })
    const year = [2020 , 2021, 2022 , 2023 , 2024 , 2025]
    const [subject,setSubject] = useState([]);
    const [allowedSubject, setAllowedSubject] = useState([])

    useEffect(() => {
      const fetchFaculty = async () => {
        try {
          const response = await axios.get("http://localhost:8080/faculty/getAll");
          setFaculty(response.data);
        } catch (e) {
          console.error("Error fetching data:", e);
        }
      };
      const fetchSubject = async () => {
        try {
          const response = await axios.get("http://localhost:8080/subject/All");
          console.log(response.data)
          setSubject(response.data);
        } catch (e) {
          console.error("Error fetching data:", e);
        }
      };
      fetchSubject();
      fetchFaculty();
    }, []);

    const handleChange = (e) => {
      setFormData(prev => ({
          ...prev, 
          [e.target.name]: e.target.value
      }));
      if(e.target.name === 'facultyname'){
        const f = faculty.find(f => f.firstname + ' ' + f.lastname === e.target.value)
        const email = f.email
        const department = f.departmentName
        const allowed = subject.filter(s => s.department.name === department)
        setAllowedSubject(allowed)
        setFormData(prev => ({
          ...prev,
          facultyemail:email,
          branch:department
        }))
      }
  };
  
  return (
    <div>
        <h1>Generate Feedback Form</h1>
        <form className='feedback-form'>
        <div className="feedback-form-group">
        <label className="feedback-form-label required" >Select Faculty</label>
        <select className="feedback-name-select" name="facultyname" onChange={handleChange} required>
            <option value=''>Select a faculty</option>
            {
                faculty.map((f) => (
                    <option value={f.firstname + ' ' + f.lastname} key={f.email}>{f.firstname + ' ' + f.lastname}</option>
                ))
            }
        </select>
        </div>
        <input type='text' name='facultyemail' value={formData.facultyemail} readOnly/>
        <div className="feedback-form-group">
        <input type='text' name='branch' value={formData.branch} readOnly/>
        </div>
        <div className="feedback-form-group">
        <label className="feedback-form-label required" >Select year of student</label>
        <select className="year" name="year" onChange={handleChange} required>
        <option value=''>Select a year</option>
        {
                year.map((b) => (
                    <option value={b} key={b}>{b}</option>
                ))
        }
        </select>
        </div>
        <div className="feedback-form-group">
        <label className="feedback-form-label required" >Select Subject</label>
        <select className="year" name="year" onChange={handleChange} required>
        <option value=''>Select a subject</option>
        {
                allowedSubject.map((b) => (
                    <option value={b.name} key={b.id}>{b.name}</option>
                ))
        }
        </select>
        </div>
        <button type='submit' className='submit-button'>Generate Form</button>
        </form>
    </div>
  )
}

export default Evaluation