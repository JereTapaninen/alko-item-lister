import React, {PureComponent} from "react";
import ListingController from "./alko/listingController.jsx";

class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Alko Item Listing</h1>
                <ListingController />
            </div>
        );
    }
}

export default App;
