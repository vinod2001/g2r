import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { filterHeader, checkDomain } from "../utils/utils";
import { AutocompleteComponent } from "./Autocomplete";
import Box from "@mui/material/Box";

type Props = {
  type?: string;
  id?: number;
  setSlicers?: (args: any) => void;
  setNewFilterModel: (args: any) => void;
  newFilterModel: {};
};
export const SlicersGroup = ({
  type,
  id,
  setSlicers,
  setNewFilterModel,
  newFilterModel,
}: Props) => {
  // console.log(id);
  const { urls } = checkDomain(0);

  return (
    <>
      <Box display="flex" justifyContent="flex-start" sx={{ m: 0.5 }}>
        <Box sx={{ mr: 1, minWidth: "10px" }}>
          <AutocompleteComponent
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
            id={id}
            setSlicers={setSlicers}
            nameSlicer={
              urls == "https://jsonplaceholder.typicode.com/comments?"
                ? "PostId"
                : "Sport"
            }
          />
        </Box>
        <Box sx={{ mr: 1 }}>
          <AutocompleteComponent
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
            id={id}
            setSlicers={setSlicers}
            nameSlicer={
              urls == "https://jsonplaceholder.typicode.com/comments?"
                ? "Email"
                : "Year"
            }
          />
        </Box>
      </Box>
    </>
  );
};
