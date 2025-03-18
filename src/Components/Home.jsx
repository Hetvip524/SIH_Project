import React from 'react'
import Header from './Header'
import '../Design/App.css'
import Footer from './Footer'
import '../Design/Body.css'
import Card from './Card';

const Home = () => {
  return (
    <div>
        <Header />
        <div className='body'>
            <div className='greetings'>Welcome To AppraisePro</div>
            <div className='user-card'>
                <Card key='1' name='Administration Portal' link='/admin' url='/admin.png'/>
                <Card key='2' name='Faculty Portal' link='/faculty/login' url='/lecture.png'/>
                <Card key='3' name='Student Portal' link='/student/login' url='/student.png'/>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Home