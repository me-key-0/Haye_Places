import PropTypes from "prop-types";

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <button
        className={`custom-button 
                    ${inverted ? 'bg-white text-black border border-black' : 'bg-black text-white'}
                    ${isGoogleSignIn ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                    px-4 py-2 rounded`}
        {...otherProps}
    >
        {children}
    </button>
);

CustomButton.propTypes = {
    children: PropTypes.node.isRequired,
    isGoogleSignIn: PropTypes.bool,
    inverted: PropTypes.bool,
    otherProps: PropTypes.object
};

export default CustomButton;
