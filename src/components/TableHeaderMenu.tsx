import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  faGauge,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Drawer from '@mui/material/Drawer'
import { DrawerLayout } from './Drawer'
import { SlicersGroup } from './SlicersGroup'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
})

const longText = `
This table shows the total quantity of Servers and Storage available and is sourced from the IT Resource Tower data set. Use it to compare to the sum of all the Servers and Storage allocated to the individual applications in the table above.
`

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#adc2d9',
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
  menuIconsize: { height: '20px', width: '20px' },
  subMenuBorder: { borderRight: '1px solid #ccc' },
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

const menuLists = [
  { name: 'Open In Excel', icon: faFileExcel },
  { name: 'Export to PDF', icon: faFilePdf },
  { name: 'Show API URL', icon: faFileCode },
  { name: 'Update Data', icon: faArrowsRotate },
  { name: 'Show Full Data Path', icon: faDatabase },
  { name: 'Open in /data(CTRL+ALT+/)', icon: faFilePdf },
  { name: 'toString()', icon: faLinesLeaning },
  { name: 'Show Blueprint', icon: faShoePrints },
]
type Props = {
  heading: string;
  filter?: boolean;
  slicers?: boolean;
  sideSlicers?: boolean;
  id?: number;
  setSlicers?: (args: any) => void;

  setNewFilterModel: (arg: any) => void;
  newFilterModel: {};
  setKpis?: any;
}
export const TableHeaderMenu = ({
  heading,
  filter,
  slicers,
  sideSlicers,
  id,
  setSlicers,
  setNewFilterModel,
  newFilterModel,
  setKpis,
}: Props) => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: KeyboardEvent | MouseEvent,
  ) => {
    setState({ ...state, [anchor]: open })
  }
  const [menu, setMenu] = React.useState({
    anchorEl: null,
  })
  const handleClick = (event: any): void => {
    setMenu({ anchorEl: event.currentTarget })
  }

  const handleClose = (): void => {
    setMenu({ anchorEl: null })
  }
  // console.log(slicers);

  return (
    <Box
      sx={{
        width: 'auto',
      }}
      display="flex"
      justifyContent="space-between"
      style={{
        background: '#eeeeee',
        borderRadius: '2px',
        padding: '5px',
        marginBottom: '5px',
      }}
    >
      <Box
        style={{
          display: 'flex',
          border: '0px solid',
          fontWeight: 'bold',
          color: '#333',
          alignItems: 'center',
          flex: '1 1 auto',
          minWidth: '100px',
        }}
      >
        {heading}
      </Box>
      <Box style={{ alignItems: 'center' }}>
        {slicers && (
          <SlicersGroup
            type={'inner'}
            id={id}
            setSlicers={setSlicers}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
          />
        )}
      </Box>
      {filter && (
        <Box
          display="flex"
          justifyContent="flex-end"
          style={{ border: '0px solid', alignItems: 'center' }}
        >
          <FontAwesomeIcon
            icon={faCaretSquareDown}
            style={{
              color: 'black',
              fontSize: '20px',
              paddingRight: '10px',
              cursor: 'pointer',
            }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
          <FontAwesomeIcon
            icon={faGauge}
            style={{
              color: 'black',
              fontSize: '20px',
              paddingRight: '10px',
              cursor: 'pointer',
            }}
            onClick={() => setKpis(true)}
          />
          <CustomWidthTooltip title={longText} arrow>
            
            <Button sx={{ m: 0, p:0, border:'0px solid', minWidth:'10px'}}><FontAwesomeIcon
              icon={faCircleInfo}
              style={{
                color: 'black',
                fontSize: '20px',
                paddingRight: '10px',
                cursor: 'pointer',
              }}
            /></Button>
          </CustomWidthTooltip>
          <FontAwesomeIcon
            icon={faFilter}
            style={{
              color: 'black',
              fontSize: '20px',
              paddingRight: '10px',
              cursor: 'pointer',
            }}
            onClick={toggleDrawer('right', true)}
          />
          <Menu
            id="simple-menu"
            anchorEl={menu.anchorEl}
            keepMounted
            open={Boolean(menu.anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {menuLists.map((items) => (
              <MenuItem style={{ padding: 0, margin: 0 }}>
                <div style={{ display: 'flex' }}>
                  <div className={clsx(classes.subMenuBorder)}>
                    <FontAwesomeIcon
                      icon={items.icon}
                      className={clsx(classes.pad, classes.menuIconsize)}
                    />
                  </div>
                  <div className={clsx(classes.pad)}>{items.name}</div>
                </div>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        sx={{ zIndex: 4 }}
      >
        <DrawerLayout
          newFilterModel={newFilterModel}
          setNewFilterModel={setNewFilterModel}
          slicers={slicers}
          setSlicers={setSlicers}
          sideSlicers={sideSlicers}
        />
      </Drawer>
    </Box>
  )
}
