import Header from "../components/Header"
import RoundedImage from 'react-rounded-image';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect, useRef } from "react";
import editImage from '../assets/editImage.png'
import Card from "react-bootstrap/Card"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import dayjs from "dayjs";

const Home = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [file, setFile] = useState([]);
    const inputFile = useRef(null);
    const [eventCreateModalOpen ,setEventCreateModalOpen] = useState(false);
    const [eventTitle,setEventTitle] = useState('');
    const [eventStartDateValue, setEventStartDateValue] = useState(null);
    const [eventEndDateValue, setEventEndDateValue] = useState(null);
    const [colorSelectValue, setColorSelectValue] = useState("Red");
    const [eventId, setEventId] = useState("");

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

    const eventCreate = (e) => {
        setEventCreateModalOpen(true)
    }

    const eventCreateHandleClose = () => {
        setEventCreateModalOpen(false)
        setEventTitle('')
        setEventStartDateValue(null)
        setEventEndDateValue(null)
    }

    const eventTitleHandleModalSubmit = async () => {

        if(eventTitle === '' || eventStartDateValue === null || eventEndDateValue === null)
        {
            toast.error('Please fill all the fields', {position: "bottom-left"});
        }
        else if ((eventStartDateValue > eventEndDateValue)){
            toast.error('Event end is before event start', {position: "bottom-left"});
        }
        else{
            const startDate = eventStartDateValue.format('YYYY-MM-DDTHH:mm')
            const endDate = eventEndDateValue.format('YYYY-MM-DDTHH:mm')
            const response = await fetch('/api/createHomeEvent', {
                method: 'POST',
                body: JSON.stringify({eventTitle, startDate, endDate, colorSelectValue}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json = await response.json()
    
            if(response.ok){
                eventCreateHandleClose()
            }
            else{
                console.log(json.error)
            }
        }
    }

    const HandleColorSelectChange = (e) => {
        setColorSelectValue(e.target.value)
    }

    const check = () => {

    }

    return (
        <>
        <Modal show={eventCreateModalOpen} onHide={eventCreateHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Create new event</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelSI'>Enter Title<input size={20} className='modalInputBoxSI' type='text' onChange={(e) => setEventTitle(e.target.value)} value={eventTitle} required/></label>
                <div style={{display: "flex", flexDirection: "row", flex: 1}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker 
                            label="Select Event Start" 
                            value={eventStartDateValue}
                            onChange={(newValue) => {setEventStartDateValue(newValue)}}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker 
                            label="Select Event End" 
                            value={eventEndDateValue}
                            onChange={function(newValue) {
                                setEventEndDateValue(newValue)}}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <label className='modalInputBoxLabelCalendar'> Select Color
                    <select className="dropdownBoxCalendarSelect" onChange={HandleColorSelectChange} value={colorSelectValue}>
                        <option value="Red">Red</option>
                        <option value="Purple">Purple</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Pink">Pink</option>
                    </select>
                </label>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={eventCreateHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={eventTitleHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
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
                        <Card bg="secondary" onClick={check} style={{width: "92%", height: "45%", margin: "20px", cursor: "pointer"}}>
                            <Card.Body style={{fontSize: "larger", color: "white"}}>
                                <Card.Title style={{fontSize: "xxx-large"}}>Checkout Form</Card.Title><br/>
                                Fill out this form when an item has to be checked out for a student.
                            </Card.Body>
                        </Card>
                        <Card bg="secondary" onClick={eventCreate} style={{width: "92%", height: "45%", margin: "20px", cursor: "pointer"}}>
                            <Card.Body style={{fontSize: "larger", color: "white"}}>
                                <Card.Title style={{fontSize: "xxx-large"}}>Create Event Form</Card.Title><br/>
                                Fill out this form to add an event to  be viewed on Staff and Student Calendars.
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{height: "100%", width: "50%"}}>
                        <Card bg="secondary" onClick={check} style={{width: "92%", height: "45%", margin: "20px", cursor: "pointer"}}>
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