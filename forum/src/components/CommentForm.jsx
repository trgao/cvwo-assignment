import axios from 'axios';
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CommentForm = ({ text, id }) => {
    const commenttext = text
                        ? text
                        : '';
    const urlparam = useParams();
    const url = 'http://localhost:3000/api/v1/comments';
    const [comment, setComment] = useState(commenttext);
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            body: comment.trim(), 
            post_id: urlparam.id,
            user_id: user_id, 
            author: username
        };

        if (text) {
            axios.put(url + '/' + id, data, {headers: {"Authorization": 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                window.location.reload(false);
            })
            .catch(error => console.log(error.response.data));
        } else {
            axios.post(url, data, {headers: {"Authorization": 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                window.location.reload(false);
            })
            .catch(error => console.log(error.response.data));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField 
                name="comment"
                id="comment" 
                label="Comment"
                value={comment}
                multiline
                minRows={4}
                maxRows={8}
                onChange={(e) => setComment(e.target.value)}
                required
            />
            <Button type="submit" variant="contained">Post</Button>
        </form>
    );
};

export default CommentForm;