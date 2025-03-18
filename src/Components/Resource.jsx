import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import '../Design/NoPublicationPage.css';
import '../Design/AdminPage.css'
import '../Design/Resource.css'
import axios from 'axios'
import PublicationList from './PublicationList';

const Resource = () => {
    const [publication, setPublication] = useState([]);
    var allPublication = [];
    useEffect(() => {
        axios.get("http://localhost:8080/publication/approved")
          .then((response) => {
            allPublication = response.data
            setPublication(response.data);
          })
          .catch((error) => {
            console.error("Error fetching PDFs:", error);
          });
      }, []);

      const search = (e) => {
        
      }

  return (
    <div>
        <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search By Tags"
          onChange={search}
          className="search-input"
        />
        <div className="search-icon">
          <svg
            className="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
        {
                  publication.length==0 ? 
                  <div className='empty-body'>
                  <div className="empty-state">
                      <div className="icon-container">
                          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                              </path>
                          </svg>
                      </div>
                      <h1>No Publications Available</h1>
                  </div>
                  </div>
                    :
                     <PublicationList key={1} data={publication} />
        }
    </div>
  )
}

export default Resource