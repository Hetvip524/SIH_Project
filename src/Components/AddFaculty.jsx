import React from 'react'
import axios from 'axios'
import { useState , useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Design/AddFaculty.css'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {

    const [formData , setFormData] = useState({
      email:'',
      facultyid:'',
      department:'',
      designation:''
    })
    const [designation , setDesignation] = useState([])
    const [department , setDepartment] = useState([])
    const navigate = useNavigate();

    

      useEffect(() => {
        const fetchDesignation = () => {
          axios.get('http://localhost:8080/designation/getAll')
            .then((response) => {
              setDesignation(response.data)
            })
            .catch((error) => {
              console.log(error)
              toast.error('Server connection Failed!!');
            });
        }
        const fetchDepartment = () => {
          axios.get('http://localhost:8080/department/getAll')
            .then((response) => {
              setDepartment(response.data)
            })
            .catch((error) => {
              console.log(error)
              toast.error('Server connection Failed!!');
            });
        }
        fetchDepartment()
        fetchDesignation()
      } , [])

      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        axios.post('http://localhost:8080/faculty/add', formData)
            .then((response) => {
              toast.success('Faculty successfully added!');
              navigate('/admin')
            })
            .catch((error) => {
              toast.error('Insertion Failed!!');
            });
      }
      const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
    };
    

  return (
    <>
    <Header />
    <div className="form-container">
    
    <form className='form-card' onSubmit={handleSubmit}>
    <h1 className="form-title">Add Faculty</h1>
      <input 
        type="text"
        name="email"
        onChange={handleChange}
        placeholder="Enter Email"
        className='email-input'
        required
      />
      <input 
        type="text"
        name="facultyid"
        onChange={handleChange}
        placeholder="Enter Id"
        className='email-input'
        required
      />
      <select 
        type="text"
        name="department"
        onChange={handleChange}
        placeholder="Enter Department"
        className='email-input'
        required
      >
        <option value=''>Select a Department</option>
      {
        department.length !== 0 && 
          department.map((dep) => (
            <option value={dep.name} key={dep.id}>{dep.name}</option>
          )) 
      }
      </select>
      <select 
        type="text"
        name="designation"
        onChange={handleChange}
        placeholder="Enter designation"
        className='email-input'
        required
      >
        <option value=''>Select a Designation</option>
        {
        designation.length !== 0 && 
          designation.map((des) => (
            <option value={des.designation} key={des.id}>{des.designation}</option>
          )) 
      }
        </select>
    <button 
    type="submit" className='submit-button'>Submit</button>
    <ToastContainer />
</form>
</div>
<Footer />
</>
  )
}

export default AddFaculty