import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./_search.scss";

export default class Search extends Component {
  static propTypes = {
    onChangeKeyword: PropTypes.func.isRequired,
  };
  
  state = {
    label: "",
  };

  onChangeLabel = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { onChangeKeyword } = this.props;
    const { label } = this.state;

    onChangeKeyword(label);

    this.setState({
      label: "",
    });
  };

  render() {
    const { label } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="search"
          placeholder="Type to search..."
          onChange={this.onChangeLabel}
          value={label}
        />
      </form>
    );
  }
}
