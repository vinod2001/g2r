import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faArrowUp91,
  faArrowDown91,
  faFileExcel,
  faStickyNote,
  faFilter,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { ColumnPicker } from './ColumnPicker'
import { makeStyles } from '@material-ui/core/styles'
import { AutocompleteComponent } from './Autocomplete'
import clsx from 'clsx'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))


export const HtmlComponent = ({toolTipContent}:any) => {
  return (
    <>
      <Paper
        style={{
          padding: '2px',
          marginRight: '10px',
        }}
      > 
        <HtmlTooltip
          title={
            toolTipContent
          }
        >
          <Button style={{padding:'0px',margin:'0px',minWidth: '0px'}}><FontAwesomeIcon
            icon={faInfoCircle}
            style={{
              color: 'green',
              fontSize: '20px',
            }}
          />{""}</Button> 
        </HtmlTooltip>
      </Paper>
    </> 
  )
}
