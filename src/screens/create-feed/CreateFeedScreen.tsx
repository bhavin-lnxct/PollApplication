import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Header from '../../components/header/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CreateFeedStyle from './CreateFeedStyle';
import CustomText from '../../components/text/CustomText';
import {ms} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Slider} from '@miblanchard/react-native-slider';
import ThemeButton from '../../components/themeButton/themeButton';
import {showToast} from '../../helper/helper';
import screenNameEnum from '../../helper/screenNameEnum';
import messages from '../../helper/messages';
import {SvgXml} from 'react-native-svg';
import svg from '../../theme/svg/svg';

const CreateFeedScreen = () => {
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [isRange, setRange] = useState('');
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [privateEndTime, setPrivateEndTime] = useState('');

  const SelectType = [
    {image: svg.createtextPoll, text: 'Text poll', val: 'poll'},
    {image: svg.createImagePoll, text: 'Image poll', val: 'image'},
  ];

  useFocusEffect(
    React.useCallback(() => {
      setValue('');
      setDate('');
      setRange('');
      setChecked(false);
      setIsPrivate(false);
      setPrivateEndTime('');
      setCategory([]);
    }, []),
  );

  const ContinueHandler = () => {
    if (value === 'survey') {
      navigation.navigate(screenNameEnum.CreateSurveyScreen);
    }

    if (isPrivate && category.length === 0) {
      showToast(messages.selectCategoryForPoll);
      return;
    }
    if (isPrivate && privateEndTime === '') {
      showToast(messages.createPollEndTime);
      return;
    }
    if (isPrivate && isRange === '') {
      showToast(messages.createPollExpectedVote);
      return;
    }
    if (value === '') {
      showToast(messages.selectePollType);
      return;
    }
    if (isRange !== '') {
      if (!Number.isNaN(Number(isRange))) {
        if (Number(isRange) < 100) {
          return showToast('Minimum value is 100');
        }
        if (Number(isRange) > 100000) {
          return showToast('Maximum value is 100000');
        }
      } else {
        return showToast('Enter a valid range');
      }
    }
    value === 'poll' &&
      navigation.navigate(screenNameEnum.CreateFeed, {
        value,
        date,
        isRange,
        checked,
        isPrivate,
        category,
        privateEndTime,
      });
    value === 'image' &&
      navigation.navigate(screenNameEnum.CreateFeedImage, {
        value,
        date,
        isRange,
        checked,
        isPrivate,
        category,
        privateEndTime,
      });
    setValue('');
    setDate('');
    setRange('');
    setIsPrivate(false);
    setChecked(false);
    setPrivateEndTime('');
    setCategory([]);
  };

  return (
    <View style={CreateFeedStyle.container}>
      <Header
        title="Create Poll"
        isBack={true}
        post={false}
        isNotification={true}
      />
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={CreateFeedStyle.containerCreateFeed}>
            <FlatList
              data={SelectType}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  style={{marginHorizontal: 12, alignItems: 'center'}}
                  onPress={() => setValue(item?.val)}>
                  <View
                    style={[
                      CreateFeedStyle.svgContainer,
                      value === item?.val && {
                        backgroundColor: colors.AppTheme.OtherSecond,
                      },
                    ]}>
                    <SvgXml
                      xml={item?.image}
                      width={ms(100)}
                      height={ms(102)}
                    />
                  </View>
                  <CustomText textStyle={CreateFeedStyle.selectPollTitle}>
                    {item?.text}
                  </CustomText>
                </TouchableOpacity>
              )}
              horizontal={true}
              contentContainerStyle={{marginTop: ms(10)}}
            />
            <View style={CreateFeedStyle.selectPoll}>
              <CustomText textStyle={CreateFeedStyle.selectPollText}>
                Maximum Expected Votes
              </CustomText>
              <TextInput
                style={CreateFeedStyle.pollVoteInput}
                placeholder="Votes"
                placeholderTextColor={colors.AppTheme.Text}
                keyboardType="numeric"
                value={isRange}
                onChangeText={text => {
                  setRange(text);
                }}
              />
            </View>
            <View style={CreateFeedStyle.containerRange}>
              <Slider
                animateTransitions
                value={
                  parseInt(isRange) >= 100 && parseInt(isRange) <= 100000
                    ? parseInt(isRange)
                    : undefined
                }
                onValueChange={val => setRange(Math.round(val).toString())}
                maximumValue={100000}
                minimumValue={100}
                thumbTintColor={colors.AppTheme.Primary}
                trackClickable={true}
                maximumTrackTintColor="#d3d3d3"
                minimumTrackTintColor={colors.AppTheme.SecondaryNew}
                renderAboveThumbComponent={() =>
                  parseInt(isRange) >= 100 && (
                    <Text style={CreateFeedStyle.voteRangeText}>{isRange}</Text>
                  ) &&
                  parseInt(isRange) <= 100000 && (
                    <Text style={CreateFeedStyle.voteRangeText}>{isRange}</Text>
                  )
                }
              />
            </View>
            <View style={CreateFeedStyle.explanationMain}>
              <CustomText textStyle={CreateFeedStyle.explanationTitle}>
                Do you require vote explanation?
              </CustomText>
              <View style={CreateFeedStyle.explanationButtonMain}>
                <TouchableOpacity
                  onPress={() => setChecked(true)}
                  activeOpacity={0.8}
                  style={[
                    CreateFeedStyle.explanationButton,
                    checked && CreateFeedStyle.explanationButtonCheck,
                  ]}>
                  <CustomText
                    textStyle={[
                      CreateFeedStyle.explanationButtonText,
                      checked && CreateFeedStyle.explanationButtonTextCheck,
                    ]}>
                    Yes
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setChecked(false)}
                  style={[
                    CreateFeedStyle.explanationButton,
                    !checked && CreateFeedStyle.explanationButtonCheck,
                  ]}>
                  <CustomText
                    textStyle={[
                      CreateFeedStyle.explanationButtonText,
                      !checked && CreateFeedStyle.explanationButtonTextCheck,
                    ]}>
                    No
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={CreateFeedStyle.themeButton}>
              <ThemeButton
                title={'Continue'}
                containerStyle={{}}
                onPress={ContinueHandler}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateFeedScreen;
