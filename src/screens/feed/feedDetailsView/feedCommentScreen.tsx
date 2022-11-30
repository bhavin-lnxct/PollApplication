import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Header from '../../../components/header/header'
import { useRoute } from '@react-navigation/native'
import { ms } from 'react-native-size-matters'
import colors from '../../../theme/colors/colors'
import CustomText from '../../../components/text/CustomText'

const FeedCommentScreen = () => {
    const route = useRoute();
    const title = route?.params?.title;

    return (
        <View>
            <Header title="Add comment" isClose={true} isBack={true} post={true} />
            {/* <Header title="Header" isBack={false} /> */}

            <CustomText textStyle={{ paddingHorizontal: ms(20), paddingVertical: ms(16), color: colors.AppTheme.Text, fontSize: ms(13) }}>
                {title}
            </CustomText>

            <View
                style={{
                    borderBottomColor: '#f2f2f2',
                    borderWidth: ms(1),
                    opacity: ms(.1),
                    marginLeft: ms(20),
                    marginRight: ms(20),
                }}
            />

            <View>
                <TextInput placeholder='Your comment or emoji reaction' style={{ paddingHorizontal: ms(20), fontSize:ms(12) }} />
            </View>
        </View>
    )
}

export default FeedCommentScreen