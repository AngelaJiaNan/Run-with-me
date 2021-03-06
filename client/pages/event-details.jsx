import React from 'react';
import GoogleMapReact from 'google-map-react';
import Delete from '../components/delete';

const Marker = () => <div><img src="/favicon.ico"/></div>;
export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      showModal: false
    };
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/events/${this.props.eventID}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ event: data });
      })
      .catch(err => {
        alert('There is a error ' + err);
      });
  }

  modalOpen() {
    this.setState({ showModal: true });
  }

  modalClose() {
    this.setState({ showModal: false });
  }

  render() {
    if (!this.state.event) return null;
    const { title, date, startingtime, address, city, state, lat, lng, eventID } = this.state.event;
    const modlat = parseFloat(lat);
    const modlng = parseFloat(lng);
    const mapCoordinates = { lat: modlat, lng: modlng };
    const modDate = date.split('T')[0];
    const modAddress = address.split('+').join(' ');
    const modCity = city.split('+').join(' ');
    const cityState = `${modCity}, ${state}`;

    return (
      <div>
        {this.state.showModal && <Delete eventID={eventID} modalOpen={this.modalOpen} modalClose={this.modalClose} />}
        <div className='eventdetail-container'>
          <a className='backbtn' href="#eventpage">
            &lt; Back to event
          </a>
          <div className='event-infor'>
            <div className='event-title'>
              <h2>{title}</h2>
            </div>
            <div className='event-content'>
              <p>Date: {modDate}</p>
              <p>Time: {startingtime}</p>
              <p>Address: {modAddress}</p>
              <p>{cityState}</p>
            </div>
            <div style={{ height: '50vh', width: '100%', padding: '20px' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyATRROv2KEQF0wX2e5OPR1CCbNaWFgrpcA' }}
                center={mapCoordinates}
                defaultZoom={12}
              >
                <Marker
                  lat={modlat}
                  lng={modlng}
                />
              </GoogleMapReact>
            </div>
          </div>
          <div className='event-btn'>
            <button className='delete-btn' onClick={this.modalOpen}>Delete</button>
            <a className='edit-btn' href={`#edit?eventID=${eventID}`}>Edit Events</a>
          </div>
        </div>
      </div>
    );
  }
}
