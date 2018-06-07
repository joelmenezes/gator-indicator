import React, { Component, Fragment } from 'react';

import Select from 'react-select';

export default class SingleSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	onSourceChange = (source) => {
		console.log(source);
	}

	onDestinationChange = (destination) => {
		console.log(destination);
	}

	render() {
		let stops = this.props.stops.splice(0, 10);
		return (
			<Fragment>
			<Select
				placeholder="Source"
				classNamePrefix="select"
				isSearchable={true}
				options={stops}
				isClearable={true}
				onChange={this.onSourceChange}
			/>
			<Select
				placeholder="Destination"
				classNamePrefix="select"
				isSearchable={true}
				options={stops}
				isClearable={true}
				onChange={this.onDestinationChange}
			/>
			</Fragment>
		);
	}
}
