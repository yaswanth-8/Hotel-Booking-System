import HotelCard from "./HotelCard/HotelCard";
import "./Hotels.css";

const HotelDetails = [
  {
    HotelID: 1,
    Name: "Presidio Hotel",
    Address: "olympia tech park, chennai",
    Location: "Chennai",
    Country: "India",
    Url: "https://a0.muscache.com/im/pictures/miso/Hosting-48936440/original/d73cefef-6be0-4de9-886e-7780ac008492.jpeg?im_w=1200",
    FoodStyleID: "2",
    Rating: 5,
    Description: "Top class 5 star Hotel",
    PricePerNight: 3000,
    Offer: 10,
    Site: "Beachside",
  },
  {
    HotelID: 2,
    Name: "Grand Plaza",
    Address: "Downtown, New York",
    Location: "New York",
    Country: "United States",
    Url: "https://a0.muscache.com/im/pictures/miso/Hosting-48936440/original/d73cefef-6be0-4de9-886e-7780ac008492.jpeg?im_w=1200",
    FoodStyleID: "1",
    Rating: 4.5,
    Description: "Luxurious hotel in the heart of New York",
    PricePerNight: 5000,
    Offer: 15,
    Site: "City Center",
  },
  {
    HotelID: 3,
    Name: "Mountain View Resort",
    Address: "Ski Valley, Aspen",
    Location: "Aspen",
    Country: "United States",
    Url: "https://a0.muscache.com/im/pictures/miso/Hosting-48936440/original/d73cefef-6be0-4de9-886e-7780ac008492.jpeg?im_w=1200",
    FoodStyleID: "3",
    Rating: 4.2,
    Description: "Enjoy breathtaking mountain views in Aspen",
    PricePerNight: 7000,
    Offer: 20,
    Site: "Mountain",
  },
  {
    HotelID: 4,
    Name: "Royal Palace",
    Address: "Palace Road, London",
    Location: "London",
    Country: "United Kingdom",
    Url: "https://a0.muscache.com/im/pictures/miso/Hosting-48936440/original/d73cefef-6be0-4de9-886e-7780ac008492.jpeg?im_w=1200",
    FoodStyleID: "4",
    Rating: 4.8,
    Description: "Experience luxury at its finest in London",
    PricePerNight: 6000,
    Offer: 10,
    Site: "City Center",
  },
  {
    HotelID: 5,
    Name: "Serenity Resort",
    Address: "Beach Road, Bali",
    Location: "Bali",
    Country: "Indonesia",
    Url: "https://a0.muscache.com/im/pictures/miso/Hosting-48936440/original/d73cefef-6be0-4de9-886e-7780ac008492.jpeg?im_w=1200",
    FoodStyleID: "2",
    Rating: 4.6,
    Description: "Relax and unwind in the tropical paradise of Bali",
    PricePerNight: 4500,
    Offer: 12,
    Site: "Beachside",
  },
  {
    HotelID: 6,
    Name: "Alpine Retreat",
    Address: "Mountain View Drive, Switzerland",
    Location: "Switzerland",
    Country: "Switzerland",
    Url: "https://a0.muscache.com/im/pictures/miso/Hosting-48936440/original/d73cefef-6be0-4de9-886e-7780ac008492.jpeg?im_w=1200",
    FoodStyleID: "3",
    Rating: 4.9,
    Description: "Experience the beauty of the Swiss Alps",
    PricePerNight: 8000,
    Offer: 25,
    Site: "Mountain",
  },
];

function Hotels() {
  return (
    <div className="hotels-section">
      {HotelDetails.map((hotel) => (
        <HotelCard className="hotel-card" key={hotel.HotelID} Hotel={hotel} />
      ))}
    </div>
  );
}

export default Hotels;
