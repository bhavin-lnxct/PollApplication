import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "../../../components/icon/Icon";
import colors from "../../../theme/colors/colors";
import CreateFeedHeaderStyle from "./CreateFeedHeaderStyle";


export interface HeaderProps {
    onPressCreatePost?: () => void;
}

const CreateFeedHeader = ({onPressCreatePost}:HeaderProps) => {
    const navigation = useNavigation();
    return(
        <View style={CreateFeedHeaderStyle.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Icon type="Ionicons" name="arrow-back" size={30} color={colors.blackShade1B}/>
            </TouchableOpacity>
            <Text
                style={CreateFeedHeaderStyle.titleText}>
                {`Post`}
            </Text>
            <TouchableOpacity activeOpacity={0.8} style={CreateFeedHeaderStyle.TextRight} onPress={onPressCreatePost}>
                <Icon type="Ionicons" name="paper-plane-sharp" size={30} color={colors.blackShade1B}/>
            </TouchableOpacity>
        </View>
    )
}

export default CreateFeedHeader;