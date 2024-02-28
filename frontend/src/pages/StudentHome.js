import Header from "../components/Header"
import RoundedImage from 'react-rounded-image';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect, useRef } from "react";
import SettingsLogo from '../assets/settingsLogo.png'
import editImage from '../assets/editImage.png'
import checkMark from '../assets/checkmark.png'
import wrongMark from '../assets/wrongMark.png'
import _ from 'lodash'

const StudentHome = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [isTableDataLoad, SetIsTableDataLoad] = useState(false)
    const [tableData, SetTableData] = useState([])
    const [file, setFile] = useState([]);
    const [selectValue, SetSelectValue] = useState('')
    const inputFile = useRef(null);
    const [tabSelection, setTabSelection] = useState('Home')
    const [backgroundColorCalendar, setBackgroundColorCalendar] = useState('')
    const [backgroundColorAnalytics, setBackgroundColorAnalytics] = useState('')
    const [backgroundColorInventory, setBackgroundColorInventory] = useState('')

    const fetchTableData= async () => {
        const response = await fetch('/api/getTableData', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        })

        const json = await response.json()
        SetIsTableDataLoad(true)
        if(response.ok)
        {
            SetTableData(json)
            console.log(json)
        }
    }

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
        fetchTableData()
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

    const handleCalenderTabClick = (e) => {
        setTabSelection('Calendar')
        setBackgroundColorCalendar('#a3a395')
        setBackgroundColorAnalytics('')
        setBackgroundColorInventory('')
    }

    const handleInventoryTabClick = () => {
        setTabSelection('Inventory')
        setBackgroundColorCalendar('')
        setBackgroundColorAnalytics('')
        setBackgroundColorInventory('#a3a395')
    }

    const handleAnalyticsTabClick = () => {
        setTabSelection('Analytics')
        setBackgroundColorCalendar('')
        setBackgroundColorAnalytics('#a3a395')
        setBackgroundColorInventory('')
    }

    const HandleSelectChange = (e) => {
        SetSelectValue(e.target.value)
    }

    console.log(selectValue)

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
                            <button onClick={handleCalenderTabClick} className="TabTextStudentHome" style={{backgroundColor: backgroundColorCalendar}}>CALENDAR</button>
                        </div>
                        <div className="StudentHomeTabTextWrap">
                            <button onClick={handleInventoryTabClick} className="TabTextStudentHome" style={{backgroundColor: backgroundColorInventory}}>INVENTORY</button>
                        </div>
                        {isLoad ? (currentUser.priv === 'Staff') ?
                        <div className="StudentHomeTabTextWrap">
                            <button onClick={handleAnalyticsTabClick} className="TabTextStudentHome" style={{backgroundColor: backgroundColorAnalytics}}>ANALYTICS</button>
                        </div> : null : null}
                        <div className="settingsButtonDivStudentHome">
                            <button className="SettingsButtonStudentHome" onClick={handleSettings}><img className='settingsImgStudentHome' src={SettingsLogo} alt="settings"/></button>
                        </div>
                    </div>
                    <div className="TabContentHolder">
                        {tabSelection === 'Home' ? 
                            <div className="TabContentHolderHome">
                                <span>Home</span> 
                            </div> : null
                        }
                        {tabSelection === 'Inventory' ? 
                            <div className="TabContentHolderInventory">
                                <select className="dropdownBoxInventory" onChange={HandleSelectChange}>
                                    <option defaultValue >Select item</option>
                                    {isTableDataLoad && _.uniqBy(tableData, 'itemType').map(item => (
                                        <option key={item._id} value={item.itemType}>{item.itemType}</option>
                                    ))}
                                </select>
                                <div className="tableHolderInventory">
                                    <table className="TableDataInventory">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Available</th>
                                                <th>Description</th>
                                                <th>Check out<br/>(Date-time)</th>
                                                <th>Return<br/>(Date-time)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isTableDataLoad && tableData.map(item => (
                                                item.itemType === selectValue ?
                                                <tr key={item._id}>
                                                    <td style={{fontSize: 'larger'}}>{item.name}</td>
                                                    <td>{item.available ? <img src={checkMark} alt="Yes" /> : <img src={wrongMark} alt="No" />}</td>
                                                    <td style={{fontSize: 'larger'}}>{item.description}</td>
                                                    <td style={{fontSize: 'larger'}}>{item.checkOut}</td>
                                                    <td style={{fontSize: 'larger'}}>{item.returnDate}</td>
                                                </tr> : null
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div> : null
                        }
                        {tabSelection === 'Analytics' ? 
                            <div className="TabContentHolderAnalytics">
                                <span>Analytics</span> 
                            </div> : null
                        }
                        {tabSelection === 'Calendar' ? 
                            <div className="TabContentHolderCalendar">
                                <span>Calendar</span> 
                            </div>: null
                        }
                    </div>
                </div>
            </div>
        </div> : null}
        </>
    )
}

export default StudentHome