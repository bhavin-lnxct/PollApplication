import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, TextInput, Pressable} from 'react-native';
import {ms} from 'react-native-size-matters';
import Header from '../../components/header/header';
import CreateFeedStyle from './CreateFeedStyle';
import colors from '../../theme/colors/colors';
import Icon from '../../components/icon/Icon';
import {Emmiter, removeSpace, showToast} from '../../helper/helper';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../network/Query';
import {useUserData} from '../../redux/reducers/user-slice/userSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ThemeButton from '../../components/themeButton/themeButton';
import CustomText from '../../components/text/CustomText';
import {useNavigation, useRoute} from '@react-navigation/native';
import screenNameEnum from '../../helper/screenNameEnum';
import CreateFeedImageStyle from './CreateFeedImageStyle';
import messages from '../../helper/messages';

const CreateFeed = () => {
  const optionRef = useRef<TextInput>(null);
  const route = useRoute();
  const navigation = useNavigation();
  const userData = useUserData();
  const [currentState, setCurrentState] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [optionValue, setOptionValue] = useState([
    {key: 1, value: ''},
    {key: 2, value: ''},
  ]);
  const currentDate = new Date();
  const endTime = route?.params?.date;
  const postType = route?.params?.value;
  const minRes = route?.params?.isRange;
  const postRequireExplanation = route?.params?.checked;
  const isPrivate = route?.params?.isPrivate;
  const privateEndTime = route?.params?.privateEndTime;
  const category = route?.params?.category;

  useEffect(() => {
    optionRef.current?.focus();
  }, [currentState]);
  let postOptionDictionary = {};

  const createPost = async () => {
    if (removeSpace(postTitle) === '') {
      showToast(messages.enterPollTitle);
      return;
    }

    for (var i = 0; i < optionValue.length; i++) {
      let trimmedOption = removeSpace(optionValue[i].value);
      if (trimmedOption === '') {
        showToast(messages.enterPollOption);
        return;
      } else {
        postOptionDictionary = {
          ...postOptionDictionary,
          [String.fromCharCode(65 + i)]: trimmedOption,
        };
      }
    }

    const postOption = JSON.stringify(postOptionDictionary).replaceAll(
      /"/g,
      "'",
    );
    setCreatePostLoading(true);

    try {
      showToast(messages.processingPoll);
      navigation.navigate(screenNameEnum.FeedScreen);

      var dataInput = {
        post_private: isPrivate,
        user_id: userData?.user_id,
        post_type: postType,
        post_start_time: JSON.stringify(new Date()),
        post_language: 'ENGLISH',
        post_required_explanation: postRequireExplanation,
        post_title: removeSpace(postTitle),
        post_description: removeSpace(postDescription),
        post_options: postOption,
        post_category: category,
      };

      if (isPrivate) {
        var dataInput = {
          ...dataInput,
          post_end_time: JSON.stringify(
            new Date(
              currentDate.setDate(
                currentDate.getDate() + Number(privateEndTime),
              ),
            ),
          ),
        };
      } else {
        var dataInput = {
          ...dataInput,
          post_end_time: JSON.stringify(endTime),
        };
      }

      if (minRes === '0' || minRes === '') {
        null;
      } else {
        var dataInput = {
          ...dataInput,
          post_required_min_responses: Number(minRes),
        };
      }

      const result = await API.graphql(
        graphqlOperation(Query.createPost, dataInput),
      );
      setCreatePostLoading(false);
      setTimeout(() => {
        Emmiter.emit('getFeed');
      }, 2000);
    } catch (error) {
      console.log(
        'ERROR in file: CreateFeed.tsx:118 ~ createPost',
        error?.errors[0]?.message,
      );
      showToast(messages.failedPoll);
      setCreatePostLoading(false);
    }
  };

  const addOption = () => {
    if (optionValue.length < 20) {
      setOptionValue(val => [
        ...val,
        {
          key: Math.random() * 100,
          value: '',
        },
      ]);
      setCurrentState(!currentState);
    } else {
      showToast('select maximum 20');
    }
  };

  const deleteOption = (data: any) => {
    setOptionValue(old => old.filter(val => val.key !== data.key));
  };

  return (
    <View style={{backgroundColor: '#EFEFEF', flex: 1}}>
      <Header title="Text Poll" isBack={true} isNotification={true} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <SafeAreaView style={CreateFeedStyle.container}>
          <View style={{marginHorizontal: ms(15), marginBottom: ms(10)}}>
            <TextInput
              placeholder="Title *"
              multiline={true}
              maxLength={500}
              style={[
                CreateFeedStyle.optionTextInput,
                CreateFeedStyle.optionTextInputFirst,
              ]}
              placeholderTextColor={colors.AppTheme.PlaceholderColor}
              onChangeText={val => setPostTitle(val)}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor={colors.AppTheme.PlaceholderColor}
              style={[
                CreateFeedStyle.optionTextInput,
                CreateFeedStyle.descriptionContainer,
              ]}
              maxLength={500}
              multiline
              onChangeText={val => setPostDescription(val)}
            />

            {optionValue.map((val, i) => {
              return (
                <View
                  style={i > 1 && {flexDirection: 'row', alignItems: 'center'}}
                  key={i}>
                  <TextInput
                    key={i}
                    ref={optionRef}
                    value={val?.value}
                    placeholder={`Option ${i + 1} ${i <= 1 ? '*' : ''}`}
                    placeholderTextColor={colors.AppTheme.PlaceholderColor}
                    style={
                      i > 1
                        ? CreateFeedStyle.closeTextInput
                        : CreateFeedStyle.optionTextInput
                    }
                    maxLength={25}
                    onChangeText={val => {
                      let optionValues = [...optionValue];
                      optionValues[i].value = val;
                      setOptionValue(optionValues);
                    }}
                  />
                  {i > 1 && (
                    <Pressable
                      onPress={() => deleteOption(val)}
                      hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}>
                      <Icon
                        name="close-sharp"
                        type="Ionicons"
                        size={20}
                        color={colors.AppTheme.PlaceholderColor}
                        style={{marginLeft: ms(10)}}
                      />
                    </Pressable>
                  )}
                </View>
              );
            })}
            {optionValue.length < 20 && (
              <Pressable
                onPress={addOption}
                hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
                style={{alignItems: 'flex-end', marginTop: ms(20)}}>
                <CustomText textStyle={CreateFeedStyle.addOptionText}>
                  Add Option
                </CustomText>
              </Pressable>
            )}
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      <ThemeButton
        loading={createPostLoading}
        title={'Create Poll'}
        containerStyle={CreateFeedImageStyle.addOptionButtonContainer}
        titleStyle={CreateFeedImageStyle.addOptionText}
        onPress={createPost}
      />
    </View>
  );
};

export default CreateFeed;
