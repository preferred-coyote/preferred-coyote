var React = require('react');

var Contact = React.createClass({

  render: function() {
    return (
      <div>
        <div className="row" id="fromTheTop">
        	<div className="large-12 columns">
        		<h3>Contact Us!</h3>
        	</div>
        </div>
				<form id="form">
				  <div className="row">
				    <div className="large-3 columns">
				      <label>Name
				        <input type="text" placeholder="How should we address you?" />
				      </label>
				    </div>
				  </div>
				  <div className="row">
				    <div className="large-4 columns">
				      <label>E-mail Address
				        <input type="email" placeholder="hello@gmail.com" />
				      </label>
				    </div>
				  </div>
				  <div className="row">
				    <div className="large-4 columns">
				      <label>Company
				        <input type="text" placeholder="Hack Reactor" />
				      </label>
				    </div>
				  </div>
				  <div className="row">
				    <div className="large-3 columns">
				      <label>How did you find us?
				        <select>
				          <option value="hackreactor">Hack Reactor</option>
				          <option value="google">Google</option>
				          <option value="bing">I am a Microsoft employee and used Bing</option>
				          <option value="hackernews">Hacker News</option>
				        </select>
				      </label>
				    </div>
				  </div>
				  <div className="row">
				    <div className="large-12 columns">
				      <label>How can we help you?
				        <textarea placeholder="Questions, comments, advice, money"></textarea>
				      </label>
				    </div>
				  </div>
				</form>
				<div className="row" id="contactSubmit">
          <button type="submit" className="button small">Submit</button>
      	</div>
      </div>
    );
  }
});

module.exports.Contact = Contact;
