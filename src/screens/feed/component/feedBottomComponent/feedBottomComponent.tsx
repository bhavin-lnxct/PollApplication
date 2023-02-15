import React from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import Icon from '../../../../components/icon/Icon';
import CustomText from '../../../../components/text/CustomText';
import ThemeButton from '../../../../components/themeButton/themeButton';
import colors from '../../../../theme/colors/colors';
import pollQuestionStyle from '../../poll/pollQuestionStyle';
import feedBottomComponentStyle from './feedBottomComponentStyle';

export interface feedComponentProps {
  onPressComment: () => void;
  onPressShare: () => void;
  onPressResults: () => void;
  isVoted?: boolean;
}

const FeedBottomComponent = ({
  onPressComment,
  onPressShare,
  onPressResults,
  isVoted,
}: feedComponentProps) => {
  return (
    <View style={feedBottomComponentStyle.bottomContainer}>
      <View style={feedBottomComponentStyle.iconContainer}>
        {isVoted ? (
          <>
            {/* <ThemeButton
              title={'Vote'}
              containerStyle={pollQuestionStyle.addOptionButtonContainer}
              titleStyle={pollQuestionStyle.addOptionText}
              // onPress={() =>
              //   createPoll
              //     ? item?.post_required_explanation
              //       ? setTextBoxVisible(true)
              //       : onPressVote()
              //     : showToast('Please select any vote')
              // }
            /> */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                // borderRadius: ms(30),
                // paddingVertical: ms(10),
                // paddingHorizontal: ms(36),
                minWidth: ms(50),
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: colors.AppTheme.SecondaryNew,
                marginHorizontal: ms(0),
                marginTop: ms(20),
                marginBottom: ms(0),
                height: ms(43),
                borderRadius: ms(30),
              }}
              onPress={onPressResults}
              hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
              disabled={isVoted ? false : true}>
              <CustomText
                textStyle={{
                  color: '#fff',
                  fontSize: ms(16),
                }}>
                Results
              </CustomText>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{paddingHorizontal: 50}} />
        )}
      </View>
    </View>
  );
};

export default FeedBottomComponent;
