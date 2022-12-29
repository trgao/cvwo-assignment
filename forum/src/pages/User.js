import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import Copied from "../components/Copied";
import Order from "../components/Order";

function User() {
    const username = localStorage.getItem('username');
    const urlparam = useParams();
    const others = urlparam.username ? true : false;
    const [url, setURL] = useState(others 
                                   ? 'http://localhost:3000/api/v1/posts?author=' + urlparam.username 
                                   : 'http://localhost:3000/api/v1/posts?author=' + username);
    const baseurl = url;
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (others) {
            axios.get('http://localhost:3000/api/v1/users/' + urlparam.username)
                .then(response => {
                    console.log(response);
                    if (response.data !== null) {
                        setName(urlparam.username);
                    }
                })
                .catch(error => console.log(error));
        } else {
            setName(username);
        }
    }, []);

    return (
        <div>
            <Navbar />
            {name === ''
            ? <div className="main">
                <h1>User not found</h1>
            </div>
            : <div className="main">
                <h1>user/{name}</h1>
                <Order setURL={setURL} baseurl={baseurl} />
                <PostsList url={url} setOpen={setOpen} />
                <Copied open={open} setOpen={setOpen} />
            </div>}
        </div>
    );
}

export default User;