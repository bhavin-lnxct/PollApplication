import React from 'react';
import {View} from 'react-native';
import feedCardStyle from '../feedCardStyle';
import svg from '../../../theme/svg/svg';
import colors from '../../../theme/colors/colors';
import SimpleRepostButton from '../../simpleRepostButton/SimpleRepostButton';
import {createShareLink} from '../../../helper/helper';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import appConstants from '../../../helper/appConstant';

interface RepostInterface {
  routeName: string;
  userId?: string;
  myId?: string;
  onPressDelete?: () => void;
  onPressReport: () => void;
  onPressExplanations: () => void;
  isDeleteLoading?: boolean;
  item: object;
  deletePost?: () => void;
  isExplanation?: boolean;
  onPressShare?:() => void;
}

const Repost = ({
  routeName,
  item,
  userId,
  myId,
  onPressDelete,
  isDeleteLoading,
  onPressReport,
  onPressExplanations,
  deletePost,
  isExplanation,
  onPressShare
}: RepostInterface) => {
  const navigation = useNavigation();
  const GotoShare = () => {
    console.log('GotoShare');
  };

  return (
    <View style={feedCardStyle.repostContainer}>
      {userId === myId ? (
        <>
          <SimpleRepostButton
            title="Share"
            onPressButton={onPressShare}
            color={colors.AppTheme.OrangeRed}
            icon={svg.Share}
          />
          {isExplanation && <SimpleRepostButton
            title="Explanations"
            onPressButton={onPressExplanations}
            icon={svg.Explanation}
            color={colors.AppTheme.OrangeRed}
          />}
          <SimpleRepostButton
            title="Delete"
            onPressButton={deletePost}
            icon={svg.DeleteWhite}
            color={colors.AppTheme.OrangeRed}
            isLoading={isDeleteLoading}
          />
        </>
      ) : (
        <>
          <SimpleRepostButton
            title="Share"
            onPressButton={onPressShare}
            color={colors.AppTheme.OrangeRed}
            icon={svg.Share}
          />
          <SimpleRepostButton
            title="Report"
            onPressButton={onPressReport}
            icon={svg.ReportPost}
            color={colors.AppTheme.OrangeRed}
            isLoading={isDeleteLoading}
          />
        </>
      )}
    </View>
  );
};

export default Repost;
