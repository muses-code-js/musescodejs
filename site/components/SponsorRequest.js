/** @jsx jsx */

import gql from 'graphql-tag';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
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
  const [errorState, setErrorState] = useState(false);

  const [createSponsorRequest, { data, loading, error }] = useMutation(CREATE_SPONSOR_REQUEST}
  

  return (
    <>
    {errorState && <p css={{ color: colors.red }}>An unknown error has occured</p>}
    <form
      css={{ marginTop: gridSize *3 }}
      noValidate
      onSubmit={e => {
        e.preventDefault();
        createSponsorRequest({ variables: {company, contact, email, city, sponsoroption, address, capacity, notes} });
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
        <Select 
          defaultValue={'DEFAULT'}
          onChange={onChange(setCity)}
        >
          <option value="DEFAULT" disabled>Select ...</option>
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
        <Select 
          defaultValue={'DEFAULT'}
          onChange={onChange(setSponsorOption)}
        >
          <option value="DEFAULT" disabled>Select ...</option>
          <option value="Host">Host</option>
          <option value="FoodDrinks">Food and drinks</option>
          <option value="HostFoodDrinks">Host and provide food/drinks</option>
          <option value="OtherExpenses">Cover different minor expenses</option>
        </ Select>
      </Field>
      

      {/* Questions for Host */}

        { sponsoroption.includes('Host') && 
          <form>
            <Field>
              <Label htmlFor="address">What is your company's address?</Label>
              <Input
                autoComplete="address"
                autoFocus
                id="address"
                onChange={onChange(setAddress)}
                placeholder="Company Address"
                required
                type="text"
                value={address}
              />
            </Field> 
            <Field>
              <Label htmlFor="capacity">Our non-technical workshops need a projector, seats, and occasionally tables. If you're able to host an event like this, about how many attendees would fit?</Label>
              <Input
                autoComplete="capacity"
                autoFocus
                id="capacity"
                onChange={onChange(setCapacity)}
                placeholder="Attendees Capacity"
                required
                type="text"
                value={capacity}
              />
            </Field>
          </form>
        }
        
        {/* Notes */}

        <Field>
        <Label htmlFor="notes">Anything else?</Label>
        <Input
          autoComplete="notes"
          autoFocus
          id="notes"
          onChange={onChange(setNotes)}
          placeholder="Message"
          required
          type="text"
          value={notes}
        />
      </Field> 
      {loading ? (
          <Button disabled>Submitting request...</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
    </form>
    </>
  );
}

export default SponsorForm;

const CREATE_SPONSOR_REQUEST = gql`
  mutation CreateSponsorRequest($company: String!, $contact: String!, $email: String!, $city: String!, $sponsoroption: String!, $address: String!, $capacity: String!, $notes: String!) {
    createSponsorRequest(data: { company: $company, contact: $contact, email: $email, city: $city, , sponsoroption: $sponsoroption, address: $address, capacity: $capacity, notes: $notes }) {
      id
    }
  }
`;

