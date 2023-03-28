import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faArrowUp91,
  faArrowDown91,
  faFileExcel,
  faFilter,
  faMaximize,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button'
import { GroupDialog } from './GroupDialog'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { KpiGlobal } from './KpiGlobal';
import {kpiData} from '../mocks'

type Props = {
  heading: string;
  filter: boolean;
  group: string;
  slicers?: boolean;
  sideSlicers?: boolean;
  onGridReady: any;
  setNewFilterModel: (arg: any) => void;
  newFilterModel: {};
  id: number;
}
export const GroupMenus = ({
  heading,
  filter,
  group,
  slicers,
  sideSlicers,
  onGridReady,
  newFilterModel,
  setNewFilterModel,
  id,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };



  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        style={{ background: '#fff', padding: '5px', border: '0px solid' }}
      >
        <FontAwesomeIcon
          icon={faMaximize}
          onClick={() => setIsDialogOpen(true)}
          style={{ cursor: 'pointer' }}
        />
      </Box>
      <Box>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
             KPI
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {kpiData.map((item, index)=>(
              <Box key={index} sx={{ minWidth: 275, border: '0px solid', }}>
              <KpiGlobal itemDetails={item}/>
            </Box>
            ))}
            
          </Box>
          </AccordionDetails>
        </Accordion>
        
      </Box>
      {isDialogOpen && (
        <GroupDialog
          id={id}
          heading={heading}
          filter={filter}
          setIsDialogOpen={setIsDialogOpen}
          group={group}
          slicers={slicers}
          onGridReady={onGridReady}
          sideSlicers={sideSlicers}
          layout={{ type: 'dialog', withoutTab: 100 }}
          newFilterModel={newFilterModel}
          setNewFilterModel={setNewFilterModel}
        />
      )}
    </>
  )
}
