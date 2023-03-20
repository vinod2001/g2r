import React, { useState, KeyboardEvent, MouseEvent } from "react";
import Box from "@mui/material/Box";
// import Grid from '@mui/material/Grid'
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
import Drawer from "@mui/material/Drawer";
import { DrawerLayout } from "./Drawer";

type Anchor = "top" | "left" | "bottom" | "right";
export const MainHeaderMenu = (
  newFilterModel: {},
  setNewFilterModel: (arg: any) => void
) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      setState({ ...state, [anchor]: open });
    };
  return (
    <Box
      style={{
        background: "#dae7f6", // #adc2d9
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <FontAwesomeIcon
          icon={faFilter}
          style={{
            color: "black",
            fontSize: "20px",
            padding: "10px",
            cursor: "pointer",

            border: "1px solid #828f9e",
          }}
          onClick={toggleDrawer("right", true)}
        />
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <DrawerLayout
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
            menuType="main"
          />
        </Drawer>
      </Box>
    </Box>
  );
};
