
import React from 'react';

import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import{
  Container,
  Row,
  Col
} from 'reactstrap';

class Element extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
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
                sidebar
              </Col>
              <Col
                className={'flowers'}
                md={9}>
                <Container>
                  <Row>
                    <Col
                      lg={4}
                      className={'flowers_flower_col h-100'}>
                      <div className="py-5 bg-warning h-100"></div>
                    </Col>
                    <Col
                      lg={4}
                      className={'flowers_flower_col h-100'}>
                      <div className="py-5 bg-warning h-100"></div>
                    </Col>
                    <Col
                      lg={4}
                      className={'flowers_flower_col h-100'}>
                      <div className="py-5 bg-warning h-100"></div>
                    </Col>
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

  init(props){
    props.setPage(getPageSlag(this.props.match.path));
  }

  render(){
    if(true){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {};
};
const actions = (dispatch) => {
  return {
    setPage: (slag) => {
      dispatch(SET_NAVIGATION_CURRENT_PAGE(slag));
    }
  };
};

export default connect(states, actions)(Flowers);
