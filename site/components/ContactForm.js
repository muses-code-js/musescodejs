/** @jsx jsx */
import { jsx } from '@emotion/core';

import { colors, gridSize, borderRadius } from '../theme';

import { Input, Label, Button } from '../primitives/forms';

const Asterisk = () => {
    return (
        <span css={{color:colors.red}}>*</span>
    );
};

const TextArea = props => {
  return (
    <textarea 
      css={{
      background: 0,
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: borderRadius,
      boxSizing: 'border-box',
      color: colors.greyDark,
      fontSize: 'inherit',
      margin: `${gridSize / 2}px 0`,
      outline: 0,
      padding: `${gridSize * 1.5}px ${gridSize * 2}px`,
      width: '100%',
      height: '200px',
      lineHeight:`1.5`,

      ':focus': {
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.33)',
      },
      }}
      {...props}
    >
    </textarea>
  )
}

const ContactForm = props => {
  return (
    <div {...props}>
      <form action="" method="post">
        <div css={{textAlign: 'right'}}>
            <Asterisk /> indicates required
        </div>

        <Label>Your name</Label>
        <Input type="text" name="fname" css={{marginBottom: `${gridSize * 1.5}px`}}></Input>

        <Label>Email Address<Asterisk /> </Label>
        <Input type="email" name="email" css={{marginBottom: `${gridSize * 1.5}px`}}></Input>

        <TextArea type="text" name="message" placeholder="Type your message here...">
        </TextArea>        

        <Button>
          Send your message
          <input type="submit" css={{ display: 'none' }}></input>
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
