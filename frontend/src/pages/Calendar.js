import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plusLogo from '../assets/plusLogo.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import editLogo from '../assets/editImage.png'
import deleteLogo from '../assets/deleteIcon.png'

const Calendar = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [userCalendars, setUserCalendars] = useState([]);
    const [nameEdit, setNameEdit] = useState('');
    const [nameEditModalOpen, setNameEditModalOpen] = useState(false);

    const user = useAuthContext()

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
        setIsLoad(true)
        setCurrentUser(json)
    }

    var myEvents = []

    if(isLoad)
        {
            for(let i = 0; i < userCalendars.length; i++)
            {
                myEvents.push(...userCalendars[i].events)
            }
        }

    useEffect(() => {
        fetchData(user?.user?.username)

    }, [user])

    console.log(myEvents)

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

    return(
        <>
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
        {isLoad &&
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
                                    <input type="checkbox" defaultChecked/>
                                    <span style={{paddingLeft:'10px', fontSize:'large'}}>{item.name}</span>
                                </div>
                                :
                                <div className='CalendarNameDiv' key={item._id} style={{paddingLeft:'10px', marginTop:'20px'}}>
                                    <input type="checkbox"/>
                                    <span style={{paddingLeft:'10px', fontSize:'large'}}>{item.name}</span>
                                    <button style={{float:'right', backgroundColor:'transparent', border:'none'}}><img className="calendarNameEditDelIcon" src={deleteLogo} alt="Edit name"/></button>
                                    <button style={{float:'right', backgroundColor:'transparent', border:'none'}}><img className="calendarNameEditDelIcon" src={editLogo} alt="Edit name"/></button>
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
                              click: function() {
                                alert('clicked the custom button!');
                              }
                            }
                        }}
                        dateClick={ function(info) {
                            alert('Clicked on: ' + info.dateStr)
                            }
                        }
                        events={myEvents}
                    />
                </div>
            </div>
        </div>}
        </>
    )
}

export default Calendar