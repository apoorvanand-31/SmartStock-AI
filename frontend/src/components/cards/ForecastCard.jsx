function ForecastCard({ forecast }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 transition duration-300 hover:shadow-xl hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-4">
        Demand Forecast
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">
            Predicted Demand
          </p>

          <h1 className="text-4xl font-bold text-blue-600">
            {forecast.predictedDemand}
          </h1>
        </div>

        <div>
          <p className="text-gray-500">
            Transactions Used
          </p>

          <h1 className="text-4xl font-bold text-green-600">
            {forecast.basedOnTransactions}
          </h1>
        </div>

      </div>
    </div>
  );
}

export default ForecastCard;