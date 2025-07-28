import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() reelUrl: string = 'https://www.instagram.com/reel/DHlS3mbsn_M/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==';
  safeVideoUrl!: SafeResourceUrl;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initializeVideoPlayer();
  }

  private initializeVideoPlayer(): void {
    try {
      const reelId = this.extractReelId(this.reelUrl);
      const embedUrl = `https://www.instagram.com/p/${reelId}/embed/`;

      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } catch (error) {
      console.error('Error initializing Instagram reel:', error);
      this.hasError = true;
      this.isLoading = false;
    }
  }

  private extractReelId(url: string): string {
    const urlParts = url.split('/');
    if (urlParts.length < 5 || !urlParts[4]) {
      throw new Error('Invalid Instagram Reel URL format');
    }
    return urlParts[4].split('?')[0];
  }

  onFrameLoad(): void {
    this.isLoading = false;
  }

  onFrameError(): void {
    this.hasError = true;
    this.isLoading = false;
  }
}
