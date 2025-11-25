import AnimatedSearch from './AnimatedSearch';
import ThemeToggle from './ThemeToggle';
import logoDark from '../../assets/images/logo-dark.webp';
import logoLight from '../../assets/images/logo-light.webp';
import LocationInput from '../location/LocationInput';
import { HeaderNavbar, MobileNavbar } from '../navbar';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
    const { theme } = useTheme();

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 bg-gradient-to-b from-[#f9fbff] to-[#eef4ff] dark:from-[#0b1120] dark:to-[#0e1423] shadow-md py-4 z-50`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <a href="#home">
                    <img src={theme === "dark" ? logoLight : logoDark} alt="Appointer" className="w-40" />
                </a>

                {/* Nav Links */}
                <HeaderNavbar />

                {/* Right Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <LocationInput onLocationChosen={({ city }) => {
                        // optional: navigate or fetch providers here
                        console.log("Location chosen:", city);
                        // e.g., dispatch(fetchProvidersForCity(city))
                    }} />
                    <AnimatedSearch />
                    <ThemeToggle />
                </div>

                {/* Mobile Menu */}
                <MobileNavbar />
            </div>
        </header>
    );
};

export default Header;
