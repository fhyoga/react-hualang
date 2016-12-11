require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
let imageData = require('../data/imageData.json');

imageData = (function (imageDataArr) {
  for (let i = 0, j = imageDataArr.length; i < j; i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.url = require('../images/' + singleImageData.fileName);
    imageDataArr[i] = singleImageData
  }
  return imageDataArr
})(imageData);


function getRandomPos(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomRotate() {
  return (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30)
}

class ImageFigure extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center(1)
    }
    e.stopPropagation();
    e.preventDefault()
  }

  render() {
    let styleObject = {};
    if (this.props.arrange.pos) {
      styleObject = this.props.arrange.pos
    }
    if (this.props.arrange.isCenter) {
      styleObject.zIndex = 11
    }
    if (this.props.arrange.rotate) {
      (['Webkit', 'Ms', 'Moz', '']).forEach(function (value) {
        styleObject[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)'
      }.bind(this))
    }
    let className = 'img-fig';
    className += this.props.arrange.isInverse ? ' is-inverse' : '';
    return (
      <figure className={className} style={styleObject} onClick={this.handleClick}>

        <img src={this.props.data.url} alt={this.props.data.title}/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
        <div className="img-back" onClick={this.handleClick}>
          <p>{this.props.data.desc}</p>
        </div>
      </figure>
    )
  }
}
class ControllerUnits extends React.Component {

  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse()
    } else {
      this.props.center()
    }
    e.stopPropagation();
    e.preventDefault()
  }

  render() {
    let className='controller';

  if (this.props.arrange.isCenter){
    className='controller is-center'
  }
    return (
      <span className={className} onClick={this.handleClick.bind(this)}>
      </span>
    )
  }
}

class AppComponent extends React.Component {
  Constant = {
    centerPos: {
      left: 0,
      top: 0
    },
    horPosRange: {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    verPosRange: {
      x: [0, 0],
      topY: [0, 0]
    }
  };
  inverse(index) {
    return () => {
      let imageArrangeArr = this.state.imageArrangeArr;
      imageArrangeArr[index].isInverse = !imageArrangeArr[index].isInverse;
      this.setState({
        imageArrangeArr: imageArrangeArr
      })
    }
  }


  center(index) {
    return () => {
      this.rearrange(index)
    }
  }

  rearrange(centerIndex) {
    let imageArrangeArr = this.state.imageArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      verPosRange = Constant.verPosRange,
      horPosRange = Constant.horPosRange,
      verPosRangeTopY = verPosRange.topY,
      verPosRangeX = verPosRange.x,
      horPosRangeLeftSecX = horPosRange.leftSecX,
      horPosRangeRightSecX = horPosRange.rightSecX,
      horPosRangeY = horPosRange.y,
      imageArrangeTopArr = [],

      imageArrangeCenterArr = imageArrangeArr.splice(centerIndex, 1);


    imageArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isInverse: false,
      isCenter: true
    };


    let topImageSpliceIndex = Math.floor(Math.random() * imageArrangeArr.length),
      imageTopNum = Math.floor(Math.random() * 2);
    imageArrangeTopArr = imageArrangeArr.splice(topImageSpliceIndex, imageTopNum);


    imageArrangeTopArr.forEach(function (value, index) {
      imageArrangeTopArr[index] = {
        pos: {
          left: getRandomPos(verPosRangeX[0], verPosRangeX[1]),
          top: getRandomPos(verPosRangeTopY[0], verPosRangeTopY[1])
        },
        isCenter: false,
        isInverse: false
      };
      imageArrangeTopArr[index].rotate = getRandomRotate();
    });


    for (let i = 0, j = imageArrangeArr.length, k = j / 2; i < j; i++) {
      let imagePosRangeLorR = null;
      if (i < k) {
        imagePosRangeLorR = horPosRangeLeftSecX
      } else {
        imagePosRangeLorR = horPosRangeRightSecX
      }
      imageArrangeArr[i].pos = {
        left: getRandomPos(imagePosRangeLorR[0], imagePosRangeLorR[1]),
        top: getRandomPos(horPosRangeY[0], horPosRangeY[1])
      };
      imageArrangeArr[i].rotate = getRandomRotate();
      imageArrangeArr[i].isInverse = false;
      imageArrangeArr[i].isCenter = false
    }

    if (imageArrangeTopArr && imageArrangeTopArr[0]) {
      imageArrangeArr.splice(topImageSpliceIndex, 0, imageArrangeTopArr[0])
    }
    imageArrangeArr.splice(centerIndex, 0, imageArrangeCenterArr[0]);

    this.setState({
      imageArrangeArr: imageArrangeArr
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      imageArrangeArr: []
    }
  }

  componentDidMount() {
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageH = stageDOM.scrollHeight,
      stageW = stageDOM.scrollWidth,
      halfStageH = Math.floor(stageH / 2),
      halfStageW = Math.floor(stageW / 2);
    let imageFigureDOM = ReactDOM.findDOMNode(this.refs.image0),
      imageH = imageFigureDOM.offsetHeight,
      imageW = imageFigureDOM.offsetWidth,
      halfImageH = Math.floor(imageH / 2),
      halfImageW = Math.floor(imageW / 2);
    this.Constant.centerPos = {
      left: halfStageW - halfImageW,
      top: halfStageH - halfImageH
    };
    this.Constant.horPosRange = {
      leftSecX: [-halfImageW, halfStageW - halfImageW * 3],
      rightSecX: [halfStageW + halfImageW, stageW - halfImageW],
      y: [-halfImageH, stageH - halfImageH]
    };
    this.Constant.verPosRange = {
      x: [halfStageW - imageW, halfStageW],
      topY: [-halfImageH, halfStageH - halfImageH * 3]
    };
    this.Constant.controllerLeft = halfStageW - 320;
    this.rearrange(0);
  }


  render() {


    let controllers = [],
      imageFigures = [];

    imageData.forEach((value, index) => {

      if (!this.state.imageArrangeArr[index]) {
        this.state.imageArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }

      imageFigures.push(<ImageFigure data={value} key={index} ref={'image' + index}
                                     arrange={this.state.imageArrangeArr[index]} inverse={this.inverse(index)}
                                     center={this.center(index)}/>);
      controllers.push(<ControllerUnits left={this.Constant.controllerLeft} key={index}
                                        arrange={this.state.imageArrangeArr[index]} inverse={this.inverse(index)}
                                        center={this.center(index)}/>)
    });
    return (
      <section className="stage" ref='stage'>
        <section className="img-sec">
          {imageFigures}
        </section>
        <nav className="nav">
          {controllers}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {};
export default AppComponent;
