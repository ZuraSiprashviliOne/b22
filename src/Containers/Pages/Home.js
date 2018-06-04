
import React from 'react';

import {connect} from 'react-redux';

import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import {Loading} from "../../Components/Loading";

import SliderComponent from '../../Components/SliderComponent';

import {INIT_SLIDER, SET_SLIDER_SLIDES} from "../../Actions/SliderActions";
import {checkPromise} from "../../Helpers/Valid";

import {Sales} from "../../Components/Sales";
import {INIT_SALES, SET_SALES_ITEMS} from "../../Actions/SalesActions";
import {INIT_COLLECTIONS, SET_COLLECTIONS_ITEMS} from "../../Actions/CollectionsActions";

import {CollectionsComponent} from "../../Components/CollectionsComponent";

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <main
        id={'home_page'}
        className={'animated fadeIn page bg-light'}>
        <div
          className={'slider'}>
          <SliderComponent {...this.props.Slider}/>
        </div>

        <Sales {...this.props.Sales}/>

        <div className={'collections-container'}>
          <CollectionsComponent {...this.props.Collections}/>
        </div>

      </main>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props) {
    if (this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
      this.props.setPage(getPageSlag(this.props.match.path));
    }
    if(checkPromise(this.props.Slider) === false){
      this.props.initSlider();
    }
    if(this.props.Slider.slides === null){
      this.props.setSliderSlides();
    }
    if(checkPromise(this.props.Sales) === false){
      this.props.initSales();
    }
    if(checkPromise(this.props.Collections) === false){
      this.props.initCollections();
    }
    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }
  render(){
    if(
      checkPromise(this.props.Slider)
      && checkPromise(this.props.Sales)
      && checkPromise(this.props.Collections)
    ){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}


const states = (state) => {
  return {
    Slider: state.SliderReducer,
    Sales: state.SalesReducer,
    Collections: state.CollectionsReducer,
    Navigation: state.NavigationReducer
  };
};

const actions = (dispatch) => {
  return {
    setPage: (slag) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
    },
    setPath: (path) => {
      dispatch(SET_NAVIGATION_PATH(path));
    },
    initSlider: () => {
      dispatch(INIT_SLIDER());
    },
    setSliderSlides: () => {
      dispatch(SET_SLIDER_SLIDES());
    },
    initSales: () => {
      dispatch(INIT_SALES());
      dispatch(SET_SALES_ITEMS());
    },
    initCollections: () => {
      dispatch(INIT_COLLECTIONS());
      dispatch(SET_COLLECTIONS_ITEMS());
    }
  }
};

export default connect (states, actions)(Home);