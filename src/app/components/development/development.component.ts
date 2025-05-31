import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-development',
  imports: [
    CommonModule
  ],
  templateUrl: './development.component.html',
  styleUrl: './development.component.css'
})
export class DevelopmentComponent {
  images: string[] = [
    'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/11/16/16/41/web-1045994_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/10/05/07/56/binary-3725328_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/02/05/00/19/web-design-2038872_1280.jpg'
  ];

  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
 