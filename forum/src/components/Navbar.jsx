import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLoggedIn } from "..";
import Logout from "./Logout";
import { Fragment, useState } from "react";
import { Autocomplete, TextField, Button, Menu, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from "react";
import axios from "axios";

const Navbar = () => {
    const location = useLocation();
    const loggedin = getLoggedIn();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);
    const tagurl = 'http://localhost:3000/api/v1/tags?q=';
    const userurl = 'http://localhost:3000/api/v1/users?q=';

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInputChange = (e, value, reason) => {
        if (e.type === 'click') {
            if (reason === 'clear') {
                setTags([]);
                setUsers([]);
                setSearch('');
            }
        }
    }

    const handleChange = (e, value) => {
        if (e.type === 'click' && e.value !== null){
            if (value.name) {
                navigate('/tag/' + value.name);
                window.location.reload(false);
            } else if (value.username) {
                navigate('/user/' + value.username);
                window.location.reload(false);
            } else {
                navigate('/search/?q=' + value);
                window.location.reload(false);
            }
        } else if (e.key === 'Enter') {
            navigate('/search/?q=' + value);
            window.location.reload(false);
        }
    }

    useEffect(() => {
        axios.get(tagurl + search)
            .then(response => {
                setTags(response.data);
            })
            .catch(error => console.log(error));
        axios.get(userurl + search)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.log(error));
    }, [search]);

    return (
        <nav>
            <div id="logo">
                <Link to="/">NUSGossip</Link>
            </div>
            <Autocomplete 
                freeSolo
                onInputChange={handleInputChange}
                onChange={handleChange}
                options={search === '' ? [...tags, ...users] : [...tags, ...users, search]}
                getOptionLabel={(option) => option.name ? option.name : option.username ? option.username : option}
                groupBy={(option) => option.name ? 'Tags' : option.username ? 'Users' : ''}
                renderOption={(props, option) => {
                    if (option.name) {
                        return (
                            <li {...props} key={option.id}>{option.name}</li>
                        );
                    } else if (option.username) {
                        return (
                            <li {...props} key={option.id}>{option.username}</li>
                        );     
                    } else {
                        return (
                            <Fragment key="0">
                                {tags.length === 0 && users.length === 0 ? <></> : <hr/>}
                                <li 
                                    {...props}  
                                    style={{
                                        paddingLeft: "15px", 
                                        paddingTop: "10px"}}>
                                    Search for: {search}
                                </li>
                            </Fragment>
                        );
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: <SearchIcon sx={{fontSize: '20px'}} />, 
                            style: {width: '45vw', fontSize: '15px'}
                        }}
                    />
                )}
            />
            {loggedin
            ? <div>
                <Button
                    onClick={handleClick}
                    style={{textTransform: "none", color: "#003882"}}
                >
                    {localStorage.getItem('username')}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    disableScrollLock={true}
                    MenuListProps={{disablePadding: true}}
                    style={{zIndex: "9999"}}
                >
                    <Link to="/user"><MenuItem onClick={handleClose}>My Profile</MenuItem></Link>
                    <Link to="/new"><MenuItem onClick={handleClose}>New Thread</MenuItem></Link>
                    <Logout handleClose={handleClose} />
                </Menu>
            </div>
            : <ul id="loginsignup">
                <li><Link to="/login" state={{from: location}}><Button>Login</Button></Link></li>
            </ul>}
        </nav>
    );
};

export default Navbar;