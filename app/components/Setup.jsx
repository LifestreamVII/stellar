import React from 'react'

const Card = ({ title, description }) => {
    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p>{description}</p>
        </div>
    );
}

const Setup = () => {
    const cards = [
        { title: 'Card 1', description: 'Description for card 1' },
        { title: 'Card 2', description: 'Description for card 2' },
        { title: 'Card 3', description: 'Description for card 3' },
        // Add more cards as needed
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Card Scroller</h1>
            <div className="card-scroll-container">
                {cards.map((card, index) => (
                    <Card key={index} title={card.title} description={card.description} />
                ))}
            </div>
        </div>
    );
}

export default Setup