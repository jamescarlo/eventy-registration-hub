
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Calendar, Edit, LogOut } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui-custom/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui-custom/Card';
import AnimatedTransition from '@/components/ui-custom/AnimatedTransition';

// Mock user data
const USER = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Product designer and tech enthusiast. Love attending conferences and workshops to stay updated with the latest trends.',
  profileImage: 'https://i.pravatar.cc/300?img=8',
  joinDate: '2023-01-15T00:00:00',
  interests: ['Technology', 'Design', 'Education', 'Business'],
};

// Mock registered events
const REGISTERED_EVENTS = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    date: '2023-11-15T09:00:00',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    date: '2023-11-25T18:00:00',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    status: 'upcoming',
  },
  {
    id: 'past-1',
    title: 'UX Research Workshop',
    date: '2023-09-10T10:00:00',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    status: 'past',
  }
];

// Format date helper function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const Profile = () => {
  const [user, setUser] = useState<typeof USER | null>(null);
  const [events, setEvents] = useState<typeof REGISTERED_EVENTS>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    // Simulate loading user data from API
    const timer = setTimeout(() => {
      setUser(USER);
      setEvents(REGISTERED_EVENTS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    // In a real app, would redirect to login page after logout
  };

  const filteredEvents = events.filter(event => 
    activeTab === 'upcoming' ? event.status === 'upcoming' : event.status === 'past'
  );

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 animate-pulse">
            <div className="w-full md:w-1/3">
              <div className="h-56 bg-muted rounded-xl mb-6" />
            </div>
            <div className="w-full md:w-2/3">
              <div className="h-10 w-1/2 bg-muted rounded mb-4" />
              <div className="h-4 w-full bg-muted rounded mb-3" />
              <div className="h-4 w-full bg-muted rounded mb-3" />
              <div className="h-4 w-3/4 bg-muted rounded mb-6" />
              <div className="h-10 w-1/4 bg-muted rounded" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!user) return null;

  return (
    <AnimatedTransition>
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="animate-slide-up">
              <div className="p-6 pb-0 text-center">
                <div className="relative mx-auto">
                  <div className="h-32 w-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-md">
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-4 right-1/3 bg-white rounded-full p-1.5 shadow hover:shadow-md transition-shadow">
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Member since {formatDate(user.joinDate)}
                </p>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{user.location}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-2">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={handleLogout}
                  icon={<LogOut className="h-4 w-4" />}
                >
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle>Your Events</CardTitle>
              </CardHeader>
              
              <div className="px-6 border-b">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === 'upcoming'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    Upcoming Events
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === 'past'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    Past Events
                  </button>
                </div>
              </div>
              
              <CardContent className="p-6">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No {activeTab} events</h3>
                    <p className="text-muted-foreground mt-1">
                      {activeTab === 'upcoming' 
                        ? 'You haven\'t registered for any upcoming events yet.' 
                        : 'You haven\'t attended any events yet.'}
                    </p>
                    {activeTab === 'upcoming' && (
                      <Button className="mt-4" onClick={() => window.location.href = '/events'}>
                        Browse Events
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className="flex items-center space-x-4 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="h-16 w-16 rounded-md overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{event.title}</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            {formatDate(event.date)}
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  {user.bio}
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" icon={<Edit className="h-4 w-4" />}>
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </AnimatedTransition>
  );
};

export default Profile;
