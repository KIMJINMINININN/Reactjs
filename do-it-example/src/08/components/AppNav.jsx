import React, { PureComponent } from 'react';
import { withStyles, css, withStylesPropTypes } from '../../doit-ui/withStyles';
import Heading from '../../doit-ui/Heading';
import Text from '../../doit-ui/Text';

export const HEIGHT = 64;

class AppNav extends PureComponent {
    render() {
        const { styles } = this.props;
        return (
            <div {...css(styles.wrapper)}>
                <div {...css(styles.container)}>
                    <Heading level={3} inverse>두잇 코인 거래소</Heading>
                    <Text inverse bold large>
                        회원 가입
                    </Text>
                </div>
            </div>
        );
    }
}

AppNav.propTypes = {
    ...withStylesPropTypes,
};

export default withStyles(({ color, depth, unit }) => ({
    wrapper: {
        ...depth.level1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: HEIGHT - 4,
        backgroundColor: color.primary,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: unit * 2,
        paddingRight: unit * 2,
    },
}))(AppNav);