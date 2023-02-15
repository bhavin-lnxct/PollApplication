import React, {useState} from 'react';
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Title} from 'react-native-paper';
import {UNIT_ID} from '../../aws-exports';
import appConstants from '../../helper/appConstant';
import FeedProfileHeader from '../../screens/feed/component/feedProfileHeader/feedProfileHeader';
import ThemeButton from '../themeButton/themeButton';
import surveyCardStyle from './surveyCardStyle';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../helper/screenNameEnum';
import { useUserData } from '../../redux/reducers/user-slice/userSlice';
import SurveyHeader from '../surveyHeader/surveyHeader';

interface SurveyCardInterface {
  index: number;
  item: object;
  routeName: string;
}

const SurveyCard = ({index, item, routeName}: SurveyCardInterface) => {
  const navigation = useNavigation();
  const userData = useUserData();
  const [errorAds, setErrorAds] = useState(false);

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
      {index % 3 === 0 &&
        index !== 0 &&
        !errorAds &&
        (routeName === appConstants.posts|| routeName === appConstants.surveys) && (
          <BannerAd
            unitId={UNIT_ID}
            size={BannerAdSize.ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: false,
            }}
            onAdFailedToLoad={error => {
              setErrorAds(true);
            }}
          />
        )}
      <View style={surveyCardStyle.cardContainer}>
          <SurveyHeader item={item} routeName={routeName}/>
        <View style={surveyCardStyle.cardView}>
          <Title style={surveyCardStyle.title}>{item?.survey_title}</Title>
          {item?.user_id === userData?.user_id ?<ThemeButton
            title={'Result'}
            containerStyle={surveyCardStyle.addOptionButtonContainer}
            titleStyle={surveyCardStyle.addOptionText}
            onPress={() =>navigation.navigate(screenNameEnum.SurveyDetail,{surveyId: item?.survey_id})}
          />:
          <ThemeButton
            title={'Start Survey'}
            containerStyle={surveyCardStyle.addOptionButtonContainer}
            titleStyle={surveyCardStyle.addOptionText}
            onPress={() =>
              navigation.navigate(screenNameEnum.SurveyScreen, {
                item: item,
              })
            }
          />}
          {/* <View style={{marginTop: ms(5)}} />
          {item?.post_type === 'poll' && (
            <PollQuestion item={item} routeName={routeName} />
          )}
          {item?.post_type === 'image' && (
            <PollImageQuestion item={item} routeName={routeName} />
          )}
          {/* {item?.post_category && item?.post_category.length > 0 && (
              <View style={surveyCardStyle.labelViewContainer}>
                {item?.post_category?.map((val, i) => {
                  return (
                    <View
                      style={surveyCardStyle.labelContainer}
                      key={i}>
                      <CustomText textStyle={surveyCardStyle.labelText}>
                        {val}
                      </CustomText>
                    </View>
                  );
                })}
              </View>
            )} */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SurveyCard;
