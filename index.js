import yargs from "yargs";

import contactsService from "./contacts.js"

const invokeAction = async ({action,id,name,email,phone}) => {
    switch (action) {
        case "list":
            const allContacts = await contactsService.listContacts();
            return console.log(allContacts);
            
        case "getById":
            const oneContact = await contactsService.getContactById(id)
            return console.log(oneContact);
        
        case "addContact":
            const newContact = await contactsService.addContact({name,email,phone})
            return console.log(newContact)
        case "removeById":
            const removeContact = await contactsService.removeContact(id)
            return console.log(removeContact)
        case "updateContactById":
            const updateContact = await contactsService.updateContactById(id, {name,email,phone})
               return console.log(updateContact)
            
        default:
            console.log("Unknown command")
            
    }

}
const { argv } = yargs(process.argv.slice(2))
invokeAction(argv)


