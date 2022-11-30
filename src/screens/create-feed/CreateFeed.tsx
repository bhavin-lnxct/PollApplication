import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import Header from '../../components/header/header';
// import { TextInput } from 'react-native-paper';
import CreateFeedStyle from './CreateFeedStyle';
import * as Animatable from 'react-native-animatable';
import colors from '../../theme/colors/colors';
import Icon from '../../components/icon/Icon';
import {Emmiter, removeSpace, showToast} from '../../helper/helper';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../network/Query';
import {useUserData} from '../../redux/reducers/user-slice/userSlice';
import CreateFeedHeader from './component/CreateFeedHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ThemeButton from '../../components/themeButton/themeButton';
import {Button} from 'react-native-paper';
import CustomText from '../../components/text/CustomText';
import {useNavigation, useRoute} from '@react-navigation/native';
import screenNameEnum from '../../helper/screenNameEnum';
import {SvgXml} from 'react-native-svg';
import svg from '../../theme/svg/svg';
import CreateFeedImageStyle from './CreateFeedImageStyle';

const CreateFeed = () => {
  const [opacity, setOpacity] = useState(false);
  const textInputRef = useRef(null);
  const textRef = useRef(null);
  const optionRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();
  const userData = useUserData();
  const [curentState, setCurrentState] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [optionValue, setOptionValue] = useState([
    {key: 1, value: ''},
    {key: 2, value: ''},
  ]);

  const endTime = route?.params?.date;
  const postType = route?.params?.value;
  const minRes = route?.params?.isRange;
  const postRequireExplanation = route?.params?.checked;

  useEffect(() => {
    optionRef.current?.focus();
  }, [curentState]);
  let postOptionDictionary = {};

  const createPost = async () => {
    if (removeSpace(postTitle) === '') {
      showToast('enter post title');
      return;
    }

    for (var i = 0; i < optionValue.length; i++) {
      let trimmedOption = removeSpace(optionValue[i].value);
      if (trimmedOption === '') {
        showToast('enter option');
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
      showToast('we are processing your post');
      navigation.navigate(screenNameEnum.FeedScreen);

      var dataInput = {
        user_id: userData?.user_id,
        post_type: postType,
        post_start_time: JSON.stringify(new Date()),
        post_end_time: JSON.stringify(endTime),
        post_language: 'ENGLISH',
        post_required_explanation: postRequireExplanation,
        post_title: postTitle,
        post_description: postDescription,
        post_options: postOption,
      }

      if(minRes !== "") {
        console.log('called');
        var dataInput = {...dataInput, post_required_min_responses: Number(minRes)}
      }

      const result = await API.graphql(graphqlOperation(Query.createPost, dataInput));
      setCreatePostLoading(false);
      setTimeout(() => {
        Emmiter.emit('getFeed');
      }, 2000);
    } catch (error) {
      console.log(error, 'error in create post');
      showToast('Failde to create post');
      setCreatePostLoading(false);
    }
  };

  useEffect(() => {
    if (opacity === true) {
      textInputRef?.current?.animate({
        0: {opacity: 0.6},
        0.3: {opacity: 0.7},
        0.5: {opacity: 0.8},
        0.8: {opacity: 0.9},
        1: {opacity: 1},
      });
      textRef?.current?.animate({
        0: {opacity: 0.6},
        0.3: {opacity: 0.7},
        0.5: {opacity: 0.8},
        0.8: {opacity: 0.9},
        1: {opacity: 1},
      });
    } else {
      textInputRef?.current?.animate({
        0: {opacity: 1},
        0.3: {opacity: 0.9},
        0.5: {opacity: 0.8},
        0.8: {opacity: 0.7},
        1: {opacity: 0.6},
      });
      textRef?.current?.animate({
        0: {opacity: 1},
        0.3: {opacity: 0.9},
        0.5: {opacity: 0.8},
        0.8: {opacity: 0.7},
        1: {opacity: 0.6},
      });
    }
  }, [opacity]);

  const addOption = () => {
    if (optionValue.length < 5) {
      setOptionValue(val => [
        ...val,
        {
          key: Math.random() * 100,
          value: '',
        },
      ]);
      setCurrentState(!curentState);
    } else {
      showToast('You can select maximum 5');
    }
  };

  const deleteOption = (data: any) => {
    setOptionValue(old => old.filter(val => val.key !== data.key));
  };

  return (
    <>
      <Header title="Create Post" isBack={true} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <SafeAreaView style={CreateFeedStyle.container}>
          <View style={{marginHorizontal: ms(15), marginBottom: ms(10)}}>
            <View style={CreateFeedStyle.pollContain}>
              <SvgXml xml={svg.textPoll} height={ms(24)} width={ms(24)} />
              <CustomText textStyle={CreateFeedStyle.pollTitle}>
                Create Text Poll
              </CustomText>
            </View>
            <TextInput
              onFocus={() => setOpacity(true)}
              onBlur={() => setOpacity(false)}
              // label="Add title here..."
              placeholder="Title *"
              multiline={true}
              maxLength={500}
              style={CreateFeedStyle.optionTextInput}
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
            <Pressable
              onPress={addOption}
              hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
              style={{alignItems: 'flex-end', marginTop: ms(20)}}>
              <CustomText textStyle={CreateFeedStyle.addOptionText}>
                Add Option
              </CustomText>
            </Pressable>
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
    </>
  );
};

export default CreateFeed;
