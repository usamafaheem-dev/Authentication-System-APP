import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Cartoon Image */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Edited Cartoon - Background removed */}
              <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/page-not-found-5756378-4812410.png" 
                alt="Crying cartoon" 
                className="w-96 h-96 object-contain animate-bounce-slow"
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Awww...Don't Cry.
            </h1>
            
            <p className="text-xl text-green-600 mb-6">
              It's just a 404 Error!
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200 mb-6">
              <p className="text-lg text-gray-700 mb-2">
                What you're looking for may have been misplaced
              </p>
              <p className="text-lg font-semibold text-green-600">
                in Long Term Memory.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(-1)}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>

            {/* Funny Message */}
            <p className="text-sm text-green-500 mt-6">
              😢 Even websites need a good cry sometimes!
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;