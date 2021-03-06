import React from 'react';
import DatePicker from 'react-datepicker';

export default class RunForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      duration: '',
      distance: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
  }

  handleDate(date) {
    this.setState({
      date: date
    });
  }

  handleDuration(event) {
    this.setState({
      duration: event.target.value
    });
  }

  handleDistance(event) {
    this.setState({
      distance: event.target.value
    });
  }

  handleSubmit(event) {
    const token = window.localStorage.getItem('user-jwt');
    event.preventDefault();
    fetch('/api/runninglogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(this.state)
    })
      .then(() => {
        this.setState({
          date: '',
          duration: '',
          distance: ''
        });
        this.props.togglerunform();
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <div className='modal-container'>
        <div className='form-modal'>
          <div className='run-container'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-inputs'>
                <label>Date</label>
                  <DatePicker selected={this.state.date}
                  onChange={date => this.handleDate(date)}/>
              </div>
              <div className='form-inputs'>
                <label>Duration</label>
                <input
                name="duration"
                type="text"
                id="duration"
                value={this.state.duration}
                onChange={this.handleDuration} />
              </div>
              <div className='form-inputs'>
                <label>Distance</label>
                <input
                name="distance"
                type="text"
                id="distance"
                value={this.state.distance}
                onChange={this.handleDistance} />
              </div>
              <div className='event-btn'>
                <button className='edit-btn' onClick={this.props.togglerunform}>Cancel</button>
                <button type='submit'>Add Run</button>
              </div>
            </form>
      </div>
      </div>
    </div>
    );
  }
}
