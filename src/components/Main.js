require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var imageData=require('../data/imageData.json');

imageData=(function (imageDataArr) {
  for (let i=0,j=imageDataArr.length;i<j;i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.url= require('../images/'+singleImageData.fileName);
    imageDataArr[i]=singleImageData
  }
  return imageDataArr
})(imageData);


class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <img src={imageData[0].url} alt={imageData[0].title}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};
export default AppComponent;
