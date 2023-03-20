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

const createServerSideDatasource = (server: any) => {
  return {
    getRows: (params: any) => {
      console.log(
        '[Datasource] - rows requested by grid: startRow = ' +
          params.request.startRow +
          ', endRow = ' +
          params.request.endRow,
      )
      console.log(JSON.stringify(params.request))
      // get data for request from our fake server
      var response = server.getData(params.request)
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          })
        } else {
          params.fail()
        }
      }, 1000)
    },
  }
}
function getLastRowIndex(request: IServerSideGetRowsRequest, results: any[]) {
  if (!results) return undefined
  var currentLastRow = (request.startRow || 0) + results.length
  return currentLastRow < (request.endRow || 0) ? currentLastRow : undefined
}
const createFakeServer = (allData: any[]) => {
  return {
    getData: (request: IServerSideGetRowsRequest) => {
      // in this simplified fake server all rows are contained in an array
      const requestedRows = allData.slice(request.startRow, request.endRow)
      // here we are pretending we don't know the last row until we reach it!
      const lastRow = getLastRowIndex(request, requestedRows)
      return {
        success: true,
        rows: requestedRows,
        lastRow: lastRow,
      }
    },
  }
}

type Props = {
  storeType: 'partial' | 'full'
}

export const DisplayGridFull = ({ storeType }: Props) => {
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

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('http://localhost:4000/olympic?') //https://www.ag-grid.com/example-assets/olympic-winners.json
      .then((res) => res.json())
      .then((data: any[]) => {
        // setup a fake server with a entire dataset
        const fakeServer = createFakeServer(data)
        // create datasource with a reference to the fake server
        const dataSource = createServerSideDatasource(fakeServer)
        // register the datasource with the grid
        params.api.setServerSideDatasource(dataSource)
      })
  }, [])
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          columnDefs={colDef}
          defaultColDef={defaultColDef}
          rowModelType={'serverSide'}
          pagination={true}
          paginationPageSize={500}
          animateRows={true}
          serverSideStoreType={storeType}
          onGridReady={onGridReady}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button type="button" className="" onClick={() => addRow(0)}>
          Add Row
        </button>
      </div>
    </div>
  )
}
