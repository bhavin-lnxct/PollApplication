import React, {memo} from 'react';
import {View} from 'react-native';
import {Title, Paragraph} from 'react-native-paper';
import FeedProfileHeader from '../../screens/feed/component/feedProfileHeader/feedProfileHeader';
import feedCardStyle from './feedCardStyle';
import PollImageQuestion from '../../screens/feed/poll/pollImageQuestion';
import PollQuestion from '../../screens/feed/poll/pollQuestion';
import {ms} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface FeedCardInterface {
  item: object;
  routeName: string;
}
const FeedCard = ({item, routeName}: FeedCardInterface) => {
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
      <View style={feedCardStyle.cardContainer}>
        <FeedProfileHeader routeName={routeName} item={item} />
        <View style={feedCardStyle.cardView}>
          <Title style={feedCardStyle.title}>{item?.post_title}</Title>
          {item?.post_description && (
            <Paragraph style={feedCardStyle.descriptionNotNull}>
              {item?.post_description}
            </Paragraph>
          )}
          <View style={{marginTop: ms(5)}} />
          {item?.post_type === 'poll' && (
            <PollQuestion item={item} routeName={routeName} />
          )}
          {item?.post_type === 'image' && (
            <PollImageQuestion item={item} routeName={routeName} />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default memo(FeedCard);
