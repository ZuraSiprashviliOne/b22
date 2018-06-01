
import React from 'react';

import Swiper from 'react-id-swiper';

import {SliderButton} from "./SliderButton";

import {
  Container,
  Row,
  Col
} from 'reactstrap';

import Translate from '../Containers/Translate';

import {Link} from 'react-router-dom';

class CollectionItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={'h-100 collection shadow'}>
        <div
          className={'image'}
          style={{backgroundImage: `url(${this.props.image})`}}>
          <img
            src={this.props.image}
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
                    {this.props.price}
                  </i>
                </div>
              </Col>
              <Col
                xs={8}
                className={'pl-1 h-100 text-capitalize text-muted'}>
                <h5 className={'m-0 py-3 font-weight-light'}>
                  <Link
                    className={'text-muted d-block'}
                    to={this.props.route}>
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
        renderPrevButton: () => <SliderButton to={'left'}/>,
        renderNextButton: () => <SliderButton to={'right'}/>,
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

    this.getItems = this.getItems.bind(this);
  }

  getItems(){
    return this.props.data.map((item) => {
      return (
        <div key={item.id}>
          <CollectionItem {...item}/>
        </div>
      );
    })
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
                  <Translate>
                    {this.props.title}
                  </Translate>
                </h1>
              </div>
              <div className={'collection-button'}>
                <Link to={this.props.route} className={'btn btn-outline-_grass text-capitalize'}>
                  <Translate>
                    show all
                  </Translate>
                </Link>
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
                      {this.getItems()}
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


export class CollectionsComponent extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return this.props.items.map((item) => {
      return <Collections key={item.id} {...item}/>;
    });
  }
}