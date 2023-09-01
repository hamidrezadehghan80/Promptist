import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
    title : "Promptopia",
    description : "Discover & Share AI Prompts"
}

const RootLayout = ({children}) => {
    return(
        <html lang="en">
            {/*<meta httpEquiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com"/>*/}
            {/*<script src="http://www.google.com/recaptcha/api.js?onload=myCallBack&render=explicit" async defer></script>*/}
                <body>
                    <Provider>
                        <div className={"main"}>
                            <div className={"gradient"}/>
                        </div>

                        <main className={"app"}>
                            <Nav/>
                            {children}
                        </main>
                    </Provider>
                </body>
        </html>
    )
}

export default RootLayout