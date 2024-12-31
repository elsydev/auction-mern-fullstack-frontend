const ContactForm = () => {
    return (
        <form className="bg-white p-6 rounded shadow-md w-full max-w-md mt-8">
            <h2 className="text-lg mb-4">Contáctenos</h2>
            <input type="text" placeholder="Nombre" className="border p-2 mb-4 w-full" required />
            <input type="email" placeholder="Email" className="border p-2 mb-4 w-full" required />
            <textarea placeholder="Mensaje" className="border p-2 mb-4 w-full" required></textarea>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Enviar</button>
        </form>
    );
};

export default ContactForm;