import Header from '../components/Header'
import React from 'react'
import RoundedImage from 'react-rounded-image';

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

    React.useEffect(() => {
        fetchData()
    }, [])


    return(
        <>
            <div className="mainDivMT">
                <Header></Header>
                {isLoad && bios.map(item => (
                    <div key={item._id} className='bioDivMT'>
                        <div className='leftPaneMT'>
                            <RoundedImage imageWidth='270' imageHeight='330' roundedColor='#CDAD5D' roundedSize='15' image={require('../assets/pINKcAT.jpg')} />
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