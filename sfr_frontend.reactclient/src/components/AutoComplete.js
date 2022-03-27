import React, { Component, useState } from 'react';

export class AutoComplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onSearchTermChanged: props.onSearchTermChanged,
            onFocusLost: props.onFocusLost,
            autoCompleteItems: props.autoCompleteItems,
            searchTerm: ''
        };

        this.handleOnInput = this.handleOnInput.bind(this);
        this.handleLostFocus = this.handleLostFocus.bind(this);
    }

    static getDerivedStateFromProps(props, current_state) {
        if (Array.isArray(props.autoCompleteItems)) {
            return { autoCompleteItems: props.autoCompleteItems };
        }
        return { autoCompleteItems: [] };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error);
        console.log(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return (
            <div>
                <label htmlFor="exampleDataList" className="form-label">Auto Complete Component</label>
                <input className="form-control" list="datalistOptions"
                    value={this.state.searchTerm}
                    id="exampleDataList"
                    onInput={this.handleOnInput}
                    onBlur={this.handleLostFocus}
                    placeholder="Type to search..." />
                <datalist id="datalistOptions">
                    {this.state.autoCompleteItems?.map(item => <option key={ item } value={ item } />) }
                </datalist>
            </div>
        );
    }

    handleOnInput(eventArgs) {
        this.setState({ searchTerm: eventArgs.target.value });
        this.state.onSearchTermChanged(eventArgs.target.value);
    }

    handleLostFocus(eventArgs) {
        this.state.onFocusLost(this.state.searchTerm);
    }
}