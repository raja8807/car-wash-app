import {
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { CommonStyles, Spacing } from '../constants/Styles';
import { BackButton } from './BackButton';

export const ScreenWrapper = ({
    children,
    style,
    headerText = '',
    headerRight = null,
    hasBackButton = true,
}) => {
    return (
        <SafeAreaView style={[styles.container, style]} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <View style={styles.content}>
                {
                    headerText && <View style={styles.header}
                    >
                        <View style={CommonStyles.row}>
                            {hasBackButton && <BackButton />}
                            <Text style={CommonStyles.headerTitle}>{headerText}</Text>
                        </View>
                        {headerRight}
                    </View>
                }
                {children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.l,
        marginTop: Spacing.s,
    },



    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.m,
    },
});
