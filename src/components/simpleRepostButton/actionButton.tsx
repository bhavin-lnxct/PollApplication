import {TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {ms} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';
import CustomText from '../text/CustomText';

interface ActionInterface {
  buttonColor: any;
  title: string;
  marginhorizontal: any;
  textColor: any;
  onPressButton: any;
}

const ActionButton = ({
  buttonColor,
  title,
  marginhorizontal,
  textColor,
  onPressButton,
}: ActionInterface) => {
  return (
    <View style={[marginhorizontal]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressButton}
        style={{
          backgroundColor: buttonColor,
          height: ms(50),
          borderRadius: ms(15),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText textStyle={{color: textColor, fontFamily: 'DMSans-Medium'}}>
          {title}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
export default ActionButton;
