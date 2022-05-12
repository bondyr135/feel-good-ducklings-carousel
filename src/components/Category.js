import React from 'react';
import {
  FormControlLabel,
  Radio
} from '@mui/material';


function Category({ name }) {

  return (
    <FormControlLabel
      control={<Radio sx={{ '&.Mui-checked': { color: '#c442eb' } }} />}
      labelPlacement="top"
      label={name}
      name={name}
      value={name}
    />
  )
}

export default Category;