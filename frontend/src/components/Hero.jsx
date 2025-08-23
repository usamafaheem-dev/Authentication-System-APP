import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen  bg-green-50 overflow-x-hidden  md:overflow-y-hidden">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge
              variant="secondary"
              className="mb-4 text-green-800 border border-green-200"
            >
              <Zap className="w-3 h-3 mr-1" /> New: AI-powered note organization
            </Badge>

            <h1 className="text-green-600 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Your thoughts, organized and accessible{" "}
              <span className="text-gray-800">everywhere</span>
            </h1>

            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Capture ideas, organize thoughts, and collaborate seamlessly. The
              modern note-taking app that grows with you and keeps your ideas
              secure in the cloud.
            </p>

            <div className="space-x-4 mt-4 flex flex-wrap justify-center gap-2 md:gap-0">
              {/* White Button with hover animation */}
              <Button
                onClick={() => navigate("/create-todo")}
                size="lg"
                className="group h-12 px-8 bg-white text-green-700 border border-green-600 hover:bg-green-100 transition"
              >
                Start Taking Notes
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 bg-green-600 text-white hover:bg-green-500 transition"
              >
                Watch Demo
              </Button>
            </div>

            <p className="text-sm text-green-800 mt-2">
              Free forever • No credit card required • 2 minutes setup
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
