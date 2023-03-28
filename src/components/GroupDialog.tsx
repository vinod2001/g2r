import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import { GroupMenus } from "./GroupMenus";
import { filter } from "lodash";
import { DisplayDynamicHeader } from "../agGrid/AgGridDynamic";
import { TableHeaderMenu } from "./TableHeaderMenu";
import { TabComponent } from "./Tabs";
import { makeStyles } from "@material-ui/core/styles";
import { SlicersGroup } from "./SlicersGroup";

type Props = {
  setIsDialogOpen: (arg: boolean) => void;
  heading: string;
  filter: boolean;
  group: string;
  slicers?: boolean;
  sideSlicers?: boolean;
  layout?: {
    type: string;
    withoutTab: number;
  };
  onGridReady: any;
  newFilterModel: {};
  setNewFilterModel: (arg: any) => void;
  id: number;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiModal-root-MuiDialog-root": {
    zIndex: "5 !important",
  },
}));

// const BootstrapDialogTitle = (props: DialogTitleProps) => {
//   const { children, onClose } = props

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }}>
//       <Box display={'flex'} justifyContent={'space-between'}>
//         <Box display={'flex'}>{children}</Box>
//         <Box justifyContent={'flex-end'}>
//           <FontAwesomeIcon icon={faXmark} onClick={onClose} />
//         </Box>
//       </Box>
//     </DialogTitle>
//   )
// }
// const StyledDialog = withStyles({
//   root: {
//     position: 'fixed',
//     zIndex: 7,
//     right: '0px',
//     bottom: '0px',
//     top: '0px',
//     left: '0px'
//   }
// })(Dialog);
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: 7,
    right: "0px",
    bottom: "0px",
    top: "0px",
    left: "0px",
  },
}));

export const GroupDialog = ({
  heading,
  filter,
  setIsDialogOpen,
  group,
  slicers,
  sideSlicers,
  layout,
  onGridReady,
  setNewFilterModel,
  id,
  newFilterModel,
}: Props) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={true}
        fullScreen
        sx={{ zIndex: "3 !important" }}
      >
        {/* <BootstrapDialogTitle onClose={() => setIsDialogOpen(false)}>
          Modal title
        </BootstrapDialogTitle> */}
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}> Top Projects</Box>
            <Box justifyContent={"flex-end"}>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setIsDialogOpen(false)}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {group === "group" && (
            <Box style={{ height: "100%" }}>
              {/* {slicers && <SlicersGroup />} */}
              <TableHeaderMenu
                heading={heading}
                filter={filter}
                slicers={slicers}
                sideSlicers={sideSlicers}
                newFilterModel={newFilterModel}
                setNewFilterModel={setNewFilterModel}
              />
              <DisplayDynamicHeader
                storeType="partial"
                theme="ag-theme-alpine"
                layout={layout}
                onGridReady={onGridReady}
              />
            </Box>
          )}
          {group === "tab" && (
            <Box style={{ height: "100%" }}>
              <TabComponent
                filter={filter}
                id={id}
                slicers={slicers}
                sideSlicers={sideSlicers}
                layout={layout}
                onGridReady={onGridReady}
                newFilterModel={newFilterModel}
                setNewFilterModel={setNewFilterModel}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
