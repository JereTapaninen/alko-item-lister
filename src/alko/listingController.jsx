import React, {PureComponent} from "react";
import axios from "axios";
import _ from "underscore";
import ListingView from "./listingView";
import PropTypes from "prop-types";

const productUrlRegex = /(?<=<a href=").*(?=" tabindex="-1" class="js-product-link">)/g;
const productNameRegex = /(?<=<h1 class="product-name" itemprop="name">).*(?=<\/h1>)/;
const hardFactsRegex = /<div class="column hard-facts">/;
const listItemRegex = /<li class="column">/;
const factDataRegex = /(?<=<div class="small-h6 h6 fact-data">).*(?=<\/div>)/;
const alcoholRegex = />(ALKOHOLI|ALKOHOL|ALCOHOL)</;
const caloriesRegex = />(ENERGIA|ENERGI|ENERGY)</;
const literpriceRegex = />(LITRAHINTA|LITERPRIS|LITRE)</;
const sugarRegex = />(SOKERI|SOCKER|SUGAR)</;
const priceRegex = /(?<=itemprop="price" content=").*(?=" aria-label)/g;

class ListingController extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            listings: [],
            loading: true
        };

        this.start = this.start.bind(this);
        this.parseProductUrls = this.parseProductUrls.bind(this);
        this.createListings = this.createListings.bind(this);
        this.createListing = this.createListing.bind(this);
        this.unescape = this.unescape.bind(this);

        if (this.props.startImmediately === true) {
            this.start(this.props.alkoUrl);
        }
    }

    start(url) {
        return axios.get(url)
            .then(({data}) => this.parseProductUrls(data))
            .then(this.createListings)
            .then(() => {
                console.log("Done!");
                //this.setState({listings});
            })
            .catch(err => {
                console.error("Unexpected error during URL get/parsing", url, err);
            });
    }

    unescape(data) {
        const htmlEntities = [
            ["&#37;", "%"],
            ["&nbsp;", ""],
            ["&#47;", "/"]
        ];

        return htmlEntities.reduce((acc, [key, value]) => {
            return acc.replace(new RegExp(key, "g"), value);
        }, data);
    }

    createListing(productPageUrl) {
        const getListItem = (data, regex) => {
            const hardFacts = data.split(hardFactsRegex)[1];
            const listItems = (
                hardFacts
                    .split(listItemRegex)
                    .map(listItem => listItem.split("</li>")[0])
            );

            const listItem = listItems.find(listItem => listItem.match(regex));
            return listItem ? listItem.match(factDataRegex)[0] : "";
        };

        return axios.get(productPageUrl)
            .then(({data}) => _.unescape(data))
            .then(this.unescape)
            .then(data => {
                const listing = {
                    name: data.match(productNameRegex)[0],
                    alcohol: getListItem(data, alcoholRegex),
                    calories: getListItem(data, caloriesRegex),
                    literprice: getListItem(data, literpriceRegex),
                    sugar: getListItem(data, sugarRegex),
                    price: data.match(priceRegex)[0] + " €"
                };

                this.setState({listings: [...this.state.listings, listing]});

                return listing;
            });
    }

    createListings(productPageUrls) {
        this.setState({loading: false});
        return Promise.all(productPageUrls.map(this.createListing));
    }

    parseProductUrls(siteData) {
        return new Promise(resolve => {
            const productNames = (
                siteData
                    .match(productUrlRegex)
            );
            resolve(productNames);
        });
    }

    render() {
        return (
            <ListingView
                productData={this.state.listings}
                loading={this.state.loading}
            />
        );
    }
}

ListingController.propTypes = {
    alkoUrl: PropTypes.string.isRequired,
    startImmediately: PropTypes.bool.isRequired
};

export default ListingController;
