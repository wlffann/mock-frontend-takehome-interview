import React, {useCallback, useEffect, useState} from 'react';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/miniavs';
import {AuthorInfo} from "./AuthorInfo";
import {Link} from "react-router-dom";

const BlogLink = ({blog}) => {
    return (
        <div className="BlogLink">
            <div className="BlogLinkTitle">
                <Link to={`/blog/${blog.id}`}><h3>{blog.title}</h3></Link>
                <div className="BlogCategory">{blog.category}</div>
            </div>
            <span>
                <AuthorInfo author={blog.author} />
            </span>
            <p>{blog.description}</p>
        </div>
    );
}

export const SiteLandingPage = () => {
    const [ blogs, setBlogs ] = useState([]);

    useEffect(() => {
        const getBlogs = async () => {
            const res = await fetch(`http://localhost:1234/api/blogs`);
            const resBody = await res.json();
            setBlogs(resBody.blogs);
        };

        getBlogs().catch(e => console.log('console.error', e));
    }, []);

    return (<>
        <div className="WelcomeMessage">
            <h2>Welcome to Boxy Blogs</h2>
            <p>Where the blogs are boxy.</p>
        </div>
        <div className="BlogsList">
            <h2>Check out some of our blogs below</h2>
            {blogs && blogs.map(blog => {
                return <BlogLink blog={blog} key={blog.id}/>
            })}
        </div>
    </>);
}