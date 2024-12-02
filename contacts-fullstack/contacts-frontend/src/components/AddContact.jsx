import { useState } from "react";
const AddContact = ({ addContact }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleContactInfoChange = (e) => {
    if (e.target.type === "email") {
        setNewEmail(e.target.value);
    } else {
        setNewName(e.target.value);
    }
}

return (
    <>
        <h2>Add a New Contact</h2>
        <form>
            <input
                type="text"
                placeholder="Enter contact name"
                onChange={handleContactInfoChange}
                value={newName}
            />
            <input
                type="email"
                placeholder="Enter contact email"
                onChange={handleContactInfoChange}
                value={newEmail}
            />
            <button type="submit" onClick={
                (e) => {
                    addContact(e, newName, newEmail);
                    setNewEmail("");
                    setNewName(""); 
                }
            }>Add Contact</button>
        </form>
    </>
)
}

export default AddContact;