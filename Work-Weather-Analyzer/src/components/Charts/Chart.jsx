import PropTypes from 'prop-types';
import './charts.scss';

const Chart = ({ id, className }) => <div id={id} className={className}></div>;

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Chart;
