import React, { Component, Fragment } from 'react';

import Select from 'react-select';

export default class SingleSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

  render() {
		console.log(this.props.stops[0]);
    return (
      <Fragment>
        <Select
          className="basic-single"
					classNamePrefix="select"
          isSearchable={true}
          name="color"
					options={this.props.stops}
					valueKey='stop_id'
					labelKey='stop_id'
        />
      </Fragment>
    );
  }
}
