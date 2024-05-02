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
import Select from 'react-select'
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
    const [checkoutFormModalOpen ,setCheckoutFormModalOpen] = useState(false);
    const [clientName, setClientName] = useState('')
    const [studentId, setStudentId] = useState('')
    const [checkoutTime, setCheckoutTime] = useState(null)
    const [intendedReturnTime, setIntendedReturnTime] = useState(null)
    const [itemSelectValue, setItemSelectValue] = useState('')
    const [isCheckoutItemsLoad, setIsCheckoutItemsLoad] = useState(false)
    const [checkoutFormSelectOptions, setCheckoutFormSelectOptions] = useState([])
    const [returnFormModalOpen ,setReturnFormModalOpen] = useState(false);
    const [returnClientName, setReturnClientName] = useState('')
    const [returnStudentId, setReturnStudentId] = useState('')
    const [returnTime, setReturnTime] = useState(null)
    const [returnFormSelectOptions, setReturnFormSelectOptions] = useState([])

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

        const response1 = await fetch('/api/getTableData', {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json1 = await response1.json()
        const arrFillForCheckout = []
        const arrFillForReturn = []
        for(let i = 0; i < json1.length; i++){
            if(json1[i].available === true)
            {
                arrFillForCheckout.push({value: json1[i]._id, label: json1[i].description});
            }
            else{
                arrFillForReturn.push({value: json1[i]._id, label: json1[i].description});
            }
        }
        setCheckoutFormSelectOptions(arrFillForCheckout)
        setReturnFormSelectOptions(arrFillForReturn)
        setIsCheckoutItemsLoad(true)
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

    const checkoutFormCreate = () => {
        setCheckoutFormModalOpen(true)
    }

    const HandleColorSelectChange = (e) => {
        setColorSelectValue(e.target.value)
    }

    const checkoutFormHandleClose = () => {
        setCheckoutFormModalOpen(false)
        setItemSelectValue(null)
        setClientName('')
        setStudentId("")
        setCheckoutTime(null)
        setIntendedReturnTime(null)
    }

    const checkoutFormHandleModalSubmit = async () => {

        if(clientName === '' || checkoutTime === null || intendedReturnTime === null || itemSelectValue === null || studentId === '')
        {
            toast.error('Please fill all the fields', {position: "bottom-left"});
        }
        else if ((checkoutTime > intendedReturnTime)){
            toast.error('Event end is before event start', {position: "bottom-left"});
        }
        else{
            const checkoutDate = checkoutTime.format('MM-DD-YYYY  HH:mm')
            const returnDate = intendedReturnTime.format('MM-DD-YYYY  HH:mm')
            const selectValue = itemSelectValue.value
            const response = await fetch('/api/checkoutItem', {
                method: 'POST',
                body: JSON.stringify({checkoutDate, returnDate, selectValue}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json = await response.json()
    
            if(response.ok){
                checkoutFormHandleClose()
                toast.success("Item Checked Out", {position: "bottom-left"})
                window.location.reload()
            }
            else{
                console.log(json.error)
            }
        }
    }

    const returnFormCreate = () => {
        setReturnFormModalOpen(true)
    }

    const returnFormHandleClose = () => {
        setReturnFormModalOpen(false)
        setItemSelectValue(null)
        setReturnClientName('')
        setReturnStudentId("")
        setReturnTime(null)
    }

    const returnFormHandleModalSubmit = async () => {

        if(returnClientName === '' || returnTime === null || itemSelectValue === null || returnStudentId === '')
        {
            toast.error('Please fill all the fields', {position: "bottom-left"});
        }
        else{
            const selectValue = itemSelectValue.value
            const response = await fetch('/api/returnItem', {
                method: 'POST',
                body: JSON.stringify({selectValue}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json = await response.json()
    
            if(response.ok){
                returnFormHandleClose()
                toast.success('Item Returned', {position: "bottom-left"});
                window.location.reload()
            }
            else{
                console.log(json.error)
            }
        }
    }

    return (
        <>
        <Modal show={returnFormModalOpen} onHide={returnFormHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Return Form</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelCalendar'> Select Item
                    {isCheckoutItemsLoad ?
                    <Select className="dropdownBoxCalendarSelect" onChange={setItemSelectValue} value={itemSelectValue} options={returnFormSelectOptions} menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}/>
                    : null}       
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker 
                        label="Enter Return Time" 
                        value={returnTime}
                        onChange={function(newValue) {
                            setReturnTime(newValue)}}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <label className='modalInputBoxLabelSI'>Enter Name<input size={20} className='modalInputBoxSI' type='text' onChange={(e) => setReturnClientName(e.target.value)} value={returnClientName} required/></label>
                <label className='modalInputBoxLabelSI'>Enter Student ID (S00)<input size={20} className='modalInputBoxSI' type='text' onChange={(e) => setReturnStudentId(e.target.value)} value={returnStudentId} required/></label>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={returnFormHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={returnFormHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={checkoutFormModalOpen} onHide={checkoutFormHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Checkout Form</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelCalendar'> Select Item
                    {isCheckoutItemsLoad ?
                    <Select className="dropdownBoxCalendarSelect" onChange={setItemSelectValue} value={itemSelectValue} options={checkoutFormSelectOptions} menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}/>
                    : null}       
                </label>
                <div style={{display: "flex", flexDirection: "row", flex: 1}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker 
                            label="Enter Checkout Time" 
                            value={checkoutTime}
                            onChange={(newValue) => {setCheckoutTime(newValue)}}
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
                            label="Enter Return Time" 
                            value={intendedReturnTime}
                            onChange={function(newValue) {
                                setIntendedReturnTime(newValue)}}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <label className='modalInputBoxLabelSI'>Enter Name<input size={20} className='modalInputBoxSI' type='text' onChange={(e) => setClientName(e.target.value)} value={clientName} required/></label>
                <label className='modalInputBoxLabelSI'>Enter Student ID (S00)<input size={20} className='modalInputBoxSI' type='text' onChange={(e) => setStudentId(e.target.value)} value={studentId} required/></label>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={checkoutFormHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={checkoutFormHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
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
                        <Card bg="secondary" onClick={checkoutFormCreate} style={{width: "92%", height: "45%", margin: "20px", cursor: "pointer"}}>
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
                        <Card bg="secondary" onClick={returnFormCreate} style={{width: "92%", height: "45%", margin: "20px", cursor: "pointer"}}>
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