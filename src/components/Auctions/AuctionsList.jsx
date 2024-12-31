const AuctionsList = () => {
    const auctions = [
        { id: 1, image: 'car1.jpg', price: '$10,000', timeRemaining: '2d 3h', detailsLink: '/auctions/1' },
        { id: 2, image: 'car2.jpg', price: '$15,000', timeRemaining: '1d 5h', detailsLink: '/auctions/2' },
        // Agrega más vehículos según sea necesario
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {auctions.map(auction => (
                <div key={auction.id} className="border rounded-lg overflow-hidden shadow-md">
                    <img src={auction.image} alt={`Vehículo ${auction.id}`} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-bold">{auction.price}</h3>
                        <p className="text-gray-600">Tiempo restante: {auction.timeRemaining}</p>
                        <a href={auction.detailsLink} className="bg-blue-500 text-white p-2 rounded mt-2 inline-block">Ver detalles</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AuctionsList;