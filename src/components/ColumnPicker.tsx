import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { filterHeader, checkDomain } from '../utils/utils'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export const ColumnPicker = () => {
  const [lists, setLists] = useState<any[]>([])
  const { urls } = checkDomain(0)
  useEffect(() => {
    if (urls) {
      fetch(urls)
        .then((res) => res.json())
        .then((data) => {
          const items = filterHeader(data)
          setLists(items)
        })
    }
  }, [])
  return (
    <div>
      <h4
        style={{
          margin: 0,
          padding: 0,
          fontSize: '16px',
          textTransform: 'uppercase',
          paddingBottom: '10px',
        }}
      >
        Column Picker
      </h4>
      <div style={{ height: '346px', overflowY: 'scroll' }}>
        {lists.map((items: any, index: number) => (
          // <Checkbox key={index} {...items.field} value={items.field} />
          <div key={index} style={{ borderBottom: '1px solid #ececec' }}>
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => console.log(e.target.value)} />
              }
              label={items.field}
              value={items.field}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
