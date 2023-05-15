import { DisplayDynamicHeader } from '../agGrid/AgGridDynamic'
import { GroupMenus } from './GroupMenus'
import { TableHeaderMenu } from './TableHeaderMenu'
import { TabComponent } from './Tabs'
import { filterHeader, checkDomain } from '../utils/utils'
import { AgGridReact } from 'ag-grid-react'
import { NavigationButton } from './NavigationButton'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { BarChart } from '../highChart/BarChart'
import Box from '@mui/material/Box'
import { SlicersGroup } from './SlicersGroup'
import { GridReadyEvent } from 'ag-grid-community'
import { useEffect, useRef, useState } from 'react'
import { AutocompleteComponent } from './Autocomplete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ColumnPicker } from './ColumnPicker'
import { Button } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { Kpis } from './Kpis'

type Props = {
  tableHeader: string;
  group: string;
  filter: boolean;
  slicers?: boolean;
  sideSlicers?: boolean;
  layout: {
    type: string;
    withoutTab: number;
  };
  setSlicers?: (args: any) => void;
  id: number;
  navigation?: {};
  groupStructure?:number;
  rowType?:string;
}
interface newFilter {
  sport: string[];
  year: string[];
}
interface secondFilterInterface {
  sport: string[];
  year: string[];
}
export const Groups = ({
  tableHeader,
  group,
  filter,
  slicers,
  sideSlicers,
  layout,
  id,
  setSlicers,
  navigation,
  groupStructure,
  rowType,
}: Props) => {
  const [newFilterModel, setNewFilterModel] = useState<newFilter>({
    sport: [],
    year: [],
  })
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#f5f7f8',
      padding: '10px',
    },
    paper: {
      padding: '10px',
      color: theme.palette.text.secondary,
      backgroundColor: '#fff',
    },
    pad: {
      padding: '10px',
    },
    mar: {
      marginTop: '10px',
    },
    fileUploader: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: '#fff',
      borderRadius: '20px',
      padding: '20px',
      width: '100%',
      boxSizing: 'border-box',
    },
    h4: {
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    dropzone: {
      height: '168px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed #d1ddf8',
      borderRadius: '20px',
      cursor: 'pointer',
      padding: '15px',
    },
  }))
  const [rowData, setRowData] = useState<any>([]);
  const [newParam, setNewParam] = useState<any>()

  const gridRef = useRef<AgGridReact>(null)

  const [newValueUrl, setnewValueUrl] = useState('')
  const { urls } = checkDomain(0)
  const [isKpi, setKpi] = useState(false)
  useEffect(() => {
    // console.log(layout.type);
    let { urls, numbers } = checkDomain(0)
    // let urls = urls;
    let url: string = urls + ''

    if (newFilterModel.sport.length > 0)
      url =
        url +
        newFilterModel.sport.map((val) =>
          urls == 'https://jsonplaceholder.typicode.com/comments?'
            ? 'postId=' + val + '&'
            : 'sport=' + val + '&',
        )
    if (newFilterModel.year.length > 0)
      url =
        url +
        newFilterModel.year.map((val) =>
          urls == 'https://jsonplaceholder.typicode.com/comments?'
            ? `email=${val}&`
            : `year=${val}&`,
        )

    setnewValueUrl(url.replace(',', ''))

    fetch(url.replace(',', ''))
      .then((httpResponse) => httpResponse.json())
      .then((response) => {
        // if (newParam) {
        //   newParam.successCallback(response)
        //   newParam.api.setColumnDefs(filterHeader(response))
        // }
        setRowData(response);
      })
      .catch((error) => {
        console.error(error)
      })
  }, [newFilterModel])

  // const datasource = {
  //   getRows(params: any) {
  //     setNewParam(params)
  //     const { urls, numbers }: any = checkDomain(0)
  //     // console.log(process.env);
  //     // console.log(`params:${params}`);
  //     const { startRow, endRow, filterModel, sortModel } = params.request
  //     // if (urls) {
  //       let url = 'https://jsonplaceholder.typicode.com/comments?' // urls
  //       // Sorting
  //       if (sortModel.length) {
  //         const { colId, sort } = sortModel[0]
  //         url += `_sort=${colId}&_order=${sort}&`
  //       }
  //       //Pagination
  //       url += `_start=${startRow}&_end=${endRow}&`

  //       //Filtering
  //       const filterKeys = Object.keys(filterModel)
  //       filterKeys.forEach((filter) => {
  //         const value =
  //           filterModel[filter].filter.charAt(0).toUpperCase() +
  //           filterModel[filter].filter.slice(1)
  //         url += `${filter}=${value}&`
  //       })

  //       fetch(url)
  //         .then((httpResponse) => httpResponse.json())
  //         .then((response) => {
  //           params.successCallback(response, numbers)
  //           // console.log(response, numbers);

  //           params.api.setColumnDefs(filterHeader(response))
  //         })
  //         .catch((error) => {
  //           console.error(error)
  //           params.failCallback()
  //         })
  //     // }
  //   },
  // }

  useEffect(()=>{
    //const { urls, numbers }: any = checkDomain(0)
    if(rowData.length==0){
    fetch('https://jsonplaceholder.typicode.com/comments?')
    .then((res) => res.json())
    .then(data=>setRowData(data))
    }
  },[rowData])
  // const onGridReady = useCallback((params) => {
  //   if(rowData.length==0){
  //     fetch('https://jsonplaceholder.typicode.com/comments?')
  //     .then((res) => res.json())
  //     .then(data=>setRowData(data))
  //     }
  // }, []);

  // const onGridReady = (params: GridReadyEvent) => {
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
    // if (newFilterModel) {
    //   params.api.setServerSideDatasource(params.successCallback(newParam));
    // }

    // params.api.setServerSideDatasource(datasource)
    // setRowData(datasource);

  // }
  const classes = useStyles()
  const maxLength = 20
  const filesArray: any[] = []
  const fileValidator = (file: any) => {
    filesArray.push(file.name)
    // console.log(
    //   "fileValidator",
    //   filesArray.indexOf(file.name),
    //   filesArray.indexOf(file.name) === -1
    // );
    if (file.name.length > maxLength) {
      return {
        code: 'name-too-large',
        message: `Name is larger than ${maxLength} characters`,
        type: file.type,
      }
    }
    if (filesArray.indexOf(file.name) === -1) {
      return {
        code: 'same-filename',
        message: `the file name "${file.name}" is already exist`,
        type: file.type,
      }
    }
    return null
  }
  const [dropFiles, setDropFiles] = useState()

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    validator: fileValidator,
    onDrop: (acceptedFiles: any) => {
      setDropFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })
  return (
    <>
      {group === 'group' && layout?.type === 'layout1' && (
        <Box style={{ height: '100%' }}>
          <Box className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                <Paper className={clsx(classes.paper, 'paper')}>
                  <GroupMenus
                    heading={'Tabel2'}
                    filter={filter}
                    group={'group'}
                    slicers={slicers}
                    sideSlicers={sideSlicers}
                    onGridReady={rowData}
                    newFilterModel={newFilterModel}
                    setNewFilterModel={setNewFilterModel}
                    id={id}
                  />
                  <TableHeaderMenu
                    heading={tableHeader}
                    filter={filter}
                    slicers={slicers}
                    sideSlicers={sideSlicers}
                    id={id}
                    setSlicers={setSlicers}
                    newFilterModel={newFilterModel}
                    setNewFilterModel={setNewFilterModel}
                  />
                  <DisplayDynamicHeader
                    storeType="partial"
                    theme="ag-theme-alpine"
                    layout={layout}
                    onGridReady={rowData}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.pad}>
                  <AutocompleteComponent
                    newFilterModel={newFilterModel}
                    setNewFilterModel={setNewFilterModel}
                    id={id}
                    setSlicers={setSlicers}
                    nameSlicer={
                      urls == 'https://jsonplaceholder.typicode.com/comments?'
                        ? 'PostId'
                        : 'Sport'
                    }
                  />
                </Paper>
                <Paper className={clsx(classes.pad, classes.mar)}>
                  <AutocompleteComponent
                    newFilterModel={newFilterModel}
                    setNewFilterModel={setNewFilterModel}
                    id={id}
                    setSlicers={setSlicers}
                    nameSlicer={
                      urls == 'https://jsonplaceholder.typicode.com/comments?'
                        ? 'Email'
                        : 'Year'
                    }
                  />
                </Paper>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Paper>
                      <div className={clsx('fileUploader', classes.mar)}>
                        <h4>Upload Files</h4>
                        <FontAwesomeIcon
                          icon={faFileExcel}
                          style={{
                            color: 'green',
                            fontSize: '20px',
                            paddingRight: '10px',
                          }}
                        />
                        <div {...getRootProps({ className: classes.dropzone })}>
                          <input {...getInputProps()} />
                          <p className="dropboxTitle">
                            Drag File Here <br />
                            or <span>Browse</span>
                          </p>
                        </div>
                      </div>
                    </Paper>
                    <Paper
                      className={clsx(classes.mar, classes.pad)}
                      style={{ display: 'flex' }}
                    >
                      <FontAwesomeIcon
                        icon={faFileExcel}
                        style={{
                          color: 'green',
                          fontSize: '40px',
                          paddingRight: '10px',
                        }}
                      />
                      <Button
                        variant="contained"
                        size="medium"
                        style={{ width: '100%' }}
                      >
                        Download File
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={clsx(classes.mar, classes.pad)}>
                      <ColumnPicker />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>{' '}
              <Grid item xs={12} sm={12} md={12}>
                <Paper className={clsx(classes.paper, 'paper')}>
                  <GroupMenus
                    heading={'Tabel2'}
                    filter={filter}
                    group={'group'}
                    slicers={slicers}
                    sideSlicers={sideSlicers}
                    onGridReady={rowData}
                    newFilterModel={newFilterModel}
                    setNewFilterModel={setNewFilterModel}
                    id={id}
                  />
                  <TableHeaderMenu
                    heading={tableHeader}
                    filter={filter}
                    slicers={slicers}
                    sideSlicers={sideSlicers}
                    id={id}
                    setSlicers={setSlicers}
                    newFilterModel={newFilterModel}
                    setNewFilterModel={setNewFilterModel}
                  />
                  <DisplayDynamicHeader
                    storeType="partial"
                    theme="ag-theme-alpine"
                    layout={layout}
                    onGridReady={rowData}
                  />
                  <BarChart />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {group === 'group' && layout?.type !== 'layout1' && (
        <Box style={{ height: '100%' }}>
          <Kpis isKpis={isKpi} setKpis={setKpi} />
          <GroupMenus
            heading={tableHeader}
            filter={filter}
            group={'group'}
            slicers={slicers}
            sideSlicers={sideSlicers}
            onGridReady={rowData}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
            id={id}
          />
          <NavigationButton />
          <TableHeaderMenu
            heading={tableHeader}
            filter={filter}
            slicers={slicers}
            sideSlicers={sideSlicers}
            id={id}
            setSlicers={setSlicers}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
            setKpis={setKpi}
          />

          <DisplayDynamicHeader
            storeType="partial"
            theme="ag-theme-alpine"
            layout={layout}
            onGridReady={rowData}
            groupStructure={2}
          />
        </Box>
      )}
      {group === 'tab' && layout?.type !== 'layout1' && (
        <Box style={{ height: '100%' }}>
          <GroupMenus
            id={id}
            heading={tableHeader}
            filter={filter}
            group={'tab'}
            slicers={slicers}
            sideSlicers={sideSlicers}
            onGridReady={rowData}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
          />
          <TabComponent
            sideSlicers={sideSlicers}
            filter={filter}
            slicers={slicers}
            id={id}
            layout={layout}
            group={'tab'}
            onGridReady={rowData}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
            groupStructure={groupStructure}
            rowType={rowType}
          />
        </Box>
      )}
    </>
  )
}
