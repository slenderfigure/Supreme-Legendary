import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'image-previewer',
  templateUrl: './image-previewer.component.html',
  styleUrls: ['./image-previewer.component.css']
})
export class ImagePreviewerComponent implements OnInit {
  previewLoaded: boolean;
  @Input() imgPreview: string;

  constructor() { }

  ngOnInit(): void {
  }

}
