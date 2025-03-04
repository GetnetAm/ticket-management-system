import PropTypes from 'prop-types';

function SummaryCard({ icon, text, number, color }) {
    return (
        <div className='rounded flex bg-white'>
            <div className={`text-3xl flex justify-center items-center ${color} text-white px-4`}>
                {icon}
            </div>
            <div className='pl-4 py-1'>
                <p className='text-lg font-semibold'>{text}</p>
                <p className='text-xl font-bold'>{number}</p>
            </div>
        </div>
    );
}

// PropTypes for property validation
SummaryCard.propTypes = {
    icon: PropTypes.node.isRequired, // icon should be a React node (e.g., JSX, string, etc.)
    text: PropTypes.string.isRequired, 
    color: PropTypes.string.isRequired,// text must be a string
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // number can be string or number
};

export default SummaryCard;