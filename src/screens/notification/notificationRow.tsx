import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import Icon from "../../components/icon/Icon";
import CustomText from "../../components/text/CustomText";
import screenNameEnum from "../../helper/screenNameEnum";
import { Query } from "../../network/Query";
import { notificationAction } from "../../redux/reducers/notificationSlice/notificationSlice";
import colors from "../../theme/colors/colors";
import images from "../../theme/images/images";
import NotificationStyle from "./NotificationStyle";

const NotificationRow = ({item}:object) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
        
    const onPressDeleteNotification = async () => {
        try {
            dispatch(notificationAction.deleteNotification({id:item?.notification_id}))
            const result = await API.graphql(graphqlOperation(Query.deleteNotification,{notification_id: item?.notification_id}));
            // console.log(result,'rrrrrrrrr')
        } catch (error) {
            console.log(error,'error from delete single notification');
        }
    }

    const onPressProfile = () => {
        if(item?.type && item?.opposite_user_id){
            navigation.navigate(screenNameEnum.ProfileScreen,{userId: item?.opposite_user_id})
        }
    }

    const onPressNotification = () => {
        if(item?.type && item?.type === 'feed' && item?.post_id){
            navigation.navigate(screenNameEnum.FeedDetailsView,{postId: item?.post_id})
        }
        if(item?.type && item?.type === 'user' && item?.opposite_user_id){
            navigation.navigate(screenNameEnum.ProfileScreen,{userId: item?.opposite_user_id})
        }
    }

    return (
        <View style={NotificationStyle.row}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={onPressProfile}>
                <FastImage
                    style={NotificationStyle.userImage}
                    source={item?.user_image ? { uri: `https://d1iermgo1iu801.cloudfront.net/${item?.user_image}` } : images.dp}
                    resizeMode={FastImage.resizeMode.cover}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressNotification}>
                <View style={{justifyContent:'center'}}>
                    <CustomText textStyle={NotificationStyle.textContainer}>
                        <CustomText textStyle={NotificationStyle.userName}>{item?.user_name}{' '}</CustomText>
                        <CustomText textStyle={NotificationStyle.userText}>{item?.notification_text}</CustomText>
                    </CustomText>
                    <View>
                        <CustomText textStyle={NotificationStyle.timeStamp}>{
                            moment.utc(item?.created_at)
                            .local()
                            .startOf('seconds')
                            .fromNow() || ''}
                        </CustomText>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPressDeleteNotification}>
                <Icon 
                    type='MaterialCommunityIcons' 
                    name='delete-outline' 
                    color={colors.AppTheme.Text} 
                    size={20} 
                    style={NotificationStyle.iconStyle}
                />
            </TouchableOpacity>
        </View>
    )
}

export default NotificationRow;