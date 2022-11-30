import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../../components/header/headerStyle";
import Icon from "../../../components/icon/Icon";
import colors from "../../../theme/colors/colors";
import profileHeaderStyle from "./profileHeaderStyle";


export interface HeaderProps {
    title?: string;
    onPressSave?: () => void;
}

const ProfileHeader = ({ title = 'Profile', onPressSave }: HeaderProps) => {
    const navigation = useNavigation();
    return (
        <View style={profileHeaderStyle.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Icon type="Ionicons" name="arrow-back" size={24} color={colors.AppTheme.Secondary} />
            </TouchableOpacity>
            <Text
                style={styles.headerTitleStyle}>
                {title}
            </Text>
            <TouchableOpacity activeOpacity={0.8} style={profileHeaderStyle.IconRight} onPress={onPressSave}>
                <Icon type="MaterialCommunityIcons" name="account-check" size={30} color={'#EBEBEB'} />
            </TouchableOpacity>
        </View>
    )
}

export default ProfileHeader;