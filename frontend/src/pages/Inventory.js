import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import checkMark from '../assets/checkmark.png'
import wrongMark from '../assets/wrongMark.png'
import _ from 'lodash'

const Inventory = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoad, setIsLoad] = useState(false);
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


    return(
        <>
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
                                        <td style={{fontSize: 'larger'}}>{item.name}</td>
                                        <td>{item.available ? <img src={checkMark} alt="Yes" /> : <img src={wrongMark} alt="No" />}</td>
                                        <td style={{fontSize: 'larger'}}>{item.description}</td>
                                        <td style={{fontSize: 'larger'}}>{item.checkOut}</td>
                                        <td style={{fontSize: 'larger'}}>{item.returnDate}</td>
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