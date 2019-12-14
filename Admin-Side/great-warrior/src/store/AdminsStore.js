import { decorate, action, observable } from 'mobx';
import * as Fetch from '../fetches/Fetch';

class AdminsStore {
    allAdmins = [];
    filteredAllAdmins = [];

    setAllAdmins = (admins) => {
        this.allAdmins = admins;
        this.setFilteredAllAdmins(admins);
    }

    setFilteredAllAdmins = (admins) => {
        this.filteredAllAdmins = admins;
    }

    searchAdmins = (value) => {
        const filtered = this.allAdmins.filter(admin => admin.Admin_Email.toUpperCase().includes(value.toUpperCase()));
        this.setFilteredAllAdmins(filtered);
    }

    fetchAllAdmins = () => {
        Fetch.Get('admins')
            .then(res => this.setAllAdmins(res))
    }
}

decorate(AdminsStore, {
    allAdmins: observable,
    filteredAllAdmins: observable,
    setAllAdmins: action,
    setFilteredAllAdmins: action,
    searchAdmins: action,
    fetchAllAdmins: action,
})

export default new AdminsStore();