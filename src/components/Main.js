require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageData=require('../data/imageData.json');

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
      <section className="stage">
        <section className="img-sec">
          <img src={imageData[0].url} alt={imageData[0].title}/>
        </section>
        <nav className="nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
