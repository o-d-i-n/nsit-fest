'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Event = (function (_React$Component) {
  _inherits(Event, _React$Component);

  function Event() {
    _classCallCheck(this, Event);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Event).apply(this, arguments));
  }

  _createClass(Event, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          this.props.data.title,
          " ",
          React.createElement(
            "small",
            null,
            React.createElement(
              "a",
              { href: "" },
              this.props.data.category
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-6 text-right" },
            "Last date: ",
            this.props.data.last_date
          ),
          React.createElement(
            "div",
            { className: "col-md-6" },
            "Event date: ",
            this.props.data.event_date
          )
        ),
        React.createElement(
          "p",
          null,
          this.props.data.desc
        )
      );
    }
  }]);

  return Event;
})(React.Component);

var EventList = (function (_React$Component2) {
  _inherits(EventList, _React$Component2);

  function EventList(props) {
    _classCallCheck(this, EventList);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(EventList).call(this, props));

    _this2.state = {
      keyword: ""
    };
    return _this2;
  }

  _createClass(EventList, [{
    key: "searchHandler",
    value: function searchHandler(e) {
      this.setState({ keyword: e.currentTarget.value || "" });
    }
  }, {
    key: "searchFilter",
    value: function searchFilter(d) {
      var lowerCaseKeyword = this.state.keyword.toLowerCase();
      return [d.title, d.desc, d.last_date, d.event_date, d.category].reduce(function (condition, key) {
        return condition || key.toLowerCase().includes(lowerCaseKeyword);
      }, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var eventList = this.props.data;
      var eventListDOM = eventList.filter(function (d) {
        return _this3.searchFilter(d);
      }).map(function (e) {
        return React.createElement(Event, { id: e.title, data: e });
      });
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          " Event List "
        ),
        React.createElement("input", { type: "text", className: "form-control", placeholder: "Search", onChange: function onChange(e) {
            return _this3.searchHandler(e);
          } }),
        eventListDOM
      );
    }
  }]);

  return EventList;
})(React.Component);

var App = (function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          " NSIT Fests"
        ),
        React.createElement(EventList, { data: this.props.data.events })
      );
    }
  }]);

  return App;
})(React.Component);

var ServerError = (function (_React$Component4) {
  _inherits(ServerError, _React$Component4);

  function ServerError() {
    _classCallCheck(this, ServerError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ServerError).apply(this, arguments));
  }

  _createClass(ServerError, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          " NSIT Fests"
        ),
        React.createElement(
          "h1",
          null,
          " We couldn't fetch the request :( "
        )
      );
    }
  }]);

  return ServerError;
})(React.Component);

$.getJSON('data/events.json', function (d) {
  return React.render(React.createElement(App, { data: d }), document.getElementById('root'));
}).fail(function () {
  return React.render(React.createElement(ServerError, null), document.getElementById('root'));
});