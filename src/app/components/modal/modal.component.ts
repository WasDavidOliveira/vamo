import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() data: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  onImageError(event: any) {
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    if (parent && !parent.querySelector('.fallback-icon')) {
      const fallbackIcon = document.createElement('div');
      fallbackIcon.className = 'fallback-icon';
      fallbackIcon.innerHTML = '<i class="fas fa-image" style="font-size: 24px; color: #ccc;"></i>';
      fallbackIcon.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: #f5f5f5; border-radius: 8px;';
      parent.appendChild(fallbackIcon);
    }
  }
}
