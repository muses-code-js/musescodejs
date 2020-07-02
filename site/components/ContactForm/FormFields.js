/** @jsx jsx */
import { jsx } from '@emotion/core';

import { gridSize } from '../../theme';

import { Input, Label, Button, TextArea, Select } from '../../primitives/forms';

const style = {
  marginBottom: gridSize * 2,
};

const FormFields = props => {
  return (
    <div>
      <Label>Name</Label>
      <Input type="text" name="name" onChange={props.onChange} css={style} minLength="2" required />

      <Label>Email</Label>
      <Input
        type="email"
        name="email"
        onChange={props.onChange}
        css={style}
        minLength="5"
        required
      />

      <Label>City</Label>
      <Select
        type="select"
        name="city"
        onChange={props.onChange}
        options={props.options}
        placeholder={'Select a city'}
        css={style}
        required
      />
      <TextArea
        type="text"
        name="message"
        onChange={props.onChange}
        placeholder="Type your message here..."
        minLength="10"
        required
      />

      <Button type="submit">
        Send your message
      </Button>
    </div>
  );
};

export default FormFields;
