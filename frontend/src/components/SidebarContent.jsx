import PropTypes from 'prop-types';

// eslint-disable-next-line no-undef
SidebarContent.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    level: PropTypes.string,
    description: PropTypes.string,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ),
    icon: PropTypes.elementType
  }).isRequired,
  roadmapId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired
}; 