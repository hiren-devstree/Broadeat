import React, {Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from 'react-native';
import withLoader from '../../redux/actionCreator/withLoader';
import withToast from '../../redux/actionCreator/withToast';
import styled from 'styled-components/native';

// const NewContainer = styled.View`
//   background: ${props => props.theme.background};
// `

class BaseComponent extends Component{
    constructor(props){
        super(props);
    }
   
    render() {
        throw new Error(`please write render method in BaseComponent`);
        return null
    }

}

export default BaseComponent;
