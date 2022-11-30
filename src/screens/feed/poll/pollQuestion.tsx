/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import CustomText from '../../../components/text/CustomText';
import colors from '../../../theme/colors/colors';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../../network/Query';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import pollQuestionStyle from './pollQuestionStyle';
import {useDispatch} from 'react-redux';
import {feedSliceActions} from '../../../redux/reducers/feedSlice/feedSlice';
import BottomSheet from '../../../components/bottomSheet/bottomSheet';
import Icon from '../../../components/icon/Icon';
import {showToast} from '../../../helper/helper';
import ThemeButton from '../../../components/themeButton/themeButton';
import CreateFeedImageStyle from '../../create-feed/CreateFeedImageStyle';

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

const PollQuestion: React.FC = ({
  item,
  routeName,
  setIsVoted,
}: PollQuestionInterface) => {
  const [totalVote, setTotalVote] = useState(item?.total_votes || 0);
  const [voted, setVoted] = useState(item?.already_voted || false);
  const userData = useUserData();
  const dispatch = useDispatch();
  const [textBoxVisible, setTextBoxVisible] = useState(false);
  const char = ['A', 'B', 'C', 'D', 'E'];
  // const [getVote, setGetVote] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [createPoll, setCreatePoll] = useState('');

  const CreatePoll = () => {
    console.log('clicked');
    setVoted(true);
  };

  const pollRow = (data: object, char: any) => {
    const [getVote, setGetVote] = useState(data?.vote);
    const onPressAns = async (val: object | undefined) => {
      setCreatePoll(val.option_id);

      try {
        if (item?.post_required_explanation && explanation === '') {
          console.log(item?.post_required_explanation);
          setTextBoxVisible(false);
          return showToast('You need to enter a reason');
        }
        setGetVote(vote => vote + 1);
        setTotalVote(totalVote => totalVote + 1);
        setVoted(true);
        setIsVoted(true);

        const result = await API.graphql(
          graphqlOperation(Query.giveAns, {
            user_id: userData?.user_id,
            post_id: item?.post_id,
            option_id: data?.option_id,
            explanation: explanation,
          }),
        );
      } catch (err) {
        console.log('ERROR TO GIVE ANS', err);
      }
    };

    return (
      <View
        style={[
          pollQuestionStyle.pollRowImageContainer,
          voted && pollQuestionStyle.pollRowContainerVoted,
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={voted}
          style={[
            voted
              ? pollQuestionStyle.pollContainerButtonVoted
              : pollQuestionStyle.pollContainerButton,
          ]}
          onPress={() =>
            item?.post_required_explanation
              ? setTextBoxVisible(true)
              : onPressAns(data)
          }>
          <View style={pollQuestionStyle.pollContainer}>
            <View
              style={[
                pollQuestionStyle.pollFillView,
                voted && {
                  backgroundColor: colors.AppTheme.OtherSecond,
                  width: `${
                    Math.round((Number(getVote) * 100) / totalVote) || 0
                  }%`,
                  borderRadius: ms(10),
                },
              ]}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: ms(12),
              }}>
              {voted ? (
                <>
                  <CustomText textStyle={pollQuestionStyle.optionPurntegText}>
                    {Math.round((Number(getVote) * 100) / totalVote) || 0}%
                  </CustomText>
                  <CustomText
                    textStyle={[
                      pollQuestionStyle.optionText,
                      voted && {marginLeft: ms(10)},
                    ]}>
                    {data?.option}
                  </CustomText>
                </>
              ) : (
                <>
                  {createPoll === data?.option_id ? (
                    <Icon type="AntDesign" name="checkcircle" size={ms(16.5)} />
                  ) : (
                    <View
                      style={{
                        borderWidth: ms(1.5),
                        borderColor: '#000',
                        borderRadius: ms(50),
                        height: ms(16),
                        width: ms(16),
                      }}
                    />
                  )}
                  <CustomText
                    textStyle={[
                      pollQuestionStyle.optionText,
                      voted && {marginLeft: ms(16)},
                    ]}>
                    {data?.option}
                  </CustomText>
                </>
              )}
            </View>
          </View>
        </TouchableOpacity>

        <BottomSheet
          isVisible={textBoxVisible}
          onClose={() => setTextBoxVisible(false)}>
          <View style={pollQuestionStyle.explanationContainer}>
            <CustomText textStyle={pollQuestionStyle.explanationHeadingText}>
              Reason for vote
              <CustomText textStyle={{color: 'red'}}>*</CustomText>
            </CustomText>
            <View style={pollQuestionStyle.explanationInputContainer}>
              <TextInput
                autoFocus={true}
                cursorColor={'rgba(43, 50, 95, 0.8)'}
                placeholder={'Enter your explanation here'}
                placeholderTextColor={colors.AppTheme.PlaceholderColor}
                returnKeyType={'send'}
                value={explanation}
                onChangeText={text => setExplanation(text)}
                onSubmitEditing={() => onPressAns(data)}
                style={pollQuestionStyle.explanationInput}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onPressAns(data)}>
                <Icon
                  name="send-circle"
                  type="MaterialCommunityIcons"
                  color={colors.AppTheme.HeaderBg}
                  size={ms(40)}
                  style={{
                    marginRight: ms(6),
                    marginTop: ms(6),
                    marginBottom: ms(6),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  };

  return (
    <>
      <View
        style={[pollQuestionStyle.container, voted && {paddingBottom: ms(10)}]}>
        <CustomText textStyle={pollQuestionStyle.totalVotesText}>
          1440 Votes
        </CustomText>
        {item?.options?.map((val, i) => {
          return (
            <View
              style={voted ? {paddingLeft: ms(12)} : {paddingLeft: ms(0)}}
              key={i}>
              {pollRow(val, char[i])}
            </View>
          );
        })}
      </View>
      <View>
        <ThemeButton
          title={'Vote'}
          containerStyle={[
            CreateFeedImageStyle.addOptionButtonContainer,
            pollQuestionStyle.themeButton,
          ]}
          titleStyle={CreateFeedImageStyle.addOptionText}
          onPress={CreatePoll}
        />
      </View>
    </>
  );
};

export default PollQuestion;
