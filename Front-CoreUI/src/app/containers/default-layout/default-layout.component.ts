import {Component, OnInit} from '@angular/core';

import {navItems} from './_nav';
import {Utils} from "../../features/services/shared/utils/utils";
import {IUser} from "../../features/models/login.response.model";
import {UserRoleConstants} from "../../features/constant/constant";
import {INavData} from "@coreui/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;
  userRole: string | null = '';
  studentNavItems: any[] = [];
  staffNavItems: any[] = [];
  user: IUser | undefined;


  constructor(private utils: Utils) {
    const userDataString = localStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    this.userRole = this.utils.getUserRule(userData.userRole);

    console.log('User Role:', this.userRole);
  }

  ngOnInit(): void {
    console.log('All nav items:', navItems);

    this.studentNavItems = this.filterNavItemsByRole(navItems, UserRoleConstants.STUDENT);
    console.log('Student nav items:', this.studentNavItems);

    this.staffNavItems = this.filterNavItemsByRole(navItems, UserRoleConstants.STAFF);
    console.log('Staff nav items:', this.staffNavItems);
  }

  private filterNavItemsByRole(navItems: INavData[], role: string): INavData[] {
    const filteredItems = navItems
      .filter(item => item.roles?.includes(role))
      .map(filteredItem => ({
        ...filteredItem,
        children: filteredItem.children?.filter(child => child.roles?.includes(role))
      }));

    console.log(`Filtered items for role ${role}:`, filteredItems);

    return filteredItems;
  }


}
