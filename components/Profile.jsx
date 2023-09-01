import Prompt_Card from "@components/Prompt_Card";


const Profile = ({name, desc, data, handle_edit, handle_delete}) => {
    return(
        <section className={"w-full"}>
            <h1 className={"head_text text-left"}>
                <span className={"orange_gradient"}>{name} Profile</span>
            </h1>
            <p className={"desc text-left"}>
                {desc}
            </p>
            <div className={"mt-10 prompt_layout"}>
                {
                    data?.map((post) => (
                        <Prompt_Card
                            key={post._id}
                            post={post}
                            handleEdit={() => handle_edit && handle_edit(post)}
                            handleDelete={() => handle_delete && handle_delete(post)}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default Profile