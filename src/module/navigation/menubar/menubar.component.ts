/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by ketangote on 12/8/17.
*/

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
import { DeviceQueryService } from '../../services/device/device.query.service';
@Component({
  selector: 'amexio-menu',
  template: `
    <div class="menu-container">
      <div class="menubar">
        <ul  role="menubar" class="menuheader">
          <li class="menulink">{{label}}</li>
          <div>
            <li role="menuitem" tabindex="{{node.tabindex}}"  id="{{rowindex}}" *ngFor="let node of data let rowindex = index "
            (keyup)="onMenubarKeyup($event,false,rowindex,node,data)" class="menulink">
            <a (click)="onClick(node)" (mouseover)="onMouseOver($event)">
              <amexio-c-icon *ngIf="node.icon" [customclass]="node.icon"></amexio-c-icon>&nbsp;&nbsp;{{node.text}}</a>
              <!--<i *ngIf="node.icon" [ngClass]="node.icon" aria-hidden="true"></i>-->
              <span *ngIf="(node.children && node.children[0].children)">
                <div *ngIf="(node.children && node.children.length>0)" class="menu-content"
                     [ngClass]="{'menu-content-display':node.expand,'menu-content-hide':!node.expandflag,
                    ' menu-content-left': (node.children && node.children.length>3),'menu-right':xposition}">
                    <ul class="menu-content-cols">
                    <li class="col-menu-nodes"
                        [ngClass]="{'col-menu-nodes-fixed': (node.children && node.children.length<4),
                      'col-menu-nodes-percentage': (node.children && node.children.length>3)}"
                        *ngFor="let subnode of node.children let rowindex = index"  >
                      <div class="content" >
                      <div *ngIf="(subnode.text && subnode.text.length>0)" id="{{subnode.index}}" tabindex="{{subnode.tabindex}}"
                         (click)="onInnerNodeClick(subnode,node)"
                         (keyup)="navigateChild($event,true,rowindex,subnode,node.children,node)" class="menu-links-header">
                  <amexio-c-icon *ngIf="subnode.icon" [customclass]="subnode.icon"></amexio-c-icon>&nbsp;&nbsp;{{subnode.text}}
                          <!--<i *ngIf="subnode.icon" [ngClass]="subnode.icon" aria-hidden="true"></i>-->
                        </div>
                        <div *ngIf="subnode.image" style="padding: 10px;">
                          <img [attr.src]="subnode.image">
                        </div>
                        <ul class="menu-content-cols">
                          <li  *ngFor="let subinnernode of subnode.children let subinnerindex = index" tabindex="{{subinnernode.tabindex}}"
                           (click)="onSubInnerNodeClick(subinnernode,node)" id={{subinnernode.index}}
                           (keyup)="updownInnerChildNavigation($event,subinnerindex,subnode.children,subinnernode,node)" class="menulinks">
                            <div *ngIf="subinnernode.image" style="padding: 10px;">
                              <img [attr.src]="subinnernode.image">
                            </div>
                            <!--<i *ngIf="subinnernode.icon" class="fa fa-ravelry"
                            aria-hidden="true"></i>-->
                            <amexio-c-icon *ngIf="subinnernode.icon" key="menubar_ravelry">
                            </amexio-c-icon>
                            &nbsp;&nbsp;{{subinnernode.text}}{{subinnernode.template}}
                          </li>
                        </ul>
                      </div>
                    </li>

                  </ul>
                </div>

              </span>
              <ng-container *ngIf="(node.children && !node.children[0].children)">
                <div class="menu-content" [ngClass]="{'menu-content-display':node.expand}">
                  <ul class="menu-content-cols">
                    <li class="col-menu-nodes col-menu-nodes-fixed">
                      <div class="content">
                        <ul class="menu-content-cols">
                          <li *ngFor="let subnode of node.children" class="menulinks">
                            <div *ngIf="subnode.image" style="padding: 10px;">
                              <img [attr.src]="subnode.image">
                            </div>
                            <!--<i *ngIf="subnode.icon" class="fa fa-ravelry" aria-hidden="true"></i>-->
                            <amexio-c-icon *ngIf="subnode.icon"
                                             key="menubar_ravelry"></amexio-c-icon>&nbsp;&nbsp;{{subnode.text}}
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </ng-container>


            </li>
          </div>

        </ul>
      </div>
    </div>

  `, providers: [CommonDataService],
})
export class AmexioMenuBarComponent implements OnInit {

  /*
Properties
name : data
datatype : any
version : 4.0 onwards
default : none
description : Local data for menubar.
*/
  @Input() data: any[];

  /*
Properties
name : label
datatype : any
version : 4.0 onwards
default : none
description : label to menubar
*/
  @Input() label: any;

  /*
  Properties
  name : http-url
  datatype : string
  version : 4.0 onwards
  default : none
  description : REST url for fetching datasource.
  */
  @Input('http-url') httpurl: string;

  /*
Properties
name : http-method
datatype : string
version : 4.0 onwards
default : none
description : Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;

  /*
Properties
name : data-reader
datatype : string
version : 4.0 onwards
default : none
description : Key in JSON datasource for records
*/
  @Input('data-reader') datareader: string;

  /*
Events
name : nodeClick
datatype : any
version : none
default : none
description : Fire when menubar bar click.
*/
  @Output() nodeClick: any = new EventEmitter<any>();

  xposition = false;

  responseData: any;

  expand: boolean;

  currentnode: any;

  constructor(public matchMediaService: DeviceQueryService, public dataService: CommonDataService) {
    this.expand = false;
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.setData(this.data);
    }
  }
  onClick(node: any) {
    if (this.matchMediaService.IsPhone() || this.matchMediaService.IsTablet()) {
      for (const i of 'length') {
        if (this.data[i] === node) {
          this.data[i].expand = !this.data[i].expand;
        } else {
          this.data[i].expand = false;
        }
      }
    }
    this.nodeClick.emit(node);
  }

  onSubInnerNodeClick(subinnernode: any, mainnode: any) {
    if (mainnode['expandflag']) {
      mainnode['expandflag'] = false;
    }
    this.nodeClick.emit(subinnernode);
  }

  onInnerNodeClick(subnode: any, mainnode: any) {
    if (mainnode['expandflag']) {
      mainnode['expandflag'] = false;
    }
    this.nodeClick.emit(subnode);
  }

  onMenubarKeyup(event: any, flag: any, rowindex: any, node: any, data: any) {
    if (event.keyCode === 37) {
      this.NavigateMenubarLeft(event, flag, rowindex, node, data);
    } else if (event.keyCode === 39) {
      this.NavigateMenubarRight(event, flag, rowindex, node, data);
    } else if (event.keyCode === 13) {
      this.onEnterClick(rowindex, node);
    }
  }
  NavigateMenubarLeft(event: any, flag: any, rowindex: any, node: any, data: any) {
    if (node['expand']) {
      node['expand'] = false;
    }
    if (rowindex !== 0) {
      const currentindex = rowindex - 1;
      const itemid: any = currentindex;
      document.getElementById(itemid).focus();
      const currentnode = data[itemid];
      if (currentnode) {
        currentnode['expand'] = true;
        currentnode['expandflag'] = true;
        this.currentnode = currentnode;
      }
    } else if (rowindex === 0) {
      const currentindex = this.data.length - 1;
      const itemid: any = currentindex;
      document.getElementById(itemid).focus();

    }
  }

  NavigateMenubarRight(event: any, flag: any, rowindex: any, node: any, data: any) {
    if (node['expand']) {
      node['expand'] = false;
    }
    if (rowindex < data.length - 1) {
      const currentindex = rowindex + 1;
      const itemid: any = currentindex;
      document.getElementById(itemid).focus();
      const currentnode = data[itemid];
      if (currentnode) {
        currentnode['expand'] = true;
        currentnode['expandflag'] = true;
        this.currentnode = currentnode;
      }
    } else if (rowindex === data.length - 1) {
      const currentindex = 0;
      const itemid: any = currentindex;
      document.getElementById(itemid).focus();
    }

  }

  navigateChild(event: any, flag: any, rowindex: any, node: any, data: any, nodedata: any) {
    if (event.keyCode === 37) {
      this.navigateChildMenuitemLeft(event, rowindex, node, data);
    } else if (event.keyCode === 39) {
      this.navigateChildMenuitemRight(event, rowindex, node, data);
    } else if (event.keyCode === 13) {
      this.onnavigateChildEnterClick(event, rowindex, node, data, nodedata);
    }
  }
  navigateChildMenuitemLeft(event: any, rowindex: any, node: any, data: any) {
    event.stopImmediatePropagation();
    if (rowindex === 0) {
      const currentindex = data.length - 1;
      const itemid: any = currentindex;
      const childindex = data[itemid]['text'] + itemid;
      document.getElementById(childindex).focus();
    } else {
      const currentindex = rowindex - 1;
      const itemid: any = currentindex;
      const childindex = data[itemid]['text'] + itemid;
      document.getElementById(childindex).focus();
    }
  }
  navigateChildMenuitemRight(event: any, rowindex: any, node: any, data: any) {

    event.stopImmediatePropagation();
    if (rowindex < data.length - 1) {
      const currentindex = rowindex + 1;
      const itemid: any = currentindex;
      const childindex = data[itemid]['text'] + itemid;
      document.getElementById(childindex).focus();
    } else if (rowindex === data.length - 1) {
      const itemid: any = 0;
      const childindex = data[itemid]['text'] + itemid;
      document.getElementById(childindex).focus();
    }
  }
  onnavigateChildEnterClick(event: any, rowindex: any, node: any, data: any, nodedata: any) {
    event.stopImmediatePropagation();
    if (nodedata['expandflag']) {
      nodedata['expandflag'] = false;
    }
    this.nodeClick.emit(node);
  }

  onEnterClick(rowindex: any, node: any) {
    if (node['expandflag']) {
      node['expandflag'] = false;
    }
    this.nodeClick.emit(node);
  }

  updownInnerChildNavigation(event: any, subinnerindex: any, data: any, subinnernode: any, mainnode: any) {
    if (event.keyCode === 38) {
      this.onUpInnerChildNavigate(event, subinnerindex, data);
    } else if (event.keyCode === 40) {
      this.onDownInnerChildNavigate(event, subinnerindex, data);
    } else if (event.keyCode === 13) {
      this.onInnerChildEnterClick(subinnernode, mainnode);
    }
  }

  onUpInnerChildNavigate(event: any, subinnerindex: any, data: any) {
    event.stopImmediatePropagation();
    if (subinnerindex === 0) {
      const currentindex = data.length - 1;
      const itemid: any = currentindex;
      const innerchild = data[itemid]['text'] + itemid;
      document.getElementById(innerchild).focus();
    } else {
      const currentindex = subinnerindex - 1;
      const itemid: any = currentindex;
      const innerchild = data[itemid]['text'] + itemid;
      document.getElementById(innerchild).focus();
    }
  }

  onDownInnerChildNavigate(event: any, subinnerindex: any, data: any) {
    event.stopImmediatePropagation();
    if (subinnerindex < data.length - 1) {
      const currentindex = subinnerindex + 1;
      const itemid: any = currentindex;
      const innerchild = data[itemid]['text'] + itemid;
      document.getElementById(innerchild).focus();
    } else if (subinnerindex === data.length - 1) {
      const itemid: any = 0;
      const innerchild = data[itemid]['text'] + itemid;
      document.getElementById(innerchild).focus();
    }
  }
  onInnerChildEnterClick(subinnernode: any, mainnode: any) {
    event.stopImmediatePropagation();
    mainnode['expandflag'] = false;
    this.nodeClick.emit(subinnernode);
  }
  generateIndex(data: any) {
    if (data) {
      data.forEach((element: any, index: any) => {
        if (index === 0) {
          element['tabindex'] = '0';
          element['expandflag'] = true;
        } else {
          element['tabindex'] = '-1';
          element['expandflag'] = true;
        }
        if (element.children) {
          element.children.forEach((innerelement: any, innerindex: any) => {
            this.generateInnerIndex(innerindex, innerelement);
            if (innerelement.children) {
              innerelement.children.forEach((subinnerelement: any, subinnerindex: any) => {
                this.generateSunInnerIndex(subinnerindex, subinnerelement);
              });
            }
          });
        }
      });
    }
  }

  generateInnerIndex(innerindex: any, innerelement: any) {
    if (innerindex === 0) {
      innerelement['tabindex'] = '0';
      innerelement['index'] = innerelement['text'] + innerindex;
    } else {
      innerelement['tabindex'] = '-1';
      innerelement['index'] = innerelement['text'] + innerindex;
    }
  }
  generateSunInnerIndex(subinnerindex: any, subinnerelement: any) {
    if (subinnerindex === 0) {
      subinnerelement['tabindex'] = '0';
      subinnerelement['index'] = subinnerelement['text'] + subinnerindex;
    } else {
      subinnerelement['tabindex'] = '-1';
      subinnerelement['index'] = subinnerelement['text'] + subinnerindex;
    }
  }
  setData(httpResponse: any) {
    // Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of 'length') {
        responsedata = responsedata[dr[ir]];
      }
    }
    this.data = httpResponse;
    this.generateIndex(this.data);
  }

  onMouseOver(event: any) {
    if (!(this.matchMediaService.IsPhone() || this.matchMediaService.IsTablet())) {
      if ((this.matchMediaService.browserWindow().innerWidth - event.clientX) < 200) {
        this.xposition = true;
      } else {
        this.xposition = false;
      }
    } else {
      this.xposition = false;
    }
  }
}
