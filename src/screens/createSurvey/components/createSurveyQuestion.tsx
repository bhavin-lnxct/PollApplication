import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { ms } from "react-native-size-matters"
import CameraModal from "../../../components/cameraModal/cameraModal"
import Icon from "../../../components/icon/Icon"
import CustomText from "../../../components/text/CustomText"
import { getUploadMediaUrl, showToast } from "../../../helper/helper"
import messages from "../../../helper/messages"
import Permission from "../../../helper/permission"
import colors from "../../../theme/colors/colors"
import createSurveyQuestionStyle from "./createSurveyQuestionStyle"

export interface surveyQuestionProps {
    item: object[];
    setSurveyOption: any;
    surveyOption: any;
    index: number;
}

const CreateSurveyQuestion = ({ item, setSurveyOption, surveyOption, index }: surveyQuestionProps) => {

    const [cameraModal,setCameraModal] = useState(false)
    const [imageindex, setImageIndex] = useState();
    const [imageKey, setImageKey] = useState();

    const AddOption = (index: number) => {

        const onPressAddOption = () => {
            let optionValues = [...surveyOption];
            let op = [...optionValues[index].options,{key: `${Math.random() * 100}`,value: '',blob: '',source: '',isImage:false}];
            optionValues[index].options = op;
            setSurveyOption(optionValues);
        }

        return (
            <TouchableOpacity style={createSurveyQuestionStyle.rowContainer} onPress={onPressAddOption}>
                <Icon type="FontAwesome" name="circle-thin" color={colors.AppTheme.Text} size={ms(16)} style={{ marginRight: ms(6) }} />
                <CustomText textStyle={createSurveyQuestionStyle.AddOption}>Add option</CustomText>
            </TouchableOpacity>
        )
    }

    const optionRow = (val: any, index: number, key:number) => {

        const onPressRemove = (data:any) => {
            let optionValues = [...surveyOption];
            let op = [...optionValues[index].options];
            let val = op.filter(old => old.key !== data.key);
            optionValues[index].options = val;
            setSurveyOption(optionValues);
        }

        const onPressRemoveImage = () => {
            let optionValues = [...surveyOption];
            let op = [...optionValues[index].options];
            op[key].source = '';
            op[key].blob = '';
            op[key].isImage = false;
            setSurveyOption(optionValues);
        }

        const onPressCamera = async () => {
           
            setCameraModal(false)
            const cameraPermission = await Permission.getCameraPermission();
            if(!cameraPermission){
                showToast(messages.storagePermission);
                return;
            }
            console.log('clicked ----------')
            launchCamera({
                mediaType: 'photo',
                quality: 1,
                videoQuality: 'high',
                presentationStyle: 'fullScreen',
            }).then(async (cameraResponse: any) => {
                if (cameraResponse.didCancel) {
                  return;
                }
                if (cameraResponse.errorCode) {
                  return;
                }
                if (cameraResponse.errorMessage) {
                  return;
                }
                const resp = {
                  uri: cameraResponse?.assets[0].uri,
                  fileSize: cameraResponse?.assets[0].fileSize,
                  filename: cameraResponse.assets[0].fileName,
                  height: cameraResponse.assets[0].height,
                  width: cameraResponse.assets[0].width,
                  timestamp: cameraResponse.assets[0].timestamp,
                  type: cameraResponse.assets[0].type,
                };
                if (resp?.fileSize / 1000000 > 10) {
                  showToast(messages.cantUploadImageMax10);
                  return;
                }
                const ext = resp?.type.split('/')[1];
        
                if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
                    const dataImage = await getUploadMediaUrl(resp);
                    let optionValues = [...surveyOption];
                    let op = [...optionValues[imageindex].options];
                    op[imageKey].isImage = true;
                    op[imageKey].source = dataImage;
                    op[imageKey].blob = cameraResponse.assets[0];
                    return setSurveyOption(optionValues);
                } else {
                  showToast(messages.selectValidImage);
                  return;
                }
              });
        }

        const onPressGallery = async () => {
            setCameraModal(false)
            const storagePermission = await Permission.getStoragePermission();
            if(!storagePermission){
                showToast(messages.storagePermission);
                return;
            }

            launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
                selectionLimit: 1,
                includeExtra: true,
                presentationStyle: 'fullScreen',
            }).then(async (cameraResponse: any) => {
                if (cameraResponse.didCancel) {
                  return;
                }
                if (cameraResponse.errorCode) {
                  return;
                }
                if (cameraResponse.errorMessage) {
                  return;
                }
        
                const resp = {
                  uri: cameraResponse?.assets[0].uri,
                  fileSize: cameraResponse?.assets[0].fileSize,
                  filename: cameraResponse.assets[0].fileName,
                  height: cameraResponse.assets[0].height,
                  width: cameraResponse.assets[0].width,
                  timestamp: cameraResponse.assets[0].timestamp,
                  type: cameraResponse.assets[0].type,
                };
                if (resp?.fileSize / 1000000 > 10) {
                  showToast(messages.cantUploadImageMax10);
                  return;
                }
                const ext = resp?.type.split('/')[1];
                if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
                  const dataImage = await getUploadMediaUrl(resp);
                  let optionValues = [...surveyOption];
                  let op = [...optionValues[imageindex].options];
                  op[imageKey].isImage = true;
                  op[imageKey].source = dataImage;
                  op[imageKey].blob = cameraResponse.assets[0];
                  return setSurveyOption(optionValues);
                } else {
                  showToast(messages.selectValidImage);
                  return;
                }
              });
        }

        return (
            <>
            <View style={createSurveyQuestionStyle.rowContainer}>
                <Icon type="FontAwesome" name="circle-thin" color={colors.AppTheme.Text} size={ms(16)} style={{ marginRight: ms(6) }} />
                {val?.isImage ? 
                <View style={{width:'90%',padding:16}}>
                    <FastImage
                        style={createSurveyQuestionStyle.previewImage}
                        source={{uri: val?.source}}
                        resizeMode={FastImage.resizeMode.cover}
                    >
                        <TouchableOpacity onPress={onPressRemoveImage} style={createSurveyQuestionStyle.closeIcon}>
                        <Icon type={'Ionicons'} name={'close-sharp'} size={12} color={colors.AppTheme.label}/>
                        </TouchableOpacity>
                    </FastImage>
                    <TextInput
                        placeholder={'Description'}
                        placeholderTextColor={colors.AppTheme.PlaceholderColor}
                        style={createSurveyQuestionStyle.optionInput}
                        value={val?.value}
                        onChangeText={val => {
                            let optionValues = [...surveyOption];
                            let op = [...optionValues[index].options];
                            op[key].value = val;
                            setSurveyOption(optionValues);
                        }}
                    />
                </View>
                :
                <>
                <TextInput
                    placeholder={`Option ${key + 1}`}
                    placeholderTextColor={colors.AppTheme.PlaceholderColor}
                    style={createSurveyQuestionStyle.optionInput}
                    value={val?.value}
                    onChangeText={val => {
                        let optionValues = [...surveyOption];
                        let op = [...optionValues[index].options];
                        op[key].value = val;
                        setSurveyOption(optionValues);
                    }}
                />
                <TouchableOpacity onPress={()=>{setCameraModal(true);setImageIndex(index);setImageKey(key)}}>
                    <Icon type="MaterialCommunityIcons" name="image-outline" color={colors.AppTheme.label} size={ms(24)} style={{ margin: ms(4) }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressRemove(val)}>
                    <Icon type="Ionicons" name="close" color={colors.AppTheme.label} size={ms(24)} style={{ margin: ms(4) }} />
                </TouchableOpacity>
                </>
                }
            </View>
            <CameraModal isVisible={cameraModal} setIsVisible={setCameraModal} onPressCamera={onPressCamera} onPressGallery={onPressGallery}/>
            </>
        )
    }

    return (
        <>
            {item?.map((val,i) => {
                return (
                    <View key={i}>{optionRow(val, index, i)}</View>
                )
            })}
            <View>{AddOption(index)}</View>
        </>
    )
}

export default CreateSurveyQuestion;