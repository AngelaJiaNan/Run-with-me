import React from 'react';
import EventCard from './event-cards';

export default class EventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        this.setState({ events: data });
      });
  }

  render() {
    const events = this.state.events;
    const allEvents = events.map(event => (
      <EventCard event={event} key={event.eventID}/>
    ));
    return (
      <ul className='allevents-container'>{allEvents}</ul>
    );
  }
}
