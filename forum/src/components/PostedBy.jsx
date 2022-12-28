import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link } from "react-router-dom";

const PostedBy = ({ author, created_at, likes_count, comments_count, icon }) => {
    return (
        <p className="postedby">
            Posted by <b>user/<Link to={"/user/" + author}>{author}</Link></b> on <i>{moment(created_at).local().format('D MMM YYYY, h:mma')}</i> &nbsp;&nbsp;&nbsp;
            {likes_count} &nbsp;
            {icon
            ? <ThumbUpIcon style={{fontSize: '10px'}} />
            : ''} &nbsp;&nbsp;
            {comments_count} &nbsp;
            {icon
            ? <ChatBubbleIcon style={{fontSize: '10px'}} />
            : ''}
        </p>
    );
};

export default PostedBy;