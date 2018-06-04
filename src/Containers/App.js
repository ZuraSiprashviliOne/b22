
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import {connect} from 'react-redux';
import {reactLocalStorage as Storage} from 'reactjs-localstorage';

import {checkPromise} from "../Helpers/Valid";

import {Loading} from "../Components/Loading";

import {
  INIT_LOCALE,
  SET_LOCALE_PRIMARY_CURRENT,
  SET_LOCALE_PRIMARY_KEYWORDS_RES
} from "../Actions/LocaleActions";

import {Scrollbar} from "../Components/Scrollbar";

import 'font-awesome/css/font-awesome.min.css';
import 'animate.css/animate.min.css';
import 'swiper/dist/css/swiper.min.css';

import '../Stylesheet/bootstrap.css';
import '../Stylesheet/style.css';

import Navigation from './Navigation';
import Footer from './Footer';

import Pages from './Pages';
import {INIT_COMMON_REDUCER} from "../Actions/CommonActions";

class Element extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      navbarIsFixed: false,
    };
  }

  componentDidUpdate(props){
  }

  render(){
    return (
      <div
        id={'App'}
        className={'Application'}>
        <Scrollbar
          currentpath={this.props.Navigation.path}
          onScroll={(event) => {
            if (event.target.scrollTop > 30) {
              if (!this.state.navbarIsFixed) {
                this.setState({navbarIsFixed: true});
              }
            } else {
              if (this.state.navbarIsFixed) {
                this.setState({navbarIsFixed: false});
              }
            }
          }}>
          <Router>
            <div
              id={'RouterContainer'}>
              <Navigation
                fixed={this.state.navbarIsFixed}
                setLocale={this.props.setLocale}/>
              <Switch>
                <Route
                  path={'/'}
                  exact={true}
                  component={Pages.Home}/>
                <Route
                  path={'/flowers/:flower_category'}
                  exact={true}
                  component={Pages.Flowers}/>
                <Route
                  path={'/flowers/items/:flower_id'}
                  exact={true}
                  component={Pages.Flower}/>
              </Switch>
              <Footer
                common={this.props.Common}/>
            </div>
          </Router>
        </Scrollbar>
      </div>
    );
  }
}
class App extends React.Component{
  constructor(props){
    super(props);


    this.state = {
      ready: () =>
        checkPromise(this.props.Locale.primary)
        && checkPromise(this.props.Common)
    }
  }

  componentDidMount(){
    this.props.initCommon();
    this.props.initLocale(() => {
      if(!this.props.Locale.current){
        this.props.setLocale(this.props.Locale.default);
      }
    });
  }

  render(){
    return this.state.ready() ? <Element {...this.props} /> : <Loading/>;
  }
}

const states = (state) => {
  return {
    Locale: state.LocaleReducer,
    Common: state.CommonReducer,
    Navigation: state.NavigationReducer
  };
};

const actions = (dispatch) => {
  return {
    initLocale: (callback) => {
      dispatch(INIT_LOCALE());
      callback();
    },
    setLocale: (code) => {
      let storageLocale = Storage.get('locale');
      if(!code){
        code = storageLocale;
        dispatch(SET_LOCALE_PRIMARY_CURRENT(code));
        dispatch(SET_LOCALE_PRIMARY_KEYWORDS_RES(code));
      }
      if(storageLocale !== code){
        dispatch(SET_LOCALE_PRIMARY_CURRENT(code));
        dispatch(SET_LOCALE_PRIMARY_KEYWORDS_RES(code));
        Storage.set('locale', code);
      }
    },
    initCommon: () => {
      dispatch(INIT_COMMON_REDUCER());
    },
  };
};

export default connect(states, actions)(App);