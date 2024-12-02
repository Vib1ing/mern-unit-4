import { useEffect, useState } from "react";
import AddContact from "./components/AddContact";
import "./index.css";
import ContactList from "./components/ContactList";
import contactService from "./services/contacts"

const App = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(()=>{
        contactService.getContact().then(data => setContacts(data));
    }, [])

    const contactDetails = (name, email) => {
        if (name.trim() === "") {
            alert("Name length must be greater than 0 and should not be just spaces")
            return false;
        }
        if (email.trim() === "") {
            alert("Email field required and must follow the format of something@something.something")
            return false;
        }

        return name.trim();
    }

    const newContact = async (e, newName, newEmail) => {
        e.preventDefault();
        
        const parsedName = contactDetails(newName, newEmail);
        if (!parsedName) return;

        const existingContacts = contacts.filter(c => c.name === parsedName.trim());
        let newContactInfo = {
            name: parsedName,
            email: newEmail
        };

        if (existingContacts.length > 0) {
            newContactInfo.id = existingContacts[0].id;
            await contactService.updateContact(newContactInfo);
        } else {
            newContactInfo.id = contacts.toSorted((a,b)=>b.id - a.id)[0] + 1;
            await contactService.addContact(newContactInfo)
        }

        contactService.getContact().then(data => setContacts(data));
    }

    const handleDelete = (contact) => {
        if (!confirm(`Are you sure you want to delete the contact for ${contact.name}`)) return;

        contactService.deleteContact(contact).then((det)=>{
            contactService.getContact().then(data => setContacts(data));
        });
    }

    return (
        <div className="contacts-app">
            <AddContact addContact={newContact} />
            <ContactList contacts={contacts} deleteContact={handleDelete} />
        </div>
    );
};

export default App;