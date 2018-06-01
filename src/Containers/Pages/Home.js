
import React from 'react';

import {connect} from 'react-redux';

import {SET_NAVIGATION_CURRENT_PAGE} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import {Loading} from "../../Components/Loading";

import Swiper from 'react-id-swiper';

import SliderComponent from '../../Components/SliderComponent';

import {
  Container,
  Row,
  Col
} from 'reactstrap';
import {INIT_SLIDER, SET_SLIDER_SLIDES} from "../../Actions/SliderActions";
import {checkPromise} from "../../Helpers/Valid";


class Sales extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      params: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 1,
          }
        }
      }
    };
  }

  render(){
    return (
      <div className={'bg-grass text-light offers py-md-5'}>
        <Container>
          <Row>
            <Col
              xs={12}
              className="p-1">
              <Swiper {...this.state.params}>
                <div className={'h-100 item text-center'}
                     style={{
                       backgroundImage: 'url(http://botanica22.ge/admin/images/2604658.png)'
                     }}>
                  <div className={'cover p-md-5 px-3 py-5'}>
                    <div className={'text my-5 text-uppercase text-white"'}>
                      <h1 className={'m-0 font-weight-light'}>
                        on sale
                      </h1>
                    </div>
                  </div>
                </div>
                <div className={'h-100 item text-center'}
                     style={{
                       backgroundImage: 'url(http://botanica22.ge/admin/images/2604658.png)'
                     }}>
                  <div className={'cover p-md-5 px-3 py-5'}>
                    <div className={'text my-5 text-uppercase text-white"'}>
                      <h1 className={'m-0 font-weight-light'}>
                        on sale
                      </h1>
                    </div>
                  </div>
                </div>
                <div className={'h-100 item text-center'}
                     style={{
                       backgroundImage: 'url(http://botanica22.ge/admin/images/2604658.png)'
                     }}>
                  <div className={'cover p-md-5 px-3 py-5'}>
                    <div className={'text my-5 text-uppercase text-white"'}>
                      <h1 className={'m-0 font-weight-light'}>
                        on sale
                      </h1>
                    </div>
                  </div>
                </div>
                <div className={'h-100 item text-center'}
                     style={{
                       backgroundImage: 'url(http://botanica22.ge/admin/images/2604658.png)'
                     }}>
                  <div className={'cover p-md-5 px-3 py-5'}>
                    <div className={'text my-5 text-uppercase text-white"'}>
                      <h1 className={'m-0 font-weight-light'}>
                        on sale
                      </h1>
                    </div>
                  </div>
                </div>
                <div className={'h-100 item text-center'}
                     style={{
                       backgroundImage: 'url(http://botanica22.ge/admin/images/2604658.png)'
                     }}>
                  <div className={'cover p-md-5 px-3 py-5'}>
                    <div className={'text my-5 text-uppercase text-white"'}>
                      <h1 className={'m-0 font-weight-light'}>
                        on sale
                      </h1>
                    </div>
                  </div>
                </div>
                <div className={'h-100 item text-center'}
                     style={{
                       backgroundImage: 'url(http://botanica22.ge/admin/images/2604658.png)'
                     }}>
                  <div className={'cover p-md-5 px-3 py-5'}>
                    <div className={'text my-5 text-uppercase text-white"'}>
                      <h1 className={'m-0 font-weight-light'}>
                        on sale
                      </h1>
                    </div>
                  </div>
                </div>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class CollectionItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={'h-100 collection shadow'}>
        <div
          className={'image'}
          style={{backgroundImage: 'url(http://botanica22.ge/admin/images/2604658.png)'}}>
          <img
            src={'http://botanica22.ge/admin/images/2604658.png'}
            alt={'image'}
            className={'w-100'}
            style={{visibility: 'hidden'}}/>
        </div>
        <div className={'bg-white'}>
          <Container>
            <Row className={'align-items-center'}>
              <Col
                xs={4}
                className={'pr-0 price'}>
                <div className={'bg-grass py-2 lie'}></div>
                <div className={'bg-grass text-center text-white font-weight-bold pt-3 pb-4'}>
                  <i>
                    $14,00
                  </i>
                </div>
              </Col>
              <Col
                xs={8}
                className={'pl-1 h-100 text-capitalize text-muted'}>
                <h5 className={'m-0 py-3 font-weight-light'}>
                  new flowers
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

class Collections extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      params: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 1,
          }
        }
      }
    }
  }

  render(){
    return (
      <div className={'py-md-5 collections'}>
        <Container>
          <Row>
            <Col
              xs={12}
              className={'d-flex flex-sm-row flex-column align-items-center justify-content-center justify-content-sm-between'}>
              <div className={'title'}>
                <h1 className={'font-weight-light text-capitalize m-0'}>
                  our collection
                </h1>
              </div>
              <div className={'collection-button'}>
                <button className={'btn btn-outline-_grass text-capitalize'}>
                  show all
                </button>
              </div>
            </Col>
            <Col
              xs={12}
              className={'py-3'}>
              <Container>
                <Row>
                  <Col
                    xs={12}>
                    <Swiper {...this.state.params}>
                      <div>
                        <CollectionItem/>
                      </div>
                      <div>
                        <CollectionItem/>
                      </div>
                      <div>
                        <CollectionItem/>
                      </div>
                      <div>
                        <CollectionItem/>
                      </div>
                    </Swiper>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// class SliderComponent extends React.Component{
//   constructor(props){
//     super(props);
//   }
//
//   render(){
//     return [
//       <Slider key={'s-lider'}/>,
//       <SliderControls key={'s-sliders'}/>
//     ];
//   }
// }

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
        <Sales/>
        <Collections/>
        <Collections/>
        <Collections/>
        <Collections/>
      </main>
    )
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
  }

  render() {
    if (checkPromise(this.props.Slider)) {
      return <Element {...this.props} />;
    } else {
      return <Loading/>;
    }
  }
}


const states = (state) => {
  return {
    Slider: state.SliderReducer
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
    }
  }
};

export default connect (states, actions)(Home);