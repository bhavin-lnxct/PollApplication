/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import CustomText from '../../../components/text/CustomText';
import colors from '../../../theme/colors/colors';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../../network/Query';
import {useUserData} from '../../../redux/reducers/user-slice/userSlice';
import pollQuestionStyle from './pollQuestionStyle';
import {useDispatch} from 'react-redux';
import {feedSliceActions} from '../../../redux/reducers/feedSlice/feedSlice';
import Icon from '../../../components/icon/Icon';
import {removeSpace, showToast} from '../../../helper/helper';
import ThemeButton from '../../../components/themeButton/themeButton';
import messages from '../../../helper/messages';
import feedCardStyle from '../../../components/card/feedCardStyle';

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

const PollQuestion: React.FC = ({item, routeName}: PollQuestionInterface) => {
  const userData = useUserData();
  const dispatch = useDispatch();
  const [explanation, setExplanation] = useState('');
  const [createPoll, setCreatePoll] = useState();
  const [viewMore, setViewMore] = useState(false);

  const viewOptions =
    viewMore || item?.options.length < 4
      ? item?.options
      : item?.options?.slice(0, 4);

  const onPressVote = async () => {
    try {
      const trimmedExplanation = removeSpace(explanation);
      if (item?.post_required_explanation && trimmedExplanation === '') {
        showToast(messages.EnterReasoning);
        return;
      }
      dispatch(
        feedSliceActions.voteAction({
          id: item?.post_id,
          optionId: createPoll?.option_id,
        }),
      );
      const result = await API.graphql(
        graphqlOperation(Query.giveAns, {
          user_id: userData?.user_id,
          post_id: item?.post_id,
          option_id: createPoll?.option_id,
          explanation: trimmedExplanation,
        }),
      );
    } catch (error) {
      console.log(
        'ERROR in file: pollQuestion.tsx:70 ~ onPressVote',
        error?.errors[0]?.message,
      );
    }
  };

  const pollRow = (data: object) => {
    const onSelectAns = async (val: object | undefined) => {
      setCreatePoll(val);
    };

    return (
      <View
        style={[
          pollQuestionStyle.pollRowImageContainer,
          item?.already_voted && {marginTop: ms(10)},
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={item?.already_voted}
          style={pollQuestionStyle.pollContainerButton}
          onPress={() => onSelectAns(data)}>
          <View style={pollQuestionStyle.pollContainer}>
            <View
              style={[
                pollQuestionStyle.pollFillView,
                item?.already_voted && {
                  backgroundColor: colors.AppTheme.OtherSecond,
                  width: `${
                    Math.round(
                      (Number(data?.vote) * 100) / item?.total_votes,
                    ) || 0
                  }%`,
                  borderRadius: ms(10),
                },
              ]}
            />
            <View
              style={[
                pollQuestionStyle.alreadyVoted,
                item?.already_voted && pollQuestionStyle.itemAleadyVoted,
              ]}>
              {item?.already_voted ? (
                <>
                  <CustomText textStyle={pollQuestionStyle.optionPurntegText}>
                    {Math.round(
                      (Number(data?.vote) * 100) / item?.total_votes,
                    ) || 0}{' '}
                    %
                  </CustomText>
                  <CustomText textStyle={pollQuestionStyle.optionText}>
                    {data?.option}
                  </CustomText>
                </>
              ) : (
                <>
                  {createPoll?.option_id === data?.option_id ? (
                    <Icon
                      type="AntDesign"
                      name="checkcircle"
                      size={ms(16)}
                      color={'#000'}
                    />
                  ) : (
                    <View style={pollQuestionStyle.optionsText} />
                  )}
                  <CustomText textStyle={pollQuestionStyle.optionText}>
                    {data?.option}
                  </CustomText>
                </>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={pollQuestionStyle.container}>
        <View style={!item?.already_voted && {paddingTop: ms(10)}}>
          {viewOptions?.map((val: object, i: number) => {
            return <View key={i}>{pollRow(val)}</View>;
          })}
          {!viewMore && item?.options.length > 4 && (
            <TouchableOpacity
              style={pollQuestionStyle.ViewMoreButton}
              onPress={() => setViewMore(!viewMore)}>
              <CustomText textStyle={pollQuestionStyle.viewMoreText}>
                View More
              </CustomText>
              <Icon
                type={'MaterialCommunityIcons'}
                name={'chevron-double-down'}
                size={16}
                color={'black'}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{marginTop: ms(5)}} />
        <CustomText textStyle={pollQuestionStyle.totalVotesText}>
          {item?.total_votes} Votes
        </CustomText>
      </View>
      <View style={{marginTop: ms(5)}} />
      {item?.post_category && item?.post_category.length > 0 && (
        <View style={feedCardStyle.labelViewContainer}>
          {item?.post_category?.map((val, i) => {
            return (
              <View style={feedCardStyle.labelContainer} key={i}>
                <CustomText textStyle={feedCardStyle.labelText}>
                  {val}
                </CustomText>
              </View>
            );
          })}
        </View>
      )}

      {item?.post_required_explanation && !item?.already_voted && (
        <>
          <CustomText textStyle={pollQuestionStyle.ReasoningTitle}>
            Reason for your vote
          </CustomText>
          <TextInput
            placeholder="write your reason"
            placeholderTextColor={colors.AppTheme.grayShade8F}
            style={pollQuestionStyle.reasoningTextInput}
            multiline={true}
            onChangeText={val => setExplanation(val)}
          />
        </>
      )}

      <View>
        {!item?.already_voted && (
          <ThemeButton
            title={'Vote'}
            containerStyle={pollQuestionStyle.addOptionButtonContainer}
            titleStyle={pollQuestionStyle.addOptionText}
            onPress={() =>
              createPoll ? onPressVote() : showToast(messages.selectOption)
            }
          />
        )}
      </View>
    </>
  );
};

export default PollQuestion;
