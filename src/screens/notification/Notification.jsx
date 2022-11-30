import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/header/header'
import FastImage from 'react-native-fast-image'
import images from '../../theme/images/images'
import NotificationStyle from './NotificationStyle'
import { useUserData } from '../../redux/reducers/user-slice/userSlice'
import CustomText from '../../components/text/CustomText'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Notification = () => {
    const data = useUserData();
    const list = [1, 2, 3, 4, 5, 6, 8, 7, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5];

    console.log('data==', data)
    const UserFollowingComponent = ({ i, val }) => {
        return (
            <View key={i} style={[NotificationStyle.row, NotificationStyle.mainRow]}>
                <FastImage
                    style={NotificationStyle.userImage}
                    source={{ uri: `https://d1iermgo1iu801.cloudfront.net/${data.image_url}` }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={[NotificationStyle.row, NotificationStyle.userPadding]}>
                    <CustomText textStyle={NotificationStyle.userName}> {data?.user_name}</CustomText>
                    <CustomText textStyle={NotificationStyle.userText}> Started Following You </CustomText>
                </View>
            </View>
        )
    }

    return (
        <View style={NotificationStyle.bgColor}>
            <Header title="Notification" isBack={true} />
            <KeyboardAwareScrollView>
                <SafeAreaView style={[NotificationStyle.bgColor, { flex: 1 }]}>
                    <View style={NotificationStyle.horizontal}>
                        {list.map((val, i) => {
                            return (
                                <UserFollowingComponent val={val} i={i} />
                            )
                        })}
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Notification