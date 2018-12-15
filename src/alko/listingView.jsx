import React from "react";
import ReactTable from "react-table";

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

export default ListingView;
