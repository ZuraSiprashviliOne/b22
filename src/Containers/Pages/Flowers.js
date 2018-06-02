
import React from 'react';

import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import Translate from '../Translate';
import {Link} from 'react-router-dom';

import {SliderButton} from "../../Components/SliderButton";

import{
  Container,
  Row,
  Col
} from 'reactstrap';
import {INIT_FLOWERS, SET_FLOWERS_CURRENT_CATEGORY, SET_FLOWERS_FLOWERS} from "../../Actions/FlowersActions";
import {checkPromise} from "../../Helpers/Valid";

import Swiper from 'react-id-swiper';

class FlowerItemSwiper extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        renderPrevButton: () => <SliderButton to={'left'}/>,
        renderNextButton: () => <SliderButton to={'right'}/>
      }
    };

    this.getSlides = this.getSlides.bind(this);
  }

  getSlides(){
    return this.props.images.map((image) => {
      return (
        <div
          className={'image'}
          style={{backgroundImage: `url(${image})`}}>
          <img
            src={image}
            alt={'image'}
            className={'w-100'}
            style={{visibility: 'hidden'}}/>
        </div>
      );
    })
  }

  render(){
    if(this.props.images.length === 0){
      return (
        <div
          className={'image'}
          style={{backgroundImage: `url(${this.props.image})`}}>
          <img
            src={this.props.image}
            alt={'image'}
            className={'w-100'}
            style={{visibility: 'hidden'}}/>
        </div>
      );
    }else{
      return (
        <Swiper
          {...this.state.params}>
          <div
            className={'image'}
            style={{backgroundImage: `url(${this.props.image})`}}>
            <img
              src={this.props.image}
              alt={'image'}
              className={'w-100'}
              style={{visibility: 'hidden'}}/>
          </div>
          {this.getSlides()}
        </Swiper>
      )
    }
  }
}

class FlowerItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={'h-100 collection shadow'}>
        <FlowerItemSwiper {...this.props} />
        <div className={'bg-white'}>
          <Container>
            <Row className={'align-items-center'}>
              <Col
                xs={4}
                className={'pr-0 price'}>
                <div className={'bg-grass py-2 lie'}></div>
                <div className={'bg-grass text-center text-white font-weight-bold pt-3 pb-4'}>
                  <i>
                    ${this.props.price}
                  </i>
                </div>
              </Col>
              <Col
                xs={8}
                className={'pl-1 h-100 text-capitalize text-muted'}>
                <h5 className={'m-0 py-3 font-weight-light'}>
                  <Link
                    className={'text-muted d-block'}
                    to={'/flowers/items/item_' + this.props.id}>
                    <Translate>
                      {this.props.title}
                    </Translate>
                  </Link>
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

class Element extends React.Component{
  constructor(props) {
    super(props);

    this.getFlowers = this.getFlowers.bind(this);
  }

  getFlowers(){
    return this.props.Flowers.flowers.map((flower) => {
      return (
        <Col
          key={flower.id}
          lg={4}
          className={'flowers_flower_col h-100 p-2 collection'}>
          <FlowerItem {...flower} />
        </Col>
      );
    });
  }

  render() {
    return (
      <main
        id={'flower_page'}
        className={'animated fadeIn page bg-light'}>
        <div
          className={'py-md-5 bg-light'}>
          <Container>
            <Row>
              <Col
                md={3}
                className={'flowers_sidebar'}>
                {this.props.Flowers.currentCategory}
              </Col>
              <Col
                className={'flowers'}
                md={9}>
                <Container>
                  <Row className={'collections-flowers'}>
                    {this.getFlowers()}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    );
  }
}

class Flowers extends React.Component{
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
    props.setPage(getPageSlag(this.props.match.path));
    if(checkPromise(this.props.Flowers) === false){
      props.initFlowers();
    }
    if(props.Flowers.currentCategory !== this.props.match.params.flower_category){
      props.setFlowers(this.props.match.params.flower_category);
      props.setFlowersCurrentCategory(this.props.match.params.flower_category);
    }
  }

  render(){
    if(checkPromise(this.props.Flowers)){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Flowers: state.FlowersReducer
  };
};
const actions = (dispatch) => {
  return {
    setPage: (slag) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
    },
    initFlowers: () => {
      dispatch(INIT_FLOWERS());
    },
    setFlowers: (category) => {
      dispatch(SET_FLOWERS_FLOWERS(category));
    },
    setFlowersCurrentCategory: (category) => {
      dispatch(SET_FLOWERS_CURRENT_CATEGORY(category));
    }
  };
};

export default connect(states, actions)(Flowers);
