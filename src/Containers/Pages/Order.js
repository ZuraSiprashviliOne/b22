
import React from 'react';

import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE, SET_NAVIGATION_PATH} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";
import {checkPromise} from "../../Helpers/Valid";
import {
  INIT_ORDER,
  SET_ORDER_COUNT, SET_ORDER_FLOWER_OLD_PRICE,
  SET_ORDER_FLOWER_PRICE,
  SET_ORDER_SIZE,
  UNSET_ORDER
} from "../../Actions/OrderActions";

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


    this._onChangeNames = this._onChangeNames.bind(this);
  }

  _onChangeNames(event) {
    // console.log(event.target.value);
    // if (event.target.value) {
    //   if (event.target.value.search(/^[a-zA-Z]+$/gi)) {
    //     let m = /[0-9]/.exec(event.target.value);
    //     // event.target.value = ;
    //     let val = event.target.value;
    //     val.split('').splice(m.index, 1);
    //     val = val.join('');
    //     event.target.value = val;
    //   } else {
    //     console.log('ok')
    //   }
    // }
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
                                  ref={(element) => {this.refer_firstName = element}}
                                  onChange={this._onChangeNames}
                                  required={true}
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
                                  ref={(element) => {this.refer_lastName = element}}
                                  onChange={this._onChangeNames}
                                  type="text"
                                  required={true}
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
                                    phone number
                                  </Translate> 1
                                </h5>
                              </div>
                              <div
                                className={'p-1'}>
                                <input
                                  type="text"
                                  ref={(element) => {this.refer_phone_one}}
                                  onChange={this._onChangePhone}
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
                                    phone number
                                  </Translate> 2
                                </h5>
                              </div>
                              <div
                                className={'p-1'}>
                                <input
                                  ref={(element) => {this.refer_phone_two}}
                                  onChange={this._onChangePhone}
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
                                  ref={(element) => {this.refer_email = element}}
                                  onChange={this._onChangeEmail}
                                  type="email"
                                  required={true}
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
                                  *please, fill in this gap carefully, since the text written by you will be copied on the card without editing.
                                </div>
                              </div>
                              <div
                                className={'p-1'}>
                                <textarea
                                  ref={(element) => {this.message}}
                                  className={'form-control border rounded-no bg-white px-2 py-1 text-muted'}/>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              xs={12}>
                              <FlowerInfo
                                size={this.props.size}
                                count_price={this.props.count_price}
                                real_price={this.props.real_price}
                                size_price={this.props.size_price}
                                size__price={this.props.size__price}
                                setprice={this.props.setPrice}
                                setcount={this.props.setcount}
                                setsize={this.props.setsize}
                                id={this.props.id}
                                hasCount={this.props.hasCount}
                                count={this.props.count}
                                exporter={true}
                                order={() => {}}
                                cartadd={()=>{}}
                                rmcart={()=>{ }}
                                carts={this.props.carts}
                                title={this.props.title}
                                price={this.props.price}
                                real_old_price={this.props.real_old_price}
                                setoldprice={this.props.setOldPrice}
                                old_price={this.props.old_price}
                                description={this.props.description}/>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              xs={12}>
                              <div className={'px-3 py-2'}>
                                <input
                                  ref={(element) => {this.that = element}}
                                  className={''}
                                  type={'checkbox'}
                                  required={true}
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
                                        ref={(element) => {this.addrer_firstName = element}}
                                        onChange={this._onChangeNames}
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
                                        ref={(element) => {this.addrer_lastName}}
                                        onChange={this._onChangeNames}
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
                                        ref={(element) => {this.addrer_phone}}
                                        onChange={this.onChangePhone}
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
                                        ref={(element) => {this.delivery_date = element}}
                                        onChange={this._onDateChange}
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
                                        ref={(element) => {this.delivery_time = element}}
                                        onChange={this._onTimeChange}
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
                                      <select
                                        ref={(element) => {this.delivery_city = element}}
                                        className={'form-control'}>
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
                                      <select
                                        ref={(element) => {
                                          this.delivery_anony = element
                                        }}
                                        className={'form-control'}>
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
                                        ref={(element) => {this.delivery_address = element}}
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
                                          additional info
                                        </Translate>
                                      </h5>
                                    </div>
                                    <div
                                      className={'p-1'}>
                                      <textarea
                                        ref={(element) => {
                                          this.additional_info = element
                                        }}
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
          <OrderProduct
            setsize={this.props.setsize}
            setcount={this.props.setcount}
            carts={this.props.Cart.carts}
            setPrice={this.props.setPrice}
            setOldPrice={this.props.setOldPrice}
            {...this.props.Order.product}/>
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
    Navigation: state.NavigationReducer,
    Cart: state.CartReducer
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
    },
    setsize: (size) => {
      dispatch(SET_ORDER_SIZE(size));
    },
    setcount: (count) => {
      dispatch(SET_ORDER_COUNT(count));
    },
    setPrice: (price) => {
      dispatch(SET_ORDER_FLOWER_PRICE(price));
    },
    setOldPrice: (price) => {
      dispatch(SET_ORDER_FLOWER_OLD_PRICE(price));
    }
  };
};

export default connect(states, actions)(Order);