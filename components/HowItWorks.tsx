import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faUserPlus, faMagic } from '@fortawesome/free-solid-svg-icons';

const steps = [
  {
    number: 1,
    icon: faReceipt,
    title: 'Enter Bill Amount',
    description: 'Input the total bill amount and any additional charges like tax or service fees.'
  },
  {
    number: 2,
    icon: faUserPlus,
    title: 'Add Friends',
    description: 'Add the names of people sharing the bill and set their individual shares.'
  },
  {
    number: 3,
    icon: faMagic,
    title: 'Calculate & Share',
    description: 'Get instant calculations and share payment details with everyone involved.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mb-24 px-4">
      <div className="text-center mb-12">
        <h2 className="font-inter text-4xl md:text-5xl font-bold mb-4 text-text">
          How It Works
        </h2>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
          Simple steps to split any bill
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="glass-card glass-card-hover p-10 text-center relative animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-inter font-bold text-lg">
              {step.number}
            </div>
            <div className="text-4xl text-text-secondary mb-4 mt-4">
              <FontAwesomeIcon icon={step.icon} />
            </div>
            <h3 className="font-inter text-xl font-semibold mb-4 text-text">
              {step.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}