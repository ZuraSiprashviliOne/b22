
import React from 'react';

import {connect} from 'react-redux';
import {checkPromise} from "../../Helpers/Valid";
import {Loading} from "../../Components/Loading";
import {INIT_FLOWER, SET_FLOWER_FLOWER, UNSET_FLOWER_FLOWER} from "../../Actions/FlowerActions";
import {getPageSlag} from "../../Helpers/Routing";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";

import Translate from '../Translate';

import FontAwesome from 'react-fontawesome';

import Swiper from 'react-id-swiper';

import {CollectionItemImage, CollectionsComponent} from '../../Components/CollectionsComponent';

import {SliderButton} from "../../Components/SliderButton";

import {
  Container,
  Row,
  Col
} from 'reactstrap';

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

    // if(nextProps.image !== this.props.image){
    //   this.forceUpdate();
    //   console.log('asfa');
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

  getContent(){
    return [
      <Swiper key={'top'} {...this.gallerySwiperParams} ref={this.galleryRef}>
        {this.getSlides(this.props.images.length > 0 ? [this.props.image, ...this.props.images] : [this.props.image])}
      </Swiper>,
      <Swiper key={'bot'} {...this.thumbnailSwiperParams} ref={this.thumbRef}>
        {this.getSlides(this.props.images.length > 0 ? [this.props.image, ...this.props.images] : [this.props.image])}
      </Swiper>
    ];
  }

  render(){
    return (
      <div>
        {this.getContent()}
      </div>
    );
  }
}

class FlowerInfo extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Col
        md={6}
        className={'data h-100 d-flex flex-column justify-content-around'}>
        <div
          className={'border-bottom py-3 px-1 px-md-2'}>
          <h1
            className={'text-capitalize font-weight-light m-9'}>
            <Translate>
              {this.props.title}
            </Translate>
          </h1>
        </div>
        <div
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
        </div>
        <div
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
        </div>
        <div className={'py-3 px-1 px-md-2'}>
          <Container>
            <Row
              className={'align-items-center'}>
              <Col
                className={'p-1'}
                sm={6}>
                <button
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
                        add to card
                      </Translate>
                    </div>
                  </div>
                </button>
              </Col>
              <Col
                className={'p-1'}
                sm={6}>
                <button
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
                        add to favourites
                      </Translate>
                    </div>
                  </div>
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </Col>
    );
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
  }

  render(){
    return (
      <div
        id={'flower_page'}
        className={'page animated fadeIn'}>
        <Container className={'py-md-3 border-bottom'}>
          <Row className={'align-items-stretch'}>
            <Col
              md={6}
              className={'images p-md-1 p-0'}>
              {/*<FlowerSwiper image={this.props.Flower.flower.image} images={this.props.Flower.flower.images}/>*/}
            </Col>
            <FlowerInfo
              title={this.props.Flower.flower.title}
              price={this.props.Flower.flower.price}
              old_price={this.props.Flower.flower.old_price}
              description={this.props.Flower.flower.description}/>
          </Row>
        </Container>

        <FlowerWarr />

        <div className={'collections-container'}>
          <CollectionsComponent {...this.props.Flower.flower.collection}/>
        </div>
      </div>
    );
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
      if(this.props.Flower.flower.id != parseInt(this.props.match.params.flower_id.substring(this.props.match.params.flower_id.lastIndexOf('_') + 1))){
        this.props.setFlower(parseInt(this.props.match.params.flower_id.substring(this.props.match.params.flower_id.lastIndexOf('_') + 1)));
      }
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(checkPromise(this.props.Flower)){
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
    }
  };
};


export default connect(states, actions)(Flower);