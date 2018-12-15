import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow, mount} from "enzyme";
import {expect} from "chai";
import ListingController from "../../src/alko/listingController";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

const testData = [
    [
        "https://www.alko.fi/tuotteet/486837/Codici-Negroamaro-Primitivo-2016",
        {
            name: "Codici Negroamaro Primitivo 2016",
            alcohol: "14.0%",
            calories: "80.0 kcal/100 ml",
            literprice: "13.17 EUR",
            sugar: "12.0 g/l",
            price: "9.98 €"
        }
    ]
];

describe("ListingController", function() {
    it("should mount", function() {
        wrapper = mount(
            <ListingController
                alkoUrl={""}
                startImmediately={false}
            />
        );

        expect(wrapper.exists()).to.equal(true);
    });

    describe("start()", function() {
        it("should throw error for bad URL", function() {
            wrapper = shallow(
                <ListingController
                    alkoUrl={""}
                    startImmediately={true}
                />
            );

            // A necessary evil...
            wrapper.instance().start("")
                .then(function() {
                    expect(false).to.be(true);
                })
                .catch(function() {
                    expect(true).to.be(true);
                });
        });
    });

    describe("unescape()", function() {
        it("should unescape HTML entities", function() {
            wrapper = shallow(
                <ListingController
                    alkoUrl={""}
                    startImmediately={false}
                />
            );

            const stringBefore = "40&#37;&nbsp;&#47;5&#37;";
            const stringAfter = "40%/5%";

            expect(wrapper.instance().unescape(stringBefore)).to.equal(stringAfter);
        });
    });

    describe("createListing()", function() {
        it("should return correct values for a page", function() {
            wrapper = shallow(
                <ListingController
                    alkoUrl={""}
                    startImmediately={false}
                />
            );

            wrapper.instance().createListing(testData[0][0])
                .then(function(results) {
                    objectEquals(results, testData[0][1]);
                });
        });
    });
});

function objectEquals(obj1, obj2) {
    expect(JSON.stringify(obj1)).to.equal(JSON.stringify(obj2));
}