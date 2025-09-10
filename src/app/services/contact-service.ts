import { inject,Injectable } from '@angular/core';
import { ContactT, NewContactT } from '../interfaces/contact-type';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  authService = inject(AuthService);

  contacts: ContactT[] = []

  async getContacts(){
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
        {
        headers:{
          Authorization: "Bearer "+this.authService.token,
        }
      }
    )
    const resJson: ContactT[] = await res.json()
    this.contacts = resJson;
  }

  getContactsById(){}

  createContact(nuevoContacto:NewContactT){
    const contacto:ContactT = {
      ...nuevoContacto,
      id: Math.random().toString()
    }
    this.contacts.push(contacto)
  }

  editContact(){}

  deleteContact(id: string){
    this.contacts = this.contacts.filter(contact => contact.id !== id)
  }
  
  setFavourite(){}
}
