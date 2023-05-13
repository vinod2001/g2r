import './styles.css'
import React, { useState } from 'react'
import { DisplayGridFull } from './agGrid/AgGrid'
import { DisplayGrid } from './agGrid/AgGrid copy'
import { DisplayGridClient } from './agGrid/AgGrid copy 2'
import { DisplayDynamicHeader } from './agGrid/AgGridDynamic'
import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
import { AutocompleteComponent } from './components/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faArrowUp91,
  faArrowDown91,
  faFileExcel,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { ColumnPicker } from './components/ColumnPicker'
import { Groups } from './components/Groups'

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

export const Layout1 = () => {
  const [dropFiles, setDropFiles] = useState()
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
  const classes = useStyles()

  return (
    // <Box className={classes.root}>
    //   {/* <Grid container spacing={2}>
    //     <Grid item xs={12} sm={12} md={8}> */}
    //   <Paper className={clsx(classes.paper, "paper")}>
    <>
      <Groups
        layout={{ type: "layout1", withoutTab: 100 }}
        id={1}
        tableHeader={"Table 1"}
        group={"group"}
        filter={false}
        slicers={false}
        sideSlicers={false}
      />{" "}
    </>
  );
};
