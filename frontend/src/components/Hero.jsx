import { ArrowRight, User, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/Context/ContextApi";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="relative w-full h-screen  bg-green-50 overflow-x-hidden  md:overflow-y-hidden">
      <section className="w-full py-12 md:py-20 lg:py-22 xl:py-18" >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
           {user?<h1 className="text-lg font-semibold "style={{fontFamily:"cursive"}}>Welcome <span className="text-green-600">{user.username}</span></h1>:<h1 className="text-lg font-semibold "style={{fontFamily:"cursive"}}>Welcome <span className="text-green-600">Guest</span> </h1>  }
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
                onClick={() => navigate("/")}
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
