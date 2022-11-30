/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import CustomText from '../../../components/text/CustomText';
import colors from '../../../theme/colors/colors';
import FastImage from 'react-native-fast-image';
import pollQuestionStyle from './pollQuestionStyle';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../../network/Query';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import {useDispatch} from 'react-redux';
import {feedSliceActions} from '../../../redux/reducers/feedSlice/feedSlice';
import pollImageQuestionStyle from './pollImageQuestionStyle';

export interface PollOptionsInterface {
  option: string;
  vote: number;
  optionId: number;
  optionSelector: string;
}

export interface PollQuestionInterface {
  item: object;
  routeName: string;
  setIsVoted: any;
}

const PollImageQuestion:React.FC = ({item, routeName, setIsVoted}: PollQuestionInterface) => {
  const [totalVote, setTotalVote] = useState(item?.total_votes || 0);
  const [voted, setVoted] = useState(item?.already_voted || false);
  const userData = useUserData();
  const dispatch = useDispatch();

  const pollRow = (data: object) => {
    const [getVote, setGetVote] = useState(data?.vote);

    const onPressAns = async () => {
      console.log(routeName, '-----image route name --------');
      setGetVote(vote => vote + 1);
      setTotalVote(totalVote => totalVote + 1);
      setVoted(true);
      setIsVoted(true);
      // setTimeout(() => {
      //   dispatch(
      //     feedSliceActions.voteAction({
      //       routeName: routeName,
      //       id: item?.post_id,
      //       optionId: data?.option_id,
      //     }),
      //   );
      // }, 200);
      const result = await API.graphql(
        graphqlOperation(Query.giveAns, {
          user_id: userData?.user_id,
          post_id: item?.post_id,
          option_id: data?.option_id,
        }),
      );
    };
    return (
      <View style={pollImageQuestionStyle.pollRowImageContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={voted}
          style={[
            voted
              ? pollImageQuestionStyle.pollContainerButtonVoted
              : pollImageQuestionStyle.pollContainerButton,
          ]}
          onPress={() => onPressAns()}>
          <View style={pollImageQuestionStyle.pollContainer}>
            <View style={{width: ms(72)}}>
              <FastImage
                style={pollImageQuestionStyle.pollImage}
                source={{
                  uri: `https://d1iermgo1iu801.cloudfront.net/public/${data?.option_selector}`,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={pollImageQuestionStyle.pollImageTextContainer}>
              <View
                style={[
                  pollImageQuestionStyle.pollFillView,
                 voted && {
                    backgroundColor:
                      (data.option_id === 1 && '#7EBFFF') ||
                      (data.option_id === 2 && '#FFDF86') ||
                      (data.option_id === 3 && '#FFAD82') ||
                      (data.option_id === 4 && '#7BE291') ||
                      (data.option_id === 5 && '#FF9ABB'),
                    width: `${
                      Math.round((Number(getVote) * 100) / totalVote) || 0
                    }%`,
                  },
                ]}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: ms(12),
                }}>
                <CustomText textStyle={pollQuestionStyle.optionText}>
                  {' '}
                  {data?.option}
                </CustomText>
                <View>
                  {voted && (
                    <CustomText textStyle={pollQuestionStyle.percentageText}>
                      {Math.round((Number(getVote) * 100) / totalVote) || 0}%
                    </CustomText>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={pollImageQuestionStyle.container}>
      {item?.options?.map((val, i) => {
        return <View key={i}>{pollRow(val)}</View>;
      })}
    </View>
  );
};

export default PollImageQuestion;
