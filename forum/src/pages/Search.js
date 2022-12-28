import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import Copied from "../components/Copied";
import Order from "../components/Order";

function Search() {
    const urlparam = useSearchParams()[0];
    const [url, setURL] = useState('http://localhost:3000/api/v1/posts?q=' + urlparam.get('q'));
    const baseurl = 'http://localhost:3000/api/v1/posts?q=' + urlparam.get('q');
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="main">
                <h1>Search for "{urlparam.get('q')}"</h1>
                <Order setURL={setURL} baseurl={baseurl} />
                <PostsList url={url} setOpen={setOpen} />
                <Copied open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

export default Search;