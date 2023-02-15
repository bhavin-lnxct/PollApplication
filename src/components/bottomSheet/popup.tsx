import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

export interface popupInterface {
  isVisible?: boolean;
  children?: React.ReactNode;
}

const Popup = props => {
  return (
    <Modal
      {...props}
      animationIn={'fadeIn'}
      animationInTiming={100}
      animationOutTiming={100}
      animationOut={'fadeOut'}
      style={{
        flex: 1,
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      //   backdropOpacity={0}
      //   isVisible={prosp?.isVisible}
    >
      {props.children}
    </Modal>
  );
};

export default Popup;
