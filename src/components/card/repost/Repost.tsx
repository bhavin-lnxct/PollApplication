import { View } from 'react-native';
import React from 'react';
import feedCardStyle from '../feedCardStyle';
import svg from '../../../theme/svg/svg';
import colors from '../../../theme/colors/colors';
import SimpleRepostButton from '../../simpleRepostButton/SimpleRepostButton';

interface RepostInterface {
  userId?: string;
  myId?: string;
  onPressDelete?:()=>void;
  isDeleteLoading?: boolean;
}

const Repost = ({userId, myId, onPressDelete,isDeleteLoading}: RepostInterface) => {
  const GotoShare = () => {
    console.log('GotoShare');
  };

  return (
    <View style={feedCardStyle.repostContainer}>
      {userId === myId ? (
        <>
          <SimpleRepostButton
            title="share"
            onPressButton={GotoShare}
            color={colors.AppTheme.OrangeRed}
            icon={svg.Share}
          />
          <SimpleRepostButton
            title="Edit"
            onPressButton={GotoShare}
            color={colors.AppTheme.RedSalsa}
            icon={svg.EditWhite}
          />
          <SimpleRepostButton
            title="Save"
            onPressButton={GotoShare}
            color={colors.AppTheme.Sunglow}
            icon={svg.Download}
          />
          <SimpleRepostButton
            title="QR Code"
            onPressButton={GotoShare}
            color={colors.AppTheme.YellowGreen}
            icon={svg.QrCode}
          />
          <SimpleRepostButton
            title="Archive"
            onPressButton={GotoShare}
            icon={svg.Archive}
            color={colors.AppTheme.OrangeRed}
          />
          <SimpleRepostButton
            title="Turn Off Commenting"
            onPressButton={GotoShare}
            icon={svg.TurnOff}
            color={colors.AppTheme.RedSalsa}
          />
          <SimpleRepostButton
            title="Link"
            onPressButton={GotoShare}
            icon={svg.Link}
            color={colors.AppTheme.Primary}
          />
          <SimpleRepostButton
            title="Post Other Aps"
            onPressButton={GotoShare}
            icon={svg.PostAps}
            color={colors.AppTheme.Sunglow}
          />
          <SimpleRepostButton
            title="Pin To Your Profile"
            onPressButton={GotoShare}
            icon={svg.PinToProfile}
            color={colors.AppTheme.YellowGreen}
          />
          <SimpleRepostButton
            title="Delete"
            onPressButton={onPressDelete}
            icon={svg.DeleteWhite}
            color={colors.AppTheme.OrangeRed}
            isLoading={isDeleteLoading}
          />
        </>
      ) : (
        <>
         <SimpleRepostButton
            title="share"
            onPressButton={GotoShare}
            color={colors.AppTheme.OrangeRed}
            icon={svg.Share}
          />
          <SimpleRepostButton
            title="Edit"
            onPressButton={GotoShare}
            color={colors.AppTheme.RedSalsa}
            icon={svg.EditWhite}
          />
        </>
      )}
    </View>
  );
};

export default Repost;
