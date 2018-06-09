
import React from 'react';

import {connect} from 'react-redux';
import {checkPromise} from "../../Helpers/Valid";
import {Loading} from "../../Components/Loading";
import {
  INIT_FLOWER,
  SET_FLOWER_COUNT,
  SET_FLOWER_FLOWER,
  SET_FLOWER_SIZE,
  UNSET_FLOWER_FLOWER
} from "../../Actions/FlowerActions";
import {getPageSlag} from "../../Helpers/Routing";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";

import {Link} from 'react-router-dom';

import Translate from '../Translate';

import FontAwesome from 'react-fontawesome';

import Swiper from 'react-id-swiper';

import {CollectionItemImage, CollectionsComponent} from '../../Components/CollectionsComponent';

import {SliderButton} from "../../Components/SliderButton";

import {reactLocalStorage as Storage} from 'reactjs-localstorage';

import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {SET_ORDER} from "../../Actions/OrderActions";
import {ADD_FAVOURITES_FAVOURITES_BY_ID, UNSET_FAVOURITES_FAVOURITE_ITEM} from "../../Actions/FavouritesActions";
import {ADD_CARTS_CART_BY_ID, UNSET_CARTS_CART_ITEM} from "../../Actions/CartActions";

class FlowerSwiper extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gallerySwiper: null,
      thumbnailSwiper: null
    };


    this.gallerySwiperParams = {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      renderPrevButton: () => <SliderButton to={'left'}/>,
      renderNextButton: () => <SliderButton to={'right'}/>

    };

    this.thumbnailSwiperParams = {
      paceBetween: 0,
      centeredSlides: true,
      slidesPerView: 3,
      touchRatio: 0.2,
      clickable: true,
      slideToClickedSlide: true,
    };


    this.galleryRef = this.galleryRef.bind(this);
    this.thumbRef = this.thumbRef.bind(this);

    this.getSlides = this.getSlides.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    //
    // if(nextProps.image !== this.props.image){
    //   this.forceUpdate();
    //   alert('x');
    // }
    if (nextState.gallerySwiper && nextState.thumbnailSwiper) {
      const { gallerySwiper, thumbnailSwiper } = nextState;

      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }

  galleryRef(ref) {
    if (ref) this.setState({ gallerySwiper: ref.swiper })
  }

  thumbRef(ref) {
    if (ref) this.setState({ thumbnailSwiper: ref.swiper })
  }

  getSlides(slides){
    return slides.map((image, index) => {
      return (
        <div key={index} className={'h-100'}>
          <CollectionItemImage
            image={image}/>
        </div>
      )
    })
  }

  getContent(slides){
    return [
      <Swiper key={'top'} {...this.gallerySwiperParams} ref={this.galleryRef}>
        {this.getSlides(slides)}
      </Swiper>,
      <Swiper key={'bot'} {...this.thumbnailSwiperParams} ref={this.thumbRef}>
        {this.getSlides(slides)}
      </Swiper>
    ];
  }

  render(){
    return (
      <div>
        {this.getContent(this.props.images.length > 0 ? [this.props.image, ...this.props.images] : [this.props.image])}
      </div>
    );
  }
}


class Radios extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      selected: null
    };

    this._handleSelect = this._handleSelect.bind(this);
  }

  componentDidMount(){
    if(Storage.get('sizes') !== undefined){
      let jsonData = JSON.parse(Storage.get('sizes'));
      let thatData = jsonData.find((data) => data.id === this.props.id);
      if(thatData){
        this.setState({
          selected: thatData.size
        });
        this.props.setsize(thatData.size, this.props.id);
      }else{
        this.setState({
          selected: 0
        });
        this.props.setsize(0, this.props.id);
      }
    }else{
      Storage.set('sizes', JSON.stringify([{id: this.props.id, size: 0}]));
      this.setState({
        selected: 0
      });
      this.props.setsize(0, this.props.id);
    }
  }

  _handleSelect(id){
    this.setState({
      selected: id
    });
    this.props.setsize(id, this.props.id);

    if(Storage.get('sizes') !== undefined){
      let storageData = JSON.parse(Storage.get('sizes'));
      let resStorage = null;
      if(storageData.find((data) => data.id == this.props.id)){
        resStorage = storageData.map((data) => {
          if (data.id === this.props.id) {
            return {
              id: this.props.id,
              size: id
            };
          } else {
            return data;
          }
        });
      }else{
        resStorage = [...storageData, {id: this.props.id, size: id}];
      }
      Storage.set('sizes', JSON.stringify(resStorage));
    }else{
      Storage.set('sizes', JSON.stringify([{id: this.props.id, size: id}]));
    }
  }

  render(){
    if(this.state.selected !== null){
      return (
        <div
          className={'py-3 text-capitalize'}>
          <FormGroup check>
            <Label check>
              <Input checked={this.state.selected === 0} onChange={() => {this._handleSelect(0)}} name={`size_${this.props.id}`} type={'radio'} />
              <span className="text-dark">
                <Translate>
                  large
                </Translate>
              </span>
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input checked={this.state.selected === 1} onChange={() => {this._handleSelect(1)}} name={`size_${this.props.id}`} type={'radio'} />
              <span className="text-dark">
                <Translate>
                  medium
                </Translate>
              </span>
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input checked={this.state.selected === 2} onChange={() => {this._handleSelect(2)}} name={`size_${this.props.id}`} type={'radio'} />
              <span className="text-dark">
                <Translate>
                  small
                </Translate>
              </span>
            </Label>
          </FormGroup>
        </div>
      );
    }else{
      return null
    }

  }
}

class Counts extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      count: null
    };

    this._handleMin = this._handleMin.bind(this);
    this._handlePlu = this._handlePlu.bind(this);
  }

  componentDidMount(){
    if(Storage.get('count') !== undefined){
      let storageData = JSON.parse(Storage.get('count'));
      let resStorage = null;
      let thatData = storageData.find((data) => data.id == this.props.id);
      if(thatData){
        this.setState({
          count: thatData.count
        });
        this.props.setcount(thatData.count, this.props.id);
        resStorage = storageData.map((data) => {
          if (data.id === this.props.id) {
            return {
              id: this.props.id,
              count: data.count
            };
          } else {
            return data;
          }
        });
      }else{
        this.setState({
          count: 1
        });
        this.props.setcount(1, this.props.id);
        resStorage = [...storageData, {id: this.props.id, count: 1}];
      }
      Storage.set('count', JSON.stringify(resStorage));
    }else{
      this.setState({
        count: 1
      });
      this.props.setcount(1, this.props.id);
      Storage.set('count', JSON.stringify([{id: this.props.id, count: 1}]));
    }
  }

  _handleMin(){
    if(parseInt(this.count.value) > 1){
      if(Storage.get('count') !== undefined){
        let storageData = JSON.parse(Storage.get('count'));
        let resStorage = null;
        let thatData = storageData.find((data) => data.id == this.props.id);
        if(thatData){
          this.setState({
            count: thatData.count - 1
          });
          this.props.setcount(thatData.count - 1, this.props.id);
          resStorage = storageData.map((data) => {
            if (data.id === this.props.id) {
              return {
                id: this.props.id,
                count: data.count - 1
              };
            } else {
              return data;
            }
          });
        }else{
          this.setState({
            count: 1
          });
          this.props.setcount(1, this.props.id);
          resStorage = [...storageData, {id: this.props.id, count: 1}];
        }
        Storage.set('count', JSON.stringify(resStorage));
      }else{
        this.setState({
          count: 1
        });
        this.props.setcount(1, this.props.id);
        Storage.set('count', JSON.stringify([{id: this.props.id, count: 1}]));
      }

    }
  }

  _handlePlu(){
    if(Storage.get('count') !== undefined){
      let storageData = JSON.parse(Storage.get('count'));
      let resStorage = null;
      let thatData = storageData.find((data) => data.id == this.props.id);
      if(thatData){
        this.setState({
          count: thatData.count + 1
        });
        this.props.setcount(thatData.count + 1, this.props.id);
        resStorage = storageData.map((data) => {
          if (data.id === this.props.id) {
            return {
              id: this.props.id,
              count: data.count + 1
            };
          } else {
            return data;
          }
        });
      }else{
        this.setState({
          count: 1
        });
        this.props.setcount(1, this.props.id);
        resStorage = [...storageData, {id: this.props.id, count: 1}];
      }
      Storage.set('count', JSON.stringify(resStorage));
    }else{
      this.setState({
        count: 1
      });
      this.props.setcount(1, this.props.id);
      Storage.set('count', JSON.stringify([{id: this.props.id, count: 1}]));
    }
  }

  render(){
    if(this.state.count !== null){
      return (
        <div>
          <div className={'py-1 text-center'}>
            <h3
              className={'m-0  font-weight-light text-capitalize'}>
              <Translate>
                count
              </Translate>
            </h3>
          </div>
          <div className={'py-1'}>
            <div className="actioners">
              <button
                type={'button'}
                onClick={this._handleMin}
                ref={(element) => {this.actMin = element}}
                className={'btn text-dark shadow bg-white'}>
                <FontAwesome
                  name={'minus'}/>
              </button>
              <input
                type={'text'}
                readOnly={true}
                ref={(element) => {this.count = element}}
                className={'text-center form-control w-100 border shadow bg-white'}
                value={this.state.count}/>
              <button
                type={'button'}
                onClick={this._handlePlu}
                ref={(element) => {this.actPlu = element}}
                className={'btn text-dark shadow bg-white'}>
                <FontAwesome
                  name={'plus'}/>
              </button>
            </div>
          </div>
        </div>
      );
    }else{
      return null;
    }
  }
}

export class FlowerInfo extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      carted: this.props.carts.includes(this.props.id)
    };

    this._handle_cart = this._handle_cart.bind(this);
  }

  _handle_cart(){
    this.setState({
      carted: this.state.carted === true ? this.props.rmcart(this.props.id) : this.props.addcart(this.props.id)
    });
  }

  render(){
    return [
      <div
        key={'title'}
        className={'border-bottom py-3 px-1 px-md-2'}>
        <h1
          className={'text-capitalize font-weight-light m-9'}>
          <Translate>
            {this.props.title}
          </Translate>
        </h1>
      </div>,
      <div
        key={'price'}
        className={'py-3 px-1 px-md-2 border-bottom'}>
        <Container>
          <Row
            className={'align-items-center'}>
            <Col
              className={'p-0'}
              xs={4}>
              <h2 className={'text-capitalize m-0 font-weight-light'}>
                <Translate>
                  price
                </Translate>
              </h2>
            </Col>
            <Col
              className={'p-0'}
              xs={8}>
              <h3
                className={'font-weight-light m-0 text-capitalize'}>
                ${this.props.price}
                {this.props.old_price !== this.props.price ? (
                  <sub
                    style={{textDecoration: 'line-through'}}
                    className={'text-grass ml-1'}>${this.props.old_price}</sub>
                ) : null}
              </h3>
            </Col>
          </Row>
        </Container>
      </div>,
      <div
        key={'description'}
        className={'py-3 px-1 px-md-2 border-bottom'}>
        <div
          className={'py-3'}>
          <h3
            className={'text-capitalize m-0 font-weight-light'}>
            <Translate>
              description
            </Translate>
          </h3>
        </div>
        <div
          className={'small text-muted'}>
          <Translate>
            {this.props.description}
          </Translate>
        </div>
        <Container>
          <Row
            className={'align-items-center'}>
            <Col
              className={'p-1'}
              xs={6}>
              <Radios
                setsize={this.props.setsize}
                id={this.props.id}/>
            </Col>
            <Col
              className={'p-1'}
              xs={6}>
              {this.props.hasCount ? (
                <Counts
                  setcount={this.props.setcount}
                  id={this.props.id} />
              ): null}
            </Col>
          </Row>
        </Container>
      </div>,
      this.props.exporter ? null :
        <div key={'buttons'} className={'py-3 px-1 px-md-2'}>
          <Container>
            <Row
              className={'align-items-center'}>
              <Col
                className={'p-1'}
                sm={6}>
                <Button
                  tag={Link}
                  to={'/cart'}
                  onClick={this._handle_cart}
                  className={'btn text-light btn-_grass btn-block rounded-no text-capitalize font-weight-light'}>
                  <div
                    className={'d-flex flex-row align-items-center between'}>
                    <div
                      className={'align-self-start'}>
                      <FontAwesome
                        name={'shopping-cart'}/>
                    </div>
                    <div
                      style={{flex: 1}}
                      className={'text-center align-self-center'}>
                      <Translate>
                        add to cart
                      </Translate>
                    </div>
                  </div>
                </Button>
              </Col>
              <Col
                className={'p-1'}
                sm={6}>
                <Link
                  to={'/order'}
                  onClick={this.props.order}
                  className={'btn text-light btn-__grass btn-block rounded-no text-capitalize font-weight-light'}>
                  <div
                    className={'d-flex flex-row align-items-center between'}>
                    <div
                      className={'align-self-start'}>
                      <FontAwesome
                        name={'star-o'}/>
                    </div>
                    <div
                      style={{flex: 1}}
                      className={'text-center align-self-center'}>
                      <Translate>
                        order
                      </Translate>
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
    ];
  }
}

class FlowerWarr extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container className={'py-md-3'}>
        <Row>
          <Col
            xs={12}>
            <h1
              className={'font-weight-light text-capitalize m-0'}>
              <Translate>
                waranty
              </Translate>
            </h1>
            <div
              className={'small text-muted p-md-2 p-1'}>
              <Translate>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium architecto cum dicta eaque ex
                hic iusto laborum magnam magni maxime obcaecati quidem sed sint, temporibus tenetur totam unde? Hic.
              </Translate>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

class Element extends React.Component{
  constructor(props){
    super(props);
    this._add_favourite = this._add_favourite.bind(this);
    this._remove_favourites = this._remove_favourites.bind(this);
    this._add_cart = this._add_cart.bind(this);
    this._rm_cart = this._rm_cart.bind(this);
  }

  _add_cart(id){
    if(this.props.Cart.carts.every((f) => f.id != id)){
      this.props.addcartid(id);
      Storage.set('carts', Storage.get('carts') === undefined ? JSON.stringify([id]) : JSON.stringify([...JSON.parse(Storage.get('carts')), id]));
      return true;
    }else{
      return false;
    }
  }

  _rm_cart(id){
    if(this.props.Cart.carts.some((f) => f.id == id)){
      this.props.rmcart(id);
      Storage.set('carts', JSON.stringify(JSON.parse(Storage.get('carts')).filter((f) => f != id)));
      return false;
    }else{
      return true;
    }
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

  render(){
    return (
      <div
        id={'flower_page'}
        className={'page animated fadeIn'}>
        <Container className={'py-md-3 border-bottom'}>
          <Row className={'align-items-stretch'}>
            <Col
              lg={6}
              md={7}
              className={'images p-md-1 p-0'}>
              <FlowerSwiper image={this.props.Flower.flower.image} images={this.props.Flower.flower.images}/>
            </Col>
            <Col
              lg={6}
              md={5}
              className={'data h-100 d-flex flex-column justify-content-around'}>
              <FlowerInfo
                setsize={this.props.setFlowerSize}
                setcount={this.props.setFlowerCount}
                hasCount={this.props.Flower.flower.hasCount}
                count={this.props.Flower.flower.count}
                id={this.props.Flower.flower.id}
                carts={this.props.Cart.carts}
                addcart={this._add_cart}
                rmcart={this._rm_cart}
                order={this.props.order}
                title={this.props.Flower.flower.title}
                price={this.props.Flower.flower.price}
                old_price={this.props.Flower.flower.old_price}
                description={this.props.Flower.flower.description}/>
            </Col>
          </Row>
        </Container>

        <FlowerWarr />

        <div className={'collections-container'}>
          <CollectionsComponent
            carts={this.props.Cart.carts}
            addcart={this._add_cart}
            rmcart={this._rm_cart}
            favourites={this.props.Favourites.favourites.map((f) => f.id)} fvrm={this._remove_favourites} fvaddid={this._add_favourite}  {...this.props.Flower.flower.collection}/>
        </div>
      </div>
    );
  }
}

class Flower extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
    this._order = this._order.bind(this);
  }

  _order(){
    this.props.setOrder(this.props.Flower.flower);
  }

  componentDidMount(){
    this.init(this.props);
  }

  componentDidUpdate(props){
    this.init(props);
  }

  componentWillUnmount(){
    this.props.unset();
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
    }else{
      if (this.props.Flower.flower.id != parseInt(this.props.match.params.flower_id.substring(this.props.match.params.flower_id.lastIndexOf('_') + 1))) {
        this.props.unset();
        this.props.setFlower(parseInt(this.props.match.params.flower_id.substring(this.props.match.params.flower_id.lastIndexOf('_') + 1)));
      }
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(checkPromise(this.props.Flower)){
      return <Element
        order={this._order}
        {...this.props} />;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Flower: state.FlowerReducer,
    Navigation: state.NavigationReducer,
    Order: state.OrderReducer,
    Favourites: state.FavouritesReducer,
    Cart: state.CartReducer
  };
};
const actions = (dispatch) => {
  return {
    setPage: (slag) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
    },
    unset: () => {
      dispatch(UNSET_FLOWER_FLOWER());
    },
    setPath: (path) => {
      dispatch(SET_NAVIGATION_PATH(path));
    },
    initFlower: ()=> {
      dispatch(INIT_FLOWER());
    },
    setFlower: (id) => {
      dispatch(SET_FLOWER_FLOWER(id));
    },
    setOrder: (order) => {
      dispatch(SET_ORDER(order));
    },
    fvaddid: (id) => {
      dispatch(ADD_FAVOURITES_FAVOURITES_BY_ID(id));
    },
    fvrm: (id) => {
      dispatch(UNSET_FAVOURITES_FAVOURITE_ITEM(id));
    },
    addcartid: (id) => {
      dispatch(ADD_CARTS_CART_BY_ID(id));
    },
    rmcart: (id) => {
      dispatch(UNSET_CARTS_CART_ITEM(id));
    },
    setFlowerSize: (size) => {
      dispatch(SET_FLOWER_SIZE(size));
    },
    setFlowerCount: (count) => {
      dispatch(SET_FLOWER_COUNT(count));
    }
  };
};


export default connect(states, actions)(Flower);