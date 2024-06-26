import Header from '../components/Header'
import React from 'react'
import dslr from '../assets/dslr.png'
import lBoard from '../assets/Aktunc.png'
import poster from '../assets/posters.jpg'
import { useAuthContext } from "../hooks/useAuthContext";


const Services = () => {    
    const user = useAuthContext()

    React.useEffect(() => {

    }, [])

    return(
        <>
            <div className="mainDivServ">
                <Header atDashboard={false} isStaff={user?.user?.priv}></Header>
                        <h1 className='serveHeadServ'>Our Services</h1>
                        <span className='headerDescrptServ'>The Academic Media Center is focused on helping students, faculty and staff with the design, 
                                                            development and production of multimedia in support of the curriculum and St. Mary's University's 
                                                            Mission and the vision of the Society of Mary.</span>
                        <div className='eqpmtServ'>     
                            <div className = 'eqpmtImgServ'/> <img className='dslrServ' src={dslr} alt="dslr" />
                            <div className = 'eqpmtTextServ'>
                                <h2 className='eqpmtHeadServ'>Media Equipment</h2>
                                <span className='eqpmtDscrptServ'>Our Academic Media Center provides certification opportunities allowing users to check out AV 
                                                                equipment such as DSLR Cameras, Portable Audio, and Projector/Display packages. Some equipment 
                                                                require certifications that are required for students but encouraged for faculty and staff.</span>
                            </div>
                        </div>
                        <div className='AVServ'>
                            <div className = 'AVImgServ'/><img className='lBoardServ' src={lBoard} alt="lBoard" /> 
                            <div className = 'AVTextServ'>               
                                <h2 className='AVHeadServe'>Video & Audio Production</h2>
                                <span className='AVDscrptServ'>Things You Should Know. Our lightboard allows you to record an interactive presentation 
                                                            while showing your face to your audience. You can write in front of you on the glass board and the 
                                                            image will be mirrored on film so that your audience is able to read what you write. In addition, 
                                                            there is a greenscreen behind the board, giving you full control of your background. You also have 
                                                            full control of a mouse and keyboard, giving you full access to browse the internet or have full 
                                                            control of your presentation during the recording. The lightboard, located in Studio 113 within 
                                                            the Academic Media Center, can be reserved for an hour time slot or as otherwise agreed upon. Every 
                                                            recording does need assistance, so a trained student or staff member will be aiding you in the 
                                                            recording process during the session.</span>
                            </div>                                
                        </div>
                        <div className='researchServ'>
                            <div className = 'researchImgServ'/><img className='posterServ' src={poster} alt="poster" />
                            <div className = 'researchTextServ'>
                                <h2 className='researchHeadServe'>Academic Research Printing</h2>
                                <span className='researchDscrptServ'>Everyone likes, “FREE.” When your poster is part of sponsored “Academic Research”, your poster
                                                                    should be free. Please check with your sponsor to see if you project qualifies. Other poster 
                                                                    printing is $50 per poster. Bring PDF of your poster to the Academic Media Center in the 
                                                                    Learning Commons on a flash drive/memory stick. ATS Research Partner: Office of Student Research and Inquiry Melissa Karlin, Ph. D. 
                                                                    Office of Student Research and Inquiry Director, Garni Science Hall, Room 203. For more information or to schedule a session appointment, please contact 
                                                                    Director, <a href="mailto:jflores96@stmarytx.edu">Jacqueline Flores</a>, Media Specialist, <a href="mailto:adavila25@stmarytx.edu">Anna Davila</a> or Media Specialist, <a href="mailto:lsanchez@stmarytx.edu">Liza Sánchez</a> at our 
                                                                    direct line: 210-436-3503.</span>
                            </div>
                        </div>
            </div>
        </>
    )
}

export default Services