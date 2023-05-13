import React, { useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ServerSideStoreType,
  SideBarDef,
} from 'ag-grid-community'
import { checkDomain, filterHeader } from '../utils/utils'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { camelCase } from 'lodash'
import { BarChart } from '../highChart/BarChart'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  storeType: 'partial' | 'full';
  theme: any;
  layout?: {
    type: string;
    withoutTab: number;
  };
  onGridReady: any;
  group?: string;
  groupStructure?: number;
  rowType?: string;
}

const horizondalAlignment = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  overflowY: 'scroll',
  '&Box': {
    width: '49%',
  },
}
const verticalAlignment = {
  width: '100%',
  overflowY: 'scroll',
  '& Box': {
    width: '100%',
  },
}

export const DisplayDynamicHeader = ({
  storeType,
  theme,
  layout,
  group,
  onGridReady,
  groupStructure,
  rowType,
}: Props) => {
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    }
  }, [])
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(
    () => ({ height: 'calc(100% - 110px)', width: '100%' }),
    [],
  )
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

  let count = 0
  const addData = () => {
    count = count + 1

    const { urls, numbers, addData } = checkDomain(count)
    if (urls) {
      fetch(urls, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addData),
      }).then((response) => {
        response.json()
        gridRef.current?.api.refreshServerSideStore({
          purge: true,
        })
      })
    }
  }

  const [height, setHeight] = React.useState()

  const checkHeight = (): string => {
    if (layout?.type === 'layout4' && group === 'tab') {
      return '100%'
    } else if (layout?.type === 'layout3' && group === 'tab') {
      return '92%'
    } else if (layout?.type === 'layout4' && group !== 'tab') {
      return '81%'
    } else if (layout?.type === 'layout3' && group !== 'tab') {
      return '94%'
    } else if (layout?.type === 'layout2' && group !== 'tab') {
      return '94%'
    } else if (layout?.type === 'layout2' && group === 'tab') {
      return '94%'
    } else if (layout?.type === 'layout1' && group !== 'tab') {
      return '98%'
    } else {
      return '100%'
    }
  }

  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
      ],
    }
  }, [])
  return (
    <Box
      style={{
        width: '100%',
        height: checkHeight(),
        overflowY: 'scroll',
      }}
    >
      {groupStructure === 2 && rowType === 'full' ? (
        <Box style={{ height: checkHeight() }}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              overflowY: 'scroll',
              height: checkHeight(),
            }}
          >
            <Box sx={{ width: '49%', height: '100%' }}>
              <div style={gridStyle} className={theme}>
                <AgGridReact
                  ref={gridRef}
                  // columnDefs={colDef}
                  defaultColDef={defaultColDef}
                  rowModelType={'serverSide'}
                  // sideBar={sideBar}
                  // pagination={true}
                  // paginationPageSize={500}
                  animateRows={true}
                  // sideBar={true}
                  serverSideStoreType={storeType}
                  enableRangeSelection={true}
                  onGridReady={onGridReady}
                />
              </div>
              <Box
                sx={{
                  width: 'auto',
                }}
                display="flex"
                justifyContent="space-between"
                style={{ marginTop: '10px' }}
              >
                {/* <button type="button" className="" onClick={() => addRow(0)}>
          Add Row
        </button> */}
                <Box display="flex">
                  <Button
                    variant="contained"
                    onClick={() => addData()}
                    style={{ marginRight: '10px' }}
                  >
                    Add Row
                  </Button>
                  <Button variant="contained">Publish</Button>
                </Box>
                <Box display="flex" justifyContent={'flex-end'}>
                  <Button variant="contained" style={{ marginRight: '10px' }}>
                    Save
                  </Button>
                  <Button variant="contained">Cancel</Button>
                </Box>
              </Box>
              <hr />
            </Box>
            <Box sx={{ width: '49%', height: '100%' }}>
              <BarChart />
            </Box>
          </Box>
          <BarChart />
        </Box>
      ) : (
        <Box
          style={{
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
          }}
        >
          <Box style={{ height: '100%' }}>
            <div style={gridStyle} className={theme}>
              <AgGridReact
                ref={gridRef}
                // columnDefs={colDef}
                defaultColDef={defaultColDef}
                rowModelType={'serverSide'}
                // sideBar={sideBar}
                // pagination={true}
                // paginationPageSize={500}
                animateRows={true}
                // sideBar={true}
                serverSideStoreType={storeType}
                enableRangeSelection={true}
                onGridReady={onGridReady}
              />
            </div>
            <Box
              sx={{
                width: 'auto',
              }}
              display="flex"
              justifyContent="space-between"
              style={{ marginTop: '10px' }}
            >
              {/* <button type="button" className="" onClick={() => addRow(0)}>
          Add Row
        </button> */}
              <Box display="flex">
                <Button
                  variant="contained"
                  onClick={() => addData()}
                  style={{ marginRight: '10px' }}
                >
                  Add Row
                </Button>
                <Button variant="contained">Publish</Button>
              </Box>
              <Box display="flex" justifyContent={'flex-end'}>
                <Button variant="contained" style={{ marginRight: '10px' }}>
                  Save
                </Button>
                <Button variant="contained">Cancel</Button>
              </Box>
            </Box>
            <hr />
          </Box>
          <Box sx={{ height: '100%' }}>
            <BarChart />
          </Box>
        </Box>
      )}
    </Box>
  )
}
