import PropTypes from "prop-types";

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className="group mb-6 relative">
        <input
            className="form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={handleChange}
            {...otherProps}
        />
        {label ? (
            <label
                className={`form-input-label absolute left-0 top-0 px-4 py-2 pointer-events-none transition-all duration-300 ease-in-out ${
                    otherProps.value.length ? 'transform -translate-y-6 scale-75 text-purple-500' : 'text-gray-500'
                }`}
            >
                {label}
            </label>
        ) : null}
    </div>
);

FormInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    otherProps: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
};

export default FormInput;
