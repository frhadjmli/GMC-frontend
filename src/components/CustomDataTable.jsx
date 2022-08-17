import React, { useState } from "react";
import axios from 'axios'
import styled from "styled-components";
import DataTable, {createTheme} from "react-data-table-component";
import { FcRefresh } from "react-icons/fc";
import { useEffect } from "react";

const CustomDataTable = ({url,columns,search_column_field,title_table}) => {

  
  createTheme('new_dark',{
    text: {
      primary: '#f0f5f5',
      secondary: '#697a21',
    },
    background: {
      default: '#181717',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: 'rgba(224, 235, 235, .3)',
    },
    button: {
      default: '#697a21',
      hover: 'rgba(0,0,0,.08)',
      focus: '#181717',
      disabled: 'rgba(255, 255, 255, .34)',
    },
    sortFocus: {
      default: '#2aa198',
    },
  },
  'dark',
);

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
          <Section>
            <DataTable title={title_table}
              columns={columns}
              data={filteredItems}
              theme={"new_dark"}
              dense
              pagination
              highlightOnHover 
              fixedHeader
              fixedHeaderScrollHeight="550px" 
              subHeader
              subHeaderAlign="left"
              actions={<RefreshBtn onClick={()=>getItems()}>Refresh Data</RefreshBtn>}
              subHeaderComponent={
                <input type="text" placeholder="Search here" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    borderRadius:" 20px",
                    outline: "none",
                    backgroundColor: "#212121",
                    color: "white",
                    border: "none",
                    height: "30px",
                    width: "30%",
                    fontSize: "13px",
                    textAlign: "center" }}/>}
              />     
          </Section>  

  );
}

export default CustomDataTable;



const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    margin-left: 0vw;
    }
  `;

const RefreshBtn = styled.button`

  background-color: #676666;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  display: block;
  font-size: 14px;
  margin: 0;
  outline: 0;
  padding: 6px 14px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  transition-duration: 0.4s;


&:hover {
  background-color: #697a21;
  text-decoration: none;
  color: black;
  
}

`;