import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 p-4 fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg">Subastas de Vehículos</Link>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white md:hidden">
                    {isOpen ? '✖' : '☰'}
                </button>
                <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block`}>
                    <Link to="/" className="text-white px-4">Inicio</Link>
                    <Link to="/auctions" className="text-white px-4">Subastas</Link>
                    <Link to="/profile" className="text-white px-4">Perfil</Link>
                    <Link to="/about" className="text-white px-4">Acerca de</Link>
                    <Link to="/contact" className="text-white px-4">Contacto</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;