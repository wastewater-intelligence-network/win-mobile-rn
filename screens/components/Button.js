import React from 'react';
import { Text, TouchableHighlight } from 'react-native';


const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle, pressedTextStyle } = styles;
    const [ isPress, setIsPress ] = React.useState(false);
    return(
        <TouchableHighlight onPress={onPress} style = {buttonStyle} underlayColor={'#007aff'} 
            onHideUnderlay={() => setIsPress(false)}
            onShowUnderlay={() => setIsPress(true)}
        >
            <Text style={isPress ? pressedTextStyle: textStyle}>
                {children}
            </Text>
        </TouchableHighlight>           
    );
};

const styles = {

    buttonStyle: {
        flex: 1,
        alsignSelf: 'stretch',
        backgroundColor: '#fff',
        boderRadius: 2,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center'
    },

    textStyle: {
        color: '#007aff',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: '400'
    },
    pressedTextStyle: {
        color: '#fff',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: '400'
    }

};

export default Button;