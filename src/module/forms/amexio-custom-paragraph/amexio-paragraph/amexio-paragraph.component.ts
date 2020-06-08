import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-paragraph',
  templateUrl: './amexio-paragraph.component.html',
})
export class AmexioParagraphComponent implements OnInit {
  constructor() { }
  /*
 Properties
 name : type
 datatype : string
 version : 5.21 onwards
 default : label
 description : label | editabletextfield
 */
  @Input('type') type = 'label';
  /*
Properties
name : content
datatype : string
version : 5.21 onwards
default : none
description : text to display
*/
  @Input('content') content: string;
  /*
Properties
name : color
datatype : string
version : 5.21 onwards
default : none
description : text color
*/
  @Input('color') color: string;
  /*
Properties
name : new-inlie
datatype : boolean
version : 5.21 onwards
default : false
description : flag to set new line
*/
  @Input('new-line') newline = false;

  /*
Properties
name : fontsize
datatype : string
version : 5.21 onwards
default : medium
description : small | medium | large
*/
  @Input('font-size') fontsize = 'medium';

  editContent: boolean;
  isEditable: boolean;
  textcontent: string;

  /*
 Properties
 name : data
 datatype : string
 version : 5.21 onwards
 default : none
 description : local JSON data variable
 */
  _data: any;
  responseData: any;
  @Input('data')
  set data(value: any[]) {
    this._data = value;
  }
  get data(): any[] {
    return this._data;
  }
  ngOnInit() {
    this.editContent = false;
    this.isEditable = false;
    this.validateLabel();
  }

  validateLabel() {
    if (this.type === 'editabletextfield') {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
  }

  onLblClick() {
    if (this.isEditable) {
      this.textcontent = this.content;
      this.editContent = true;
    }
  }

  onTxtUpdate() {
    this.content = this.textcontent;
    this.editContent = false;
    console.log(this.data);
  }

  // onTxtBlur() {
  //   this.content = this.textcontent;
  //   this.editContent = false;
  //   console.log(this.data);
  // }
}
