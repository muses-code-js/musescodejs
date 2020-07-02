/** @jsx jsx */
import { jsx } from '@emotion/core';

//import { colors, gridSize, borderRadius } from '../theme';

//import { Input, Label, Button } from '../primitives/forms';
import FormFields from './FormFields';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      city: '',
      message: ''
    };
    this.cityOptions = [
      'Sydney',
      'Melbourne',
      'Brisbane',
      'Perth',
      'Canberra',
      'Hobart',
      'Wollongong'
    ];
    this.form = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);    
  }  

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  validate() {
    return this.form.current.reportValidity();
  }

  handleSubmission(e) {
    e.preventDefault();
    if (this.validate()) {
     const newMessage = {        
      name: this.state.name,
      email: this.state.email,
      city: this.state.city,
      message: this.state.message,
      createdAt: new Date
      };
    console.log(newMessage);   
    }    
  }

  render() {
    return (
      <div {...this.props}>
        <form ref={this.form} onSubmit={this.handleSubmission}>
          <FormFields       
          //onClick={this.validate}
          onChange={this.handleChange}
          options={this.cityOptions}
          /> 
        </form>        
      </div>      
    );
  }
}

export default FormContainer;
