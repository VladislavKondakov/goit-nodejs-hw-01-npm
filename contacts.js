import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


 const contactsPath = path.resolve("db","contacts.json");
 


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts()
    const result = contacts.find(item => item.id === contactId)
    return result || null
}

const updateContactById = async (contactId,{name, email, phone}) => {
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId)
    if (index === -1) {
        return null
    }
    contacts[index] = { name, email, phone }
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[index]

}

const removeContact = async (contactId) => {
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId)
    if (index === -1) {
        return null
    }
   
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}

const addContact = async ({name, email, phone}) => {
    
    const contacts = await listContacts()
    
    const addNewContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(addNewContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return addNewContact
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
}