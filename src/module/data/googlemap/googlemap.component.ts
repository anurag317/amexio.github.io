import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter,
Input, IterableDiffers, OnInit, Output} from '@angular/core';
import { GoogleMapOverlays } from '../../../models/googlemap.model';

declare var google: any;

@Component({
    selector: 'amexio-google-map',
    templateUrl: './googlemap.component.html',
})
export class AmexioGoogleMapComponent implements AfterViewChecked {
    @Input() style: any;

    @Input() height = '250px';

    @Input() width = '100%';

    @Input('initial-lat') initiallat = 51.507351;

    @Input('initial-lng') initiallng = -0.127758;

    @Input('initial-zoom-level') initialzoomlevel = 2;

    @Input('data') data: GoogleMapOverlays[];

    @Output() onMarkerClick: EventEmitter<any> = new EventEmitter();

    @Output() onReady: EventEmitter<any> = new EventEmitter();

    localoverlays: any[];

    differ: any;

    map: any;

    infoWindow: any;

    responseStructure: any;
    constructor(public el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }
    ngAfterViewChecked() {
        if (!this.map && this.el.nativeElement.offsetParent) {
            this.initialize();
            this.infoWindow = new google.maps.InfoWindow();
        }
    }

    initialize() {
        const options = { center: { lat: this.initiallat, lng: this.initiallng }, zoom: this.initialzoomlevel };
        this.map = new google.maps.Map(this.el.nativeElement.children[0], options);
        this.onReady.emit({
            map: this.map,
        });

        if (this.data) {
            this.localoverlays = [];
            for (const overlay of this.data) {
                this.localoverlays.push(new google.maps.Marker({
                    position: { lat: overlay.lat, lng: overlay.lng },
                    icon: overlay.icon, title: overlay.title, data: overlay.data,
                }));
            }

            for (const overlay of this.localoverlays) {
                overlay.setMap(this.map);
                this.bindOverlayEvents(overlay);
            }
        }

    }

    bindOverlayEvents(overlay: any) {
        overlay.addListener('click', (event: any) => {
            this.onMarkerClick.emit(overlay.data);
            if (overlay && overlay.title) {
                this.infoWindow.setContent('<div>' + overlay.title + '</div>');
                this.infoWindow.open(this.map, overlay);
            }

        });
    }

    getMap() {
        return this.map;
    }
}