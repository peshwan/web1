interface PriceCardProps {
    label: string;
    value: string;
    lastUpdate: string;
}

export function PriceCard({ label, value, lastUpdate }: PriceCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-2 md:p-6 text-center relative overflow-hidden w-full h-full flex flex-col justify-between" title={`سعر الذهب اليوم - ${label}`}> {/* Reduced mobile padding to p-2, added h-full, flex, flex-col, justify-between */}
            {/* Rainbow border at top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500"></div>
            
            <div> {/* Wrapper for top content */}
                <div className="text-base text-gray-700 mb-2 md:mb-4">{label}</div> {/* Adjusted mb for mobile */}
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 md:mb-3" style={{ fontFamily: 'Arial' }}>{value}</div> {/* Adjusted font size and mb for mobile */}
            </div>
            <div className="text-xs text-gray-500 mt-1 md:mt-2">{lastUpdate}</div> {/* Adjusted mt for mobile */}
        </div>
    );
}
