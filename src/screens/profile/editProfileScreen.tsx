import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
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
import {Chip, RadioButton} from 'react-native-paper';
import {EducationData, InterestData} from '../../helper/profileHelper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from 'redux-persist/lib/storage';
import {API, Auth, graphqlOperation, Storage} from 'aws-amplify';
import {getUploadMediaUrl, showToast} from '../../helper/helper';
import {
  userAction,
  useUserData,
} from '../../redux/reducers/user-slice/userSlice';
import ProfileHeader from './component/profileHeader';
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
const EditProfileScreen = () => {
  const userData = useUserData();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openCameraModal, setCameraModal] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [fullname, setFullname] = useState('');
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [openDatePicker, setDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [Education, setEducation] = useState('');
  const [interest, setInterest] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState('');

  useEffect(() => {
    NetInfo.fetch().then(st => {
      if (!st.isConnected) {
        showToast('connect to the internet');
      }
    });
    if (!userData?.image_url) {
      setProfileImage(userData?.image_url);
    } else {
      let imageUrl = `https://d1iermgo1iu801.cloudfront.net/${userData?.image_url}`;
      setProfileImage(imageUrl);
    }
    setUserName(userData?.user_name);
    setFullname(userData?.user_display_name);
    setDate(userData?.birth_date || new Date());
    setAbout(userData?.user_bio);
    setGender(userData?.gender);
    setEducation(userData?.user_education);

    console.log(userData, 'uuuuuuuuuuu');
    if (userData?.user_interest) {
      let interestArray = userData?.user_interest.split(',');
      setInterest(interestArray);
    }
  }, [userData]);

  const saveProfile = async () => {
    if (saveLoading) {
      return;
    }

    if (userName.indexOf(' ') >= 0) {
      showToast('Username does not contain white space');
      return;
    }

    if (userName === '' || userName.length < 3) {
      showToast('Username must be a minimum of 3');
      return;
    }

    if (profileImage === '' || !profileImage) {
      showToast('Please select a photo for profile');
      return;
    }

    if (gender === '') {
      console.log('gender is not defined');
      return;
    }

    setSaveLoading(true);

    NetInfo.fetch().then(st => {
      if (!st.isConnected) {
        showToast('connect to the internet');
        setSaveLoading(false);
        return;
      }
    });

    if (uploadImage === '') {
      const result = await API.graphql(
        graphqlOperation(Query.updateUser, {
          birth_date: date.toString(),
          gender: gender,
          user_id: userData?.user_id,
          user_bio: about,
          user_display_name: fullname,
          user_education: Education,
          user_name: userName,
        }),
      );
      setSaveLoading(false);
      navigation.goBack();
      showToast('Profile has been successfully saved');
      console.log(result, 'result from update user without image');

      const updateUser = {
        ...userData,
        birth_date: date.toString(),
        gender: gender,
        user_bio: about,
        user_display_name: fullname,
        user_education: Education,
        user_name: userName,
      };
      dispatch(userAction.setUserData(updateUser));
    } else {
      const media = await fetch(uploadImage);
      const blob = await media.blob();
      const type = blob?.type;
      const ext = type.split('/')[1];
      const fileName = `profile/${
        userData?.user_id
      }-${new Date().getTime()}.${ext}`;

      await Storage.put(fileName, blob, {
        level: 'public',
        contentType: type,
        // useAccelerateEndpoint: true,
      })
        .then(async () => {
          console.log('upload image successfully in s3');
          try {
            setUploadImage('');
            const result = await API.graphql(
              graphqlOperation(Query.updateUser, {
                image_url: `public/${fileName}`,
                birth_date: date.toString(),
                gender: gender,
                user_id: userData?.user_id,
                user_bio: about,
                user_display_name: fullname,
                user_education: Education,
                user_name: userName,
              }),
            );

            console.log(result, 'result from update user with image');
            navigation.goBack();
            showToast('Profile has been successfully saved');
            setSaveLoading(false);
            const updateUser = {
              ...userData,
              image_url: `public/${fileName}`,
              birth_date: date.toString(),
              gender: gender,
              user_bio: about,
              user_display_name: fullname,
              user_education: Education,
              user_name: userName,
            };
            dispatch(userAction.setUserData(updateUser));
          } catch (error) {
            console.log(error, 'error from update user');
            setSaveLoading(false);
          }
        })
        .catch(e => {
          console.log(e, 'error from upload image in s3 bucket');
          setSaveLoading(false);
        });
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
      console.log(cameraResponse, 'camera response');

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
        setProfileImage(dataImage);
        setUploadImage(resp?.uri);
      } else {
        console.log('please select jpeg , jpg or png file');
        showToast('please select jpeg , jpg or png file');
        return;
      }
    });
  };

  const onClickCamera = () => {
    console.log('camera clicked');
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

      const ext = resp?.type.split('/')[1];

      if (ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
        const dataImage = await getUploadMediaUrl(resp);
        setProfileImage(dataImage);
        setUploadImage(resp?.uri);
      } else {
        console.log('please select jpeg , jpg or png file');
        showToast('please select jpeg , jpg or png file');
        return;
      }
    });
  };

  const isValiddate = (d: string) => {
    const dt = Date.parse(d);
    return !Number.isNaN(dt);
  };

  const onPressEditProfile = async () => {
    const mic = await Permission.getMicPermission();
    const camera = await Permission.getCameraPermission();
    const storage = await Permission.getStoragePermission();
    if (mic && camera && storage) {
      setCameraModal(true);
    } else {
      showToast('mice, camera and storage permission required');
    }
  };

  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const data = [...EducationData.map(val => ({label: val, value: val}))];

  const color = [
    colors.AppTheme.Primary,
    colors.AppTheme.RedSalsa,
    colors.AppTheme.OrangeRed,
    colors.AppTheme.Sunglow,
    colors.AppTheme.YellowGreen,
  ];
  let customIndex = 0;

  const renderProfileView = () => {
    return (
      <>
        {/* <View style={{ marginTop: ms(30), alignItems: 'center', }}>
					<FastImage
						style={profileScreenStyle.profileImage}
						source={profileImage ? { uri: profileImage } : images.dp}
						resizeMode={FastImage.resizeMode.cover}
					/>
					<TouchableOpacity 
          activeOpacity={0.8}
						style={{ marginTop: ms(15) }}
						hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
						onPress={onPressEditProfile}>
						<CustomText textStyle={{ color: colors.AppTheme.Text, fontWeight: '500' }}>
							Edit Profile
						</CustomText>
					</TouchableOpacity>
				</View> */}

        <View style={editProfileScreenStyle.profileContainer}>
          <View style={{}}>
            <FastImage
              style={editProfileScreenStyle.profileImage}
              source={profileImage ? { uri: profileImage } : images.dp}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{bottom: ms(-10), left: ms(14), position: 'absolute'}}
              hitSlop={{left: 10, right: 10, top: 100, bottom: 10}}
              onPress={onPressEditProfile}>
              <Icon
                type="MaterialIcons"
                name="edit-location"
                size={30}
                color={colors.AppTheme.Primary}
              />
            </TouchableOpacity>
          </View>
          <CustomText textStyle={[editProfileScreenStyle.profileTitle]}>
            {userName}
          </CustomText>
        </View>
      </>
    );
  };

  const onPressEditInterest = () => {
    console.log('edit interest clicked');
    navigation.navigate(screenNameEnum.UserInterest, {
      interestData: interest,
      isEdit: true,
      userId: userData?.user_id,
    });
  };

  const renderInputView = () => {
    return (
      <View style={editProfileScreenStyle.renderViewContainer}>
        <View style={editProfileScreenStyle.textInputViewNew}>
          <TextInput
            value={userName}
            onChangeText={val => setUserName(val)}
            placeholder="Username"
            placeholderTextColor={colors.grayShadeAB}
            maxLength={24}
            style={editProfileScreenStyle.textInputNew}
          />
        </View>

        <View style={editProfileScreenStyle.textInputViewNew}>
          <TextInput
            value={fullname}
            onChangeText={val => setFullname(val)}
            placeholder="Full Name"
            placeholderTextColor={colors.grayShadeAB}
            maxLength={24}
            style={editProfileScreenStyle.textInputNew}
          />
        </View>

        <DatePicker
          modal
          open={openDatePicker}
          date={isValiddate(date) ? new Date(date) : new Date()}
          mode="date"
          confirmText="Set"
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
            {isValiddate(date) ? moment(date).format('DD/MM/YYYY') : 'select'}
          </CustomText>
        </TouchableOpacity>

        <View
          style={[
            editProfileScreenStyle.textInputViewNew,
            editProfileScreenStyle.aboutTextInputView,
          ]}>
          <TextInput
            value={about}
            onChangeText={val => setAbout(val)}
            placeholderTextColor={colors.grayShadeAB}
            maxLength={500}
            multiline={true}
            style={[
              editProfileScreenStyle.aboutTextInput,
              editProfileScreenStyle.textInputNew,
            ]}
            placeholder={'Bio:'}
          />
        </View>
        <View
          style={[
            editProfileScreenStyle.textInputViewNew,
            editProfileScreenStyle.gender,
          ]}>
          <CustomText textStyle={editProfileScreenStyle.usernameTxtStyle}>
            {' '}
            Gender
          </CustomText>
          <View style={editProfileScreenStyle.genderContainer}>
            <RadioButton
              value="male"
              status={gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('male')}
              color={colors.blackShade02}
            />
            <CustomText textStyle={editProfileScreenStyle.genderText}>
              Male
            </CustomText>
            <RadioButton
              value="female"
              status={gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('female')}
              color={colors.blackShade02}
            />
            <CustomText textStyle={editProfileScreenStyle.genderText}>
              Female
            </CustomText>
          </View>
        </View>

        <Dropdown
          style={[
            editProfileScreenStyle.containerDropDwon,
            editProfileScreenStyle.textInputDropDown,
            isFocus && {borderColor: 'blue', borderWidth: 1},
          ]}
          placeholderStyle={editProfileScreenStyle.placeholderStyle}
          selectedTextStyle={editProfileScreenStyle.selectedTextStyle}
          inputSearchStyle={editProfileScreenStyle.inputSearchStyle}
          iconStyle={editProfileScreenStyle.iconStyle}
          itemTextStyle={{color: colors.AppTheme.Primary}}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Education' : '...'}
          searchPlaceholder="Search..."
          value={value || Education}
          dropdownPosition={'auto'}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            setEducation(item.value);
          }}
          renderLeftIcon={() => (
            <Icon
              style={editProfileScreenStyle.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              type="AntDesign"
              size={20}
            />
          )}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: ms(16),
          }}>
          <CustomText
            textStyle={[
              editProfileScreenStyle.usernameTxtStyle,
              editProfileScreenStyle.interstedTxtStyle,
            ]}>
            {' '}
            Intersted In
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
            if (customIndex % 5 === 0) {
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
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: 'rgba(0, 6, 61, 0.1)'}}>
      <Header
        title={userName}
        isBack={true}
        isProfile={true}
        onPressProfile={saveProfile}
      />
      {saveLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.AppTheme.Text} />
        </View>
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
              <TouchableOpacity activeOpacity={0.8} onPress={onClickCamera}>
                <Icon
                  type="Entypo"
                  name="camera"
                  size={50}
                  color={colors.blackShade1B}
                  style={bottomSheetStyle.btnImage}
                />

                <CustomText textStyle={bottomSheetStyle.btnText}>
                  Camera
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={onClickGallery}>
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
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default EditProfileScreen;
