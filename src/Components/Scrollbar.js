
import React from 'react';

import Scrollbars from 'react-custom-scrollbars';

export class Scrollbar extends React.Component{
  constructor(props){
    super(props);

  }

  componentDidMount(){

  }

  componentDidUpdate(props){
    if(props.currentpath || this.props.currentpath){
      if(props.currentpath !== this.props.currentpath){
        this.scrollbar.scrollTop();
      }
    }
  }

  render(){
    return (
      <Scrollbars
        {...this.props}
        ref={(element) =>{ this.scrollbar = element; }}
        autoHide={this.props.autoHide || true}
        autoHideDuration={this.props.autoHideDuration || 300}
        autoHideTimeout={this.props.autoHideTimeout || 0}
        renderThumbVertical={() => {
          return (
            <div
              className={'track-vertical'} style={{
              backgroundColor: 'rgba(255,255,255,1)'
            }}/>
          );
        }}>
        {this.props.children}
      </Scrollbars>
    );
  }
}