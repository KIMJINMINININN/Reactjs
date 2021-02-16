import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterafce from 'react-with-styles-interface-aphrodite';
import { css, withStyles, withStylesPropTypes} from 'react-with-styles';
import Theme from './Theme';

ThemedStyleSheet.registerTheme(Theme);
ThemedStyleSheet.registerInterface(aphroditeInterafce);

export { css, withStyles, withStylesPropTypes, ThemedStyleSheet};
export default withStyles;
