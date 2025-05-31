import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  images: string[] = [
    'https://cdn.pixabay.com/photo/2016/10/09/08/32/digital-marketing-1725340_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/08/22/08/24/hexagon-6564551_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/07/17/11/34/email-3543958_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/04/13/22/42/seo-1327870_1280.png'
  ];
  currentIndex: number = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }
}
