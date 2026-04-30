import { useState } from 'react';
import { Bell, Search, Clock, User } from 'lucide-react'; // Assume icons available or use emojis

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-16 glassXDR flex items-center px-6 border-b border-xdr-border shadow-control-room">
      {/* Left: Logo/Org */}
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Sijen" className="w-8 h-8 rounded-lg shadow-control-room object-cover" />
        <div>
          <h1 className="text-lg font-semibold text-xdr-text">Sijen's Portfolio</h1>
          <p className="text-xs text-xdr-muted">Personal Site</p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xdr-muted w-4 h-4" />
            <input
            type="text"
            placeholder="Search projects, experience, Leo activities..."
            className="w-full pl-11 pr-4 py-2 bg-xdr-panel/50 border border-xdr-border rounded-lg text-xdr-text placeholder-xdr-muted focus:outline-none focus:border-xdr-info/50 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right: Time, Alerts, User */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-sm text-xdr-muted">
          <Clock className="w-4 h-4" />
          <span>Today</span>
        </div>
        
        <div className="relative">
          <Bell className="w-5 h-5 text-xdr-muted cursor-pointer hover:text-xdr-info" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-xdr-critical text-xs rounded-full flex items-center justify-center font-bold">3</span>
        </div>
        
        <div className="w-8 h-8 glassXDR rounded-full flex items-center justify-center cursor-pointer hover:border-xdr-info/50">
          <User className="w-5 h-5 text-xdr-muted" />
        </div>
      </div>
    </div>
  );
}

