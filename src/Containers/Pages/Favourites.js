
import React from 'react';

import {connect} from 'react-redux';
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {checkPromise} from "../../Helpers/Valid";
import {Loading} from "../../Components/Loading";
import {INIT_FAVOURITES} from "../../Actions/FavouritesActions";
import {getPageSlag} from "../../Helpers/Routing";

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div
        id={'favourites_page'}
        className={'page animated fadeIn'}>
        {this.props.Favourites.count}
      </div>
    )
  }
}

class Favourites extends React.Component{
  constructor(props) {
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){

    if (this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
      this.props.setPage(getPageSlag(this.props.match.path));
    }

    if(checkPromise(props.Favourites) === false){
      this.props.initFavourites();
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(checkPromise(this.props.Favourites)){
      return <Element />;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Navigation: state.NavigationReducer,
    Favourites: state.FavouritesReducer
  };
};

const actions = (dispatch) => {
  return {
    setPage: (page) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(page));
    },
    setPath: (path) => {
      dispatch(SET_NAVIGATION_PATH(path));
    },
    initFavourites: () => {
      dispatch(INIT_FAVOURITES());
    }
  };
};

export default connect(states, actions)(Favourites);