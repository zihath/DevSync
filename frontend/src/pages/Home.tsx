import {Button} from "@components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Code, Users } from "lucide-react";

const Home : React.FC = () => {
    const navigate = useNavigate();
    const goToProfilePage = () => {
        navigate('/Profile');
    };

    const goToDashBoard = () => {
        navigate('/DashBoard');
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="flex justify-center items-center w-full">
                    <h1 className="text-5xl font-bold text-blue-400 flex items-center gap-3">
                        <Code size={50} /> DevSync
                    </h1>
                </div>

                <p className="text-lg mt-4 text-gray-300 max-w-xl">
                Collaborate, code, and build together in real-time with DevSync.
                The ultimate online coding workspace for developers.
                </p>
            

                <SignedIn>
                    <div className="absolute top-4 right-4">
                    <UserButton appearance={{elements : {avatarBox : "w-12 h-12"}}}/>
                    </div>
                    
                </SignedIn>

                <SignedOut>
                    <SignInButton>
                    <Button className="mt-6 px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-2xl">Sign In</Button>
                    </SignInButton>
                </SignedOut>
        
                <SignedIn>
                    {/* <button className="bg:black mt-6 px-6 py-3 text-lg hover:bg-gray-400" onClick={goToProfilePage}>Go to Profile Page</button> */}

                    <button className="mt-6 px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-2xl" onClick={goToDashBoard}>Go to DashBoard Page</button>

                </SignedIn>

            </motion.div>
        </div>


    );
};

export default Home;