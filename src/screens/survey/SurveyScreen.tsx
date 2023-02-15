import {useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Title} from 'react-native-paper';
import {ms} from 'react-native-size-matters';
import Header from '../../components/header/header';
import Icon from '../../components/icon/Icon';
import CustomText from '../../components/text/CustomText';
import ThemeButton from '../../components/themeButton/themeButton';
import appConstants from '../../helper/appConstant';
import {Query} from '../../network/Query';
import colors from '../../theme/colors/colors';
import ProfileHeader from '../feed/component/feedProfileHeader/feedProfileHeader';
import SurveyScreenStyle from './SurveyScreenStyle';

const SurveyScreen = () => {
  const route = useRoute();
  // const allQuestions = [
  //   {
  //     question: 'What’s the biggest planet in our solar system?',
  //     options: ['Jupiter', 'Saturn', 'Neptune', 'Mercury'],
  //     correct_option: 'Jupiter',
  //   },
  //   {
  //     question: 'What attraction in India is one of the famus in the world?',
  //     options: ['Chand Minar', 'Taj Mahal', 'Stadium'],
  //     correct_option: 'Taj Mahal',
  //   },
  //   {
  //     question: 'What land animal can open its mouth the widest?',
  //     options: ['Alligator', 'Crocodile', 'Baboon', 'Hippo'],
  //     correct_option: 'Hippo',
  //   },
  //   {
  //     question: 'What is the largest animal on Earth?',
  //     options: [
  //       'The African elephant',
  //       'The blue whale',
  //       'The sperm whale',
  //       'The giant squid',
  //     ],
  //     correct_option: 'The blue whale',
  //   },
  //   {
  //     question: 'What is the only flying mammal?',
  //     options: [
  //       'The bat',
  //       'The flying squirrel',
  //       'The bald eagle',
  //       'The colugo',
  //     ],
  //     correct_option: 'The bat',
  //   },
  // ];
  const [allQuestions, setAllQuestions] = useState();
  const COLORS = {
    primary: '#252c4a',
    secondary: '#1E90FF',
    accent: '#3498db',

    success: '#00C851',
    error: '#ff4444',

    black: '#171717',
    white: '#FFFFFF',
    background: '#252C4A',
  };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState();
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [createPoll, setCreatePoll] = useState();
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  useEffect(() => {
    getAllQuestions();
  }, []);

  const getAllQuestions = async () => {
    try {
      const result = await API.graphql(
        graphqlOperation(Query.getUniqueSurvey, {
          user_id: route.params?.item?.user_id,
          survey_id: route.params?.item?.survey_id,
        }),
      );
      setAllQuestions(result?.data?.getUniqueSurvey);
    } catch (e) {
      console.log(e);
    }
  };

  const renderQuestion = (data: object) => {
    return (
      <View style={{marginBottom: ms(12)}}>
        <CustomText
          textStyle={{
            color: '#000',
            fontSize: ms(18),
            fontFamily: 'DMSans-Bold',
          }}>
          {data?.questions[currentQuestionIndex]?.question}
        </CustomText>
      </View>
    );
  };

  const renderOptions = (data: object) => {
    return (
      <View
        style={{
          borderRadius: ms(5),
          borderWidth: ms(0.3),
          borderColor: '#C6C6C6',
        }}>
        {data?.questions[currentQuestionIndex]?.options.map(
          (item: object, index: number) => (
            <View
              key={item?.option_id}
              style={SurveyScreenStyle.pollRowImageContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={SurveyScreenStyle.pollContainerButton}
                onPress={() => validateAnswer(item)}>
                <View style={SurveyScreenStyle.pollContainer}>
                  <View style={SurveyScreenStyle.pollFillView} />
                  <View style={SurveyScreenStyle.alreadyVoted}>
                    {currentOptionSelected?.option_id === item?.option_id ? (
                      <Icon
                        type="AntDesign"
                        name="checkcircle"
                        size={ms(16)}
                        color={colors.AppTheme.Primary}
                      />
                    ) : (
                      <View style={SurveyScreenStyle.optionsText} />
                    )}
                    <CustomText textStyle={SurveyScreenStyle.optionText}>
                      {item?.option}
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ),
        )}
      </View>
    );
  };

  const validateAnswer = (selectedOption: any) => {
    console.log(
      'file: SurveyScreen.tsx:73 ~ validateAnswer ~ selectedOption',
      selectedOption,
    );
    setCurrentOptionSelected(selectedOption);
    if (currentQuestionIndex === allQuestions?.questions.length - 1) {
      setShowSubmitButton(true);
    }
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowSubmitButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderSubmitButton = () => {
    if (showSubmitButton) {
      return (
        <ThemeButton
          title={'Submit'}
          containerStyle={{
            marginTop: ms(20),
            backgroundColor: colors.AppTheme.Primary,
            padding: ms(15),
            borderRadius: ms(5),
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: ms(20),
            marginHorizontal: ms(20),
          }}
          titleStyle={{
            fontSize: 20,
            color: '#fff',
            textAlign: 'center',
          }}
          onPress={() => {}}
        />
      );
    } else {
      return null;
    }
  };

  const [progress] = useState(new Animated.Value(0));
  const [isDisable, setIsDisable] = useState(false);
  const renderProgressBar = (data: object) => {
    const handleNext = () => {
      setIsDisable(true);
      if (currentQuestionIndex === allQuestions?.questions.length - 1) {
        setShowScoreModal(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowSubmitButton(false);
      }
      Animated.timing(progress, {
        toValue: currentQuestionIndex + 1,
        duration: 700,
        useNativeDriver: false,
      }).start(({finished}) => finished && setIsDisable(false));
    };

    const handleBack = () => {
      if (currentQuestionIndex === 0) {
        return;
      } else {
        setIsDisable(true);
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowSubmitButton(false);
      }
      Animated.timing(progress, {
        toValue: currentQuestionIndex - 1,
        duration: 700,
        useNativeDriver: false,
      }).start(({finished}) => finished && setIsDisable(false));
    };

    const progressAnim = progress.interpolate({
      inputRange: [0, data?.questions?.length],
      outputRange: ['0%', '100%'],
    });
    return (
      <View
        style={{
          height: ms(32),
          margin: ms(16),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isDisable}
          onPress={handleBack}>
          <Icon
            type="AntDesign"
            name="leftcircle"
            color={colors.AppTheme.Primary}
            size={ms(31)}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            borderWidth: ms(1),
            borderRadius: ms(6),
            marginHorizontal: ms(16),
            borderColor: `${colors.AppTheme.Primary}40`,
          }}>
          <Animated.View
            style={{
              height: '100%',
              borderRadius: ms(5.5),
              backgroundColor: `${colors.AppTheme.Primary}40`,
              width: Number(progressAnim),
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
            }}>
            <CustomText
              textStyle={{textAlign: 'center', color: colors.AppTheme.Text}}>
              {currentQuestionIndex + 1} of {data?.questions.length}
            </CustomText>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isDisable}
          onPress={handleNext}>
          <Icon
            type="AntDesign"
            name="rightcircle"
            color={colors.AppTheme.Primary}
            size={ms(31)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header title={'Survey'} isBack={true} />
      <View
        style={[SurveyScreenStyle.cardViewContainer, {marginVertical: ms(6)}]}>
        <ProfileHeader
          routeName={appConstants.surveys}
          item={route.params?.item}
        />
      </View>
      <View
        style={[SurveyScreenStyle.cardViewContainer, {marginBottom: ms(6)}]}>
        <Title
          style={{
            fontSize: ms(18),
            color: colors.AppTheme.Text,
            fontFamily: 'DMSans-Regular',
          }}>
          Title
        </Title>
        <Title
          style={{
            borderBottomWidth: ms(0.3),
            borderBottomColor: '#C6C6C6',
            fontSize: ms(16),
            color: colors.AppTheme.Text,
            fontFamily: 'DMSans-Regular',
          }}>
          {route.params?.item?.survey_title}
        </Title>
      </View>
      <View style={SurveyScreenStyle.cardViewContainer}>
        {allQuestions && renderQuestion(allQuestions)}
        {allQuestions && renderOptions(allQuestions)}
      </View>
      {/* Next Button */}
      {allQuestions && renderProgressBar(allQuestions)}
      {renderSubmitButton()}
    </View>
  );
};

export default SurveyScreen;
