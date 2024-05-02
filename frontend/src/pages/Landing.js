import React from 'react'
import Header from '../components/Header'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import RoundedImage from 'react-rounded-image';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

const Landing = () =>
{
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

    function getImage(x){
        const defPic = require('../assets/defaultPic.jpg')
        try{
            const im = require(`../assets/${x.picture}`)
            return im
        }catch(error){
            return defPic
        }
    }

    return (
        <>
        {isLoad &&
        <div className="landing">
            <Header atDashboard={false}></Header>
            <span className='eventsTextLAN'>EVENTS</span>
            <div className='swiperDiv'>
                <Swiper
                    injectStyles={['.swiper-button-prev {color: red;}', ]}
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    pagination={true}
                    autoplay={{
                        delay: 7000,
                      }}
                    modules={[Autoplay, Pagination]}
                    >
                    <SwiperSlide>
                        <div className='myEventFormatLAN'>
                            <span className='headerSlideText'>Lightboard Workshop</span>
                            <span className='normalSlideText'>Location: Commons-AMC</span>
                            <span className='normalSlideText'>Date/Time: 15th March - 1:00PM</span>
                            <span className='normalSlideText'>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                             Ut lectus arcu bibendum at varius. </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='myEventFormatLAN'>
                            <span className='headerSlideText'>DSLR Workshop</span>
                            <span className='normalSlideText'>Location: Commons-AMC</span>
                            <span className='normalSlideText'>Date/Time: 3rd March - 3:00PM</span>
                            <span className='normalSlideText'>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                             Ut lectus arcu bibendum at varius. </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='myEventFormatLAN'>
                            <span className='headerSlideText'>Photoshop Workshop</span>
                            <span className='normalSlideText'>Location: Commons-AMC</span>
                            <span className='normalSlideText'>Date/Time: 20th March - 3:00PM</span>
                            <span className='normalSlideText'>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                             Ut lectus arcu bibendum at varius. </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='myEventFormatLAN'>
                            <span className='headerSlideText'>Resources Workshop</span>
                            <span className='normalSlideText'>Location: Commons-AMC</span>
                            <span className='normalSlideText'>Date/Time: 21st March - 3:00PM</span>
                            <span className='normalSlideText'>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                             Ut lectus arcu bibendum at varius. </span>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <Link to='/meetteam' className='eventsTextLAN'>MEET THE TEAM</Link>
            <div className='swiperDiv'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                    pagination={true}
                    navigation={true}
                    loop={true}
                    modules={[Pagination, Navigation]}
                    >
                    {isLoad && bios.map(item => (
                        <SwiperSlide key={item._id}>
                            <div className='swiperSlideRoundPics'>
                                <HashLink to={`/meetteam#${item.name}`}><RoundedImage imageWidth='170' imageHeight='170' roundedColor='#00458A' roundedSize='10' image={getImage(item)} /></HashLink>
                                <span className='nameTextSlideRound'>{item.name}</span>
                                <span className='positionTextSlideRound'>{item.position}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>}
        </>
    )
}

export default Landing