import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CreateFeedStyle from './CreateFeedStyle';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../../components/text/CustomText';
import DatePicker from 'react-native-date-picker';
import profileScreenStyle from '../profile/editProfileScreenStyle';
import moment from 'moment';
import {ms} from 'react-native-size-matters';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import colors from '../../theme/colors/colors';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../helper/screenNameEnum';
import {showToast} from '../../helper/helper';
import {Slider} from '@miblanchard/react-native-slider';
import images from '../../theme/images/images';
import FastImage from 'react-native-fast-image';
import {Background} from 'victory-native';
import {debounce} from 'lodash';
import Icon from '../../components/icon/Icon';
// const data = [
//   { label: 'Poll', value: 'poll' },
//   { label: 'Image', value: 'image' },
// ];

const data = [
  {image: images.pollText, text: 'Text poll', value: 'poll'},
  {image: images.pollImage, text: 'Image poll', value: 'image'},
];

const CreateFeedScreen = () => {
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [isRange, setRange] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [openDatePicker, setDatePicker] = useState(false);
  const navigation = useNavigation();
  const currentTime = new Date().getTime();
  const after3HourTime = new Date(currentTime + 2 * 60 * 60 * 1000);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  const isValidDate = (d: string) => {
    const dt = Date.parse(d);
    return !Number.isNaN(dt);
  };

  useEffect(() => {
    setValue('');
    setDate('');
    setRange('');
  }, []);

  const ContinueHandler = () => {
    console.log('clicked');
    console.log(value, 'value');

    if (value === '') {
      showToast('select a post type');
      return;
    }
    value === 'poll' &&
      navigation.navigate(screenNameEnum.CreateFeed, {
        value,
        date,
        isRange,
        checked,
      });
    value === 'image' &&
      navigation.navigate(screenNameEnum.CreateFeedImage, {
        value,
        date,
        isRange,
        checked,
      });
    setValue('');
    setDate('');
    setRange('');
  };

  const onPressSelectType = val => {
    setValue(val);
  };

  return (
    <>
      <Header title="Create Post" isBack={true} post={false} />
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={CreateFeedStyle.containerCreateFeed}>
            <CustomText textStyle={CreateFeedStyle.selectPollText}>
              {' '}
              Select Poll :
            </CustomText>

            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: ms(10),
                  }}
                  onPress={() => onPressSelectType(item?.value)}>
                  <View
                    style={[
                      {
                        backgroundColor: '#EDEDED',
                        padding: ms(15),
                        margin: ms(12),
                        borderRadius: ms(20),
                      },
                      value === item?.value && {
                        backgroundColor: 'rgba(0, 6, 61, 0.8);',
                      },
                    ]}>
                    <FastImage
                      source={item?.image}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{height: ms(170), width: ms(150)}}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '600',
                      fontSize: ms(16),
                      marginTop: ms(8),
                    }}>
                    {item?.text}
                  </Text>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // showsVerticalScrollIndicator={false}
            />
            <View style={CreateFeedStyle.selectPoll}>
              <CustomText textStyle={CreateFeedStyle.selectPollText}>
                End Time
              </CustomText>

              <DatePicker
                modal
                style={CreateFeedStyle.reactdatepicker__monthtext}
                open={openDatePicker}
                date={isValidDate(date) ? new Date(date) : after3HourTime}
                mode="datetime"
                confirmText="Set"
                minimumDate={after3HourTime}
                onConfirm={d => {
                  setDate(d);
                  setDatePicker(false);
                }}
                onCancel={() => {
                  setDatePicker(false);
                }}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                style={profileScreenStyle.dateViewInput}
                onPress={() => setDatePicker(true)}>
                <CustomText textStyle={profileScreenStyle.dateText}>
                  {isValidDate(date)
                    ? moment(date).format('DD/MM/YYYY HH:MM')
                    : 'select'}
                </CustomText>
              </TouchableOpacity>
            </View>

            <View style={CreateFeedStyle.selectPoll}>
              <CustomText textStyle={CreateFeedStyle.selectPollText}>
                Maximum Expected Votes
              </CustomText>

              <TextInput
                style={{
                  backgroundColor: 'transparent',
                  textAlign: 'center',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                textColor={colors.AppTheme.Text}
                mode="outlined"
                keyboardType="number-pad"
                placeholder="Votes"
                value={isRange.toString()}
                onChangeText={text =>
                  text > 500
                    ? showToast('Maximum value is 500')
                    : setRange(text)
                }
              />
            </View>
            <View style={CreateFeedStyle.containerRange}>
              <Slider
                animateTransitions
                value={isRange}
                onValueChange={val => setRange(Math.round(val))}
                maximumValue={1000}
                minimumValue={150}
                // step={5}
                thumbTintColor={colors.AppTheme.Text}
                trackClickable={true}
                maximumTrackTintColor="#d3d3d3"
                minimumTrackTintColor={'#F26419'}
                renderAboveThumbComponent={() => (
                  <Text style={CreateFeedStyle.voteRangeText}>
                    {'Votes' + ' ' + isRange}
                  </Text>
                )}
              />
            </View>

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CustomText textStyle={{color: colors.AppTheme.Primary}}>
                Do you require vote explanation?
              </CustomText>
              <TouchableOpacity
                onPress={() => setChecked(!checked)}
                activeOpacity={0.8}
                style={[
                  {
                    width: ms(23),
                    height: ms(23),
                    borderWidth: ms(1),
                    borderRadius: ms(8),
                    borderColor: colors.AppTheme.PlaceholderColor,
                  },
                  checked && {
                    backgroundColor: colors.AppTheme.Primary,
                    borderColor: colors.AppTheme.Primary,
                  },
                ]}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {checked && (
                    <Icon
                      type="Feather"
                      name="check"
                      size={ms(15)}
                      color={colors.AppTheme.Secondary}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={debounce(() => setChecked(true), 100)}
                  style={[
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#EDEDED',
                      height: ms(40),
                      width: ms(80),
                      marginRight: ms(14),
                      borderRadius: ms(10),
                      marginTop: ms(8),
                    },
                    checked && {
                      backgroundColor: 'rgba(0, 6, 61, 0.8)',
                    },
                  ]}>
                  <CustomText
                    textStyle={
                      checked
                        ? {color: colors.AppTheme.Secondary}
                        : {color: colors.AppTheme.Text}
                    }>
                    Yes
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={debounce(() => setChecked(false), 100)}
                  style={[
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#EDEDED',
                      height: ms(40),
                      width: ms(80),
                      marginRight: ms(14),
                      borderRadius: ms(10),
                      marginTop: ms(8),
                    },
                    !checked && {
                      backgroundColor: 'rgba(0, 6, 61, 0.8)',
                    },
                  ]}>
                  <CustomText
                    textStyle={
                      checked
                        ? {color: colors.AppTheme.Text}
                        : {color: colors.AppTheme.Secondary}
                    }>
                    No
                  </CustomText>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingHorizontal: ms(20),
          paddingVertical: ms(20),
          // marginBottom: ms(80),
        }}>
        <Button
          onPress={ContinueHandler}
          icon={'share'}
          textColor={colors.AppTheme.Secondary}
          buttonColor={colors.AppTheme.Primary}
          mode="elevated"
          style={{padding: 8}}>
          <CustomText
            textStyle={{
              textAlign: 'center',
              color: colors.AppTheme.Secondary,
              fontSize: ms(16),
            }}>
            Continue
          </CustomText>
        </Button>
      </View>
    </>
  );
};

export default CreateFeedScreen;
