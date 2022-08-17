import React from 'react'
import styled from "styled-components";
import CustomDataTable from '../CustomDataTable'
import Sidebar from '../Sidebar'

const Humidity = () => {
    const url = "http://127.0.0.1:8000/SensorValueInfo/2/";
    const columns = [
        {
          name: "id",
          selector: row => row.id,
          sortable: true
        },
        {
          name: "sensor_id",
          selector: row => row.sensor_Id,
          sortable: true
        },
        {
          name: "humid_value",
          selector: row => row.value,
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
          selector: row => row.point_id,
          sortable: true
        }
    ];
    const search_column_field = 'value';
    const title_table = 'Humidity Log'

    return (
      <Div>
        <Sidebar />
        <CustomDataTable 
       url={url}
       columns={columns}
       search_column_field={search_column_field}
       title_table={title_table}
      />
      </Div>
      
    )
}

export default Humidity

const Div = styled.div`
  position: relative;
`;

