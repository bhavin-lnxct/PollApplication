import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Pressable,
} from 'react-native';
import Header from '../../components/header/header';
import colors from '../../theme/colors/colors';
import {ms} from 'react-native-size-matters';
import Icon from '../../components/icon/Icon';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import messages from '../../helper/messages';
import editProfileScreenStyle from '../profile/editProfileScreenStyle';
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

  const onPressRemove = () => {
    let newArray = [...optionValue];

    newArray[index].source = '';
    newArray[index].blob = '';

    return setOptionValue(newArray);
  };

  const onClickCamera = async (index: number) => {
    setCameraModal(false);
    const cameraPermission = await Permission.getCameraPermission();
    if (cameraPermission) {
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
          let newArray = [...optionValue];

          newArray[index].source = dataImage;
          newArray[index].blob = cameraResponse?.assets[0];

          return setOptionValue(newArray);
        } else {
          showToast(messages.selectValidImage);
          return;
        }
      });
    } else {
      showToast(messages.cameraPermission);
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
          let newArray = [...optionValue];

          newArray[index].source = dataImage;
          newArray[index].blob = cameraResponse?.assets[0];

          return setOptionValue(newArray);
        } else {
          showToast(messages.selectValidImage);
          return;
        }
      });
    } else {
      showToast(messages.storagePermission);
    }
  };

  const DeleteOptionImageHandler = (item: object) => {
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
          <View style={CreateFeedImageStyle.PlusIcon}>
            {item?.source !== '' ? (
              <FastImage
                style={CreateFeedImageStyle.previewImage}
                source={{uri: item?.source || images.cratePollImage}}
                resizeMode={FastImage.resizeMode.cover}>
                <TouchableOpacity
                  onPress={onPressRemove}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                  <Icon
                    type={'Ionicons'}
                    name={'close-sharp'}
                    size={15}
                    color={colors.AppTheme.Text}
                    style={{
                      position: 'absolute',
                      right: 5,
                      top: 5,
                      backgroundColor: 'white',
                      opacity: 0.8,
                      borderRadius: ms(20),
                    }}
                  />
                </TouchableOpacity>
              </FastImage>
            ) : (
              <TouchableOpacity onPress={() => setCameraModal(true)}>
                <SvgXml xml={svg.CreateImage} height={ms(32)} width={ms(32)} />
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={CreateFeedImageStyle.textInputStyle}
            placeholder={`Option ${index + 1} ${
              index <= 1 ? '*' : ''
            } Description`}
            maxLength={25}
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
          {/* <TouchableOpacity style={{marginHorizontal: ms(6)}}>
            <SvgXml xml={svg.Edit} height={ms(14)} width={ms(14)} />
          </TouchableOpacity> */}
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
            onPress={() => onClickCamera(index)}
            style={editProfileScreenStyle.bottomTouchable}>
            <View style={editProfileScreenStyle.bottomCamera}>
              <SvgXml xml={svg.BottomCamera} />
            </View>
            <CustomText textStyle={editProfileScreenStyle.btnText}>
              Camera
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onClickGallery(index)}
            style={editProfileScreenStyle.bottomTouchable}>
            <View style={editProfileScreenStyle.bottomCamera}>
              <SvgXml xml={svg.BottomGallery} />
            </View>
            <CustomText textStyle={editProfileScreenStyle.btnText}>
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
  const currentDate = new Date();
  const endTime = route?.params?.date;
  const postType = route?.params?.value;
  const minRes = route?.params?.isRange;
  const postRequireExplanation = route?.params?.checked;
  const isPrivate = route?.params?.isPrivate;
  const privateEndTime = route?.params?.privateEndTime;
  const category = route?.params?.category;

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
        useAccelerateEndpoint: true,
      })
        .then(res => {
          if (res) {
            postOption = {...postOption, [res.key]: removeSpace(data?.value)};
            resolve({
              src: `public/${res?.key}`,
              value: removeSpace(data?.value),
            });
          } else {
            console.log(
              'ERROR in file: CreateFeedImage.tsx:301 ~ Error uploading to s3',
            );
          }
        })
        .catch(err => {
          reject(err);
          setCreatePostLoading(false);
        });
    });
  };

  const createImagePost = async () => {
    if (removeSpace(description) === '') {
      showToast(messages.enterPollTitle);
      return;
    }

    for (var i = 0; i < optionValue.length; i++) {
      if (optionValue[i].blob === '' || optionValue[i].source === '') {
        showToast(messages.selectImageCreatePoll);
        return;
      }
      if (removeSpace(optionValue[i].value) === '') {
        showToast(messages.enterDescriptionimagePoll);
        return;
      }
    }
    setCreatePostLoading(true);
    showToast(messages.processingPoll);
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
        postOption = JSON.stringify(postOption).replaceAll(/"/g, "'");

        var dataInput = {
          post_private: isPrivate,
          user_id: userData?.user_id,
          post_type: postType,
          post_start_time: JSON.stringify(new Date()),
          post_language: 'ENGLISH',
          post_required_explanation: postRequireExplanation,
          post_title: removeSpace(description),
          post_options: postOption,
          post_category: category
        };

        if (isPrivate) {
          var dataInput = {
            ...dataInput,
            post_end_time: JSON.stringify(
              new Date(
                currentDate.setDate(
                  currentDate.getDate() + Number(privateEndTime),
                ),
              ),
            ),
          };
        } else {
          var dataInput = {
            ...dataInput,
            post_end_time: JSON.stringify(endTime),
          };
        }

        if (minRes === '0' || minRes === '') {
          null;
        } else {
          var dataInput = {
            ...dataInput,
            post_required_min_responses: Number(minRes),
          };
        }

        try {
          const result = await API.graphql(
            graphqlOperation(Query.createPost, dataInput),
          );
          setCreatePostLoading(false);
          setTimeout(() => {
            Emmiter.emit('getFeed');
          }, 2000);
        } catch (error) {
          console.log(
            'ERROR in file: CreateFeedImage.tsx:374 ~ createImagePost',
            error?.errors[0]?.message,
          );
          setCreatePostLoading(false);
          showToast(messages.failedPoll);
        }
      }
    });
  };

  const AddFeedBoxHandler = () => {
    if (optionValue.length < 20) {
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
    if (optionValue.length === 20) {
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
    <View style={{backgroundColor: '#EFEFEF', flex: 1}}>
      <Header
        title="Image Poll"
        isBack={true}
        isClose={false}
        post={false}
        onPressPost={createImagePost}
      />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <View style={{marginHorizontal: ms(15), marginBottom: ms(10)}}>
          <TextInput
            onFocus={() => setOpacity(true)}
            onBlur={() => setOpacity(false)}
            placeholder="Title *"
            multiline={true}
            maxLength={500}
            style={[
              CreateFeedStyle.optionTextInput,
              CreateFeedStyle.optionTextInputFirst,
            ]}
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
            <SvgXml xml={svg.UploadImage} height={ms(24)} width={ms(24)} />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
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
          {optionValue.length < 20 ? (
            <Pressable
              onPress={AddFeedBoxHandler}
              hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
              style={{
                alignItems: 'center',
                marginTop: ms(20),
              }}>
              <SvgXml xml={svg.CreateImage} height={ms(50)} width={ms(50)} />
            </Pressable>
          ) : (
            <View style={{height: ms(50), width: ms(50)}} />
          )}
        </View>
      </KeyboardAwareScrollView>
      <ThemeButton
        loading={createPostLoading}
        title={'Create Poll'}
        containerStyle={CreateFeedImageStyle.addOptionButtonContainer}
        titleStyle={CreateFeedImageStyle.addOptionText}
        onPress={createImagePost}
      />
    </View>
  );
};

export default CreateFeedImage;
