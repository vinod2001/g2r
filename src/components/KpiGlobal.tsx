import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export const KpiGlobal = () => {
  return (
    <>
      <Card sx={{ p: '0', backgroundColor: '#f2f9ff' }}>
        <CardContent
          sx={{
            border: '0px solid',
            '&:last-child': {
              paddingBottom: 0,
              padding: '5px 10px',
            },
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
            Project Spend as % Total Spend YTD
          </Typography>
          <Typography
            sx={{ fontSize: 35, fontWeight: 'bold', color: '#2196f3' }}
          >
            <PlayArrowIcon
              sx={{
                color: 'green',
                transform: 'rotate(270deg)',
                border: '0px solid',
                p: 0,
              }}
            />
            <span>39.9%</span>
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            CapEx: $907.89K
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}
