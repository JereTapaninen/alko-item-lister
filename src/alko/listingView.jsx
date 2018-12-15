import React from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";

const listingColumns = [
    {Header: "Name", accessor: "name"},
    {Header: "Alcohol %", accessor: "alcohol"},
    {Header: "Calories", accessor: "calories"},
    {Header: "Price per liter", accessor: "literprice"},
    {Header: "Sugar", accessor: "sugar"},
    {Header: "Price", accessor: "price"}
];

const ListingView = ({productData, loading}) => {
    return (
        <ReactTable
            columns={listingColumns}
            data={productData}
            pageSizeOptions={[5, 10, 20, 25, 50, 100, 250, 500, 1000]}
            defaultPageSize={20}
            loading={loading}
        />
    );
};

ListingView.propTypes = {
    productData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default ListingView;
