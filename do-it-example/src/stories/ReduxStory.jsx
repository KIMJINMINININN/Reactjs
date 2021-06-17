import React from 'react';
import { storiesOf } from '@storybook/react';

import ReduxApp1 from '../07/ReduxApp01'
import ReduxApp2 from '../07/ReduxApp02'
import ReduxApp3 from '../07/ReduxApp03'
import AdvReduxApp1 from '../07/AdvReduxApp01'
import AdvReduxApp2 from '../07/AdvReduxApp02'
import AdvReduxApp3 from '../07/AdvReduxApp03'
import AdvReduxApp4 from '../07/AdvReduxApp04'
import AdvReduxApp5 from '../07/AdvReduxApp05'

storiesOf('Redux', module)
  .addWithJSX('first', () => (
    <ReduxApp1></ReduxApp1>
  ))
  .addWithJSX('second', () =>(
    <ReduxApp2></ReduxApp2>
  ))
  .addWithJSX('third', () =>(
    <ReduxApp3></ReduxApp3>
  ))
  .addWithJSX('four', () =>(
    <AdvReduxApp1></AdvReduxApp1>
  ))
  .addWithJSX('five', () =>(
    <AdvReduxApp2></AdvReduxApp2>
  ))
  .addWithJSX('six', () =>(
    <AdvReduxApp3></AdvReduxApp3>
  ))
  .addWithJSX('seven', () =>(
    <AdvReduxApp4></AdvReduxApp4>
  ))
  .addWithJSX('AdvReduxApp5', () =>(
    <AdvReduxApp5></AdvReduxApp5>
  ))