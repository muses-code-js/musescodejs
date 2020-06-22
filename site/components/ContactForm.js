/** @jsx jsx */
import { jsx } from '@emotion/core';

import { colors, gridSize } from '../theme';

import { Input, Label, Button } from '../primitives/forms';
import { H4 } from '../primitives';

const Asterisk = () => {
    return (
        <span css={{color:colors.red}}>*</span>
    );
};

const ContactForm = props => {
  return (
    <div {...props}>
      <form action="" method="post">
        <H4 css>Subscribe to our mailing list</H4>
        <div css={{textAlign: 'right'}}>
            <Asterisk /> indicates required
        </div>

        <Label>Email Address <Asterisk /> </Label>
        <Input type="email" name="EMAIL" css={{marginBottom: `${gridSize * 1.5}px`}}></Input>

        <Label>Your name</Label>
        <Input type="text" name="FNAME" css={{marginBottom: `${gridSize * 1.5}px`}}></Input>

        <Label>City</Label>
        <Input type="text" name="CITY" css={{marginBottom: `${gridSize * 1.5}px`}}></Input>

        <Button>
          Subscribe
          <input type="submit" css={{ display: 'none' }}></input>
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
