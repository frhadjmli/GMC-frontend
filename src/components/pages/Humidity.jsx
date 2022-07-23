import React from 'react'
import CustomDataTable from '../CustomDataTable'
const Humidity = () => {
    const url = "http://127.0.0.1:8000/HumdSensor/";
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
          name: "humd_value",
          selector: row => row.humd_value,
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
    const search_column_field = 'humd_value';
    const title_table = 'Humidity Log'

  return (
    <CustomDataTable 
     url={url}
     columns={columns}
     search_column_field={search_column_field}
     title_table={title_table}
    />
  )
}

export default Humidity

