const Contact = ({contact, deleteContact, contactsList}) => {

    return (
        <tr key={contact.id} className={contact.id % 2 === 0 ? "green-row" : "green-row-dark"}>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>
                <button className="delete-button" onClick={(e)=>{
                    deleteContact(contactsList.filter(c => c.id == contact.id)[0])
                }}>
                    Delete
                </button>
            </td>
        </tr>
    )
};

export default Contact;