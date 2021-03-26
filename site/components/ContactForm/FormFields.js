/** @jsxImportSource @emotion/react */
import React, { Children } from 'react';

import { gridSize, colors } from '../../theme';

import { Input, Label, Button, TextArea, Select } from '../../primitives/forms';

const style = { marginBottom: gridSize * 2.5 };

export const Asterisk = () => <span css={{ color: colors.red }}>*</span>;

export const FormFields = ({ children, textArea, btnText, ...props }) => {
  const [labelHelp, selectHelp, inputOther, labelComment, inputComment] = Children.toArray(
    children
  );

  return (
    <div>
      <Label>
        Name
        <Asterisk />
      </Label>
      <Input type="text" name="name" onChange={props.onChange} css={style} minLength="2" required />

      <Label>
        Email
        <Asterisk />
      </Label>
      <Input
        type="email"
        name="email"
        onChange={props.onChange}
        css={style}
        minLength="5"
        required
      />

      <Label>
        City
        <Asterisk />
      </Label>
      <Select
        type="select"
        name="city"
        onChange={props.onChange}
        options={props.options}
        css={style}
        required
      />

      {textArea && (
        <>
          <Label>
            Your message
            <Asterisk />
          </Label>
          <TextArea
            type="text"
            name="message"
            onChange={props.onChange}
            placeholder="Type here..."
            minLength="10"
            css={style}
            required
          />
        </>
      )}

      {labelHelp}
      {selectHelp}
      {inputOther}
      {labelComment}
      {inputComment}

      <Button type="submit">{btnText}</Button>
    </div>
  );
};
