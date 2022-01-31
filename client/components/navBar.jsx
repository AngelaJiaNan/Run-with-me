import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ isOpen: false });
    this.handleMenuContent = this.handleMenuContent.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuclose = this.handleMenuclose.bind(this);
  }

  handleMenuOpen() {
    this.setState({ isOpen: true });
  }

  handleMenuContent() {
    this.setState({ isOpen: false });
  }

  handleMenuclose() {
    return (this.state.isOpen ? '' : 'hidden');
  }

  render() {
    const hidden = this.handleMenuclose();
    console.log('state:', this.state);
    return (
      <div className='row'>
        <div onClick={this.handleMenuOpen}className='icon'>
          <i className='fas fa-running'></i>
        </div>
        <div className='header'>
          <h1>Run With Me</h1>
        </div>
        <div onClick={this.handleMenuContent}className={`container ${hidden}`}>
          <nav className="menu-content">
            <a onClick={this.handleMenuContent} href='#'>Home</a>
            <a onClick={this.handleMenuContent} href= '#runs'>Runs</a>
            <a onClick={this.handleMenuContent} href='#create'>Create Events</a>
            <a onClick={this.handleMenuContent} href='#signup'>Sign In</a>
          </nav>
        </div>
      </div>
    );
  }
}
