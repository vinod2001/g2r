import React, { useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ServerSideStoreType,
} from 'ag-grid-community'

type Props = {
  storeType: 'partial' | 'full'
}

export const DisplayGrid = ({ storeType }: Props) => {
  const [colDef, setColDef] = useState<ColDef[]>([
    // { field: 'number', valueGetter: 'node.rowIndex + 1' },
    {
      field: 'athlete',
      filter: 'agTextColumnFilter',
    },
    { field: 'country', filter: 'agTextColumnFilter' },
    { field: 'year', filter: 'agTextColumnFilter' },
    { field: 'sport', filter: 'agTextColumnFilter' },
    { field: 'gold', filter: 'agTextColumnFilter' },
    { field: 'silver', filter: 'agTextColumnFilter' },
    { field: 'bronze', filter: 'agTextColumnFilter' },
    { field: 'total', filter: 'agTextColumnFilter' },
  ])
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    }
  }, [])
  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const gridRef = useRef<AgGridReact>(null)

  const addRow = (index: number | undefined) => {
    const itemsToAdd: any = [
      {
        athlete: 'Rod White',
        country: 'United States',
        year: 2000,
        sport: 'Archery',
        gold: 0,
        silver: 0,
        bronze: 1,
        total: 1,
      },
    ]
    const tx = {
      addIndex: index,
      add: itemsToAdd,
    }

    gridRef.current?.api.applyServerSideTransaction(tx)
  }

  const datasource = {
    getRows(params: any) {
      //console.log(JSON.stringify(params.request))
      console.log(params.columnApi)
      const { startRow, endRow, filterModel, sortModel } = params.request
      let url = `http://localhost:4000/olympic?`
      // Sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0]
        url += `_sort=${colId}&_order=${sort}&`
      }
      //Pagination
      url += `_start=${startRow}&_end=${endRow}&`

      //Filtering
      const filterKeys = Object.keys(filterModel)
      filterKeys.forEach((filter) => {
        url += `${filter}=${filterModel[filter].filter}&`
      })
      fetch(url)
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          params.successCallback(response, 8618)
        })
        .catch((error) => {
          console.error(error)
          params.failCallback()
        })
    },
  }

  // const datasource = {
  //   getRows(params) {
  //     console.log(JSON.stringify(params.request, null, 1));
  //     const { startRow, endRow, filterModel, sortModel } = params.request
  //     let url = `http://localhost:4000/olympic?`
  //     //Sorting
  //     if (sortModel.length) {
  //       const { colId, sort } = sortModel[0]
  //       url += `_sort=${colId}&_order=${sort}&`
  //     }
  //     //Filtering
  //     const filterKeys = Object.keys(filterModel)
  //     filterKeys.forEach(filter => {
  //       url += `${filter}=${filterModel[filter].filter}&`
  //     })
  //     //Pagination
  //     url += `_start=${startRow}&_end=${endRow}`
  //     fetch(url)
  //       .then(httpResponse => httpResponse.json())
  //       .then(response => {
  //         params.successCallback(response, 499);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         params.failCallback();
  //       })
  //   }
  // };
  let count = 0
  const addData = () => {
    count = count + 1

    fetch('http://localhost:4000/olympic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: count,
        athlete: 'Vinod',
        age: 38,
        country: 'Kazakhstan',
        year: 2012,
        date: '12/08/2012',
        sport: 'Cycling',
        gold: 1,
        silver: 0,
        bronze: 0,
        total: 1,
      }),
    }).then((response) => {
      response.json()
      gridRef.current?.api.refreshServerSideStore({ purge: true })
    })
  }

  const onGridReady = (params: GridReadyEvent) => {
    // fetch('http://localhost:4000/olympic?') //https://www.ag-grid.com/example-assets/olympic-winners.json
    //   .then((res) => res.json())
    //   .then((data: any[]) => {
    //     // setup a fake server with a entire dataset
    //     const fakeServer = createFakeServer(data)
    //     // create datasource with a reference to the fake server
    //     const dataSource = createServerSideDatasource(fakeServer)
    //     // register the datasource with the grid
    //     params.api.setServerSideDatasource( )
    //   })
    params.api.setServerSideDatasource(datasource)
  }
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          columnDefs={colDef}
          defaultColDef={defaultColDef}
          rowModelType={'serverSide'}
          // pagination={true}
          // paginationPageSize={500}
          animateRows={true}
          serverSideStoreType={storeType}
          enableRangeSelection={true}
          onGridReady={onGridReady}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        {/* <button type="button" className="" onClick={() => addRow(0)}>
          Add Row
        </button> */}
        <button type="button" className="" onClick={() => addData()}>
          Add Row
        </button>
      </div>
    </div>
  )
}
