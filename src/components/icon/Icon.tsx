import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

interface IconInterface {
  type:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'FontAwesome5Pro'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial';
  name: string;
  color?: string;
  size?: number;
  style?: object;
}

const Icon = ({type, name, color, size, style}: IconInterface) => {
  if (type === 'AntDesign') {
    return <AntDesign name={name} color={color} size={size} style={style} />;
  }
  if (type === 'Entypo') {
    return <Entypo name={name} color={color} size={size} style={style} />;
  }
  if (type === 'EvilIcons') {
    return <EvilIcons name={name} color={color} size={size} style={style} />;
  }
  if (type === 'Feather') {
    return <Feather name={name} color={color} size={size} style={style} />;
  }
  if (type === 'FontAwesome') {
    return <FontAwesome name={name} color={color} size={size} style={style} />;
  }
  if (type === 'FontAwesome5') {
    return <FontAwesome5 name={name} color={color} size={size} style={style} />;
  }
  if (type === 'FontAwesome5Pro') {
    return (
      <FontAwesome5Pro name={name} color={color} size={size} style={style} />
    );
  }
  if (type === 'Fontisto') {
    return <Fontisto name={name} color={color} size={size} style={style} />;
  }
  if (type === 'Foundation') {
    return <Foundation name={name} color={color} size={size} style={style} />;
  }
  if (type === 'Ionicons') {
    return <Ionicons name={name} color={color} size={size} style={style} />;
  }
  if (type === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={name}
        color={color}
        size={size}
        style={style}
      />
    );
  }
  if (type === 'MaterialIcons') {
    return (
      <MaterialIcons name={name} color={color} size={size} style={style} />
    );
  }
  if (type === 'Octicons') {
    return <Octicons name={name} color={color} size={size} style={style} />;
  }
  if (type === 'SimpleLineIcons') {
    return (
      <SimpleLineIcons name={name} color={color} size={size} style={style} />
    );
  }
  if (type === 'Zocial') {
    return <Zocial name={name} color={color} size={size} style={style} />;
  }
  return null;
};

export default Icon;
