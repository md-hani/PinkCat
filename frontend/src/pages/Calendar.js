import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const Calendar = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);

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
        setIsLoad(true)
        setCurrentUser(json)
    }

    useEffect(() => {
        fetchData(user?.user?.username)
    }, [user])

    var myEvents = [{title: 'Event 1', start: '2024-03-18T18:30', end: '2024-03-18T20:30'}, {title: 'Event 4', start: '2024-03-18T19:30', end: '2024-03-18T20:30'}, {title: 'blah blah blah blah blah blah blah', start: '2024-03-18T14:30', end: '2024-03-18T15:00', color: 'red'}, {title: 'Event 3', start: '2024-03-18T08:30', end: '2024-03-18T10:30'}]

    return(
        <>
        {isLoad &&
        <div className="calendarPageHolder">
            <Header atDashboard={true} isStaff={currentUser.priv}></Header>
            <div className="TabContentHolderCalendar">
                <div className="CalendarLeftPane">
                    <span style={{fontSize:'larger'}}>My calendars</span>
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