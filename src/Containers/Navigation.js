
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
  Badge,
  Button
} from 'reactstrap';

import Translate from './Translate';

class NavigationTop extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchIconClicked: false
    };

    this._searchClick = this._searchClick.bind(this);
  }

  _searchClick(){
    if(this.searchInput !== undefined){
      this.setState({searchIconClicked: !this.state.searchIconClicked});
      if(this.searchInput.classList.contains('fadeInRight')){
        this.searchInput.classList.remove('fadeOutRight');
      }else{
        this.searchInput.classList.add('fadeInRight');
      }
    }
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
              <li className={`search flex-column justify-content-center align-items-center px-1 ${this.state.searchIconClicked === true ? 'd-flex': 'd-none'}`}>
                <input
                  ref={(element) => {this.searchInput = element}}
                  type="text"
                  className="w-100 animated border-_grass rounded-no bg-transparent my-1 form-control"
                  placeholder={'Search...'}/>
              </li>
              <li>
                <Button
                  onClick={this._searchClick}
                  ref={(element) => {this.searchIcon = element}}
                  className="btn bg-transparent border-0 px-3 py-3 text-white">
                  <FontAwesome
                    name={'search'}/>
                </Button>
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
      <NavItem
        className={`${(this.props.current) === this.props.slag ? 'active' : ''}`}>
        <NavLink
          onClick={this.props.close}
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
          onClick={this.props.close}
          key={item.slag}
          tag={Link}
          to={item.slag}>
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
        className={`${('/' + this.props.current) === this.props.slag ? 'active' : ''}`}
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

  componentDidMount(){
    this.props.close();
  }

  getNavItems(){
    return this.props.list.map((item, index) => {
      if(item.sub){
        return <NavigationNavNavItemWithDropdown close={this.props.close} current={this.props.currentPage} key={index} {...item}/>;
      }else{
        return <NavigationNavNavItem close={this.props.close} current={this.props.currentPage} {...item} key={index}/>;
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

    this.getLanguageItems = this.getLanguageItems.bind(this);
    this.setLang = this.setLang.bind(this);
  }

  setLang(lang){
    this.props.unsetlocale();
    this.props.setlocale(lang);
  }

  getLanguageItems(){
    return this.props.languages.map((lang) => {
      return (
        <DropdownItem
          className={`text-capitalize ${this.props.currentlang === lang ? 'bg-grass text-white': ''}`}
          onClick={() => {this.setLang(lang)}}
          key={lang}>
          <Translate>
            {lang}
          </Translate>
        </DropdownItem>
      );
    });
  }

  render(){
    return (
      <Nav className={'ml-auto text-capitalize flex-row justify-content-md-start justify-content-center'} navbar>
        <NavItem>
          <NavLink
            tag={Link}
            to={'/favourites'}
            className={'p-3 d-flex flex-row align-items-center h-100'}>
            <FontAwesome
              name={'star-o'}
              className={'text-muted mr-2'}/>
            <Badge
              className={'text-white rounded-no'}
              color={'secondary'}>{this.props.fvcount}</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            to={'/cart'}
            className={'p-3 d-flex flex-row align-items-center h-100'}>
            <FontAwesome
              name={'shopping-cart'}
              className={'text-muted mr-2'}/>
            <Badge
              className={'text-white rounded-no'}
              color={'grass'}>
              {this.props.cartcount}
            </Badge>
          </NavLink>
        </NavItem>
        <UncontrolledDropdown
          nav
          inNavbar>
          <DropdownToggle
            className={'p-3'}
            nav
            caret>
            <Translate>
              {this.props.currentlang}
            </Translate>
          </DropdownToggle>
          <DropdownMenu
            left={'true'}
            className={'rounded-no '}>
            {this.getLanguageItems()}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  }
}

class NavigationNavbar extends React.Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this._toggleNavbar = this._toggleNavbar.bind(this);
    this.state = {
      collapseIsOpen: false
    };
    this.close = this.close.bind(this);
  }

  close(){
    this.setState({collapseIsOpen: false});
  }

  _toggleNavbar() {
    this.setState({
      collapseIsOpen: !this.state.collapseIsOpen
    });
  }

  componentWillReceiveProps(props){
    if(props.fixed){
      setTimeout(() => {
        this.navbar.classList.add('scrolled');
      }, 500);
    }else{
      setTimeout(() => {
        this.navbar.classList.remove('scrolled');
      }, 500);
    }
  }

  toggle() {
    this.setState({
      collapseIsOpen: !this.state.collapseIsOpen
    });
  }

  render(){
    return (
      <div
        className={'py-1 py-md-0 animated navbar navbar-expand-md navbar-light bg-white'}
        ref={(element) => {this.navbar = element}}>
        <Container>
          <NavbarBrand
            tag={Link}
            className={'text-capitalize unscrolled font-weight-bold d-none d-sm-none d-md-none d-lg-none d-xl-none'}
            to={'/'}>
            <Translate>
              ${this.props.title}
            </Translate>
          </NavbarBrand>
          <NavbarToggler
            className={'rounded-no ml-auto'}
            onClick={this._toggleNavbar}/>
          <Collapse isOpen={this.state.collapseIsOpen} navbar>
            <NavigationNav close={this.close} currentPage={this.props.currentPage} list={this.props.list}/>
            <UserFavourites
              unsetlocale={this.props.unsetlocale}
              currentlang={this.props.currentlang}
              setlocale={this.props.setlocale}
              languages={this.props.languages}
              fvcount={this.props.fvcount}
              cartcount={this.props.cartcount}/>
          </Collapse>
        </Container>
      </div>

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
          unsetlocale={this.props.unsetLocale}
          setlocale={this.props.setLocale}
          currentlang={this.props.currentlang}
          languages={this.props.languages}
          fixed={this.props.fixed}
          fvcount={this.props.Favourites.count}
          cartcount={this.props.Cart.count}
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
    Navigation: state.NavigationReducer,
    Favourites: state.FavouritesReducer,
    Cart: state.CartReducer
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
