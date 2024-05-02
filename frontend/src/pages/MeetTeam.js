import Header from '../components/Header'
import React from 'react'
import RoundedImage from 'react-rounded-image';
import { useAuthContext } from "../hooks/useAuthContext";

const MeetTeam = () => {
    const [bios, setBios] = React.useState('');
    const [isLoad, setIsLoad] = React.useState(false);

    const fetchData = async () => {
        const response = await fetch('/api/getallbios', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const json = await response.json()
                setIsLoad(true)
                setBios(json)
    }

    const user = useAuthContext()

    React.useEffect(() => {
        fetchData()
    }, [])

    function getImage(x){
        const defPic = require('../assets/defaultPic.jpg')
        try{
            const im = require(`../assets/${x.picture}`)
            return im
        }catch(error){
            return defPic
        }
    }

    return(
        <>
            <div className="mainDivMT">
                {isLoad &&
                <Header atDashboard={false} isStaff={user?.user?.priv}></Header>} 
                {isLoad && bios.map(item => (
                    <div key={item._id} id={item.name} className='bioDivMT'>
                        <div className='leftPaneMT'>
                            <RoundedImage imageWidth='270' imageHeight='330' roundedColor='#CDAD5D' roundedSize='0' image={getImage(item)} />
                        </div>
                        <div className='rightPaneMT'>
                            <h1 className='nameMT'>{item.name}</h1>
                            <h2 className='positionMT'>{item.position}</h2>
                            <span className='bioMT'>{item.bio}</span>
                        </div>
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default MeetTeam