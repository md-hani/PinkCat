import Header from '../components/Header'
import React from 'react'

const MeetTeam = () => {
    const [bios, setBios] = React.useState('');
    const [counter, setCounter] = React.useState(0);

    // const createDivs = async (num) => {
    //     const response = await fetch('/api/getallbios', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //     const json = await response.json()
    //     setBios(json)

    //     if(!response.ok)
    //     {
    //         console.log('ERROR')
    //     }
    //     if(response.ok)
    //     {
    //         console.log(bios)
    //         return(
    //             <div>
    //                 <h2>Hello</h2>
    //             </div>
    //         )
    //     }
    // }
    // async function fetchData() {
    //     const response = await fetch('/api/getallbios', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //     const json = await response.json()
    //     setBios(json)

    //     if(!response.ok)
    //     {
    //         console.log('ERROR')
    //     }
    //     if(response.ok)
    //     {
    //         console.log(bios)
    //     }
    // }

    // if(counter < 1)
    // {
    //     var x = counter
    //     fetchData()
    //     setCounter(x+1)
    // }

    // return(
    //     <>
    //         <div className="mainDivMT">
    //             <Header></Header>
    //         </div>
    //     </>
    //)
}

export default MeetTeam