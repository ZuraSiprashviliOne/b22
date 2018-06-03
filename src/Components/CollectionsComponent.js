
import React from 'react';

import Swiper from 'react-id-swiper';

import {SliderButton} from "./SliderButton";
import FontAwesome from 'react-fontawesome';

import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

import Translate from '../Containers/Translate';

import {Link} from 'react-router-dom';


export class AnimatedAndMetas extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      question: false
    };


    this._handleQuestion = this._handleQuestion.bind(this);
  }


  _handleQuestion(){
    this.setState({
      question: !this.state.question
    });
  }


  render(){
    return [
      <div
        key={'animateeds'}
        className={`question animated ${this.state.question === true ? 'open': 'closed'}`}>
        <Button
          onClick={this._handleQuestion}
          className={'bg-transparent closeBtn animated'}>
          <div
            className={'h1 m-0'}>
            <FontAwesome
              className={'text-grass'}
              name={'times'}/>
          </div>
        </Button>
        <div
          className={'cover p-2'}>
          <div className={'border small text p-2'}>
            <Translate>
              {this.props.description}
            </Translate>
          </div>
          <div className={'mt-3 d-flex flex-row readMoreDiv align-items-center justify-content-end'}>
            <Link
              to={this.props.slag}
              className={'btn d-flex flex-row align-items-center btn-__grass animated readMoreBtn'}>
              <span className={'text-light text-capitalize mr-2'}>
                  <Translate>
                    read more
                  </Translate>
                </span>
              <h2
                className={'m-0'}>
                <FontAwesome
                  name={'angle-right'}/>
              </h2>
            </Link>
          </div>
        </div>
      </div>,
      <div
        key={'metas'}
        className={'metas'}>
        <Container>
          <Row>
            <Col
              sm={6}
              className={'p-1 item'}>
              <Button
                color={'grass'}
                className={'btn-block animated shadow itemb'}>
                <FontAwesome
                  className={'text-white'}
                  name={'star-o'}/>
              </Button>
            </Col>
            <Col
              sm={6}
              className={'p-1 item'}>
              <Button
                color={'info'}
                className={'btn-block animated shadow itemb'}>
                <FontAwesome
                  name={'shopping-cart'}/>
              </Button>
            </Col>
            <Col
              sm={{
                size: 6,
                offset: 6
              }}
              className={'p-1 item'}>
              <Button
                onClick={this._handleQuestion}
                color={'__grass'}
                className={'btn-block animated shadow itemb'}>
                <FontAwesome
                  name={'question'}/>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    ]
  }
}

export class CollectionItemImage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div
        className={'image'}
        style={{backgroundImage: `url(${this.props.image})`}}>
        <img
          src={'/assets/ideal.jpg'}
          alt={'image'}
          className={'w-100'}
          style={{visibility: 'hidden'}}/>
      </div>
    )
  }
}

export class CollectionItemImages extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
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
        <div key={image + 'x'}>
          <CollectionItemImage image={image}/>
        </div>
      );
    })
  }

  render(){
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

export class CollectionItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={'h-100 collection shadow'}>
        <AnimatedAndMetas slag={`/flowers/items/item_${this.props.id}`} description={this.props.description}/>
        <CollectionItemImage image={this.props.image}/>
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
                <Link to={this.props.slag} className={'btn btn-outline-_grass text-capitalize'}>
                  <Translate>
                    show all
                  </Translate>
                </Link>
              </div>
            </Col>
            <Col
              xs={12}
              className={'py-3 coll-row'}>
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
    return this.props.items.map((item, index) => {
      return <Collections key={index} {...item}/>;
    });
  }
}