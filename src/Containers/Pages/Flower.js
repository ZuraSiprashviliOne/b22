
import React from 'react';

import {connect} from 'react-redux';
import {checkPromise} from "../../Helpers/Valid";
import {Loading} from "../../Components/Loading";
import {INIT_FLOWER, SET_FLOWER_FLOWER} from "../../Actions/FlowerActions";
import {getPageSlag} from "../../Helpers/Routing";
import {SET_NAVIGATION_CURRENT_PAGE} from "../../Actions/NavigationActions";

class Element extends React.Component{
  constructor(props){
    super(props);

    console.log(this.props, 'element');
  }

  render(){
    return (
      <div>
        {this.props.Flower.flower.title}
      </div>
    )
  }
}

class Flower extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  componentDidUpdate(props){
    this.init(props);
  }

  init(props){
    if (this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
      this.props.setPage(getPageSlag(this.props.match.path));
    }
    if(checkPromise(this.props.Flower) === false){
      this.props.initFlower();
    }

    if(this.props.Flower.flower == null){
      this.props.setFlower(parseInt(this.props.match.params.flower_id.substring(this.props.match.params.flower_id.lastIndexOf('_') + 1)));
    }
  }

  render(){
    if(checkPromise(this.props.Flower)){
      console.log(this.props.Flower, 'asfasfafasfa');
      alert('going');
      return <Element {...this.props} />;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Flower: state.FlowerReducer,
    Navigation: state.NavigationReducer
  };
};
const actions = (dispatch) => {
  return {
    setPage: (slag) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
    },
    initFlower: ()=> {
      dispatch(INIT_FLOWER());
    },
    setFlower: (id) => {
      dispatch(SET_FLOWER_FLOWER(id));
    }
  };
};


export default connect(states, actions)(Flower);