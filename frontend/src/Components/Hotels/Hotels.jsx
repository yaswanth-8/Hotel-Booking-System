import { useNavigate } from "react-router-dom";
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
    About:
      "Embark on a rejuvenating journey with your family and friends, away from the city into awe-inspiring naturescapes. Upon arriving at this villa, you will be swept away by the little bridge that traverses over a gentle stream, on a three-acre lush lawn. Spacious and welcoming with aesthetically pleasing interiors, all five bedrooms have ensuite bathrooms and are located on the ground level - a thoughtful plan to welcome our youngest and elderly guests.",
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
    About:
      "Embark on a rejuvenating journey with your family and friends, away from the city into awe-inspiring naturescapes. Upon arriving at this villa, you will be swept away by the little bridge that traverses over a gentle stream, on a three-acre lush lawn. Spacious and welcoming with aesthetically pleasing interiors, all five bedrooms have ensuite bathrooms and are located on the ground level - a thoughtful plan to welcome our youngest and elderly guests.",

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
    About:
      "Embark on a rejuvenating journey with your family and friends, away from the city into awe-inspiring naturescapes. Upon arriving at this villa, you will be swept away by the little bridge that traverses over a gentle stream, on a three-acre lush lawn. Spacious and welcoming with aesthetically pleasing interiors, all five bedrooms have ensuite bathrooms and are located on the ground level - a thoughtful plan to welcome our youngest and elderly guests.",

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
    About:
      "Embark on a rejuvenating journey with your family and friends, away from the city into awe-inspiring naturescapes. Upon arriving at this villa, you will be swept away by the little bridge that traverses over a gentle stream, on a three-acre lush lawn. Spacious and welcoming with aesthetically pleasing interiors, all five bedrooms have ensuite bathrooms and are located on the ground level - a thoughtful plan to welcome our youngest and elderly guests.",

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
    About:
      "Embark on a rejuvenating journey with your family and friends, away from the city into awe-inspiring naturescapes. Upon arriving at this villa, you will be swept away by the little bridge that traverses over a gentle stream, on a three-acre lush lawn. Spacious and welcoming with aesthetically pleasing interiors, all five bedrooms have ensuite bathrooms and are located on the ground level - a thoughtful plan to welcome our youngest and elderly guests.",

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
    About:
      "Embark on a rejuvenating journey with your family and friends, away from the city into awe-inspiring naturescapes. Upon arriving at this villa, you will be swept away by the little bridge that traverses over a gentle stream, on a three-acre lush lawn. Spacious and welcoming with aesthetically pleasing interiors, all five bedrooms have ensuite bathrooms and are located on the ground level - a thoughtful plan to welcome our youngest and elderly guests.",

    PricePerNight: 8000,
    Offer: 25,
    Site: "Mountain",
  },
];

const Hotels = () => {
  const navigate = useNavigate();

  const handleHotelClick = () => {
    navigate("/hotel");
  };

  return (
    <div className="hotels-section">
      {HotelDetails.map((hotel) => (
        <div
          className="hotel-card"
          key={hotel.HotelID}
          onClick={handleHotelClick}
        >
          <HotelCard Hotel={hotel} />
        </div>
      ))}
    </div>
  );
};

export default Hotels;
