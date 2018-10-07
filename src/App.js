import React, { Component } from 'react';
import './App.css';
import squirrel from './images/squirrelThumbnail.jpg';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCaretDown, faComment, faRetweet, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { DropdownButton, MenuItem } from 'react-bootstrap';

library.add(faStar); // adds an icon to lib
library.add(faCaretDown);
library.add(faComment);
library.add(faRetweet); // adds an icon to lib
library.add(faHeart);
library.add(faEnvelope);

// Variables


// App component renders entire App
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Luis Martinez',
      user: 'luismartinez',
      msg: 'Rooms oh fully taken by worse do. Points afraid but may end law lasted. Was out laughter raptures returned outweigh.',
      postTime: new Date('October 6, 2018 03:24:00'),
      repostUser: 'johncrichton',
      resportUserName: 'John Crichton',
      repostMsg: 'Luckily cheered colonel me do we attacks on highest enabled. Tried law yet style child. Bore of true of no be deal. Frequently sufficient in be unaffected. The furnished she concluded depending procuring concealed. ',
      postDate: 'October 6, 2018 03:24:00',
      comments: 40,
      reposts: 177,
      likes: 1100
    };
  }
  render() {
    // postAge function takes a date as argument and returns an age in the following formats as an example: Now, 25m, 13h, Oct 3, 2017
    const postAge = function (myDate) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let now = new Date();
      let postAge = '';
      let thisYearFirstDay = new Date();
      thisYearFirstDay.setHours(0, 0, 0)
      thisYearFirstDay.setMonth(0, 1);
      if ((now - myDate) / 1000 < 60) {
        return 'Now'
      }
      if ((now - myDate) / 1000 < 3600) {
        postAge = Math.floor((now - myDate) / 60000);
        return postAge + 'm';
      }
      if ((now - myDate) / 1000 < (3600 * 24)) {
        postAge = Math.floor((now - myDate) / 3600000);
        return postAge + 'h';
      }
      if ((now - myDate) <= (now - thisYearFirstDay + 1000)) {
        let postMonth = myDate.getMonth();
        return months[postMonth] + ' ' + myDate.getDate();
      }
      return myDate.getFullYear();
    }
    // formatNum function takes number as argument and if it's larger than 1000, it returns it in the form (e.g.) 1.2K, otherwise it returns the number itself
    const formatNum = function (num) {
      if (num > 999) {
        return Math.floor(num/1000) + '.' + Math.floor((num-1000)/100) + 'K';
      } else {
        return num;
      }
    }
    return (
      <div className="App">
        <div className='card-container'>
          <div className='card-wrapper'>
            <div className='user-thumbnail'>
              <img src={squirrel} alt="user id" />
            </div>
            <div className='card-main'>
              <Header userName={this.state.userName} user={this.state.user} time={postAge(new Date(this.state.postDate))} />
              <MsgWrapper repostUser={this.state.repostUser} msg={this.state.msg} />
              <Repost userName={this.state.resportUserName} user={this.state.repostUser} msg={this.state.repostMsg} />
              <Footer comments={formatNum(this.state.comments)} reposts={formatNum(this.state.reposts)} likes={formatNum(this.state.likes)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Heade renders header of social card. Including thumbnail image, username, post time and dropdown menu
class Header extends Component {
  render() {
    return (
      <div className='header-wrapper'>
        <FullUserName userName={this.props.userName} user={this.props.user} />
        <small className='time'>
          <a>
            <time datetime="2018-10-05 14:00"><span className='post-time'>{this.props.time}</span></time>
            <span className='hidden'>50 minutes ago</span>
          </a>
        </small>
        <div className='dropdown-wrapper'>
          <DropdownHeader />
        </div>
      </div>
    );
  }
}

// FullUserName renders part of header with user name, badge and @userName
class FullUserName extends Component {
  render() {
    return (
      <a>
        <span>
          <strong className='user-title'>{this.props.userName}</strong>
          <span className='badge-span'>
            <FontAwesomeIcon icon={faStar} className='badge-icon' />
            <span className='hidden'>Verified account</span></span>
        </span>
        <span className='user-name'>@{this.props.user}</span>
      </a>
    );
  }
}

class DropdownHeader extends Component {
  render() {
    return (
      <DropdownButton noCaret title={caret} pullRight bsStyle='custom' className='dropdown-button'>
        <MenuItem><span className='dropdown-item'>Copy link to message</span></MenuItem>
        <MenuItem><span className='dropdown-item'>Embed message</span></MenuItem>
        <MenuItem><span className='dropdown-item'>Mute @username</span></MenuItem>
        <MenuItem><span className='dropdown-item'>Block @username</span></MenuItem>
        <MenuItem><span className='dropdown-item'>Report comment</span></MenuItem>
        <MenuItem divider />
        <MenuItem><span className='dropdown-item'>Add to new Moment</span></MenuItem>
      </DropdownButton>
    );
  }
}

const caret = (<FontAwesomeIcon icon={faCaretDown} />);

class MsgWrapper extends Component {
  render() {
    return (
      <div className='msg-container'>
        <p className='msg-content'>{this.props.msg}</p>
        <p className='msg-source'>@{this.props.repostUser}</p>
      </div>
    );
  }
}

class Repost extends Component {
  render() {
    return (
      <div className='repost-wrapper'>
        <div className='repost-box'>
          <FullUserName userName={this.props.userName} user={this.props.user} />
          <p>{this.props.msg}</p>
        </div>
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className='footer-box'>
        <span className='footer-section footer-comments'>
          <span className='footer-icon-wrapper'><FontAwesomeIcon icon={faComment} className='footerIcon' /></span>
          <span className='footer-text'>{this.props.comments}</span>
        </span>
        <span className='footer-section footer-repost'>
          <span className='footer-icon-wrapper'><FontAwesomeIcon icon={faRetweet} className='footerIcon' /></span>
          <span className='footer-text'>{this.props.reposts}</span>
        </span>
        <span className='footer-section footer-like'>
          <span className='footer-icon-wrapper'><FontAwesomeIcon icon={faHeart} className='footerIcon' /></span>
          <span className='footer-text'>{this.props.likes}</span>
        </span>
        <span className='footer-section footer-msg'><FontAwesomeIcon icon={faEnvelope} className='footerIcon' /></span>
      </div>
    );
  }
}

export default App;
