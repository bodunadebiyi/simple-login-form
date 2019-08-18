import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    width: '100%',
    textAlign: 'left',
    maxWidth: 340,
    display: 'flex',
    flexDirection: 'column',
  },
  bar: {
    height: 5,
    width: '30%',
    maxWidth: 100,
  },
  bars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& div': {
      backgroundColor: '#ccc',
    }
  },
  passwordIsWeak: {
    '& > div:first-child': {
      backgroundColor: 'red',
    }
  },
  passwordIsGood: {
    '& > div:nth-child(-n+2)': {
      backgroundColor: 'orange',
    }
  },
  passwordIsVeryGood: {
    '& div': {
      backgroundColor: 'green',
    }
  },
  passwordVerdict: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
    marginTop: 5
  }
}

const passwordStrength = {
  INVALID: 0,
  WEAK: 1,
  GOOD: 2,
  VERY_GOOD: 3
};

const PasswordStrengthIndicator = React.memo(({
  classes,
  strength
}) => {
  let barStyle = `${classes.bars} `;
  let passwordVerdict;

  switch(strength) {
    case passwordStrength.INVALID:
      passwordVerdict = 'Invalid';
      break;
    case passwordStrength.WEAK:
      passwordVerdict = 'Weak';
      barStyle += classes.passwordIsWeak;
      break;
    case passwordStrength.GOOD:
      passwordVerdict = 'Good';
      barStyle += classes.passwordIsGood;
      break;
    case passwordStrength.VERY_GOOD:
      passwordVerdict = 'Very Good';
      barStyle += classes.passwordIsVeryGood;
      break;
    default:
      passwordVerdict = '';
      barStyle += classes.invalidBar;
  }

  return (
    <div className={classes.wrapper}>
      <div className={barStyle} id='bars'>
        <div className={classes.bar} />
        <div className={classes.bar} />
        <div className={classes.bar} />
      </div>
      <span className={classes.passwordVerdict}>
        Strength: {passwordVerdict}
      </span>
    </div>
  )
});

PasswordStrengthIndicator.defaultProps = {
  strength: 3
};

PasswordStrengthIndicator.props = {
  strength: PropTypes.number.isRequired,
}

export default injectSheet(styles)(PasswordStrengthIndicator);
