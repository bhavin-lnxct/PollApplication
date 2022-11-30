import { makeQuerablePromise } from "@aws-amplify/core";
import moment from "moment";
import React, { memo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { ms } from "react-native-size-matters";
import Icon from "../../../../components/icon/Icon";
import PieChart from "../../../../components/pieChart";
import CustomText from "../../../../components/text/CustomText";
import colors from "../../../../theme/colors/colors";
import images from "../../../../theme/images/images";
import ResultImagePoll from "../resultImagePoll/resultimagePoll";
import resultCardStyle from "./resultCardStyle";

export interface resultFeedProps {
    item?: object;
}

const ResultCard = ({ item }: resultFeedProps) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const HeaderContainer = () => {
        return (
            <View style={resultCardStyle.feedProfileContainer}>
                <View style={resultCardStyle.headerProfileContainer}>
                    <View>
                        <Image
                            style={resultCardStyle.image}
                            source={
                                item?.user_image ? {
                                    uri: `https://d1iermgo1iu801.cloudfront.net/${item?.user_image}`
                                } :
                                    images.dp
                            }
                        />
                    </View>
                    <View style={resultCardStyle.headerTextContainer}>
                        <CustomText
                            textStyle={resultCardStyle.headerTestTitle}>
                            {item?.user_name}
                        </CustomText>
                        <CustomText
                            textStyle={resultCardStyle.headerTextDescription}>
                            {moment(JSON?.parse(item?.post_starttime)).local().startOf("seconds").fromNow() || ''}
                        </CustomText>
                    </View>
                </View>
                <View>
                    <CustomText>
                        <Icon
                            type="MaterialCommunityIcons"
                            name="dots-vertical"
                            size={24}
                            color={colors.blackShade50}
                        />
                    </CustomText>
                </View>
            </View>
        )
    }

    const feedBottomContainer = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setIsCollapsed(!isCollapsed)}
                    style={resultCardStyle.feedResultButton}
                    hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
                >
                    <Text style={resultCardStyle.feedResultButtonText}>Result</Text>
                </TouchableOpacity>
                <View style={resultCardStyle.feedBottomMainIconContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => console.log('onpress repost')}
                        style={resultCardStyle.feedBottomIconContainer}>
                        <Icon
                            type="MaterialCommunityIcons"
                            name="share-outline"
                            size={30}
                            color={"#5c677d"}
                        />
                        <CustomText textStyle={resultCardStyle.feedBottomCounterText}>1.1K</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={resultCardStyle.feedBottomIconContainer}
                        onPress={() => console.log('onpress comment')}>
                        <Icon
                            type="FontAwesome"
                            name="commenting-o"
                            size={30}
                            color={"#5c677d"}
                        />
                        <CustomText textStyle={resultCardStyle.feedBottomCounterText}>1.1K</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const feedContainer = () => {
        return (
            <>
                <Text style={resultCardStyle.FeedTitle}>
                    {item?.post_title}
                </Text>
                <Text style={resultCardStyle.FeedDescription}>
                    {item?.post_description}
                </Text>
                {
                    item?.post_type === 'poll' ?
                        <Text style={{ color: 'red' }}>text poll</Text> :
                        <ResultImagePoll item={item} />
                }
            </>
        )
    }

    return (
        <View style={resultCardStyle.container}>
            {HeaderContainer()}
            {feedContainer()}
            {feedBottomContainer()}
            <Collapsible collapsed={isCollapsed}>
                <PieChart item={item} />
            </Collapsible>
        </View>
    )
}

export default memo(ResultCard);