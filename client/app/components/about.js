var React = require('react');

var About = React.createClass({

  render: function() {
    return (
      <div className="row" id="fromTheTop">
        <h1>Team</h1>
        <div className="medium-3 columns">
          <img className="profile" src="https://media.licdn.com/media/p/8/000/2af/037/2d2cd6a.jpg" />
          <h3>Travis Chapman</h3>
          <h5>Full-stack Engineer</h5>
          <a href="http://www.github.com/teechap"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/GitHub-Mark-64px.png" /></a>
          <a href="https://www.linkedin.com/in/travisechapman"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/InBug-60px-R.png" /></a>
        </div>
        
        <div className="medium-3 columns">
          <img className="profile" src="https://media.licdn.com/media/AAEAAQAAAAAAAAElAAAAJDU5YmIyYWQ0LWM5YWEtNDNmMS04MzA2LTg1YjQ3ZmM1YmU3Yg.jpg" />
          <h3>Yan Fan</h3>
          <h5>Scrum Master</h5>
          <a href="http://www.github.com/yanarchy"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/GitHub-Mark-64px.png" /></a>
          <a href="https://www.linkedin.com/in/yanfan"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/InBug-60px-R.png" /></a>
        </div>
        
        <div className="medium-3 columns">
          <img className="profile" src="https://media.licdn.com/media/p/3/005/088/3b1/082f9e3.jpg" />
          <h3>Jackson Hoose</h3>
          <h5>Product Owner</h5>
          <a href="http://www.github.com/jacksonhoose"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/GitHub-Mark-64px.png" /></a>
          <a href="https://www.linkedin.com/in/jacksonhoose"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/InBug-60px-R.png" /></a>
        </div>
        
        <div className="medium-3 columns">
          <img className="profile" src="https://media.licdn.com/media/AAEAAQAAAAAAAACFAAAAJGQwZWUyZTY0LWU1ZDAtNGYxMy05MWY2LTBhMmRmODBlMzg4Yg.jpg" />
          <h3>Alexander Tseung</h3>
          <h5>Lead PubNub Engineer</h5>
          <a href="http://www.github.com/alextsg"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/GitHub-Mark-64px.png" /></a>
          <a href="https://www.linkedin.com/in/alextsg"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/InBug-60px-R.png" /></a>
        </div>
      
      </div>
    );
  }
});

module.exports.About = About;
