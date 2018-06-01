
import React from 'react';

import {connect} from 'react-redux';

import FontAwesome from 'react-fontawesome';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

import {Loading} from "../Components/Loading";

import Translate from './Translate';

class Top extends React.Component{
  constructor(props){
    super(props);

    this._subscribe = this._subscribe.bind(this);
  }

  _subscribe(event){
    alert('subscribed');
    event.preventDefault();
  }

  render(){
    return (
      <div className={'pre-footer bg-_grass'}>
        <Container>
          <Row className={'py-5 top'}>
            <Col
              lg={4}
              sm={6}>
              <div className={'text-uppercase font-weight-light py-3'}>
                <h2 className={'m-0'}>
                  text widget
                </h2>
              </div>
              <div className={'small font-weight-light'}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime perspiciatis velit maiores impedit
                voluptas totam corporis est, ad neque a molestiae quod alias praesentium! Molestiae, illo molestias.
                Consequatur, recusandae pariatur.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur saepe pariatur, nemo aspernatur
                omnis veritatis earum, optio eos in itaque architecto distinctio, eveniet repellendus nostrum aperiam ea
                quis eaque mollitia.
              </div>
            </Col>
            <Col
              lg={4}
              sm={6}>
              <div className={'text-uppercase font-weight-light py-3'}>
                <h2 className={'m-0'}>
                  facebook widget
                </h2>
              </div>
              <div className={'small font-weight-light'}>
                <div className={'pb-2'}>
                  <b className={'text-light font-weight-bold pr-1'}>News Feed</b>
                  <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio facere dolorum cumque deleniti dolores omnis ex ad voluptas nobis adipisci velit voluptate dolore eveniet soluta incidunt, sit autem, tempora quis.
                  </span>
                </div>
                <div className={'pb-2'}>
                  <b className={'text-light font-weight-bold pr-1'}>News Feed</b>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio facere dolorum cumque deleniti dolores omnis ex ad voluptas nobis adipisci velit voluptate dolore eveniet soluta incidunt, sit autem, tempora quis.
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={'py-5 bottom'}>
            <Col
              xs={12}>
              <Container>
                <Row className={'align-items-center'}>
                  <div className={'col-lg-4 col-md-6 col-sm-8 b d-flex flex-row align-items-center jutify-content-start'}>
                    <div className={'input-group'}>
                      <input
                        type={'text'}
                        ref={(element) => {this.textInput = element}}
                        className={'rounded-no bg-__grass text-light px-3 py-2 form-control border-0'}
                        placeholder={'Enter your Email form Subscription'} />
                    </div>
                    <div className={'input-group'} style={{flex: 0}}>
                      <button
                        onClick={this._subscribe}
                        className={'rounded-no btn-white border-white text-grass form-control'}>
                        <FontAwesome name={'angle-right'}/>
                      </button>
                    </div>
                  </div>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class Bottom extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <footer className={'bg-__grass'}>
        <Container>
          <Row className={'text-light py-5 align-items-center'}>
            <Col
              md={6}
              className={'p-2'}>
              <div className={'text-capitalize'}>
                <Translate>
                  {this.props.common.title}
                </Translate>
              </div>
              <div className={'text-capitalize small'}>
                <Translate>
                  {this.props.common.copy}
                </Translate>
              </div>
            </Col>
            <Col
              md={6}
              className={'p-2 d-none d-sm-none d-md-none d-lg-block d-xl-block'}>
              <ul className={'list-unstyled text-capitalize d-flex flex-row align-items-center justify-content-end'}>
                <li>
                  <a href="#" className={'text-light p-1'}>
                    home
                  </a>
                </li>
                <li>
                  <a href="#" className={'text-light p-1'}>
                    support
                  </a>
                </li>
                <li>
                  <a href="#" className={'text-light p-1'}>
                    terms and conditions
                  </a>
                </li>
                <li>
                  <a href="#" className={'text-light p-1'}>
                    faq
                  </a>
                </li>
                <li>
                  <a href="#" className={'text-light'}>
                    contact us
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }
}

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return [
      <Top key={'top'}/>,
      <Bottom common={this.props.common} key={'bottom'}/>
    ]
  }
}

class Footer extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){

  }

  render(){
    if (true) {
      return <Element {...this.props} />;
    } else {
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {};
};

const actions = (dispatch) => {
  return {
  }
};

export default connect (states, actions)(Footer);