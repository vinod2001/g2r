import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export const KpiGlobal = (itemDetails:any) => {
  const {content1,content2,content3,profit} = itemDetails.itemDetails;
  console.log(content1); //{content1,content2,content3,profit}
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
            {content1}
          </Typography>
          <Typography
            sx={{ fontSize: 35, fontWeight: 'bold', color: '#2196f3' }}
          >
            <PlayArrowIcon
              sx={{
                color: profit?'green':'red',
                transform: profit?'rotate(270deg)':'rotate(-30deg)',
                border: '0px solid',
                p: 0,
              }}
            />
            <span style={{color:profit?'green':'red'}}>{content2}</span>
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {content3}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}
