import Header from '../components/Header'
import SplitPane from 'react-split-pane'

const Signin = () => {
    return (
        <div>
            <Header />
            <SplitPane split='vertical' minSize='68%' defaultSize='68%' maxSize='68%'>
                <div className='leftPaneSignIn'>
                    <div className='WelcomeBack'>Welcome Back</div>
                        <input className='inputBox' type='text'/>
                </div>
                <div className='rightPaneSignIn'>

                </div>
            </SplitPane>
        </div>
    )
}

export default Signin