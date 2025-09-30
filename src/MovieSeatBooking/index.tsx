import { useState } from "react";
import "./index.css";
import Seats from "./Seats";

const MovieSeatBooking = () => {
    const tierPrices = {
        front: 10,
        middle: 15,
        back: 22
    }

    return (
        <div className="container">
            <div className="title">Regal Cinemas</div>
            <div className="screen">SCREEN</div>
            <div className="seating">
                <Seats numberOfRows={12} seatsPerRow={10} tierPrices={{ front: 10, middle: 15, back: 22 }} />
            </div>
            <div className="legend">
                <div className="legendItem">
                    <span className="legendSwatch row--front" /> Front • ${tierPrices.front}
                </div>
                <div className="legendItem">
                    <span className="legendSwatch row--middle" /> Middle • ${tierPrices.middle}
                </div>
                <div className="legendItem">
                    <span className="legendSwatch row--back" /> Back • ${tierPrices.back}
                </div>
            </div>
        </div>
    )
};

export default MovieSeatBooking;