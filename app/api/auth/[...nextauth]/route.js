import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"

import User from "@models/user";
import {connectToDB} from "@utils/database";

const handler = NextAuth({
    providers : [
        // GoogleProvider({
        //     clientId : process.env.GOOGLE_ID,
        //     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        // }),
        GithubProvider({
            clientId : process.env.GITHUB_ID,
            clientSecret : process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks : {
        async session({session}) {
            const sessionUser = await User.findOne({
                email : session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({profile}) {
            try {
                await connectToDB();

                //check if a user already exists

                const userExists = await User.findOne({
                    email : profile.email
                });

                //if not, create a new user
                // console.log(profile);
                if(!userExists){
                    await User.create({
                        email : profile.email,
                        username : profile.name.replace(" ", "").
                        toLowerCase(),
                        image : profile.avatar_url
                    })
                }
                return true;
            }catch (e) {
                console.log(e);
                return false;
            }
        }
    }
})

export {handler as GET, handler as POST};
