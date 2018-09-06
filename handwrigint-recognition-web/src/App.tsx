import * as React from 'react'

import { Route, Switch } from 'react-router';

import ImagePredict from './ImagePredict';

import WritingPredict from './WritingPredict';

// import Home from './Home';

import './App.css'
import { Navbar } from './components';

const MainRoute: React.SFC<{}> = () => (
  <React.Fragment>
    <Navbar/>
    <Switch>
    <Route exact={true} path={"/image"} component={ImagePredict} />
    <Route exact={true} path={"/write"} component={WritingPredict} />
    <Route component={WritingPredict}/>
  </Switch>
  </React.Fragment>
  // <WritingPredict/>
)

export default MainRoute