import { useActivityTracking } from '../hooks/useActivityTracking';

const Hackathons = () => {
  const { trackHackathonJoin } = useActivityTracking();

  const handleHackathonJoin = (hackathon) => {
    trackHackathonJoin(hackathon);
  };

  return (
    // ... existing JSX ...
  );
}; 