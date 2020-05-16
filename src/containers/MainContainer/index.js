import React from 'react'
import {
    View,
    Dimensions,
    Platform
} from 'react-native'
import Loader from '../../components/reduxComponent/Loader'
import Toast from '../../components/reduxComponent/Toast'
import StyleConfig from '../../assets/styles/StyleConfig'

class MainContainer extends React.PureComponent{
    componentDidMount= async ()=>{
        //     Dimensions.addEventListener('change', () => {
    //         const {height, width} = Dimensions.get('window')
    //         console.log("MAIN CONTAINER ", JSON.stringify({height,width}));
    //     });
    }
    render(){
        return(
            <View style={{
                flex:1,
                position:'absolute',
                right:0,
                left:0,
                width:StyleConfig.width,
                zIndex:9999
            }}>
                <Loader/>
                <Toast/>
            </View>
        )
    }
}

export default MainContainer
