import React from "react";
import {tableData, tableHeaders} from "./mockData";
import Table from "./components/Table/Table";

function App() {
  return (
    <Table tableHeaders={tableHeaders} tableData={tableData} numberRowsToShow={10}/>
  )
}

export default App;
