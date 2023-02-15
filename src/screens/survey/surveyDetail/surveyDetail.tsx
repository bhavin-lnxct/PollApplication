import { useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../../components/header/header";
import CustomText from "../../../components/text/CustomText";
import appConstants from "../../../helper/appConstant";
import { Query } from "../../../network/Query";
import { useUserData } from "../../../redux/reducers/user-slice/userSlice";
import ProfileHeader from "../../feed/component/feedProfileHeader/feedProfileHeader";
import surveyDetaileStyle from "./surveyDetaileStyle";

interface surveyCard{
    question: string;
    qestionId: string;
    totalVote: number;
    options: object[];
}

const SurveyDetail = () => {

    const route = useRoute();
    const surveyId = route?.params?.surveyId;
    const userData = useUserData();
    const [uniqueSurvey, setUniqueSurvey] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getUniqueSurvey();
    },[])

    const getUniqueSurvey = async () => {
        setLoading(true);
        try {
            const result = await API.graphql(graphqlOperation(Query.getUniqueSurvey,{survey_id: surveyId}))
            setUniqueSurvey(result?.data?.getUniqueSurvey);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    const SurveyResultCard = (val:surveyCard) => {
        return(
            <View style={surveyDetaileStyle.questionCard}>
                <CustomText textStyle={surveyDetaileStyle.questionText}>{val?.question}</CustomText>
                {val?.options?.map((value,i)=>{
                    return(
                        <View key={i}>
                            {value?.is_image ? 
                                <View>
                                <FastImage
                                    source={{uri: `https://d1iermgo1iu801.cloudfront.net/public/${value?.option_selector}`}}
                                    style={surveyDetaileStyle.image}
                                    resizeMode={"cover"}
                                />
                                <View style={surveyDetaileStyle.textOption}>
                                    <View style={[surveyDetaileStyle.fillTextOption,{width:`${Math.round((Number(value?.optionVote) * 100) / val?.totalVote)||0}%`}]}/>
                                    <CustomText textStyle={surveyDetaileStyle.optionText}>{value?.option}</CustomText>
                                    <CustomText textStyle={surveyDetaileStyle.optionText}>
                                        {Math.round((Number(value?.optionVote) * 100) / val?.totalVote)||0}{' '}%
                                    </CustomText>
                                </View>
                                </View> : 
                                <View style={surveyDetaileStyle.textOption}>
                                    <View style={[surveyDetaileStyle.fillTextOption,{width:`${Math.round((Number(value?.optionVote) * 100) / val?.totalVote)||0}%`}]}/>
                                    <CustomText textStyle={surveyDetaileStyle.optionText}>{value?.option}</CustomText>
                                    <CustomText textStyle={surveyDetaileStyle.optionText}>
                                        {Math.round((Number(value?.optionVote) * 100) / val?.totalVote)||0}{' '}%
                                    </CustomText>
                                </View>
                            }
                        </View>
                )})}
            </View>
        )
    }

    return(
        <SafeAreaView>
            <Header title={userData?.user_name} isBack={true} isNotification={true}/>
            <KeyboardAwareScrollView style={surveyDetaileStyle.mainContainer}>
                <View style={surveyDetaileStyle.header}>
                    <ProfileHeader item={uniqueSurvey} routeName={appConstants.surveyDetail}/>
                </View>
                <View style={surveyDetaileStyle.titleContainer}>
                    <CustomText textStyle={surveyDetaileStyle.Title}>Title</CustomText>
                    <CustomText textStyle={surveyDetaileStyle.titleText}>{uniqueSurvey?.survey_title}</CustomText>
                </View>
                {
                    uniqueSurvey?.questions?.map((val,i)=>{
                        return (
                            <View key={i} style={surveyDetaileStyle.resultCard}>
                                <SurveyResultCard 
                                    question={val?.question} 
                                    qestionId={val?.question_id} 
                                    totalVote={val?.totalVote} 
                                    options={val?.options}  
                                />
                            </View>
                        )
                    })
                }
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default SurveyDetail;