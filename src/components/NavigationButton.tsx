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

export const NavigationButton = () => {
    return (
        <>
        <Box style={{display: 'flex', justifyContent: 'left', marginBottom:'5px'}}>
        <Button variant="contained" size="small" style={{backgroundColor: '#555'}}>
            Review Plan
        </Button>
        </Box>
        </>
    )
}