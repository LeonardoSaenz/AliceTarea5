import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';

import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  image: any = 'assets/imagenes/kakashi.jpg';

  constructor() {}


  selectedFilter = '';
  selectedIndex = 0;
  result: HTMLElement;
 
  
 
  slideOpts = {
    slidesPerView: 3.5,
    spaceBetween: 10,
    slidesOffsetBefore: 20,
    freeMode: true
  };
  


  filterOptions = [
    {
      name: 'Normal',
      value: '' 
    },
    { 
      name: 'Sepia', 
      value: 'sepia' 
    },
    { 
      name: 'Azul', 
      value: 'blue_monotone' 
    },
    { 
      name: 'Rojo Fuerte', 
      value: 'violent_tomato' 
    },
    { 
      name: 'Gris', 
      value: 'greyscale' 
    },
    { 
      name: 'Brillo', 
      value: 'brightness' 
    },
    { 
      name: 'Saturación', 
      value: 'saturation' 
    },
    { 
      name: 'Contraste', 
      value: 'contrast' 
    },
    { 
      name: 'Hue', 
      value: 'hue' 
    },
    { 
      name: 'Galleta', 
      value: 'cookie' 
    },
    { 
      name: 'Vintage', 
      value: 'vintage' 
    },
    { 
      name: 'Koda', 
      value: 'koda' 
    },
    { 
      name: 'ColorTech', 
      value: 'technicolor' 
    },
    { 
      name: 'Polaroid', 
      value: 'polaroid' 
    },
    { 
      name: 'Raro', 
      value: 'bgr' 
    }
  ];
 
  async selectImage() {
    this.image = '';  
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.image = image.dataUrl;
  }
 
  filter(index: number) {
    this.selectedFilter = this.filterOptions[index].value;
    this.selectedIndex = index;
  }
 
  imageLoaded(e) {
    this.result = e.detail.result;
  }
 
  saveImage() {
    let base64 = '';
    if (!this.selectedFilter) {
      base64 = this.image;
    } else {
      let canvas = this.result as HTMLCanvasElement;
      base64 = canvas.toDataURL('image/jpeg', 1.0);
    }
    this.downloadBase64File(base64);
  }
 
  downloadBase64File(base64) {
    const linkSource = `${base64}`;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'test.png';
    downloadLink.click();
  }
}
