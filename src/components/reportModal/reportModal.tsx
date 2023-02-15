import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';
import BottomSheet from '../bottomSheet/bottomSheet';
import CustomText from '../text/CustomText';
import ThemeButton from '../themeButton/themeButton';

export interface reportModalProps {
  isVisible?: boolean;
  setIsVisible?: any;
  reportTitle?: string;
}

const checkData = [
  'it’s Spam',
  'Nudity Or Sexual Activity',
  'I Just Don’t Like It',
  'Hate Speech Or Symbols',
  'false Information',
  'Bullying Or Harassment',
  'Violence Or Dangerous Organisations',
  'Scam Or Fraud',
  'Intellectual property Violation',
  'Sale Of Illegal Or Regulated goods',
  'Suicide Or Self-Injury',
  'Eating Disorders',
  'Something Else',
];

const ReportModal = ({
  isVisible,
  setIsVisible,
  reportTitle,
}: reportModalProps) => {
  const [value, setValue] = useState('');

  const ActionComponent = ({text}) => {
    return (
      <Pressable
        onPress={() => setValue(text)}
        style={[style.option, text === value && style.optionChecked]}>
        <CustomText textStyle={style.optionboxText}>{text}</CustomText>
      </Pressable>
    );
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={() => {
        setIsVisible(false);
        setValue('');
      }}>
      <View style={style.reportContainer}>
        <View style={style.reportContent}>
          <CustomText textStyle={style.reportTextHeader}>Report</CustomText>
          <CustomText textStyle={style.reportDescription}>
            {reportTitle}
          </CustomText>
        </View>
        {checkData.map((data, i) => {
          return <ActionComponent text={data} key={i} />;
        })}
        <View>
          <ThemeButton
            title={'Report'}
            containerStyle={style.reportButton}
            titleStyle={style.reportText}
            onPress={() => {
              setIsVisible(false);
              setValue('');
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default ReportModal;

const style = ScaledSheet.create({
  reportContainer: {
    backgroundColor: colors.AppTheme.Secondary,
    borderRadius: ms(32),
    paddingVertical: ms(16),
  },
  reportContent: {
    marginHorizontal: ms(16),
  },
  reportTextHeader: {
    color: colors.AppTheme.Text,
    textAlign: 'center',
    fontSize: ms(18),
    fontWeight: '700',
    borderBottomColor: colors.AppTheme.OtherSecond,
    borderBottomWidth: ms(1),
    paddingBottom: ms(16),
  },
  reportDescription: {
    color: colors.AppTheme.Text,
    fontWeight: 'bold',
    marginVertical: ms(8),
    textTransform: 'capitalize',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ms(8),
    paddingHorizontal: ms(16),
  },
  optionboxText: {
    color: colors.AppTheme.Text,
    fontSize: ms(16),
  },
  optionChecked: {
    backgroundColor: colors.AppTheme.OtherSecond,
  },
  reportButton: {
    marginHorizontal: ms(16),
    marginTop: ms(20),
    borderRadius: ms(32),
    marginBottom: ms(16),
  },
  reportText: {
    textAlign: 'center',
    color: colors.AppTheme.Secondary,
    fontSize: ms(16),
  },
});
