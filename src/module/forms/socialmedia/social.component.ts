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
* Created by sagar on 23/1/19.
  INFO: THIS COMPONENT USE FOR THIRD PARTY AUTH
*/
import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocialUserInfo } from './social.user.info.model';

@Component({
  selector : 'amexio-social',
  templateUrl : 'social.component.html',
})

export class AmexioSocialComponent implements OnInit {

  /*
    Properties
    name : type
    datatype : string
    version : 5.5.3 onwards
    default : null
    description : type of auth required like google,linkedin
   */
  @Input('type') type: string;
 /*
    Properties
    name : key
    datatype : string
    version : 5.5.3 onwards
    default : null
    description : key is client id
   */
  @Input('api-key') key: string;

  @Output() onLogin = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onLoginClick(socialUserInfo: any) {
    this.onLogin.emit(socialUserInfo);
  }

}