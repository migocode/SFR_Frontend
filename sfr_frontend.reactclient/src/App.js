import './App.css';
import React, { Component, useState } from 'react';
import { AutoComplete } from './components/AutoComplete.js';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autoCompleteItems: []
        };

        this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
        this.onFocusLost = this.onFocusLost.bind(this);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <AutoComplete autoCompleteItems={this.state.autoCompleteItems} onSearchTermChanged={this.onSearchTermChanged} onFocusLost={this.onFocusLost}/>
                </header>
            </div>
        );
    }

    onSearchTermChanged(searchTerm) {
        if (!searchTerm) return;
        fetch("https://localhost:7220/Cities/Lookup?searchTerm=" + searchTerm,
            {
                "method": "GET",
                "headers": {
                    "accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                this.setState({ autoCompleteItems: response });
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    onFocusLost(input) {
        console.log('Final value: ' + input);
    }
}

export default App;
