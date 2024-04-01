"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Social = () => {
    return (
        <div className="flex w-full items-center ">
            <Button size={"lg"} variant={"outline"}>
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button size={"lg"} variant={"outline"}>
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
};

export default Social;
