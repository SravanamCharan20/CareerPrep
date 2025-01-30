import { useDispatch } from 'react-redux';
import { addActivity } from '../redux/user/userSlice';

export const useActivityTracking = () => {
  const dispatch = useDispatch();

  const trackActivity = (activity) => {
    dispatch(addActivity(activity));
  };

  return {
    trackBookmark: (item) => {
      trackActivity({
        type: 'saved',
        title: `Bookmarked ${item.category}`,
        description: item.title,
        link: item.path,
      });
    },

    trackProjectProgress: (project, progress) => {
      trackActivity({
        type: 'progress',
        title: `Updated project progress`,
        description: `Made ${progress}% progress on ${project.title}`,
        link: `/projects/${project.id}`,
      });
    },

    trackCertificationComplete: (cert) => {
      trackActivity({
        type: 'completion',
        title: 'Completed Certification',
        description: cert.title,
        link: `/certifications/${cert.id}`,
      });
    },

    trackRoadmapProgress: (roadmap, node) => {
      trackActivity({
        type: 'progress',
        title: `Made progress in ${roadmap.title}`,
        description: `Completed: ${node.title}`,
        link: `/roadmaps/${roadmap.id}`,
      });
    },

    trackHackathonJoin: (hackathon) => {
      trackActivity({
        type: 'project',
        title: 'Joined Hackathon',
        description: hackathon.title,
        link: `/hackathons/${hackathon.id}`,
      });
    },

    trackCareerPathExplored: (careerPath) => {
      trackActivity({
        type: 'progress',
        title: 'Explored Career Path',
        description: careerPath.title,
        link: `/careerpaths/${careerPath.id}`,
      });
    },

    trackProjectStart: (project) => {
      trackActivity({
        type: 'project',
        title: 'Started New Project',
        description: project.title,
        link: `/projects/${project.id}`,
      });
    },

    trackProjectComplete: (project) => {
      trackActivity({
        type: 'completion',
        title: 'Completed Project',
        description: project.title,
        link: `/projects/${project.id}`,
      });
    },

    trackCourseStart: (course) => {
      trackActivity({
        type: 'progress',
        title: 'Started New Course',
        description: course.title,
        link: `/courses/${course.id}`,
      });
    },

    trackCourseComplete: (course) => {
      trackActivity({
        type: 'completion',
        title: 'Completed Course',
        description: course.title,
        link: `/courses/${course.id}`,
      });
    },

    trackQuizComplete: (quiz, score) => {
      trackActivity({
        type: 'completion',
        title: 'Completed Quiz',
        description: `Scored ${score}% on ${quiz.title}`,
        link: `/quizzes/${quiz.id}`,
      });
    },

    trackSkillUnlocked: (skill) => {
      trackActivity({
        type: 'progress',
        title: 'New Skill Unlocked',
        description: skill.title,
        link: `/skills/${skill.id}`,
      });
    }
  };
}; 