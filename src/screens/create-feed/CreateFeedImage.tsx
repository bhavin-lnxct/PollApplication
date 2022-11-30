import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Header from '../../components/header/header';
import colors from '../../theme/colors/colors';
import {ms} from 'react-native-size-matters';
import Icon from '../../components/icon/Icon';
import {Button} from 'react-native-paper';
import CustomText from '../../components/text/CustomText';
import {
  Emmiter,
  getUploadMediaUrl,
  removeSpace,
  showToast,
} from '../../helper/helper';
import bottomSheetStyle from '../../components/bottomSheet/bottomSheetStyle';
import BottomSheet from '../../components/bottomSheet/bottomSheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import Permission from '../../helper/permission';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {useUserData} from '../../redux/reducers/user-slice/userSlice';
import {Query} from '../../network/Query';
import {useNavigation, useRoute} from '@react-navigation/native';
import screenNameEnum from '../../helper/screenNameEnum';
import CreateFeedImageStyle from './CreateFeedImageStyle';
import images from '../../theme/images/images';
import CreateFeedStyle from './CreateFeedStyle';
import svg from '../../theme/svg/svg';
import {SvgXml} from 'react-native-svg';
import ThemeButton from '../../components/themeButton/themeButton';
export interface imageBoxProps {
  isDelete?: boolean;
  index: number;
  item: object;
  optionValue: any[];
  setOptionValue: any;
}

const ImageBox = ({
  item,
  index,
  isDelete,
  optionValue,
  setOptionValue,
}: imageBoxProps) => {
  const [openCameraModal, setCameraModal] = useState(false);

  const onClickCamera = async (index: number) => {
    setCameraModal(false);
    const cameraPermission = await Permission.getCameraPermission();
    const micPermission = await Permission.getMicPermission();
    if (cameraPermission && micPermission) {
      launchCamera({
        mediaType: 'photo',
        quality: 1,
        videoQuality: 'high',
        presentationStyle: 'fullScreen',
      }).then(async (cameraResponse: any) => {
        console.log('cameraResponse', cameraResponse);
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

        const ext = resp?.type.split('/')[1];

        if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
          const dataImage = await getUploadMediaUrl(resp);
          let newArray = [...optionValue];

          newArray[index].source = dataImage;
          newArray[index].blob = cameraResponse?.assets[0];

          return setOptionValue(newArray);
        } else {
          showToast('Please select jpeg, jpg or png file');
          return;
        }
      });
    } else {
      showToast('Please allow the camera and microphone permissions');
    }
  };

  const onClickGallery = async (index: number) => {
    const storagePermission = await Permission.getStoragePermission();
    if (storagePermission) {
      setCameraModal(false);
      launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
        includeExtra: true,
        presentationStyle: 'fullScreen',
      }).then(async (cameraResponse: any) => {
        console.log('cameraResponse', cameraResponse?.assets[0]);
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

        const ext = resp?.type.split('/')[1];
        if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
          const dataImage = await getUploadMediaUrl(resp);
          let newArray = [...optionValue];

          newArray[index].source = dataImage;
          newArray[index].blob = cameraResponse?.assets[0];

          return setOptionValue(newArray);
        } else {
          showToast('Please select jpeg, jpg or png file');
          return;
        }
      });
    } else {
      showToast('Please allow the storage permission');
    }
  };

  const DeleteOptionImageHandler = (item: object) => {
    console.log(optionValue.filter(val => val.key !== item.key));

    setOptionValue((oldData: object[]) => {
      return oldData.filter(val => val.key !== item.key);
    });
  };

  return (
    <View
      style={{
        marginTop: ms(15),
        marginHorizontal: ms(16),
      }}>
      <View
        style={[
          CreateFeedImageStyle.row,
          CreateFeedImageStyle.createImageMain,
        ]}>
        <View style={[CreateFeedImageStyle.row, {alignItems: 'center'}]}>
          <TouchableOpacity
            style={CreateFeedImageStyle.PlusIcon}
            onPress={() => setCameraModal(true)}>
            {item?.source !== '' ? (
              <FastImage
                style={CreateFeedImageStyle.previewImage}
                source={{uri: item?.source || images.cratePollImage}}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <SvgXml xml={svg.CreateImage} height={ms(30)} width={ms(30)} />
            )}
          </TouchableOpacity>

          <TextInput
            style={CreateFeedImageStyle.textInputStyle}
            placeholder={`Option ${index + 1} ${
              index <= 1 ? '*' : ''
            } Description`}
            textAlign={'center'}
            value={item.value}
            placeholderTextColor={colors.AppTheme.PlaceholderColor}
            onChangeText={val => {
              let optionValues = [...optionValue];
              optionValues[index].value = val;
              setOptionValue(optionValues);
            }}
          />
        </View>
        <View style={[CreateFeedImageStyle.row, {margin: ms(10)}]}>
          <TouchableOpacity style={{marginHorizontal: ms(6)}}>
            <SvgXml xml={svg.Edit} height={ms(14)} width={ms(14)} />
          </TouchableOpacity>
          {isDelete && (
            <TouchableOpacity
              style={{marginHorizontal: ms(6)}}
              hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
              onPress={() => DeleteOptionImageHandler(item)}
              activeOpacity={0.8}>
              <SvgXml xml={svg.Delete} height={ms(14)} width={ms(14)} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <BottomSheet
        isVisible={openCameraModal}
        onClose={() => setCameraModal(false)}
        isVideo={false}>
        <View style={bottomSheetStyle.container}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onClickCamera(index)}>
            <Icon
              type="Entypo"
              name="camera"
              size={50}
              color={colors.blackShade1B}
              style={bottomSheetStyle.btnImage}
            />
            <CustomText textStyle={bottomSheetStyle.btnText}>Camera</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onClickGallery(index)}>
            <Icon
              type="Ionicons"
              name="folder"
              size={50}
              color={colors.blackShade1B}
              style={bottomSheetStyle.btnImage}
            />
            <CustomText textStyle={bottomSheetStyle.btnText}>
              Gallery
            </CustomText>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const CreateFeedImage = () => {
  const route = useRoute();
  const userData = useUserData();
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const textInputRef = useRef(null);
  const textRef = useRef(null);
  const [description, setDescription] = useState('');
  const [optionValue, setOptionValue] = useState([
    {key: 1, value: '', source: '', blob: ''},
    {key: 2, value: '', source: '', blob: ''},
  ]);
  const endTime = route?.params?.date;
  const postType = route?.params?.value;
  const minRes = route?.params?.isRange;
  const postRequireExplanation = route?.params?.checked;

  let postOption = {};

  const uploadImageOptionsToS3 = async (data: object) => {
    const media = await fetch(data?.source);
    const blob = await media.blob();
    const type = blob?.type;
    const ext = type.split('/')[1];

    const fileName = `pollimg/${
      userData?.user_id
    }-${new Date().getTime()}.${ext}`;

    return new Promise((resolve, reject) => {
      Storage.put(fileName, blob, {
        level: 'public',
        contentType: type,
      })
        .then(async res => {
          if (res) {
            postOption = {...postOption, [res.key]: data?.value};
            resolve({
              src: `public/${res?.key}`,
              value: data?.value,
            });
            console.log(res);
          } else {
            console.log('Error uploading to s3 from else');
          }
        })
        .catch(err => {
          console.log('Error uploading to s3 from catch');
          reject(err);
          setCreatePostLoading(false);
        });
    });
  };

  const createImagePost = async () => {
    if (removeSpace(description) === '') {
      showToast('Please enter a title of your poll');
      return;
    }

    for (var i = 0; i < optionValue.length; i++) {
      if (
        optionValue[i].blob === '' ||
        optionValue[i].source === '' ||
        removeSpace(optionValue[i].value) === ''
      ) {
        showToast('Please enter an information');
        return;
      }
    }
    setCreatePostLoading(true);
    showToast('We are processing your post');
    navigation.navigate(screenNameEnum.FeedScreen);
    Keyboard.dismiss();
    let promises: any[] = [];
    optionValue.filter(val => {
      if (val) {
        promises.push(uploadImageOptionsToS3(val));
      } else {
        console.log('Please fill all the information');
      }
    });

    await Promise.all(promises).then(async response => {
      if (promises.map(val => val.src && val.value)) {
        console.log('All images are uploaded successfully', response);
        console.log(postOption);

        postOption = JSON.stringify(postOption).replaceAll(/"/g, "'");

        var dataInput = {
          user_id: userData?.user_id,
          post_type: postType,
          post_start_time: JSON.stringify(new Date()),
          post_end_time: JSON.stringify(endTime),
          post_language: 'ENGLISH',
          post_required_explanation: postRequireExplanation,
          post_title: description,
          post_options: postOption,
        }

        if(minRes !== "") {
          console.log('called');
          var dataInput = {...dataInput, post_required_min_responses: Number(minRes)}
        }
            
        try {
          const result = await API.graphql(graphqlOperation(Query.createPost, dataInput));
          setCreatePostLoading(false);
          setTimeout(() => {
            Emmiter.emit('getFeed');
          }, 2000);
        } catch (error) {
          setCreatePostLoading(false);
          console.log(error, 'error in create post');
          showToast('Failed to create post');
        }
      }
    });
  };

  const AddFeedBoxHandler = () => {
    console.log('value', optionValue);
    if (optionValue.length < 4) {
      setOptionValue(val => [
        ...val,
        {
          key: Math.random() * 100,
          value: '',
          source: '',
          blob: '',
        },
      ]);
    }
    if (optionValue.length === 4) {
      showToast('You can select maximum 4');
      return;
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

  return (
    <>
      <Header
        title="Create Post"
        isBack={true}
        isClose={false}
        post={false}
        onPressPost={createImagePost}
      />
      <ScrollView>
        <View style={{marginHorizontal: ms(15), marginBottom: ms(10)}}>
          <TextInput
            onFocus={() => setOpacity(true)}
            onBlur={() => setOpacity(false)}
            placeholder="Title *"
            multiline={true}
            maxLength={500}
            style={CreateFeedStyle.optionTextInput}
            placeholderTextColor={colors.AppTheme.PlaceholderColor}
            onChangeText={val => setDescription(val)}
          />
          <View
            style={[
              CreateFeedStyle.uploadImageTextMain,
              CreateFeedImageStyle.row,
            ]}>
            <CustomText textStyle={CreateFeedStyle.uploadImageText}>
              {' '}
              Upload Image
            </CustomText>
            <SvgXml xml={svg.UploadImage} height={ms(22)} width={ms(22)} />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              // flexWrap: 'wrap',
              // justifyContent: 'space-evenly',
            }}>
            {optionValue.map((item, index) => (
              <ImageBox
                key={item.key}
                item={item}
                isDelete={index < 2 ? false : true}
                index={index}
                optionValue={optionValue}
                setOptionValue={setOptionValue}
              />
            ))}
          </View>

          <Pressable
            onPress={AddFeedBoxHandler}
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
            style={{
              alignItems: 'center',
              marginTop: ms(20),
            }}>
            <SvgXml xml={svg.CreateImage} height={ms(50)} width={ms(50)} />
          </Pressable>
        </View>
      </ScrollView>
      <ThemeButton
        loading={createPostLoading}
        title={'Create Poll'}
        containerStyle={CreateFeedImageStyle.addOptionButtonContainer}
        titleStyle={CreateFeedImageStyle.addOptionText}
        onPress={createImagePost}
      />
    </>
  );
};

export default CreateFeedImage;
