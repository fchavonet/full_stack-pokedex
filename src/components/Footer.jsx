import { useEffect, useState } from "react";

function Footer() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const windowHeight = window.innerHeight;
            const mouseY = event.clientY;
            const threshold = windowHeight - 50;

            setIsVisible(mouseY > threshold);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className={`lg:fixed lg:bottom-0 lg:left-0 lg:right-0 cursor-pointer z-9999 lg:transition-transform lg:duration-300 lg:ease-in-out ${isVisible ? "lg:translate-y-0" : "lg:translate-y-14"}`}>
            <div className="w-20 h-2 mx-auto -mb-px bg-slate-300 rounded-t-full lg:block hidden" />

            <footer className="p-2 flex flex-col justify-center items-center text-center border-t border-slate-300 bg-slate-100/50 backdrop-blur-sm">
                <a href="https://www.nintendo.com/fr-fr/Mentions-legales/Propriete-intellectuelle/Politique-relative-a-la-propriete-intellectuelle-625951.html" target="_blank">
                    <p className="text-sm font-normal text-slate-600">Ce site n'est pas affilié à <span className="font-medium">Nintendo®</span>, <span className="font-medium">The Pokémon Company</span> ou <span className="font-medium">Game Freak.</span></p>
                    <p className="text-sm font-normal text-slate-600">Toutes les images, noms de Pokémon et autres informations appartiennent à leurs propriétaires respectifs.</p>
                </a>
            </footer>
        </div>
    );
}

export default Footer;
