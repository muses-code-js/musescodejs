/** @jsx jsx */

import gql from 'graphql-tag';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import Router from 'next/router';
import { jsx } from '@emotion/core';
import { Button, Field, Label, Input, Select } from '../primitives/forms';
import { gridSize, colors } from '../theme';

const onChange = handler => e => handler(e.target.value);

const SponsorForm = () => {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [sponsoroption, setSponsorOption] = useState('');
  const [address, setAddress] = useState('');
  const [capacity, setCapacity] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <>
    <form
      css={{ marginTop: gridSize *3 }}
      noValidate
      onSubmit={e => {
        e.preventDefault();
        createSponsorRequest({ variables: {company, email, city, contact, sponsoroption, address, capacity, notes} });
      }}
    >
      <Field>
        <Label htmlFor="company">Company</Label>
        <Input
          autoComplete="company"
          autoFocus
          id="company"
          onChange={onChange(setCompany)}
          placeholder="Company Name"
          required
          type="text"
          value={company}
        />
      </Field>
      <Field>
        <Label htmlFor="contact">Contact Person</Label>
        <Input
          autoComplete="contact"
          autoFocus
          id="contact"
          onChange={onChange(setContact)}
          placeholder="Contact Name"
          required
          type="text"
          value={contact}
        />
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input
          autoComplete="email"
          id="email"
          onChange={onChange(setEmail)}
          placeholder="you@awesome.com"
          required
          type="text"
          value={email}
        />
      </Field>
      <Field>
        <Label htmlFor="city">City in which you want to sponsor event</Label>
        <Select>
          <option value="Sydney">Sydney</option>
          <option value="Melbourne">Melbourne</option>
          <option value="Brisbane">Brisbane</option>
          <option value="Perth">Perth</option>
          <option value="Hobart">Hobart</option>
          <option value="Wollongong">Wollongong</option>
          <option value="Other">Other</option>
        </ Select>
      </Field>
      <Field>
        <Label htmlFor="sponsoroption">Would you prefer to host meetups (see questions below) or sponsor food and drinks for a workshop?</Label>
        <Select onChange={onChange('sponsoroption')}> 
          <option value="Host">Host</option>
          <option value="FoodDrinks">Food and drinks</option>
          <option value="HostFoodDrinks">Host and provide food/drinks</option>
          <option value="OtherExpenses">Cover different minor expenses</option>
        </ Select>
      </Field>


      {/* Questions for Host */}

        { sponsoroption === 'Host' &&
          <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            id="email"
            onChange={onChange(setEmail)}
            placeholder="you@awesome.com"
            required
            type="text"
            value={email}
          />
          </Field>
        }


      {/* {loading ? (
          <Button disabled>Submitting request...</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )} */}
    </form>
    </>
  );
}

export default SponsorForm;
