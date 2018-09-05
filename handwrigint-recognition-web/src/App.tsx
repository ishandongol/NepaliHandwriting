import * as React from 'react'

import { Route, Switch } from 'react-router';

import ImagePredict from './ImagePredict';

import WritingPredict from './WritingPredict';

import Home from './Home';

import './App.css'

const MainRoute: React.SFC<{}> = () => (
  <Switch>
    <Route exact={true} path={"/image"} component={ImagePredict} />
    <Route exact={true} path={"/write"} component={WritingPredict} />
    <Route component={Home}/>
  </Switch>
)

export default MainRoute