import React, {useCallback} from "react";
import {createAvatar} from "@dicebear/avatars";
import * as style from "@dicebear/miniavs";

export const AuthorInfo = ({ author }) => {
    const getAvatar = useCallback((authorName) =>{
        return createAvatar(style, {
            seed: authorName,
            dataUri: true,
            size: 50,
        });
    }, [author])

    const imgSrc = getAvatar(author.name);
    return (
        <div className="AuthorInfo">
            <img className="AuthorAvatar" src={imgSrc} alt={author.name} />
            <p>{author.name}</p>
        </div>
    );
}