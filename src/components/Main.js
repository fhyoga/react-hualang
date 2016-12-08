require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageData = require('../data/imageData.json');

imageData = (function (imageDataArr) {
  for (let i = 0, j = imageDataArr.length; i < j; i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.url = require('../images/' + singleImageData.fileName);
    imageDataArr[i] = singleImageData
  }
  return imageDataArr
})(imageData);

class ImageFigure extends React.Component {
  render() {
    return (
      <figure className="img-fig">
        <img src={this.props.data.url} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

  class AppComponent extends React.Component {


    static Constant={
      centerPos:{
        left:0,
        top:0
      },
      horPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      verPosRange:{
        x:[0,0],
        topY:[0,0]
      }
    };

    getRandomPos(min,max){
      return Math.floor(Math.random()*(max-min)+min)
    }
    rearrange(centerIndex){

    }
    componentDidMount() {
      let stageDOM = React.findDOMNode(this.refs.stage),
        stageH = stageDOM.scrollHeight,
        stageW = stageDOM.scrollWidth,
        halfStageH = Math.floor(stageH / 2),
        halfStageW = Math.floor(stageW / 2);

      let imageFigureDOM = React.findDOMNode(this.refs.imageFigure0),
        imageH = imageFigureDOM.scrollHeight,
        imageW = imageFigureDOM.scrollWidth,
        halfImageH = Math.floor(imageH / 2),
        halfImageW = Math.floor(imageW / 2);
      this.Constant.centerPos = {
        left: halfStageW - halfImageW,
        top: halfStageH - halfImageH
      };
      this.Constant.horPosRange = {
        leftSecX: [-halfImageW, halfStageW - halfImageW * 3],
        rightSecX: [halfStageW + halfImageW],
        y:[-halfImageH,stageH-halfImageH]
      };
      this.Constant.verPosRange= {
        x: [halfStageW - imageW, halfStageW],
        topY: [-halfImageH, stageH - halfImageH]
      }
    }




  render() {


    let controlers = [],
      imageFigures = [];

    imageData.forEach(function (value,index) {
      imageFigures.push(<ImageFigure data={value} key={value.url} ref={'imageFigure'+index}/>);
    });

    return (
      <section className="stage" ref='stage'>
        <section className="img-sec">
          {imageFigures}
        </section>
        <nav className="nav">
          {controlers}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {};
export default AppComponent;
