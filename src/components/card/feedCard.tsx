import React, {useState, memo, useEffect} from 'react';
import {View, Share, FlatList, Text} from 'react-native';
import {Title, Paragraph} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../helper/screenNameEnum';
import FeedProfileHeader from '../../screens/feed/component/feedProfileHeader/feedProfileHeader';
import feedCardStyle from './feedCardStyle';
import FeedBottomComponent from '../../screens/feed/component/feedBottomComponent/feedBottomComponent';
import PieChart from '../pieChart';
import PollImageQuestion from '../../screens/feed/poll/pollImageQuestion';
import PollQuestion from '../../screens/feed/poll/pollQuestion';
import Collapsible from 'react-native-collapsible';
import {ms} from 'react-native-size-matters';
import {useUserData} from '../../redux/reducers/user-slice/userSlice';
import {createShareLink} from '../../helper/helper';
import {debounce} from 'lodash';
import CustomText from '../text/CustomText';
import colors from '../../theme/colors/colors';
import {API, graphqlOperation} from 'aws-amplify';
import {Query} from '../../network/Query';
import FastImage from 'react-native-fast-image';
import images from '../../theme/images/images';

interface FeedCardInterface {
  index: number;
  item: object;
  routeName: string;
  isExplanationVisible: boolean;
}
const FeedCard = ({
  index,
  item,
  routeName,
  isExplanationVisible = false,
}: FeedCardInterface) => {
  const userData = useUserData();
  const navigation = useNavigation();
  const [isCollapsed, setCollapsed] = useState(true);
  const [isVoted, setIsVoted] = useState(item?.already_voted);
  const [explanations, setExplanations] = useState([]);

  const onPressNavigateDetails = () => {
    navigation.navigate(screenNameEnum.FeedDetailsView, {item: item});
  };

  const getExplanations = async () => {
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getPostExplanation, {post_id: item?.post_id}),
      );
      setExplanations(result?.data?.getPostExplanation);
      console.log(result?.data?.getPostExplanation);
    } catch (e) {
      console.log('ERROR from get explanations', e);
    }
  };

  useEffect(() => {
    if (item?.post_required_explanation) {
      getExplanations();
    }
  }, []);

  const onPressShare = async () => {
    const link = await createShareLink(item?.post_id);

    try {
      const result = await Share.share({
        message: link,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const ExplanationRow = ({
    explanationText,
    user_id,
    user_image,
    user_name,
  }) => {
    return (
      <View
        style={{
          borderRadius: ms(5),
          backgroundColor: '#fff',
          padding: ms(5),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <FastImage
            source={
              userData?.image_url
                ? {
                    uri: `https://d1iermgo1iu801.cloudfront.net/${user_image}`,
                    priority: FastImage.priority.normal,
                  }
                : images.dp
            }
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: ms(30),
              height: ms(30),
              borderRadius: ms(50),
            }}
          />
          <CustomText
            textStyle={{
              color: colors.AppTheme.Primary,
              marginLeft: ms(8),
            }}>
            {user_name}
          </CustomText>
        </View>
        <View>
          <CustomText
            textStyle={{
              color: colors.AppTheme.Primary,
              fontSize: ms(15),
              fontWeight: 'bold',
              flexWrap: 'wrap',
            }}>
            {explanationText}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <View style={{}}>
      <View style={feedCardStyle.cardContainer}>
        <FeedProfileHeader routeName={routeName} item={item} />
        <View style={feedCardStyle.cardView}>
          <Title style={feedCardStyle.title}>{item?.post_title}</Title>
          <Paragraph style={feedCardStyle.description}>
            {item?.post_description}
          </Paragraph>

          {item?.post_type === 'poll' && (
            <PollQuestion
              item={item}
              routeName={routeName}
              setIsVoted={setIsVoted}
            />
          )}
          {item?.post_type === 'image' && (
            <PollImageQuestion
              item={item}
              routeName={routeName}
              setIsVoted={setIsVoted}
            />
          )}

          <FeedBottomComponent
            onPressShare={debounce(() => onPressShare(), 200)}
            onPressComment={() => onPressNavigateDetails()}
            isVoted={isVoted}
            onPressResults={() => setCollapsed(!isCollapsed)}
          />
        </View>
        <Collapsible collapsed={isCollapsed}>
          <PieChart item={item} />
        </Collapsible>
        {isExplanationVisible ? (
          <>
            {/* <View
              style={{
                width: '100%',
                marginTop: ms(13),
                marginBottom: ms(13),
                borderWidth: ms(0.3),
                borderColor: colors.AppTheme.PlaceholderColor,
              }}
            /> */}
            <CustomText
              textStyle={{
                color: colors.AppTheme.Primary,
                fontSize: ms(14),
                marginTop: ms(13),
              }}>
              Explanations
            </CustomText>
            <View
              style={{
                width: '100%',
                marginBottom: ms(13),
                borderWidth: ms(0.3),
                borderColor: colors.AppTheme.PlaceholderColor,
              }}
            />
            {explanations.map((item, index) => {
              return (
                <ExplanationRow
                  key={index}
                  explanationText={item?.explanation}
                  user_id={item?.user_id}
                  user_image={item?.user_image}
                  user_name={item?.user_name}
                />
              );
            })}
            {/* <FlatList
              data={explanations}
              renderItem={({item, index}) => {
                <ExplanationRow
                  explanation={item?.explanation}
                  user_id={item?.user_id}
                  user_image={item?.user_image}
                  user_name={item?.user_name}
                />;
              }}
              keyExtractor={index => index}
            /> */}
          </>
        ) : null}
      </View>
    </View>
  );
};

export default memo(FeedCard);
