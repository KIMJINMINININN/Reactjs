import React from 'react';
import { storiesOf } from '@storybook/react';

import Text from '../doit-ui/Text';

storiesOf('Doit-UI/Text', module).addWithJSX('Text 예제', () => (
  <div>
    <Text xlarge>Xlarge</Text>
    <Text xlarge prmiary>
      Xlarge primary
    </Text>
    <Text xlarge secondary>
      Xlarge secondary
    </Text>
    <Text xlarge bold>
      large bold
    </Text>
    <Text xlarge light>
      Xlarge light
    </Text>
    <br />
    <Text xsmall>xsmall</Text>
    <Text xsmall primary>
      small primary
    </Text>
    <Text xsmall secondary>
      small primary
    </Text>
    <Text xsmall bold>
      Large bold
    </Text>
    <Text xsmall light>
      Large light
    </Text>
    <br />
  </div>
));
