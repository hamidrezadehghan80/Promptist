import Feed from "@components/Feed";

const Home = (props) => {
    return(
        <section className={"w-full flex-center flex-col"}>
            <h1 className={"head_text text-center"}>
                Discover & Share
                <br className={"max-md:hidden"}/>
                <span className={"blue_gradient text-center"}>
                    AI-Powered Prompts
                </span>
            </h1>
            <p className={"desc text-center"}>
                promptist is an open-source AI
                prompoting tool for modern world to
                create, share and discover creative prompts
            </p>
            <Feed/>
        </section>
    )
}

export default Home