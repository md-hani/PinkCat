import Header from "../components/Header"
import RoundedImage from 'react-rounded-image';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect, useRef } from "react";
import editImage from '../assets/editImage.png'
import Card from "react-bootstrap/Card"

const Home = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [file, setFile] = useState([]);
    const inputFile = useRef(null);


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const sendImageBackend = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        var username = currentUser.username
        formData.append("data", username)

        const response = await fetch('/api/profileimage', {
            method: 'POST',
            body: formData,
            headers: {
                'enc-type': 'mulitpart/form-data'
            }
        })
        if(response.ok){
            window.location.reload()
        }
    }

    const fetchData = async (username) => {
        const response = await fetch('/api/getcurrentuser', {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()
        setIsLoad(true)
        setCurrentUser(json)
    }

    const user = useAuthContext()

    useEffect(() => {
        fetchData(user?.user?.username)
        sendImageBackend(file)
    }, [user, file])

    function getImage(){
        const defPic = require('../assets/pINKcAT.jpg')
        try{
            const im = require(`../assets/${currentUser.picture}`)
            return im
        }catch(error){
            return defPic
        }
    }

    const checkoutClick = (e) => {
        alert("Hello")
    }

    return (
        <>
        {isLoad ? currentUser.priv === "Staff" ?
        <div className="studentHomeDash">
            <Header atDashboard={true} isStaff={currentUser.priv}></Header>
            <div className="studentHomePaneHolder">
                <div className="leftPaneStudentHome">
                    <div className="profilePicStudentHome" onClick={() => inputFile.current.click()}>
                        <RoundedImage imageWidth='170' imageHeight='170' roundedColor='#00458A' roundedSize='10' image={getImage()}/>
                        <img className='editImagePicStudentHome' src={editImage} alt="Edit Profile Pic"/>
                        <input type="file" onChange={handleFileChange} ref={inputFile} accept=".jpg"/>
                    </div>
                    <span className='leftPaneTextStudentHomeName'>{currentUser.name}</span>
                    <span className='leftPaneTextStudentHome'>Position: {currentUser.priv}</span>
                    <span className='leftPaneTextStudentHome'>Next Appointment: TBD</span>
                </div>
                <div className="rightPaneStudentHome">
                    <div style={{height: "100%", width: "50%"}}>
                        <Card bg="secondary" onClick={checkoutClick} style={{width: "92%", height: "45%", margin: "20px", cursor: "pointer"}}>
                            <Card.Body style={{fontSize: "larger", color: "white"}}>
                                <Card.Title style={{fontSize: "xxx-large"}}>Checkout Form</Card.Title><br/>
                                Fill out this form when an item has to be checked out for a student.
                            </Card.Body>
                        </Card>
                        <Card bg="secondary" onClick={checkoutClick} style={{width: "92%", height: "45%", margin: "20px", cursor: "pointer"}}>
                            <Card.Body style={{fontSize: "larger", color: "white"}}>
                                <Card.Title style={{fontSize: "xxx-large"}}>Create Event Form</Card.Title><br/>
                                Fill out this form to add an event to  be viewed on Staff and Student Calendars. 
                                It can also be used to add to carousel on landing page.
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{height: "100%", width: "50%"}}>
                        <Card bg="secondary" onClick={checkoutClick} style={{width: "92%", height: "45%", margin: "20px", cursor: "pointer"}}>
                            <Card.Body style={{fontSize: "larger", color: "white"}}>
                                <Card.Title style={{fontSize: "xxx-large"}}>Return Form</Card.Title><br/>
                                Fill out this form when an item has been returned by a student.
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div> :null
        : null}
        </>
    )
}

export default Home