"use client"

import {useState, useEffect} from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import React from "react";

const MyProfile = ({params}) => {

    const [posts, setPosts] = useState([]);

    const searched_params = useSearchParams();
    const name = searched_params.get("name");

    useEffect(() => {
        const fetch_posts = async () =>{
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        if(params.id){
            fetch_posts();
        }
    }, [params.id]);

    return(
        <Profile
            name={name}
            desc={`Welcome to ${name} personalized profile page`}
            data={posts}
        />
    )
}

export default MyProfile
