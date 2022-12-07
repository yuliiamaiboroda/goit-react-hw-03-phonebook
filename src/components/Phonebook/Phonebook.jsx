import { Component } from "react";
import { Label, Input, Button } from "./Phonebook.styled";
import PropTypes from 'prop-types';

class Phonebook extends Component{
state = {
    name: "" ,
    number: "", 
}
handleChange = e =>{
    const {name,value} = e.target;
        this.setState({
            [name]: value })
}

SubmitForm = event =>{
        event.preventDefault();
        
        this.props.addContact({...this.state});
        event.currentTarget.reset();
      }

    //   or
    //   SubmitForm = event =>{
    //     event.preventDefault();
    //     const {name,number} = event.currentTarget.elements
    //     const newContact = 
    //         {name:name.value ,
    //         number: number.value, 
    //         id: nanoid()};
    //     this.props.addContact({contact: newContact});
    //     event.currentTarget.reset();
    //   }



    render(){
      return ( <form onSubmit={this.SubmitForm}> 
       <Label>
        Name
            <Input
            type="text"
            name="name"
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            />
        </Label> 
        <Label>
        Number
            <Input
            type="tel"
            name="number"
            placeholder="Telephone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            />
        </Label> 
        <Button type="submit" >Add to contact</Button>
</form>)
     
    }
}

export default Phonebook;

Phonebook.propTypes = {
    addContact: PropTypes.func.isRequired
}