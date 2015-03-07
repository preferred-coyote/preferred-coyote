/** @jsx React.DOM */

var React = require('react/addons');
var Link = require('react-router').Link;
var About = require('./about').About;

var Home = React.createClass({

  componentDidMount: function() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    document.getElementById('barackobama').style.height = h + 'px';
    document.getElementById('footer').style.height = h + 'px';
    document.getElementById('footer').style.right ='300px';
  },

  render: function() {
    return (
      <div>
        <script src="../../bower_components/jquery/dist/jquery.min.js"></script>
        <div id="barackobama">
          <div className="row">
            <div className="medium-12 columns">
              <h2 className="lets-talk-about text-white text-center">Lets talk about</h2>
              <h3 className="topic text-center text-white lets-talk-about">Golden State Warriors</h3>
              <a className="jumper" href="#pliip">Pliip</a> <br />
            </div>
          </div>
          <div className="row">
            <div className="large-6 small-centered columns">
              <Link to="signup" className="button large shadow round expand">Signup</Link>
            </div>
          </div>
        </div>

        <div className="bg">

          <div className="row" id="aboutTeam">
            <h1>Team</h1>
            <div className="medium-3 columns">
              <img className="profile" src="/img/travis.jpg" />
              <h3>Travis Chapman</h3>
              <h5>Development Team</h5>
              <h5>Full-stack Engineer</h5>
              <a href="http://www.github.com/teechap"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/GitHub-Mark-64px.png" /></a>
              <a href="https://www.linkedin.com/in/travisechapman"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/InBug-60px-R.png" /></a>
            </div>
            
            <div className="medium-3 columns">
              <img className="profile" src="/img/yan.jpg" />
              <h3>Yan Fan</h3>
              <h5>Scrum Master</h5>
              <h5>Full-stack Engineer</h5>
              <a href="http://www.github.com/yanarchy"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/GitHub-Mark-64px.png" /></a>
              <a href="https://www.linkedin.com/in/yanfan"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/InBug-60px-R.png" /></a>
            </div>
            
            <div className="medium-3 columns">
              <img className="profile" src="/img/jackson.jpg" />
              <h3>Jackson Hoose</h3>
              <h5>Product Owner</h5>
              <h5>Full-stack Engineer</h5>
              <a href="http://www.github.com/jacksonhoose"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/GitHub-Mark-64px.png" /></a>
              <a href="https://www.linkedin.com/in/jacksonhoose"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/InBug-60px-R.png" /></a>
            </div>
            
            <div className="medium-3 columns">
              <img className="profile" src="/img/alex.jpg" />
              <h3>Alexander Tseung</h3>
              <h5>Development Team</h5>
              <h5>Full-stack Engineer</h5>
              <a href="http://www.github.com/alextsg"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/GitHub-Mark-64px.png" /></a>
              <a href="https://www.linkedin.com/in/alextsg"><img className="logo" target="_blank" src="http://www.fanofyan.com/Images/InBug-60px-R.png" /></a>
            </div>
          
          </div>
        </div>
        <div className="bg">

          <div className="row" id="technologies">
            <h1>Stack</h1>
            <div className="medium-3 columns">
              <img className="tech" src='/img/chailogo.jpg' />
              <img className="tech" src='/img/circlelogo.png' />
              <img className="tech" src='/img/expressicon.png' />
            </div>
            <div className="medium-3 columns">
              <img className="tech" src='/img/foundationlogo.png' />
              <img className="tech" src='/img/gulpicon.png' />
              <img className="tech" src='/img/herokulogo.png' />
            </div>
            <div className="medium-3 columns">
              <img className="tech" src='/img/mochalogo.png' />
              <img className="tech" src='/img/mysqllogo.png' />
              <img className="tech" src='/img/nodelogo.png' />
            </div>=
            <div className="medium-3 columns">
              <img className="tech" src='/img/pubnublogo.png' />
              <img className="tech" src='/img/reacticon.png' />
              <img className="tech" src='/img/sequelizelogo.png' />
            </div>
          </div>
        </div>
        <div id="footer">
          <h2>TESTING</h2>
        </div>
      </div>
    );
  }
});

module.exports.Home = Home;
