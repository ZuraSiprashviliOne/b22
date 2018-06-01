
import React from 'react';

import{
  Container,
  Row,
  Col
} from 'reactstrap';

export class Addons extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={'py-md-5 addons'}>
        <Container>
          <Row>
            <Col
              lg={6}
              className={'px-0'}>
              <Container>
                <Row>
                  <Col
                    sm={6}
                    className={'p-2'}>
                    <div className={'px-3 addon py-2 h-100 bg-muted text-dark'}>
                      <div className={'pt-4 pb-2 text-uppercase'}>
                        <h3 className={'m-0'}>
                          <i>
                            <b>
                              free shipping
                            </b>
                          </i>
                        </h3>
                      </div>
                      <div className={'small'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo illum qui ad quasi ipsam saepe
                        obcaecati maiores error! Delectus ab harum, ad reprehenderit cupiditate dolorum nobis laudantium
                        minus exercitationem nam?
                      </div>
                    </div>
                  </Col>
                  <Col
                    sm={6}
                    className={'p-2'}>
                    <div className={'px-3 addon py-2 h-100 bg-muted text-dark'}>
                      <div className={'pt-4 pb-2 text-uppercase'}>
                        <h3 className={'m-0'}>
                          <i>
                            <b>
                              free shipping
                            </b>
                          </i>
                        </h3>
                      </div>
                      <div className={'small'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo illum qui ad quasi ipsam saepe
                        obcaecati maiores error! Delectus ab harum, ad reprehenderit cupiditate dolorum nobis laudantium
                        minus exercitationem nam?
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col
              sm={6}
              className={'p-2'}>
              <div className={'px-3 addon py-2 h-100 bg-muted text-dark'}>
                <div className={'pt-4 pb-2 text-uppercase'}>
                  <h3 className={'m-0'}>
                    <i>
                      <b>
                        free shipping
                      </b>
                    </i>
                  </h3>
                </div>
                <div className={'small'}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo illum qui ad quasi ipsam saepe
                  obcaecati maiores error! Delectus ab harum, ad reprehenderit cupiditate dolorum nobis laudantium
                  minus exercitationem nam?
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}