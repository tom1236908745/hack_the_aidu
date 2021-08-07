import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function SelectLabels(props) {
  
  const items = props.items.map((item, k) => 
    <option value={item}>{item}</option>
  )
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect onChange={props.onChange} value={props.value}
        >
          {items}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}