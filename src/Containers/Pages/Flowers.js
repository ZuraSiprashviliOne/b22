
import React from 'react';

import {connect} from 'react-redux';
import {Loading} from "../../Components/Loading";
import {SET_NAVIGATION_CURRENT_PAGE} from "../../Actions/NavigationActions";
import {getPageSlag} from "../../Helpers/Routing";

import Translate from '../Translate';
import {Link} from 'react-router-dom';

import{
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import {INIT_FLOWERS, SET_FLOWERS_CURRENT_CATEGORY, SET_FLOWERS_FLOWERS} from "../../Actions/FlowersActions";
import {checkPromise} from "../../Helpers/Valid";
import {CollectionItemImage, CollectionItemImages} from "../../Components/CollectionsComponent";
import {AnimatedAndMetas} from "../../Components/CollectionsComponent";


class FlowerItem extends React.Component {
  constructor(props) {
    super(props);

    this.getImage = this.getImage.bind(this);

  }

  getImage(){
    if(this.props.images.length === 0){
      return <CollectionItemImage image={this.props.image}/>
    }else{
      return <CollectionItemImages image={this.props.image} images={this.props.images}/>
    }
  }

  render() {
    return (
      <div className={'h-100 collection shadow'}>
        <AnimatedAndMetas slag={`/flowers/items/item_${this.props.id}`} description={this.props.description}/>
        {this.getImage()}
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

class FlowerBar extends React.Component{
  constructor(props){
    super(props);

    this.getCategories = this.getCategories.bind(this);
  }

  getCategories(){
    return this.props.categories.map((cat) => {
      return (
        <ListGroupItem
          tag={Link}
          key={cat.slag}
          className={`text-grass rounded-no text-capitalize ${('/flowers/'+ this.props.current)=== cat.slag ? 'active' : ''}`}
          to={cat.slag}>
          <Translate>
            {cat.title}
          </Translate>
        </ListGroupItem>
      );
    });
  }

  render(){
    return (
      <div
        className={'bg-white border animated fadeIn flowerBar'}>
        <div
          className={'py-3 px-2 shadow-grass border-bottom border-5 border-grass'}>
          <h2
            className={'m-0 text-capitalize text-grass'}>
            <i>
              <Translate>
                categories
              </Translate>
            </i>
          </h2>
        </div>
        <ListGroup className={'lists'}>
          {this.getCategories()}
        </ListGroup>
      </div>
    );
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
          md={6}
          sm={6}
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
                className={'flowers_sidebar p-md-2 p-1'}>
                <FlowerBar
                  current={this.props.Flowers.currentCategory}
                  categories={this.props.Navigation.list.find((l) => l.slag === '/flowers').sub}/>
              </Col>
              <Col
                className={'flowers p-md-2 p-1'}
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
    if(this.props.Navigation.currentPage !== getPageSlag(this.props.match.path)){
      this.props.setPage(getPageSlag(this.props.match.path));
    }
    if(checkPromise(this.props.Flowers) === false){
      this.props.initFlowers();
    }
    if(props.Flowers.currentCategory !== this.props.match.params.flower_category){
      this.props.setFlowers(this.props.match.params.flower_category);
      this.props.setFlowersCurrentCategory(this.props.match.params.flower_category);
    }
  }

  render(){
    if(
      checkPromise(this.props.Flowers)
      && checkPromise(this.props.Navigation)
    ){
      return <Element {...this.props}/>;
    }else{
      return <Loading/>;
    }
  }
}

const states = (state) => {
  return {
    Flowers: state.FlowersReducer,
    Navigation: state.NavigationReducer
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
