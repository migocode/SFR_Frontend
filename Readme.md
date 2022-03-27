# SFR_Frontend Exercise

Michael Goll - se21m003

## Implementation Details

- **Blazor**
    - Project: SFR_Frontend.Client
- **React**
    - Project: sfr_frontend.reactclient
- **Backend API**
    - Project: SFR_Frontend.Server

Both, Blazor and React SPA implement a `AutoComplete` Component which offers properties to register callbacks
for changed input values to retrieve new list of values for the auto-completion (= `onSearchTermChanged`) as well as notifying the parent
component when the final input value is set (after the focus has been lost = `onFocusLost`).

Values for the auto-completion are retraieved from the Backend API where they are hard coded. The values are the **nine capital cities of Austria**.