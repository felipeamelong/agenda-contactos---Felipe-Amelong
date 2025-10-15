import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { ContactDetails } from './pages/contact-details/contact-details';
import { Contact } from './pages/contact/contact';
import { Groups } from './pages/groups/groups';
import { Login } from './pages/login/login'
import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { NewContact } from './pages/new-contact/new-contact';
import { NewGroup } from './pages/new-group/new-group';

export const routes: Routes = [
{
    path: "login",
    component: Login,
    canActivate: [onlyPublicUserGuard]
},
{
    path: "register",
    component: Register,
    canActivate: [onlyPublicUserGuard]
},
{
    path: "",
    component: LoggedLayout,
    canActivateChild: [onlyLoggedUserGuard],
    children: [
    {
    path: "",
    component: Contact
    },
    {
    path: "contact/:id",
    component: ContactDetails
    },
    {
    path:"groups",
    component: Groups
    },
    {
    path:"new-group",
    component: NewGroup
    },
    {
    path:"new-contact",
    component: NewContact
    },
    {
    path: "edit-contact/:idContacto",
    component: NewContact
    },
    {
    path: "edit-group/:idGrupo",
    component: NewGroup
    },
    ]
}
];

