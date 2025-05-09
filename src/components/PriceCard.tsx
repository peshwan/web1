interface PriceCardProps {
    label: string;
    value: string;
    lastUpdate: string;
}

export function PriceCard({ label, value, lastUpdate }: PriceCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-3 md:p-6 text-center relative overflow-hidden w-full" title={`سعر الذهب اليوم - ${label}`}>
            {/* Rainbow border at top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500"></div>
            
            <div className="text-base text-gray-700 mb-4">{label}</div>
            <div className="text-4xl font-bold text-blue-600 mb-3" style={{ fontFamily: 'Arial' }}>{value}</div>
            <div className="text-xs text-gray-500 mt-2">{lastUpdate}</div>
        </div>
    );
}
