import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface IHeaderProps {
    label: string;
}

const Header = ({ label }: IHeaderProps) => {
    return (
        <div className="w-full flex justify-center">
            <h1 className={(cn("text-3xl"), font.className)}>{label}</h1>
        </div>
    );
};

export default Header;
