import { Component } from "react";
import Phonebook from "./Phonebook/Phonebook";
import Contacts from "./Contacts/Contacts";
import Filter from "./Filter/Filter";
import Notification from "./Notification/Notification";
import Section from "./Section/Section";
import { nanoid } from 'nanoid'

export class App extends Component{
  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount(){
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(prevState){
    if(this.state.contacts!==prevState.contacts){
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }

 addContact = contact=>{ 
  const newContact = {
    ...contact,
    id: nanoid()
  };
  const contactNameLowerCase = newContact.name.toLowerCase();
  const isInContact = this.state.contacts.find (el=>el.name.toLowerCase().includes(contactNameLowerCase));
    if(isInContact){
      alert(`${newContact.name} is already in contact`)
      return }
   this.setState(prevState =>({contacts: [...prevState.contacts, newContact ]}))
}
 filterContacts = (array)=>{
  const newArray = array.filter(el=>el.name.toLowerCase().includes(this.state.filter));
  return newArray;
 }

 addInFilter =(filterData)=>{
  this.setState({...this.state, filter:filterData})
 }

 deleteFromlist = id => {
  this.setState((prevState) => {
    return {
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== id
      )}})
 }

  render(){
   return (
    <>
    <Section title="Phonebook">
      <Phonebook addContact={this.addContact}/>
    </Section>
    
    <Section title="Contacts">
     {this.state.contacts.length===0?
    <Notification message="There is no contact yet"/>:
    <>
    <Filter newFilter={this.addInFilter}/>
    <Contacts contactList={this.filterContacts(this.state.contacts)} deleteFromlist={this.deleteFromlist}/></>}
    </Section>
    </>
  );}
};
