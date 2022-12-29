import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import Copied from "../components/Copied";
import Order from "../components/Order";

function Tag() {
    const urlparam = useParams();
    const name = urlparam.name.split('_').join(' ')
    const [url, setURL] = useState('http://localhost:3000/api/v1/tags/' + name + '?');
    const baseurl = url;
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="main">
                <h1>#{name}</h1>
                <Order setURL={setURL} baseurl={baseurl} />
                <PostsList url={url} setOpen={setOpen} />
                <Copied open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

export default Tag;