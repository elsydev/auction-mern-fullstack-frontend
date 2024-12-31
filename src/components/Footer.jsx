const Footer = () => {

    return (

        <footer className="bg-gray-800 text-white p-4 mt-8">

            <div className="container mx-auto text-center">

                <p className="mb-2">© 2023 Subastas de Vehículos. Todos los derechos reservados.</p>

                <div className="flex justify-center space-x-4">

                    <a href="/terms" className="text-white">Términos y Condiciones</a>

                    <a href="/privacy" className="text-white">Política de Privacidad</a>

                </div>

            </div>

        </footer>

    );

};


export default Footer;