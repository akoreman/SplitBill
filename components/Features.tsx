import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPercentage, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: faUsers,
    title: 'Group Splitting',
    description: 'Split bills among multiple friends with customizable shares for each person.'
  },
  {
    icon: faPercentage,
    title: 'Tip Calculator',
    description: 'Automatically calculate tips and distribute them fairly among all participants.'
  },
  {
    icon: faMobileAlt,
    title: 'Mobile Friendly',
    description: 'Use anywhere, anytime with our responsive design that works on all devices.'
  }
];

export default function Features() {
  return (
    <section id="features" className="mb-24 px-4">
      <div className="text-center mb-12">
        <h2 className="font-inter text-4xl md:text-5xl font-bold mb-4 text-text">
          Key Features
        </h2>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
          Everything you need to split bills effortlessly
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-card glass-card-hover p-10 text-center animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-5xl text-accent mb-6">
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3 className="font-inter text-2xl font-semibold mb-4 text-text">
              {feature.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}