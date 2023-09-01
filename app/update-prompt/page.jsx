"use client"

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";

import Form from "@components/Form";

const Edit_prompt = (props) => {
    const router = useRouter();

    const search_params = useSearchParams();
    const promptId = search_params.get("id");

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt : "",
        tag : "",
    });



    useEffect(() => {
        const get_promptDetails = async () => {
            const response = await fetch(`api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag : data.tag,
            })
        }
        if(promptId){
            get_promptDetails();
        }
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId){
            alert("Prompt Id not found");
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`,
                {
                    method : "PATCH",
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                }
            )
            if (response.ok){
                router.push("/");
            }
        } catch (e) {
            console.log(e)
        }finally {
            setSubmitting(false);
        }
    }


    return(
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default Edit_prompt