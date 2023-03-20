import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import Drawer from '@mui/material/Drawer'
import Kpi from '../images/kpi.png'

type Anchor = 'top' | 'left' | 'bottom' | 'right'
export const Kpis = ({isKpis,setKpis}: any) => {


  return (
    <>
    {isKpis && (<div
      style={{
        width: '200px',
        background: 'white',
        display: 'flex',
        position: 'absolute',
        right: 0,
        zIndex: 5,
        top: '66px',
        border: '1px solid #c3bfbf',
        borderRight: '0px',
        height: '91%',
      }}
    >
      {/* <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', true)}
        style={{position:"relative"}}
      >
        <div>google</div>
      </Drawer> */}
            <div
              style={{
                width: '20px',
                height: '20px',
                position: 'absolute',
                right: 0,
                cursor: 'pointer',
              }}
              onClick={()=>setKpis(false)}>
              X
            </div>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <li>
                <img
                  src={Kpi}
                  style={{
                    height: '78px',
                    marginBottom: '10px',
                    marginTop: '20px',
                  }}
                />
              </li>
              <li>
                <img
                  src={Kpi}
                  style={{ height: '78px', marginBottom: '10px' }}
                />
              </li>
              <li>
                <img
                  src={Kpi}
                  style={{ height: '78px', marginBottom: '10px' }}
                />
              </li>
              <li>
                <img
                  src={Kpi}
                  style={{ height: '78px', marginBottom: '10px' }}
                />
              </li>
              <li>
                <img
                  src={Kpi}
                  style={{ height: '78px', marginBottom: '10px' }}
                />
              </li>
              <li>
                <img
                  src={Kpi}
                  style={{ height: '78px', marginBottom: '10px' }}
                />
              </li>
            </ul>
    </div>)}
    </>
  )
}
