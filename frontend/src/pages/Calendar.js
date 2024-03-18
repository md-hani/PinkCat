import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

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

    return(
        <>
        {isLoad &&
        <div className="calendarPageHolder">
            <Header atDashboard={true} isStaff={currentUser.priv}></Header>
            <div className="TabContentHolderCalendar">
                <div className="CalendarLeftPane">
                    Hello
                </div>
                <div className="ActualCalendarDisplay">
                    <FullCalendar
                        plugins={[ dayGridPlugin, timeGridPlugin ]}
                        initialView="dayGridMonth"
                        height={'100%'}
                        headerToolbar={{
                            left: 'today prev,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                    />
                </div>
            </div>
        </div>}
        </>
    )
}

export default Calendar