
import React from 'react';

import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";
import {checkPromise} from "../../Helpers/Valid";
import {INIT_ORDER, UNSET_ORDER} from "../../Actions/OrderActions";

import Translate from '../Translate';

import{
  Link
} from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import {FlowerInfo} from "./Flower";

class OrderProduct extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container>
        <Row>
          <Col
            xs={12}
            className={'p-1'}>
            <form action={'#'} method={'post'}
              className={'h-100 bg-white shadow p-2'}>
              <Container>
                <Row
                  className={'py-3'}>
                  <Col
                    className={'p-1'}
                    md={6}>
                    <div className="p-2 text-capitalize font-weight-light">
                      <h3
                        className={'font-weight-light m-0'}>
                        <Translate>
                          orderer
                        </Translate>
                      </h3>
                    </div>
                    <div
                      className={'p-2'}>
                      <div className="py-1">
                        <Container>
                          <Row>
                            <Col
                              className={'p-1'}
                              lg={6}>
                              <div
                                className={'py-1 text-capitalize'}>
                                <h5
                                  className={'font-weight-light m-0'}>
                                  <Translate>
                                    first name
                                  </Translate>
                                </h5>
                              </div>
                              <div
                                className={'p-1'}>
                                <input
                                  type="text"
                                  className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                  placeholder={'John'}/>
                              </div>
                            </Col>
                            <Col
                              className={'p-1'}
                              md={6}>
                              <div
                                className={'py-1 text-capitalize'}>
                                <h5
                                  className={'font-weight-light m-0'}>
                                  <Translate>
                                    last name
                                  </Translate>
                                </h5>
                              </div>
                              <div
                                className={'p-1'}>
                                <input
                                  type="text"
                                  className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                  placeholder={'Doe'}/>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              className={'p-1'}
                              lg={6}>
                              <div
                                className={'py-1 text-capitalize'}>
                                <h5
                                  className={'font-weight-light m-0'}>
                                  <Translate>
                                    phone number 1
                                  </Translate>
                                </h5>
                              </div>
                              <div
                                className={'p-1'}>
                                <input
                                  type="text"
                                  className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                  placeholder={'(+995) 555 58 58 79'}/>
                              </div>
                            </Col>
                            <Col
                              className={'p-1'}
                              md={6}>
                              <div
                                className={'py-1 text-capitalize'}>
                                <h5
                                  className={'font-weight-light m-0'}>
                                  <Translate>
                                    phone number 2
                                  </Translate>
                                </h5>
                              </div>
                              <div
                                className={'p-1'}>
                                <input
                                  type="text"
                                  className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                  placeholder={'(+995) 555 44 93 59'}/>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              className={'p-1'}
                              xs={12}>
                              <div
                                className={'py-1 text-capitalize'}>
                                <h5
                                  className={'font-weight-light m-0'}>
                                  <Translate>
                                    email
                                  </Translate>
                                </h5>
                              </div>
                              <div
                                className={'p-1'}>
                                <input
                                  type="email"
                                  className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                  placeholder={'example@gmail.com'}/>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              className={'p-1'}
                              xs={12}>
                              <div
                                className={'py-1 text-capitalize'}>
                                <h5
                                  className={'font-weight-light m-0'}>
                                  <Translate>
                                    message
                                  </Translate>
                                </h5>
                                <div className={'text-muted p-1 small'}>
                                  *Please, full in this gap carefully, since the text written by you will be copied on the card without editing.
                                </div>
                              </div>
                              <div
                                className={'p-1'}>
                                      <textarea
                                        className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}/>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              xs={12}>
                              <FlowerInfo
                                exporter={true}
                                order={() => {}}
                                title={this.props.title}
                                price={this.props.price}
                                old_price={this.props.old_price}
                                description={this.props.description}/>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              xs={12}>
                              <div className={'px-3 py-2'}>
                                <input
                                  className={''}
                                  type={'checkbox'}
                                  value={''}/>
                                  <label
                                    className={'ml-2 form-check-label  small text-muted'}>
                                    <Translate>
                                      yes that's the flower i want
                                    </Translate>
                                  </label>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className={'p-1'}
                    md={6}>
                    <Container>
                      <Row>
                        <Col
                          xs={12}>
                          <div className="p-2 text-capitalize font-weight-light">
                            <h3
                              className={'font-weight-light m-0'}>
                              <Translate>
                                addresser
                              </Translate>
                            </h3>
                          </div>
                          <div
                            className={'p-2'}>
                            <div className="py-1">
                              <Container>
                                <Row>
                                  <Col
                                    className={'p-1'}
                                    lg={6}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          first name
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <input
                                        type="text"
                                        className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                        placeholder={'John'}/>
                                    </div>
                                  </Col>
                                  <Col
                                    className={'p-1'}
                                    md={6}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          last name
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <input
                                        type="text"
                                        className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                        placeholder={'Doe'}/>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    className={'p-1'}
                                    lg={12}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          phone number
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <input
                                        type="text"
                                        className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                        placeholder={'(+995) 555 58 58 79'}/>
                                    </div>
                                  </Col>
                                </Row>
                              </Container>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          xs={12}>
                          <div className="p-2 text-capitalize font-weight-light">
                            <h3
                              className={'font-weight-light m-0'}>
                              <Translate>
                                delivery
                              </Translate>
                            </h3>
                          </div>
                          <div
                            className={'p-2'}>
                            <div className="py-1">
                              <Container>
                                <Row>
                                  <Col
                                    className={'p-1'}
                                    lg={6}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          date
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <input
                                        type="date"
                                        className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}/>
                                    </div>
                                  </Col>
                                  <Col
                                    className={'p-1'}
                                    md={6}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          time
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <input
                                        type="time"
                                        className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}/>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    className={'p-1'}
                                    lg={6}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          city
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <select className={'form-control'}>
                                        <option value="tbilisi">
                                          <Translate>
                                            tbilisi
                                          </Translate>
                                        </option>
                                        <option value="gori">
                                          <Translate>
                                            gori
                                          </Translate>
                                        </option>
                                        <option value="gldani">
                                          <Translate>
                                            gldani
                                          </Translate>
                                        </option>
                                      </select>
                                    </div>
                                  </Col>

                                  <Col
                                    className={'p-1'}
                                    lg={6}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          anony order
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <select className={'form-control'}>
                                        <option value="yes">
                                          <Translate>
                                            yes
                                          </Translate>
                                        </option>
                                        <option value="no">
                                          <Translate>
                                            no
                                          </Translate>
                                        </option>
                                      </select>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    className={'p-1'}
                                    lg={6}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          full address
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <input
                                        type="text"
                                        className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}
                                        placeholder={'Tbilisi, Avlabari, David\'s.st 14'}/>
                                    </div>
                                  </Col>
                                  <Col
                                    className={'p-1'}
                                    lg={6}>
                                    <div
                                      className={'py-1 text-capitalize'}>
                                      <h5
                                        className={'font-weight-light m-0'}>
                                        <Translate>
                                          addinational info
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <textarea
                                        className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}/>
                                    </div>
                                  </Col>
                                </Row>
                              </Container>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row className={'pt-md-3 border-top'}>
                  <Col
                    className={'p-1'}
                    md={{
                      size: 6,
                      offset: 6
                    }}>
                    <Container>
                      <Row>
                        <Col
                          className={'p-1 h-100'}
                          xs={6}>
                          <Button
                            type={'reset'}
                            className={'btn-block h-100 text-light text-capitalize font-weight-light shadow btn-__grass'}>
                            <Translate>
                              reset
                            </Translate>
                          </Button>
                        </Col>
                        <Col
                          className={'p-1 h-100'}
                          xs={6}>
                          <Button
                            type={'submit'}
                            className={'btn-block h-100 text-light text-capitalize font-weight-light shadow btn-_grass'}>
                            <Translate>
                              send
                            </Translate>
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

class NoProduct extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container>
        <Row>
          <Col
            className={'p-1'}
            xs={12}>
            <div className={'h-100 bg-white shadow p-2'}>
              <div
                className={'text-center'}>
                <h1
                  className={'font-weight-light m-0 text-capitalize p-3'}>
                  <Translate>
                    you haven't selected the product
                  </Translate>
                </h1>
                <Link
                  to={'/'}
                  className={'btn btn-_grass text-light text-capitalize px-3 py-1'}>
                  <Translate>
                    return previous page
                  </Translate>
                </Link>
              </div>
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
        id={'order_page'}
        className={'page bg-light animated fadeIn py-md-5'}>
        {this.props.Order.product ? (
          <OrderProduct {...this.props.Order.product}/>
        ): <NoProduct />}
      </div>
    )
  }
}

class Order extends React.Component{
  constructor(props){
    super(props);

    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init(this.props);
  }

  componentWillUnmount(){
    this.props.unsetOrder();
  }

  init(props){
    if (this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)) {
      this.props.setPage(getPageSlag(this.props.match.path));
    }

    if(checkPromise(this.props.Order, ['product']) === false){
      this.props.initOrder();
    }

    if (this.props.match.url !== this.props.Navigation.path) {
      this.props.setPath(this.props.match.url);
    }
  }

  render(){
    if(
      checkPromise(this.props.Order, ['product'])
    ){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Order: state.OrderReducer,
    Navigation: state.NavigationReducer
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
    initOrder: () => {
      dispatch(INIT_ORDER());
    },
    unsetOrder: () => {
      dispatch(UNSET_ORDER());
    }
  };
};

export default connect(states, actions)(Order);