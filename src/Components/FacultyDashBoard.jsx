import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Design/FacultyDashBoard.css";
import "../Design/FacultyHomepage.css";

const FacultyDashBoard = () => {
  const getEmail = sessionStorage.getItem("email"); // Ensure session storage contains this key
  const [faculty, setFaculty] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchFaculty = async () => {
      if (!getEmail) {
        console.error("No email found in sessionStorage");
        return;
      }

      try {
          const getResponse = await axios.get(`http://localhost:8080/login/faculty/getfaculty/${getEmail}`);
          console.log(getResponse.data)
          setFaculty(getResponse.data);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchFaculty();
  }, [getEmail]);

  if (!faculty) {
    return <p>Loading...</p>; // Prevents errors while data is being fetched
  }

  const imageSrc = faculty.photo
    ? `data:image/jpeg;base64,${faculty.photo}`
    : "/api/placeholder/800/400";

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <div className="profile-photo">
          <img src={imageSrc} alt="Faculty" />
        </div>
        <div className="profile-details">
          <h1>{faculty.firstname} {faculty.lastname}</h1>
          <p className="shortname">{faculty.shortname}</p>
        </div>
      </div>

      <div className="info-section">
        <h2>Basic Information</h2>
        <div className="profile-info">
          <p><strong>First Name:</strong> {faculty.firstname}</p>
          <p><strong>Last Name:</strong> {faculty.lastname}</p>
          <p><strong>Father's Name:</strong> {faculty.fathersname}</p>
          <p><strong>Mother's Name:</strong> {faculty.mothersname}</p>
          {faculty.maritalStatus === 'Married' && <p><strong>Spouse Name:</strong> {faculty.spousename}</p>}
        </div>

        <h2>Professional Details</h2>
        <div className="profile-info">
          <p><strong>ID:</strong> {faculty.id}</p>
          <p><strong>Department:</strong> {faculty.departmentName}</p>
          <p><strong>Designation:</strong> {faculty.designationName}</p>
        </div>

        <h2>Personal Details</h2>
        <div className="profile-info">
          <p><strong>Religion:</strong> {faculty.religion}</p>
          <p><strong>Category:</strong> {faculty.category}</p>
          <p><strong>Gender:</strong> {faculty.gender}</p>
          <p><strong>Date of Birth:</strong> {faculty.birthday}</p>
          <p><strong>Blood Group:</strong> {faculty.bloodgroup}</p>
          <p><strong>Marital Status:</strong> {faculty.maritalStatus}</p>
        </div>

        <h2>Location Information</h2>
        <div className="profile-info">
          <p><strong>Country:</strong> {faculty.country}</p>
          <p><strong>Caste:</strong> {faculty.caste}</p>
          <p><strong>Hometown:</strong> {faculty.hometown}</p>
          <p><strong>Birthplace:</strong> {faculty.birthplace}</p>
        </div>

        <h2>Contact Information</h2>
        <div className="profile-info">
          <p><strong>Phone:</strong> {faculty.phone}</p>
          <p><strong>Secondary Phone:</strong> {faculty.secondaryphone}</p>
          <p><strong>Personal Email:</strong> {faculty.personalemail}</p>
        </div>

        <h2>Additional Information</h2>
        <div className="profile-info">
          <p><strong>Person with Disability:</strong> {faculty.disable ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashBoard;
