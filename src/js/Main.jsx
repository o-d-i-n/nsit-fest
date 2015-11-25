'use strict';

class Event extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.data.title} <small><a href="">{this.props.data.category}</a></small></h3>
        <div className="row">
          <div className="col-md-6 text-right">Last date: {this.props.data.last_date}</div>
          <div className="col-md-6">Event date: {this.props.data.event_date}</div>
        </div>
        <p>{this.props.data.desc}</p>
      </div>
    );
  }
}

class EventList extends React.Component {
  render() {
    let eventList = this.props.data;
    let eventListDOM = eventList.map(e => {
      return (
        <Event id={e.title} data={e}/>
      );
    });
    return (
      <div>
        {eventListDOM}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1> NSIT Fests</h1>
        <EventList data={this.props.data.events}/>
      </div>
    );
  }
}

class ServerError extends React.Component {
  render() {
    return (
      <div>
        <h1> NSIT Fests</h1>
        <h1> We couldn't fetch the request :( </h1>
      </div>
    );
  }
}

$.getJSON('data/events.json', d => React.render(<App data={d} />, document.getElementById('root')))
.fail(() => React.render(<ServerError />, document.getElementById('root')));
