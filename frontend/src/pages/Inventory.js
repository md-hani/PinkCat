import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import checkMark from '../assets/checkmark.png'
import wrongMark from '../assets/wrongMark.png'
import editImg from '../assets/editImage.png'
import _ from 'lodash'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';


const Inventory = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [nameEdit, setNameEdit] = useState('');
    const [nameEditKey, setNameEditKey] = useState('');
    const [nameEditModalOpen, setNameEditModalOpen] = useState(false);
    const [availableEdit, setAvailableEdit] = useState('');
    const [availableEditKey, setAvailableEditKey] = useState('');
    const [availableEditModalOpen, setAvailableEditModalOpen] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [descriptionEditKey, setDescriptionEditKey] = useState('');
    const [descriptionEditModalOpen, setDescriptionEditModalOpen] = useState(false);
    const [checkoutEditKey, setCheckoutEditKey] = useState('');
    const [checkoutEditModalOpen, setCheckoutEditModalOpen] = useState(false);
    const [checkoutDateValue, setCheckoutDateValue] = useState(null);
    const [returnEditKey, setReturnEditKey] = useState('');
    const [returnEditModalOpen, setReturnEditModalOpen] = useState(false);
    const [returnDateValue, setReturnDateValue] = useState(null);
    const [isTableDataLoad, SetIsTableDataLoad] = useState(false)
    const [tableData, SetTableData] = useState([])
    const [selectValue, SetSelectValue] = useState('')

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
        fetchTableData()
    }, [user])

    const HandleSelectChange = (e) => {
        SetSelectValue(e.target.value)
    }

    const handleNameEdit = (e) => {
        setNameEditKey(e.currentTarget.value)
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
            if(!(nameEditKey === ''))
            {
                const response = await fetch('/api/setNameInventory', {
                    method: 'POST',
                    body: JSON.stringify({nameEditKey, nameEdit}),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const json = await response.json()

                if(response.ok)
                {
                    nameEditHandleClose()
                    setNameEditKey('')
                    window.location.reload()
                }
                else{
                    console.log(json.error)
                }
            }
        }
    }

    const handleDescriptionEdit = (e) => {
        setDescriptionEditKey(e.currentTarget.value)
        setDescriptionEditModalOpen(true)
    }

    const descriptionEditHandleClose = () => {
        setDescriptionEditModalOpen(false)
        setDescriptionEdit('')
    }

    const descriptionEditHandleModalSubmit = async () => {
        if(descriptionEdit === '')
        {
            toast.error('Field cannot be empty', {position: "bottom-left"});
        }
        else{
            if(!(descriptionEditKey === ''))
            {
                const response = await fetch('/api/setDescriptionInventory', {
                    method: 'POST',
                    body: JSON.stringify({descriptionEditKey, descriptionEdit}),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const json = await response.json()

                if(response.ok)
                {
                    descriptionEditHandleClose()
                    setDescriptionEditKey('')
                    window.location.reload()
                }
                else{
                    console.log(json.error)
                }
            }
        }
    }

    const handleAvailableEdit = (e) => {
        setAvailableEditKey(e.currentTarget.value)
        setAvailableEditModalOpen(true)
    }

    const availableEditHandleClose = () => {
        setAvailableEditModalOpen(false)
        setAvailableEdit('')
    }

    const availableEditHandleModalSubmit = async () => {
        if(availableEdit === '')
        {
            toast.error('Please select an option', {position: "bottom-left"});
        }
        else{
            if(!(availableEditKey === ''))
            {
                const response = await fetch('/api/setAvailableInventory', {
                    method: 'POST',
                    body: JSON.stringify({availableEditKey, availableEdit}),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const json = await response.json()

                if(response.ok)
                {
                    availableEditHandleClose()
                    setAvailableEditKey('')
                    window.location.reload()
                }
                else{
                    console.log(json.error)
                }
            }
        }
    }

    const handleCheckoutEdit = (e) => {
        setCheckoutEditKey(e.currentTarget.value)
        setCheckoutEditModalOpen(true)
    }


    const checkoutEditHandleClose = () => {
        setCheckoutEditModalOpen(false)
        setCheckoutDateValue(null)
    }

    const checkoutEditHandleModalSubmit = async () => {
        var myDate = null
        if(checkoutDateValue === null)
        {
            myDate = '-'
            const response = await fetch('/api/setCheckoutInventory', {
                method: 'POST',
                body: JSON.stringify({checkoutEditKey, myDate}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json = await response.json()

            if(response.ok)
            {
                checkoutEditHandleClose()
                setCheckoutEditKey('')
                window.location.reload()
            }
            else{
                console.log(json.error)
            }
        }
        else{
            if(!(checkoutEditKey === ''))
            {
                myDate = checkoutDateValue.format('MM-DD-YYYY  HH:mm')
                const response = await fetch('/api/setCheckoutInventory', {
                    method: 'POST',
                    body: JSON.stringify({checkoutEditKey, myDate}),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const json = await response.json()

                if(response.ok)
                {
                    checkoutEditHandleClose()
                    setCheckoutEditKey('')
                    window.location.reload()
                }
                else{
                    console.log(json.error)
                }
            }
        }

    }

    const handleReturnEdit = (e) => {
        setReturnEditKey(e.currentTarget.value)
        setReturnEditModalOpen(true)
    }


    const returnEditHandleClose = () => {
        setReturnEditModalOpen(false)
        setReturnDateValue(null)
    }

    const returnEditHandleModalSubmit = async () => {
        var myDate = null
        if(returnDateValue === null)
        {
            myDate = '-'
            const response = await fetch('/api/setReturnInventory', {
                method: 'POST',
                body: JSON.stringify({returnEditKey, myDate}),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json = await response.json()

            if(response.ok)
            {
                returnEditHandleClose()
                setReturnEditKey('')
                window.location.reload()
            }
            else{
                console.log(json.error)
            }
        }
        else{
            if(!(returnEditKey === ''))
            {
                myDate = returnDateValue.format('MM-DD-YYYY  HH:mm')
                const response = await fetch('/api/setReturnInventory', {
                    method: 'POST',
                    body: JSON.stringify({returnEditKey, myDate}),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const json = await response.json()

                if(response.ok)
                {
                    returnEditHandleClose()
                    setReturnEditKey('')
                    window.location.reload()
                }
                else{
                    console.log(json.error)
                }
            }
        }

    }

    return(
        <>
        {isLoad && currentUser.priv === 'Staff' ?
        <>
        <Modal show={nameEditModalOpen} onHide={nameEditHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Edit name</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelSI'>Enter new name<input size={20} className='modalInputBoxSI' type='text' name='name' onChange={(e) => setNameEdit(e.target.value)} value={nameEdit} required/></label>
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
        <Modal show={descriptionEditModalOpen} onHide={descriptionEditHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Edit description</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <label className='modalInputBoxLabelSI'>Enter new description<input size={20} className='modalInputBoxSI' type='text' name='name' onChange={(e) => setDescriptionEdit(e.target.value)} value={descriptionEdit} required/></label>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={descriptionEditHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={descriptionEditHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={availableEditModalOpen} onHide={availableEditHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Edit availability</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <input size={20} className='modalInputBoxSI' type='radio' value='true' checked={availableEdit === 'true'} onChange={(e) => setAvailableEdit(e.target.value)} required/>
                <span className="AvailableEditModalText">Available</span><br/><br/>
                <input size={20} className='modalInputBoxSI' type='radio' value='false' checked={availableEdit === 'false'} onChange={(e) => setAvailableEdit(e.target.value)} required/>
                <span className="AvailableEditModalText">Not available</span>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={availableEditHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={availableEditHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={checkoutEditModalOpen} onHide={checkoutEditHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Edit checkout date</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker 
                        label="Select Date & Time" 
                        value={checkoutDateValue}
                        onChange={(newValue) => {setCheckoutDateValue(newValue)}}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={checkoutEditHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={checkoutEditHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={returnEditModalOpen} onHide={returnEditHandleClose} centered>
            <Modal.Header closeButton className='modalTitleTextSI'>
                <Modal.Title className=''>Edit return date</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modalBodySI'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker 
                        label="Select Date & Time" 
                        value={returnDateValue}
                        onChange={(newValue) => {setReturnDateValue(newValue)}}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={returnEditHandleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={returnEditHandleModalSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        </>
        : null
        }
        {isLoad ?
            <div>
                <Header atDashboard={true} isStaff={currentUser.priv}></Header>
                <div className="TabContentHolderInventory">
                    <select className="dropdownBoxInventory" onChange={HandleSelectChange}>
                        <option defaultValue >All items</option>
                        {isTableDataLoad && _.uniqBy(tableData, 'itemType').map(item => (
                            <option key={item._id} value={item.itemType}>{item.itemType}</option>
                        ))}
                    </select>
                    <div className="tableHolderInventory">
                        <table className="TableDataInventory">
                            <thead>
                                {isLoad ? (currentUser.priv === 'Staff') ?
                                <tr>
                                    <th style={{width: '15%'}}>Name</th>
                                    <th style={{width: '15%'}}>Available</th>
                                    <th style={{width: '40%'}}>Description</th>
                                    <th style={{width: '15%'}}>Check out<br/>(Date-time)</th>
                                    <th style={{width: '15%'}}>Return<br/>(Date-time)</th>
                                </tr>
                                :
                                <tr>
                                    <th style={{width: '15%'}}>Name</th>
                                    <th style={{width: '15%'}}>Available</th>
                                    <th style={{width: '40%'}}>Description</th>
                                </tr>
                                : null}
                            </thead>
                            <tbody>
                                {isTableDataLoad && tableData.map(item => (
                                    item.itemType === selectValue || selectValue === 'All items' || selectValue === '' ? currentUser.priv === 'Staff' ? 
                                    <tr key={item._id}>
                                        <td style={{fontSize: 'larger'}}><div className="divWrapInventoryData"><span className="inventoryDataText">{item.name}</span><button value={item._id} className="InventoryEditButton" onClick={handleNameEdit}><img className='editImageInventory' src={editImg} alt='Edit Name'/></button></div></td>
                                        <td>
                                            {item.available ? 
                                            <div className="divWrapInventoryData"><img src={checkMark} alt="Yes" /><button value={item._id} className="InventoryEditButton" onClick={handleAvailableEdit}><img className='editImageInventory' src={editImg} alt='Edit Name'/></button></div>
                                            : 
                                            <div className="divWrapInventoryData"><img src={wrongMark} alt="Yes" /><button value={item._id} className="InventoryEditButton" onClick={handleAvailableEdit}><img className='editImageInventory' src={editImg} alt='Edit Name'/></button></div>}
                                        </td>
                                        <td style={{fontSize: 'larger'}}><div className="divWrapInventoryData"><span className="inventoryDataText">{item.description}</span><button value={item._id} className="InventoryEditButton" onClick={handleDescriptionEdit}><img className='editImageInventory' src={editImg} alt='Edit Name'/></button></div></td>
                                        <td style={{fontSize: 'larger'}}><div className="divWrapInventoryData"><span className="inventoryDataText">{item.checkOut}</span><button value={item._id} className="InventoryEditButton" onClick={handleCheckoutEdit}><img className='editImageInventory' src={editImg} alt='Edit Name'/></button></div></td>
                                        <td style={{fontSize: 'larger'}}><div className="divWrapInventoryData"><span className="inventoryDataText">{item.returnTime}</span><button value={item._id} className="InventoryEditButton" onClick={handleReturnEdit}><img className='editImageInventory' src={editImg} alt='Edit Name'/></button></div></td>
                                    </tr> 
                                    : 
                                    <tr key={item._id}>
                                        <td style={{fontSize: 'larger'}}>{item.name}</td>
                                        <td>{item.available ? <img src={checkMark} alt="Yes" /> : <img src={wrongMark} alt="No" />}</td>
                                        <td style={{fontSize: 'larger'}}>{item.description}</td>
                                    </tr> : null
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> : null}
        </>
    )
}

export default Inventory