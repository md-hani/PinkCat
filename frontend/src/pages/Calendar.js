import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import plusLogo from '../assets/plusLogo.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import editLogo from '../assets/editImage.png'
import deleteLogo from '../assets/deleteIcon.png'
import dayjs from "dayjs";

const Calendar = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [userCalendars, setUserCalendars] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [nameEdit, setNameEdit] = useState('');
    const [nameEditModalOpen, setNameEditModalOpen] = useState(false);
    const [calNameEdit, setCalNameEdit] = useState('');
    const [calNameEditModalOpen, setCalNameEditModalOpen] = useState(false);
    const [eventCreateModalOpen ,setEventCreateModalOpen] = useState(false);
    const [eventTitle,setEventTitle] = useState('');
    const [calKey, setCalKey] = useState('')
    const [eventStartDateValue, setEventStartDateValue] = useState(null);
    const [eventEndDateValue, setEventEndDateValue] = useState(null);
    const [calendarSelectValue, setCalendarSelectValue] = useState('6605ae3b092f93d119c6228d');
    const [colorSelectValue, setColorSelectValue] = useState("Red");

    const user = useAuthContext()

    var eventUse = []

    const fetchData = async (username) => {
        const response = await fetch('/api/getcurrentuser', {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()
        const calendars = json.calendars

        const response1 = await fetch('/api/getUserCalendars', {
            method: 'POST',
            body: JSON.stringify({calendars}),
            headers: {
                'content-type': 'application/json'
            }
        })

        const json1 = await response1.json()
        console.log(json1)
        setUserCalendars(json1)

        console.log(userCalendars)

        const response2 = await fetch('/api/getUserEvents', {
            method: 'POST',
            body: JSON.stringify({calendars}),
            headers: {
                'content-type': 'application/json'
            }
        })

        const json2 = await response2.json()
        console.log(json2)
        setUserEvents(json2)

        setIsLoad(true)
        setCurrentUser(json)
    }

    useEffect(() => {
        fetchData(user?.user?.username)

    }, [user])

    if(isLoad) {
        console.log(userEvents)
        for(let i = 0; i < userEvents.length; i++)
        {
            eventUse.push(userEvents[i].event)
        }
    }

    const handleNameEdit = (e) => {
        setNameEditModalOpen(true)
    }


    const nameEditHandleClose = () => {
        setNameEditModalOpen(false)
        setNameEdit('')
    }

    const nameEditHandleModalSubmit = async () => {
        if(nameEdit === '')
        {
            toast.error('Field cannot be empty', {position: "bottom-left"});
        }
        else{
            var currentUsername= currentUser.username
            const response = await fetch('/api/createNewCalendar', {
                method: 'POST',
                body: JSON.stringify({nameEdit, currentUsername}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json = await response.json()

            if(response.ok)
            {
                nameEditHandleClose()
                window.location.reload()
            }
            else{
                console.log(json.error)
            }
        }
    }

    const handleCalendarNameDelete = async (e) => {
        const myId = e.currentTarget.value
        const myUser = currentUser.username

        const response = await fetch('/api/deleteMyCalendar', {
            method: 'POST',
            body: JSON.stringify({myId, myUser}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()

        if(response.ok){
            console.log(json)
            window.location.reload()
        }
        else{
            console.log(json.error)
        }
    }

    const handleCalendarNameEdit = (e) => {
        const myId = e.currentTarget.value

        setCalNameEditModalOpen(true)
        setCalKey(myId)
     }

     const calNameEditHandleClose = () => {
        setCalNameEditModalOpen(false)
        setCalNameEdit('')
    }

    const calNameEditHandleModalSubmit = async () => {
        if(calKey !== '')
        {
            const response = await fetch('/api/renameMyCalendar', {
                method: 'POST',
                body: JSON.stringify({calKey, calNameEdit}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json = await response.json()
    
            if(response.ok){
                console.log(json)
                setCalKey('')
                window.location.reload()
                calNameEditHandleClose()
            }
            else{
                console.log(json.error)
            }
        }
    }

    const handleEventCreate = (e) => {
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
            const response = await fetch('/api/createEvent', {
                method: 'POST',
                body: JSON.stringify({eventTitle, startDate, endDate, calendarSelectValue, colorSelectValue}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json = await response.json()
    
            if(response.ok){
                console.log(json)
                window.location.reload()
                eventCreateHandleClose()
            }
            else{
                console.log(json.error)
            }
        }
    }

    const HandleCalendarSelectChange = (e) => {
        setCalendarSelectValue(e.target.value)
    }

    const HandleColorSelectChange = (e) => {
        setColorSelectValue(e.target.value)
    }

    const handleCheckboxClick = async (e) => {
        const enabledValue = e.target.checked
        const idValue = e.target.value
        const response = await fetch('/api/toggleCalendar', {
            method: 'POST',
            body: JSON.stringify({idValue, enabledValue}),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()

        if(response.ok){
            console.log(json)
            window.location.reload()
        }
        else{
            console.log(json.error)
        }
    }


    return(
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
                <label className='modalInputBoxLabelCalendar'> Select Calendar
                    <select className="dropdownBoxCalendarSelect" onChange={HandleCalendarSelectChange} value={calendarSelectValue}>
                            {isLoad && userCalendars.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
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
        <Modal show={nameEditModalOpen} onHide={nameEditHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Create new calendar</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelSI'>Enter name for calendar<input size={20} className='modalInputBoxSI' type='text' onChange={(e) => setNameEdit(e.target.value)} value={nameEdit} required/></label>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={nameEditHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={nameEditHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={calNameEditModalOpen} onHide={calNameEditHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Rename calendar</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelSI'>Enter new name for calendar<input size={20} className='modalInputBoxSI' type='text' onChange={(e) => setCalNameEdit(e.target.value)} value={calNameEdit} required/></label>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={calNameEditHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={calNameEditHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        {isLoad ? currentUser.priv === "Staff" ?
        <div className="calendarPageHolder">
            <Header atDashboard={true} isStaff={currentUser.priv}></Header>
            <div className="TabContentHolderCalendar">
                <div className="CalendarLeftPane">
                    <div style={{width:'100%', display:'flex',  flexDirection:'column'}}>
                        <div style={{width:'100%', display:'flex'}}>
                            <span 
                            style={{whiteSpace: 'nowrap',width: '100%', fontSize: 'x-large', paddingLeft: '10px'}}
                            >
                                My calendars
                            </span>
                            <div style={{justifyContent:'center', display:'flex'}}>
                                <button style={{backgroundColor:'transparent', border:'none'}} onClick={handleNameEdit}><img src={plusLogo} alt="Add Calendar" /></button>
                            </div>
                        </div>
                        <>
                            {isLoad && userCalendars.map(item => (
                                item._id === "6605ae3b092f93d119c6228d" ?
                                <div key={item._id} style={{paddingLeft:'10px', marginTop:'20px'}}>
                                    <input type="checkbox" defaultChecked disabled/>
                                    <span style={{paddingLeft:'10px', fontSize:'large'}}>{item.name}</span>
                                </div>
                                :
                                <div className='CalendarNameDiv' key={item._id} style={{paddingLeft:'10px', marginTop:'20px'}}>
                                    <input type="checkbox" onClick={handleCheckboxClick} value={item._id} checked={item.enabled}/>
                                    <span style={{paddingLeft:'10px', fontSize:'large'}}>{item.name}</span>
                                    <button value={item._id} onClick={handleCalendarNameDelete} style={{float:'right', backgroundColor:'transparent', border:'none'}}><img className="calendarNameEditDelIcon" src={deleteLogo} alt="Edit name"/></button>
                                    <button value={item._id} onClick={handleCalendarNameEdit} style={{float:'right', backgroundColor:'transparent', border:'none'}}><img className="calendarNameEditDelIcon" src={editLogo} alt="Edit name"/></button>
                                </div>
                            ))

                            }
                        </>
                    </div>
                </div>
                <div className="ActualCalendarDisplay">
                    <FullCalendar
                        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                        dayMaxEventRows={3}
                        initialView="dayGridMonth"
                        height={'100%'}
                        headerToolbar={{
                            left: 'today prev,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay addEvent'
                        }}
                        customButtons={{
                            addEvent: {
                              text: '+',
                              click: handleEventCreate
                            }
                        }}
                        dateClick={ function(info) {
                            setEventStartDateValue(dayjs(info.dateStr))
                            setEventCreateModalOpen(true)
                            }
                        }
                        events={eventUse}
                    />
                </div>
            </div>
        </div>
        :
        <div className="calendarPageHolder">
            <Header atDashboard={true} isStaff={currentUser.priv}></Header>
            <div className="TabContentHolderCalendar">
                <div className="ActualCalendarDisplay">
                    <FullCalendar
                        plugins={[ dayGridPlugin, timeGridPlugin ]}
                        dayMaxEventRows={3}
                        initialView="dayGridMonth"
                        height={'100%'}
                        headerToolbar={{
                            left: 'today prev,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        dateClick={ function(info) {
                            alert('Clicked on: ' + info.dateStr)
                            }
                        }
                        events={eventUse}
                    />
                </div>
            </div>
        </div>
        : null}
        </>
    )
}

export default Calendar