import React from 'react'
import '../Design/Faculty.css'

const Faculty = ({data}) => {

  const onClick = () => {
    
  }

  return (
    <div className="faculty-item" onClick={onClick}>
    <div className="faculty-icon">
    <img 
          src={`https://ui-avatars.com/api/?name=${data.firstname}&background=random&size=128`} 
          alt={data.firstname + ' ' + data.lastname} 
        />
    </div>
    <div className="faculty-content">
      <div className="faculty-name">{data.firstname} {data.lastname && data.lastname}</div>
      <div className="faculty-email">{data.email}</div>
      <div className="faculty-department">{data.departmentName}</div>
    </div>
  </div>
  )
}

export default Faculty