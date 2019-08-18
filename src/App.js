import React from 'react';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import Input from './components/Input';
import injectSheet from 'react-jss';

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
  }
}

class App extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onInputChange = type => e => {
    this.setState({ [type]: e.target.value })
  }

  render() {
    const { classes } = this.props;
    const { email, password } = this.props;

    return (
      <div className={classes.app}>
        <div className={classes.appBody}>
          <form>
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
            <PasswordStrengthIndicator strength={0} />
            <button
              className={classes.submitButton}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(App);

