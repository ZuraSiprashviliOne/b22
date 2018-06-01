
import React from 'react';

import {connect} from 'react-redux';

import {SET_NAVIGATION_CURRENT_PAGE} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import {Loading} from "../../Components/Loading";

import SliderComponent from '../../Components/SliderComponent';

import {INIT_SLIDER, SET_SLIDER_SLIDES} from "../../Actions/SliderActions";
import {checkPromise} from "../../Helpers/Valid";

import {Addons} from "../../Components/Addons";
import {Sales} from "../../Components/Sales";
import {INIT_SALES, SET_SALES_ITEMS} from "../../Actions/SalesActions";
import {INIT_COLLECTIONS, SET_COLLECTIONS_ITEMS} from "../../Actions/CollectionsActions";

import {CollectionsComponent} from "../../Components/CollectionsComponent";
import {INIT_ADDONS, SET_ADDONS_ADDONS} from "../../Actions/AddonsActions";

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

        <CollectionsComponent {...this.props.Collections}/>

        {/*<Addons {...this.props.Addons}/>*/}
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
    props.setPage(getPageSlag(this.props.match.path));
    if(checkPromise(props.Slider) === false){
      props.initSlider();
    }
    if(props.Slider.slides === null){
      props.setSliderSlides();
    }
    if(checkPromise(props.Sales) === false){
      props.initSales();
    }
    if(checkPromise(props.Collections) === false){
      props.initCollections();
    }
    if(checkPromise(props.Addons) === false){
      props.initAddons();
    }
  }

  render() {
    if (
      checkPromise(this.props.Slider)
      && checkPromise(this.props.Sales)
      && checkPromise(this.props.Collections)
      && checkPromise(this.props.Addons)
    ) {
      return <Element {...this.props} />;
    } else {
      return <Loading/>;
    }
  }
}


const states = (state) => {
  return {
    Slider: state.SliderReducer,
    Sales: state.SalesReducer,
    Collections: state.CollectionsReducer,
    Addons: state.AddonsReducer
  };
};

const actions = (dispatch) => {
  return {
    setPage: (slag) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
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
    },
    initAddons: () => {
      dispatch(INIT_ADDONS());
      dispatch(SET_ADDONS_ADDONS());
    }
  }
};

export default connect (states, actions)(Home);