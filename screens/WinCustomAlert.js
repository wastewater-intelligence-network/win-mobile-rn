import React, {useState} from 'react';

import {Modal, Text, View, TouchableOpacity} from 'react-native';



export default function WinCustomAlert({
  displayMode,
  displayMsg,
  visibility,
  dismissAlert,
  onPressHandler
}) {
  return (
    <View>
      <Modal
        visible={visibility}
        animationType={'fade'}
        transparent={true}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              height: 200,
              width: '90%',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 7,
              elevation: 10,
            }}>
            <View style={{alignItems: 'center', margin: 20}}>
              {displayMode == 'success' ? (
                <>
                  {/* <Feather name="alert-triangle" size={30} color="black" /> */}
                  {/* <AntDesign name="checkcircleo" size={40} color="green" /> */}
                </>
              ) : (
                <>
                  {/* <Feather name="alert-triangle" size={30} color="red" /> */}
                  {/* <MaterialIcons name="cancel" size={40} color="red" /> */}
                </>
              )}
              <Text style={{fontSize: 20, marginTop: 8}}>{displayMsg}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                  dismissAlert(false)
                  onPressHandler();
                }
             }
              style={{
                width: '95%',
                borderRadius: 0,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: '#756BDE',
                borderColor: '#ddd',
                borderBottomWidth: 0,
                borderRadius: 5,
                bottom: 0,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', margin: 15}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}