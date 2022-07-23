import React, { useState } from "react";
import axios from 'axios'
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { useEffect } from "react";

const CustomDataTable = ({url,columns,search_column_field,title_table}) => {

    const [search, setSearch] =useState("");
    const [items, setItems] =useState([]);
    const [filteredItems, setfilteredItems] =useState([]);
    
    const getItems = async () => {
        try{
            const response = await axios.get(url);  
            setItems(response.data);
            setfilteredItems(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() =>{
        getItems();
    }, []);

    useEffect(() =>{
      const result = items.filter(item => {
          return item[search_column_field].toString().toLowerCase().match(search.toLowerCase());
      });
      
      setfilteredItems(result);

    }, [search]);

    return (
        <Div clasNames="flex-container">
            <div className="flex-item-left"><Sidebar /></div>
            <div className="flex-item-right"><DataTable title={title_table}
                                                        columns={columns}
                                                        data={filteredItems}
                                                        pagination
                                                        highlightOnHover 
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="550px" 
                                                        subHeader
                                                        subHeaderAlign="left"
                                                        subHeaderComponent={
                                                            <input type="text" placeholder="Search here" value={search}
                                                             onChange={(e) => setSearch(e.target.value)}
                                                             style={{
                                                                borderRadius:" 20px",
                                                                outline: "none",
                                                                backgroundColor: "#697A21",
                                                                color: "white",
                                                                border: "none",
                                                                height: "50px",
                                                                width: "30%",
                                                                fontSize: "15px",
                                                                textAlign: "center"
                                                             }}/>
                                                        }
                                                      />
            </div> 
        </Div>

      ); 


}

export default CustomDataTable;

const Div = styled.div`
  
  display: flex;
  flex-direction: row;
  
  .flex-item-left {
    flex: 20%;
  }
  
  .flex-item-right {
    flex: 80%;
  }

  @media (max-width: 800px) {
    .flex-item-left, .flex-item-right  {
      flex: 100%;
      flex-direction: column;
    }

`;