import axios from "axios";
import { Button, TextField, Autocomplete, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostForm = ({ url, id }) => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [info, setInfo] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/tags')
            .then(response => setOptions(response.data.map(tag => tag.name)))
            .catch(error => console.log(error));

        if (id) {
            axios.get(url)
                .then(response => {
                    setTitle(response.data.title);
                    setBody(response.data.body);
                    setTags(response.data.tags.map(tag => tag.name));
                    setInfo(response.data);
                })
                .catch(error => console.log(error));
        } else {
            setTags([]);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            const data = {
                title: title.trim(), 
                body: body.trim(), 
                user_id: info.user_id, 
                author: info.username, 
                tags: JSON.stringify(tags)
            };

            axios.put(url, data, {headers: {"Authorization": 'Bearer ' + token}})
                .then(response => {
                    console.log(response);
                    navigate('/post/' + response.data.id);
                })
                .catch(error => console.log(error.response.data));
        } else {
            const data = {
                title: title.trim(), 
                body: body.trim(), 
                user_id: user_id, 
                author: username, 
                tags: JSON.stringify(tags)
            };
    
            axios.post(url, data, {headers: {"Authorization": 'Bearer ' + token}})
                .then(response => {
                    console.log(response);
                    navigate('/post/' + response.data.id);
                })
                .catch(error => console.log(error.response.data));
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField 
                name="title" 
                id="title" 
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Autocomplete
                multiple
                id="tags-filled"
                options={options}
                freeSolo
                filterSelectedOptions
                value={tags}
                onChange={(e, value) => setTags(value.map(tag => tag.trim()))}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Tags"
                    />
                )}
            />
            <TextField 
                name="body"
                id="body" 
                label="Main Text"
                value={body}
                multiline
                minRows={15}
                maxRows={20}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <p>{body === '' ? 0 : body.trim().split(/\s+/).length} words</p>
            <Button type="submit" variant="contained">Post</Button>
        </form>
    );
};

export default PostForm;