// frontend/src/pages/Cancel.jsx
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-lg">
        <div className="text-red-500 text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your checkout process was interrupted or cancelled. No charges were made.
        </p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Return to Store
        </Link>
      </div>
    </div>
  );
};

export default Cancel;