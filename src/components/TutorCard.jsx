import Card, { CardBody, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { FaMapMarkerAlt, FaStar, FaEnvelope } from 'react-icons/fa';

const TutorCard = ({ tutor, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="flex flex-col h-[400px] animate-pulse">
        {/* Banner skeleton */}
        <div className="w-full h-24 bg-base-300"></div>
        {/* Avatar skeleton */}
        <div className="w-20 h-20 rounded-full bg-base-300 -mt-10 border-4 border-base-100 mx-auto"></div>
        
        <div className="p-6 text-center space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-5 w-1/2 bg-base-300 rounded-lg mx-auto"></div>
            <div className="h-4 w-3/4 bg-base-300 rounded-lg mx-auto"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-2/3 bg-base-300 rounded-lg mx-auto"></div>
            <div className="h-4 w-1/3 bg-base-300 rounded-lg mx-auto"></div>
          </div>
          <div className="h-9 w-full bg-base-300 rounded-xl mt-auto"></div>
        </div>
      </Card>
    );
  }

  // Mock qualifications and subjects since these vary based on user
  const subjectsText = tutor.subjectsJoined || "Math, Science, English";
  const locationText = tutor.location || "Dhaka, Bangladesh";
  const ratingText = tutor.rating || "4.8";

  return (
    <Card className="flex flex-col h-[400px] text-center" hoverable>
      {/* Cover Banner */}
      <div className="w-full h-24 bg-gradient-to-r from-primary/30 to-secondary/30 relative"></div>
      
      {/* Overlapping circular avatar */}
      <div className="avatar -mt-10 justify-center">
        <div className="w-20 rounded-full ring-4 ring-base-100 ring-offset-2 ring-offset-primary/40 overflow-hidden bg-base-100 mx-auto">
          <img 
            src={tutor.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} 
            alt={tutor.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <CardHeader className="pt-2 pb-0 flex flex-col items-center">
        <CardTitle className="text-base text-primary line-clamp-1">
          {tutor.name}
        </CardTitle>
        <div className="flex items-center gap-1 text-[11px] text-base-content/50 truncate max-w-full">
          <FaEnvelope className="flex-shrink-0" />
          <span>{tutor.email}</span>
        </div>
      </CardHeader>

      <CardBody className="flex-1 flex flex-col justify-between p-4">
        <div>
          <CardDescription className="line-clamp-2 text-xs mb-3 font-medium mt-1">
            Verified Tutor specializing in {subjectsText}.
          </CardDescription>

          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            <Badge variant="ghost" size="sm" className="flex items-center gap-1">
              <FaStar className="text-accent w-2.5 h-2.5" />
              <span>{ratingText} Rating</span>
            </Badge>
            <Badge variant="ghost" size="sm" className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-secondary w-2.5 h-2.5" />
              <span className="truncate max-w-[80px]">{locationText.split(',')[0]}</span>
            </Badge>
          </div>
        </div>

        <div className="mt-auto">
          <Badge variant="secondary" size="sm" className="w-full mb-3 py-1 font-extrabold flex items-center justify-center gap-1">
            <svg className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-13 5l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            <span>Verified Educator</span>
          </Badge>
        </div>
      </CardBody>

      <CardFooter className="p-4 pt-0">
        <a href={`mailto:${tutor.email}`} className="w-full">
          <Button variant="primary" className="w-full btn-sm text-xs">
            Contact Tutor
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default TutorCard;
