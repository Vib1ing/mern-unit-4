import { useState } from "react";
import Contact from "./Contact"

const ContactList = ({contacts, deleteContact}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const searchContacts = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value.toLowerCase());
    }

    return (
        <>
            <h2>Contact List</h2>
            <form>
                <input type="text" onChange={searchContacts}/>
            </form>
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.filter(
                            contact => 
                                contact.name.toLowerCase().includes(searchTerm) ||
                                contact.email.toLowerCase().includes(searchTerm) ||
                                searchTerm.trim() === ""
                        ).map((contact) => {
                            return (
                                <Contact key={contact.id} contact={contact} deleteContact={deleteContact} contactsList={contacts}/>
                            )
                        })
                    }
                    {
                        contacts.filter(
                            contact =>
                                contact.name.toLowerCase().includes(searchTerm) ||
                                contact.email.toLowerCase().includes(searchTerm) ||
                                searchTerm.trim() === ""
                        ).length === 0 ?
                            <tr className="green-row">
                                <td colSpan={3} className="err">
                                    No results found
                                </td>
                            </tr>
                        : <></>
                    }
                </tbody>
            </table>
        </>
    )
}

export default ContactList;