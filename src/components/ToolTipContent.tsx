import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import ReactHtmlParser from 'react-html-parser'
import Box from '@mui/material/Box'

export const TootipContent = ({ content }: any) => {
  return (
    <Box style={{fontSize:'16px'}}>
      {/* <Typography color="inherit">Tooltip with HTML</Typography>
              <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>
              . {"It's very engaging. Right?"} */}
      {ReactHtmlParser(content)}
    </Box> 
  )
}
