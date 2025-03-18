
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Calendar, Clock, MapPin, Users, Share2, ArrowLeft, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui-custom/Button';
import { Card, CardContent } from '@/components/ui-custom/Card';
import AnimatedTransition from '@/components/ui-custom/AnimatedTransition';

// Mock event data (same as in Events.tsx)
const EVENTS = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    description: 'Join us for the biggest tech conference of the year with industry leaders.',
    longDescription: `
      Join us for the biggest tech conference of the year, featuring keynote speeches from industry leaders, interactive workshops, and networking opportunities.
      
      This is a 3-day event packed with insights into the latest technologies and trends. You'll have the chance to meet experts from major tech companies and participate in hands-on sessions.
      
      The conference will cover topics including AI, cloud computing, cybersecurity, blockchain, and much more. Whether you're a developer, designer, product manager, or tech enthusiast, there's something for everyone.
    `,
    date: '2023-11-15T09:00:00',
    endDate: '2023-11-17T18:00:00',
    location: 'Moscone Center, San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    category: 'Technology',
    price: '$249',
    capacity: 5000,
    organizer: 'TechEvents Inc.',
    attendees: 3240,
    highlights: [
      'Keynote speeches from industry leaders',
      'Interactive workshops and panels',
      'Networking opportunities',
      'Product demos and exhibitions',
      'Career fair with top tech companies'
    ]
  },
  {
    id: '2',
    title: 'Design Summit',
    description: 'Explore the latest trends in UI/UX design with expert workshops.',
    longDescription: `
      The Design Summit is a premier event for designers and creative professionals looking to stay on the cutting edge of UI/UX design.
      
      This summit features expert-led workshops, panel discussions, and hands-on sessions covering topics such as design systems, user research, accessibility, and emerging design tools and technologies.
      
      Attendees will learn practical skills they can immediately apply to their work, gain insights from industry leaders, and connect with fellow designers from around the world.
    `,
    date: '2023-11-20T10:00:00',
    endDate: '2023-11-21T17:00:00',
    location: 'Design Center, New York, NY',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    category: 'Design',
    price: '$199',
    capacity: 800,
    organizer: 'DesignHub',
    attendees: 560,
    highlights: [
      'Expert-led workshops on UI/UX design',
      'Panel discussions on design trends',
      'Portfolio reviews with industry professionals',
      'Design tools showcase',
      'Networking events with design community'
    ]
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Watch innovative startups pitch their ideas to top investors.',
    longDescription: `
      Startup Pitch Night is an exciting evening where promising early-stage startups present their innovative ideas to a panel of top investors and entrepreneurs.
      
      Each startup will have 5 minutes to pitch followed by a 3-minute Q&A session with the panel. Attendees will witness the next generation of groundbreaking companies and see firsthand how investors evaluate potential opportunities.
      
      After the pitches, there will be a networking reception where attendees can meet the founders, investors, and other startup enthusiasts. This is a great opportunity for entrepreneurs, investors, and anyone interested in the startup ecosystem.
    `,
    date: '2023-11-25T18:00:00',
    endDate: '2023-11-25T21:30:00',
    location: 'Capital Factory, Austin, TX',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Business',
    price: 'Free',
    capacity: 200,
    organizer: 'Founders Collective',
    attendees: 185,
    highlights: [
      'Pitches from 10 innovative startups',
      'Expert panel of venture capitalists and entrepreneurs',
      'Networking reception with founders and investors',
      'Opportunity to vote for audience favorite',
      'Complimentary refreshments and drinks'
    ]
  },
  {
    id: '4',
    title: 'AI Workshop Series',
    description: 'Hands-on workshop series on artificial intelligence and machine learning.',
    longDescription: `
      The AI Workshop Series is a comprehensive program designed for developers, data scientists, and tech professionals looking to enhance their skills in artificial intelligence and machine learning.
      
      This hands-on series includes four full-day workshops covering topics such as neural networks, computer vision, natural language processing, and reinforcement learning. Each workshop combines theoretical knowledge with practical coding exercises.
      
      Participants will work on real-world projects and receive guidance from experienced AI practitioners. By the end of the series, attendees will have built several AI applications and gained valuable skills that can be applied immediately.
    `,
    date: '2023-12-05T09:00:00',
    endDate: '2023-12-08T17:00:00',
    location: 'Tech Hub, Seattle, WA',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    category: 'Education',
    price: '$129',
    capacity: 100,
    organizer: 'AI Academy',
    attendees: 78,
    highlights: [
      'Four full-day hands-on workshops',
      'Practical coding exercises with real datasets',
      'Small class size for personalized attention',
      'Take-home projects and resources',
      'Certificate of completion'
    ]
  },
  {
    id: '5',
    title: 'Product Management Bootcamp',
    description: 'Three-day intensive bootcamp for aspiring product managers.',
    longDescription: `
      The Product Management Bootcamp is an intensive three-day program designed to equip participants with the essential skills and knowledge needed to excel in product management roles.
      
      Led by experienced product leaders from top tech companies, this bootcamp covers the entire product lifecycle - from ideation and user research to roadmap planning, execution, and analytics. Through a combination of lectures, case studies, and interactive exercises, participants will learn how to build and launch successful products.
      
      This bootcamp is ideal for aspiring product managers, entrepreneurs, and professionals looking to transition into product management roles. No technical background is required, but basic familiarity with technology products is beneficial.
    `,
    date: '2023-12-10T09:00:00',
    endDate: '2023-12-12T17:00:00',
    location: 'Innovation Center, Chicago, IL',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    category: 'Education',
    price: '$349',
    capacity: 50,
    organizer: 'Product School',
    attendees: 42,
    highlights: [
      'Learn from product leaders at top tech companies',
      'Hands-on exercises and case studies',
      'Product strategy and roadmap planning',
      'User research and validation techniques',
      'Metrics and analytics for product success'
    ]
  },
];

// Format date range helper function
const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(start);
  
  const endFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(end);
  
  return `${startFormatted} - ${endFormatted}`;
};

// Format time helper function
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<typeof EVENTS[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    // Simulate loading event details from API
    const timer = setTimeout(() => {
      const foundEvent = EVENTS.find(e => e.id === id) || null;
      setEvent(foundEvent);
      setIsLoading(false);
      
      if (!foundEvent) {
        toast.error('Event not found');
        navigate('/events');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  const handleRegister = () => {
    setIsRegistering(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsRegistering(false);
      setRegistered(true);
      toast.success('Successfully registered for the event!');
    }, 1500);
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API if available
    // or copy the URL to clipboard as a fallback
    toast.success('Event link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
          <div className="w-full h-64 bg-muted rounded-xl animate-pulse mb-8" />
          <div className="h-10 w-3/4 bg-muted rounded animate-pulse mb-4" />
          <div className="h-6 w-1/2 bg-muted rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-muted rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-muted rounded animate-pulse mb-3" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse mb-3" />
            </div>
            <div>
              <div className="h-48 w-full bg-muted rounded animate-pulse mb-4" />
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!event) return null;

  return (
    <AnimatedTransition type="fade">
      <Header />
      <main className="pt-20 pb-20">
        <div 
          className="w-full h-[40vh] bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${event.image})` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <button 
              onClick={() => navigate('/events')}
              className="inline-flex items-center mb-4 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to events
            </button>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium mb-3">
              {event.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-sm">
              {event.title}
            </h1>
            <p className="text-white/90 md:text-lg max-w-3xl drop-shadow-sm">
              {event.description}
            </p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 order-2 md:order-1">
              <Card className="overflow-hidden animate-slide-up">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">About This Event</h2>
                </div>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    {event.longDescription.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Event Highlights</h3>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Organizer</h3>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{event.organizer}</p>
                        <p className="text-sm text-muted-foreground">Event Organizer</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="order-1 md:order-2">
              <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <CardContent className="p-6 space-y-5">
                  <div>
                    <p className="text-lg font-medium">{event.price}</p>
                    <div className="mt-1 flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1.5" />
                      <span>
                        {event.attendees} attending · {event.capacity - event.attendees} spots left
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-start mb-4">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 shrink-0" />
                      <div>
                        <p className="font-medium">Date and Time</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDateRange(event.date, event.endDate)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(event.date)} - {formatTime(event.endDate)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 shrink-0" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {event.location}
                        </p>
                        <button className="text-sm text-primary hover:underline mt-1">
                          View Map
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      fullWidth
                      size="lg"
                      loading={isRegistering}
                      disabled={registered}
                      onClick={handleRegister}
                    >
                      {registered ? 'Registered' : 'Register Now'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleShare}
                      icon={<Share2 className="h-4 w-4" />}
                    >
                      Share Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </AnimatedTransition>
  );
};

export default EventDetail;
