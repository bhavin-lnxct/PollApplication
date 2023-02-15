import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Storage } from "aws-amplify";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ms } from "react-native-size-matters";
import Header from "../../components/header/header";
import Icon from "../../components/icon/Icon";
import CustomText from "../../components/text/CustomText";
import ThemeButton from "../../components/themeButton/themeButton";
import { showToast } from "../../helper/helper";
import messages from "../../helper/messages";
import { Query } from "../../network/Query";
import { useUserData } from "../../redux/reducers/user-slice/userSlice";
import colors from "../../theme/colors/colors";
import CreateSurveyQuestion from "./components/createSurveyQuestion";
import createSurveyStyle from "./createSurveyStyle";

const CreateSurveyScreen = () => {

    const userData = useUserData();
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [surveyOption, setSurveyOption] = useState([
        { key: '1', type: '', Question: '', options: [{ key: '1', value: '', blob: '', source: '', isImage: false }] }
    ]);
    let finalSurveyOption: any[] = [];

    const onPressCreateSurvey = async () => {

        if(title.trim() === ''){
            showToast(messages.enterSurTitle)
            return;
        }
        if(surveyOption.length < 2){
            showToast(messages.add2Card);
            return;
        }
        for(var i = 0; i < surveyOption.length; i++){
            if(surveyOption[i].Question.trim() === ''){
                showToast(messages.enterAQuestion)
                return;
            }
            if(surveyOption[i].options.length < 2){
                showToast(messages.add2Op)
                return;
            }
            for(var j = 0;j < surveyOption[i].options.length ; j++){
                if(surveyOption[i].options[j].isImage === true){
                    if(surveyOption[i].options[j].blob === '' || surveyOption[i].options[j].source === ''){
                        showToast(messages.selectImage);
                        return;
                    }
                    if(surveyOption[i].options[j].value.trim() === ''){
                        showToast(messages.enterDes);
                        return;
                    }
                }else{
                    if(surveyOption[i].options[j].value.trim() === ''){
                        showToast(messages.enterOp);
                        return;
                    }
                }
            }
        }

        setLoading(true);
        showToast(messages.processingSurvey);
        navigation.goBack();
        
        let promises: any[] = [];
        surveyOption.map((val,index) => {
            val.options.map((data,i) => {
                if (data.isImage) {
                    promises.push(uploadImageOptionsToS3(data).then((res)=>{
                        let optionValues = [...surveyOption];
                            let op = [...optionValues[index].options];
                            op[i].key = res;
                            setSurveyOption(optionValues);
                    }))
                } 
            })
        })

        await Promise.all(promises).then(async response => {
            surveyOption.map((val) => {
                let options: any[] = [];
                val.options.map((data) => {
                    options = [...options, {['key']: data.key, ['value']:data.value.trim(), ['isImage']:data.isImage}] 
                })
                finalSurveyOption = [...finalSurveyOption, {['Question']: val.Question.trim(), ['options']:options}]
                options = [];
            })

            try {
                const res = await API.graphql(graphqlOperation(Query.createSurvey,{user_id: userData?.user_id,options: JSON.stringify(finalSurveyOption),start_time: JSON.stringify(new Date()),survey_title: title.trim()}))
                console.log(res,'rrrrrrrrr')
                setLoading(false);
            } catch (error) {
                console.log(error?.errors[0]?.message,'eeeeeeeeeeeee')
                setLoading(false);
            }
        })
    }

    const uploadImageOptionsToS3 = async (data: object) => {
        const media = await fetch(data?.source);
        const blob = await media.blob();
        const type = blob?.type;
        const ext = type.split('/')[1];
        const fileName = `survey/${userData?.user_id}-${new Date().getTime()}.${ext}`;
        return (Storage.put(fileName, blob, {
            level: 'public',
            contentType: type,
            useAccelerateEndpoint: true,
        }).then(res => {
            if (res) {
                return res.key
            } else {
                console.log("~ file: createSurvey.tsx:54 ~ returnnewPromise ~ res", res)
            }
        })
        .catch(err => {
            console.log("~ file: createSurvey.tsx:63 ~ returnnewPromise ~ err", err)
        }))
    }

    const onPressAddCard = () => {
        setSurveyOption(val => [...val, { key: `${Math.random() * 100}`, type: '', Question: '', options: [{ key: `${Math.random() * 100}`, value: '', blob: '', source: '', isImage: false }] }])
    }

    const onPressRemoveCard = (data: any) => {
        setSurveyOption(old => old.filter(val => val.key !== data.key))
    }

    const cardContainer = (val: any, index: number) => {
        return (
            <View style={createSurveyStyle.cardContainer}>
                <View style={createSurveyStyle.QuestionContainer}>
                    <TextInput
                        placeholder="Question"
                        placeholderTextColor={colors.AppTheme.PlaceholderColor}
                        style={createSurveyStyle.questionInput}
                        value={val?.Question}
                        onChangeText={val => {
                            let optionValues = [...surveyOption];
                            optionValues[index].Question = val;
                            setSurveyOption(optionValues);
                        }}
                    />
                    <TouchableOpacity onPress={() => onPressRemoveCard(val)}>
                        <Icon type='MaterialCommunityIcons' name='delete-outline' color={colors.AppTheme.label} size={20} style={createSurveyStyle.deleteIcon} />
                    </TouchableOpacity>
                </View>
                <CreateSurveyQuestion item={val?.options} setSurveyOption={setSurveyOption} surveyOption={surveyOption} index={index} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#F5F5F5', flex: 1 }}>
            <Header title="Create Survey" isBack={true} isNotification={true} />
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                <View style={createSurveyStyle.titleContainer}>
                    <CustomText textStyle={createSurveyStyle.titleText}>Title</CustomText>
                    <TextInput
                        style={createSurveyStyle.titleInput}
                        value={title}
                        onChangeText={val => setTitle(val)}
                    />
                </View>
                <View style={createSurveyStyle.container}>
                    {surveyOption.map((val, index) => {
                        return (<View key={index}>{cardContainer(val, index)}</View>)
                    })}
                    <TouchableOpacity style={createSurveyStyle.addIconContainer} onPress={onPressAddCard}>
                        <Icon type='AntDesign' name='pluscircle' color={colors.AppTheme.OtherFirst} size={ms(24)} />
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            <ThemeButton title="Create Survey" loading={loading} containerStyle={createSurveyStyle.createButton} onPress={onPressCreateSurvey} />
        </SafeAreaView>
    )
}

export default CreateSurveyScreen;