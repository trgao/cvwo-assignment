import axios from "axios";
import { Button } from "@mui/material";

const Delete = ({ url, sx, menu }) => {
    const handleClick = (e) =>  {
        const token = localStorage.getItem('token');

        axios.delete(url, {headers:{"Authorization": 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                window.location.reload();
            });
    }

    return (
        <Button onClick={handleClick} sx={sx} disableRipple={menu ? true : false}>Delete</Button>
    );
};

export default Delete;