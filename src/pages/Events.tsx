
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Filter, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui-custom/Button';
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui-custom/Card';
import AnimatedTransition from '@/components/ui-custom/AnimatedTransition';

// Mock event data
const EVENTS = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    description: 'Join us for the biggest tech conference of the year with industry leaders.',
    date: '2023-11-15T09:00:00',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    category: 'Technology',
    price: '$249',
  },
  {
    id: '2',
    title: 'Design Summit',
    description: 'Explore the latest trends in UI/UX design with expert workshops.',
    date: '2023-11-20T10:00:00',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    category: 'Design',
    price: '$199',
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Watch innovative startups pitch their ideas to top investors.',
    date: '2023-11-25T18:00:00',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Business',
    price: 'Free',
  },
  {
    id: '4',
    title: 'AI Workshop Series',
    description: 'Hands-on workshop series on artificial intelligence and machine learning.',
    date: '2023-12-05T09:00:00',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    category: 'Education',
    price: '$129',
  },
  {
    id: '5',
    title: 'Product Management Bootcamp',
    description: 'Three-day intensive bootcamp for aspiring product managers.',
    date: '2023-12-10T09:00:00',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    category: 'Education',
    price: '$349',
  },
];

// Format date helper function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<typeof EVENTS>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading events from API
    const timer = setTimeout(() => {
      setEvents(EVENTS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatedTransition>
      <Header />
      <main className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
              <Calendar className="h-3 w-3 mr-1" />
              Upcoming Events
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Discover Events</h1>
            <p className="text-muted-foreground mt-1">Find and register for exciting events near you</p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px] h-10 pl-10 pr-4 rounded-full border border-input focus-ring"
              />
            </div>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-2 mb-6 gap-2 scrollbar-hide">
          <Button variant="outline" size="sm" className="rounded-full">
            All Events
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            Technology
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            Design
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            Business
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            Education
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="opacity-70 animate-pulse">
                <div className="h-48 bg-muted rounded-t-xl" />
                <CardHeader>
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-1/2 bg-muted rounded" />
                </CardContent>
                <CardFooter>
                  <div className="h-10 w-full bg-muted rounded" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No events found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <Card 
                key={event.id}
                hover
                clickable
                onClick={() => navigate(`/events/${event.id}`)}
                className="overflow-hidden transition-all"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <CardImage
                  src={event.image}
                  alt={event.title}
                  aspectRatio="16:9"
                  overlay
                />
                
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-primary">
                    {event.category}
                  </span>
                </div>
                
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <span className="font-medium">{event.price}</span>
                  <Button size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </AnimatedTransition>
  );
};

export default Events;
