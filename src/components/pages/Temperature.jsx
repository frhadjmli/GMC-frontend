import React, { useState } from "react";
import axios from 'axios'
import styled from "styled-components";
import Sidebar from "../Sidebar";
import DataTable from "react-data-table-component";
import { useEffect } from "react";

const Temperature = () => {

    const [search, setSearch] =useState("");
    const [temperature, setTemperature] =useState([]);
    const [filteredTemperature, setFilteredTemperature] =useState([]);
    

    const getTemperature = async () => {
        try{
            const response = await axios.get("http://127.0.0.1:8000/tempSensor/");  
            setTemperature(response.data);
            setFilteredTemperature(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
          name: "id",
          selector: row => row.id,
          sortable: true
        },
        {
          name: "sensor_id",
          selector: row => row.sensor_id,
          sortable: true
        },
        {
          name: "temp_value",
          selector: row => row.temp_value,
          sortable: true,
        },
        {
          name: "recorded_time",
          selector: row => row.recorded_time,
          sortable: true
        },
        {
          name: "date_time",
          selector: row => row.date_time,
          sortable: true
        },
        {
          name: "point",
          selector: row => row.point,
          sortable: true
        }
      ];

    useEffect(() =>{
        getTemperature();
    }, []);

    useEffect(() =>{
      const result = temperature.filter(tmpr => {
          return tmpr.temp_value.toString().toLowerCase().match(search.toLowerCase());
      });
      
      setFilteredTemperature(result);

    }, [search]);

    return (
        <Div clasNames="flex-container">
            <div className="flex-item-left"><Sidebar /></div>
            <div className="flex-item-right"><DataTable title="Temprature Log"
                                                        columns={columns}
                                                        data={filteredTemperature}
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

export default Temperature

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