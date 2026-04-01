import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";

// Public Pages
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Inquiry from "@/pages/Inquiry";
import Contact from "@/pages/Contact";
import Schedule from "@/pages/Schedule";
import Notice from "@/pages/Notice";
import NotFound from "@/pages/not-found";

// About
import AboutPage from "@/pages/about/AboutPage";

// Business
import BusinessPage from "@/pages/business/BusinessPage";

// Shop
import ShopPage from "@/pages/shop/ShopPage";
import ProductDetailPage from "@/pages/shop/ProductDetailPage";
import CartPage from "@/pages/shop/CartPage";

// Admin Pages
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminInquiries from "@/pages/admin/Inquiries";
import AdminContentEditor from "@/pages/admin/ContentEditor";
import AdminSchedule from "@/pages/admin/ScheduleAdmin";
import AdminProducts from "@/pages/admin/ProductsAdmin";

// Layouts
import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      {/* Admin Auth Route - no layout */}
      <Route path="/admin/login" component={AdminLogin} />

      {/* Admin Routes */}
      <Route path="/admin">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </Route>
      <Route path="/admin/inquiries">
        <AdminLayout><AdminInquiries /></AdminLayout>
      </Route>
      <Route path="/admin/content">
        <AdminLayout><AdminContentEditor /></AdminLayout>
      </Route>
      <Route path="/admin/schedule">
        <AdminLayout><AdminSchedule /></AdminLayout>
      </Route>
      <Route path="/admin/products">
        <AdminLayout><AdminProducts /></AdminLayout>
      </Route>

      {/* Public Routes */}
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>

      {/* About */}
      <Route path="/about">
        <PublicLayout><AboutPage /></PublicLayout>
      </Route>
      <Route path="/about/:section">
        {(params) => (
          <PublicLayout><AboutPage /></PublicLayout>
        )}
      </Route>

      {/* Business */}
      <Route path="/business">
        <PublicLayout><BusinessPage /></PublicLayout>
      </Route>
      <Route path="/business/:section">
        {(params) => (
          <PublicLayout><BusinessPage /></PublicLayout>
        )}
      </Route>

      {/* Shop */}
      <Route path="/shop">
        <PublicLayout><ShopPage /></PublicLayout>
      </Route>
      <Route path="/shop/cart">
        <PublicLayout><CartPage /></PublicLayout>
      </Route>
      <Route path="/shop/product/:id">
        {(params) => (
          <PublicLayout><ProductDetailPage /></PublicLayout>
        )}
      </Route>
      <Route path="/shop/:category">
        {(params) => (
          <PublicLayout><ShopPage /></PublicLayout>
        )}
      </Route>
      <Route path="/shop/:category/:sub">
        {(params) => (
          <PublicLayout><ShopPage /></PublicLayout>
        )}
      </Route>

      {/* Portfolio */}
      <Route path="/portfolio">
        <PublicLayout><Portfolio /></PublicLayout>
      </Route>
      <Route path="/portfolio/:category">
        {(params) => (
          <PublicLayout><Portfolio /></PublicLayout>
        )}
      </Route>

      {/* Customer Center */}
      <Route path="/schedule">
        <PublicLayout><Schedule /></PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout><Contact /></PublicLayout>
      </Route>
      <Route path="/inquiry">
        <PublicLayout><Inquiry /></PublicLayout>
      </Route>
      <Route path="/notice">
        <PublicLayout><Notice /></PublicLayout>
      </Route>

      {/* 404 */}
      <Route>
        <PublicLayout><NotFound /></PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
