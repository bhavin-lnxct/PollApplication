import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import Icon from '../../components/icon/Icon';
import BottomSheet from '../../components/bottomSheet/bottomSheet';
import colors from '../../theme/colors/colors';
import editProfileScreenStyle from './editProfileScreenStyle';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {RadioButton} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {getUploadMediaUrl, showToast} from '../../helper/helper';
import {
  useFeedSelector,
  userAction,
  useUserData,
} from '../../redux/reducers/user-slice/userSlice';
import images from '../../theme/images/images';
import {useDispatch} from 'react-redux';
import {Query} from '../../network/Query';
import {useNavigation} from '@react-navigation/native';
import Permission from '../../helper/permission';
import CustomText from '../../components/text/CustomText';
import bottomSheetStyle from '../../components/bottomSheet/bottomSheetStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {SvgXml} from 'react-native-svg';
import svg from '../../theme/svg/svg';
import screenNameEnum from '../../helper/screenNameEnum';
import Header from '../../components/header/header';
import Loading from '../../components/loading/Loading';
import messages from '../../helper/messages';
import DropDownPicker from 'react-native-dropdown-picker';
import _ from 'lodash';

const EditProfileScreen = () => {
  const userData = useUserData();
  const feedSelector = useFeedSelector();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openCameraModal, setCameraModal] = useState(false);
  const [ProfilePhotoModel, setProfilePhotoModel] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [openDatePicker, setDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [education, setEducation] = useState('');
  const [interest, setInterest] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadImage, setUploadImage] = useState('');
  const [educationData, setEducationData] = useState([{}]);
  const [isPoll, setPoll] = useState(feedSelector);
  const [openDropDown, setOpenDropDown] = useState(false);
  const currentTime = new Date();
  const thirteenYearAgo = new Date(
    currentTime.setFullYear(currentTime.getFullYear() - 13),
  );
  let uploadImageUrl = '';

  useEffect(() => {
    NetInfo.fetch().then(st => {
      if (!st.isConnected) {
        showToast(messages.noInterNet);
      }
    });
    if (!userData?.image_url) {
      setProfileImage(userData?.image_url);
    } else {
      let imageUrl = `https://d1iermgo1iu801.cloudfront.net/${userData?.image_url}`;
      setProfileImage(imageUrl);
    }
    setUserName(userData?.user_name);
    setFullName(userData?.user_display_name);
    setDate(userData?.birth_date);
    setAbout(userData?.user_bio);
    setGender(userData?.gender);
    setEducation(userData?.user_education);
    if (userData?.user_interest) {
      let interestArray = userData?.user_interest.split(',');
      setInterest(interestArray);
    }
    getEducationData();
    setIsUploadingImage(false);
    setUploadImage('');
  }, [userData]);

  const removePhoto = () => {
    setProfileImage('');
    setIsUploadingImage(true);
    setUploadImage('');
    setProfilePhotoModel(false);
  };

  const saveProfile = async () => {
    if (saveLoading) {
      return;
    }

    if (userName.indexOf(' ') >= 0) {
      showToast(messages.usernameWhitespace);
      return;
    }

    if (userName === '' || userName.length < 3) {
      showToast(messages.username3Character);
      return;
    }

    if (!education) {
      showToast(messages.selectEducation);
      return;
    }

    setSaveLoading(true);

    NetInfo.fetch().then(st => {
      if (!st.isConnected) {
        showToast(messages.noInterNet);
        setSaveLoading(false);
        return;
      }
    });

    if (uploadImage !== '') {
      try {
        const media = await fetch(uploadImage);
        const blob = await media.blob();
        const type = blob?.type;
        const ext = type.split('/')[1];
        uploadImageUrl = `profile/${
          userData?.user_id
        }-${new Date().getTime()}.${ext}`;

        await Storage.put(uploadImageUrl, blob, {
          level: 'public',
          contentType: type,
        });
      } catch (error) {
        setSaveLoading(false);
        console.log(
          'failed to upload image in s3 in update user',
          error.message,
        );
      }
    }

    var input = {
      birth_date: date,
      gender: gender,
      user_id: userData?.user_id,
      user_bio: about,
      user_display_name: fullName,
      user_education: education,
      user_name: userName,
    };

    if (isUploadingImage === true) {
      if (uploadImage !== '') {
        var input = {
          ...input,
          image_url: `public/${uploadImageUrl}`,
        };
      } else {
        var input = {
          ...input,
          image_url: null,
        };
      }
    }

    try {
      const result = await API.graphql(
        graphqlOperation(Query.updateUser, input),
      );
      setSaveLoading(false);
      var updateUser = {
        ...userData,
        birth_date: date,
        gender: gender,
        user_bio: about,
        user_display_name: fullName,
        user_education: education,
        user_name: userName,
      };
      if (isUploadingImage === true) {
        if (uploadImage !== '') {
          var updateUser = {
            ...updateUser,
            image_url: `public/${uploadImageUrl}`,
          };
        } else {
          var updateUser = {
            ...updateUser,
            image_url: null,
          };
        }
      }
      setUploadImage('');
      setIsUploadingImage(false);
      dispatch(userAction.setUserData(updateUser));
      dispatch(userAction.setFeedSelector(isPoll));
      navigation.goBack();
      showToast(messages.profileSaved);
    } catch (error) {
      setUploadImage('');
      setIsUploadingImage(false);
      setSaveLoading(false);
      console.log('failed to update user detail', error);
    }
  };

  const onClickGallery = () => {
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
        setProfileImage(dataImage);
        setIsUploadingImage(true);
        setUploadImage(resp?.uri);
      } else {
        showToast(messages.selectValidImage);
        return;
      }
    });
  };

  const onClickCamera = () => {
    setCameraModal(false);

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
        setProfileImage(dataImage);
        setIsUploadingImage(true);
        setUploadImage(resp?.uri);
      } else {
        showToast(messages.selectValidImage);
        return;
      }
    });
  };

  const isValidate = (d: string) => {
    const dt = Date.parse(d);
    return !Number.isNaN(dt);
  };

  const onPressEditProfile = async () => {
    const camera = await Permission.getCameraPermission();
    const storage = await Permission.getStoragePermission();
    if (camera && storage) {
      setProfilePhotoModel(true);
      // setCameraModal(true);
    } else {
      showToast(messages.cameraAndStoragePermission);
    }
  };

  const onPressEditInterest = () => {
    navigation.navigate(screenNameEnum.UserInterest, {
      interestData: interest,
      isEdit: true,
      userId: userData?.user_id,
    });
  };

  const getEducationData = async () => {
    try {
      const result = await API.graphql(graphqlOperation(Query.getEducation));
      const data = result?.data?.getEducation.map((item, index) => ({
        id: index,
        label: item.education_name,
        value: item.education_name,
      }));
      setEducationData(data);
    } catch (error) {
      console.log(
        'ERROR in file: editProfileScreen.tsx:317 ~ getEducationData',
        error?.errors[0]?.message,
      );
    }
  };

  const color = [
    colors.AppTheme.Primary,
    colors.AppTheme.SecondaryNew,
    colors.AppTheme.Terittory,
    colors.AppTheme.OtherFirst,
  ];
  let customIndex = 0;

  const renderProfileView = () => {
    return (
      <View style={editProfileScreenStyle.profileContainer}>
        <View style={{}}>
          <FastImage
            style={editProfileScreenStyle.profileImage}
            source={profileImage ? {uri: profileImage} : images.dp}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
            onPress={onPressEditProfile}>
            <Icon
              type="FontAwesome"
              name="camera"
              size={15}
              color={colors.AppTheme.Secondary}
              style={editProfileScreenStyle.editIcon}
            />
          </TouchableOpacity>
        </View>
        <CustomText textStyle={[editProfileScreenStyle.profileTitle]}>
          {userName}
        </CustomText>
      </View>
    );
  };

  const renderInputView = () => {
    DropDownPicker.setListMode('SCROLLVIEW');

    return (
      <View style={editProfileScreenStyle.renderViewContainer}>
        <View style={editProfileScreenStyle.textInputBox}>
          <CustomText textStyle={editProfileScreenStyle.textInputLabel}>
            User Name
          </CustomText>
          <View style={editProfileScreenStyle.textInputViewNew}>
            <TextInput
              value={userName}
              onChangeText={val => setUserName(val)}
              placeholder="Username"
              placeholderTextColor={colors.AppTheme.grayShadeAB}
              maxLength={24}
              style={editProfileScreenStyle.textInputNew}
            />
          </View>
        </View>
        <View style={editProfileScreenStyle.textInputBox}>
          <CustomText textStyle={editProfileScreenStyle.textInputLabel}>
            Full Name
          </CustomText>
          <View style={editProfileScreenStyle.textInputViewNew}>
            <TextInput
              value={fullName}
              onChangeText={val => setFullName(val)}
              placeholder="Full Name"
              placeholderTextColor={colors.AppTheme.grayShadeAB}
              maxLength={24}
              style={editProfileScreenStyle.textInputNew}
            />
          </View>
        </View>
        <View style={editProfileScreenStyle.textInputBox}>
          <CustomText textStyle={editProfileScreenStyle.textInputLabel}>
            Date Of Birth
          </CustomText>
          <DatePicker
            key={Math.random() * 100}
            modal
            open={openDatePicker}
            date={isValidate(date) ? new Date(date) : thirteenYearAgo}
            mode="date"
            confirmText="Set"
            maximumDate={thirteenYearAgo}
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
            style={editProfileScreenStyle.textInputViewNew}
            onPress={() => setDatePicker(true)}>
            <CustomText textStyle={editProfileScreenStyle.textInputNew}>
              {isValidate(date)
                ? moment(new Date(date)).format('DD/MM/YYYY')
                : 'select'}
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={editProfileScreenStyle.textInputBox}>
          <CustomText textStyle={editProfileScreenStyle.textInputLabel}>
            Bio
          </CustomText>
          <View
            style={[
              editProfileScreenStyle.textInputViewNew,
              editProfileScreenStyle.aboutTextInputView,
            ]}>
            <TextInput
              value={about}
              onChangeText={val => setAbout(val)}
              placeholderTextColor={colors.AppTheme.grayShadeAB}
              maxLength={300}
              multiline={true}
              style={[
                editProfileScreenStyle.aboutTextInput,
                editProfileScreenStyle.textInputNew,
              ]}
              placeholder={'Bio:'}
            />
          </View>
        </View>

        <View
          style={[
            editProfileScreenStyle.textInputViewNew,
            editProfileScreenStyle.gender,
          ]}>
          <CustomText textStyle={editProfileScreenStyle.usernameTxtStyle}>
            {' '}
            Gender :
          </CustomText>
          <View style={editProfileScreenStyle.genderContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton
                value="male"
                status={gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => setGender('male')}
                color={colors.AppTheme.Primary}
              />
              <CustomText textStyle={editProfileScreenStyle.genderText}>
                Male
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton
                value="female"
                status={gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => setGender('female')}
                color={colors.AppTheme.Primary}
              />
              <CustomText textStyle={editProfileScreenStyle.genderText}>
                Female
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton
                value="other"
                status={gender === 'other' ? 'checked' : 'unchecked'}
                onPress={() => setGender('other')}
                color={colors.AppTheme.Primary}
              />
              <CustomText textStyle={editProfileScreenStyle.genderText}>
                Other
              </CustomText>
            </View>
          </View>
        </View>
        <View style={editProfileScreenStyle.textInputBox}>
          <CustomText textStyle={editProfileScreenStyle.textInputLabel}>
            Select Your Education :
          </CustomText>
          <DropDownPicker
            key={Math.random() * 100}
            style={editProfileScreenStyle.textInputDropDown}
            labelStyle={{color: colors.AppTheme.Text, fontSize: ms(16)}}
            selectedItemLabelStyle={editProfileScreenStyle.selectedTextStyle}
            searchTextInputStyle={editProfileScreenStyle.inputSearchStyle}
            placeholderStyle={editProfileScreenStyle.placeholderStyle}
            searchPlaceholderTextColor={colors.AppTheme.PlaceholderColor}
            textStyle={{
              flexWrap: 'wrap',
              width: '100%',
              fontFamily: 'DMSans-Regular',
            }}
            searchContainerStyle={{
              borderBottomColor: 'transparent',
              paddingHorizontal: ms(10),
            }}
            dropDownContainerStyle={{
              borderColor: 'transparent',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
            searchable={true}
            searchPlaceholder="Search..."
            open={openDropDown}
            value={education || 'Education'}
            items={educationData}
            setOpen={setOpenDropDown}
            setValue={setEducation}
            onChangeValue={val => val && setEducation(val)}
            props={{activeOpacity: 1}}
            itemProps={{activeOpacity: 0.8}}
            scrollViewProps={{
              scrollEnabled: true,
              showsVerticalScrollIndicator: true,
            }}
            flatListProps={{
              keyboardShouldPersistTaps: 'handled',
              keyExtractor: item => `item${item.label}`,
            }}
          />
        </View>
        {/* <View
          style={[
            editProfileScreenStyle.textInputViewNew,
            editProfileScreenStyle.gender,
          ]}>
          <CustomText textStyle={editProfileScreenStyle.viewPollText}>
            View Poll :
          </CustomText>
          <View style={editProfileScreenStyle.viewPollContent}>
            <RadioButton
              value="all"
              status={isPoll === 'all' ? 'checked' : 'unchecked'}
              onPress={() => setPoll('all')}
              color={colors.AppTheme.Primary}
            />
            <CustomText textStyle={editProfileScreenStyle.genderText}>
              All
            </CustomText>
          </View>
          <View style={editProfileScreenStyle.viewPollContent}>
            <RadioButton
              value="interest"
              status={isPoll === 'interest' ? 'checked' : 'unchecked'}
              onPress={() => setPoll('interest')}
              color={colors.AppTheme.Primary}
            />
            <CustomText textStyle={editProfileScreenStyle.genderText}>
              Interested
            </CustomText>
          </View>
        </View>
        <View style={editProfileScreenStyle.interestMain}>
          <CustomText textStyle={editProfileScreenStyle.textInputLabel}>
            {' '}
            Interested In
          </CustomText>

          <View style={editProfileScreenStyle.flexRow}>
            <CustomText textStyle={editProfileScreenStyle.editText}>
              Edit
            </CustomText>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{left: 100, top: 20, right: 20, bottom: 50}}
              style={editProfileScreenStyle.editLogo}
              onPress={onPressEditInterest}>
              <SvgXml xml={svg.Edit} height={ms(12)} width={ms(12)} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={editProfileScreenStyle.interstedItemContainer}>
          {interest?.map((val, i) => {
            i === 0 ? (customIndex = 0) : customIndex++;
            if (customIndex % 4 === 0) {
              customIndex = 0;
            }
            return (
              <View
                style={[
                  editProfileScreenStyle.interestItemView,
                  {backgroundColor: color[customIndex]},
                ]}
                key={i}>
                <CustomText textStyle={editProfileScreenStyle.labelItem}>
                  {val}
                </CustomText>
              </View>
            );
          })}
        </View> */}
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#efefef'}}>
      <Header
        title={userName}
        isBack={true}
        isProfile={true}
        onPressProfile={saveProfile}
      />
      {saveLoading ? (
        <Loading Size={'large'} Color={colors.AppTheme.Text} />
      ) : (
        <KeyboardAwareScrollView>
          <SafeAreaView style={editProfileScreenStyle.container}>
            {renderProfileView()}
            {renderInputView()}
          </SafeAreaView>

          <BottomSheet
            isVisible={openCameraModal}
            onClose={() => setCameraModal(false)}
            isVideo={false}>
            <View style={bottomSheetStyle.container}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClickCamera}
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
                onPress={onClickGallery}
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

          <BottomSheet
            isVisible={ProfilePhotoModel}
            onClose={() => setProfilePhotoModel(false)}
            isVideo={false}>
            <View
              style={editProfileScreenStyle.ProfilePhotoBottomSheetContainer}>
              <CustomText textStyle={editProfileScreenStyle.editProfileText}>
                Edit Profile Picture
              </CustomText>
              {profileImage && (
                <View
                  style={[
                    editProfileScreenStyle.flexRow,
                    editProfileScreenStyle.editProfileTitle,
                  ]}>
                  <SvgXml
                    xml={svg.EditProfileReomve}
                    height={ms(16)}
                    width={ms(16)}
                  />

                  <TouchableOpacity onPress={removePhoto}>
                    <Text style={editProfileScreenStyle.editProfileTitleText}>
                      Remove Photo
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View
                style={[
                  editProfileScreenStyle.flexRow,
                  editProfileScreenStyle.editProfileTitle,
                ]}>
                <SvgXml
                  xml={svg.EditProfileImage}
                  height={ms(16)}
                  width={ms(16)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setProfilePhotoModel(false);
                    setCameraModal(true);
                  }}>
                  <Text style={editProfileScreenStyle.editProfileTitleText}>
                    Add New Photo
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  editProfileScreenStyle.flexRow,
                  editProfileScreenStyle.editProfileTitle,
                ]}>
                <SvgXml
                  xml={svg.EditProfileCancel}
                  height={ms(16)}
                  width={ms(16)}
                />
                <TouchableOpacity onPress={() => setProfilePhotoModel(false)}>
                  <Text style={editProfileScreenStyle.editProfileTitleText}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default EditProfileScreen;
