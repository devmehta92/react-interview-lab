import React from "react";
import "./index.css";

type SeatsProps = {
    numberOfRows: number;        // total rows
    seatsPerRow?: number;        // default 10
    tierPrices?: {               // optional override
        front: number;
        middle: number;
        back: number;
    };
    seatTotal: number;
    updateSeatTotal: (price: number) => number;
};


const Seats: React.FC<SeatsProps> = ({ numberOfRows, seatsPerRow = 10, tierPrices = { front: 12, middle: 16, back: 20 }, seatTotal, updateSeatTotal }) => {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    );

    const base = Math.floor(numberOfRows / 3);
    const rem = numberOfRows % 3;
    const sizes = [
        base + (rem > 0 ? 1 : 0), // Front (closest to screen) — cheapest
        base + (rem > 1 ? 1 : 0), // Middle
        base,                     // Back (furthest) — most expensive
    ];

    const [frontCount, middleCount, backCount] = sizes;
    const frontEnd = frontCount - 1;
    const middleEnd = frontCount + middleCount - 1;
    // back = remaining

    const getTier = (rowIndex: number) => {
        if (rowIndex <= frontEnd) return "front";
        if (rowIndex <= middleEnd) return "middle";
        return "back";
    };

    const tierLabel: Record<"front" | "middle" | "back", string> = {
        front: "Front",
        middle: "Middle",
        back: "Back",
    };

    const tierPrice: Record<"front" | "middle" | "back", number> = {
        front: tierPrices.front,
        middle: tierPrices.middle,
        back: tierPrices.back,
    };

    const selectSeat = (seatPrice: number) => {
        const price = seatPrice + seatTotal!;
        updateSeatTotal(price);
    }

    return (
        <div className="seatingArea">
            {Array.from({ length: numberOfRows }, (_, rowIndex) => {
                const tier = getTier(rowIndex);
                const rowClass =
                    tier === "front" ? "row--front" : tier === "middle" ? "row--middle" : "row--back";
                const rowLabel = alphabet[rowIndex] ?? String(rowIndex + 1);

                return (
                    <div className={`seatRow ${rowClass}`} key={rowIndex}>
                        <span className="rowName">
                            {rowLabel}
                            <span className="rowTier"> — {tierLabel[tier]} • ${tierPrice[tier]}</span>
                        </span>

                        <div className="seats">
                            {Array.from({ length: seatsPerRow }, (_, seatIndex) => (
                                <span className="seat" key={seatIndex} onClick={() => selectSeat(tierPrice[tier])}>
                                    {seatIndex + 1}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Seats;