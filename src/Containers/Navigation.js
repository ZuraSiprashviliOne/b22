
import React from 'react';
import {checkPromise} from "../Helpers/Valid";
import {Loading} from "../Components/Loading";

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {SET_NAVIGATION} from "../Actions/NavigationActions";

import FontAwesome from 'react-fontawesome';

import {
  Col,
  Row,
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap';

import Translate from './Translate';


class NavigationTop extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container>
        <Row
          className={'top'}>
          <Col
            className={'d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex logo-col text-white flex-row align-items-center justify-content-start'}
            sm={6}>
            <a
              href={'/'}
              className={'py-1 text-white'}>
              <h1
                className={'m-0 font-weight-bold text-capitalize'}>
                b22
              </h1>
            </a>
          </Col>
          <Col
            xs={3}
            className="d-flex flex-row align-items-center justify-content-start d-sm-none d-md-none d-lg-none d-xl-none">
            <a href="/" className="py-1 text-white">
              <h1 className="m-0 font-weight-bold text-capitalize">
                <FontAwesome
                  name={'gg-circle'}/>
              </h1>
            </a>
          </Col>
          <Col
            sm={6}
            xs={9}
            className="top-nav text-white d-flex flex-row align-items-center justify-content-end">
            <ul className="list-unstyled  m-0 d-flex flex-row align-items-center">
              <li>
                <a href="#" className="px-3 py-3 text-white">
                  <FontAwesome
                    name={'search'}/>
                </a>
              </li>
              {/*<li>*/}
                {/*<a href="#" className="px-3 py-3 text-white font-weight-light">Register Or Login</a>*/}
              {/*</li>*/}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

class NavigationNavNavItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <NavItem>
        <NavLink
          className={'p-3'}
          tag={Link}
          to={this.props.slag}>
          <Translate>
            {this.props.title}
          </Translate>
        </NavLink>
      </NavItem>
    )
  }
}
class NavigationNavNavItemWithDropdown extends React.Component{
  constructor(props){
    super(props);

    this.getDropdownItems = this.getDropdownItems.bind(this);
  }

  getDropdownItems(){
    return this.props.sub.map((item) => {
      return (
        <DropdownItem
          key={item.slag}
          tag={Link}
          to={this.props.slag + '/' + item.slag}>
          <Translate>
            {item.title}
          </Translate>
        </DropdownItem>
      );
    })
  }

  render(){
    return (
      <UncontrolledDropdown
        nav
        inNavbar>
        <DropdownToggle
          className={'p-3'}
          nav
          caret>
          <Translate>
            {this.props.title}
          </Translate>
        </DropdownToggle>
        <DropdownMenu
          left={'true'}
          className={'rounded-no'}>
          {this.getDropdownItems()}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

class NavigationNav extends React.Component{
  constructor(props){
    super(props);

    this.getNavItems = this.getNavItems.bind(this);
  }

  getNavItems(){
    return this.props.list.map((item, index) => {
      if(item.sub){
        return <NavigationNavNavItemWithDropdown key={index} {...item}/>;
      }else{
        return <NavigationNavNavItem {...item} key={index}/>;
      }
    });
  }

  render(){
    return (
      <Nav className="mr-auto text-capitalize" navbar>
        {this.getNavItems()}
      </Nav>
    );
  }
}

class UserFavourites extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Nav className={'ml-auto text-capitalize flex-row justify-content-md-start justify-content-center'} navbar>
        <NavItem>
          <NavLink
            className={'p-3 d-flex flex-row align-items-center h-100'}>
            <FontAwesome
              name={'star-o'}
              className={'text-muted mr-2'}/>
            <Badge
              className={'text-white rounded-no'}
              color={'secondary'}>30</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={'p-3 d-flex flex-row align-items-center h-100'}>
            <FontAwesome
              name={'shopping-cart'}
              className={'text-muted mr-2'}/>
            <Badge
              className={'text-white rounded-no'}
              color={'grass'}>5</Badge>
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

class NavigationNavbar extends React.Component{
  constructor(props){
    super(props);

    this._toggleNavbar = this._toggleNavbar.bind(this);
    this.state = {
      collapseIsOpen: false
    };
  }

  _toggleNavbar() {
    this.setState({
      collapseIsOpen: !this.state.collapseIsOpen
    });
  }

  render(){
    return (
      <Navbar
        color={'white'}
        light
        expand={'md'}
        className={'py-1 py-md-0'}>
        <Container>
          <NavbarBrand
            className={'text-capitalize font-weight-bold d-none d-sm-none d-md-none d-lg-none d-xl-none'}
            href="/">
            <Translate>
              ${this.props.title}
            </Translate>
          </NavbarBrand>
          <NavbarToggler
            className={'rounded-no ml-auto'}
            onClick={this._toggleNavbar}/>
          <Collapse isOpen={this.state.collapseIsOpen} navbar>
            <NavigationNav list={this.props.list}/>
            <UserFavourites/>
          </Collapse>
        </Container>
      </Navbar>

    );
  }
}

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <header
        className={'bg-grass'}
        id={'header'}>
        <NavigationTop
          title={this.props.title}/>

        <NavigationNavbar
          {...this.props.Navigation}/>
      </header>
    );
  }
}

class Navigation extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){
    if(checkPromise(this.props.Navigation) === false){
      props.setNavigation();
    }
  }

  render(){
    if(checkPromise(this.props.Navigation)){
      return <Element {...this.props}/>;
    }else{
      return <Loading />;
    }
  }
}

const states = (state) => {
  return {
    Navigation: state.NavigationReducer
  };
};

const actions = (dispatch) => {
  return {
    setNavigation: () => {
      dispatch(SET_NAVIGATION());
    }
  };
};

export default connect(states, actions)(Navigation);
