import { Link } from 'react-router';
import Card, { CardBody, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { FaBook, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const TuitionCard = ({ tuition, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="flex flex-col h-[460px] animate-pulse">
        {/* Skeleton Image */}
        <div className="w-full h-48 bg-base-300"></div>
        
        {/* Skeleton Header */}
        <div className="p-6 pb-2 space-y-2">
          <div className="h-5 w-20 bg-base-300 rounded-lg"></div>
          <div className="h-6 w-3/4 bg-base-300 rounded-lg"></div>
        </div>

        {/* Skeleton Body */}
        <div className="p-6 pt-2 flex-1 space-y-4">
          <div className="h-4 w-full bg-base-300 rounded-lg"></div>
          <div className="h-4 w-5/6 bg-base-300 rounded-lg"></div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-1/2 bg-base-300 rounded-lg"></div>
            <div className="h-4 w-2/3 bg-base-300 rounded-lg"></div>
            <div className="h-4 w-1/3 bg-base-300 rounded-lg"></div>
          </div>
        </div>

        {/* Skeleton Footer */}
        <div className="p-6 pt-0 mt-auto">
          <div className="h-10 w-full bg-base-300 rounded-xl"></div>
        </div>
      </Card>
    );
  }

  // Choose a relevant illustration based on subject for premium styling
  const getSubjectImage = (subj) => {
    const s = subj?.toLowerCase() || '';
    if (s.includes('math')) return 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400&q=70';
    if (s.includes('physic') || s.includes('science') || s.includes('chem')) return 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400&q=70';
    if (s.includes('english') || s.includes('lang')) return 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400&q=70';
    return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400&q=70';
  };

  const formattedDate = tuition.createdAt 
    ? new Date(tuition.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return (
    <Card className="flex flex-col h-[465px]" hoverable>
      {/* Cover Image */}
      <div className="w-full h-44 overflow-hidden relative">
        <img 
          src={getSubjectImage(tuition.subject)} 
          alt={tuition.subject} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" size="sm">
            {tuition.classLevel}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-1">
        <CardTitle className="line-clamp-1 text-lg text-primary" title={tuition.title}>
          {tuition.title}
        </CardTitle>
      </CardHeader>

      <CardBody className="flex-1 flex flex-col justify-between">
        <CardDescription className="line-clamp-2 mb-4 text-xs">
          {tuition.description}
        </CardDescription>

        <div className="space-y-2.5 text-xs font-semibold text-base-content/80">
          <div className="flex items-center gap-2">
            <FaBook className="text-secondary w-3.5 h-3.5" />
            <span>Subject: {tuition.subject}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-secondary w-3.5 h-3.5" />
            <span className="truncate">Location: {tuition.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-secondary w-3.5 h-3.5" />
            <span>Posted: {formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-primary mt-1">
            <FaDollarSign className="w-4 h-4 text-primary" />
            <span>৳ {tuition.budget} / month</span>
          </div>
        </div>
      </CardBody>

      <CardFooter className="pt-4">
        <Link to={`/tuitions/${tuition._id}`} className="w-full">
          <Button className="w-full btn-sm py-2 text-xs">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TuitionCard;
