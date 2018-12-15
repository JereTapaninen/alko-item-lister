import React, {PureComponent} from "react";
import ListingController from "./alko/listingController.jsx";

export const alkoUrl = "https://www.alko.fi/tuotteet/tuotelistaus?SearchTerm=*&PageSize=76&PageNumber=100";

class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Alko Item Listing</h1>
                <ListingController
                    alkoUrl={alkoUrl}
                    startImmediately={true}
                />
            </div>
        );
    }
}

export default App;
