import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AmexioInnerVerticalNodeComponent } from '../verticaltree/amexio-innerverticalnode.component';

@Component({
    selector: 'amexio-verticaltree',
    templateUrl: './amexio-verticaltree.component.html',
})
export class AmexioVerticalTreeComponent implements AfterViewInit, OnInit {

    @Input() data: any;

    @Output() onNodeClick: any = new EventEmitter<any>();
    @Output() onDropClick: any = new EventEmitter<any>();

    treetemplates: any;
    retevent: any;

    @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;
    @ViewChild(AmexioInnerVerticalNodeComponent) innernodeRef: AmexioInnerVerticalNodeComponent;
    constructor() {

    }

    ngOnInit() {

    }

    nodeclick(event: any) {
        this.onNodeClick.emit(event);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.parentTmp != null) {
                this.treetemplates = { treeNodeTemplate: this.parentTmp };
            } else if (this.treetemplates != null) {
                this.parentTmp = this.treetemplates.treeNodeTemplate;
            }
        });
    }

    dragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }
    dropTable(event: any) {
        this.chkEvent(event);
        this.onDropClick.emit({ event: this.retevent, questData: this.retevent.questData, node: this.retevent.node });
    }

    chkEvent(event: any) {
        //  processing logic
        if (event.hasOwnProperty('questData')) {
            this.retevent = event;
            return;
        } else {
            if (event.hasOwnProperty('event')) {
                this.chkEvent(event.event);
            }
        }
    }
}
