import Header from '../components/Header'
import SplitPane from 'react-split-pane'

const Signup = () => {
    return (
        <div>
            <Header />
            <SplitPane split='vertical' minSize='68%' defaultSize='68%' maxSize='68%'>
                <div className='leftPane'>
                    <div className='Welcometoamc'>Welcome To AMC</div>
                    <input className='inputBox' type='text'/>
                </div>
                <div className='rightPane'>

                </div>
            </SplitPane>
        </div>
    )
}

export default Signup