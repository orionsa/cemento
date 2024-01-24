import TextField from '@mui/material/TextField';

export const SearchBar = ({ onChange, value })=> {
 return (
    <TextField onChange={onChange} label="Search" variant="outlined" value={value} size="small"/>
 )
}