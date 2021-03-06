import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
//import { TextInput } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired,
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue(),
    };
  }

  componentDidMount() {
    console.log("ComponentDidmount");
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(
      this.onExternalChange
    );
  }

  componentWillUnmount() {
    console.log("Componentwillmount");
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    console.log("Value changed");
    this.setState({ value });
  };

  onChange = e => {
    alert("on change" + e);
    
    const value = e.target.value;

    alert("value"+ value);
    this.setState({ value });

    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  render() {
    console.log("Rendering started");
    const selectedOption  = this.state.value;

    return (
      <div className="App">
      <p> Can atleast this come </p>
      <Select
        value={selectedOption}
        onChange={this.onChange}
        options={options}
      />
      </div>
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

// Enabling hot reload
if (module.hot) {
  module.hot.accept();
}
