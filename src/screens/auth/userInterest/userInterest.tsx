import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import Header from '../../../components/header/header';
import CustomText from '../../../components/text/CustomText';
import ThemeButton from '../../../components/themeButton/themeButton';
import {showToast} from '../../../helper/helper';
import messages from '../../../helper/messages';
import {InterestData} from '../../../helper/profileHelper';
import {Query} from '../../../network/Query';
import {
  userAction,
  useUserData,
} from '../../../redux/reducers/user-slice/userSlice';
import colors from '../../../theme/colors/colors';
import svg from '../../../theme/svg/svg';
import userInterestStyle from './userInterestStyle';

const UserInterest = () => {
  const route = useRoute();
  const userData = useUserData();
  const dispatch = useDispatch();
  const naviagtion = useNavigation();
  const email = route?.params?.email;
  const userId = route?.params?.userId;
  const isEdit = route?.params?.isEdit;
  const interestData = route?.params?.interestData;

  const [interesteditem, setInterestedItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const color = [
    colors.AppTheme.Primary,
    colors.AppTheme.SecondaryNew,
    colors.AppTheme.Terittory,
    colors.AppTheme.OtherFirst,
  ];
  let customIndex = 0;
  useEffect(() => {
    if (isEdit) {
      setInterestedItem(interestData);
    } else {
      setInterestedItem([]);
    }
  }, []);

  const onPressContinue = async () => {
    if (interesteditem.length === 0) {
      showToast(messages.chooseInterest);
      return;
    }
    setIsLoading(true);
    try {
      const commaSepValue = interesteditem.toString();
      if (isEdit) {
        const result = await API.graphql(
          graphqlOperation(Query.updateUser, {
            user_interest: commaSepValue,
            user_id: userId,
          }),
        );
        console.log(
          'file: userInterest.tsx:71 ~ onPressContinue ~ result',
          result,
        );
        if (result) {
          naviagtion.goBack();
          const updateUser = {
            ...userData,
            user_interest: commaSepValue,
          };

          dispatch(userAction.setUserData(updateUser));
          setIsLoading(false);
        }
      } else {
        const commaSepValue = interesteditem.toString();
        const result = await API.graphql(
          graphqlOperation(Query.updateUser, {
            user_interest: commaSepValue,
            user_id: userId,
          }),
        );
        if (result) {
          const result = await API.graphql(
            graphqlOperation(Query.getUser, {user_id: userId}),
          );
          dispatch(
            userAction.setUserData({
              ...result?.data?.getuser,
              user_id: userId,
            }),
          );
        }
      }
    } catch (error) {
      console.log(
        'ERROR in file: userInterest.tsx:103 ~ onPressContinue',
        error?.errors[0]?.message,
      );
      setIsLoading(false);
    }
  };

  const onPressLabel = (val: any) => {
    if (interesteditem.includes(val)) {
      setInterestedItem(oldData => oldData.filter(e => e !== val));
    } else {
      if (interesteditem.length > 19) {
        showToast(messages.maxInterest);
        return;
      }
      setInterestedItem(oldData => [...oldData, val]);
      const d = InterestData.filter(dt => dt === val);
    }
  };

  const renderInterestedItem = (element: any, i: number, color: string) => {
    let isSelect = false;
    if (interesteditem.includes(element)) {
      isSelect = true;
    } else {
      isSelect = false;
    }
    return (
      <Pressable key={i} onPress={() => onPressLabel(element)}>
        <View
          style={[
            isSelect
              ? {
                  ...userInterestStyle.selectedLabelItemContainer,
                  backgroundColor: color,
                }
              : userInterestStyle.labelItemContainer,
          ]}>
          <Text
            style={
              isSelect
                ? userInterestStyle.selectedLabelItem
                : userInterestStyle.labelItem
            }>
            {element}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={userInterestStyle.container}>
      <Header title="Interested In" isBack={isEdit} />
      <KeyboardAwareScrollView>
        <SafeAreaView
          style={[userInterestStyle.container, userInterestStyle.horizontal]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: ms(16),
            }}>
            <View style={userInterestStyle.likeIcon}>
              <SvgXml
                xml={svg.LikeInterest}
                height={ms(22)}
                width={ms(22)}
                style={{bottom: -1, right: -0.2}}
              />
            </View>
            <CustomText
              textStyle={{
                marginLeft: ms(12),
                color: colors.AppTheme.Text,
                fontFamily: 'DMSans-Medium',
                fontSize: ms(18),
              }}>
              Chose Your Interest
            </CustomText>
          </View>
          <CustomText
            textStyle={{
              fontSize: ms(16),
              color: colors.AppTheme.Text,
              marginTop: ms(8),
            }}>
            Chose Which You Have More Intrest To Give You Best App Experience
          </CustomText>
          <View style={userInterestStyle.labelContainer}>
            {InterestData.map((val, i) => {
              i === 0 ? (customIndex = 0) : customIndex++;
              if (customIndex % 4 === 0) {
                customIndex = 0;
              }
              return renderInterestedItem(val, i, color[customIndex]);
            })}
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      <View style={userInterestStyle.continueButton}>
        <ThemeButton
          title={`${isEdit ? 'Save' : 'Continue'} `}
          containerStyle={{
            width: '60%',
            backgroundColor: 'transparent',
            borderRadius: 50,
          }}
          onPress={onPressContinue}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default UserInterest;
