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
  constructor (props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }
  searchHandler (e) {
    this.setState({ keyword: e.currentTarget.value || "" });
  }
  searchFilter (d) {
    let lowerCaseKeyword = this.state.keyword.toLowerCase();
    return [d.title, d.desc, d.last_date, d.event_date, d.category]
    .reduce((condition, key) => condition || key.toLowerCase().includes(lowerCaseKeyword), false);
  }
  render() {
    let eventList = this.props.data;
    let eventListDOM = eventList.filter(d => this.searchFilter(d)).map(e => (
      <Event id={e.title} data={e}/>
    ));
    return (
      <div>
        <h2> Event List </h2>
        <input type="text" className="form-control" placeholder="Search" onChange={e => this.searchHandler(e)} />
        {eventListDOM}
      </div>
    );
  }
}

class MenuTiles extends React.Component {
  render() {
    return (
      <div className={"pt-page pt-page-"+this.props.num}>
        <div className="rel">
          <div>
            <h1><span>Nsit's</span><strong>Moksha</strong> '15</h1>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

class RenderTiles extends React.Component {
  render() {
    let allTiles = this.props.data;
    let renderedTiles = allTiles.map(i => (<MenuTiles key={i.index} num={i.index}/>));
    return (
      <div id="pt-main" className="pt-perspective">
        {renderedTiles}
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

/*
$.getJSON('data/events.json', d => React.render(<App data={d} />, document.getElementById('root')))
.fail(() => React.render(<ServerError />, document.getElementById('root')));
*/

$.getJSON('data/tiles.json', d => {
  React.render(<RenderTiles data = {d} />, document.getElementById('root'));
})
.fail(() => React.render(<ServerError />, document.getElementById('root')));
