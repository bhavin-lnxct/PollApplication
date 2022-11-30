import React from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import Icon from '../../../../components/icon/Icon';
import CustomText from '../../../../components/text/CustomText';
import colors from '../../../../theme/colors/colors';
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.AppTheme.SecondaryNew,
              borderRadius: 30,
              paddingHorizontal: 36,
              paddingVertical: 10,
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
        ) : (
          <View style={{paddingHorizontal: 50}} />
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressShare}
        style={feedBottomComponentStyle.iconContainer}>
        <Icon
          type="MaterialCommunityIcons"
          name="share-outline"
          size={30}
          color={'#000'}
        />
        <CustomText textStyle={feedBottomComponentStyle.counterText}>
          1.1K
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={feedBottomComponentStyle.iconContainer}
        onPress={onPressComment}>
        <Icon type="FontAwesome" name="commenting-o" size={30} color={'#000'} />
        <CustomText textStyle={feedBottomComponentStyle.counterText}>
          1.1K
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default FeedBottomComponent;
