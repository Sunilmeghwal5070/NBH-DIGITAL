/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import MarketPage from './pages/MarketPage';
import ProductDetail from './pages/ProductDetail';
import BusinessDirectory from './pages/BusinessDirectory';
import BusinessCategory from './pages/BusinessCategory';
import BusinessRegistration from './pages/BusinessRegistration';
import Authentication from './pages/Authentication';
import OffersPage from './pages/OffersPage';
import CreateOffer from './pages/CreateOffer';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetail from './pages/PropertyDetail';
import ResalePage from './pages/ResalePage';
import ActivitiesPage from './pages/ActivitiesPage';
import ProfilePage from './pages/ProfilePage';
import UpdatesPage from './pages/UpdatesPage';
import CreateResale from './pages/CreateResale';
import SearchPage from './pages/SearchPage';
import CreateNews from './pages/CreateNews';

import NewsDetail from './pages/NewsDetail';
import Discussions from './pages/Discussions';
import EventDetail from './pages/EventDetail';
import Polls from './pages/Polls';
import NotificationsPage from './pages/NotificationsPage';
import ShareCity from './pages/ShareCity';
import ReportIssue from './pages/ReportIssue';
import PositiveUpdates from './pages/PositiveUpdates';
import SharePositiveUpdate from './pages/SharePositiveUpdate';
import AskCity from './pages/AskCity';
import ShareIdea from './pages/ShareIdea';
import PromoteBusiness from './pages/PromoteBusiness';
import AccountSettings from './pages/AccountSettings';
import MyBusinesses from './pages/MyBusinesses';
import MyPosts from './pages/MyPosts';
import NotificationSettings from './pages/NotificationSettings';

import EventsPage from './pages/EventsPage';
import RequestEvent from './pages/RequestEvent';
import HomeServices from './pages/HomeServices';
import NoInternetConnection from './pages/NoInternetConnection';
import JobsPage from './pages/JobsPage';
import JobDetail from './pages/JobDetail';

import ListProperty from './pages/ListProperty';
import AppBanner from './components/AppBanner';

export default function App() {
  return (
    <BrowserRouter>
      <AppBanner />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/auth" element={<Authentication />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/resale" element={<ResalePage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        
        {/* Full screen pages */}
        <Route path="/offers/create" element={<CreateOffer />} />
        <Route path="/properties/create" element={<ListProperty />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/resale/create" element={<CreateResale />} />
        <Route path="/business" element={<BusinessDirectory />} />
        <Route path="/business/category/:id" element={<BusinessCategory />} />
        <Route path="/business/register" element={<BusinessRegistration />} />
        <Route path="/search" element={<SearchPage />} />

        {/* New Pages */}
        <Route path="/updates/create" element={<CreateNews />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/request" element={<RequestEvent />} />
        <Route path="/home-services" element={<HomeServices />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/offline" element={<NoInternetConnection />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/notifications/settings" element={<NotificationSettings />} />
        <Route path="/share-city" element={<ShareCity />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/positive-updates" element={<PositiveUpdates />} />
        <Route path="/positive-updates/share" element={<SharePositiveUpdate />} />
        <Route path="/ask-city" element={<AskCity />} />
        <Route path="/share-idea" element={<ShareIdea />} />
        <Route path="/promote-business" element={<PromoteBusiness />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/my-businesses" element={<MyBusinesses />} />
        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </BrowserRouter>
  );
}
