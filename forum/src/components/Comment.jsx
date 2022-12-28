import { Component } from "react";
import { getLoggedIn } from "..";
import { Button } from "@mui/material";
import Delete from "./Delete";
import CommentForm from "./CommentForm";
import moment from "moment";

class Comment extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            body: props.data.body, 
            created_at: moment(props.data.created_at).local().format('D MMM YYYY, h:mma'),  //utc timezone
            author: props.data.author, 
            user_id: props.data.user_id.toString(), 
            id: props.data.id, 
            editable: false
        }
    }

    render() {
        const { body, created_at, author, id } = this.state;
        const loggedin = getLoggedIn();
        const url = 'http://localhost:3000/api/v1/comments/' + this.state.id;

        const setEditable = () => {
            this.setState(() => {
                return {editable: true};
            })
        };

        return (
            <div className="comment">
                <h4>{author}</h4>
                {
                    this.state.editable
                    ? <CommentForm text={body} id={id}/>
                    : <div>
                    <p className="text">{body}</p>
                    <p>{created_at}</p>
                    {loggedin && localStorage.getItem('id') === this.state.user_id
                    ? <div><Delete url={url} />
                    <Button onClick={setEditable}>Edit</Button></div>
                    : <></>}
                    </div>
                }
            </div>
        );
    };
}

export default Comment;