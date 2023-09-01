"use client"

import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import Profile from "@components/Profile";
import React from "react";

const MyProfile = (props) => {
    const router = useRouter();

    const handle_edit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handle_delete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed){
            try {
                await fetch(`api/prompt/${post._id.toString()}`,{
                    method : "DELETE"
                });
                const filteredPosts = posts.filter((p) => {
                    return p._id !== post._id;
                });
                setPosts(filteredPosts);
            }catch (e) {
                console.log(e);
            }
        }
    };

    const [posts, setPosts] = useState([]);

    const {data : session} = useSession();

    useEffect(() => {
        const fetch_posts = async () =>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        if(session?.user.id){
            fetch_posts();
        }
    }, []);

    return(
        <Profile
            name="My"
            desc={"Welcome to your personalized profile page"}
            data={posts}
            handle_edit={handle_edit}
            handle_delete={handle_delete}
        />
    )
}

export default MyProfile
