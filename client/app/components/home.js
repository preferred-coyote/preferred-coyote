/** @jsx React.DOM */

var React = require('react/addons');
var Link = require('react-router').Link;


var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var Home = React.createClass({

  componentDidMount: function() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    document.getElementById('barackobama').style.height = h + 'px';
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });
    $('.scrollToTop').click(function() {
      $('html, body').animate({scrollTop : 0},800);
      return false;
    });

    $(window).load(function() {
      $('.flexslider').flexslider({
        controlNav: false,
        directionNav: false,
        animationSpeed: 800,
        slideshowSpeed: 3000,
        randomize: true,
        animation: 'fade',
        easing: 'swing'
      });
    });
  },

  render: function() {
    return (
      <div>
        <a className="scrollToTop" href="#">To The Top ^</a> <br />
        <div id="barackobama">
          <div className="row">
            <div className="medium-12 columns">
              <h2 className="lets-talk-about text-white text-center">Let's talk about</h2>
              <div className="flexslider">
                <ul className="slides">
                  <li>Kandinsky</li>
                  <li>Tetris</li>
                  <li>JavaScript</li>
                  <li>Jackie Chan</li>
                  <li>San Francisco Housing Prices</li>
                  <li>Full-Contact Yodelling</li>
                  <li>Chess Strategy</li>
                  <li>Tap-Dancing</li>
                  <li>Hash Tables & Regex</li>
                  <li>Cooking with Butter</li>
                  <li>The NSA</li>
                  <li>American Ninja Warrior</li>
                  <li>Elaborate Kites</li>
                  <li>Raising Backyard Chickens</li>
                  <li>Fly Fishing</li>
                  <li>Eagle Scouts</li>
                  <li>Krav Maga</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="large-6 small-centered columns">
              <Link to="signup" className="button large shadow round expand">Signup</Link>
            </div>
          </div>
        </div>
        <div className="bg-about">
          <div className="row">

          </div>
        </div>

        <div className="bg">
          <a name="pliip"/>
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
        <div className="divider">
        </div>
        <div className="bg-tech">

          <div className="row" id="technologies">
            <h1>Stack</h1>
            <div className="medium-3 columns">
              <img className="tech" src='/img/reacticon.png' />
              <img className="tech" src='/img/mysqllogo.png' />
              <img className="tech" src='/img/gulpicon.png' />
            </div>
            <div className="medium-3 columns">
              <img className="tech" src='/img/nodelogo.png' />
              <img className="tech" src='/img/sequelizelogo.png' />
              <img className="tech" src='/img/circlelogo.png' />
            </div>
            <div className="medium-3 columns">
              <img className="tech" src='/img/expressicon.png' />
              <img className="tech" src='/img/pubnublogo.png' />
              <img className="tech" src='/img/mochalogo.png' />
            </div>
            <div className="medium-3 columns">
              <img className="tech" src='/img/herokulogo.png' />
              <img className="tech" src='/img/foundationlogo.png' />
              <img className="tech" src='/img/chailogo.jpg' />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports.Home = Home;
