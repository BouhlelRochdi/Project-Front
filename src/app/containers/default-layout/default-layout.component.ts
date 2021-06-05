import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { routes } from '../../app-routing.module';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(@Inject(DOCUMENT) _document?: any, private router? : Router, private toasterService?: ToasterService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logOut(){
    localStorage.removeItem('token');
    this.toasterService.pop('success', 'You are logged Out');
    this.router.navigateByUrl('/login');
  }
}
