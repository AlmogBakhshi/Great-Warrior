import { decorate, action, observable } from 'mobx';
import * as Fetch from '../fetches/Fetch';

class AdminsStore {
    allAdmins = [];
    filteredAllAdmins = null;
    selectedAdminData = null;

    setAllAdmins = (admins) => {
        this.allAdmins = admins;
        this.setFilteredAllAdmins(admins);
    }

    setFilteredAllAdmins = (admins) => {
        this.filteredAllAdmins = admins;
    }

    setSelectedAdminData = async (admin) => {
        this.selectedAdminData = admin;
    }

    searchAdmins = (value) => {
        const filtered = this.allAdmins.filter(admin => admin.Admin_Email.toUpperCase().includes(value.toUpperCase()));
        this.setFilteredAllAdmins(filtered);
    }

    fetchAllAdmins = () => {
        this.setFilteredAllAdmins(null);
        Fetch.Get('admins')
            .then(res => this.setAllAdmins(res))
    }

    fetchAddAdmin = (admin) => {
        Fetch.Post('admins', admin)
            .then(() => this.fetchAllAdmins())
    }

    fetchEditAdmin = (email, admin) => {
        Fetch.Put(`admins/${email}`, admin)
            .then(() => this.fetchAllAdmins())
    }

    fetchDeleteAdmin = (admin) => {
        Fetch.Delete(`admins/${admin.Admin_Email}`)
            .then(() => this.fetchAllAdmins())
    }
}

decorate(AdminsStore, {
    allAdmins: observable,
    filteredAllAdmins: observable,
    selectedAdminData: observable,
    setAllAdmins: action,
    setFilteredAllAdmins: action,
    setSelectedAdminData: action,
    searchAdmins: action,
    fetchAllAdmins: action,
    fetchAddAdmin: action,
    fetchEditAdmin: action,
    fetchDeleteAdmin: action,
})

export default new AdminsStore();