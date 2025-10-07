import Background from "@/components/Background";
import MouseTrail from "@/components/MouseTrail";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ErrorBoundary, AsyncBoundary } from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/Toast";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Portfolio from "@/pages/Portfolio";
import Reset from "@/pages/Reset";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { useAnalytics, usePerformanceTracking } from "@/hooks/useAnalytics";
import { Suspense, useEffect } from "react";
import { PageSkeleton } from "@/components/LoadingStates";
import { initMobileOptimizations, enhanceScrollSnap } from "@/utils/mobile";

const AppContent = () => {
  // Initialize analytics and performance tracking
  useAnalytics();
  usePerformanceTracking();
  
  // Initialize mobile optimizations
  useEffect(() => {
    initMobileOptimizations();
    enhanceScrollSnap();
  }, []);
  
  return (
    <div className="bg-black text-white">
      <Background />
      <MouseTrail />
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageSkeleton type="home" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AsyncBoundary>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AsyncBoundary>
    </ErrorBoundary>
  );
};

export default App;
