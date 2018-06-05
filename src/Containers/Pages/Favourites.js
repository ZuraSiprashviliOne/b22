
import React from 'react';

import {connect} from 'react-redux';
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {checkPromise} from "../../Helpers/Valid";
import {Loading} from "../../Components/Loading";
import {
  ADD_FAVOURITES_FAVOURITES_BY_ID,
  INIT_FAVOURITES,
  UNSET_FAVOURITES_FAVOURITE_ITEM, UNSET_FAVOURITES_FAVOURITES
} from "../../Actions/FavouritesActions";
import {getPageSlag} from "../../Helpers/Routing";

import Translate from '../Translate';

import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';

import FontAwesome from 'react-fontawesome';
import {FlowerItem} from "./Flowers";
import {reactLocalStorage as Storage} from "reactjs-localstorage";

class Element extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      totalPrice: null
    };

    this.getItems = this.getItems.bind(this);
    this._add_favourite = this._add_favourite.bind(this);
    this._remove_favourites = this._remove_favourites.bind(this);
    this._unset = this._unset.bind(this);
  }

  _unset() {
    // this.props.clearFavourites();
  }

  _add_favourite(id) {
    if(this.props.Favourites.favourites.every((f) => f.id != id)){
      this.props.fvaddid(id);
      Storage.set('favourites', Storage.get('favourites') === undefined ? JSON.stringify([id]) : JSON.stringify([...JSON.parse(Storage.get('favourites')), id]));
      return true;
    }else{
      return false;
    }
  }

  _remove_favourites(id){
    if(this.props.Favourites.favourites.some((f) => f.id == id)){
      this.props.fvrm(id);
      Storage.set('favourites', JSON.stringify(JSON.parse(Storage.get('favourites')).filter((f) => f != id)));
      return false;
    }else{
      return true;
    }
  }

  componentDidMount(){
    if(this.props.Favourites.favourites){
      let price = 0;
      this.props.Favourites.favourites.map((f) => {price += parseFloat(f.price)});
      this.setState({totalPrice: price.toPrecision(5)});
    }
  }

  getItems(){
    return this.props.Favourites.favourites.map((favourite) => {
      return (
        <Col
          key={favourite.id}
          lg={3}
          md={4}
          sm={6}
          className={'flowers_flower_col h-100 p-2 collection'}>
          <FlowerItem
            fvrm={this._remove_favourites} fvaddid={this._add_favourite} images={favourite.images !== undefined ? favourite.images : []} favourites={this.props.Favourites.favourites.map((f) => f.id)}
            {...favourite}/>
        </Col>
      );
    });
  }

  render(){
    return (
      <div
        id={'favourites_page'}
        className={'page animated fadeIn'}>
        <div
          className={'info bg-white shadow my-md-5'}>
          <div
            className={'py-1 py-md-0 animated navbar navbar-expand-md navbar-light bg-white'}>
            <Container>
              <Nav
                className={'mr-auto text-capitalize flex-row justify-content-md-start justify-content-center'}>
                <NavItem>
                  <NavLink
                    tag={Button}
                    className={'p-3 bg-transparent text-muted text-capitalize border-0 d-flex flex-row align-items-center h-100'}>
                    <Translate
                      divider={this.props.Favourites.divider}>
                      {'current items:>>> ' + this.props.Favourites.count}
                    </Translate>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Button}
                    className={'p-3 bg-transparent text-muted text-capitalize border-0 d-flex flex-row align-items-center h-100'}>
                    <Translate
                      divider={this.props.Favourites.divider}>
                      {'total price:>>> ' + this.state.totalPrice}
                    </Translate>$
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className={'ml-auto text-capitalize flex-row justify-content-md-start justify-content-center'} navbar>
                <NavItem>
                  <NavLink
                    tag={Button}
                    onClick={this._unset()}
                    className={'p-3 bg-transparent border-0 d-flex flex-row align-items-center h-100'}>
                    <FontAwesome
                      name={'trash'}
                      className={'text-muted mr-2'}/>
                    <div className={'text-muted text-capitalize'}>
                      <Translate>
                        clear favourites
                      </Translate>
                    </div>
                  </NavLink>
                </NavItem>
              </Nav>
            </Container>
          </div>
        </div>
        <div
          className={'flowers my-md-5'}>
          <Container>
            <Row className={'collections-flowers'}>
              {this.getItems()}
            </Row>
          </Container>
        </div>
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
      return <Element {...this.props}/>;
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
    },
    fvaddid: (id) => {
      dispatch(ADD_FAVOURITES_FAVOURITES_BY_ID(id));
    },
    fvrm: (id) => {
      dispatch(UNSET_FAVOURITES_FAVOURITE_ITEM(id));
    },
    clearFavourites: () => {
      dispatch(UNSET_FAVOURITES_FAVOURITES());
    }
  };
};

export default connect(states, actions)(Favourites);