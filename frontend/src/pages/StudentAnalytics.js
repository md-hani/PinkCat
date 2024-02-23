import { Link } from "react-router-dom"
import Header from "../components/Header"
import RoundedImage from 'react-rounded-image';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect, useRef } from "react";
import SettingsLogo from '../assets/settingsLogo.png'
import editImage from '../assets/editImage.png'

const StudentHome = () => {
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

    const handleSettings = () => {

    }

    return (
        <>
        {isLoad ? <div className="studentHomeDash">
            <Header></Header>
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
                    <div className="tabLinksHolder">
                        <div className="StudentHomeTabTextWrap">
                            <Link to='/studentcalendar' className="TabTextStudentHome">CALENDAR</Link>
                        </div>
                        <div className="StudentHomeTabTextWrap">
                            <Link to='/studentinventory' className="TabTextStudentHome">INVENTORY</Link>
                        </div>
                        {isLoad ? (currentUser.priv === 'Staff') ?
                        <div className="StudentHomeTabTextWrap">
                            <Link to='/studentanalytics' className="TabTextStudentHome">ANALYTICS</Link>
                        </div> : null : null}
                        <div className="settingsButtonDivStudentHome">
                            <button className="SettingsButtonStudentHome" onClick={handleSettings}><img className='settingsImgStudentHome' src={SettingsLogo} alt="settings"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null}
        </>
    )
}

export default StudentHome