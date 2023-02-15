import moment from "moment";
import React, { useState } from "react";
import {Pressable, View} from "react-native";
import FastImage from "react-native-fast-image";
import appConstants from "../../helper/appConstant";
import { useUserData } from "../../redux/reducers/user-slice/userSlice";
import colors from "../../theme/colors/colors";
import images from "../../theme/images/images";
import BottomSheet from "../bottomSheet/bottomSheet";
import Repost from "../card/repost/Repost";
import Icon from "../icon/Icon";
import ReportModal from "../reportModal/reportModal";
import CustomText from "../text/CustomText";
import surveyHeaderStyle from "./surveyHeaderStyle";

export interface ProfileHeaderProps {
    routeName: string;
    item: object[];
}

const onPressProfile = () => {
    console.log('----Profilre clicked -----')
}

const SurveyHeader = ({routeName, item}: ProfileHeaderProps) => {

    const userData = useUserData();
    const [isVisible, setIsVisible] = useState(false);
    const [isOpenReportBottomSheet,setIsOpenReportBottomSheet] = useState(false)

    return(
        <>
        <View style={surveyHeaderStyle.container}>
            <Pressable
                disabled={routeName === appConstants.surveys ? false : true}
                onPress={onPressProfile}
                style={surveyHeaderStyle.userProfileContainer}
            >
                <FastImage
                    style={surveyHeaderStyle.image}
                    source={
                    item?.user_image
                    ? {uri: `https://d1iermgo1iu801.cloudfront.net/${item?.user_image}`}
                    : images.dp }
                />
                <View style={surveyHeaderStyle.textContainer}>
                    <CustomText textStyle={surveyHeaderStyle.title}>
                    {item?.user_name}
                    </CustomText>
                    <CustomText textStyle={surveyHeaderStyle.description}>
                    {moment(JSON.parse(item?.created_at)).local().startOf('seconds').fromNow() || ''}
                    </CustomText>
                </View>
            </Pressable>
            <Pressable onPress={() => setIsVisible(true)}>
                <CustomText>
                <Icon
                    type="MaterialCommunityIcons"
                    name="dots-vertical"
                    size={28}
                    color={colors.AppTheme.blackShade50}
                />
                </CustomText>
            </Pressable>
        </View>
        <BottomSheet isVisible={isVisible} onClose={() => setIsVisible(false)}>
            <Repost
            item={item}
            routeName={routeName}
            userId={String(item?.user_id)}
            myId={String(userData?.user_id)}
            // deletePost={deletePost}
            // onPressDelete={onPressDelete}
            // isDeleteLoading={isDeleting}
            // onPressReport={onPressReport}
            // onPressExplanations={onPressExplanations}
            isExplanation={false}
            />
        </BottomSheet>
        <ReportModal 
            isVisible={isOpenReportBottomSheet} 
            setIsVisible={setIsOpenReportBottomSheet} 
            reportTitle={'why are you reporting this post?'}
        />
        </>
    )
}

export default SurveyHeader;