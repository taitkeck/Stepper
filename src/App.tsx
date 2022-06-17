import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { form } from "./forms";
// import { Typography } from '@mui/material/styles/createTypography';

const steps = ['Name', 'Email', 'Favorite Color', 'Age', 'About Me'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const email = (step: number) => {
    return step === 1;
  }
  const name = (step: number) => {
    return step === 0;
  }
  const age = (step: number) => {
    return step === 3;
  }
  const aboutme = (step: number) => {
    return step === 4;
  }
  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          const contentProps: { display?: React.ReactNode; } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <fieldset name={form.fieldsets[activeStep].name}>
              <legend>{form.fieldsets[activeStep].legend_text}</legend>
              {form.fieldsets[activeStep].inputs.map((input, i) => (<div>
                <label htmlFor={input.name}>{input.label_text}</label>
                <input key={i} required={input.required} name={input.name} type={input.type} id={input.name} />
              </div>))}
            </fieldset>
            {/* {name(activeStep) && (
              <Typography sx={{ mt: 2, mb: 1 }}>
                <form>
                  <label htmlFor="fname">Enter your name</label><br /><br />
                  <input type="text" name="fname" id="fname" placeholder="First Name"></input><br /><br />
                  <input type="text" name="lname" id="lname" placeholder="Last Name"></input>
                </form>
              </Typography>
            )}
            {email(activeStep) && (
              <Typography sx={{ mt: 2, mb: 1 }}>
                <form>
                  <label htmlFor="email">Enter your email</label><br />
                  <input type="email" id="email" name="email" placeholder="Email"></input>
                </form>
              </Typography>
            )}
            {isStepOptional(activeStep) && (
              <Typography sx={{ mt: 2, mb: 1 }}>
                <form>
                  <label htmlFor="color">Pick your favorite color</label><br />
                  <select id="color" name="color">
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                  </select>
                </form>
              </Typography>
            )}
            {age(activeStep) && (
              <Typography sx={{ mt: 2, mb: 1 }}>
                <form>
                  <label htmlFor="age">Enter your age</label><br />
                  <input type="text" name="age" id="age" placeholder="Age"></input>
                </form>
              </Typography>
            )}
            {aboutme(activeStep) && (
              <Typography sx={{ mt: 2, mb: 1 }}>
                <form>
                  <label htmlFor="abme">Tell about yourself</label><br />
                  <textarea name="abme" id="abme" placeholder="About Me"></textarea>
                </form>
              </Typography>
            )} */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
  