import React from 'react';
import injectSheet from 'react-jss';
import passwordChecker from 'zxcvbn';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import Input from './components/Input';

const styles = {
  app: {
    width: '90%',
    maxWidth: 300,
    padding: 20,
    borderStyle: 'solid',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'black',
    margin: 'auto',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  submitButton: {
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    fontSize: 14,
    border: 'none',
    marginTop: 60
  },
  errors: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
    fontSize: 12,
    marginBottom: 20
  }
}

class App extends React.Component {
  state = {
    email: '',
    password: '',
    passwordStrength: 0,
    errors: [],
  }

  runPasswordValidator = password => {
    const { score } = passwordChecker(password);
    this.setState({ passwordStrength: score })
  }

  onInputChange = type => e => {
    if (type === 'password') this.runPasswordValidator(e.target.value);
    this.setState({ [type]: e.target.value })
  }

  getFormErrors = () => {
    const errors = [];
    const { email, password, passwordStrength } = this.state;

    if (!email) {
      errors.push('Email is required.');
    } else if (!password) {
      errors.push('password is required.');
    } else if (passwordStrength === 2) {
      errors.push('password is weak.')
    } else if (passwordStrength < 2) {
      errors.push('password is invalid.');
    }

    return errors;
  }

  submitForm = e => {
    e.preventDefault();
    const errors = this.getFormErrors();
    this.setState({ errors }, () => {
      if (!errors.length) alert('Registration complete');
    });
  }

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      passwordStrength,
      errors
    } = this.state;
    const hasErrors = !!errors.length;

    return (
      <div className={classes.app}>
        {hasErrors && <div className={classes.errors}>
          <ul>{errors.map(error => <li>{error}</li>)}</ul>
        </div>}
        <form onSubmit={this.submitForm}>
          <Input
            label="Email"
            inputProps={{
              name: 'email',
              type: 'email',
              id: 'my_email',
              value: email,
              onChange: this.onInputChange('email'),
            }} />
          <Input
            label="Password"
            inputProps={{
              name: 'password',
              type: 'password',
              id: 'my_password',
              value: password,
              onChange: this.onInputChange('password'),
            }} />
          <PasswordStrengthIndicator strength={passwordStrength} />
          <button
            className={classes.submitButton}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default injectSheet(styles)(App);

