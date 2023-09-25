"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect} from "react";
import { signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = (props) => {
    const {data : session} = useSession();

    const [providers, setProviders] = useState(null);

    const [toggle_dropdown, setToggle_dropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, []);

    return(
        <nav className={"flex-between w-full mb-16 pt-3"}>
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    className="object-contain"
                    src="/assets/images/logo.svg"
                    alt = "Promptopia logo"
                    width={30}
                    height={30}
                />
                <p className={"logo_text"}>
                    Promptist
                </p>
            </Link>

            {/*Desktop Navigation*/}
            <div className={"sm:flex hidden"}>
                {
                    session?.user ?
                        (
                            <div className={"flex gap-3 md:gap-5"}>
                                <Link
                                    className={"black_btn"}
                                    href="/create-prompt">
                                    Create Post
                                </Link>
                                <button
                                    type={"button"}
                                    onClick={signOut}
                                    className={"outline_btn"}>
                                    Sign Out
                                </button>
                                <Link href="/profile">
                                    <Image
                                        src={session?.user.image}
                                        alt={"profile"}
                                        width={37}
                                        height={37}
                                        className={"rounded-full"}/>
                                </Link>
                            </div>
                        )
                        :
                        (
                            <>
                                {
                                    providers &&
                                    Object.values(providers).map((provider) =>
                                        (
                                            <button
                                                type={"button"}
                                                key={provider.name}
                                                onClick={() => signIn(provider.id)}
                                                className={"black_btn"}
                                            >
                                                Sign In with Github
                                            </button>
                                        )
                                    )
                                }
                            </>
                        )

                }
            </div>


            {/*Mobile navigation*/}
            <div className={"sm:hidden flex relative"}>
                {
                    session?.user ? (
                        <div className={"flex"}>
                            <Image
                                src={session?.user.image}
                                alt={"profile"}
                                width={37}
                                height={37}
                                className={"rounded-full"}
                                onClick={() => {
                                    setToggle_dropdown(
                                        (prev) => !prev
                                    )}}
                            />
                            {
                                toggle_dropdown && (
                                    <div className={"dropdown"}>
                                        <Link
                                            href="/profile"
                                            className="dropdown_link"
                                            onClick={() => setToggle_dropdown(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/create-prompt"
                                            className="dropdown_link"
                                            onClick={() => setToggle_dropdown(false)}
                                        >
                                            Create Post
                                        </Link>
                                        <button
                                            type={"button"}
                                            onClick={() => {
                                                setToggle_dropdown(false);
                                                signOut();
                                            }}
                                            className={"mt-5 w-full black_btn"}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <>
                            {
                                providers &&
                                Object.values(providers).map((provider) =>
                                    (
                                        <button
                                            type={"button"}
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)}
                                            className={"black_btn"}
                                        >
                                            Sign In
                                        </button>
                                    )
                                )
                            }
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav