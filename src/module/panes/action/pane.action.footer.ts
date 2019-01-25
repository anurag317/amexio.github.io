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
* Created by pratik on 18/12/17.
*/

import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-action', template: '<ng-content></ng-content>',
})

export class AmexioFooterComponent implements OnInit, AfterContentChecked {
  /*
 Properties
 name :padding
 datatype : string
 version : 4.2 onwards
 default : left
 description : padding for footer.
 */
  @Input() padding: string;

  @Output() init: any = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.init.emit(this);
  }
}
