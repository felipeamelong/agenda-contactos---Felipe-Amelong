import { inject, Injectable } from '@angular/core';
import { ContactT, NewContactT } from '../interfaces/contact-type';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  authService = inject(AuthService);

  contacts: ContactT[] = []

  async getContacts() {
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: ContactT[] = await res.json();
    this.contacts = resJson;
  }

  async getContactsById(id: string | number) { 
    const res = await fetch(`https://agenda-api.somee.com/api/contacts/${id}`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      }
    )
    const resContact:ContactT = await res.json();
    return resContact  
  }

  async createContact(nuevoContacto: NewContactT) {
    const contacto: ContactT = {
      ...nuevoContacto,
      id: Math.random().toString()
    }
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contacto)
      }
    )
    return await res.json()
  }

  async editContact(contactoEditado: ContactT) { 
    const res = await fetch(`https://agenda-api.somee.com/api/contacts/${contactoEditado.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactoEditado)
      }
    );
    this.contacts = this.contacts.map(contact => {
      if (contact.id === contactoEditado.id) {
        return contactoEditado;
      }
      return contact
    })
    return contactoEditado;
  }

  async deleteContact(id: string) {
    const res = await fetch(`https://agenda-api.somee.com/api/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token
        }
      }
    );
    if (res.ok) {
      this.contacts = this.contacts.filter(contact => contact.id !== id)
      return true;
    } else {
      return false;
    }
  }

  async setFavourite(id:string | number ) {
    const res = await fetch(`https://agenda-api.somee.com/api/contacts/${id}/favorite`, 
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      });
    this.contacts = this.contacts.map(contact => {
      if(contact.id === id) {
        return {...contact, isFavorite: !contact.isFavorite};
      };
      return contact;
    });
    return true;
  }
}