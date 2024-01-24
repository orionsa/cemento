import BaseInput from '@mui/material/Input';

export const Input = ({ onChange, value })=> {
   return (
     <BaseInput 
        value={value}
        onChange={onChange}
     />
   )
}