'use client'

import { useState, useEffect} from "react";

import Prompt_Card from "@components/Prompt_Card";

const PromptCardList = ({data, handle_tag_click}) => {
    return(
        <div className={"mt-16 prompt_layout"}>
            {
                data?.map((post) => (
                    <Prompt_Card
                        key={post._id}
                        post={post}
                        handle_tag_click={() => handle_tag_click && handle_tag_click(post.tag)}
                    />
                ))
            }
        </div>
    )
}

const Feed = (props) => {
    const [SearchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);

    const [searched_posts, setSearched_posts] = useState([]);

    const handle_search_change = (e) => {
        setSearchText(e.target.value);
    };

    const handle_tag_click = (tag) => {
        setSearchText(tag);
    }

    useEffect(() => {
        const fetch_posts = async () =>{
            const response = await fetch("/api/prompt");
            const data = await response.json();

            setPosts(data);
        }

        fetch_posts();
    }, []);


    useEffect(() => {
        const search_regex = new RegExp(SearchText, "i");
        const filtered_posts = posts.filter((post) => {
            return search_regex.test(post.prompt) || search_regex.test(post.tag) || search_regex.test(post.creator.username);
        });
        setSearched_posts(filtered_posts);
    }, [SearchText]);





    return(
        <section className={"feed"}>
            <form className={"relative w-full flex-center"}>
                <input
                    type={"text"}
                    placeholder={"Search..."}
                    value={SearchText}
                    onChange={handle_search_change}
                    required
                    className={"search_input peer"}
                />
            </form>
            <PromptCardList
                data={SearchText ? searched_posts : posts}
                handle_tag_click={handle_tag_click}
            />
        </section>
    )
}

export default Feed