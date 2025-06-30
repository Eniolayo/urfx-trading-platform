import { useEffect, useState } from "react";
// import logoDark from "/src/assets/Logo/logo-dark.svg";
// import logoLight from "/src/assets/Logo/logo-light.svg";
import logoDark from "/src/assets/Navbar/dark-logo.png";
import logoLight from "/src/assets/Navbar/light-logo.png";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/store/atoms";

const Logo = () => {
    const themeAtomValue = useAtomValue(themeAtom);
    const [logoURL, setLogoURL] = useState<string>();

    useEffect(() => {
        setLogoURL(
            themeAtomValue === "dark" ? logoDark : logoLight
        );
    }, [themeAtomValue]);
    
    return(
        <div className="min-w-[134px] min-h-[41px] 2k:min-w-[200px] 2k:min-h-[61px]]">
            <img src={logoURL} alt="Logo" className="w-[134px] h-[41px] 2k:w-[200px] 2k:h-[61px] object-fill"/>
        </div>
    )
}

export default Logo;