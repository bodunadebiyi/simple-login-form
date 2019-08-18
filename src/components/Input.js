import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    textAlign: 'left',
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 11,
    marginBottom: 5,
  },
  input: {
    display: 'block',
    width: '100%',
    padding: 10,
    boxSizing: 'border-box',
    outline: 'none',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#999',
    transition: 'all ease .2s',
    '&:focus': {
      borderColor: 'green',
    }
  }
};

const Input = React.memo(({
  classes,
  label,
  inputProps
}) => {
  return (
    <div className={classes.wrapper}>
      {label && <label
        htmlFor={inputProps.id}
        className={classes.label}
      >
        { label }
      </label>}
      <input
        className={classes.input} 
        {...inputProps} />
    </div>
  )
});

Input.defaultProps = {
  inputProps: {
    type: 'text'
  }
}

Input.propTypes = {
  label: PropTypes.string,
  inputProps: PropTypes.object,
}

export default injectSheet(styles)(Input);