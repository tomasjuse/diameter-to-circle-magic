import CircleCalculator from '@/components/CircleCalculator';
import mathematicalBg from '@/assets/mathematical-bg.jpg';

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${mathematicalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="container mx-auto">
          <CircleCalculator />
        </div>
      </div>
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-mathematical/10 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-12 h-12 rounded-full bg-accent/10 animate-pulse-gentle"></div>
      <div className="absolute top-1/2 right-8 w-8 h-8 rounded-full bg-geometric/15 animate-float" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default Index;
