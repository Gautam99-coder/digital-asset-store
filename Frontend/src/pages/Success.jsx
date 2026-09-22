// frontend/src/pages/Success.jsx
import { Link, useSearchParams } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-lg border-t-8 border-green-500">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
        
        {orderId && (
          <div className="bg-gray-100 p-4 rounded mb-8 text-left">
            <p className="text-sm text-gray-500 font-bold uppercase">Order Reference:</p>
            <p className="text-gray-800 font-mono text-sm break-all">{orderId}</p>
            <p className="text-xs text-gray-400 mt-2">
              (Please save this ID for your records)
            </p>
          </div>
        )}

        <Link 
          to="/" 
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition font-bold"
        >
          Back to Store
        </Link>
      </div>
    </div>
  );
};

export default Success;