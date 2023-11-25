import {ActivityIndicator, View} from 'react-native';
import styles from './styles';
import * as Colors from '../../styles/colors';

const LoadingScreen = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={Colors.GREEN} />
    </View>
);

export default LoadingScreen;
