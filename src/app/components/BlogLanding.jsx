import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AuthorInfo} from "./AuthorInfo";

export const BlogLandingPage = () => {
    const [blog, setBlog] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        const getBlogById = async () => {
            const res = await fetch(`http://localhost:1234/api/blog/${id}`);
            setBlog(await res.json());
        };

        getBlogById().catch(e => console.log('console.error', e));
    }, [id])

    if(!blog) {
        return (<div>Loading</div>)
    }

    return (
        <div className="BlogLandingPage">
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>

            <AuthorInfo author={blog.author} />

            <div className="PostList">
            {blog.posts.map(post => {
                return (
                <div className="PostLink" key={post.id}>
                    <h3>{post.title}</h3>
                    <div className="PostSummary">
                        <img src={post.img_src} />
                        <div className="PostDescription">
                            <p>{`${post.body.substring(0, 50)}...`}</p>
                            <a href={`/post/${post.id}`}>Read now</a>
                        </div>
                    </div>
                </div>)
            })}
            </div>
        </div>
    )
}