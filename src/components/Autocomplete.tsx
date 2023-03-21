import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import Autocomplete from '@mui/material/Autocomplete'
//import { Autocomplete, createFilterOptions } from "@material-ui/lab";
//import TextField from '@mui/material/TextField'
//import Stack from '@mui/material/Stack'
import { filterHeader, checkDomain } from '../utils/utils'
import { withStyles } from '@material-ui/core/styles'
import { Stack, Autocomplete, TextField } from '@mui/material'
import { GridReadyEvent } from 'ag-grid-community'
import Popper from '@material-ui/core/Popper'

// const StyledAutocomplete = withStyles({
//   tag: {
//     color: "#ad4e64",
//     border: "1px solid #ad4e64",
//     background: "transparent",
//     svg: {
//       color: "#ad4e64 !important"
//     }
//   }
// })(Autocomplete);

type Props = {
  type?: string;
  id?: number;
  nameSlicer?: string;
  setSlicers?: (args: any) => void;
  setNewFilterModel?: (args: any) => void;
  newFilterModel?: {};
}

const postId = [
  {
    field: '1',
  },
  {
    field: '2',
  },
  {
    field: '3',
  },
  {
    field: '4',
  },
  {
    field: '5',
  },
  {
    field: '6',
  },
  {
    field: '7',
  },
]
const year = [
  {
    field: '2000',
  },
  {
    field: '2004',
  },
  {
    field: '2008',
  },
  {
    field: '2009',
  },
  {
    field: '2010',
  },
  {
    field: '2011',
  },
  {
    field: '2012',
  },
]
const email = [
  {
    field: 'Eliseo@gardner.biz',
  },
  {
    field: 'Jayne_Kuhic@sydney.com',
  },
  {
    field: 'Nikita@garfield.biz',
  },
  {
    field: 'Lew@alysha.tv',
  },
  {
    field: 'Presley.Mueller@myrl.com',
  },
  {
    field: 'Hayden@althea.biz',
  },
  {
    field: 'Dallas@ole.me',
  },
]
const sport = [
  {
    field: 'Swimming',
  },
  {
    field: 'Gymnastics',
  },
  {
    field: 'Speed Skating',
  },
  {
    field: 'Cross Country Skiing',
  },
  {
    field: 'Short-Track Speed Skating',
  },
  {
    field: 'Diving',
  },
  {
    field: 'Cycling',
  },
]

const styles = {
  popper: {
    maxWidth: 'fit-content',
  },
}

type Styles = () => { popper: { maxWidth: string } }

const PopperMy = function (props: any) {
  return <Popper {...props} style={styles.popper} placement="bottom-start" />
}

export const AutocompleteComponent = ({
  id,
  setSlicers,
  nameSlicer,
  setNewFilterModel,
  newFilterModel,
}: Props) => {
  const [lists, setLists] = useState<any[]>([])
  const handleChange = (event: React.SyntheticEvent, values: any) => {
    // if (setSlicers) {
    // console.log(values[0]?.field, values);
    let valueSport: string[] = []
    let valueYear: string[] = []

    typeof values[0]?.field === 'string'
      ? values.map((value: any) => {
          valueSport = [...valueSport, value.field]
        })
      : values.map((value: any) => {
          valueYear = [...valueYear, value.field]
        })

    nameSlicer === 'Sport'
      ? setNewFilterModel?.({ ...newFilterModel, sport: valueSport })
      : nameSlicer === 'PostId'
      ? setNewFilterModel?.({ ...newFilterModel, sport: valueSport })
      : nameSlicer === 'Email'
      ? setNewFilterModel?.({ ...newFilterModel, year: valueSport })
      : nameSlicer === 'Year'
      ? setNewFilterModel?.({ ...newFilterModel, year: valueSport })
      : null
    // }
  }

  useEffect(() => {
    setLists(
      nameSlicer === 'Sport'
        ? sport
        : nameSlicer === 'PostId'
        ? postId
        : nameSlicer === 'Email'
        ? email
        : year,
    )
  }, [])

  return (
    <>
      <Stack sx={{ minWidth: '100px' }}>
        <Autocomplete
          multiple
          id="tags-standard"
          limitTags={1}
          options={lists}
          PopperComponent={PopperMy}
          getOptionLabel={(option: any) => {
            return option.field
          }}
          defaultValue={lists[0]}
          renderInput={(params) => (
            <TextField
              {...params}
              label={nameSlicer}
              style={{ backgroundColor: 'white' }}
            />
          )}
          size="small"
          onChange={handleChange}
        />
      </Stack>
    </>
  )
}
