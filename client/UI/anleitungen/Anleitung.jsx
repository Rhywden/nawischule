import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      width: '90%',
    },
    button: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    actionsContainer: {
      marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
      padding: theme.spacing.unit * 3,
    },
  });

  function getSteps() {
    return ['Aufgabe', 'Tipps zum Vorgehen', 'Lösung'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return `Hier wird die vollständige Aufgabe stehen. Es werden sowohl Hintergrundinformationen als auch zur Lösung notwendige Zahlen genannt.`;
      case 1:
        return 'An dieser Stelle stehen weitere Hinweise zum Vorgehen, damit man überprüfen kann, ob man auf dem richtigen Weg ist. Alternativ kann es auch als Hilfe dienen, wenn man nicht weiter weiß.';
      case 2:
        return `Zuletzt kann man hier die vollständige, ausführliche Lösung finden.`;
      default:
        return 'Unbekannter Schritt';
    }
  }

  class Anleitung extends React.Component {
    state = {
      activeStep: 0,
    };
  
    handleNext = () => {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    };
  
    handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };
  
    handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };
  
    render() {
      const { classes } = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;
  
      return (
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Zurück
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Fertig' : 'Weiter'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>Alles erledigt - du bist fertig.</Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      );
    }
  }

  export default withStyles(styles)(Anleitung);