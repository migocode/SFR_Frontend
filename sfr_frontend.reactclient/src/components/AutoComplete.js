import React, { Component, useState } from 'react';
import './AutoCompleteWebComponent.js';

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

        this.ref = React.createRef();
    }

    componentDidMount() {
        const current = this.ref.current;

        current.addEventListener('onTextChanged', customEvent =>
            this.handleOnInput(customEvent));
        current.addEventListener('onFocusOut', customEvent =>
            this.handleLostFocus(customEvent));
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
            <auto-complete-wc ref={this.ref} options={JSON.stringify(this.state.autoCompleteItems)}></auto-complete-wc>
        );
    }

    handleOnInput(event) {
        this.setState({ searchTerm: event.detail });
        this.state.onSearchTermChanged(event.detail);
    }

    handleLostFocus(event) {
        this.state.onFocusLost(event.detail);
    }
}