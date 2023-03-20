import "./styles.css";
import React, { useState, KeyboardEvent, MouseEvent } from "react";
import { DisplayGridFull } from "./agGrid/AgGrid";
import { DisplayGrid } from "./agGrid/AgGrid copy";
import { DisplayGridClient } from "./agGrid/AgGrid copy 2";
import { DisplayDynamicHeader } from "./agGrid/AgGridDynamic";
import Box from "@mui/material/Box";
// import Grid from '@mui/material/Grid'
import { AutocompleteComponent } from "./components/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFilter,
  faCaretSquareDown,
  faFilePdf,
  faFileCode,
  faArrowsRotate,
  faDatabase,
  faLinesLeaning,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import { Groups } from "./components/Groups";

type Anchor = "top" | "left" | "bottom" | "right";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#adc2d9",
    padding: "10px",
  },
  paper: {
    padding: "10px",
    color: theme.palette.text.secondary,
    backgroundColor: "#fff",
  },
  pad: {
    padding: "10px",
  },
  menuIconsize: { height: "20px", width: "20px" },
  subMenuBorder: { borderRight: "1px solid #ccc" },
  mar: {
    marginTop: "10px",
  },
  fileUploader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    width: "100%",
    boxSizing: "border-box",
  },
  h4: {
    textTransform: "uppercase",
    textAlign: "center",
  },
  dropzone: {
    height: "168px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #d1ddf8",
    borderRadius: "20px",
    cursor: "pointer",
    padding: "15px",
  },
}));

const menuLists = [
  { name: "Open In Excel", icon: faFileExcel },
  { name: "Export to PDF", icon: faFilePdf },
  { name: "Show API URL", icon: faFileCode },
  { name: "Update Data", icon: faArrowsRotate },
  { name: "Show Full Data Path", icon: faDatabase },
  { name: "Open in /data(CTRL+ALT+/)", icon: faFilePdf },
  { name: "toString()", icon: faLinesLeaning },
  { name: "Show Blueprint", icon: faShoePrints },
];

export const Layout2 = () => {
  const [dropFiles, setDropFiles] = useState();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const maxLength = 20;
  const filesArray: any[] = [];
  const fileValidator = (file: any) => {
    filesArray.push(file.name);
    // console.log(
    //   "fileValidator",
    //   filesArray.indexOf(file.name),
    //   filesArray.indexOf(file.name) === -1
    // );
    if (file.name.length > maxLength) {
      return {
        code: "name-too-large",
        message: `Name is larger than ${maxLength} characters`,
        type: file.type,
      };
    }
    if (filesArray.indexOf(file.name) === -1) {
      return {
        code: "same-filename",
        message: `the file name "${file.name}" is already exist`,
        type: file.type,
      };
    }
    return null;
  };
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    validator: fileValidator,
    onDrop: (acceptedFiles: any) => {
      setDropFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      setState({ ...state, [anchor]: open });
    };
  const [menu, setMenu] = React.useState({
    anchorEl: null,
  });
  const handleClick = (event: any): void => {
    setMenu({ anchorEl: event.currentTarget });
  };

  const handleClose = (): void => {
    setMenu({ anchorEl: null });
  };

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper className={clsx(classes.paper, "paper")}>
            <Groups
              id={1}
              layout={{ type: "layout2", withoutTab: 100 }}
              tableHeader={"Table 1"}
              group={"group"}
              filter={true}
              slicers={false}
              sideSlicers={true}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {/* <TabComponent /> */}
          <Paper className={clsx(classes.paper, "paper")}>
            <Groups
              id={2}
              layout={{ type: "layout2", withoutTab: 100 }}
              tableHeader={"Table 2"}
              group={"tab"}
              filter={true}
              slicers={false}
              sideSlicers={true}  
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
